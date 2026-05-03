# AI Exam Coach — Phase 5: Evaluation Module (AI)
> Open Claude Code inside C:\MyProjects\exam-coach and paste this entire file.

---

## Context

Read CLAUDE.md before doing anything.
This phase builds the evaluation module — the core differentiator of the product.
The /api/v1/evaluation/submit endpoint goes from stub to fully working.

Flow for every evaluation request:
  1. Student submits answer for a question
  2. Load question + answer key + rubric from Supabase
  3. Search ChromaDB for relevant content chunks
  4. Build rubric-aware evaluation prompt
  5. Call AI router (cache → Ollama → OpenRouter)
  6. Parse structured feedback JSON
  7. Generate improved answer
  8. Save full evaluation to responses table
  9. Return scored feedback to student

Do not touch the frontend yet — that is Phase 6.

---

## Step 1: Create all files with exactly the content shown

---

### FILE: backend/modules/evaluation/prompts.py

```python
# Evaluation module prompts
# All prompt templates for the evaluation module live here
# Rubric-aware — matches Tamil Nadu State Board marking scheme

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

REFERENCE CONTENT FROM TEXTBOOK:
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
  "improved_answer": "A complete model answer for this question that would score full marks. Write it as a student would write it in an exam."
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
```

---

### FILE: backend/modules/evaluation/rubric.py

```python
# Rubric helpers
# Validates marks and builds rubric context for the AI prompt

from typing import Any


MARK_LEVELS = {
    1: {
        "description": "Single fact or term",
        "expected_length": "One word or one sentence",
        "structure": "No structure needed",
    },
    2: {
        "description": "Key term + brief explanation",
        "expected_length": "2-3 sentences",
        "structure": "Term definition + context",
    },
    5: {
        "description": "3-4 developed points with explanation",
        "expected_length": "One paragraph, 8-12 sentences",
        "structure": "Point 1 + Point 2 + Point 3 + (Point 4 optional)",
    },
    10: {
        "description": "Full structured essay",
        "expected_length": "3-4 paragraphs, 200-300 words",
        "structure": "Introduction + 4-5 main points + Conclusion",
    },
}


def get_mark_guidance(marks: int) -> dict:
    """Return marking guidance for a given mark level."""
    return MARK_LEVELS.get(marks, MARK_LEVELS[2])


def format_answer_key(answer_key: dict | None) -> str:
    """Convert answer key JSON to readable string for prompt."""
    if not answer_key:
        return "No answer key available. Evaluate based on textbook content."

    lines = []

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
    """Convert rubric JSON to readable string for prompt."""
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


def validate_awarded_marks(awarded: float, max_marks: int) -> float:
    """Clamp awarded marks to valid range and round to nearest 0.5."""
    clamped = max(0.0, min(float(max_marks), float(awarded)))
    rounded = round(clamped * 2) / 2
    return rounded
```

---

### FILE: backend/modules/evaluation/service.py

