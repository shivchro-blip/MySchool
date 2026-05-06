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
- get_public_db() for RLS-respecting queries (anon key); get_db() for service-key operations
- AIGate is the ONLY class that checks rate limits, reads cache, and logs usage
- ai/router.py is called ONLY by AIGate — never directly from modules or routes
- Modules instantiate repositories and AIGate — they never touch get_db()

## AIGate Interface
```python
gate = AIGate()
response, model_used, was_cached = await gate.call(
    messages=[{"role": "user", "content": "..."}],
    prompt_type="explain",          # used for logging/cache namespace
    cache_key_content="...",        # deterministic string for cache lookup
    user_id="uuid-or-None",
    temperature=0.3,
    max_tokens=1024,
)
# Raises: RateLimitError | AIUnavailableError
```

## Validation Contract (enforced in code)
- Content chunks in ChromaDB are only used for evaluation if is_validated=True in Supabase
- is_validated is set to True ONLY by an admin in the admin panel
- If no validated chunks exist for a chapter, evaluation uses answer key only
- The student's feedback will contain a ⚠️ warning when unvalidated content is used
- Cache keys include :validated=True/False so validated and unvalidated results are cached separately

## TN Board Context (core/tn_board.py)
This file is the single source of truth for all Tamil Nadu State Board constraints.
It is imported by models, prompts, and the rubric module.

Connected to:
  - models/syllabus.py        → Literal types for class level, content type, marks
  - modules/evaluation/rubric.py → MARK_LEVEL_GUIDANCE (replaces local dict)
  - modules/learning/prompts.py  → BOARD_CONTEXT_FOR_AI prepended to system prompt
  - modules/evaluation/prompts.py → BOARD_CONTEXT_FOR_AI prepended to system prompt

If a new class level, mark level, or content type is added:
  1. Update core/tn_board.py
  2. Update the Supabase CHECK constraints in a new migration SQL file
  3. All models and prompts update automatically via imports

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

Health check (no auth): GET /health — checks Ollama, Supabase, ChromaDB
API docs: GET /api/docs — dev only, disabled in production

## Frontend Architecture (Web — React)
- Router: React Router v6 (BrowserRouter + Routes)
- State: local useState only — no Redux/Zustand/Context store
- HTTP: native fetch wrapper at `frontend/web/src/api/client.js`; token in localStorage key `exam_coach_token`
- UI components: `frontend/web/src/components/ui/` (Card, Button, Input, Badge, Skeleton, ScoreRing, LoopStepper)
- Layout: PageShell + TopBar/BottomNav wraps all pages
- Route pattern: `/courses/:classId/:subjectSlug/:chapterSlug`, `/learn/:chapterSlug`, `/practice/:chapterSlug`

### Web Content Registry
- `frontend/web/src/content/registry.js` → maps chapterSlug → chapter content object (imported by TextSection, SectionPage)
- `frontend/web/src/content/practiceRegistry.js` → maps chapterSlug → practice question set (imported by PracticeSection, LearnRichPage)
- Folder convention: `content/<ClassName>/<SubjectName>/chapters/*.js` and `content/<ClassName>/<SubjectName>/practice/*.js`
- Current data: `content/Class_11/English/chapters/` (18 files) + `content/Class_11/English/practice/` (18 files)
- Adding new class/subject: create `content/Class_12/Math/`, add imports to registry files only — never import chapter files directly from components
- Components only ever import `registry.js` or `practiceRegistry.js`, never individual chapter files

## Mobile Architecture (Flutter)
- Router: go_router — GoRouter with ShellRoute
- ShellScaffold wraps ALL authenticated content routes — bottom nav (Home / Courses / Progress) visible on every screen
- Routes inside ShellRoute: `/dashboard`, `/courses/**`, `/progress`, `/learn/:slug`, `/rich-learn/:slug`, `/practice/:slug`, `/exam/:slug`
- `/login` is OUTSIDE ShellRoute — no bottom nav on login screen
- Navigation: `context.push()` for drill-down (preserves back stack); `context.go()` for tab switches (replaces stack)
- Back button: `context.canPop() ? context.pop() : context.go('/dashboard')` — always safe
- Content data: Flutter reads from `frontend/app/assets/content/chapters/*.json` (separate from web JS files)
- Tab structure in RichLearnScreen: scrollable content tabs + fixed action row (Practice / Attempt History / Ask AI) — action tabs always visible, never scroll off screen
- Action tab injection: `_computeAllTabs()` unconditionally appends practice / attempt-history / askai tabs for every chapter

## Tests
```bash
cd exam-coach/backend
pytest tests/test_evaluation.py -v       # evaluation scoring
pytest tests/test_tn_board.py -v         # board constraint validators
pytest tests/test_api_integration.py -v  # full API stack
pytest tests/test_content_pipeline.py -v # PDF extraction + embeddings
```
All test files: `test_api_integration`, `test_evaluation`, `test_tn_board`, `test_health`, `test_validation_guard`, `test_content_pipeline`, `test_learning`, `test_syllabus`

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

Always read DESIGN_SYSTEM.md before touching any UI, component, or stylesheet.
