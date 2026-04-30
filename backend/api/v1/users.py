from fastapi import APIRouter, Depends
from uuid import UUID
from models import UserProfileResponse, UpdateProfileRequest, UsageStatsResponse
from core.auth import get_current_user
from core.rate_limit import FREE_DAILY_LIMIT

router = APIRouter()


@router.get("/me", response_model=UserProfileResponse)
async def get_profile(user: dict = Depends(get_current_user)):
    from db.client import get_db
    db = get_db()
    result = db.table("users").select("*").eq("id", user["id"]).single().execute()
    if not result.data:
        raise Exception("User profile not found")
    return result.data


@router.put("/me", response_model=UserProfileResponse)
async def update_profile(
    body: UpdateProfileRequest,
    user: dict = Depends(get_current_user),
):
    from db.client import get_db
    db = get_db()
    update_data = body.model_dump(exclude_none=True)
    result = db.table("users").update(update_data).eq("id", user["id"]).execute()
    return result.data[0]


@router.get("/me/usage", response_model=UsageStatsResponse)
async def get_usage(user: dict = Depends(get_current_user)):
    from db.client import get_db
    db = get_db()
    result = (
        db.table("users")
        .select("plan, daily_ai_calls")
        .eq("id", user["id"])
        .single()
        .execute()
    )
    data = result.data or {"plan": "free", "daily_ai_calls": 0}
    limit = FREE_DAILY_LIMIT if data["plan"] == "free" else 9999
    return UsageStatsResponse(
        daily_ai_calls=data["daily_ai_calls"],
        daily_limit=limit,
        calls_remaining=max(0, limit - data["daily_ai_calls"]),
        plan=data["plan"],
    )
