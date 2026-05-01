"""
DB Seed Script
Loads structured JSON chunks into Supabase content_chunks table.
Chunks are inserted with is_validated=False.
Go to the admin panel to validate them after seeding.

Usage:
    python scripts/seed_db.py \\
        --input      content/structured/english_plus1_ch3.json \\
        --subject-id <uuid from Supabase subjects table> \\
        --chapter-id <uuid from Supabase chapters table> \\
        --topic-id   <uuid from Supabase topics table (optional)>

Get UUIDs from Supabase Table Editor after running Phase 1 SQL files.
"""

import sys
import asyncio
import argparse
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "backend"))

from modules.content_pipeline import load_structured_json, load_chunks_to_db
from rich.console import Console

console = Console()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Load structured chunks into Supabase content_chunks table",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument("--input",      required=True,
                        help="Path to structured JSON file")
    parser.add_argument("--subject-id", required=True, dest="subject_id",
                        help="Subject UUID from Supabase subjects table")
    parser.add_argument("--chapter-id", required=True, dest="chapter_id",
                        help="Chapter UUID from Supabase chapters table")
    parser.add_argument("--topic-id",   default=None, dest="topic_id",
                        help="Topic UUID (optional)")
    return parser.parse_args()


async def run(args: argparse.Namespace) -> None:
    console.rule("[bold]AI Exam Coach — DB Seeder[/bold]")

    chunks = load_structured_json(args.input)
    console.print(f"Loaded {len(chunks)} chunks from {args.input}")

    count = await load_chunks_to_db(
        chunks=chunks,
        subject_id=args.subject_id,
        chapter_id=args.chapter_id,
        topic_id=args.topic_id,
    )

    console.rule("[bold green]Seeding Complete[/bold green]")
    console.print(f"Rows inserted into Supabase: {count}")
    console.print(
        "\n[yellow]Next step:[/yellow] Go to the admin panel → Content page "
        "and validate the chunks before students can use them."
    )


def main() -> None:
    asyncio.run(run(parse_args()))


if __name__ == "__main__":
    main()
