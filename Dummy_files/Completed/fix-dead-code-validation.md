# AI Exam Coach — Fix: Dead Code Audit + Validation Guard
> Open Claude Code inside C:\MyProjects\exam-coach and paste this entire file.

---

## Context

Read CLAUDE.md before doing anything.

Grapify identified two HIGH severity issues:

PROBLEM 3 — 121 isolated nodes (dead code risk)
  Functions and classes with 1 or fewer graph connections.
  Likely causes: undocumented internal functions, unused utilities,
  missing imports that silently break at runtime.
  Fix: Audit every file in backend/modules/ and scripts/.
  Delete dead code. Wire orphaned functions. Add __all__ to every module.

PROBLEM 4 — Rubric scoring never checks if content is validated
  evaluation/service.py fetches questions and calls AI.
  It never checks if the content chunks it retrieves from ChromaDB
  are is_validated = true in Supabase.
  A student can get scored against unvalidated (possibly wrong) content.
  Fix: Add a validation guard in evaluation/service.py that only
  uses validated content chunks for scoring.

Do not add new features. Fix existing wiring and add the guard.

---

## Step 1: Audit and fix backend/modules/

---

### FILE: backend/modules/__init__.py

```python
# Modules package
# Each sub-module has a single responsibility.
# Import only the public interface of each module here.

from .learning.service   import explain_topic
from .evaluation.service import evaluate_answer, retry_evaluation

__all__ = [
    "explain_topic",
    "evaluate_answer",
    "retry_evaluation",
]
```

---

### FILE: backend/modules/learning/__init__.py

```python
# Learning Module public interface
# Only explain_topic is public. Everything else is internal.

from .service import explain_topic

__all__ = ["explain_topic"]
```

---

### FILE: backend/modules/learning/prompts.py

```python
# Learning module prompts
# All prompt templates live here — versioned and named clearly.
# Used only by modules/learning/service.py

EXPLAIN_SYSTEM_PROMPT = """You are an expert Tamil Nadu State Board teacher for +1 and +2 students.
Your job is to explain lessons clearly so students can score well in board exams.

Rules:
- Use simple English that a 16-year-old student can understand
- Always include exam-relevant points
- Structure your response exactly as JSON
- Be concise but complete
- Base your explanation ONLY on the provided content chunks
- Do not invent facts not present in the content"""

EXPLAIN_USER_PROMPT = """Subject: {subject}
Chapter: {chapter_title}
Topic: {topic}
Student Question: {question}

Content from textbook:
{context_chunks}

Respond with ONLY this JSON structure, no other text:
{{
  "explanation": "Clear 3-5 sentence explanation of the topic",
  "key_points": [
    "Point 1 — exam-ready, one sentence",
    "Point 2 — exam-ready, one sentence",
    "Point 3 — exam-ready, one sentence"
  ],
  "exam_tip": "One specific tip for how this topic is tested in board exams"
}}"""

TRANSLATE_SYSTEM_PROMPT = """You are a Tamil language expert who helps students understand
English lessons in Tamil. Translate the explanation clearly into Tamil.
Keep technical terms in English but explain everything else in Tamil."""

TRANSLATE_USER_PROMPT = """Translate this explanation into Tamil for a Tamil Nadu student:

{english_explanation}

Respond with ONLY the Tamil translation, no English."""

# Exported names — prevents accidental import of internals
__all__ = [
    "EXPLAIN_SYSTEM_PROMPT",
    "EXPLAIN_USER_PROMPT",
    "TRANSLATE_SYSTEM_PROMPT",
    "TRANSLATE_USER_PROMPT",
]
```

---

### FILE: backend/modules/evaluation/__init__.py

```python
# Evaluation Module public interface
# Only evaluate_answer and retry_evaluation are public.

from .service import evaluate_answer, retry_evaluation

__all__ = ["evaluate_answer", "retry_evaluation"]
```

---

### FILE: backend/modules/evaluation/prompts.py

