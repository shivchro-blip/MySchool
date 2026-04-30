import sys
import asyncio
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "backend"))

from modules.content_pipeline import (
    structure_content,
    embed_chunks,
    search_similar,
    get_collection_stats,
)
from rich.console import Console

console = Console()

SAMPLE_PAGES = [
    {
        "page_number": 1,
        "text": """
About The Author
Alphonse Daudet was a famous French author born in 1840. He wrote
many short stories. Monday Tales is his most famous collection.

Summary
The Last Lesson is set in Alsace, France. Franz, a young student,
is late for school. He finds the class unusually quiet. M. Hamel,
the teacher, announces that this is the last French lesson because
the Prussians have ordered all schools to teach German instead.

Theme
The story explores love for one's mother tongue. It shows how
language is tied to national identity and freedom. The theme of
regret runs through the entire story.

Glossary
Alsace - a region in France near Germany
Prussians - people from Prussia, a German state
Patriotism - love for one's country
""",
    }
]


async def run_test():
    console.rule("[bold]Pipeline Test[/bold]")

    console.print("\n[blue]Step 1:[/blue] Structuring sample content...")
    chunks = structure_content(
        pages=SAMPLE_PAGES,
        subject_code="ENG1",
        class_level="+1",
        chapter_number=3,
        chapter_title="The Last Lesson",
    )
    console.print(f"  Chunks created: {len(chunks)}")
    for chunk in chunks:
        console.print(f"  [{chunk['chunk_type']}] {chunk['content'][:60]}...")

    console.print("\n[blue]Step 2:[/blue] Embedding chunks...")
    embed_chunks(chunks)

    console.print("\n[blue]Step 3:[/blue] Testing semantic search...")
    queries = [
        "Who wrote The Last Lesson?",
        "What is the theme of the story?",
        "What does Alsace mean?",
    ]
    for query in queries:
        console.print(f"\n  Query: [italic]{query}[/italic]")
        results = search_similar(query, n_results=2, filters={"subject_code": "ENG1"})
        for r in results:
            console.print(
                f"    Score {r['score']} | {r['metadata']['chunk_type']} | "
                f"{r['content'][:80]}..."
            )

    stats = get_collection_stats()
    console.print(f"\n[blue]Step 4:[/blue] ChromaDB stats: {stats}")

    console.rule("[bold green]Pipeline Test Complete[/bold green]")
    console.print("All steps passed. Ready to run on real PDF.")


if __name__ == "__main__":
    asyncio.run(run_test())
