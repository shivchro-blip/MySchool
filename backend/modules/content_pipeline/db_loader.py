# DB Loader
# Inserts structured chunks into Supabase content_chunks table.
# Called by scripts/seed_db.py and api/v1/admin.py pipeline trigger.
# mark_chunk_validated is used by the admin API.

from db.repositories import SyllabusRepository
from rich.console import Console

console = Console()


async def load_chunks_to_db(
    chunks:     list[dict],
    subject_id: str,
    chapter_id: str,
    topic_id:   str | None = None,
) -> int:
    """
    Insert structured chunks into content_chunks table.
    Returns number of rows inserted.
    Chunks are inserted with is_validated=False — admin must validate them.
    """
    repo = SyllabusRepository()
    rows = []

    for i, chunk in enumerate(chunks):
        embedding_id = (
            f"{chunk['subject_code']}_"
            f"ch{chunk['chapter_number']}_"
            f"{chunk['chunk_type']}_"
            f"{i}"
        )
        rows.append({
            "subject_id":   subject_id,
            "chapter_id":   chapter_id,
            "topic_id":     topic_id,
            "chunk_type":   chunk["chunk_type"],
            "content":      chunk["content"],
            "language":     chunk.get("language", "en"),
            "embedding_id": embedding_id,
            "is_validated": False,
        })

    count = repo.insert_chunks(rows)
    console.print(f"[green]Inserted[/green] {count} chunks into content_chunks")
    return count


async def mark_chunk_validated(chunk_id: str) -> None:
    """Mark a content chunk as human-validated. Used by admin panel."""
    SyllabusRepository().validate_chunk(chunk_id)


__all__ = ["load_chunks_to_db", "mark_chunk_validated"]
