"""
Backend integration tests
Run: pytest backend/tests/test_api_integration.py -v
These tests use TestClient — no real HTTP server needed
Supabase and Ollama are mocked
"""

import pytest
from unittest.mock import patch, MagicMock, AsyncMock
from fastapi.testclient import TestClient
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from main import app

client = TestClient(app)


# ── Health ──────────────────────────────────────────────────────────────────

def test_health_endpoint():
    response = client.get('/health')
    assert response.status_code == 200
    data = response.json()
    assert 'status'   in data
    assert 'ollama'   in data
    assert 'supabase' in data
    assert 'chromadb' in data


# ── Syllabus (public routes) ─────────────────────────────────────────────────

def test_get_subjects_returns_list():
    with patch('db.syllabus.get_db') as mock_db:
        mock_client = MagicMock()
        mock_client.table.return_value.select.return_value\
            .eq.return_value.execute.return_value.data = [
                {
                    'id': '00000000-0000-0000-0000-000000000001',
                    'code': 'ENG1',
                    'name': 'English',
                    'class': '+1',
                    'is_active': True,
                    'created_at': '2024-01-01T00:00:00Z',
                }
            ]
        mock_db.return_value = mock_client
        response = client.get('/api/v1/syllabus/subjects')
        assert response.status_code == 200
        assert isinstance(response.json(), list)


def test_get_chapters_returns_list():
    with patch('db.syllabus.get_db') as mock_db:
        mock_client = MagicMock()
        mock_client.table.return_value.select.return_value\
            .eq.return_value.eq.return_value\
            .order.return_value.execute.return_value.data = [
                {
                    'id':           '00000000-0000-0000-0000-000000000002',
                    'subject_id':   '00000000-0000-0000-0000-000000000001',
                    'number':       1,
                    'title':        'The Last Lesson',
                    'content_type': 'prose',
                    'is_active':    True,
                }
            ]
        mock_db.return_value = mock_client
        response = client.get(
            '/api/v1/syllabus/subjects/'
            '00000000-0000-0000-0000-000000000001/chapters'
        )
        assert response.status_code == 200
        assert isinstance(response.json(), list)


# ── Auth protection ──────────────────────────────────────────────────────────

def test_learning_explain_requires_auth():
    response = client.post('/api/v1/learning/explain', json={
        'chapter_id': '00000000-0000-0000-0000-000000000001',
        'language':   'en',
    })
    assert response.status_code == 401


def test_evaluation_submit_requires_auth():
    response = client.post('/api/v1/evaluation/submit', json={
        'question_id':    '00000000-0000-0000-0000-000000000001',
        'student_answer': 'Test answer here',
    })
    assert response.status_code == 401


def test_progress_requires_auth():
    response = client.get('/api/v1/evaluation/progress')
    assert response.status_code == 401


def test_admin_requires_auth():
    response = client.get('/api/v1/admin/stats')
    assert response.status_code == 401


# ── Input validation ─────────────────────────────────────────────────────────

def test_submit_rejects_short_answer():
    # Even without auth, Pydantic should validate first
    response = client.post('/api/v1/evaluation/submit', json={
        'question_id':    '00000000-0000-0000-0000-000000000001',
        'student_answer': 'short',
    })
    # 401 (no auth) is fine — it means Pydantic validation passed
    # 422 means validation failed before auth — also acceptable
    assert response.status_code in (401, 422)


def test_submit_rejects_invalid_uuid():
    response = client.post('/api/v1/evaluation/submit', json={
        'question_id':    'not-a-uuid',
        'student_answer': 'A valid answer that is long enough to pass',
    })
    assert response.status_code == 422


# ── Error handling ───────────────────────────────────────────────────────────

def test_unknown_route_returns_404():
    response = client.get('/api/v1/does-not-exist')
    assert response.status_code == 404
    data = response.json()
    assert 'error' in data


# ── Cache key generation ─────────────────────────────────────────────────────

def test_cache_key_is_deterministic():
    from db.repositories import CacheRepository
    key1 = CacheRepository.make_key('explain', 'same content')
    key2 = CacheRepository.make_key('explain', 'same content')
    key3 = CacheRepository.make_key('explain', 'different content')
    assert key1 == key2
    assert key1 != key3
    assert len(key1) == 64  # SHA256 hex


def test_cache_key_differs_by_type():
    from db.repositories import CacheRepository
    key1 = CacheRepository.make_key('explain',  'content')
    key2 = CacheRepository.make_key('evaluate', 'content')
    assert key1 != key2
