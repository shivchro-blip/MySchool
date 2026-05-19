"""
Rubric helpers for Tamil Nadu State Board evaluation.
Mark level guidance is sourced from core/tn_board.py — single source of truth.
"""

from typing import Any
from core.tn_board import MARK_LEVEL_GUIDANCE, validate_marks


def get_mark_guidance(marks: int) -> dict[str, str]:
    """Return marking guidance for a given mark level."""
    return MARK_LEVEL_GUIDANCE.get(marks, MARK_LEVEL_GUIDANCE[2])


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
    """Convert rubric JSON + TN board guidance to readable string for AI."""
    guidance = get_mark_guidance(marks)
    base = (
        f"Question Type: {guidance['label']} — {guidance['description']}\n"
        f"Expected Length: {guidance['expected_length']}\n"
        f"Expected Structure: {guidance['structure']}\n"
        f"Board Rule: {guidance['board_rule']}\n"
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
