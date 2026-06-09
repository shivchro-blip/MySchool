from fastapi import APIRouter, Depends, HTTPException
from fastapi.concurrency import run_in_threadpool
from uuid import UUID
from models import UserProfileResponse, UpdateProfileRequest, UsageStatsResponse
from api.v1.deps import get_current_user
from db.repositories import UsersRepository
from db.repositories.users_repo import FREE_DAILY_LIMIT

router = APIRouter()


@router.get("/me", response_model=UserProfileResponse)
async def get_profile(user: dict = Depends(get_current_user)):
    # The Supabase client is synchronous; run it off the event loop so this
    # hot path (hit on every Dashboard load) doesn't serialize concurrent
    # requests.
    data = await run_in_threadpool(UsersRepository().get_by_id, user["id"])
    if not data:
        raise HTTPException(status_code=404, detail="User profile not found")
    return data


@router.put("/me", response_model=UserProfileResponse)
async def update_profile(
    body: UpdateProfileRequest,
    user: dict = Depends(get_current_user),
):
    updated = UsersRepository().update_profile(
        user["id"],
        body.model_dump(exclude_none=True),
    )
    if not updated:
        raise HTTPException(status_code=404, detail="User not found")
    return updated


@router.get("/me/usage", response_model=UsageStatsResponse)
async def get_usage(user: dict = Depends(get_current_user)):
    data  = UsersRepository().get_plan_and_calls(user["id"])
    plan  = data["plan"]            if data else "free"
    calls = data["daily_ai_calls"]  if data else 0
    limit = FREE_DAILY_LIMIT if plan == "free" else 9999
    return UsageStatsResponse(
        daily_ai_calls=calls,
        daily_limit=limit,
        calls_remaining=max(0, limit - calls),
        plan=plan,
    )