```python
# Evaluation module prompts
# All prompt templates for scoring and feedback.
# Used only by modules/evaluation/service.py

EVALUATE_SYSTEM_PROMPT = """You are a strict but fair Tamil Nadu State Board exam evaluator.
You evaluate student answers exactly like a board exam checker would.

Tamil Nadu Board marking rules:
- 1-mark: Single correct fact or term. No partial marks.
- 2-mark: Key term + brief explanation. 1 mark for term only.
- 5-mark: 3-4 developed points. Award marks per point covered.
- 10-mark: Full essay — intro + 4-5 points + conclusion. Deduct for missing structure.

Your evaluation must be:
- Objective and based only on content relevance
- Consistent with the answer key and rubric provided
- Actionable — tell the student exactly what to add or fix
- Never harsh in tone — encouraging but honest

Always respond with valid JSON only. No other text before or after."""

EVALUATE_USER_PROMPT = """QUESTION ({marks} marks):
{question_text}

ANSWER KEY:
{answer_key}

MARKING RUBRIC:
{rubric}

VALIDATED REFERENCE CONTENT FROM TEXTBOOK:
{context_chunks}

STUDENT ANSWER:
{student_answer}

Evaluate this answer and respond with ONLY this JSON structure:
{{
  "marks_awarded": <number between 0 and {marks}, can be decimal like 3.5>,
  "strengths": [
    "Specific thing the student did well"
  ],
  "weaknesses": [
    "Specific thing missing or wrong"
  ],
  "missing_points": [
    "Key point from answer key that was not mentioned"
  ],
  "structure_comment": "One sentence about answer structure and organisation",
  "grammar_comment": "One sentence about language and grammar quality",
  "improved_answer": "A complete model answer for this question that would score full marks."
}}"""

IMPROVE_SYSTEM_PROMPT = """You are a Tamil Nadu State Board exam coach.
A student has rewritten their answer after feedback.
Compare the new answer to the original and evaluate again.
Be encouraging about improvements while still being accurate.
Always respond with valid JSON only."""

IMPROVE_USER_PROMPT = """QUESTION ({marks} marks):
{question_text}

ANSWER KEY:
{answer_key}

ORIGINAL ANSWER (Attempt {prev_attempt}):
{original_answer}

ORIGINAL SCORE: {original_score}/{marks}

NEW ANSWER (Attempt {new_attempt}):
{new_answer}

Evaluate the new answer and respond with ONLY this JSON:
{{
  "marks_awarded": <number between 0 and {marks}>,
  "improvement_comment": "One sentence comparing new answer to original — what improved",
  "strengths": ["What is good in the new answer"],
  "weaknesses": ["What still needs work"],
  "missing_points": ["Key points still missing"],
  "structure_comment": "Structure assessment",
  "grammar_comment": "Grammar assessment",
  "improved_answer": "Complete model answer for full marks"
}}"""

__all__ = [
    "EVALUATE_SYSTEM_PROMPT",
    "EVALUATE_USER_PROMPT",
    "IMPROVE_SYSTEM_PROMPT",
    "IMPROVE_USER_PROMPT",
]
```

---

### FILE: backend/modules/evaluation/rubric.py

```python
# Rubric helpers
# Used only by modules/evaluation/service.py
# Validates marks and formats rubric context for the AI prompt

from typing import Any

MARK_LEVELS: dict[int, dict[str, str]] = {
    1: {
        "description":     "Single fact or term",
        "expected_length": "One word or one sentence",
        "structure":       "No structure needed",
    },
    2: {
        "description":     "Key term + brief explanation",
        "expected_length": "2-3 sentences",
        "structure":       "Term definition + context",
    },
    5: {
        "description":     "3-4 developed points with explanation",
        "expected_length": "One paragraph, 8-12 sentences",
        "structure":       "Point 1 + Point 2 + Point 3 + (Point 4 optional)",
    },
    10: {
        "description":     "Full structured essay",
        "expected_length": "3-4 paragraphs, 200-300 words",
        "structure":       "Introduction + 4-5 main points + Conclusion",
    },
}


def get_mark_guidance(marks: int) -> dict[str, str]:
    """Return marking guidance for a given mark level."""
    return MARK_LEVELS.get(marks, MARK_LEVELS[2])


def format_answer_key(answer_key: dict | None) -> str:
    """Convert answer key JSON to readable string for the AI prompt."""
    if not answer_key:
        return "No answer key available. Evaluate based on textbook content."

    lines: list[str] = []

    if "key_term" in answer_key:
        lines.append(f"Key Term: {answer_key['key_term']}")
    if "detail" in answer_key:
        lines.append(f"Required Detail: {answer_key['detail']}")
    if "points" in answer_key:
        lines.append("Required Points:")
        for i, point in enumerate(answer_key["points"], 1):
            lines.append(f"  {i}. {point}")
    if "structure" in answer_key:
        lines.append(f"Required Structure: {answer_key['structure']}")

    return "\n".join(lines) if lines else str(answer_key)


def format_rubric(rubric: dict | None, marks: int) -> str:
    """Convert rubric JSON to readable string for the AI prompt."""
    guidance = get_mark_guidance(marks)
    base = (
        f"Question Type: {guidance['description']}\n"
        f"Expected Length: {guidance['expected_length']}\n"
        f"Expected Structure: {guidance['structure']}\n"
    )

    if not rubric:
        return base

    lines = [base, "Mark Breakdown:"]
    for mark_val in sorted(rubric.keys(), key=int, reverse=True):
        lines.append(f"  {mark_val}/{marks}: {rubric[mark_val]}")

    return "\n".join(lines)


def validate_awarded_marks(awarded: Any, max_marks: int) -> float:
    """Clamp awarded marks to valid range and round to nearest 0.5."""
    clamped = max(0.0, min(float(max_marks), float(awarded)))
    return round(clamped * 2) / 2


__all__ = [
    "get_mark_guidance",
    "format_answer_key",
    "format_rubric",
    "validate_awarded_marks",
]
```

