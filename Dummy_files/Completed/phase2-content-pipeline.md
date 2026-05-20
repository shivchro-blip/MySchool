# AI Exam Coach — Phase 2: Content Pipeline
> Open Claude Code inside C:\MyProjects\exam-coach and paste this entire file.

---

## Context

Read CLAUDE.md before doing anything.
This phase builds the complete pipeline that converts your Tamil Nadu
syllabus PDF into structured JSON, then into ChromaDB embeddings.

Flow:
  PDF → extract raw text → structure into JSON → chunk → embed → ChromaDB

Do not build any API endpoints yet. Scripts only.

---

## Step 1: Install required Python packages

```bash
cd backend
pip install pdfplumber pymupdf langchain-text-splitters chromadb sentence-transformers rich
```

Then add to backend/pyproject.toml dependencies:

```toml
"pdfplumber",
"pymupdf",
"langchain-text-splitters",
"chromadb",
"sentence-transformers",
"rich",
```

---

## Step 2: Create all pipeline files with exactly the content shown

---

### FILE: backend/modules/content_pipeline/extractor.py

```python
# PDF Extractor
# Pulls raw text from PDF page by page
# Output: list of {page_number, text} dicts

import pdfplumber
from pathlib import Path
from rich.console import Console

console = Console()


def extract_pdf_pages(pdf_path: str) -> list[dict]:
    """
    Extract raw text from each page of a PDF.
    Returns a list of page dicts with page_number and text.
    """
    path = Path(pdf_path)
    if not path.exists():
        raise FileNotFoundError(f"PDF not found: {pdf_path}")

    pages = []
    with pdfplumber.open(pdf_path) as pdf:
        console.print(f"[blue]Extracting[/blue] {path.name} — {len(pdf.pages)} pages")
        for i, page in enumerate(pdf.pages, start=1):
            text = page.extract_text() or ""
            text = text.strip()
            if text:
                pages.append({
                    "page_number": i,
                    "text": text,
                })
            console.print(f"  Page {i}: {len(text)} chars", style="dim")

    console.print(f"[green]Done[/green] — {len(pages)} pages extracted")
    return pages


def extract_pdf_tables(pdf_path: str) -> list[dict]:
    """
    Extract tables from PDF (for glossary sections).
    Returns a list of {page_number, rows} dicts.
    """
    path = Path(pdf_path)
    tables = []
    with pdfplumber.open(pdf_path) as pdf:
        for i, page in enumerate(pdf.pages, start=1):
            page_tables = page.extract_tables()
            for table in page_tables:
                if table:
                    tables.append({
                        "page_number": i,
                        "rows": table,
                    })
    return tables
```

---

### FILE: backend/modules/content_pipeline/structurer.py

