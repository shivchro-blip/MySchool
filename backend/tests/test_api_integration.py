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
from db.repositories import SyllabusRepository, QuestionsRepository, ResponsesRepository

client = TestClient(app)


# ── Auth override helpers ─────────────────────────────────────────────────────

MOCK_USER  = {"id": "00000000-0000-0000-0000-000000000099", "email": "student@test.com"}
MOCK_ADMIN = {"id": "00000000-0000-0000-0000-000000000098", "email": "admin@test.com", "role": "admin"}


@pytest.fixture
def as_student():
    """Override auth + session deps so route tests don't need a real
    Supabase token or a claimed session row."""
    from core.auth import get_current_user
    from core.session import verify_session
    app.dependency_overrides[get_current_user] = lambda: MOCK_USER
    app.dependency_overrides[verify_session]   = lambda: MOCK_USER
    yield MOCK_USER
    app.dependency_overrides.pop(get_current_user, None)
    app.dependency_overrides.pop(verify_session, None)


@pytest.fixture
def as_admin():
    """Override auth + session dependencies for admin route tests."""
    from core.auth import get_current_user
    from core.admin_auth import get_admin_user
    from core.session import verify_session
    app.dependency_overrides[get_current_user] = lambda: MOCK_ADMIN
    app.dependency_overrides[get_admin_user]   = lambda: MOCK_ADMIN
    app.dependency_overrides[verify_session]   = lambda: MOCK_ADMIN
    yield MOCK_ADMIN
    app.dependency_overrides.pop(get_current_user, None)
    app.dependency_overrides.pop(get_admin_user, None)
    app.dependency_overrides.pop(verify_session, None)


# ── Fixture data ──────────────────────────────────────────────────────────────

SUBJECT_DATA = {
    "id": "00000000-0000-0000-0000-000000000001",
    "slug": "english",
    "code": "ENG1", "name": "English", "class": "+1",
    "is_active": True, "created_at": "2024-01-01T00:00:00",
}
CHAPTER_DATA = {
    "id": "00000000-0000-0000-0000-000000000002",
    "slug": "the-last-lesson",
    "subject_id": "00000000-0000-0000-0000-000000000001",
    "number": 1, "title": "The Last Lesson",
    "content_type": "prose", "is_active": True,
}
TOPIC_DATA = {
    "id": "00000000-0000-0000-0000-000000000003",
    "chapter_id": "00000000-0000-0000-0000-000000000002",
    "title": "Author Background", "order_index": 1,
}
QUESTION_DATA = {
    "id": "00000000-0000-0000-0000-000000000010",
    "chapter_id": "00000000-0000-0000-0000-000000000002",
    "topic_id": None,
    "question_text": "Who is Alphonse Daudet?",
    "marks": 2, "question_type": "short_answer",
    "answer_key": {"key_term": "Alphonse Daudet"}, "rubric": None,
    "is_validated": True,
}




# ── Syllabus public routes ────────────────────────────────────────────────────

def test_get_subjects_returns_list():
    with patch('db.client.get_db', return_value=MagicMock()):
        with patch.object(SyllabusRepository, 'get_all_subjects', return_value=[SUBJECT_DATA]):
            response = client.get('/api/v1/syllabus/subjects')
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert data[0]['code'] == 'ENG1'


def test_get_chapters_returns_list():
    with patch.object(SyllabusRepository, 'get_subject_by_slug', return_value=SUBJECT_DATA):
        with patch.object(SyllabusRepository, 'get_chapters_by_subject', return_value=[CHAPTER_DATA]):
            response = client.get(
                '/api/v1/syllabus/subjects/english/chapters'
            )
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert data[0]['title'] == 'The Last Lesson'


def test_get_topics_for_chapter():
    """GET /api/v1/syllabus/chapters/{id}/topics returns topic list."""
    with patch.object(SyllabusRepository, 'get_chapter_by_slug', return_value=CHAPTER_DATA):
        with patch.object(SyllabusRepository, 'get_topics_by_chapter', return_value=[TOPIC_DATA]):
            response = client.get(
                '/api/v1/syllabus/chapters/the-last-lesson/topics'
            )
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert data[0]['title'] == 'Author Background'