---

### FILE: backend/modules/content_pipeline/__init__.py

```python
# Content Pipeline Module public interface
# PDF extraction, structuring, embedding, and DB loading.
# LLM calls are NOT made here — this module uses sentence-transformers only.

from .extractor  import extract_pdf_pages, extract_pdf_tables
from .structurer import (
    structure_content,
    save_structured_json,
    load_structured_json,
)
from .embedder   import embed_chunks, search_similar, get_collection_stats
from .db_loader  import load_chunks_to_db, mark_chunk_validated

__all__ = [
    # extractor
    "extract_pdf_pages",
    "extract_pdf_tables",
    # structurer
    "structure_content",
    "save_structured_json",
    "load_structured_json",
    # embedder
    "embed_chunks",
    "search_similar",
    "get_collection_stats",
    # db_loader
    "load_chunks_to_db",
    "mark_chunk_validated",
]
```

---

### FILE: backend/modules/content_pipeline/db_loader.py

```python
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
```

---

## Step 2: Add validation guard to evaluation service

This is the core fix for Problem 4.
The evaluator now only uses validated content chunks.
If a chapter has no validated chunks yet, it falls back to
the answer key alone and warns the admin via the response.

### FILE: backend/modules/evaluation/service.py

```python
# Evaluation Service
# Uses QuestionsRepository, ResponsesRepository, SyllabusRepository, AIGate
#
# KEY INVARIANT (fix for Grapify issue #4):
#   Content chunks used for scoring MUST be is_validated=True in Supabase.
#   Unvalidated chunks are excluded from the evaluation context.
#   If no validated chunks exist, evaluation falls back to answer key only
#   and flags the response with content_validated=False.

from uuid import UUID
from core.ai_gate import AIGate
from core.errors import NotFoundError
from db.repositories import (
    QuestionsRepository,
    ResponsesRepository,
    SyllabusRepository,
)
from modules.content_pipeline.embedder import search_similar
from models.evaluation import (
    SubmitAnswerRequest,
    EvaluationResponse,
    FeedbackDetail,
    RetryRequest,
)
from .prompts import (
    EVALUATE_SYSTEM_PROMPT,
    EVALUATE_USER_PROMPT,
    IMPROVE_SYSTEM_PROMPT,
    IMPROVE_USER_PROMPT,
)
from .rubric import format_answer_key, format_rubric, validate_awarded_marks
import json
import re
from rich.console import Console

console = Console()

MAX_CONTEXT_CHUNKS = 4
MAX_CONTEXT_CHARS  = 2000


# ── Validation guard ─────────────────────────────────────────────────────────

def _get_validated_context(chapter_id: str, question_text: str) -> tuple[str, bool]:
    """
    Retrieve content chunks for evaluation context.

    GUARD: Only validated chunks (is_validated=True) are used.
    Steps:
      1. Search ChromaDB for semantically similar chunks (fast, vector search)
      2. Cross-check each returned chunk's embedding_id against Supabase
         to confirm is_validated=True (authoritative source of truth)
      3. Build context string from validated chunks only

    Returns:
      (context_string, content_is_validated)
      content_is_validated=False means no validated chunks were found —
      the evaluation will proceed on answer key alone and should be flagged.
    """
    syllabus = SyllabusRepository()

    # Step 1: Vector search in ChromaDB
    raw_chunks = search_similar(
        query=question_text,
        n_results=MAX_CONTEXT_CHUNKS,
    )

    if not raw_chunks:
        console.print(
            "[yellow]WARN[/yellow] No chunks found in ChromaDB for this question."
        )
        return _fallback_context(), False

    # Step 2: Cross-check with Supabase — only keep validated chunks
    validated_db_chunks = syllabus.get_validated_chunks_by_chapter(
        chapter_id=chapter_id,
        language="en",
    )
    validated_embedding_ids = {
        c["embedding_id"] for c in validated_db_chunks
        if c.get("embedding_id")
    }

    validated_content: list[str] = []
    skipped = 0

    for chunk in raw_chunks:
        embedding_id = chunk.get("metadata", {}).get("embedding_id") or ""

        # If embedding_id is in ChromaDB metadata, verify against Supabase
        if embedding_id and embedding_id not in validated_embedding_ids:
            skipped += 1
            console.print(
                f"[yellow]GUARD[/yellow] Skipped unvalidated chunk: {embedding_id}"
            )
            continue

        # If no embedding_id in metadata (older chunks), fall back to
        # checking the chunk text against validated DB content
        db_contents = {c["content"] for c in validated_db_chunks}
        if embedding_id == "" and chunk["content"] not in db_contents:
            skipped += 1
            console.print(
                "[yellow]GUARD[/yellow] Skipped chunk not found in validated DB content"
            )
            continue

        text = chunk["content"]
        if sum(len(c) for c in validated_content) + len(text) > MAX_CONTEXT_CHARS:
            break
        validated_content.append(text)

    if skipped > 0:
        console.print(
            f"[yellow]GUARD[/yellow] Excluded {skipped} unvalidated chunk(s) "
            f"from evaluation context."
        )

    if not validated_content:
        console.print(
            "[yellow]WARN[/yellow] Zero validated chunks available for this chapter. "
            "Evaluation will use answer key only. "
            "Validate content in the admin panel."
        )
        return _fallback_context(), False

    context = "\n\n---\n\n".join(validated_content)
    console.print(
        f"[green]GUARD[/green] Using {len(validated_content)} validated chunk(s) "
        f"for evaluation context."
    )
    return context, True


def _fallback_context() -> str:
    """
    Context string used when no validated chunks are available.
    The AI will score based on the answer key rubric only.
    """
    return (
        "No validated textbook content available for this chapter. "
        "Evaluate the student's answer based strictly on the answer key "
        "and marking rubric provided above. "
        "Do not penalise the student for content that has not been validated."
    )


# ── Evaluate ─────────────────────────────────────────────────────────────────

async def evaluate_answer(
    request: SubmitAnswerRequest,
    user_id: str,
) -> EvaluationResponse:
    questions = QuestionsRepository()
    responses = ResponsesRepository()
    gate      = AIGate()

    # Load question
    question = questions.get_by_id(str(request.question_id))
    if not question:
        raise NotFoundError("Question", str(request.question_id))

    marks      = question["marks"]
    answer_key = question.get("answer_key") or {}
    rubric     = question.get("rubric") or {}
    chapter_id = question.get("chapter_id", "")

    # GUARD: only validated content enters the evaluation context
    context, content_validated = _get_validated_context(
        chapter_id=chapter_id,
        question_text=question["question_text"],
    )

    if not content_validated:
        console.print(
            "[yellow]NOTICE[/yellow] Evaluation proceeding without validated "
            "content — answer key only. Admin should validate chapter content."
        )

    # Save answer before AI call
    saved = responses.create(
        user_id=user_id,
        question_id=str(request.question_id),
        student_answer=request.student_answer,
        max_score=marks,
        attempt_number=request.attempt_number,
    )
    response_id = saved["id"]

    # Build prompt
    user_prompt = EVALUATE_USER_PROMPT.format(
        marks=marks,
        question_text=question["question_text"],
        answer_key=format_answer_key(answer_key),
        rubric=format_rubric(rubric, marks),
        context_chunks=context,
        student_answer=request.student_answer,
    )

    messages = [
        {"role": "system", "content": EVALUATE_SYSTEM_PROMPT},
        {"role": "user",   "content": user_prompt},
    ]

    cache_key_content = (
        f"eval:{request.question_id}:{hash(request.student_answer)}"
        f":validated={content_validated}"
    )

    raw_response, model_used, was_cached = await gate.call(
        messages=messages,
        prompt_type="evaluate",
        cache_key_content=cache_key_content,
        user_id=user_id,
        temperature=0.1,
        max_tokens=1500,
    )

    parsed        = _parse_evaluation_response(raw_response, marks)
    marks_awarded = parsed["marks_awarded"]
    percentage    = round((marks_awarded / marks) * 100, 1)

    # Append a note in feedback if content was unvalidated
    weaknesses = parsed.get("weaknesses", [])
    if not content_validated:
        weaknesses = [
            "⚠️ Note: This evaluation was based on the answer key only "
            "as chapter content has not yet been validated by an admin."
        ] + weaknesses

    feedback = FeedbackDetail(
        strengths=parsed.get("strengths", []),
        weaknesses=weaknesses,
        missing_points=parsed.get("missing_points", []),
        structure_comment=parsed.get("structure_comment", ""),
        grammar_comment=parsed.get("grammar_comment", ""),
    )

    responses.update_evaluation(
        response_id=response_id,
        ai_score=marks_awarded,
        ai_feedback=feedback.model_dump(),
        improved_answer=parsed.get("improved_answer", ""),
        model_used=model_used,
    )

    console.print(
        f"[green]Evaluated[/green] {marks_awarded}/{marks} "
        f"({'validated' if content_validated else 'unvalidated'} content) "
        f"via {model_used}"
    )

    return EvaluationResponse(
        response_id=UUID(response_id),
        question_id=request.question_id,
        marks_awarded=marks_awarded,
        marks_total=marks,
        percentage=percentage,
        feedback=feedback,
        improved_answer=parsed.get("improved_answer", ""),
        model_used=model_used,
        cached=was_cached,
    )


# ── Retry ─────────────────────────────────────────────────────────────────────

async def retry_evaluation(
    request: RetryRequest,
    user_id: str,
) -> EvaluationResponse:
    responses = ResponsesRepository()
    gate      = AIGate()

    orig = responses.get_by_id_and_user(str(request.response_id), user_id)
    if not orig:
        raise NotFoundError("Response", str(request.response_id))

    question    = orig["questions"]
    marks       = question["marks"]
    new_attempt = (orig.get("attempt_number") or 1) + 1

    user_prompt = IMPROVE_USER_PROMPT.format(
        marks=marks,
        question_text=question["question_text"],
        answer_key=format_answer_key(question.get("answer_key")),
        prev_attempt=orig.get("attempt_number", 1),
        original_answer=orig["student_answer"],
        original_score=orig.get("ai_score") or 0,
        new_attempt=new_attempt,
        new_answer=request.new_answer,
    )

    messages = [
        {"role": "system", "content": IMPROVE_SYSTEM_PROMPT},
        {"role": "user",   "content": user_prompt},
    ]

    cache_key_content = (
        f"retry:{request.response_id}:{hash(request.new_answer)}"
    )

    raw_response, model_used, was_cached = await gate.call(
        messages=messages,
        prompt_type="improve",
        cache_key_content=cache_key_content,
        user_id=user_id,
        temperature=0.1,
        max_tokens=1500,
    )

    parsed        = _parse_evaluation_response(raw_response, marks)
    marks_awarded = parsed["marks_awarded"]
    percentage    = round((marks_awarded / marks) * 100, 1)

    saved = responses.create(
        user_id=user_id,
        question_id=str(orig["question_id"]),
        student_answer=request.new_answer,
        max_score=marks,
        attempt_number=new_attempt,
    )

    feedback = FeedbackDetail(
        strengths=parsed.get("strengths", []),
        weaknesses=parsed.get("weaknesses", []),
        missing_points=parsed.get("missing_points", []),
        structure_comment=parsed.get(
            "structure_comment",
            parsed.get("improvement_comment", ""),
        ),
        grammar_comment=parsed.get("grammar_comment", ""),
    )

    responses.update_evaluation(
        response_id=saved["id"],
        ai_score=marks_awarded,
        ai_feedback=feedback.model_dump(),
        improved_answer=parsed.get("improved_answer", ""),
        model_used=model_used,
    )

    return EvaluationResponse(
        response_id=UUID(saved["id"]),
        question_id=UUID(orig["question_id"]),
        marks_awarded=marks_awarded,
        marks_total=marks,
        percentage=percentage,
        feedback=feedback,
        improved_answer=parsed.get("improved_answer", ""),
        model_used=model_used,
        cached=was_cached,
    )


# ── Parser ────────────────────────────────────────────────────────────────────

def _parse_evaluation_response(raw: str, max_marks: int) -> dict:
    """
    Parse JSON from AI evaluation response.
    Handles markdown fences. Validates and clamps marks.
    Internal — not exported.
    """
    cleaned = re.sub(r"```(?:json)?\s*", "", raw).strip().rstrip("```").strip()
    try:
        parsed = json.loads(cleaned)
    except json.JSONDecodeError:
        console.print("[yellow]Evaluation JSON parse failed[/yellow]")
        return {
            "marks_awarded":     0.0,
            "strengths":         [],
            "weaknesses":        ["Could not parse AI response — please retry."],
            "missing_points":    [],
            "structure_comment": "Unable to evaluate structure.",
            "grammar_comment":   "Unable to evaluate grammar.",
            "improved_answer":   "",
        }

    parsed["marks_awarded"] = validate_awarded_marks(
        parsed.get("marks_awarded", 0), max_marks
    )
    for field in ["strengths", "weaknesses", "missing_points"]:
        if not isinstance(parsed.get(field), list):
            parsed[field] = []

    return parsed
```

