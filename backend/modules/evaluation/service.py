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
from .rubric import format_answer_key, format_rubric, validate_awarded_marks
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
    question = await questions_db.get_question_by_id(str(request.question_id))
    if not question:
        raise NotFoundError("Question", str(request.question_id))

    marks = question["marks"]
    question_text = question["question_text"]
    answer_key = question.get("answer_key") or {}
    rubric = question.get("rubric") or {}

    console.print(
        f"[blue]Evaluating[/blue] {marks}-mark question: {question_text[:60]}..."
    )

    chunks = search_similar(query=question_text, n_results=MAX_CONTEXT_CHUNKS)
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

    # Save student answer before AI call
    saved = await responses_db.save_response(
        user_id=user_id,
        question_id=str(request.question_id),
        student_answer=request.student_answer,
        max_score=marks,
        attempt_number=request.attempt_number,
    )
    response_id = saved["id"]

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

    cache_key_content = f"eval:{request.question_id}:{hash(request.student_answer)}"

    raw_response, model_used, was_cached = await call_llm(
        messages=messages,
        prompt_type="evaluate",
        cache_key_content=cache_key_content,
        user_id=user_id,
        temperature=0.1,
        max_tokens=1500,
    )

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
    """Re-evaluate an improved answer. Loads original response for comparison context."""
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

    cache_key_content = f"retry:{request.response_id}:{hash(request.new_answer)}"

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
    """Parse JSON from AI evaluation response. Handles markdown fences, validates marks."""
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

    parsed["marks_awarded"] = validate_awarded_marks(
        parsed.get("marks_awarded", 0), max_marks
    )

    for field in ["strengths", "weaknesses", "missing_points"]:
        if field not in parsed or not isinstance(parsed[field], list):
            parsed[field] = []

    return parsed
