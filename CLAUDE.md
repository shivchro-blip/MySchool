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
- backend/db/client.py                       → Supabase client only — used ONLY by repositories
- backend/db/repositories/syllabus_repo.py   → all syllabus DB queries
- backend/db/repositories/questions_repo.py  → all question DB queries
- backend/db/repositories/responses_repo.py  → all response DB queries
- backend/db/repositories/cache_repo.py      → all cache DB queries
- backend/db/repositories/users_repo.py      → all user DB queries
- backend/core/ai_gate.py                    → single entry point for ALL AI calls
                                               handles: rate limit + cache + LLM + logging
- backend/ai/router.py                       → pure LLM dispatch only (Ollama → OpenRouter)
                                               called ONLY by AIGate
- backend/modules/learning/                  → explain topic logic only
- backend/modules/evaluation/                → score + feedback logic only
- backend/modules/content_pipeline/          → PDF extraction + embedding only
- content/raw/                               → drop PDFs here (gitignored)
- content/structured/                        → JSON output from content pipeline
- content/embeddings/                        → ChromaDB local vector store (gitignored)
- scripts/                                   → one-time or offline scripts only

## Architecture Rules
- get_db() is called ONLY inside db/repositories/*.py — nowhere else
- AIGate is the ONLY class that checks rate limits, reads cache, and logs usage
- ai/router.py is called ONLY by AIGate — never directly from modules or routes
- Modules instantiate repositories and AIGate — they never touch get_db()

## Validation Contract (enforced in code)
- Content chunks in ChromaDB are only used for evaluation if is_validated=True in Supabase
- is_validated is set to True ONLY by an admin in the admin panel
- If no validated chunks exist for a chapter, evaluation uses answer key only
- The student's feedback will contain a ⚠️ warning when unvalidated content is used
- Cache keys include :validated=True/False so validated and unvalidated results are cached separately

## AI Router Rule
1. Always call Ollama first
2. Fall back to OpenRouter only if Ollama is unavailable or user is on paid plan
3. LLM calls must NEVER be made directly from modules — always go through core/ai_gate.py

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

## Phase Log
- Phase 0: Project scaffold ✓
- Phase 1: Database schema, RLS, seed data ✓
- Phase 2: Content pipeline — PDF → JSON → ChromaDB ✓
- Phase 3: Backend API skeleton — routes, models, auth, rate limiting ✓
- Phase 4: Learning module — Ollama, ChromaDB retrieval, explain endpoint ✓
- Phase 5: Evaluation module — rubric scoring, feedback, improved answer ✓
- Phase 6: React web frontend — learn, practice, evaluate, progress UI ✓
- Phase 7: Flutter mobile app — Android/iOS, same API ✓
- Phase 8: Admin panel — content validation, evaluation review, pipeline ✓
- Phase 9: Testing and deployment — Playwright, CI, nginx, systemd ✓

## Current Status
ALL PHASES COMPLETE — System is production-ready.