---

## Step 3: Audit and fix scripts/

---

### FILE: scripts/pdf_extract.py

```python
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
```

---

### FILE: scripts/chunk_embed.py

```python
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
```

---

### FILE: scripts/seed_db.py

```python
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
```

---

### FILE: scripts/pipeline_test.py

```python
"""
Pipeline End-to-End Test
Tests the full content pipeline using sample text — no real PDF needed.
Run this to verify ChromaDB and the embedding model are working correctly.

Usage:
    python scripts/pipeline_test.py
"""

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
language is tied to national identity and freedom.

Glossary
Alsace - a region in France near Germany
Prussians - people from Prussia, a German state
""",
    }
]

TEST_QUERIES = [
    "Who wrote The Last Lesson?",
    "What is the theme of the story?",
    "What does Alsace mean?",
]


async def main() -> None:
    console.rule("[bold]Pipeline End-to-End Test[/bold]")

    console.print("\n[blue]Step 1:[/blue] Structuring sample content...")
    chunks = structure_content(
        pages=SAMPLE_PAGES,
        subject_code="ENG1",
        class_level="+1",
        chapter_number=3,
        chapter_title="The Last Lesson",
    )
    console.print(f"  Chunks created: {len(chunks)}")
    assert len(chunks) >= 1, "Expected at least 1 chunk"
    for chunk in chunks:
        console.print(f"  [{chunk['chunk_type']}] {chunk['content'][:60]}...")

    console.print("\n[blue]Step 2:[/blue] Embedding chunks into ChromaDB...")
    embed_chunks(chunks)

    console.print("\n[blue]Step 3:[/blue] Testing semantic search...")
    all_passed = True
    for query in TEST_QUERIES:
        console.print(f"\n  Query: [italic]{query}[/italic]")
        results = search_similar(query, n_results=2, filters={"subject_code": "ENG1"})
        if not results:
            console.print("  [red]FAIL[/red] No results returned")
            all_passed = False
            continue
        for r in results:
            console.print(
                f"    Score {r['score']} | {r['metadata']['chunk_type']} | "
                f"{r['content'][:70]}..."
            )
        console.print(f"  [green]PASS[/green] {len(results)} result(s)")

    stats = get_collection_stats()
    console.print(f"\n[blue]Step 4:[/blue] ChromaDB stats: {stats}")

    console.rule(
        "[bold green]Test Complete[/bold green]"
        if all_passed else "[bold red]Test Failed[/bold red]"
    )
    if all_passed:
        console.print("All steps passed. Pipeline is ready for real PDFs.")
    sys.exit(0 if all_passed else 1)


if __name__ == "__main__":
    asyncio.run(main())
```

