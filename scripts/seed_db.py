import sys
import asyncio
import argparse
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "backend"))

from modules.content_pipeline import load_structured_json, load_chunks_to_db
from rich.console import Console

console = Console()


async def main():
    parser = argparse.ArgumentParser(
        description="Load structured chunks into Supabase content_chunks table"
    )
    parser.add_argument("--input",      required=True, help="Path to structured JSON file")
    parser.add_argument("--subject-id", required=True, help="Subject UUID from Supabase")
    parser.add_argument("--chapter-id", required=True, help="Chapter UUID from Supabase")
    parser.add_argument("--topic-id",   default=None,  help="Topic UUID (optional)")
    args = parser.parse_args()

    console.rule("[bold]AI Exam Coach — DB Seeder[/bold]")

    chunks = load_structured_json(args.input)
    console.print(f"Loaded {len(chunks)} chunks")

    count = await load_chunks_to_db(
        chunks=chunks,
        subject_id=args.subject_id,
        chapter_id=args.chapter_id,
        topic_id=args.topic_id,
    )

    console.rule("[bold green]Seeding Complete[/bold green]")
    console.print(f"Rows inserted into Supabase: {count}")
    console.print("\nPhase 2 complete. Ready for Phase 3: Backend API.")


if __name__ == "__main__":
    asyncio.run(main())
