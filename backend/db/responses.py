from .client import get_db


async def save_response(
    user_id: str,
    question_id: str,
    student_answer: str,
    max_score: int,
    attempt_number: int = 1,
) -> dict:
    db = get_db()
    result = (
        db.table("responses")
        .insert({
            "user_id": user_id,
            "question_id": question_id,
            "student_answer": student_answer,
            "max_score": max_score,
            "attempt_number": attempt_number,
        })
        .execute()
    )
    return result.data[0]


async def update_response_with_evaluation(
    response_id: str,
    ai_score: float,
    ai_feedback: dict,
    improved_answer: str,
    model_used: str,
) -> dict:
    db = get_db()
    result = (
        db.table("responses")
        .update({
            "ai_score": ai_score,
            "ai_feedback": ai_feedback,
            "improved_answer": improved_answer,
        })
        .eq("id", response_id)
        .execute()
    )
    return result.data[0]


async def get_responses_by_user(user_id: str, limit: int = 20) -> list[dict]:
    db = get_db()
    result = (
        db.table("responses")
        .select("*, questions(question_text, marks)")
        .eq("user_id", user_id)
        .order("created_at", desc=True)
        .limit(limit)
        .execute()
    )
    return result.data
