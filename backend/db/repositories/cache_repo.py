import hashlib
from db.client import get_db


class CacheRepository:

    def __init__(self):
        self._db = get_db()

    @staticmethod
    def make_key(prompt_type: str, content: str) -> str:
        raw = f"{prompt_type}:{content}"
        return hashlib.sha256(raw.encode()).hexdigest()

    def get(self, cache_key: str) -> str | None:
        try:
            result = (
                self._db.table("ai_cache")
                .select("response_text, hit_count")
                .eq("cache_key", cache_key)
                .gt("expires_at", "now()")
                .single()
                .execute()
            )
            if result.data:
                self._db.table("ai_cache").update(
                    {"hit_count": result.data["hit_count"] + 1}
                ).eq("cache_key", cache_key).execute()
                return result.data["response_text"]
        except Exception:
            return None
        return None

    def set(
        self,
        cache_key: str,
        prompt_type: str,
        response_text: str,
        model_used: str,
    ) -> None:
        try:
            self._db.table("ai_cache").upsert({
                "cache_key":     cache_key,
                "prompt_type":   prompt_type,
                "response_text": response_text,
                "model_used":    model_used,
            }).execute()
        except Exception:
            pass

    def purge_expired(self) -> int:
        try:
            result = (
                self._db.table("ai_cache")
                .delete()
                .lt("expires_at", "now()")
                .execute()
            )
            return len(result.data)
        except Exception:
            return 0

    def stats(self) -> dict:
        result = self._db.table("ai_cache").select("id, hit_count").execute()
        entries = result.data or []
        return {
            "total_entries": len(entries),
            "total_hits":    sum(e.get("hit_count", 1) for e in entries),
        }
