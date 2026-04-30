import pytest
from fastapi.testclient import TestClient
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from main import app

client = TestClient(app)


def test_get_subjects_returns_list():
    response = client.get("/api/v1/syllabus/subjects")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_subjects_has_eng1():
    response = client.get("/api/v1/syllabus/subjects")
    codes = [s["code"] for s in response.json()]
    assert "ENG1" in codes