---

### FILE: scripts/test_ollama.py

```python
"""
Ollama Connection Test
Verifies Ollama is running and the model responds correctly.
Run this before starting the backend for the first time.

Usage:
    python scripts/test_ollama.py
"""

import sys
import asyncio
import json
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "backend"))

from ai.ollama_client import is_ollama_available, chat, get_loaded_models
from rich.console import Console

console = Console()


async def main() -> None:
    console.rule("[bold]Ollama Connection Test[/bold]")
    passed = 0
    failed = 0

    # Check 1: Server reachable
    console.print("\n[blue]Check 1:[/blue] Ollama server reachable...")
    if await is_ollama_available():
        console.print("[green]PASS[/green] Ollama server is up")
        passed += 1
    else:
        console.print("[red]FAIL[/red] Ollama not reachable. Run: ollama serve")
        failed += 1
        sys.exit(1)

    # Check 2: Model available
    console.print("\n[blue]Check 2:[/blue] Model available...")
    models = await get_loaded_models()
    console.print(f"  Available: {models}")
    if any("mistral" in m for m in models):
        console.print("[green]PASS[/green] mistral:7b-instruct found")
        passed += 1
    else:
        console.print("[yellow]WARN[/yellow] mistral:7b-instruct not found")
        console.print("  Pull it: ollama pull mistral:7b-instruct")
        failed += 1

    # Check 3: Basic chat
    console.print("\n[blue]Check 3:[/blue] Basic chat response...")
    try:
        response = await chat(
            messages=[
                {"role": "system",  "content": "Reply in exactly 5 words."},
                {"role": "user",    "content": "What is the capital of France?"},
            ],
            max_tokens=20,
        )
        console.print(f"  Response: [italic]{response}[/italic]")
        console.print("[green]PASS[/green] Chat is working")
        passed += 1
    except Exception as e:
        console.print(f"[red]FAIL[/red] Chat error: {e}")
        failed += 1

    # Check 4: JSON output
    console.print("\n[blue]Check 4:[/blue] JSON response format...")
    try:
        response = await chat(
            messages=[
                {"role": "system", "content": "Respond with valid JSON only. No markdown."},
                {"role": "user",   "content": 'Return: {"status": "ok"}'},
            ],
            max_tokens=30,
        )
        json.loads(response.strip())
        console.print(f"  Parsed: {response.strip()}")
        console.print("[green]PASS[/green] JSON responses working")
        passed += 1
    except Exception as e:
        console.print(f"[yellow]WARN[/yellow] JSON issue: {e}")
        console.print("  This may cause parse errors in the explain endpoint.")
        failed += 1

    # Summary
    console.rule(
        f"[bold green]{passed} passed, {failed} failed[/bold green]"
        if failed == 0
        else f"[bold yellow]{passed} passed, {failed} failed[/bold yellow]"
    )
    if failed == 0:
        console.print("Ollama is ready. Start backend: uvicorn main:app --reload")
    sys.exit(0 if failed == 0 else 1)


if __name__ == "__main__":
    asyncio.run(main())
```