def test_get_questions_for_chapter():
    """GET /api/v1/syllabus/chapters/{id}/questions returns question list."""
    with patch.object(SyllabusRepository, 'get_chapter_by_slug', return_value=CHAPTER_DATA):
        with patch.object(QuestionsRepository, 'get_by_chapter', return_value=[QUESTION_DATA]):
            response = client.get(
                '/api/v1/syllabus/chapters/the-last-lesson/questions'
            )
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert data[0]['marks'] == 2


def test_get_questions_passes_marks_filter():
    """GET /api/v1/syllabus/chapters/{id}/questions?marks=2 passes filter to repo."""
    with patch.object(SyllabusRepository, 'get_chapter_by_slug', return_value=CHAPTER_DATA):
        with patch.object(QuestionsRepository, 'get_by_chapter', return_value=[QUESTION_DATA]) as mock_repo:
            client.get(
                '/api/v1/syllabus/chapters/the-last-lesson/questions?marks=2'
            )
    mock_repo.assert_called_once_with(
        '00000000-0000-0000-0000-000000000002', marks=2
    )


def test_get_chapters_404_for_unknown_subject():
    """GET chapters returns 404 when subject has no chapters."""
    with patch.object(SyllabusRepository, 'get_subject_by_slug', return_value=SUBJECT_DATA):
        with patch.object(SyllabusRepository, 'get_chapters_by_subject', return_value=[]):
            response = client.get(
                '/api/v1/syllabus/subjects/unknown-subject/chapters'
            )
    assert response.status_code == 404


# ── Auth protection ───────────────────────────────────────────────────────────

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


# ── Learning route tests ──────────────────────────────────────────────────────

def test_learning_explain_returns_response(as_student):
    """POST /api/v1/learning/explain returns explanation for authenticated user."""
    mock_result = {
        'explanation':  'Alphonse Daudet was a French short story writer.',
        'key_points':   ['French author', 'Wrote Monday Tales'],
        'exam_tip':     'Author info questions are 2-mark questions.',
        'language':     'en',
        'chapter_id':   '00000000-0000-0000-0000-000000000002',
        'topic_id':     None,
        'source_chunks': 2,
        'model_used':   'ollama/mistral',
        'cached':       False,
    }
    with patch('api.v1.learning.explain_topic', new=AsyncMock(return_value=mock_result)):
        response = client.post('/api/v1/learning/explain', json={
            'chapter_id': '00000000-0000-0000-0000-000000000002',
            'language':   'en',
        }, headers={'Authorization': 'Bearer mock-token'})
    assert response.status_code == 200
    data = response.json()
    assert 'explanation' in data
    assert data['language'] == 'en'


def test_learning_explain_rate_limit_returns_429(as_student):
    """POST /api/v1/learning/explain returns 429 when daily limit hit."""
    from core.errors import RateLimitError
    with patch('api.v1.learning.explain_topic', new=AsyncMock(side_effect=RateLimitError())):
        response = client.post('/api/v1/learning/explain', json={
            'chapter_id': '00000000-0000-0000-0000-000000000002',
            'language':   'en',
        }, headers={'Authorization': 'Bearer mock-token'})
    assert response.status_code == 429


def test_learning_content_returns_chunks(as_student):
    """GET /api/v1/learning/content/{id} returns validated content chunks
    (endpoint requires auth since the security audit)."""
    chunk = {
        'id': '00000000-0000-0000-0000-000000000020',
        'chunk_type': 'summary', 'content': 'The Last Lesson is about...',
        'language': 'en', 'section_header': None, 'is_validated': True,
    }
    with patch.object(SyllabusRepository, 'get_chapter_by_slug', return_value=CHAPTER_DATA):
        with patch.object(SyllabusRepository, 'get_validated_chunks_by_chapter', return_value=[chunk]):
            response = client.get(
                '/api/v1/learning/content/the-last-lesson'
            )
    assert response.status_code == 200
    data = response.json()
    assert 'chunks' in data
    assert len(data['chunks']) == 1
    assert data['chunks'][0]['chunk_type'] == 'summary'


# ── Evaluation route tests ────────────────────────────────────────────────────

