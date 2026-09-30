"""
Student auth dependency.

Bearer tokens are Supabase access tokens (JWTs). They are verified locally —
signature, exp, aud="authenticated", iss — so authenticated requests no longer
pay a blocking HTTP round trip to Supabase Auth.

Verification order:
  1. ES256/RS256 → public key from the project's JWKS endpoint (cached)
  2. HS256       → SUPABASE_JWT_SECRET (legacy projects)
  3. Neither possible → Supabase Auth `get_user` in a worker thread,
     with a short positive cache bounded by the token's own exp.

A token that fails local verification is rejected outright; it never falls
through to the remote path. Anon / service-role keys are rejected because they
carry no `sub` and no aud="authenticated".
"""

import hashlib
import logging
import time
from collections import OrderedDict
from dataclasses import dataclass, field

import httpx
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwk, jwt
from jose.exceptions import ExpiredSignatureError, JWTClaimsError, JWTError
from starlette.concurrency import run_in_threadpool

from config import settings
from core.observability import log_event, record_auth

bearer_scheme = HTTPBearer(auto_error=False)

log = logging.getLogger("examcoach.auth")

_AUDIENCE      = "authenticated"
_HS_ALGS       = {"HS256"}
_ASYM_ALGS     = {"ES256", "RS256"}


@dataclass(frozen=True)
class AuthUser:
    id: str
    email: str | None
    user_metadata: dict = field(default_factory=dict)
    app_metadata: dict = field(default_factory=dict)


class _InvalidToken(Exception):
    def __init__(self, reason: str):
        self.reason = reason
        super().__init__(reason)


def _unauthorized(detail: str = "Invalid or expired token") -> HTTPException:
    return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=detail)


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
    if settings.auth_local_jwt and settings.supabase_url:
        await _jwks.refresh()


# ── Remote fallback cache ─────────────────────────────────────────────────────

class _RemoteCache:
    def __init__(self):
        self._entries: OrderedDict[str, tuple[AuthUser, float]] = OrderedDict()

    def reset(self) -> None:
        self._entries.clear()

    def get(self, key: str) -> AuthUser | None:
        hit = self._entries.get(key)
        if not hit:
            return None
        user, expires_at = hit
        if time.time() >= expires_at:
            self._entries.pop(key, None)
            return None
        self._entries.move_to_end(key)
        return user

    def put(self, key: str, user: AuthUser, token_exp: float | None) -> None:
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

def _user_from_claims(claims: dict) -> AuthUser:
    sub = claims.get("sub")
    if not sub or claims.get("role") in ("anon", "service_role"):
        raise _InvalidToken("not_a_user_token")
    return AuthUser(
        id=str(sub),
        email=claims.get("email"),
        user_metadata=claims.get("user_metadata") or {},
        app_metadata=claims.get("app_metadata") or {},
    )


def _decode(token: str, key, alg: str) -> dict:
    try:
        return jwt.decode(
            token,
            key,
            algorithms=[alg],
            audience=_AUDIENCE,
            issuer=_issuer(),
            options={"leeway": settings.auth_jwt_leeway_seconds, "require_exp": True,
                     "require_aud": True, "require_iss": True, "require_sub": True},
        )
    except ExpiredSignatureError:
        raise _InvalidToken("expired")
    except JWTClaimsError:
        raise _InvalidToken("bad_claims")
    except JWTError:
        raise _InvalidToken("bad_signature")


async def _verify_local(token: str, header: dict) -> tuple[AuthUser, str] | None:
    """Returns (user, method) or None if no key is available to verify locally."""
    alg = header.get("alg")
    if alg in _ASYM_ALGS:
        key_data = await _jwks.get(header.get("kid"))
        if key_data is None:
            return None
        if key_data.get("alg") and key_data["alg"] != alg:
            raise _InvalidToken("alg_mismatch")
        try:
            key = jwk.construct(key_data, algorithm=alg)
        except Exception:
            raise _InvalidToken("bad_key")
        return _user_from_claims(_decode(token, key, alg)), "local_jwks"
    if alg in _HS_ALGS and settings.supabase_jwt_secret:
        return _user_from_claims(_decode(token, settings.supabase_jwt_secret, alg)), "local_hs256"
    return None


async def _verify_remote(token: str) -> tuple[AuthUser, str]:
    key = hashlib.sha256(token.encode()).hexdigest()
    cached = _remote_cache.get(key)
    if cached:
        return cached, "remote_cached"

    from db.repositories.users_repo import UsersRepository
    try:
        # anyio's threadpool (40 tokens) rather than asyncio.to_thread, whose
        # default executor is only cpu_count+4 threads and queues under load.
        result = await run_in_threadpool(UsersRepository.get_auth_user, token)
    except Exception as exc:
        # 4xx from Supabase Auth is an ordinary rejection; anything else
        # (timeout, 5xx, network) is an upstream problem worth alerting on.
        if getattr(exc, "status", None) not in (400, 401, 403, 404):
            log_event(log, "remote_auth_error", logging.WARNING, error=type(exc).__name__)
        raise _InvalidToken("remote_rejected")
    if not result or not result.user:
        raise _InvalidToken("remote_rejected")

    u = result.user
    user = AuthUser(
        id=str(u.id),
        email=u.email,
        user_metadata=u.user_metadata or {},
        app_metadata=u.app_metadata or {},
    )
    try:
        exp = jwt.get_unverified_claims(token).get("exp")
    except JWTError:
        exp = None
    _remote_cache.put(key, user, float(exp) if isinstance(exp, (int, float)) else None)
    return user, "remote"


async def _resolve_user(
    credentials: HTTPAuthorizationCredentials | None,
) -> AuthUser:
    """Validate bearer token. Returns AuthUser or raises 401."""
    if not credentials or not credentials.credentials:
        raise _unauthorized("Authorization token required")

    token = credentials.credentials
    started = time.perf_counter()
    method = "none"
    try:
        try:
            header = jwt.get_unverified_header(token)
        except JWTError:
            raise _InvalidToken("malformed")
        if header.get("alg") not in _HS_ALGS | _ASYM_ALGS:
            raise _InvalidToken("unsupported_alg")

        resolved = await _verify_local(token, header) if settings.auth_local_jwt else None
        if resolved is None:
            resolved = await _verify_remote(token)
        user, method = resolved
    except _InvalidToken as exc:
        elapsed = (time.perf_counter() - started) * 1000
        record_auth(method, elapsed, "rejected")
        log_event(log, "auth_rejected", reason=exc.reason, duration_ms=round(elapsed, 2))
        raise _unauthorized()

    record_auth(method, (time.perf_counter() - started) * 1000, "ok")
    return user


async def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> dict:
    user = await _resolve_user(credentials)
    return {"id": user.id, "email": user.email}


async def get_optional_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> dict | None:
    if not credentials:
        return None
    try:
        return await get_current_user(credentials)
    except Exception:
        return None
