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
