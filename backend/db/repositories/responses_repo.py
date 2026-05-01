from db.client import get_db


class ResponsesRepository:

    def __init__(self):
        self._db = get_db()

    def create(
        self,
        user_id: str,
        question_id: str,
        student_answer: str,
        max_score: int,
        attempt_number: int = 1,
    ) -> dict:
        result = (
            self._db.table("responses")
            .insert({
                "user_id":        user_id,
                "question_id":    question_id,
                "student_answer": student_answer,
                "max_score":      max_score,
                "attempt_number": attempt_number,
            })
            .execute()
        )
        return result.data[0]

    def update_evaluation(
        self,
        response_id: str,
        ai_score: float,
        ai_feedback: dict,
        improved_answer: str,
        model_used: str,
    ) -> dict:
        result = (
            self._db.table("responses")
            .update({
                "ai_score":       ai_score,
                "ai_feedback":    ai_feedback,
                "improved_answer": improved_answer,
            })
            .eq("id", response_id)
            .execute()
        )
        return result.data[0]

    def get_by_user(self, user_id: str, limit: int = 20) -> list[dict]:
        result = (
            self._db.table("responses")
            .select("*, questions(question_text, marks, chapter_id)")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
            .limit(limit)
            .execute()
        )
        return result.data

    def get_by_id_and_user(self, response_id: str, user_id: str) -> dict | None:
        result = (
            self._db.table("responses")
            .select("*, questions(question_text, marks, answer_key, rubric, chapter_id)")
            .eq("id", response_id)
            .eq("user_id", user_id)
            .single()
            .execute()
        )
        return result.data

    def get_pending_review(self, limit: int = 50) -> list[dict]:
        result = (
            self._db.table("responses")
            .select(
                "id, student_answer, ai_score, max_score, ai_feedback, "
                "improved_answer, attempt_number, created_at, "
                "questions(question_text, marks), users(full_name)"
            )
            .eq("is_human_reviewed", False)
            .not_.is_("ai_score", "null")
            .order("created_at", desc=True)
            .limit(limit)
            .execute()
        )
        return result.data

    def submit_human_review(
        self,
        response_id: str,
        human_score: float,
        human_notes: str,
    ) -> dict | None:
        result = (
            self._db.table("responses")
            .update({
                "human_score":       human_score,
                "human_notes":       human_notes,
                "is_human_reviewed": True,
            })
            .eq("id", response_id)
            .execute()
        )
        return result.data[0] if result.data else None