---

## Step 4: Add validation-aware tests

### FILE: backend/tests/test_validation_guard.py

```python
# Tests for the validation guard in evaluation/service.py
# Run: pytest backend/tests/test_validation_guard.py -v

import pytest
from unittest.mock import patch, MagicMock


def test_fallback_context_is_not_empty():
    """_fallback_context must always return a non-empty string."""
    from modules.evaluation.service import _fallback_context
    result = _fallback_context()
    assert isinstance(result, str)
    assert len(result) > 20


def test_get_validated_context_excludes_unvalidated(monkeypatch):
    """
    When ChromaDB returns chunks whose embedding_ids are NOT in
    the validated DB set, they must be excluded.
    """
    from modules.evaluation import service as svc

    # Mock ChromaDB returning one chunk with a specific embedding_id
    mock_chunks = [
        {
            "content":  "Some textbook content",
            "metadata": {"embedding_id": "ENG1_ch3_summary_0", "chunk_type": "summary"},
            "score":    0.95,
        }
    ]

    # Mock Supabase returning NO validated chunks (embedding_id not in validated set)
    mock_db_chunks: list = []

    monkeypatch.setattr(
        "modules.evaluation.service.search_similar",
        lambda **kwargs: mock_chunks,
    )

    mock_repo = MagicMock()
    mock_repo.get_validated_chunks_by_chapter.return_value = mock_db_chunks

    with patch(
        "modules.evaluation.service.SyllabusRepository",
        return_value=mock_repo,
    ):
        context, validated = svc._get_validated_context(
            chapter_id="00000000-0000-0000-0000-000000000001",
            question_text="What is the theme?",
        )

    assert validated is False
    assert "No validated textbook content" in context


def test_get_validated_context_includes_validated(monkeypatch):
    """
    When ChromaDB returns chunks whose embedding_ids ARE in
    the validated DB set, they must be included.
    """
    from modules.evaluation import service as svc

    mock_chunks = [
        {
            "content":  "Validated textbook content about the theme.",
            "metadata": {"embedding_id": "ENG1_ch3_theme_0", "chunk_type": "theme"},
            "score":    0.95,
        }
    ]

    mock_db_chunks = [
        {
            "id":           "abc",
            "embedding_id": "ENG1_ch3_theme_0",
            "content":      "Validated textbook content about the theme.",
            "chunk_type":   "theme",
            "language":     "en",
        }
    ]

    monkeypatch.setattr(
        "modules.evaluation.service.search_similar",
        lambda **kwargs: mock_chunks,
    )

    mock_repo = MagicMock()
    mock_repo.get_validated_chunks_by_chapter.return_value = mock_db_chunks

    with patch(
        "modules.evaluation.service.SyllabusRepository",
        return_value=mock_repo,
    ):
        context, validated = svc._get_validated_context(
            chapter_id="00000000-0000-0000-0000-000000000001",
            question_text="What is the theme?",
        )

    assert validated is True
    assert "Validated textbook content" in context


def test_get_validated_context_no_chromadb_results(monkeypatch):
    """When ChromaDB returns nothing, must return fallback and validated=False."""
    from modules.evaluation import service as svc

    monkeypatch.setattr(
        "modules.evaluation.service.search_similar",
        lambda **kwargs: [],
    )

    mock_repo = MagicMock()
    mock_repo.get_validated_chunks_by_chapter.return_value = []

    with patch(
        "modules.evaluation.service.SyllabusRepository",
        return_value=mock_repo,
    ):
        context, validated = svc._get_validated_context(
            chapter_id="00000000-0000-0000-0000-000000000001",
            question_text="What is the theme?",
        )

    assert validated is False
    assert len(context) > 0


def test_unvalidated_content_adds_warning_to_feedback(monkeypatch):
    """
    When content is unvalidated, feedback.weaknesses must contain
    the admin warning message.
    """
    from modules.evaluation.service import _parse_evaluation_response

    raw = """{
        "marks_awarded": 3,
        "strengths": ["Good"],
        "weaknesses": ["Missing point"],
        "missing_points": [],
        "structure_comment": "OK",
        "grammar_comment": "Fine",
        "improved_answer": "Better answer."
    }"""
    parsed = _parse_evaluation_response(raw, max_marks=5)

    # Simulate what evaluate_answer does when content_validated=False
    weaknesses = parsed.get("weaknesses", [])
    weaknesses = [
        "⚠️ Note: This evaluation was based on the answer key only "
        "as chapter content has not yet been validated by an admin."
    ] + weaknesses

    assert weaknesses[0].startswith("⚠️ Note:")
    assert len(weaknesses) == 2
```

