import pytest
from modules.evaluation.rubric import (
    validate_awarded_marks,
    format_answer_key,
    format_rubric,
)
from modules.evaluation.service import _parse_evaluation_response


# ── rubric tests ─────────────────────────────────────────────────────────────

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


# ── parse tests ───────────────────────────────────────────────────────────────

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
