from .client import get_db


async def get_questions_by_chapter(
    chapter_id: str,
    marks: int | None = None,
) -> list[dict]:
    db = get_db()
    query = (
        db.table("questions")
        .select("*")
        .eq("chapter_id", chapter_id)
        .eq("is_validated", True)
        .eq("is_active", True)
    )
    if marks:
        query = query.eq("marks", marks)
    result = query.order("marks").execute()
    return result.data


async def get_question_by_id(question_id: str) -> dict | None:
    db = get_db()
    result = (
        db.table("questions")
        .select("*")
        .eq("id", question_id)
        .single()
        .execute()
    )
    return result.data
