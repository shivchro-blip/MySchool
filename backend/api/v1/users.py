from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.concurrency import run_in_threadpool
from models import (
    UserProfileResponse,
    UpdateProfileRequest,
    UsageStatsResponse,
    SessionClaimResponse,
)
from api.v1.deps import get_current_user, verify_session
from core.rate_limit import limiter, SESSION_CLAIM_LIMIT, PROFILE_WRITE_LIMIT
from core.session import issue_session_token
from db.repositories import UsersRepository, SessionsRepository

router = APIRouter()


# ── Single-session lifecycle ─────────────────────────────────────────────
# claim/release intentionally depend on get_current_user (JWT only), not
# verify_session — claiming is what creates the session in the first place.

@router.post("/session/claim", response_model=SessionClaimResponse)
@limiter.limit(SESSION_CLAIM_LIMIT)
async def claim_session(
    request: Request,
    user: dict = Depends(get_current_user),
):
    """Called once after a successful Supabase login. Deletes any existing
    session rows for this user (kicking other devices), stores the SHA-256
    hash of a fresh token, and returns the raw token — the only time it
    ever leaves the server."""
    raw_token = issue_session_token()
    repo = SessionsRepository()
    device_hint = (request.headers.get("user-agent") or "")[:80] or None
    await run_in_threadpool(
        repo.replace_for_user,
        user["id"],
        repo.hash_token(raw_token),
        device_hint,
    )
    return SessionClaimResponse(session_token=raw_token)


@router.delete("/session")
async def release_session(user: dict = Depends(get_current_user)):
    """Logout: drop the active session row. Idempotent."""
    await run_in_threadpool(SessionsRepository().delete_for_user, user["id"])
    return {"status": "signed_out"}


# ── Profile ──────────────────────────────────────────────────────────────

@router.get("/me", response_model=UserProfileResponse)
async def get_profile(user: dict = Depends(verify_session)):
    # The Supabase client is synchronous; run it off the event loop so this
    # hot path (hit on every Dashboard load) doesn't serialize concurrent
    # requests.
    data = await run_in_threadpool(UsersRepository().get_by_id, user["id"])
    if not data:
        raise HTTPException(status_code=404, detail="User profile not found")
    return data


@router.put("/me", response_model=UserProfileResponse)
@limiter.limit(PROFILE_WRITE_LIMIT)
async def update_profile(
    request: Request,
    body: UpdateProfileRequest,
    user: dict = Depends(verify_session),
):
    updated = await run_in_threadpool(
        UsersRepository().update_profile,
        user["id"],
        body.model_dump(exclude_none=True),
    )
    if not updated:
        raise HTTPException(status_code=404, detail="User not found")
    return updated


@router.get("/me/usage", response_model=UsageStatsResponse)
async def get_usage(user: dict = Depends(verify_session)):
    from db.repositories.users_repo import FREE_DAILY_LIMIT
    data  = await run_in_threadpool(
        UsersRepository().get_plan_and_calls, user["id"]
    )
    plan  = data["plan"]            if data else "free"
    calls = data["daily_ai_calls"]  if data else 0
    limit = FREE_DAILY_LIMIT if plan == "free" else 9999
    return UsageStatsResponse(
        daily_ai_calls=calls,
        daily_limit=limit,
        calls_remaining=max(0, limit - calls),
        plan=plan,
    )