```python
# Evaluation Service
# Core business logic for the evaluation module
# Scores student answers and generates feedback

import json
import re
from uuid import UUID

from ai.router import call_llm
from modules.content_pipeline.embedder import search_similar
from db.client import get_db
from db import responses as responses_db
from db import questions as questions_db
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
from .rubric import (
    format_answer_key,
    format_rubric,
    validate_awarded_marks,
)
from core.errors import NotFoundError
from rich.console import Console

console = Console()

MAX_CONTEXT_CHUNKS = 4
MAX_CONTEXT_CHARS = 2000


async def evaluate_answer(
    request: SubmitAnswerRequest,
    user_id: str,
) -> EvaluationResponse:
    """
    Full evaluation flow:
    1. Load question + answer key + rubric from Supabase
    2. Search ChromaDB for relevant textbook content
    3. Build rubric-aware evaluation prompt
    4. Call AI router
    5. Parse structured feedback
    6. Save evaluation to responses table
    7. Return EvaluationResponse
    """

    # Step 1: Load question
    question = await questions_db.get_question_by_id(str(request.question_id))
    if not question:
        raise NotFoundError("Question", str(request.question_id))

    marks = question["marks"]
    question_text = question["question_text"]
    answer_key = question.get("answer_key") or {}
    rubric = question.get("rubric") or {}

    console.print(
        f"[blue]Evaluating[/blue] {marks}-mark question: "
        f"{question_text[:60]}..."
    )

    # Step 2: Search ChromaDB for context
    chunks = search_similar(
        query=question_text,
        n_results=MAX_CONTEXT_CHUNKS,
    )

    context_parts = []
    total_chars = 0
    for chunk in chunks:
        text = chunk["content"]
        if total_chars + len(text) > MAX_CONTEXT_CHARS:
            break
        context_parts.append(text)
        total_chars += len(text)

    context = "\n\n---\n\n".join(context_parts) if context_parts else (
        "Evaluate based on the answer key and rubric provided."
    )

    # Step 3: Save student answer first (before AI call)
    saved = await responses_db.save_response(
        user_id=user_id,
        question_id=str(request.question_id),
        student_answer=request.student_answer,
        max_score=marks,
        attempt_number=request.attempt_number,
    )
    response_id = saved["id"]

    # Step 4: Build prompt
    user_prompt = EVALUATE_USER_PROMPT.format(
        marks=marks,
        question_text=question_text,
        answer_key=format_answer_key(answer_key),
        rubric=format_rubric(rubric, marks),
        context_chunks=context,
        student_answer=request.student_answer,
    )

    messages = [
        {"role": "system", "content": EVALUATE_SYSTEM_PROMPT},
        {"role": "user",   "content": user_prompt},
    ]

    # Step 5: Cache key — per question + exact student answer
    cache_key_content = (
        f"eval:{request.question_id}:{hash(request.student_answer)}"
    )

    # Step 6: Call AI
    raw_response, model_used, was_cached = await call_llm(
        messages=messages,
        prompt_type="evaluate",
        cache_key_content=cache_key_content,
        user_id=user_id,
        temperature=0.1,   # Low temp — evaluations must be consistent
        max_tokens=1500,
    )

    # Step 7: Parse response
    parsed = _parse_evaluation_response(raw_response, marks)
    marks_awarded = parsed["marks_awarded"]
    percentage = round((marks_awarded / marks) * 100, 1)

    feedback = FeedbackDetail(
        strengths=parsed.get("strengths", []),
        weaknesses=parsed.get("weaknesses", []),
        missing_points=parsed.get("missing_points", []),
        structure_comment=parsed.get("structure_comment", ""),
        grammar_comment=parsed.get("grammar_comment", ""),
    )
    improved_answer = parsed.get("improved_answer", "")

    # Step 8: Update response record with evaluation
    await responses_db.update_response_with_evaluation(
        response_id=response_id,
        ai_score=marks_awarded,
        ai_feedback=feedback.model_dump(),
        improved_answer=improved_answer,
        model_used=model_used,
    )

    console.print(
        f"[green]Evaluated[/green] {marks_awarded}/{marks} marks "
        f"({percentage}%) via {model_used}"
    )

    return EvaluationResponse(
        response_id=UUID(response_id),
        question_id=request.question_id,
        marks_awarded=marks_awarded,
        marks_total=marks,
        percentage=percentage,
        feedback=feedback,
        improved_answer=improved_answer,
        model_used=model_used,
        cached=was_cached,
    )


async def retry_evaluation(
    request: RetryRequest,
    user_id: str,
) -> EvaluationResponse:
    """
    Re-evaluate an improved answer.
    Loads original response for comparison context.
    """

    # Load original response
    db = get_db()
    orig_result = (
        db.table("responses")
        .select("*, questions(question_text, marks, answer_key, rubric)")
        .eq("id", str(request.response_id))
        .eq("user_id", user_id)
        .single()
        .execute()
    )

    if not orig_result.data:
        raise NotFoundError("Response", str(request.response_id))

    orig = orig_result.data
    question = orig["questions"]
    marks = question["marks"]
    new_attempt = (orig.get("attempt_number") or 1) + 1

    # Build improvement prompt
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

    raw_response, model_used, was_cached = await call_llm(
        messages=messages,
        prompt_type="improve",
        cache_key_content=cache_key_content,
        user_id=user_id,
        temperature=0.1,
        max_tokens=1500,
    )

    parsed = _parse_evaluation_response(raw_response, marks)
    marks_awarded = parsed["marks_awarded"]
    percentage = round((marks_awarded / marks) * 100, 1)

    # Save new response record
    saved = await responses_db.save_response(
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

    await responses_db.update_response_with_evaluation(
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


def _parse_evaluation_response(raw: str, max_marks: int) -> dict:
    """
    Parse JSON from AI evaluation response.
    Handles markdown fences and validates marks range.
    """
    cleaned = re.sub(r"```(?:json)?\s*", "", raw).strip()
    cleaned = cleaned.rstrip("```").strip()

    try:
        parsed = json.loads(cleaned)
    except json.JSONDecodeError:
        console.print("[yellow]Evaluation JSON parse failed[/yellow]")
        return {
            "marks_awarded": 0.0,
            "strengths": [],
            "weaknesses": ["Could not parse AI response"],
            "missing_points": [],
            "structure_comment": "Unable to evaluate structure.",
            "grammar_comment": "Unable to evaluate grammar.",
            "improved_answer": "",
        }

    # Validate and clamp marks
    raw_marks = parsed.get("marks_awarded", 0)
    parsed["marks_awarded"] = validate_awarded_marks(raw_marks, max_marks)

    # Ensure all list fields exist
    for field in ["strengths", "weaknesses", "missing_points"]:
        if field not in parsed or not isinstance(parsed[field], list):
            parsed[field] = []

    return parsed
