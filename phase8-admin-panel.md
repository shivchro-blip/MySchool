# AI Exam Coach — Phase 8: Admin Panel
> Open Claude Code inside C:\MyProjects\exam-coach and paste this entire file.

---

## Context

Read CLAUDE.md before doing anything.
This phase builds the Admin Panel — a separate React app for:
- Validating AI-generated content chunks (mark is_validated = true)
- Reviewing and correcting AI evaluations
- Managing questions and answer keys
- Uploading PDFs and triggering the content pipeline
- Monitoring usage and system health

This is NOT a student-facing app.
It is protected by a Supabase admin role check.
Build it as a standalone React app in frontend/admin/.

---

## Step 1: Create the admin frontend folder

```bash
mkdir -p frontend/admin/src/{api,components,pages,hooks}
cd frontend/admin
npm init -y
npm install react react-dom react-router-dom axios
npm install -D vite @vitejs/plugin-react tailwindcss autoprefixer postcss
npx tailwindcss init -p
```

---

## Step 2: Create all config files

---

### FILE: frontend/admin/vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
```

---

### FILE: frontend/admin/tailwind.config.js

```js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        admin: {
          50:  '#faf5ff',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
      },
    },
  },
  plugins: [],
}
```

---

### FILE: frontend/admin/package.json

```json
{
  "name": "exam-coach-admin",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev":     "vite",
    "build":   "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react":            "^18.3.0",
    "react-dom":        "^18.3.0",
    "react-router-dom": "^6.24.0",
    "axios":            "^1.7.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.0",
    "vite":          "^5.3.0",
    "tailwindcss":   "^3.4.0",
    "autoprefixer":  "^10.4.0",
    "postcss":       "^8.4.0"
  }
}
```

---

### FILE: frontend/admin/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Exam Coach — Admin</title>
  </head>
  <body class="bg-gray-50 text-gray-900 antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

### FILE: frontend/admin/src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn {
    @apply px-4 py-2 rounded-lg font-medium text-sm
           transition-colors duration-150 disabled:opacity-50
           disabled:cursor-not-allowed;
  }
  .btn-primary {
    @apply btn bg-admin-600 text-white hover:bg-admin-700;
  }
  .btn-success {
    @apply btn bg-green-600 text-white hover:bg-green-700;
  }
  .btn-danger {
    @apply btn bg-red-600 text-white hover:bg-red-700;
  }
  .btn-ghost {
    @apply btn bg-white text-gray-700 border border-gray-200
           hover:bg-gray-50;
  }
  .card {
    @apply bg-white rounded-xl border border-gray-200 p-4;
  }
  .badge {
    @apply inline-flex items-center px-2 py-0.5 rounded-full
           text-xs font-medium;
  }
  .badge-green  { @apply badge bg-green-100 text-green-800; }
  .badge-yellow { @apply badge bg-yellow-100 text-yellow-800; }
  .badge-red    { @apply badge bg-red-100 text-red-800; }
  .badge-gray   { @apply badge bg-gray-100 text-gray-700; }
  .badge-purple { @apply badge bg-purple-100 text-purple-800; }
  .input {
    @apply w-full border border-gray-200 rounded-lg px-3 py-2 text-sm
           focus:outline-none focus:ring-2 focus:ring-admin-500
           focus:border-transparent;
  }
  .table-header {
    @apply text-left text-xs font-semibold text-gray-500
           uppercase tracking-wide py-3 px-4;
  }
  .table-cell {
    @apply py-3 px-4 text-sm text-gray-700 border-b border-gray-100;
  }
}
```

---

## Step 3: Add admin role support to the backend

---

### FILE: backend/core/admin_auth.py

```python
# Admin authentication
# Only users with admin role in Supabase can access admin endpoints
# Set admin role in Supabase: Authentication → Users → Edit user metadata
# Add: {"role": "admin"} to raw_user_meta_data

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from db.client import get_db

bearer_scheme = HTTPBearer(auto_error=False)


async def get_admin_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> dict:
    """
    Validate JWT and check admin role.
    Raises 403 if user is not an admin.
    """
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization token required",
        )

    db = get_db()
    try:
        user = db.auth.get_user(credentials.credentials)
        if not user or not user.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired token",
            )

        meta = user.user.user_metadata or {}
        if meta.get("role") != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Admin access required",
            )

        return {
            "id":    str(user.user.id),
            "email": user.user.email,
            "role":  "admin",
        }
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )
```

---

### FILE: backend/api/v1/admin.py