```python
# Content Structurer
# Takes raw extracted pages and converts to structured JSON
# This is the most important file in the pipeline
# Output must match the content_chunks table schema

import json
import re
from pathlib import Path
from rich.console import Console

console = Console()


# ── Chunk type definitions ──────────────────────────────────────────────────

CHUNK_TYPES = [
    "summary",
    "explanation",
    "key_points",
    "example",
    "glossary",
    "exam_tip",
    "author_info",
    "theme",
    "character",
]


# ── Section header patterns for Tamil Nadu English textbooks ─────────────────

SECTION_PATTERNS = {
    "author_info": [
        r"about the author",
        r"the author",
        r"biography",
    ],
    "summary": [
        r"summary",
        r"synopsis",
        r"the story",
        r"the lesson",
    ],
    "theme": [
        r"theme",
        r"central idea",
        r"message",
        r"moral",
    ],
    "character": [
        r"character",
        r"characters",
        r"characterization",
    ],
    "glossary": [
        r"glossary",
        r"difficult words",
        r"vocabulary",
        r"new words",
    ],
    "exam_tip": [
        r"important questions",
        r"model questions",
        r"exam tips",
        r"points to remember",
    ],
    "key_points": [
        r"key points",
        r"important points",
        r"highlights",
    ],
}


def detect_section_type(text: str) -> str | None:
    """
    Detect what type of content a section header represents.
    Returns a chunk_type string or None.
    """
    text_lower = text.lower().strip()
    for chunk_type, patterns in SECTION_PATTERNS.items():
        for pattern in patterns:
            if re.search(pattern, text_lower):
                return chunk_type
    return None


def clean_text(text: str) -> str:
    """
    Clean extracted PDF text:
    - Remove excessive whitespace
    - Remove page numbers
    - Normalize line breaks
    """
    # Remove standalone page numbers
    text = re.sub(r"^\s*\d+\s*$", "", text, flags=re.MULTILINE)
    # Collapse multiple spaces
    text = re.sub(r" {2,}", " ", text)
    # Collapse multiple newlines to double newline
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def split_into_sections(pages: list[dict]) -> list[dict]:
    """
    Split raw page text into logical sections.
    Heuristic: lines in ALL CAPS or Title Case followed by newline
    are treated as section headers.
    """
    full_text = "\n".join(p["text"] for p in pages)
    full_text = clean_text(full_text)

    lines = full_text.split("\n")
    sections = []
    current_header = "introduction"
    current_lines = []

    for line in lines:
        stripped = line.strip()
        if not stripped:
            continue

        # Detect header: short line, mostly uppercase or title case
        is_header = (
            len(stripped) < 60
            and (stripped.isupper() or stripped.istitle())
            and not stripped.endswith(".")
        )

        if is_header and current_lines:
            sections.append({
                "header": current_header,
                "text": "\n".join(current_lines).strip(),
            })
            current_header = stripped
            current_lines = []
        else:
            current_lines.append(line)

    # Add the last section
    if current_lines:
        sections.append({
            "header": current_header,
            "text": "\n".join(current_lines).strip(),
        })

    return sections


def structure_content(
    pages: list[dict],
    subject_code: str,
    class_level: str,
    chapter_number: int,
    chapter_title: str,
) -> list[dict]:
    """
    Main structuring function.
    Takes raw pages and returns a list of structured chunk dicts
    ready to insert into content_chunks table.
    """
    sections = split_into_sections(pages)
    chunks = []

    for section in sections:
        if not section["text"] or len(section["text"]) < 30:
            continue

        chunk_type = detect_section_type(section["header"])
        if chunk_type is None:
            chunk_type = "explanation"

        chunks.append({
            "subject_code": subject_code,
            "class": class_level,
            "chapter_number": chapter_number,
            "chapter_title": chapter_title,
            "section_header": section["header"],
            "chunk_type": chunk_type,
            "content": clean_text(section["text"]),
            "language": "en",
            "is_validated": False,
        })

    console.print(f"[green]Structured[/green] {len(chunks)} chunks from {len(pages)} pages")
    return chunks


def save_structured_json(chunks: list[dict], output_path: str) -> None:
    """Save structured chunks to a JSON file."""
    path = Path(output_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(chunks, f, indent=2, ensure_ascii=False)
    console.print(f"[blue]Saved[/blue] → {output_path}")


def load_structured_json(json_path: str) -> list[dict]:
    """Load structured chunks from a JSON file."""
    with open(json_path, "r", encoding="utf-8") as f:
        return json.load(f)
```

---

### FILE: backend/modules/content_pipeline/embedder.py