```

---

### FILE: backend/modules/evaluation/__init__.py

```python
# Evaluation Module
# Responsibilities: score student answers, generate feedback
# Do NOT put LLM calls here — all go through ai/router.py

from .service import evaluate_answer, retry_evaluation

__all__ = ["evaluate_answer", "retry_evaluation"]
```

---

### FILE: backend/api/v1/evaluation.py

```python
# Evaluation routes — fully implemented
# POST /api/v1/evaluation/submit
# POST /api/v1/evaluation/retry
# GET  /api/v1/evaluation/progress
# GET  /api/v1/evaluation/history

from fastapi import APIRouter, Depends, HTTPException
from uuid import UUID
from models import (
    SubmitAnswerRequest,
    EvaluationResponse,
    RetryRequest,
    ProgressResponse,
)
from core.auth import get_current_user
from core.rate_limit import check_rate_limit
from core.errors import NotFoundError, AIUnavailableError
from modules.evaluation import evaluate_answer, retry_evaluation
from db import responses as responses_db

router = APIRouter()


@router.post("/submit", response_model=EvaluationResponse)
async def submit_answer(
    request: SubmitAnswerRequest,
    user: dict = Depends(get_current_user),
):
    """
    Submit a student answer for AI evaluation.

    - Loads question rubric and answer key from database
    - Retrieves relevant content from ChromaDB for context
    - Calls Ollama (with OpenRouter fallback) to evaluate
    - Returns marks, feedback, and an improved model answer
    - Results cached to avoid duplicate AI calls
    """
    await check_rate_limit(user["id"])

    try:
        return await evaluate_answer(request=request, user_id=user["id"])
    except NotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except RuntimeError:
        raise AIUnavailableError()


@router.post("/retry", response_model=EvaluationResponse)
async def retry_answer(
    request: RetryRequest,
    user: dict = Depends(get_current_user),
):
    """
    Re-submit an improved answer for re-evaluation.
    Compares new answer against original attempt.
    Increments attempt number automatically.
    """
    await check_rate_limit(user["id"])

    try:
        return await retry_evaluation(request=request, user_id=user["id"])
    except NotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except RuntimeError:
        raise AIUnavailableError()


