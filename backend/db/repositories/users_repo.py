from db.client import get_db

FREE_DAILY_LIMIT = 20


class UsersRepository:

    def __init__(self):
        self._db = get_db()

    @staticmethod
    def get_auth_user(jwt: str):
        """Blocking Supabase Auth lookup — call via asyncio.to_thread."""
        return get_db().auth.get_user(jwt)

    def get_by_id(self, user_id: str) -> dict | None:
        # limit(1) rather than single(): a missing row must be None (→ 404),
        # not a PGRST116 exception (→ 500).
        result = (
            self._db.table("users")
            .select("*")
            .eq("id", user_id)
            .limit(1)
            .execute()
        )
        return result.data[0] if result.data else None

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

    def update_profile(self, user_id: str, fields: dict) -> dict | None:
        if not fields:
            return self.get_by_id(user_id)
        # PostgREST returns the updated row (Prefer: return=representation),
        # so no second SELECT round trip is needed.
        result = self._db.table("users").update(fields).eq("id", user_id).execute()
        return result.data[0] if result.data else None

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
