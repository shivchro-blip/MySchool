from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from core.auth import _resolve_user

bearer_scheme = HTTPBearer(auto_error=False)


async def get_admin_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> dict:
    user = await _resolve_user(credentials)
    meta = getattr(user, "app_metadata", None) or {}
    if meta.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )
    return {"id": str(user.id), "email": user.email, "role": "admin"}
