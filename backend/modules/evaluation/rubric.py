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
