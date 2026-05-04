from db.client import get_db


class SyllabusRepository:

    def __init__(self):
        self._db = get_db()

    def get_all_subjects(self) -> list[dict]:
        result = (
            self._db.table("subjects")
            .select("*")
            .eq("is_active", True)
            .execute()
        )
        return result.data

    def get_subject_by_id(self, subject_id: str) -> dict | None:
        result = (
            self._db.table("subjects")
            .select("*")
            .eq("id", subject_id)
            .single()
            .execute()
        )
        return result.data

    def get_subject_by_code(self, code: str) -> dict | None:
        result = (
            self._db.table("subjects")
            .select("*")
            .eq("code", code)
            .single()
            .execute()
        )
        return result.data

    def get_subject_by_slug(self, slug: str) -> dict | None:
        result = (
            self._db.table("subjects")
            .select("*")
            .eq("slug", slug)
            .maybe_single()
            .execute()
        )
        return result.data

    def get_chapter_by_slug(self, slug: str) -> dict | None:
        result = (
            self._db.table("chapters")
            .select("*")
            .eq("slug", slug)
            .maybe_single()
            .execute()
        )
        return result.data

    def get_chapters_by_subject(self, subject_id: str) -> list[dict]:
        result = (
            self._db.table("chapters")
            .select("*")
            .eq("subject_id", subject_id)
            .eq("is_active", True)
            .order("number")
            .execute()
        )
        return result.data

    def get_chapter_by_id(self, chapter_id: str) -> dict | None:
        result = (
            self._db.table("chapters")
            .select("title, number, subjects(code, name, class)")
            .eq("id", chapter_id)
            .single()
            .execute()
        )
        return result.data

    def get_topics_by_chapter(self, chapter_id: str) -> list[dict]:
        result = (
            self._db.table("topics")
            .select("*")
            .eq("chapter_id", chapter_id)
            .eq("is_active", True)
            .order("order_index")
            .execute()
        )
        return result.data

    def get_topic_by_id(self, topic_id: str) -> dict | None:
        result = (
            self._db.table("topics")
            .select("title")
            .eq("id", topic_id)
            .single()
            .execute()
        )
        return result.data

    def get_validated_chunks_by_chapter(
        self,
        chapter_id: str,
        chunk_type: str | None = None,
        language: str = "en",
    ) -> list[dict]:
        query = (
            self._db.table("content_chunks")
            .select("id, chunk_type, content, language, section_header")
            .eq("chapter_id", chapter_id)
            .eq("is_validated", True)
            .eq("language", language)
        )
        if chunk_type:
            query = query.eq("chunk_type", chunk_type)
        result = query.order("chunk_type").execute()
        return result.data

    def get_pending_chunks(self, limit: int = 50) -> list[dict]:
        result = (
            self._db.table("content_chunks")
            .select(
                "id, chunk_type, content, language, section_header, "
                "created_at, subjects(name, class), chapters(title, number)"
            )
            .eq("is_validated", False)
            .order("created_at", desc=False)
            .limit(limit)
            .execute()
        )
        return result.data

    def validate_chunk(self, chunk_id: str) -> dict | None:
        result = (
            self._db.table("content_chunks")
            .update({"is_validated": True})
            .eq("id", chunk_id)
            .execute()
        )
        return result.data[0] if result.data else None

    def update_chunk(self, chunk_id: str, fields: dict) -> dict | None:
        allowed = {k: v for k, v in fields.items()
                   if k in ("content", "chunk_type", "section_header", "is_validated")}
        if not allowed:
            return None
        result = (
            self._db.table("content_chunks")
            .update(allowed)
            .eq("id", chunk_id)
            .execute()
        )
        return result.data[0] if result.data else None

    def delete_chunk(self, chunk_id: str) -> None:
        self._db.table("content_chunks").delete().eq("id", chunk_id).execute()

    def insert_chunks(self, rows: list[dict]) -> int:
        if not rows:
            return 0
        result = self._db.table("content_chunks").insert(rows).execute()
        return len(result.data)
