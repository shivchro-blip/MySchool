import logging

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.concurrency import run_in_threadpool

from jose import jwt, JWTError

from config import settings

log = logging.getLogger(__name__)

bearer_scheme = HTTPBearer(auto_error=False)

# Supabase legacy tokens are signed with HS256 (shared JWT secret) and set
# aud="authenticated". Local verification only works for HS256/shared-secret
# projects; projects on asymmetric signing keys (RS256/ES256) will always fall
# back to remote validation — see the one-time warning below.
_JWT_ALG = "HS256"
_JWT_AUD = "authenticated"

# Emit the local-verification fallback warning only once to avoid log spam.
_warned_local_fallback = False


def _verify_jwt_local(token: str) -> dict:
    """
    Verify a Supabase access token locally (no network) using the project's
    JWT secret. Returns a {"id", "email"} dict on success.

    Raises JWTError on any failure (bad signature, expired, wrong audience) so
    the caller can decide whether to fall back to remote validation.
    """
    claims = jwt.decode(
        token,
        settings.supabase_jwt_secret,
        algorithms=[_JWT_ALG],
        audience=_JWT_AUD,
    )
    sub = claims.get("sub")
    if not sub:
        raise JWTError("token missing sub claim")
    return {
        "id": str(sub),
        "email": claims.get("email"),
        "app_metadata": claims.get("app_metadata") or {},
    }


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


async def _resolve_user(
    credentials: HTTPAuthorizationCredentials | None,
    allow_local: bool = True,
) -> dict:
    """
    Validate a bearer token and return {"id", "email", "app_metadata"}, or
    raise 401.

    Fast path (allow_local + supabase_jwt_secret set): verify the signature
    locally (CPU-only, no network). This removes one of the two serial Supabase
    round-trips that previously gated every authenticated request.

    IMPORTANT: local verification trusts the token's claims, which are frozen at
    issue time. Callers that must react to live server-side changes (e.g. an
    admin role revoked mid-session) MUST pass allow_local=False to force a live
    GoTrue lookup. The student profile path tolerates ≤1h staleness; the admin
    gate does not.

    Safety net: if local verification fails for ANY reason — misconfigured
    secret, or a project on asymmetric signing keys — fall back to the original
    remote validation. A wrong secret therefore degrades to the previous
    behaviour (slower, still correct) rather than locking every user out. The
    remote call is run in a threadpool so the synchronous Supabase client never
    blocks the event loop.
    """
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization token required",
        )

    token = credentials.credentials

    if allow_local and settings.supabase_jwt_secret:
        try:
            return _verify_jwt_local(token)
        except JWTError:
            # Fall through to remote validation (handles secret misconfig and
            # lets GoTrue have the final say on revoked/expired tokens).
            global _warned_local_fallback
            if not _warned_local_fallback:
                _warned_local_fallback = True
                log.warning(
                    "Local JWT verification failed; falling back to remote "
                    "validation. If this persists, SUPABASE_JWT_SECRET is wrong "
                    "or the project uses asymmetric (RS256/ES256) signing keys "
                    "— the latency optimisation is INACTIVE."
                )

    try:
        user = await run_in_threadpool(_verify_jwt_remote, token)
    except Exception:
        user = None

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )
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
