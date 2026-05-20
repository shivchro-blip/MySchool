# AI Exam Coach — Phase 0: Project Initialization
> Paste this entire file into Claude Code. Do not modify anything.

---

## Step 1: Create the root folder and all subfolders

```bash
mkdir -p exam-coach/{backend/{modules/{learning,evaluation,content_pipeline},models,db,ai,tests},frontend/{web/src,app},content/{raw,structured,embeddings},admin,scripts}
```

---

## Step 2: Create every file listed below with exactly the content shown

---

### FILE: exam-coach/CLAUDE.md

```markdown
# AI Exam Coach — Project Brain

## What This System Does
Syllabus-aware AI platform for Tamil Nadu State Board +1 and +2 students.
Core loop: Learn → Ask → Practice → Write → Evaluate → Improve

## Tech Stack (Do Not Change Without Updating This File)
- Backend: FastAPI (Python 3.11+)
- Frontend Web: React + Vite + Tailwind
- Mobile: Flutter
- Database: Supabase (PostgreSQL)
- Vector DB: ChromaDB (local folder: content/embeddings/)
- AI Default: Ollama (local server, http://localhost:11434)
- AI Fallback: OpenRouter (paid users only)
- Cache: Supabase table or Redis (TTL 7 days)
- Auth: Supabase Auth

## Folder Roles (Never Mix These)
- backend/modules/learning/           → concept retrieval and explanation only
- backend/modules/evaluation/         → scoring and feedback only
- backend/modules/content_pipeline/   → PDF processing and embedding only
- backend/ai/                         → ALL LLM calls go here only, never inside modules
- backend/db/                         → ALL database queries go here only
- content/raw/                        → drop PDFs here (gitignored)
- content/structured/                 → JSON output from content pipeline
- content/embeddings/                 → ChromaDB local vector store (gitignored)
- scripts/                            → one-time or offline scripts only

## AI Router Rule
1. Always call Ollama first
2. Fall back to OpenRouter only if Ollama is unavailable or user is on paid plan
3. LLM calls must NEVER be made directly from modules — always go through backend/ai/router.py

## API Route Pattern
All routes follow: /api/v1/{module}/{action}
Examples:
  POST /api/v1/learning/explain
  POST /api/v1/evaluation/submit
  GET  /api/v1/syllabus/chapters

## Naming Conventions
- Python files and functions: snake_case
- Python classes: PascalCase
- React components: PascalCase
- React hooks: camelCase prefixed with "use"
- Database tables: snake_case, plural
- API request/response models: PascalCase with suffix Request or Response

## Hard Rules
- Never hardcode any value — always use config.py and .env
- Never use sync functions in FastAPI — async throughout
- Never store raw PDF text in the database
- Never skip Pydantic validation on any API input or output
- Never install a package without adding it to pyproject.toml

## Phase Log (Update This at the Start of Every Phase)
- Phase 0: Project scaffold ← current
```

---

### FILE: exam-coach/.clauignore

```
node_modules/
__pycache__/
.venv/
venv/
*.pyc
*.pyo
.env
content/raw/
content/embeddings/
*.pdf
dist/
build/
.dart_tool/
flutter/build/
*.lock
*.log
.DS_Store
```

---

### FILE: exam-coach/.gitignore

```
# Python
__pycache__/
*.pyc
*.pyo
.venv/
venv/
*.egg-info/
dist/
build/

# Environment
.env

# Content (never commit PDFs or vector store)
content/raw/
content/embeddings/

# Node
node_modules/
dist/
.next/

# Flutter
.dart_tool/
app/build/
*.g.dart

# OS
.DS_Store
Thumbs.db

# Logs
*.log
```

---

### FILE: exam-coach/backend/.env.example

```
# Supabase
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=

# Ollama (local AI)
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=mistral:7b-instruct

# OpenRouter (fallback AI)
OPENROUTER_API_KEY=
OPENROUTER_MODEL=anthropic/claude-3-haiku

# App
APP_ENV=development
SECRET_KEY=
ALLOWED_ORIGINS=http://localhost:5173

# Cache
REDIS_URL=
CACHE_TTL_SECONDS=604800
```

---

### FILE: exam-coach/backend/pyproject.toml

```toml
[project]
name = "exam-coach-backend"
version = "0.1.0"
requires-python = ">=3.11"
dependencies = [
    "fastapi>=0.111.0",
    "uvicorn[standard]",
    "pydantic>=2.0",
    "pydantic-settings",
    "supabase",
    "chromadb",
    "httpx",
    "python-multipart",
    "python-dotenv",
    "pdfplumber",
    "langchain-text-splitters",
]

[tool.pytest.ini_options]
testpaths = ["backend/tests"]
```

---

### FILE: exam-coach/backend/config.py