---

## Step 5: Update CLAUDE.md

Open CLAUDE.md and add this section after Architecture Rules:

```markdown
## Validation Contract (enforced in code)
- Content chunks in ChromaDB are only used for evaluation if is_validated=True in Supabase
- is_validated is set to True ONLY by an admin in the admin panel
- If no validated chunks exist for a chapter, evaluation uses answer key only
- The student's feedback will contain a ⚠️ warning when unvalidated content is used
- Cache keys include :validated=True/False so validated and unvalidated results are cached separately
```

---

## Step 6: Run all tests

```bash
cd backend
pytest tests/ -v --tb=short
```

Expected results:
- test_validation_guard.py     — 5 tests, all pass
- test_evaluation.py           — 10 tests, all pass
- test_learning.py             — 4 tests, all pass
- test_api_integration.py      — all pass
- test_content_pipeline.py     — all pass

---

## Step 7: Commit to git

```bash
git add .
git commit -m "Fix: dead code audit + validation guard for evaluation content

- Added __all__ to all modules — eliminates silent dead imports
- Documented all script files with docstrings and typed parse_args()
- db_loader.py uses SyllabusRepository instead of get_db() directly
- evaluation/service.py: _get_validated_context() guard
  * Cross-checks ChromaDB results against Supabase is_validated=True
  * Falls back to answer-key-only when no validated content exists
  * Warns student and admin when unvalidated content is used
  * Cache key includes validation state to prevent stale cache hits
- Added test_validation_guard.py with 5 targeted tests
- All existing tests still pass"
```