```python
# Admin API routes
# All routes require admin role
# POST /api/v1/admin/content/validate/{chunk_id}
# POST /api/v1/admin/content/invalidate/{chunk_id}
# GET  /api/v1/admin/content/pending
# GET  /api/v1/admin/evaluations/pending
# POST /api/v1/admin/evaluations/{response_id}/review
# GET  /api/v1/admin/questions
# POST /api/v1/admin/questions
# PUT  /api/v1/admin/questions/{question_id}
# GET  /api/v1/admin/stats
# POST /api/v1/admin/pipeline/trigger

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from uuid import UUID
from core.admin_auth import get_admin_user
from db.client import get_db

router = APIRouter()


# ── Pydantic models ─────────────────────────────────────────────────────────

class ReviewEvaluationRequest(BaseModel):
    human_score: float = Field(ge=0, le=10)
    human_notes: str   = Field(default="", max_length=1000)


class CreateQuestionRequest(BaseModel):
    subject_id:    UUID
    chapter_id:    UUID
    topic_id:      UUID | None = None
    question_text: str  = Field(min_length=10, max_length=1000)
    marks:         int  = Field(ge=1, le=10)
    question_type: str
    answer_key:    dict | None = None
    rubric:        dict | None = None
    source:        str  = "manual"


class UpdateQuestionRequest(BaseModel):
    question_text: str  | None = None
    answer_key:    dict | None = None
    rubric:        dict | None = None
    is_validated:  bool | None = None
    is_active:     bool | None = None


class TriggerPipelineRequest(BaseModel):
    subject_id:  UUID
    chapter_id:  UUID
    topic_id:    UUID | None = None
    json_path:   str = Field(description="Path to structured JSON in content/structured/")


# ── Content validation ───────────────────────────────────────────────────────

@router.get("/content/pending")
async def get_pending_content(
    limit: int = 50,
    admin: dict = Depends(get_admin_user),
):
    """Return content chunks that have not been validated yet."""
    db = get_db()
    result = (
        db.table("content_chunks")
        .select(
            "id, chunk_type, content, language, section_header, "
            "created_at, subjects(name, class), chapters(title, number)"
        )
        .eq("is_validated", False)
        .order("created_at", desc=False)
        .limit(limit)
        .execute()
    )
    return {
        "pending": result.data,
        "total":   len(result.data),
    }


@router.post("/content/validate/{chunk_id}")
async def validate_chunk(
    chunk_id: UUID,
    admin: dict = Depends(get_admin_user),
):
    """Mark a content chunk as validated."""
    db = get_db()
    result = (
        db.table("content_chunks")
        .update({"is_validated": True})
        .eq("id", str(chunk_id))
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Chunk not found")
    return {"status": "validated", "chunk_id": str(chunk_id)}


@router.post("/content/invalidate/{chunk_id}")
async def invalidate_chunk(
    chunk_id: UUID,
    admin: dict = Depends(get_admin_user),
):
    """Mark a validated chunk as invalid (needs re-extraction)."""
    db = get_db()
    db.table("content_chunks").update(
        {"is_validated": False}
    ).eq("id", str(chunk_id)).execute()
    return {"status": "invalidated", "chunk_id": str(chunk_id)}


@router.delete("/content/{chunk_id}")
async def delete_chunk(
    chunk_id: UUID,
    admin: dict = Depends(get_admin_user),
):
    """Permanently delete a content chunk."""
    db = get_db()
    db.table("content_chunks").delete().eq("id", str(chunk_id)).execute()
    return {"status": "deleted", "chunk_id": str(chunk_id)}


@router.put("/content/{chunk_id}")
async def edit_chunk(
    chunk_id: UUID,
    body: dict,
    admin: dict = Depends(get_admin_user),
):
    """Edit the content text of a chunk."""
    db = get_db()
    allowed = {k: v for k, v in body.items()
               if k in ("content", "chunk_type", "section_header")}
    if not allowed:
        raise HTTPException(status_code=400, detail="No valid fields to update")
    result = (
        db.table("content_chunks")
        .update(allowed)
        .eq("id", str(chunk_id))
        .execute()
    )
    return result.data[0] if result.data else {}


# ── Evaluation review ────────────────────────────────────────────────────────

@router.get("/evaluations/pending")
async def get_pending_evaluations(
    limit: int = 50,
    admin: dict = Depends(get_admin_user),
):
    """Return AI evaluations that have not been human-reviewed."""
    db = get_db()
    result = (
        db.table("responses")
        .select(
            "id, student_answer, ai_score, max_score, ai_feedback, "
            "improved_answer, attempt_number, created_at, "
            "questions(question_text, marks), users(full_name)"
        )
        .eq("is_human_reviewed", False)
        .not_.is_("ai_score", "null")
        .order("created_at", desc=True)
        .limit(limit)
        .execute()
    )
    return {
        "pending": result.data,
        "total":   len(result.data),
    }


@router.post("/evaluations/{response_id}/review")
async def review_evaluation(
    response_id: UUID,
    body: ReviewEvaluationRequest,
    admin: dict = Depends(get_admin_user),
):
    """Submit human review score for an AI evaluation."""
    db = get_db()
    result = (
        db.table("responses")
        .update({
            "human_score":       body.human_score,
            "human_notes":       body.human_notes,
            "is_human_reviewed": True,
        })
        .eq("id", str(response_id))
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Response not found")
    return {"status": "reviewed", "response_id": str(response_id)}


# ── Question management ──────────────────────────────────────────────────────

@router.get("/questions")
async def get_all_questions(
    chapter_id: str | None = None,
    validated:  bool | None = None,
    admin: dict = Depends(get_admin_user),
):
    """Return all questions with optional filters."""
    db = get_db()
    query = (
        db.table("questions")
        .select(
            "*, subjects(name, class), chapters(title, number)"
        )
        .order("created_at", desc=True)
    )
    if chapter_id:
        query = query.eq("chapter_id", chapter_id)
    if validated is not None:
        query = query.eq("is_validated", validated)
    result = query.execute()
    return {"questions": result.data, "total": len(result.data)}


@router.post("/questions")
async def create_question(
    body: CreateQuestionRequest,
    admin: dict = Depends(get_admin_user),
):
    """Create a new question."""
    db = get_db()
    result = db.table("questions").insert({
        "subject_id":    str(body.subject_id),
        "chapter_id":    str(body.chapter_id),
        "topic_id":      str(body.topic_id) if body.topic_id else None,
        "question_text": body.question_text,
        "marks":         body.marks,
        "question_type": body.question_type,
        "answer_key":    body.answer_key,
        "rubric":        body.rubric,
        "source":        body.source,
        "is_validated":  False,
    }).execute()
    return result.data[0]


@router.put("/questions/{question_id}")
async def update_question(
    question_id: UUID,
    body: UpdateQuestionRequest,
    admin: dict = Depends(get_admin_user),
):
    """Update a question — answer key, rubric, validation status."""
    db = get_db()
    update_data = body.model_dump(exclude_none=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    result = (
        db.table("questions")
        .update(update_data)
        .eq("id", str(question_id))
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Question not found")
    return result.data[0]


@router.delete("/questions/{question_id}")
async def delete_question(
    question_id: UUID,
    admin: dict = Depends(get_admin_user),
):
    """Soft delete — sets is_active = false."""
    db = get_db()
    db.table("questions").update(
        {"is_active": False}
    ).eq("id", str(question_id)).execute()
    return {"status": "deactivated", "question_id": str(question_id)}


# ── Stats and monitoring ─────────────────────────────────────────────────────

@router.get("/stats")
async def get_system_stats(
    admin: dict = Depends(get_admin_user),
):
    """Return system-wide usage and content stats."""
    db = get_db()

    users_result     = db.table("users").select("id", count="exact").execute()
    chunks_result    = db.table("content_chunks").select("id, is_validated", count="exact").execute()
    questions_result = db.table("questions").select("id, is_validated", count="exact").execute()
    responses_result = db.table("responses").select("id, ai_score, max_score").execute()
    cache_result     = db.table("ai_cache").select("id, hit_count").execute()
    logs_result      = (
        db.table("usage_logs")
        .select("action, was_cached, model_used")
        .order("created_at", desc=True)
        .limit(500)
        .execute()
    )

    chunks    = chunks_result.data or []
    questions = questions_result.data or []
    responses = responses_result.data or []
    logs      = logs_result.data or []
    cache     = cache_result.data or []

    validated_chunks    = sum(1 for c in chunks    if c["is_validated"])
    validated_questions = sum(1 for q in questions if q["is_validated"])

    scored = [r for r in responses if r.get("ai_score") is not None]
    avg_score = 0.0
    if scored:
        pcts = [(r["ai_score"] / r["max_score"]) * 100 for r in scored]
        avg_score = round(sum(pcts) / len(pcts), 1)

    total_hits  = sum(c.get("hit_count", 1) for c in cache)
    cached_calls = sum(1 for l in logs if l["was_cached"])
    total_calls  = len(logs)

    return {
        "users": {
            "total": users_result.count or 0,
        },
        "content": {
            "total_chunks":      len(chunks),
            "validated_chunks":  validated_chunks,
            "pending_chunks":    len(chunks) - validated_chunks,
        },
        "questions": {
            "total":      len(questions),
            "validated":  validated_questions,
            "pending":    len(questions) - validated_questions,
        },
        "evaluations": {
            "total":            len(responses),
            "scored":           len(scored),
            "average_score_pct": avg_score,
        },
        "cache": {
            "total_entries": len(cache),
            "total_hits":    total_hits,
            "cached_calls":  cached_calls,
            "cache_hit_rate": (
                round((cached_calls / total_calls) * 100, 1)
                if total_calls > 0 else 0.0
            ),
        },
        "ai_calls": {
            "total":    total_calls,
            "by_model": _group_by(logs, "model_used"),
            "by_action": _group_by(logs, "action"),
        },
    }


def _group_by(items: list[dict], key: str) -> dict:
    result: dict[str, int] = {}
    for item in items:
        val = item.get(key, "unknown")
        result[val] = result.get(val, 0) + 1
    return result


# ── Content pipeline trigger ─────────────────────────────────────────────────

@router.post("/pipeline/trigger")
async def trigger_pipeline(
    body: TriggerPipelineRequest,
    admin: dict = Depends(get_admin_user),
):
    """
    Load a pre-processed structured JSON into Supabase and ChromaDB.
    The JSON must already exist in content/structured/ (run pdf_extract.py first).
    This endpoint does the embed + DB load steps.
    """
    import asyncio
    from pathlib import Path
    from modules.content_pipeline import (
        load_structured_json,
        embed_chunks,
        load_chunks_to_db,
    )

    json_path = Path(body.json_path)
    if not json_path.exists():
        raise HTTPException(
            status_code=400,
            detail=f"JSON file not found: {body.json_path}. "
                   f"Run scripts/pdf_extract.py first.",
        )

    chunks = load_structured_json(str(json_path))
    if not chunks:
        raise HTTPException(status_code=400, detail="JSON file is empty")

    embed_chunks(chunks)

    count = await load_chunks_to_db(
        chunks=chunks,
        subject_id=str(body.subject_id),
        chapter_id=str(body.chapter_id),
        topic_id=str(body.topic_id) if body.topic_id else None,
    )

    return {
        "status":          "ok",
        "chunks_embedded": len(chunks),
        "chunks_inserted": count,
        "json_path":       str(json_path),
    }
```