def test_evaluation_submit_returns_score(as_student):
    """POST /api/v1/evaluation/submit returns scored evaluation."""
    mock_result = {
        'response_id':   '00000000-0000-0000-0000-000000000030',
        'question_id':   '00000000-0000-0000-0000-000000000010',
        'marks_awarded': 1.5,
        'marks_total':   2,
        'percentage':    75.0,
        'feedback': {
            'strengths':         ['Identified the author correctly'],
            'weaknesses':        ['Missing brief explanation'],
            'missing_points':    ['French author detail'],
            'structure_comment': 'Needs more detail.',
            'grammar_comment':   'Grammar is acceptable.',
        },
        'improved_answer': 'Alphonse Daudet was a French short story writer.',
        'model_used':    'ollama/mistral',
        'cached':        False,
    }
    with patch('api.v1.evaluation.evaluate_answer', new=AsyncMock(return_value=mock_result)):
        response = client.post('/api/v1/evaluation/submit', json={
            'question_id':    '00000000-0000-0000-0000-000000000010',
            'student_answer': 'Alphonse Daudet is the author of The Last Lesson.',
        }, headers={'Authorization': 'Bearer mock-token'})
    assert response.status_code == 200
    data = response.json()
    assert 'marks_awarded' in data
    assert data['marks_awarded'] == 1.5
    assert 'feedback' in data
    assert 'strengths' in data['feedback']
    assert 'improved_answer' in data


def test_evaluation_submit_not_found_returns_404(as_student):
    """POST /api/v1/evaluation/submit returns 404 for unknown question."""
    from core.errors import NotFoundError
    with patch(
        'api.v1.evaluation.evaluate_answer',
        new=AsyncMock(side_effect=NotFoundError('Question', '00000000-0000-0000-0000-000000000099')),
    ):
        response = client.post('/api/v1/evaluation/submit', json={
            'question_id':    '00000000-0000-0000-0000-000000000099',
            'student_answer': 'This is a long enough answer for the evaluation endpoint.',
        }, headers={'Authorization': 'Bearer mock-token'})
    assert response.status_code == 404


def test_evaluation_submit_rate_limit_returns_429(as_student):
    """POST /api/v1/evaluation/submit returns 429 when daily limit hit."""
    from core.errors import RateLimitError
    with patch(
        'api.v1.evaluation.evaluate_answer',
        new=AsyncMock(side_effect=RateLimitError()),
    ):
        response = client.post('/api/v1/evaluation/submit', json={
            'question_id':    '00000000-0000-0000-0000-000000000010',
            'student_answer': 'This is a long enough answer for the evaluation endpoint.',
        }, headers={'Authorization': 'Bearer mock-token'})
    assert response.status_code == 429


def test_progress_route_returns_stats(as_student):
    """GET /api/v1/evaluation/progress returns attempt stats per chapter."""
    mock_responses = [
        {
            'ai_score': 8.0, 'max_score': 10,
            'questions': {'chapter_id': '00000000-0000-0000-0000-000000000002'},
        },
        {
            'ai_score': 4.0, 'max_score': 5,
            'questions': {'chapter_id': '00000000-0000-0000-0000-000000000002'},
        },
    ]
    with patch('db.client.get_db', return_value=MagicMock()):
        with patch.object(ResponsesRepository, 'get_by_user', return_value=mock_responses):
            response = client.get(
                '/api/v1/evaluation/progress',
                headers={'Authorization': 'Bearer mock-token'},
            )
    assert response.status_code == 200
    data = response.json()
    assert data['total_attempts'] == 2
    assert 'average_score' in data
    assert isinstance(data['by_chapter'], list)


def test_progress_route_empty_for_new_user(as_student):
    """GET /api/v1/evaluation/progress returns zeros for a user with no attempts."""
    with patch('db.client.get_db', return_value=MagicMock()):
        with patch.object(ResponsesRepository, 'get_by_user', return_value=[]):
            response = client.get(
                '/api/v1/evaluation/progress',
                headers={'Authorization': 'Bearer mock-token'},
            )
    assert response.status_code == 200
    data = response.json()
    assert data['total_attempts'] == 0
    assert data['average_score'] == 0.0