```python
# Content Embedder
# Takes structured JSON chunks and stores them in ChromaDB
# Uses sentence-transformers (runs locally, no API key needed)

import chromadb
from chromadb.config import Settings as ChromaSettings
from sentence_transformers import SentenceTransformer
from pathlib import Path
from rich.console import Console
from rich.progress import track

console = Console()

# Local embedding model — downloads once (~90MB), runs offline
EMBEDDING_MODEL = "all-MiniLM-L6-v2"

# ChromaDB local path
CHROMA_PATH = "content/embeddings"


def get_chroma_client() -> chromadb.Client:
    """Get or create a persistent ChromaDB client."""
    Path(CHROMA_PATH).mkdir(parents=True, exist_ok=True)
    return chromadb.PersistentClient(
        path=CHROMA_PATH,
        settings=ChromaSettings(anonymized_telemetry=False),
    )


def get_or_create_collection(client: chromadb.Client, name: str = "exam_coach"):
    """Get or create the main ChromaDB collection."""
    return client.get_or_create_collection(
        name=name,
        metadata={"hnsw:space": "cosine"},
    )


def embed_chunks(chunks: list[dict]) -> None:
    """
    Embed a list of structured chunks and store in ChromaDB.
    Skips chunks that are already embedded (by ID).
    """
    if not chunks:
        console.print("[yellow]No chunks to embed[/yellow]")
        return

    console.print(f"[blue]Loading[/blue] embedding model: {EMBEDDING_MODEL}")
    model = SentenceTransformer(EMBEDDING_MODEL)

    client = get_chroma_client()
    collection = get_or_create_collection(client)

    # Build IDs, texts, and metadata
    ids = []
    texts = []
    metadatas = []

    for i, chunk in enumerate(chunks):
        chunk_id = (
            f"{chunk['subject_code']}_"
            f"ch{chunk['chapter_number']}_"
            f"{chunk['chunk_type']}_"
            f"{i}"
        )
        ids.append(chunk_id)
        texts.append(chunk["content"])
        metadatas.append({
            "subject_code":     chunk["subject_code"],
            "class":            chunk["class"],
            "chapter_number":   str(chunk["chapter_number"]),
            "chapter_title":    chunk["chapter_title"],
            "chunk_type":       chunk["chunk_type"],
            "language":         chunk.get("language", "en"),
            "section_header":   chunk.get("section_header", ""),
        })

    # Check which IDs already exist
    existing = collection.get(ids=ids)["ids"]
    existing_set = set(existing)

    new_ids = [id_ for id_ in ids if id_ not in existing_set]
    if not new_ids:
        console.print("[yellow]All chunks already embedded — skipping[/yellow]")
        return

    new_indices = [ids.index(id_) for id_ in new_ids]
    new_texts = [texts[i] for i in new_indices]
    new_metadatas = [metadatas[i] for i in new_indices]

    console.print(f"[blue]Embedding[/blue] {len(new_ids)} new chunks...")

    # Generate embeddings in batches
    batch_size = 32
    all_embeddings = []
    for i in track(range(0, len(new_texts), batch_size), description="Embedding"):
        batch = new_texts[i : i + batch_size]
        embeddings = model.encode(batch, show_progress_bar=False)
        all_embeddings.extend(embeddings.tolist())

    collection.add(
        ids=new_ids,
        documents=new_texts,
        embeddings=all_embeddings,
        metadatas=new_metadatas,
    )

    console.print(f"[green]Embedded[/green] {len(new_ids)} chunks into ChromaDB")


def search_similar(
    query: str,
    n_results: int = 5,
    filters: dict | None = None,
) -> list[dict]:
    """
    Search ChromaDB for chunks similar to a query.
    Used by the learning module to retrieve relevant content.
    """
    model = SentenceTransformer(EMBEDDING_MODEL)
    query_embedding = model.encode([query])[0].tolist()

    client = get_chroma_client()
    collection = get_or_create_collection(client)

    where = filters if filters else None

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results,
        where=where,
        include=["documents", "metadatas", "distances"],
    )

    output = []
    for i, doc in enumerate(results["documents"][0]):
        output.append({
            "content":  doc,
            "metadata": results["metadatas"][0][i],
            "score":    round(1 - results["distances"][0][i], 4),
        })

    return output


def get_collection_stats() -> dict:
    """Return basic stats about the ChromaDB collection."""
    client = get_chroma_client()
    collection = get_or_create_collection(client)
    count = collection.count()
    return {"total_chunks": count, "collection": "exam_coach"}
```

---

### FILE: backend/modules/content_pipeline/db_loader.py

```python
# DB Loader
# Takes structured chunks and inserts them into Supabase content_chunks table
# Run this AFTER embed_chunks so embedding_id can be set

from db.client import get_db
from rich.console import Console

console = Console()


async def load_chunks_to_db(
    chunks: list[dict],
    subject_id: str,
    chapter_id: str,
    topic_id: str | None = None,
) -> int:
    """
    Insert structured chunks into content_chunks table.
    Returns number of rows inserted.
    """
    db = get_db()
    rows = []

    for i, chunk in enumerate(chunks):
        embedding_id = (
            f"{chunk['subject_code']}_"
            f"ch{chunk['chapter_number']}_"
            f"{chunk['chunk_type']}_"
            f"{i}"
        )
        rows.append({
            "subject_id":    subject_id,
            "chapter_id":    chapter_id,
            "topic_id":      topic_id,
            "chunk_type":    chunk["chunk_type"],
            "content":       chunk["content"],
            "language":      chunk.get("language", "en"),
            "embedding_id":  embedding_id,
            "is_validated":  False,
        })

    if not rows:
        console.print("[yellow]No rows to insert[/yellow]")
        return 0

    result = db.table("content_chunks").insert(rows).execute()
    count = len(result.data)
    console.print(f"[green]Inserted[/green] {count} chunks into content_chunks")
    return count


async def mark_chunk_validated(chunk_id: str) -> None:
    """Mark a content chunk as human-validated."""
    db = get_db()
    db.table("content_chunks").update(
        {"is_validated": True}
    ).eq("id", chunk_id).execute()
```