---

### Update: backend/api/v1/router.py

Add the admin router. Replace the entire file:

```python
from fastapi import APIRouter
from .syllabus   import router as syllabus_router
from .learning   import router as learning_router
from .evaluation import router as evaluation_router
from .users      import router as users_router
from .admin      import router as admin_router

router = APIRouter(prefix="/api/v1")

router.include_router(syllabus_router,   prefix="/syllabus",    tags=["Syllabus"])
router.include_router(learning_router,   prefix="/learning",    tags=["Learning"])
router.include_router(evaluation_router, prefix="/evaluation",  tags=["Evaluation"])
router.include_router(users_router,      prefix="/users",       tags=["Users"])
router.include_router(admin_router,      prefix="/admin",       tags=["Admin"])
```

---

## Step 4: Create the admin frontend

---

### FILE: frontend/admin/src/api/client.js

```js
const BASE = '/api/v1/admin'

function getToken() {
  return localStorage.getItem('admin_token') || ''
}

async function request(method, path, body = null) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  }
  const config = { method, headers }
  if (body) config.body = JSON.stringify(body)
  const res = await fetch(`${BASE}${path}`, config)
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(err.detail || err.error || 'Request failed')
  }
  return res.json()
}

export const adminApi = {
  get:    path        => request('GET',    path),
  post:   (path, b)   => request('POST',   path, b),
  put:    (path, b)   => request('PUT',    path, b),
  delete: path        => request('DELETE', path),
}
```

