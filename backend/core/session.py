"""
Single-session enforcement (one active login per user).

verify_session is the dependency applied to protected routes. It
validates the X-Session-Token header against the stored SHA-256 hash
for the JWT's user. A mismatch means the account was signed in
somewhere else afterwards — the caller gets 401 SESSION_INVALIDATED
and the frontend signs the user out.
"""

import secrets

from fastapi import Depends, Header
from starlette.concurrency import run_in_threadpool

from core.auth import get_current_user
from core.errors import SessionInvalidatedError
from db.repositories.sessions_repo import SessionsRepository


def issue_session_token() -> str:
    """Cryptographically secure 64-hex-char session token."""
    return secrets.token_hex(32)


async def verify_session(
    user: dict = Depends(get_current_user),
    x_session_token: str | None = Header(default=None, alias="X-Session-Token"),
) -> dict:
    """
    Returns the authenticated user dict if the presented session token
    matches the single active session; raises SessionInvalidatedError
    (401) otherwise. Supabase client is sync → run off the event loop.
    """
    if not x_session_token:
        raise SessionInvalidatedError()

    repo = SessionsRepository()
    row = await run_in_threadpool(repo.get_by_user, user["id"])
    presented_hash = repo.hash_token(x_session_token)

    if not row or not secrets.compare_digest(
        row["session_token_hash"], presented_hash
    ):
        raise SessionInvalidatedError()

    await run_in_threadpool(repo.touch, user["id"], row.get("last_seen_at"))
    return user
