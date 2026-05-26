from db.client import get_db


class QuestionsRepository:

    def __init__(self):
        self._db = get_db()

    def get_by_chapter(
        self,
        chapter_id: str,
        marks: int | None = None,
    ) -> list[dict]:
        query = (
            self._db.table("questions")
            .select("*")
            .eq("chapter_id", chapter_id)
            .eq("is_validated", True)
            .eq("is_active", True)
        )
        if marks:
            query = query.eq("marks", marks)
        result = query.order("marks").execute()
        return result.data

    def get_by_id(self, question_id: str) -> dict | None:
        result = (
            self._db.table("questions")
            .select("*")
            .eq("id", question_id)
            .single()
            .execute()
        )
        return result.data

    def get_active_validated_by_id(self, question_id: str) -> dict | None:
        result = (
            self._db.table("questions")
            .select("*")
            .eq("id", question_id)
            .eq("is_validated", True)
            .eq("is_active", True)
            .maybe_single()
            .execute()
        )
        return result.data

    def get_all(
        self,
        chapter_id: str | None = None,
        validated: bool | None = None,
    ) -> list[dict]:
        query = (
            self._db.table("questions")
            .select("*, subjects(name, class), chapters(title, number)")
            .order("created_at", desc=True)
        )
        if chapter_id:
            query = query.eq("chapter_id", chapter_id)
        if validated is not None:
            query = query.eq("is_validated", validated)
        result = query.execute()
        return result.data

    def create(self, data: dict) -> dict:
        result = self._db.table("questions").insert(data).execute()
        return result.data[0]

    def update(self, question_id: str, fields: dict) -> dict | None:
        result = (
            self._db.table("questions")
            .update(fields)
            .eq("id", question_id)
            .execute()
        )
        return result.data[0] if result.data else None

    def deactivate(self, question_id: str) -> None:
        self._db.table("questions").update(
            {"is_active": False}
        ).eq("id", question_id).execute()
