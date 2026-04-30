from db.client import get_db
from rich.console import Console

console = Console()


async def load_chunks_to_db(
    chunks: list[dict],
    subject_id: str,
    chapter_id: str,
    topic_id: str | None = None,
) -> int:
    db = get_db()
    rows = [
        {
            "subject_id":   subject_id,
            "chapter_id":   chapter_id,
            "topic_id":     topic_id,
            "chunk_type":   chunk["chunk_type"],
            "content":      chunk["content"],
            "language":     chunk.get("language", "en"),
            "embedding_id": (
                f"{chunk['subject_code']}_"
                f"ch{chunk['chapter_number']}_"
                f"{chunk['chunk_type']}_"
                f"{i}"
            ),
            "is_validated": False,
        }
        for i, chunk in enumerate(chunks)
    ]

    if not rows:
        console.print("[yellow]No rows to insert[/yellow]")
        return 0

    result = db.table("content_chunks").insert(rows).execute()
    count = len(result.data)
    console.print(f"[green]Inserted[/green] {count} chunks into content_chunks")
    return count


async def mark_chunk_validated(chunk_id: str) -> None:
    db = get_db()
    db.table("content_chunks").update({"is_validated": True}).eq("id", chunk_id).execute()
