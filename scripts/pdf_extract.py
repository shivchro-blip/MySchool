"""
PDF Extraction Script
Extracts and structures text from a Tamil Nadu syllabus PDF.

Usage:
    cd C:\\MyProjects\\exam-coach
    python scripts/pdf_extract.py \\
        --input  content/raw/english_plus1.pdf \\
        --output content/structured/english_plus1_ch3.json \\
        --subject ENG1 \\
        --class +1 \\
        --chapter 3 \\
        --title "The Last Lesson" \\
        --pages 45-67

Output:
    Structured JSON file ready for scripts/chunk_embed.py
"""

import sys
import argparse
from pathlib import Path

# Allow running from project root
sys.path.insert(0, str(Path(__file__).parent.parent / "backend"))

from modules.content_pipeline import (
    extract_pdf_pages,
    structure_content,
    save_structured_json,
)
from rich.console import Console

console = Console()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Extract and structure PDF content for AI Exam Coach",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument("--input",   required=True, help="Path to PDF file")
    parser.add_argument("--output",  required=True, help="Output JSON file path")
    parser.add_argument("--subject", required=True, help="Subject code e.g. ENG1")
    parser.add_argument("--class",   required=True, dest="class_level",
                        help="Class level: +1 or +2")
    parser.add_argument("--chapter", required=True, type=int,
                        help="Chapter number")
    parser.add_argument("--title",   required=True, help="Chapter title")
    parser.add_argument("--pages",   default=None,
                        help="Page range e.g. 45-67 (optional)")
    return parser.parse_args()


def main() -> None:
    args = parse_args()

    console.rule("[bold]AI Exam Coach — PDF Extractor[/bold]")
    console.print(f"Input:   {args.input}")
    console.print(f"Subject: {args.subject} {args.class_level}")
    console.print(f"Chapter: {args.chapter} — {args.title}")

    pages = extract_pdf_pages(args.input)

    if args.pages:
        start, end = map(int, args.pages.split("-"))
        pages = [p for p in pages if start <= p["page_number"] <= end]
        console.print(f"Filtered to pages {start}–{end}: {len(pages)} pages")

    chunks = structure_content(
        pages=pages,
        subject_code=args.subject,
        class_level=args.class_level,
        chapter_number=args.chapter,
        chapter_title=args.title,
    )

    save_structured_json(chunks, args.output)

    console.rule("[bold green]Extraction Complete[/bold green]")
    console.print(f"Chunks saved: {len(chunks)}")
    console.print(f"Output:       {args.output}")
    console.print("\nNext: python scripts/chunk_embed.py --input " + args.output)


if __name__ == "__main__":
    main()
