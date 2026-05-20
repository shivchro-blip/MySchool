import pytest
from unittest.mock import AsyncMock, patch
from modules.learning.service import _parse_explain_response


def test_parse_clean_json():
    raw = '{"explanation": "Test explanation.", "key_points": ["Point 1"], "exam_tip": "Study this."}'
    result = _parse_explain_response(raw)
    assert result["explanation"] == "Test explanation."
    assert len(result["key_points"]) == 1
    assert result["exam_tip"] == "Study this."


def test_parse_json_with_markdown_fences():
    raw = """```json
{"explanation": "Test.", "key_points": ["P1", "P2"], "exam_tip": "Tip."}
```"""
    result = _parse_explain_response(raw)
    assert result["explanation"] == "Test."
    assert len(result["key_points"]) == 2


def test_parse_invalid_json_returns_raw():
    raw = "This is not JSON at all."
    result = _parse_explain_response(raw)
    assert result["explanation"] == raw
    assert result["key_points"] == []
    assert result["exam_tip"] == ""


def test_parse_json_without_fences():
    raw = '{"explanation": "Direct JSON.", "key_points": [], "exam_tip": ""}'
    result = _parse_explain_response(raw)
    assert result["explanation"] == "Direct JSON."
