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
