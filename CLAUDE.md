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
- Phase 0: Project scaffold ✓
- Phase 1: Database schema, RLS, seed data ✓
- Phase 2: Content pipeline — PDF → JSON → ChromaDB ✓
- Phase 3: Backend API skeleton — routes, models, auth, rate limiting ✓
- Phase 4: Learning module — Ollama, ChromaDB retrieval, explain endpoint ✓
- Phase 5: Evaluation module — rubric scoring, feedback, improved answer ✓
- Phase 6: React web frontend — learn, practice, evaluate, progress UI ✓
- Phase 7: Flutter mobile app — Android/iOS, same API ← current