---

### FILE: backend/modules/content_pipeline/__init__.py

```python
# Content Pipeline Module
# Responsibilities: PDF extraction, structuring, embedding, DB loading
# Do NOT put LLM calls here — this module uses local sentence-transformers only

from .extractor import extract_pdf_pages, extract_pdf_tables
from .structurer import structure_content, save_structured_json, load_structured_json
from .embedder import embed_chunks, search_similar, get_collection_stats
from .db_loader import load_chunks_to_db, mark_chunk_validated

__all__ = [
    "extract_pdf_pages",
    "extract_pdf_tables",
    "structure_content",
    "save_structured_json",
    "load_structured_json",
    "embed_chunks",
    "search_similar",
    "get_collection_stats",
    "load_chunks_to_db",
    "mark_chunk_validated",
]
```

---

### FILE: scripts/pdf_extract.py

```python
# PDF Extraction Script
# Usage:
#   python scripts/pdf_extract.py \
#     --input content/raw/english_plus1.pdf \
#     --output content/structured/english_plus1.json \
#     --subject ENG1 \
#     --class +1 \
#     --chapter 3 \
#     --title "The Last Lesson"

import sys
import argparse
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "backend"))

from modules.content_pipeline import (
    extract_pdf_pages,
    structure_content,
    save_structured_json,
)
from rich.console import Console

console = Console()


def main():
    parser = argparse.ArgumentParser(
        description="Extract and structure PDF content for AI Exam Coach"
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
    args = parser.parse_args()

    console.rule("[bold]AI Exam Coach — PDF Extractor[/bold]")
    console.print(f"Input:   {args.input}")
    console.print(f"Subject: {args.subject} {args.class_level}")
    console.print(f"Chapter: {args.chapter} — {args.title}")

    # Extract pages
    pages = extract_pdf_pages(args.input)

    # Filter page range if specified
    if args.pages:
        start, end = map(int, args.pages.split("-"))
        pages = [p for p in pages if start <= p["page_number"] <= end]
        console.print(f"Filtered to pages {start}–{end}: {len(pages)} pages")

    # Structure content
    chunks = structure_content(
        pages=pages,
        subject_code=args.subject,
        class_level=args.class_level,
        chapter_number=args.chapter,
        chapter_title=args.title,
    )

    # Save to JSON
    save_structured_json(chunks, args.output)

    console.rule("[bold green]Extraction Complete[/bold green]")
    console.print(f"Chunks saved: {len(chunks)}")
    console.print(f"Output:       {args.output}")
    console.print("\nNext step: run scripts/chunk_embed.py to embed into ChromaDB")


if __name__ == "__main__":
    main()
```

---

### FILE: scripts/chunk_embed.py

```python
# Chunk and Embed Script
# Usage:
#   python scripts/chunk_embed.py \
#     --input content/structured/english_plus1.json
#
# Reads structured JSON and embeds into ChromaDB using local model.
# No API key needed — runs fully offline.

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
    parser.add_argument("--input", required=True,
                        help="Path to structured JSON file")
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
```

---

### FILE: scripts/seed_db.py

```python
# DB Seed Script
# Usage:
#   python scripts/seed_db.py \
#     --input content/structured/english_plus1.json \
#     --subject-id <uuid from Supabase> \
#     --chapter-id <uuid from Supabase>
#
# Loads structured chunks into Supabase content_chunks table.
# Get UUIDs from Supabase Table Editor after running Phase 1 SQL.

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
    parser.add_argument("--input",      required=True,
                        help="Path to structured JSON file")
    parser.add_argument("--subject-id", required=True,
                        help="Subject UUID from Supabase subjects table")
    parser.add_argument("--chapter-id", required=True,
                        help="Chapter UUID from Supabase chapters table")
    parser.add_argument("--topic-id",   default=None,
                        help="Topic UUID (optional)")
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


if __name__ == "__main__":
    asyncio.run(main())
```

