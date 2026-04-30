import hashlib
from .client import get_db


def make_cache_key(prompt_type: str, content: str) -> str:
    raw = f"{prompt_type}:{content}"
    return hashlib.sha256(raw.encode()).hexdigest()


async def get_cached_response(cache_key: str) -> str | None:
    db = get_db()
    try:
        result = (
            db.table("ai_cache")
            .select("response_text, hit_count")
            .eq("cache_key", cache_key)
            .gt("expires_at", "now()")
            .single()
            .execute()
        )
        if result.data:
            db.table("ai_cache").update(
                {"hit_count": result.data["hit_count"] + 1}
            ).eq("cache_key", cache_key).execute()
            return result.data["response_text"]
    except Exception:
        return None
    return None


async def save_cached_response(
    cache_key: str,
    prompt_type: str,
    response_text: str,
    model_used: str,
) -> None:
    db = get_db()
    try:
        db.table("ai_cache").upsert({
            "cache_key": cache_key,
            "prompt_type": prompt_type,
            "response_text": response_text,
            "model_used": model_used,
        }).execute()
    except Exception:
        pass