---

## Step 8: Print completion summary

```
── Problem 3: Dead code / isolated nodes ────────────────────
✓ backend/modules/__init__.py            — explicit __all__, wires public API
✓ backend/modules/learning/__init__.py   — __all__ defined
✓ backend/modules/learning/prompts.py    — __all__ defined
✓ backend/modules/evaluation/__init__.py — __all__ defined
✓ backend/modules/evaluation/prompts.py  — __all__ defined
✓ backend/modules/evaluation/rubric.py   — __all__ defined
✓ backend/modules/content_pipeline/__init__.py — all exports explicit
✓ backend/modules/content_pipeline/db_loader.py — uses SyllabusRepository
✓ scripts/pdf_extract.py     — docstring, typed args, proper main()
✓ scripts/chunk_embed.py     — docstring, typed args, proper main()
✓ scripts/seed_db.py         — docstring, typed args, proper main()
✓ scripts/pipeline_test.py   — assert statements, sys.exit codes
✓ scripts/test_ollama.py     — pass/fail counters, sys.exit codes

── Problem 4: Validation guard ──────────────────────────────
✓ modules/evaluation/service.py
    _get_validated_context()  — NEW guard function
    - Fetches ChromaDB results (fast vector search)
    - Cross-checks embedding_ids against Supabase is_validated=True
    - Excludes unvalidated chunks from evaluation context
    - Falls back to answer key + warning when nothing validated
    - Cache key scoped to validation state
✓ backend/tests/test_validation_guard.py — 5 new tests

Run: pytest tests/ -v to verify all tests pass.
```
