"""
Tests for core/tn_board.py constants and validators.
These tests ensure TN board constraints are enforced in code.
Run: pytest backend/tests/test_tn_board.py -v
"""

import pytest
from core.tn_board import (
    VALID_CLASS_LEVELS,
    VALID_MARK_LEVELS,
    VALID_CONTENT_TYPES,
    VALID_CHUNK_TYPES,
    VALID_QUESTION_TYPES,
    VALID_LANGUAGES,
    MARK_LEVEL_GUIDANCE,
    BOARD_CONTEXT_FOR_AI,
    SUBJECT_REGISTRY,
    validate_class_level,
    validate_marks,
    validate_content_type,
    get_mark_guidance,
    get_exam_pattern,
)


# ── Class levels ─────────────────────────────────────────────────────────────

def test_valid_class_levels_are_plus1_and_plus2():
    assert "+1" in VALID_CLASS_LEVELS
    assert "+2" in VALID_CLASS_LEVELS
    assert len(VALID_CLASS_LEVELS) == 2


def test_validate_class_level_accepts_valid():
    assert validate_class_level("+1") == "+1"
    assert validate_class_level("+2") == "+2"


def test_validate_class_level_rejects_invalid():
    with pytest.raises(ValueError, match="Tamil Nadu board"):
        validate_class_level("+3")
    with pytest.raises(ValueError):
        validate_class_level("11")
    with pytest.raises(ValueError):
        validate_class_level("")


# ── Mark levels ──────────────────────────────────────────────────────────────

def test_valid_mark_levels_are_1_2_5_10():
    assert set(VALID_MARK_LEVELS) == {1, 2, 5, 10}


def test_validate_marks_accepts_valid():
    for m in (1, 2, 5, 10):
        assert validate_marks(m) == m


def test_validate_marks_rejects_invalid():
    for bad in (0, 3, 4, 6, 7, 8, 9, 11, 100):
        with pytest.raises(ValueError, match="Tamil Nadu board"):
            validate_marks(bad)


def test_mark_guidance_exists_for_all_levels():
    for marks in VALID_MARK_LEVELS:
        guidance = get_mark_guidance(marks)
        assert "label"           in guidance
        assert "description"     in guidance
        assert "expected_length" in guidance
        assert "structure"       in guidance
        assert "board_rule"      in guidance


def test_mark_guidance_10_requires_intro_and_conclusion():
    guidance = get_mark_guidance(10)
    assert "intro" in guidance["structure"].lower()
    assert "conclusion" in guidance["structure"].lower()


def test_mark_guidance_2_has_partial_credit_rule():
    guidance = get_mark_guidance(2)
    assert "1 mark" in guidance["board_rule"]


# ── Content types ─────────────────────────────────────────────────────────────

def test_valid_content_types():
    assert "prose"      in VALID_CONTENT_TYPES
    assert "poem"       in VALID_CONTENT_TYPES
    assert "grammar"    in VALID_CONTENT_TYPES
    assert "vocabulary" in VALID_CONTENT_TYPES


def test_validate_content_type_accepts_valid():
    for ct in VALID_CONTENT_TYPES:
        assert validate_content_type(ct) == ct


def test_validate_content_type_rejects_invalid():
    with pytest.raises(ValueError):
        validate_content_type("diagram")
    with pytest.raises(ValueError):
        validate_content_type("")


def test_exam_pattern_prose_has_10_mark():
    pattern = get_exam_pattern("prose")
    assert 10 in pattern["typical_marks"]


def test_exam_pattern_grammar_no_10_mark():
    pattern = get_exam_pattern("grammar")
    assert 10 not in pattern["typical_marks"]


# ── Chunk and question types ──────────────────────────────────────────────────

def test_chunk_types_match_db_constraint():
    """These must match the CHECK constraint in content_chunks table."""
    expected = {
        "summary", "explanation", "key_points", "example",
        "glossary", "exam_tip", "author_info", "theme", "character",
    }
    assert set(VALID_CHUNK_TYPES) == expected


def test_question_types_match_db_constraint():
    """These must match the CHECK constraint in questions table."""
    expected = {
        "short_answer", "paragraph", "essay", "fill_blank", "match",
    }
    assert set(VALID_QUESTION_TYPES) == expected


# ── Languages ────────────────────────────────────────────────────────────────

def test_supported_languages_are_en_and_ta():
    assert "en" in VALID_LANGUAGES
    assert "ta" in VALID_LANGUAGES


# ── AI context ────────────────────────────────────────────────────────────────

def test_board_context_mentions_tnbse():
    assert "Tamil Nadu State Board" in BOARD_CONTEXT_FOR_AI


def test_board_context_mentions_all_mark_levels():
    for mark in ("1-mark", "2-mark", "5-mark", "10-mark"):
        assert mark in BOARD_CONTEXT_FOR_AI


def test_board_context_mentions_student_profile():
    assert "Tamil" in BOARD_CONTEXT_FOR_AI


# ── Subject registry ──────────────────────────────────────────────────────────

def test_subject_registry_has_eng1():
    assert "ENG1" in SUBJECT_REGISTRY
    assert SUBJECT_REGISTRY["ENG1"]["class"] == "+1"


def test_subject_registry_class_levels_are_valid():
    for code, subject in SUBJECT_REGISTRY.items():
        assert subject["class"] in VALID_CLASS_LEVELS, (
            f"Subject {code} has invalid class level: {subject['class']}"
        )


# ── Prompt integration ────────────────────────────────────────────────────────

def test_explain_prompt_includes_board_context():
    from modules.learning.prompts import EXPLAIN_SYSTEM_PROMPT
    assert "Tamil Nadu State Board" in EXPLAIN_SYSTEM_PROMPT


def test_evaluate_prompt_includes_board_context():
    from modules.evaluation.prompts import EVALUATE_SYSTEM_PROMPT
    assert "Tamil Nadu State Board" in EVALUATE_SYSTEM_PROMPT


def test_evaluate_prompt_includes_mark_rules():
    from modules.evaluation.prompts import EVALUATE_SYSTEM_PROMPT
    assert "2-mark" in EVALUATE_SYSTEM_PROMPT
    assert "10-mark" in EVALUATE_SYSTEM_PROMPT


def test_rubric_format_uses_board_label():
    from modules.evaluation.rubric import format_rubric
    result = format_rubric(None, 10)
    assert "Essay" in result
    assert "Conclusion" in result or "conclusion" in result
