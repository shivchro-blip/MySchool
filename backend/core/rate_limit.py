from core.errors import RateLimitError

FREE_DAILY_LIMIT = 20


async def check_rate_limit(user_id: str) -> None:
    from db.client import get_db
    db = get_db()
    result = (
        db.table("users")
        .select("plan, daily_ai_calls")
        .eq("id", user_id)
        .single()
        .execute()
    )
    if not result.data:
        return
    user = result.data
    if user["plan"] == "paid":
        return
    if user["daily_ai_calls"] >= FREE_DAILY_LIMIT:
        raise RateLimitError()


async def increment_ai_call_count(user_id: str) -> None:
    from db.client import get_db
    db = get_db()
    result = (
        db.table("users")
        .select("daily_ai_calls")
        .eq("id", user_id)
        .single()
        .execute()
    )
    if result.data:
        db.table("users").update(
            {"daily_ai_calls": result.data["daily_ai_calls"] + 1}
        ).eq("id", user_id).execute()