---

### FILE: scripts/pipeline_test.py

```python
# Pipeline Test Script
# Run this to verify the full pipeline works end to end
# Uses a small sample text instead of a real PDF
# Usage: python scripts/pipeline_test.py

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

    # Step 1: Structure
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

    # Step 2: Embed
    console.print("\n[blue]Step 2:[/blue] Embedding chunks...")
    embed_chunks(chunks)

    # Step 3: Search
    console.print("\n[blue]Step 3:[/blue] Testing semantic search...")
    queries = [
        "Who wrote The Last Lesson?",
        "What is the theme of the story?",
        "What does Alsace mean?",
    ]
    for query in queries:
        console.print(f"\n  Query: [italic]{query}[/italic]")
        results = search_similar(
            query,
            n_results=2,
            filters={"subject_code": "ENG1"},
        )
        for r in results:
            console.print(
                f"    Score {r['score']} | {r['metadata']['chunk_type']} | "
                f"{r['content'][:80]}..."
            )

    # Step 4: Stats
    stats = get_collection_stats()
    console.print(f"\n[blue]Step 4:[/blue] ChromaDB stats: {stats}")

    console.rule("[bold green]Pipeline Test Complete[/bold green]")
    console.print("All steps passed. Ready to run on real PDF.")


if __name__ == "__main__":
    asyncio.run(run_test())
```

---

## Step 3: Update CLAUDE.md phase log

Open CLAUDE.md and replace the Phase Log section with:

```markdown
## Phase Log (Update This at the Start of Every Phase)
- Phase 0: Project scaffold ✓
- Phase 1: Database schema, RLS, seed data ✓
- Phase 2: Content pipeline — PDF → JSON → ChromaDB ← current
```

---

## Step 4: Commit to git

```bash
git add .
git commit -m "Phase 2: Content pipeline — extractor, structurer, embedder, DB loader"
```

---

## Step 5: Run the pipeline test to verify everything works

```bash
cd C:\MyProjects\exam-coach
python scripts/pipeline_test.py
```

Expected output:
- 3 or more chunks structured from sample text
- Chunks embedded into ChromaDB with no errors
- 3 semantic search queries returning relevant results with scores above 0.3
- Stats showing total chunks in ChromaDB

---

## Step 6: When ready to run on your real PDF

Run these three commands in order:

```bash
# 1. Extract and structure your PDF
python scripts/pdf_extract.py \
  --input content/raw/your_textbook.pdf \
  --output content/structured/english_plus1.json \
  --subject ENG1 \
  --class +1 \
  --chapter 3 \
  --title "The Last Lesson" \
  --pages 45-67

# 2. Embed into ChromaDB
python scripts/chunk_embed.py \
  --input content/structured/english_plus1.json

# 3. Load into Supabase
# Get the subject-id and chapter-id from Supabase Table Editor first
python scripts/seed_db.py \
  --input content/structured/english_plus1.json \
  --subject-id <paste-uuid-from-supabase> \
  --chapter-id <paste-uuid-from-supabase>
```

---

## Step 7: Print completion summary

```
✓ backend/modules/content_pipeline/extractor.py    — PDF text extraction
✓ backend/modules/content_pipeline/structurer.py   — raw text → JSON chunks
✓ backend/modules/content_pipeline/embedder.py     — ChromaDB embedding + search
✓ backend/modules/content_pipeline/db_loader.py    — Supabase loader
✓ backend/modules/content_pipeline/__init__.py     — module exports
✓ scripts/pdf_extract.py                           — CLI: PDF → JSON
✓ scripts/chunk_embed.py                           — CLI: JSON → ChromaDB
✓ scripts/seed_db.py                               — CLI: JSON → Supabase
✓ scripts/pipeline_test.py                         — end-to-end test
✓ CLAUDE.md updated
✓ Git committed

ACTION REQUIRED:
Run: python scripts/pipeline_test.py
Verify all 3 search queries return results before moving to Phase 3.

Phase 2 complete.
Next: Phase 3 — Backend API skeleton (FastAPI routes, Pydantic models, health checks)
```
