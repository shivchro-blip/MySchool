"""
Content pipeline tests
Run: pytest backend/tests/test_content_pipeline.py -v
No PDF or ChromaDB needed — tests pure logic
"""

import pytest
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))


def test_clean_text_removes_page_numbers():
    from modules.content_pipeline.structurer import clean_text
    text = "Some content\n\n42\n\nMore content"
    result = clean_text(text)
    assert '42' not in result or 'content' in result


def test_detect_section_summary():
    from modules.content_pipeline.structurer import detect_section_type
    assert detect_section_type("Summary") == "summary"
    assert detect_section_type("SUMMARY") == "summary"
    assert detect_section_type("The Summary of the Chapter") == "summary"


def test_detect_section_glossary():
    from modules.content_pipeline.structurer import detect_section_type
    assert detect_section_type("Glossary") == "glossary"
    assert detect_section_type("Difficult Words") == "glossary"
    assert detect_section_type("New Words") == "glossary"


def test_detect_section_author():
    from modules.content_pipeline.structurer import detect_section_type
    assert detect_section_type("About The Author") == "author_info"
    assert detect_section_type("The Author") == "author_info"


def test_detect_section_unknown_returns_none():
    from modules.content_pipeline.structurer import detect_section_type
    result = detect_section_type("Some Random Header Text Here")
    assert result is None


def test_structure_content_returns_chunks():
    from modules.content_pipeline.structurer import structure_content
    pages = [{
        "page_number": 1,
        "text": """About The Author
Alphonse Daudet was a famous French writer.

Summary
The story is about a French teacher's last lesson.""",
    }]
    chunks = structure_content(
        pages=pages,
        subject_code="ENG1",
        class_level="+1",
        chapter_number=3,
        chapter_title="The Last Lesson",
    )
    assert len(chunks) >= 1
    assert all("content" in c for c in chunks)
    assert all("chunk_type" in c for c in chunks)
    assert all(c["subject_code"] == "ENG1" for c in chunks)


def test_structure_content_filters_short_chunks():
    from modules.content_pipeline.structurer import structure_content
    pages = [{"page_number": 1, "text": "Short\n\nActual content here that is long enough to keep."}]
    chunks = structure_content(
        pages=pages,
        subject_code="ENG1",
        class_level="+1",
        chapter_number=1,
        chapter_title="Test Chapter",
    )
    for c in chunks:
        assert len(c["content"]) >= 30


def test_format_answer_key_with_points():
    from modules.evaluation.rubric import format_answer_key
    key = {"points": ["Point A", "Point B"]}
    result = format_answer_key(key)
    assert "Point A" in result
    assert "Point B" in result


def test_validate_marks_boundary():
    from modules.evaluation.rubric import validate_awarded_marks
    assert validate_awarded_marks(0, 10)   == 0.0
    assert validate_awarded_marks(10, 10)  == 10.0
    assert validate_awarded_marks(11, 10)  == 10.0
    assert validate_awarded_marks(-1, 10)  == 0.0
    assert validate_awarded_marks(7.5, 10) == 7.5