@router.get("/progress", response_model=ProgressResponse)
async def get_progress(
    user: dict = Depends(get_current_user),
):
    """Return a student's overall progress and average scores."""
    all_responses = await responses_db.get_responses_by_user(
        user["id"], limit=100
    )

    total = len(all_responses)
    avg_score = 0.0

    if total > 0:
        scores = [
            (r["ai_score"] / r["max_score"]) * 100
            for r in all_responses
            if r.get("ai_score") is not None
        ]
        avg_score = round(sum(scores) / len(scores), 1) if scores else 0.0

    # Group by chapter
    by_chapter: dict[str, dict] = {}
    for r in all_responses:
        q = r.get("questions") or {}
        chapter_id = str(q.get("chapter_id", "unknown"))
        if chapter_id not in by_chapter:
            by_chapter[chapter_id] = {
                "chapter_id": chapter_id,
                "attempts": 0,
                "total_score": 0.0,
                "total_possible": 0,
            }
        by_chapter[chapter_id]["attempts"] += 1
        if r.get("ai_score") is not None:
            by_chapter[chapter_id]["total_score"] += r["ai_score"]
            by_chapter[chapter_id]["total_possible"] += r["max_score"]

    chapter_summary = []
    for ch in by_chapter.values():
        possible = ch["total_possible"]
        avg = (
            round((ch["total_score"] / possible) * 100, 1)
            if possible > 0 else 0.0
        )
        chapter_summary.append({
            "chapter_id": ch["chapter_id"],
            "attempts": ch["attempts"],
            "average_score": avg,
        })

    return ProgressResponse(
        user_id=UUID(user["id"]),
        total_attempts=total,
        average_score=avg_score,
        by_chapter=chapter_summary,
    )


@router.get("/history")
async def get_history(
    user: dict = Depends(get_current_user),
    limit: int = 20,
):
    """
    Return the student's recent answer history.
    Includes question text, score, and attempt number.
    """
    data = await responses_db.get_responses_by_user(user["id"], limit=limit)
    return {"history": data, "total": len(data)}
```

---

### FILE: backend/tests/test_evaluation.py

```python
# Evaluation module tests
# Run: pytest backend/tests/test_evaluation.py -v

import pytest
from modules.evaluation.rubric import (
    validate_awarded_marks,
    format_answer_key,
    format_rubric,
)
from modules.evaluation.service import _parse_evaluation_response


# ── rubric tests ────────────────────────────────────────────────────────────

def test_validate_marks_clamps_above_max():
    assert validate_awarded_marks(12.0, 10) == 10.0


def test_validate_marks_clamps_below_zero():
    assert validate_awarded_marks(-1.0, 5) == 0.0


def test_validate_marks_rounds_to_half():
    assert validate_awarded_marks(3.3, 5) == 3.5
    assert validate_awarded_marks(3.7, 5) == 3.5
    assert validate_awarded_marks(3.8, 5) == 4.0


def test_validate_marks_exact_value():
    assert validate_awarded_marks(5.0, 5) == 5.0
    assert validate_awarded_marks(2.5, 5) == 2.5


def test_format_answer_key_with_points():
    key = {"points": ["Point A", "Point B", "Point C"]}
    result = format_answer_key(key)
    assert "Point A" in result
    assert "1." in result


def test_format_answer_key_none():
    result = format_answer_key(None)
    assert "No answer key" in result


def test_format_rubric_adds_guidance():
    result = format_rubric(None, 5)
    assert "3-4 developed points" in result


# ── parse tests ─────────────────────────────────────────────────────────────

def test_parse_valid_evaluation():
    raw = """{
        "marks_awarded": 4,
        "strengths": ["Good explanation"],
        "weaknesses": ["Missing conclusion"],
        "missing_points": ["Patriotism theme"],
        "structure_comment": "Well structured.",
        "grammar_comment": "Good grammar.",
        "improved_answer": "A better answer."
    }"""
    result = _parse_evaluation_response(raw, 5)
    assert result["marks_awarded"] == 4.0
    assert len(result["strengths"]) == 1


def test_parse_clamps_marks():
    raw = '{"marks_awarded": 99, "strengths": [], "weaknesses": [], "missing_points": [], "structure_comment": "", "grammar_comment": "", "improved_answer": ""}'
    result = _parse_evaluation_response(raw, 5)
    assert result["marks_awarded"] == 5.0


