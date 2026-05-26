import pytest
from fastapi.testclient import TestClient
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from main import app

client = TestClient(app)


def test_health_returns_200():
    response = client.get("/health")
    assert response.status_code == 200


def test_health_has_required_fields():
    response = client.get("/health")
    data = response.json()
    assert "status" in data
    assert "env" not in data
    assert "ollama" in data
    assert "supabase" in data
    assert "chromadb" in data


def test_docs_disabled_by_default():
    response = client.get("/api/docs")
    assert response.status_code == 404
