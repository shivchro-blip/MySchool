import json
import re
from uuid import UUID

from core.ai_gate import AIGate
from core.errors import NotFoundError
from db.repositories import QuestionsRepository, ResponsesRepository
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
from rich.console import Console

console = Console()

MAX_CONTEXT_CHUNKS = 4
MAX_CONTEXT_CHARS  = 2000


async def evaluate_answer(
    request: SubmitAnswerRequest,
    user_id: str,
) -> EvaluationResponse:
    questions = QuestionsRepository()
    responses = ResponsesRepository()
    gate      = AIGate()

    question = questions.get_by_id(str(request.question_id))
    if not question:
        raise NotFoundError("Question", str(request.question_id))

    marks      = question["marks"]
    answer_key = question.get("answer_key") or {}
    rubric     = question.get("rubric") or {}

    console.print(
        f"[blue]Evaluating[/blue] {marks}-mark question: {question['question_text'][:60]}..."
    )

    chunks = search_similar(query=question["question_text"], n_results=MAX_CONTEXT_CHUNKS)
    context_parts = []
    total_chars   = 0
    for chunk in chunks:
        text = chunk["content"]
        if total_chars + len(text) > MAX_CONTEXT_CHARS:
            break
        context_parts.append(text)
        total_chars += len(text)
    context = "\n\n---\n\n".join(context_parts) if context_parts else (
        "Evaluate based on the answer key and rubric provided."
    )

    saved = responses.create(
        user_id=user_id,
        question_id=str(request.question_id),
        student_answer=request.student_answer,
        max_score=marks,
        attempt_number=request.attempt_number,
    )
    response_id = saved["id"]

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
    cache_key_content = f"eval:{request.question_id}:{hash(request.student_answer)}"

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

    feedback = FeedbackDetail(
        strengths=parsed.get("strengths", []),
        weaknesses=parsed.get("weaknesses", []),
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
        improved_answer=parsed.get("improved_answer", ""),
        model_used=model_used,
        cached=was_cached,
    )


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
    cache_key_content = f"retry:{request.response_id}:{hash(request.new_answer)}"

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


def _parse_evaluation_response(raw: str, max_marks: int) -> dict:
    cleaned = re.sub(r"```(?:json)?\s*", "", raw).strip().rstrip("```").strip()
    try:
        parsed = json.loads(cleaned)
    except json.JSONDecodeError:
        console.print("[yellow]Evaluation JSON parse failed[/yellow]")
        return {
            "marks_awarded":     0.0,
            "strengths":         [],
            "weaknesses":        ["Could not parse AI response"],
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
