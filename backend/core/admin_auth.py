from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from core.auth import _resolve_user

bearer_scheme = HTTPBearer(auto_error=False)


async def get_admin_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> dict:
    # allow_local=False: the admin role lives in app_metadata, which is frozen
    # in the JWT at issue time. Force a live GoTrue lookup so a revoked admin
    # loses access immediately rather than after token expiry.
    user = await _resolve_user(credentials, allow_local=False)
    meta = user.get("app_metadata") or {}
    if meta.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )
    return {"id": user["id"], "email": user["email"], "role": "admin"}