def test_parse_with_markdown_fence():
    raw = """```json
{
    "marks_awarded": 2,
    "strengths": ["Correct"],
    "weaknesses": [],
    "missing_points": [],
    "structure_comment": "OK.",
    "grammar_comment": "Fine.",
    "improved_answer": "Better."
}
```"""
    result = _parse_evaluation_response(raw, 2)
    assert result["marks_awarded"] == 2.0


def test_parse_invalid_json_returns_zero():
    result = _parse_evaluation_response("not json at all", 5)
    assert result["marks_awarded"] == 0.0
    assert len(result["weaknesses"]) > 0


def test_parse_decimal_marks():
    raw = '{"marks_awarded": 3.5, "strengths": [], "weaknesses": [], "missing_points": [], "structure_comment": "", "grammar_comment": "", "improved_answer": ""}'
    result = _parse_evaluation_response(raw, 5)
    assert result["marks_awarded"] == 3.5
```

---

### FILE: scripts/test_evaluation.py

```python
# End-to-end evaluation test
# Tests the full evaluate flow with a real question from Supabase
# Run: python scripts/test_evaluation.py
# Requires: Ollama running + Supabase configured + Phase 1 seed data loaded

import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "backend"))

from modules.evaluation.service import evaluate_answer
from models.evaluation import SubmitAnswerRequest
from db import questions as questions_db
from db import syllabus as syllabus_db
from rich.console import Console

console = Console()

# Test answers to try — from weak to strong
TEST_ANSWERS = {
    "weak": "The Last Lesson is a story.",
    "partial": (
        "The Last Lesson is written by Alphonse Daudet. "
        "It is about a French class. The teacher is M. Hamel."
    ),
    "good": (
        "The Last Lesson is written by Alphonse Daudet. "
        "It is set in Alsace, France. The story is about Franz, a young student "
        "who is late to school and discovers it is the last French lesson. "
        "The Prussians have ordered all schools to teach German instead of French. "
        "M. Hamel, the teacher, is very sad. The theme is love for one's mother tongue "
        "and the importance of language to national identity."
    ),
}


async def main():
    console.rule("[bold]Evaluation End-to-End Test[/bold]")

    # Get a real question from Supabase
    console.print("\n[blue]Step 1:[/blue] Loading question from Supabase...")
    subjects = await syllabus_db.get_all_subjects()
    if not subjects:
        console.print("[red]No subjects found. Run Phase 1 seed SQL first.[/red]")
        sys.exit(1)

    subject_id = subjects[0]["id"]
    chapters = await syllabus_db.get_chapters_by_subject(subject_id)
    if not chapters:
        console.print("[red]No chapters found.[/red]")
        sys.exit(1)

    chapter_id = chapters[2]["id"]  # Chapter 3 — The Last Lesson
    questions = await questions_db.get_questions_by_chapter(chapter_id)
    if not questions:
        console.print("[red]No questions found. Run Phase 1 seed SQL first.[/red]")
        sys.exit(1)

    # Pick a 2-mark question for quick test
    test_question = next(
        (q for q in questions if q["marks"] == 2), questions[0]
    )

    console.print(f"  Question: {test_question['question_text']}")
    console.print(f"  Marks: {test_question['marks']}")

    # Test each answer quality
    for quality, answer_text in TEST_ANSWERS.items():
        console.print(f"\n[blue]Testing {quality} answer...[/blue]")
        console.print(f"  Answer: {answer_text[:80]}...")

        try:
            request = SubmitAnswerRequest(
                question_id=test_question["id"],
                student_answer=answer_text,
                attempt_number=1,
            )

            result = await evaluate_answer(
                request=request,
                user_id="00000000-0000-0000-0000-000000000001",
            )

            console.print(
                f"  [green]Score:[/green] {result.marks_awarded}/{result.marks_total} "
                f"({result.percentage}%)"
            )
            console.print(f"  Model: {result.model_used}")
            console.print(f"  Cached: {result.cached}")
            if result.feedback.strengths:
                console.print(f"  Strength: {result.feedback.strengths[0]}")
            if result.feedback.missing_points:
                console.print(f"  Missing: {result.feedback.missing_points[0]}")

        except Exception as e:
            console.print(f"  [red]Error:[/red] {e}")

    console.rule("[bold green]Evaluation Test Complete[/bold green]")
    console.print("\nVerify scores increase: weak < partial < good")
    console.print("If they do, the evaluation module is working correctly.")


