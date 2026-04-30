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


def main():
    parser = argparse.ArgumentParser(
        description="Embed structured JSON chunks into ChromaDB"
    )
    parser.add_argument("--input", required=True, help="Path to structured JSON file")
    args = parser.parse_args()

    path = Path(args.input)
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
    console.print("\nNext step: run scripts/seed_db.py to load into Supabase")


if __name__ == "__main__":
    main()
