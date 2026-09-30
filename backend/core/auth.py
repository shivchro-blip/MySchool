"""
Student auth dependency.

Bearer tokens are Supabase access tokens (JWTs). The fast path verifies them
locally — signature, exp, aud="authenticated", iss — so authenticated
requests don't pay a Supabase Auth round trip.

Local verification order:
  1. ES256/RS256 → public key from the project's JWKS endpoint (cached,
     warmed at startup, refetched on an unknown kid). Needs no config.
  2. HS256       → SUPABASE_JWT_SECRET (legacy shared-secret projects).

Fallback: any other local failure (no key available, bad signature, claim
mismatch) falls back to a live GoTrue lookup in the threadpool. A wrong
secret or issuer therefore degrades to the slower remote path instead of
locking every user out. The one exception is a token whose signature
verified but which has expired — GoTrue would reject it too, so it is
rejected immediately.

Remote results for the student path are cached briefly (never past the
token's own exp). The admin gate passes allow_local=False and always gets a
live, uncached lookup so a revoked admin loses access immediately.
"""

import hashlib
import logging
import time
from collections import OrderedDict

import httpx
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwk, jwt
from jose.exceptions import ExpiredSignatureError, JWTError
from starlette.concurrency import run_in_threadpool

from config import settings
from core.observability import log_event, record_auth

log = logging.getLogger("examcoach.auth")

bearer_scheme = HTTPBearer(auto_error=False)

_JWT_AUD   = "authenticated"
_HS_ALGS   = {"HS256"}
_ASYM_ALGS = {"ES256", "RS256"}


class _Rejected(Exception):
    """Definitive rejection — do not fall back to remote validation."""

    def __init__(self, reason: str):
        self.reason = reason
        super().__init__(reason)


def _issuer() -> str:
    return settings.supabase_jwt_issuer or f"{settings.supabase_url.rstrip('/')}/auth/v1"


# ── JWKS cache ────────────────────────────────────────────────────────────────

class _JWKSCache:
    def __init__(self):
        self._keys: dict[str, dict] = {}
        self._fetched_at = 0.0
        self._last_attempt = 0.0

    def reset(self) -> None:
        self._keys, self._fetched_at, self._last_attempt = {}, 0.0, 0.0

    def _fresh(self) -> bool:
        return (time.monotonic() - self._fetched_at) < settings.auth_jwks_cache_seconds

    async def refresh(self) -> None:
        self._last_attempt = time.monotonic()
        url = f"{settings.supabase_url.rstrip('/')}/auth/v1/.well-known/jwks.json"
        started = time.perf_counter()
        try:
            async with httpx.AsyncClient(timeout=settings.auth_jwks_timeout_seconds) as client:
                res = await client.get(url)
                res.raise_for_status()
                keys = res.json().get("keys", [])
        except Exception as exc:
            log_event(log, "jwks_fetch_failed", logging.WARNING,
                      error=type(exc).__name__,
                      duration_ms=round((time.perf_counter() - started) * 1000, 1))
            return
        self._keys = {k["kid"]: k for k in keys if isinstance(k, dict) and k.get("kid")}
        self._fetched_at = time.monotonic()
        log_event(log, "jwks_refreshed", key_count=len(self._keys),
                  duration_ms=round((time.perf_counter() - started) * 1000, 1))

    async def get(self, kid: str | None) -> dict | None:
        if not kid:
            return None
        if kid in self._keys and self._fresh():
            return self._keys[kid]
        # Unknown kid (key rotation) or stale cache: refetch, but not more often
        # than auth_jwks_min_refetch_seconds so garbage kids can't hammer Supabase.
        if (time.monotonic() - self._last_attempt) >= settings.auth_jwks_min_refetch_seconds:
            await self.refresh()
        return self._keys.get(kid)


_jwks = _JWKSCache()


async def warm_jwks() -> None:
    """Prefetch signing keys at startup so the first login doesn't pay for it."""
    if settings.supabase_url:
        await _jwks.refresh()


# ── Remote-result cache (student path only) ───────────────────────────────────

class _RemoteCache:
    def __init__(self):
        self._entries: OrderedDict[str, tuple[dict, float]] = OrderedDict()

    def reset(self) -> None:
        self._entries.clear()

    def get(self, key: str) -> dict | None:
        hit = self._entries.get(key)
        if not hit:
            return None
        user, expires_at = hit
        if time.time() >= expires_at:
            self._entries.pop(key, None)
            return None
        self._entries.move_to_end(key)
        return user

    def put(self, key: str, user: dict, token_exp: float | None) -> None:
        ttl = settings.auth_remote_cache_seconds
        if ttl <= 0:
            return
        expires_at = time.time() + ttl
        if token_exp:
            expires_at = min(expires_at, token_exp)
        self._entries[key] = (user, expires_at)
        self._entries.move_to_end(key)
        while len(self._entries) > settings.auth_remote_cache_max_entries:
            self._entries.popitem(last=False)


_remote_cache = _RemoteCache()


# ── Verification ──────────────────────────────────────────────────────────────

