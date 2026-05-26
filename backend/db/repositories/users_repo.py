from db.client import get_db

FREE_DAILY_LIMIT = 20


class UsersRepository:

    def __init__(self):
        self._db = get_db()

    def get_by_id(self, user_id: str) -> dict | None:
        result = (
            self._db.table("users")
            .select("*")
            .eq("id", user_id)
            .single()
            .execute()
        )
        return result.data

    def get_plan_and_calls(self, user_id: str) -> dict | None:
        result = (
            self._db.table("users")
            .select("plan, daily_ai_calls")
            .eq("id", user_id)
            .single()
            .execute()
        )
        return result.data

    def increment_ai_calls(self, user_id: str) -> int:
        current = self.get_plan_and_calls(user_id)
        if not current:
            return 0
        new_count = current["daily_ai_calls"] + 1
        self._db.table("users").update(
            {"daily_ai_calls": new_count}
        ).eq("id", user_id).execute()
        return new_count

    def consume_ai_call(self, user_id: str) -> int | None:
        result = self._db.rpc(
            "consume_ai_call",
            {
                "p_user_id": user_id,
                "p_free_daily_limit": FREE_DAILY_LIMIT,
            },
        ).execute()
        if isinstance(result.data, list):
            return result.data[0] if result.data else None
        return result.data

    def update_profile(self, user_id: str, fields: dict) -> dict | None:
        self._db.table("users").update(fields).eq("id", user_id).execute()
        return self.get_by_id(user_id)

    def is_over_limit(self, user_id: str) -> bool:
        user = self.get_plan_and_calls(user_id)
        if not user:
            return False
        if user["plan"] == "paid":
            return False
        return user["daily_ai_calls"] >= FREE_DAILY_LIMIT

    def total_count(self) -> int:
        result = self._db.table("users").select("id", count="exact").execute()
        return result.count or 0

    def log_usage(
        self,
        user_id: str | None,
        action: str,
        model_used: str,
        was_cached: bool,
        tokens_used: int | None = None,
        duration_ms: int | None = None,
    ) -> None:
        try:
            self._db.table("usage_logs").insert({
                "user_id":    user_id,
                "action":     action,
                "model_used": model_used,
                "was_cached": was_cached,
                "tokens_used": tokens_used,
                "duration_ms": duration_ms,
            }).execute()
        except Exception:
            pass
