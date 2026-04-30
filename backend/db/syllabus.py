from .client import get_db


async def get_all_subjects() -> list[dict]:
    db = get_db()
    result = db.table("subjects").select("*").eq("is_active", True).execute()
    return result.data


async def get_chapters_by_subject(subject_id: str) -> list[dict]:
    db = get_db()
    result = (
        db.table("chapters")
        .select("*")
        .eq("subject_id", subject_id)
        .eq("is_active", True)
        .order("number")
        .execute()
    )
    return result.data


async def get_topics_by_chapter(chapter_id: str) -> list[dict]:
    db = get_db()
    result = (
        db.table("topics")
        .select("*")
        .eq("chapter_id", chapter_id)
        .eq("is_active", True)
        .order("order_index")
        .execute()
    )
    return result.data