def _user_from_claims(claims: dict) -> dict:
    sub = claims.get("sub")
    if not sub or claims.get("role") in ("anon", "service_role"):
        raise JWTError("not a user token")
    return {
        "id": str(sub),
        "email": claims.get("email"),
        "app_metadata": claims.get("app_metadata") or {},
    }


def _decode(token: str, key, alg: str) -> dict:
    try:
        return jwt.decode(
            token,
            key,
            algorithms=[alg],
            audience=_JWT_AUD,
            issuer=_issuer(),
            options={"leeway": settings.auth_jwt_leeway_seconds, "require_exp": True,
                     "require_aud": True, "require_sub": True},
        )
    except ExpiredSignatureError:
        # python-jose checks the signature before claims, so the signature is
        # genuine; GoTrue would reject an expired token as well.
        raise _Rejected("expired")


async def _verify_local(token: str, header: dict) -> tuple[dict, str] | None:
    """(user, method), or None when no key is available to verify locally.
    Raises JWTError on a failed verification, _Rejected on a definitive one."""
    alg = header.get("alg")
    if alg in _ASYM_ALGS:
        key_data = await _jwks.get(header.get("kid"))
        if key_data is None:
            return None
        if key_data.get("alg") and key_data["alg"] != alg:
            raise JWTError("alg does not match key")
        try:
            key = jwk.construct(key_data, algorithm=alg)
        except Exception as exc:
            raise JWTError(f"unusable key: {type(exc).__name__}")
        return _user_from_claims(_decode(token, key, alg)), "local_jwks"
    if alg in _HS_ALGS and settings.supabase_jwt_secret:
        return _user_from_claims(_decode(token, settings.supabase_jwt_secret, alg)), "local_hs256"
    return None


def _verify_jwt_remote(token: str):
    """Validate a token via a Supabase GoTrue round-trip (blocking call)."""
    from db.client import get_db
    result = get_db().auth.get_user(token)
    if not result or not result.user:
        return None
    return {
        "id": str(result.user.id),
        "email": result.user.email,
        "app_metadata": getattr(result.user, "app_metadata", None) or {},
    }


async def _verify_remote(token: str, use_cache: bool) -> tuple[dict | None, str]:
    key = hashlib.sha256(token.encode()).hexdigest()
    if use_cache:
        cached = _remote_cache.get(key)
        if cached:
            return cached, "remote_cached"
    try:
        user = await run_in_threadpool(_verify_jwt_remote, token)
    except Exception as exc:
        # 4xx from GoTrue is an ordinary rejection; anything else (timeout,
        # 5xx, network) is an upstream problem worth alerting on.
        if getattr(exc, "status", None) not in (400, 401, 403, 404):
            log_event(log, "remote_auth_error", logging.WARNING, error=type(exc).__name__)
        user = None
    if user and use_cache:
        try:
            exp = jwt.get_unverified_claims(token).get("exp")
        except JWTError:
            exp = None
        _remote_cache.put(key, user, float(exp) if isinstance(exp, (int, float)) else None)
    return user, "remote"


async def _resolve_user(
    credentials: HTTPAuthorizationCredentials | None,
    allow_local: bool = True,
) -> dict:
    """
    Validate a bearer token and return {"id", "email", "app_metadata"}, or
    raise 401.

    IMPORTANT: local verification trusts the token's claims, which are frozen at
    issue time. Callers that must react to live server-side changes (e.g. an
    admin role revoked mid-session) MUST pass allow_local=False to force a live,
    uncached GoTrue lookup. The student profile path tolerates ≤1h staleness;
    the admin gate does not.
    """
    if not credentials or not credentials.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization token required",
        )

    token = credentials.credentials
    started = time.perf_counter()
    method = "none"
    user = None
    try:
        try:
            header = jwt.get_unverified_header(token)
        except JWTError:
            raise _Rejected("malformed")
        if header.get("alg") not in _HS_ALGS | _ASYM_ALGS:
            raise _Rejected("unsupported_alg")

        if allow_local and settings.auth_local_jwt:
            try:
                resolved = await _verify_local(token, header)
                if resolved:
                    user, method = resolved
            except JWTError as exc:
                # Wrong secret / issuer, or a forged token: let GoTrue decide.
                log_event(log, "local_verify_failed", reason=str(exc)[:80])

        if user is None:
            user, method = await _verify_remote(token, use_cache=allow_local)
            if user is None:
                raise _Rejected("remote_rejected")
    except _Rejected as exc:
        elapsed = (time.perf_counter() - started) * 1000
        record_auth(method, elapsed, "rejected")
        log_event(log, "auth_rejected", reason=exc.reason, duration_ms=round(elapsed, 2))
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    record_auth(method, (time.perf_counter() - started) * 1000, "ok")
    return user


async def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> dict:
    user = await _resolve_user(credentials)
    # Preserve the original {"id", "email"} contract for route handlers.
    return {"id": user["id"], "email": user["email"]}


async def get_optional_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> dict | None:
    if not credentials:
        return None
    try:
        return await get_current_user(credentials)
    except Exception:
        return None
