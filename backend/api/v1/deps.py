"""
Shared FastAPI dependencies for api/v1 routes.
All route modules import auth dependencies from here so the
api/v1 community has explicit intra-module edges.
"""

from core.auth       import get_current_user, get_optional_user
from core.admin_auth import get_admin_user
from core.session    import verify_session

__all__ = [
    "get_current_user",
    "get_optional_user",
    "get_admin_user",
    "verify_session",
]