def test_history_route_returns_list(as_student):
    """GET /api/v1/evaluation/history returns past responses with total count."""
    with patch('db.client.get_db', return_value=MagicMock()):
        with patch.object(ResponsesRepository, 'get_by_user', return_value=[]):
            response = client.get(
                '/api/v1/evaluation/history',
                headers={'Authorization': 'Bearer mock-token'},
            )
    assert response.status_code == 200
    data = response.json()
    assert 'history' in data
    assert 'total' in data
    assert data['total'] == 0


# ── Admin route tests ─────────────────────────────────────────────────────────

def test_admin_pending_content_returns_list(as_admin):
    """GET /api/v1/admin/content/pending returns unvalidated chunks."""
    empty_result = MagicMock(data=[], count=0)
    mock_db = MagicMock()
    mock_db.table.return_value.select.return_value\
        .eq.return_value.order.return_value.limit.return_value\
        .execute.return_value = empty_result

    with patch('api.v1.admin.get_db', return_value=mock_db):
        response = client.get(
            '/api/v1/admin/content/pending',
            headers={'Authorization': 'Bearer mock-admin-token'},
        )
    assert response.status_code == 200
    data = response.json()
    assert 'pending' in data
    assert 'total'   in data
    assert data['total'] == 0


def test_admin_pending_evaluations_returns_list(as_admin):
    """GET /api/v1/admin/evaluations/pending returns unreviewed evaluations."""
    empty_result = MagicMock(data=[], count=0)
    mock_db = MagicMock()
    mock_db.table.return_value.select.return_value\
        .eq.return_value.not_.is_.return_value\
        .order.return_value.limit.return_value\
        .execute.return_value = empty_result

    with patch('api.v1.admin.get_db', return_value=mock_db):
        response = client.get(
            '/api/v1/admin/evaluations/pending',
            headers={'Authorization': 'Bearer mock-admin-token'},
        )
    assert response.status_code == 200
    data = response.json()
    assert 'pending' in data
    assert 'total'   in data


# ── Input validation ──────────────────────────────────────────────────────────

def test_admin_pipeline_rejects_path_traversal(as_admin):
    response = client.post(
        '/api/v1/admin/pipeline/trigger',
        json={
            'subject_id': '00000000-0000-0000-0000-000000000001',
            'chapter_id': '00000000-0000-0000-0000-000000000002',
            'json_path': '../outside.json',
        },
        headers={'Authorization': 'Bearer mock-admin-token'},
    )

    assert response.status_code == 400
    assert 'content/structured' in response.json()['detail']


def test_admin_import_html_rejects_non_html_upload(as_admin):
    response = client.post(
        '/api/v1/admin/questions/import-html',
        data={'chapter_slug': 'the-last-lesson'},
        files={'file': ('questions.txt', b'not html', 'text/plain')},
        headers={'Authorization': 'Bearer mock-admin-token'},
    )

    assert response.status_code == 415


def test_admin_import_html_rejects_oversized_upload(as_admin):
    from api.v1.admin import MAX_HTML_IMPORT_BYTES

    response = client.post(
        '/api/v1/admin/questions/import-html',
        data={'chapter_slug': 'the-last-lesson'},
        files={
            'file': (
                'questions.html',
                b'a' * (MAX_HTML_IMPORT_BYTES + 1),
                'text/html',
            )
        },
        headers={'Authorization': 'Bearer mock-admin-token'},
    )

    assert response.status_code == 413


def test_submit_rejects_short_answer():
    response = client.post('/api/v1/evaluation/submit', json={
        'question_id':    '00000000-0000-0000-0000-000000000001',
        'student_answer': 'short',
    })
    assert response.status_code in (401, 422)


def test_submit_rejects_invalid_uuid():
    response = client.post('/api/v1/evaluation/submit', json={
        'question_id':    'not-a-uuid',
        'student_answer': 'A valid answer that is long enough to pass',
    })
    assert response.status_code in (401, 422)


# ── Error handling ────────────────────────────────────────────────────────────

def test_unknown_route_returns_404():
    response = client.get('/api/v1/does-not-exist')
    assert response.status_code == 404
    data = response.json()
    assert 'error' in data


# ── Cache key generation ──────────────────────────────────────────────────────

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