---

### FILE: frontend/admin/src/components/StatCard.jsx

```jsx
export default function StatCard({ label, value, sub, color = 'purple' }) {
  const colors = {
    purple: 'text-admin-600',
    green:  'text-green-600',
    yellow: 'text-yellow-600',
    red:    'text-red-600',
    blue:   'text-blue-600',
  }
  return (
    <div className="card text-center">
      <p className={`text-3xl font-bold ${colors[color]}`}>{value}</p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  )
}
```

---

### FILE: frontend/admin/src/components/AdminLayout.jsx

```jsx
import { useState } from 'react'

const NAV = [
  { href: '/',           label: '📊 Dashboard'   },
  { href: '/content',    label: '📚 Content'      },
  { href: '/questions',  label: '❓ Questions'     },
  { href: '/evaluations',label: '🤖 Evaluations'  },
  { href: '/pipeline',   label: '⚙️ Pipeline'     },
]

export default function AdminLayout({ children, title }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-52 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <p className="font-bold text-admin-700 text-sm">⚙️ Admin Panel</p>
          <p className="text-xs text-gray-400 mt-0.5">Exam Coach</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(n => (
            <a
              key={n.href}
              href={n.href}
              className={`block px-3 py-2 rounded-lg text-sm transition-colors
                ${window.location.pathname === n.href
                  ? 'bg-admin-50 text-admin-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-200">
          <button
            onClick={() => {
              localStorage.removeItem('admin_token')
              window.location.href = '/login'
            }}
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="border-b border-gray-200 bg-white px-6 py-4">
          <h1 className="text-lg font-bold text-gray-900">{title}</h1>
        </div>
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
```

---

### FILE: frontend/admin/src/pages/LoginPage.jsx

```jsx
import { useState } from 'react'

const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY

export default function LoginPage() {
  const [email,    setEmail]   = useState('')
  const [password, setPass]    = useState('')
  const [loading,  setLoading] = useState(false)
  const [error,    setError]   = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(
        `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: SUPABASE_ANON,
          },
          body: JSON.stringify({ email, password }),
        }
      )
      const data = await res.json()
      if (!res.ok) throw new Error(data.error_description || 'Login failed')
      localStorage.setItem('admin_token', data.access_token)
      window.location.href = '/'
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-4xl mb-2">⚙️</p>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-sm text-gray-500 mt-1">AI Exam Coach</p>
        </div>
        <div className="card">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Admin Email
              </label>
              <input type="email" className="input" value={email}
                onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input type="password" className="input" value={password}
                onChange={e => setPass(e.target.value)} required />
            </div>
            {error && (
              <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
                {error}
              </p>
            )}
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
        <p className="text-xs text-center text-gray-400 mt-4">
          Admin access only. Your account must have role: admin in Supabase.
        </p>
      </div>
    </div>
  )
}
```

---

### FILE: frontend/admin/src/pages/DashboardPage.jsx

```jsx
import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import StatCard    from '../components/StatCard'
import { adminApi } from '../api/client'

export default function DashboardPage() {
  const [stats,   setStats]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')

  useEffect(() => {
    adminApi.get('/stats')
      .then(setStats)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <AdminLayout title="Dashboard">
      <p className="text-gray-400">Loading stats...</p>
    </AdminLayout>
  )

  if (error) return (
    <AdminLayout title="Dashboard">
      <p className="text-red-600">{error}</p>
    </AdminLayout>
  )

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Users"    value={stats.users.total}
                  color="purple" />
        <StatCard label="Content Chunks" value={stats.content.total_chunks}
                  sub={`${stats.content.pending_chunks} pending`}
                  color="yellow" />
        <StatCard label="Questions"      value={stats.questions.total}
                  sub={`${stats.questions.pending} pending`}
                  color="blue" />
        <StatCard label="Avg Score"
                  value={`${stats.evaluations.average_score_pct}%`}
                  sub={`${stats.evaluations.total} attempts`}
                  color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Cache stats */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-3">Cache Performance</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Cache Hit Rate</span>
              <span className="font-medium text-green-700">
                {stats.cache.cache_hit_rate}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total AI Calls</span>
              <span className="font-medium">{stats.ai_calls.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cached Calls</span>
              <span className="font-medium">{stats.cache.cached_calls}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cache Entries</span>
              <span className="font-medium">{stats.cache.total_entries}</span>
            </div>
          </div>
        </div>

        {/* Calls by model */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-3">AI Calls by Model</h2>
          <div className="space-y-2 text-sm">
            {Object.entries(stats.ai_calls.by_model).map(([model, count]) => (
              <div key={model} className="flex justify-between">
                <span className="text-gray-600 font-mono text-xs">{model}</span>
                <span className="font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending actions */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-3">Pending Actions</h2>
          <div className="space-y-2">
            <a href="/content"
              className="flex items-center justify-between p-2 rounded-lg
                         hover:bg-yellow-50 transition-colors">
              <span className="text-sm text-gray-700">
                Content chunks to validate
              </span>
              <span className="badge-yellow">
                {stats.content.pending_chunks}
              </span>
            </a>
            <a href="/questions"
              className="flex items-center justify-between p-2 rounded-lg
                         hover:bg-blue-50 transition-colors">
              <span className="text-sm text-gray-700">
                Questions to validate
              </span>
              <span className="badge bg-blue-100 text-blue-800">
                {stats.questions.pending}
              </span>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
```

---

### FILE: frontend/admin/src/pages/ContentPage.jsx

```jsx
import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { adminApi } from '../api/client'

const CHUNK_COLORS = {
  summary:     'badge-green',
  theme:       'badge-purple',
  character:   'badge-blue',
  glossary:    'badge-yellow',
  author_info: 'badge-gray',
  exam_tip:    'badge bg-orange-100 text-orange-800',
  key_points:  'badge bg-teal-100 text-teal-800',
  explanation: 'badge-gray',
  example:     'badge bg-pink-100 text-pink-800',
}

export default function ContentPage() {
  const [chunks,  setChunks]  = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')
  const [editing, setEditing] = useState(null)
  const [editText,setEditText]= useState('')

  useEffect(() => { loadPending() }, [])

  async function loadPending() {
    setLoading(true)
    try {
      const data = await adminApi.get('/content/pending')
      setChunks(data.pending)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function validate(id) {
    try {
      await adminApi.post(`/content/validate/${id}`)
      setChunks(prev => prev.filter(c => c.id !== id))
    } catch (e) {
      alert(e.message)
    }
  }

  async function deleteChunk(id) {
    if (!confirm('Delete this chunk permanently?')) return
    try {
      await adminApi.delete(`/content/${id}`)
      setChunks(prev => prev.filter(c => c.id !== id))
    } catch (e) {
      alert(e.message)
    }
  }

  async function saveEdit(id) {
    try {
      await adminApi.put(`/content/${id}`, { content: editText })
      setChunks(prev => prev.map(c =>
        c.id === id ? { ...c, content: editText } : c
      ))
      setEditing(null)
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <AdminLayout title="Content Validation">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {chunks.length} chunks pending validation
        </p>
        <button onClick={loadPending} className="btn-ghost text-sm">
          Refresh
        </button>
      </div>

      {error   && <p className="text-red-600 mb-4">{error}</p>}
      {loading && <p className="text-gray-400">Loading...</p>}

      <div className="space-y-3">
        {chunks.map(chunk => (
          <div key={chunk.id} className="card">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={CHUNK_COLORS[chunk.chunk_type] || 'badge-gray'}>
                  {chunk.chunk_type}
                </span>
                {chunk.chapters && (
                  <span className="text-xs text-gray-500">
                    Ch {chunk.chapters.number}. {chunk.chapters.title}
                  </span>
                )}
                {chunk.section_header && (
                  <span className="text-xs text-gray-400 italic">
                    — {chunk.section_header}
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {chunk.language === 'ta' ? '🇮🇳 Tamil' : '🇬🇧 English'}
              </span>
            </div>

            {/* Content — editable */}
            {editing === chunk.id ? (
              <div className="mb-3">
                <textarea
                  className="input min-h-32 resize-y font-mono text-xs"
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => saveEdit(chunk.id)}
                    className="btn-success text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="btn-ghost text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-700 leading-relaxed mb-3 whitespace-pre-wrap">
                {chunk.content}
              </p>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => validate(chunk.id)}
                className="btn-success text-xs py-1.5"
              >
                ✓ Validate
              </button>
              <button
                onClick={() => {
                  setEditing(chunk.id)
                  setEditText(chunk.content)
                }}
                className="btn-ghost text-xs py-1.5"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => deleteChunk(chunk.id)}
                className="btn-danger text-xs py-1.5"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
        {!loading && chunks.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">✅</p>
            <p>All content is validated.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
```

---

### FILE: frontend/admin/src/pages/QuestionsPage.jsx

```jsx
import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { adminApi } from '../api/client'

export default function QuestionsPage() {
  const [questions, setQ]     = useState([])
  const [loading,   setL]     = useState(true)
  const [filter,    setFilter]= useState('all')
  const [error,     setError] = useState('')

  useEffect(() => { load() }, [])

  async function load() {
    setL(true)
    try {
      const data = await adminApi.get('/questions')
      setQ(data.questions)
    } catch (e) {
      setError(e.message)
    } finally {
      setL(false)
    }
  }

  async function toggleValidate(q) {
    try {
      await adminApi.put(`/questions/${q.id}`, {
        is_validated: !q.is_validated,
      })
      setQ(prev => prev.map(item =>
        item.id === q.id
          ? { ...item, is_validated: !item.is_validated }
          : item
      ))
    } catch (e) {
      alert(e.message)
    }
  }

  async function deactivate(id) {
    if (!confirm('Deactivate this question?')) return
    try {
      await adminApi.delete(`/questions/${id}`)
      setQ(prev => prev.map(q =>
        q.id === id ? { ...q, is_active: false } : q
      ))
    } catch (e) {
      alert(e.message)
    }
  }

  const filtered = questions.filter(q => {
    if (filter === 'pending')    return !q.is_validated
    if (filter === 'validated')  return q.is_validated
    if (filter === 'inactive')   return !q.is_active
    return true
  })

  const MARK_COLORS = {
    1: 'badge-gray', 2: 'badge bg-blue-100 text-blue-800',
    5: 'badge-purple', 10: 'badge bg-orange-100 text-orange-800',
  }

  return (
    <AdminLayout title="Question Management">
      <div className="flex gap-2 mb-4">
        {['all', 'pending', 'validated', 'inactive'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`text-sm px-3 py-1.5 rounded-lg border transition-colors
              ${filter === f
                ? 'bg-admin-600 text-white border-admin-600'
                : 'bg-white text-gray-700 border-gray-200'}`}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <span className="ml-auto text-sm text-gray-400 self-center">
          {filtered.length} questions
        </span>
      </div>

      {error   && <p className="text-red-600 mb-4">{error}</p>}
      {loading && <p className="text-gray-400">Loading...</p>}

      <div className="space-y-2">
        {filtered.map(q => (
          <div key={q.id}
            className={`card ${!q.is_active ? 'opacity-50' : ''}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={MARK_COLORS[q.marks] || 'badge-gray'}>
                    {q.marks}m
                  </span>
                  {q.is_validated
                    ? <span className="badge-green">Validated</span>
                    : <span className="badge-yellow">Pending</span>}
                  {!q.is_active && (
                    <span className="badge-red">Inactive</span>
                  )}
                  {q.chapters && (
                    <span className="text-xs text-gray-400">
                      Ch {q.chapters.number}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-800">{q.question_text}</p>
                {q.answer_key && (
                  <details className="mt-2">
                    <summary className="text-xs text-gray-400 cursor-pointer">
                      View answer key
                    </summary>
                    <pre className="text-xs bg-gray-50 p-2 rounded mt-1
                                    overflow-x-auto">
                      {JSON.stringify(q.answer_key, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => toggleValidate(q)}
                  className={q.is_validated ? 'btn-ghost text-xs py-1' : 'btn-success text-xs py-1'}
                >
                  {q.is_validated ? 'Unvalidate' : '✓ Validate'}
                </button>
                {q.is_active && (
                  <button
                    onClick={() => deactivate(q.id)}
                    className="btn-danger text-xs py-1"
                  >
                    Deactivate
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
```

---

### FILE: frontend/admin/src/pages/EvaluationsPage.jsx

```jsx
import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { adminApi } from '../api/client'

export default function EvaluationsPage() {
  const [items,   setItems]  = useState([])
  const [loading, setL]      = useState(true)
  const [error,   setError]  = useState('')
  const [scores,  setScores] = useState({})
  const [notes,   setNotes]  = useState({})

  useEffect(() => {
    adminApi.get('/evaluations/pending')
      .then(d => setItems(d.pending))
      .catch(e => setError(e.message))
      .finally(() => setL(false))
  }, [])

  async function submitReview(id, maxScore) {
    const score = parseFloat(scores[id] ?? '')
    if (isNaN(score) || score < 0 || score > maxScore) {
      alert(`Score must be between 0 and ${maxScore}`)
      return
    }
    try {
      await adminApi.post(`/evaluations/${id}/review`, {
        human_score: score,
        human_notes: notes[id] || '',
      })
      setItems(prev => prev.filter(i => i.id !== id))
    } catch (e) {
      alert(e.message)
    }
  }

  function scoreColor(ai, max) {
    const pct = (ai / max) * 100
    return pct >= 80 ? 'text-green-700' :
           pct >= 50 ? 'text-yellow-700' : 'text-red-700'
  }

  return (
    <AdminLayout title="Evaluation Review">
      <p className="text-sm text-gray-500 mb-4">
        {items.length} evaluations pending human review
      </p>
      {error   && <p className="text-red-600 mb-4">{error}</p>}
      {loading && <p className="text-gray-400">Loading...</p>}

      <div className="space-y-4">
        {items.map(item => {
          const q   = item.questions || {}
          const max = item.max_score
          return (
            <div key={item.id} className="card">
              {/* Question */}
              <div className="mb-3">
                <span className="badge-gray text-xs mb-1 block">
                  {max} marks
                </span>
                <p className="font-medium text-sm">{q.question_text}</p>
              </div>

              {/* Student answer */}
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <p className="text-xs font-semibold text-gray-500 mb-1">
                  STUDENT ANSWER
                </p>
                <p className="text-sm text-gray-700">{item.student_answer}</p>
              </div>

              {/* AI score */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm text-gray-500">AI Score:</span>
                <span className={`font-bold ${scoreColor(item.ai_score, max)}`}>
                  {item.ai_score}/{max}
                </span>
              </div>

              {/* AI feedback */}
              {item.ai_feedback && (
                <details className="mb-3">
                  <summary className="text-xs text-gray-400 cursor-pointer mb-1">
                    View AI feedback
                  </summary>
                  <div className="text-xs bg-gray-50 rounded p-2 space-y-1">
                    {item.ai_feedback.strengths?.map((s, i) => (
                      <p key={i} className="text-green-700">✓ {s}</p>
                    ))}
                    {item.ai_feedback.weaknesses?.map((w, i) => (
                      <p key={i} className="text-red-700">✗ {w}</p>
                    ))}
                  </div>
                </details>
              )}

              {/* Human review form */}
              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs font-semibold text-gray-500 mb-2">
                  YOUR REVIEW
                </p>
                <div className="flex gap-2 items-start">
                  <input
                    type="number"
                    min="0"
                    max={max}
                    step="0.5"
                    placeholder={`Score /  ${max}`}
                    className="input w-28"
                    value={scores[item.id] ?? ''}
                    onChange={e => setScores(prev => ({
                      ...prev, [item.id]: e.target.value,
                    }))}
                  />
                  <input
                    type="text"
                    placeholder="Notes (optional)"
                    className="input flex-1"
                    value={notes[item.id] ?? ''}
                    onChange={e => setNotes(prev => ({
                      ...prev, [item.id]: e.target.value,
                    }))}
                  />
                  <button
                    onClick={() => submitReview(item.id, max)}
                    className="btn-success whitespace-nowrap"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          )
        })}
        {!loading && items.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">✅</p>
            <p>All evaluations reviewed.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
```

---

### FILE: frontend/admin/src/pages/PipelinePage.jsx

```jsx
import { useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { adminApi } from '../api/client'

export default function PipelinePage() {
  const [subjectId,  setSub]    = useState('')
  const [chapterId,  setCh]     = useState('')
  const [jsonPath,   setPath]   = useState('')
  const [loading,    setL]      = useState(false)
  const [result,     setResult] = useState(null)
  const [error,      setError]  = useState('')

  async function trigger() {
    if (!subjectId || !chapterId || !jsonPath) {
      setError('All fields are required.')
      return
    }
    setL(true)
    setError('')
    setResult(null)
    try {
      const data = await adminApi.post('/pipeline/trigger', {
        subject_id: subjectId,
        chapter_id: chapterId,
        json_path:  jsonPath,
      })
      setResult(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setL(false)
    }
  }

  return (
    <AdminLayout title="Content Pipeline">
      <div className="max-w-xl">
        <div className="card mb-6">
          <h2 className="font-semibold text-gray-900 mb-1">
            How the pipeline works
          </h2>
          <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
            <li>Drop your PDF in <code className="bg-gray-100 px-1 rounded">content/raw/</code></li>
            <li>Run <code className="bg-gray-100 px-1 rounded">python scripts/pdf_extract.py</code> to generate JSON</li>
            <li>Get subject and chapter UUIDs from Supabase Table Editor</li>
            <li>Fill the form below and click Trigger Pipeline</li>
            <li>Go to Content page and validate the chunks</li>
          </ol>
        </div>

        <div className="card space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject UUID
            </label>
            <input className="input" placeholder="Paste from Supabase subjects table"
              value={subjectId} onChange={e => setSub(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chapter UUID
            </label>
            <input className="input" placeholder="Paste from Supabase chapters table"
              value={chapterId} onChange={e => setCh(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              JSON File Path
            </label>
            <input className="input font-mono text-sm"
              placeholder="content/structured/english_plus1_ch3.json"
              value={jsonPath} onChange={e => setPath(e.target.value)} />
            <p className="text-xs text-gray-400 mt-1">
              Relative to the project root. Must exist before triggering.
            </p>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          <button onClick={trigger} disabled={loading} className="btn-primary w-full">
            {loading ? 'Running pipeline...' : '⚙️ Trigger Pipeline'}
          </button>
        </div>

        {result && (
          <div className="card mt-4 bg-green-50 border-green-200">
            <p className="font-semibold text-green-800 mb-2">
              ✅ Pipeline complete
            </p>
            <div className="text-sm text-green-700 space-y-1">
              <p>Chunks embedded: {result.chunks_embedded}</p>
              <p>Chunks inserted into Supabase: {result.chunks_inserted}</p>
              <p>JSON file: {result.json_path}</p>
            </div>
            <p className="text-sm text-green-600 mt-2">
              Go to the Content page to validate the chunks.
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
```

---

### FILE: frontend/admin/src/App.jsx

```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage       from './pages/LoginPage'
import DashboardPage   from './pages/DashboardPage'
import ContentPage     from './pages/ContentPage'
import QuestionsPage   from './pages/QuestionsPage'
import EvaluationsPage from './pages/EvaluationsPage'
import PipelinePage    from './pages/PipelinePage'

function Guard({ children }) {
  const token = localStorage.getItem('admin_token')
  return token ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/"            element={<Guard><DashboardPage /></Guard>} />
        <Route path="/content"     element={<Guard><ContentPage /></Guard>} />
        <Route path="/questions"   element={<Guard><QuestionsPage /></Guard>} />
        <Route path="/evaluations" element={<Guard><EvaluationsPage /></Guard>} />
        <Route path="/pipeline"    element={<Guard><PipelinePage /></Guard>} />
      </Routes>
    </BrowserRouter>
  )
}
```

---

### FILE: frontend/admin/src/main.jsx

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

---

### FILE: frontend/admin/.env.local

```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

---

## Step 5: Set yourself as admin in Supabase

Run this in Supabase SQL Editor (replace with your real email):

```sql
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'your-admin@email.com';
```

---

## Step 6: Update CLAUDE.md phase log

```markdown
## Phase Log (Update This at the Start of Every Phase)
- Phase 0: Project scaffold ✓
- Phase 1: Database schema, RLS, seed data ✓
- Phase 2: Content pipeline — PDF → JSON → ChromaDB ✓
- Phase 3: Backend API skeleton — routes, models, auth, rate limiting ✓
- Phase 4: Learning module — Ollama, ChromaDB retrieval, explain endpoint ✓
- Phase 5: Evaluation module — rubric scoring, feedback, improved answer ✓
- Phase 6: React web frontend — learn, practice, evaluate, progress UI ✓
- Phase 7: Flutter mobile app — Android/iOS, same API ✓
- Phase 8: Admin panel — content validation, evaluation review, pipeline ← current
```

---

## Step 7: Commit to git

```bash
git add .
git commit -m "Phase 8: Admin panel — content validation, evaluation review, pipeline trigger"
```

---

## Step 8: Start everything and test

```bash
# Terminal 1 — Backend (already running)
cd backend && uvicorn main:app --reload --port 8000

# Terminal 2 — Student web (already running)
cd frontend/web && npm run dev

# Terminal 3 — Admin panel (new)
cd frontend/admin && npm install && npm run dev
```

Open http://localhost:5174
Login with your admin email.

Test this exact sequence:
1. Dashboard → see stats
2. Content → validate a few chunks
3. Questions → validate seeded questions
4. Evaluations → submit a student answer first via student UI, then review it here
5. Pipeline → trigger with a real JSON file

---

## Step 9: Print completion summary

```
── Backend ──────────────────────────────────────────────────
✓ backend/core/admin_auth.py          — admin role check
✓ backend/api/v1/admin.py             — 14 admin endpoints
✓ backend/api/v1/router.py            — admin router registered

── Admin Frontend ───────────────────────────────────────────
✓ frontend/admin/package.json
✓ frontend/admin/vite.config.js
✓ frontend/admin/tailwind.config.js
✓ frontend/admin/index.html
✓ frontend/admin/src/index.css
✓ frontend/admin/src/api/client.js
✓ frontend/admin/src/components/StatCard.jsx
✓ frontend/admin/src/components/AdminLayout.jsx
✓ frontend/admin/src/pages/LoginPage.jsx
✓ frontend/admin/src/pages/DashboardPage.jsx    — stats overview
✓ frontend/admin/src/pages/ContentPage.jsx      — validate / edit / delete chunks
✓ frontend/admin/src/pages/QuestionsPage.jsx    — validate questions
✓ frontend/admin/src/pages/EvaluationsPage.jsx  — review AI evaluations
✓ frontend/admin/src/pages/PipelinePage.jsx     — trigger content pipeline
✓ frontend/admin/src/App.jsx
✓ frontend/admin/src/main.jsx
✓ frontend/admin/.env.local
✓ CLAUDE.md updated
✓ Git committed

ACTION REQUIRED:
1. Run SQL to set yourself as admin in Supabase
2. Fill frontend/admin/.env.local with real Supabase credentials
3. Run: cd frontend/admin && npm install && npm run dev
4. Open: http://localhost:5174
5. Login with your admin account

Phase 8 complete.
Next: Phase 9 — Testing and Deployment
(Playwright E2E tests, GitHub Actions CI, cloud deployment)
```