```python
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    supabase_url: str = ""
    supabase_anon_key: str = ""
    supabase_service_key: str = ""

    ollama_base_url: str = "http://localhost:11434"
    ollama_model: str = "mistral:7b-instruct"

    openrouter_api_key: str = ""
    openrouter_model: str = "anthropic/claude-3-haiku"

    app_env: str = "development"
    secret_key: str = ""
    allowed_origins: str = "http://localhost:5173"

    redis_url: str = ""
    cache_ttl_seconds: int = 604800


settings = Settings()
```

---

### FILE: exam-coach/backend/main.py

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings

app = FastAPI(
    title="AI Exam Coach API",
    version="0.1.0",
    docs_url="/api/docs" if settings.app_env == "development" else None,
    redoc_url=None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    return {"status": "ok", "env": settings.app_env}
```

---

### FILE: exam-coach/backend/modules/__init__.py

```python
```

---

### FILE: exam-coach/backend/modules/learning/__init__.py

```python
# Learning module
# Responsibilities: syllabus navigation, concept explanation
# Do NOT put LLM calls here — use ai/router.py
```

---

### FILE: exam-coach/backend/modules/evaluation/__init__.py

```python
# Evaluation module
# Responsibilities: score student answers, generate feedback
# Do NOT put LLM calls here — use ai/router.py
```

---

### FILE: exam-coach/backend/modules/content_pipeline/__init__.py

```python
# Content pipeline module
# Responsibilities: PDF extraction, chunking, embedding
# Do NOT put LLM calls here — use ai/router.py
```

---

### FILE: exam-coach/backend/models/__init__.py

```python
# Pydantic request and response models
# All models used across the API live here
```

---

### FILE: exam-coach/backend/db/__init__.py

```python
# Database access layer
# All Supabase queries go here
# Modules never query the DB directly
```

---

### FILE: exam-coach/backend/db/client.py

```python
# Supabase client — stub
# Phase 1 will configure this fully

from supabase import create_client, Client
from config import settings

_client: Client | None = None


def get_db() -> Client:
    global _client
    if _client is None:
        if not settings.supabase_url or not settings.supabase_service_key:
            raise RuntimeError("Supabase credentials not configured. Check .env file.")
        _client = create_client(settings.supabase_url, settings.supabase_service_key)
    return _client
```

---

### FILE: exam-coach/backend/ai/__init__.py

```python
# AI layer
# All LLM calls go through router.py in this folder
# Never call Ollama or OpenRouter from anywhere else
```

---

### FILE: exam-coach/backend/ai/router.py

```python
# AI Router — stub
# Phase 4 will implement this fully
# Rule: Try Ollama first, fall back to OpenRouter

from config import settings


async def call_llm(prompt: str, system: str = "") -> str:
    """
    Main entry point for all LLM calls.
    Tries Ollama first, falls back to OpenRouter.
    """
    # TODO: implement in Phase 4
    raise NotImplementedError("AI router not implemented yet. Coming in Phase 4.")
```

---

### FILE: exam-coach/backend/tests/__init__.py

```python
```

---

### FILE: exam-coach/scripts/pdf_extract.py

```python
# PDF Extraction Script — stub
# Phase 2 will implement this fully
# Usage: python scripts/pdf_extract.py --input content/raw/file.pdf --output content/structured/

import argparse


def main():
    parser = argparse.ArgumentParser(description="Extract PDF content to structured JSON")
    parser.add_argument("--input", required=True, help="Path to PDF file")
    parser.add_argument("--output", required=True, help="Output folder for JSON")
    args = parser.parse_args()
    print(f"[stub] Would extract: {args.input} → {args.output}")
    print("Full implementation coming in Phase 2.")


if __name__ == "__main__":
    main()
```

---

### FILE: exam-coach/scripts/chunk_embed.py

```python
# Chunk and Embed Script — stub
# Phase 2 will implement this fully
# Usage: python scripts/chunk_embed.py --input content/structured/

import argparse


def main():
    parser = argparse.ArgumentParser(description="Chunk structured JSON and store embeddings")
    parser.add_argument("--input", required=True, help="Path to structured JSON folder")
    args = parser.parse_args()
    print(f"[stub] Would embed content from: {args.input}")
    print("Full implementation coming in Phase 2.")


if __name__ == "__main__":
    main()
```

---

### FILE: exam-coach/scripts/seed_db.py

```python
# DB Seed Script — stub
# Phase 1 will implement this fully
# Usage: python scripts/seed_db.py

def main():
    print("[stub] Would seed syllabus structure into Supabase.")
    print("Full implementation coming in Phase 1.")


if __name__ == "__main__":
    main()
```

---

### FILE: exam-coach/frontend/web/package.json

```json
{
  "name": "exam-coach-web",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.24.0",
    "axios": "^1.7.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.0",
    "vite": "^5.3.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

---

### FILE: exam-coach/frontend/web/src/main.jsx

```jsx
// Entry point — stub
// Phase 6 will build the full UI

import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>AI Exam Coach</h1>
      <p>Frontend coming in Phase 6.</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

---

### FILE: exam-coach/frontend/app/pubspec.yaml

```yaml
name: exam_coach
description: AI Exam Coach mobile app for Tamil Nadu students
version: 0.1.0+1
environment:
  sdk: ">=3.0.0 <4.0.0"
dependencies:
  flutter:
    sdk: flutter
  http: ^1.2.0
  provider: ^6.1.0
  go_router: ^13.0.0
dev_dependencies:
  flutter_test:
    sdk: flutter
flutter:
  uses-material-design: true
```

---

### FILE: exam-coach/admin/README.md

```markdown
# Admin Panel

Placeholder for Phase 8.

## Purpose
- Review and validate AI-generated content
- Approve or correct AI evaluations
- Manage syllabus structure
- Upload new PDFs for the content pipeline

## Tech
Will be built as a separate React app or integrated into the web
frontend behind an admin role check using Supabase RLS.
```

---

### FILE: exam-coach/README.md

```markdown
# AI Exam Coach

Syllabus-aware AI platform for Tamil Nadu State Board +1 and +2 students.

**Core loop:** Learn → Ask → Practice → Write → Evaluate → Improve

## Tech Stack

| Layer          | Technology              |
|----------------|-------------------------|
| Backend API    | FastAPI (Python 3.11+)  |
| Web Frontend   | React + Vite + Tailwind |
| Mobile App     | Flutter                 |
| Database       | Supabase (PostgreSQL)   |
| Vector DB      | ChromaDB (local)        |
| AI (default)   | Ollama (local server)   |
| AI (fallback)  | OpenRouter              |

## Local Setup

1. Clone the repo
2. Copy `backend/.env.example` to `backend/.env` and fill in values
3. Install Python deps: `cd backend && pip install -e .`
4. Install Node deps: `cd frontend/web && npm install`
5. Start Ollama: `ollama run mistral:7b-instruct`
6. Start backend: `cd backend && uvicorn main:app --reload`
7. Start frontend: `cd frontend/web && npm run dev`
8. Visit: http://localhost:5173

## Project Brain
See [CLAUDE.md](./CLAUDE.md) for architecture decisions, rules, and phase log.

## Phase Progress
- [x] Phase 0: Project scaffold
- [ ] Phase 1: Database schema
- [ ] Phase 2: Content pipeline
- [ ] Phase 3: Backend API skeleton
- [ ] Phase 4: Learning module
- [ ] Phase 5: Evaluation module
- [ ] Phase 6: Web frontend
- [ ] Phase 7: Flutter app
- [ ] Phase 8: Admin panel
- [ ] Phase 9: Testing and deployment
```

---

## Step 3: Initialize git and commit

```bash
cd exam-coach
git init
git add .
git commit -m "Phase 0: Project scaffold — structure, config, CLAUDE.md"
```

---

## Step 4: Print this exact completion summary

```
✓ exam-coach/                          root folder
✓ exam-coach/CLAUDE.md                 project brain
✓ exam-coach/.clauignore               Claude ignore rules
✓ exam-coach/.gitignore                git ignore rules
✓ exam-coach/README.md                 project readme
✓ backend/main.py                      FastAPI entry point
✓ backend/config.py                    settings loader
✓ backend/pyproject.toml               Python dependencies
✓ backend/.env.example                 environment variable template
✓ backend/ai/__init__.py               AI layer marker
✓ backend/ai/router.py                 AI router stub
✓ backend/db/__init__.py               DB layer marker
✓ backend/db/client.py                 Supabase client stub
✓ backend/modules/__init__.py          modules marker
✓ backend/modules/learning/__init__.py learning module stub
✓ backend/modules/evaluation/__init__.py evaluation module stub
✓ backend/modules/content_pipeline/__init__.py pipeline stub
✓ backend/models/__init__.py           Pydantic models stub
✓ backend/tests/__init__.py            test folder marker
✓ scripts/pdf_extract.py              PDF extraction stub
✓ scripts/chunk_embed.py              chunking and embedding stub
✓ scripts/seed_db.py                  DB seed stub
✓ frontend/web/package.json           React app config
✓ frontend/web/src/main.jsx           React entry point stub
✓ frontend/app/pubspec.yaml           Flutter config
✓ admin/README.md                     admin panel placeholder
✓ Git initialized and first commit made

Phase 0 complete.
Next: Phase 1 — Database Schema (Supabase tables, RLS, seed data)
```
