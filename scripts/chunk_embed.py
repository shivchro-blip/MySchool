"""
Chunk and Embed Script
Reads structured JSON and embeds chunks into ChromaDB.
Runs fully offline — uses local sentence-transformers model.

Usage:
    python scripts/chunk_embed.py \\
        --input content/structured/english_plus1_ch3.json

Prerequisites:
    Run scripts/pdf_extract.py first to generate the JSON file.
"""

import sys
import argparse
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "backend"))

from modules.content_pipeline import (
    load_structured_json,
    embed_chunks,
    get_collection_stats,
)
from rich.console import Console

console = Console()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Embed structured JSON chunks into ChromaDB",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument("--input", required=True,
                        help="Path to structured JSON file from pdf_extract.py")
    return parser.parse_args()


def main() -> None:
    args  = parse_args()
    path  = Path(args.input)

    if not path.exists():
        console.print(f"[red]File not found:[/red] {args.input}")
        console.print("Run scripts/pdf_extract.py first.")
        sys.exit(1)

    console.rule("[bold]AI Exam Coach — Embedder[/bold]")
    console.print(f"Input: {args.input}")

    chunks = load_structured_json(args.input)
    console.print(f"Loaded {len(chunks)} chunks from JSON")

    embed_chunks(chunks)

    stats = get_collection_stats()
    console.rule("[bold green]Embedding Complete[/bold green]")
    console.print(f"Total chunks in ChromaDB: {stats['total_chunks']}")
    console.print("\nNext: python scripts/seed_db.py --input " + args.input +
                  " --subject-id <uuid> --chapter-id <uuid>")


if __name__ == "__main__":
    main()