if __name__ == "__main__":
    asyncio.run(main())
```

---

## Step 2: Update CLAUDE.md phase log

Open CLAUDE.md and replace the Phase Log section with:

```markdown
## Phase Log (Update This at the Start of Every Phase)
- Phase 0: Project scaffold ✓
- Phase 1: Database schema, RLS, seed data ✓
- Phase 2: Content pipeline — PDF → JSON → ChromaDB ✓
- Phase 3: Backend API skeleton — routes, models, auth, rate limiting ✓
- Phase 4: Learning module — Ollama, ChromaDB retrieval, explain endpoint ✓
- Phase 5: Evaluation module — rubric scoring, feedback, improved answer ← current
```

---

## Step 3: Commit to git

```bash
git add .
git commit -m "Phase 5: Evaluation module — rubric scoring, feedback, retry, progress"
```

---

## Step 4: Run tests in this order

```bash
# 1. Unit tests — no Ollama needed
cd backend
pytest tests/test_evaluation.py -v

# 2. Start backend
uvicorn main:app --reload --port 8000

# 3. End-to-end test — needs Ollama + Supabase
cd ..
python scripts/test_evaluation.py
```

---

## Step 5: Test the submit endpoint manually

Open http://localhost:8000/api/docs

Find POST /api/v1/evaluation/submit and test with this body.
Replace question_id with a real UUID from your Supabase questions table:

```json
{
  "question_id": "<paste-question-uuid-from-supabase>",
  "student_answer": "The Last Lesson is written by Alphonse Daudet. It is about a French class in Alsace where M. Hamel teaches the last French lesson before the Prussians take over and enforce German language.",
  "attempt_number": 1
}
```

Expected response shape:
```json
{
  "response_id": "...",
  "question_id": "...",
  "marks_awarded": 1.5,
  "marks_total": 2,
  "percentage": 75.0,
  "feedback": {
    "strengths": ["Correctly identified the author"],
    "weaknesses": ["Could add more detail about the setting"],
    "missing_points": ["Mention of Alphonse Daudet being French"],
    "structure_comment": "Answer is well structured for a 2-mark question.",
    "grammar_comment": "Grammar is correct throughout."
  },
  "improved_answer": "Alphonse Daudet is a famous French author...",
  "model_used": "mistral:7b-instruct",
  "cached": false
}
```

---

## Step 6: Verify the improve loop works

Test the retry endpoint with the response_id from the previous call:

```json
{
  "response_id": "<paste-response-uuid-from-previous-call>",
  "new_answer": "Alphonse Daudet is a famous French author born in 1840. He wrote The Last Lesson as part of Monday Tales. The story is set in Alsace and shows the importance of mother tongue."
}
```

Score should be higher than the first attempt.

---

## Step 7: Print completion summary

```
✓ backend/modules/evaluation/prompts.py    — evaluate + retry prompts
✓ backend/modules/evaluation/rubric.py     — mark validation + formatting
✓ backend/modules/evaluation/service.py    — full evaluate + retry logic
✓ backend/modules/evaluation/__init__.py   — module exports
✓ backend/api/v1/evaluation.py             — all endpoints live
✓ backend/tests/test_evaluation.py         — 10 unit tests
✓ scripts/test_evaluation.py               — e2e test with 3 answer qualities
✓ CLAUDE.md updated
✓ Git committed

ACTION REQUIRED:
1. Run: pytest tests/test_evaluation.py -v  (all 10 should pass)
2. Run: uvicorn main:app --reload --port 8000
3. Run: python scripts/test_evaluation.py
4. Verify: weak answer scores less than good answer
5. Test retry endpoint — score should increase on improved answer

Phase 5 complete.
Next: Phase 6 — React Web Frontend (learn flow, practice flow, evaluation UI)
```
