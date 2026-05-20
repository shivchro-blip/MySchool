# AI Exam Coach — Project Brain

## Which File to Read

| Task type | Read first |
|-----------|------------|
| Any UI / component / stylesheet | DESIGN_SYSTEM.md → FRONTEND.md |
| Backend route / service / AI / DB | BACKEND.md |
| Admin panel / content validation | ADMIN.md |
| Architecture rules / naming / sync points | CLAUDE.md (this file) |
| Codebase structure / impact of a change | graphify-out/GRAPH_REPORT.md |
| New feature spanning multiple layers | CLAUDE.md → relevant sub-file |

---

## What This System Does
Syllabus-aware AI platform for Tamil Nadu State Board +1 and +2 students.
Core loop: Learn → Ask → Practice → Write → Evaluate → Improve

## Tech Stack (Do Not Change Without Updating This File)
- Backend: FastAPI (Python 3.11+)
- Frontend Web: React 18 + Vite 8 + Tailwind CSS 3
- Mobile: Flutter (SDK >=3.0.0, go_router 13, provider 6)
- Admin Panel: React 18 + Vite 8 + Tailwind CSS 3
- Database: Supabase (PostgreSQL)
- Vector DB: ChromaDB (local folder: `content/embeddings/`)
- AI Default: Ollama (local, `http://localhost:11434`, model: `mistral:7b-instruct`)
- AI Fallback: OpenRouter (paid users only, model: `anthropic/claude-3-haiku`)
- Cache: Redis (TTL 7 days) or Supabase table
- Auth: Supabase Auth

## Monorepo Structure
```
exam-coach/
├── backend/              ← FastAPI app (Python 3.11+)
├── frontend/
│   ├── web/              ← React + Vite web app
│   ├── app/              ← Flutter mobile app
│   └── admin/            ← React + Vite admin panel (dev: http://localhost:5174)
├── content/
│   ├── raw/              ← Drop PDFs here (gitignored)
│   ├── structured/       ← JSON output from content pipeline
│   └── embeddings/       ← ChromaDB vector store (gitignored)
├── source/
│   └── textbooks/        ← Source PDF textbooks (e.g. Class_12_English.pdf)
├── scripts/              ← One-time or offline scripts only
├── deploy/               ← nginx config, systemd services, deploy.sh
├── admin/                ← Admin README and operational docs
├── Dummy_files/          ← HTML source files for chapter content authoring
└── graphify-out/         ← Graphify analysis output (gitignored — do not edit manually)
```

---

## graphify-out/

`graphify-out/` lives at `exam-coach/graphify-out/` (inside the monorepo root).

Contains:
- `graph.html` — visual interactive graph
- `GRAPH_REPORT.md` — god nodes, community clusters, cross-module dependency summary
- `graph.json` — raw graph data

**Before planning any large feature or refactor, read `graphify-out/GRAPH_REPORT.md`.**
It shows which files are most-connected (god nodes), how modules cluster, and the
impact radius of touching any given file.

- Do NOT edit `graphify-out/` manually
- Regenerate by running `graphify .` from `exam-coach/`
- Regenerate after: adding new modules, major refactors, new service files
- `graphify-out/` is gitignored — never commit it

---

## Backend (FastAPI)
See BACKEND.md for: all routes, folder roles, AIGate interface, validation contract, env vars, test files.

### Run locally
```bash
cd exam-coach/backend
pip install -e .
uvicorn main:app --reload          # dev server at http://localhost:8000
```

### Architecture Rules
- `get_db()` called only inside `db/repositories/*.py` — nowhere else
- `get_public_db()` for RLS queries (anon key); `get_db()` for service-key operations
- AIGate is the ONLY class that checks rate limits, reads cache, and logs usage
- `ai/router.py` is called ONLY by AIGate — never from modules or routes
- Modules instantiate repositories and AIGate — they never touch `get_db()`

### TN Board Context (`core/tn_board.py`)
Single source of truth for all Tamil Nadu State Board constraints.
Connected to: `models/syllabus.py`, `modules/evaluation/rubric.py`,
`modules/learning/prompts.py`, `modules/evaluation/prompts.py`.

When adding a new class level, mark level, or content type:
1. Update `core/tn_board.py`
2. Add Supabase CHECK constraints in a new migration SQL file
3. Models and prompts update automatically via imports

---

## Web App (React + Vite)
See FRONTEND.md for: all pages, routes, components, hooks, content registry, state management rules.

### Run locally
```bash
cd exam-coach/frontend/web
npm install
npm run dev     # http://localhost:5173
npm run build
```

---

## Mobile App (Flutter)
See FRONTEND.md for: all screens, routes, providers, services, widgets, config files, dart-define vars.

### Run locally
```bash
cd exam-coach/frontend/app
flutter run
```

---

## Admin Panel
See ADMIN.md for: all pages, routes, validation workflow, pipeline, auth, hard rules.

### Run locally
```bash
cd exam-coach/frontend/admin
npm install
npm run dev     # http://localhost:5174
```

---

## Scripts (`exam-coach/scripts/`)
| Script | Purpose |
|--------|---------|
| `pdf_extract.py` | Extract text from source PDFs |
| `chunk_embed.py` | Chunk text and create ChromaDB embeddings |
| `seed_db.py` | Seed Supabase with initial data |
| `pipeline_test.py` | Test the content pipeline end-to-end |
| `test_evaluation.py` | Standalone evaluation smoke test |
| `test_ollama.py` | Verify Ollama connectivity |

---

## Deploy (`exam-coach/deploy/`)
| File | Purpose |
|------|---------|
| `deploy.sh` | Production deployment script |
| `nginx.conf` | nginx reverse proxy config |
| `examcoach-backend.service` | systemd service for FastAPI |
| `ollama.service` | systemd service for Ollama |
| `production-checklist.md` | Pre-deploy checklist |

---

## Naming Conventions
- Python files, functions, variables: `snake_case`
- Python classes: `PascalCase`
- React components: `PascalCase`
- React hooks: `camelCase` prefixed with `use`
- Database tables: `snake_case`, plural
- API request/response models: `PascalCase` with suffix `Request` or `Response`
- Dart files, variables: `snake_case`
- Dart classes: `PascalCase`

## Cross-Platform Sync Points

These files must be kept in sync manually — no automated check exists:

| Web | Flutter | What they share |
|-----|---------|-----------------|
| `frontend/web/src/data/syllabus.js` | `frontend/app/lib/config/syllabus_config.dart` | Subject list, unit structure, lesson slugs |

Any addition or rename of a class level, subject, unit, or chapter slug must be applied to **both** files.
The Flutter file notes this explicitly: `// Mirrors frontend/web/src/data/syllabus.js`.

## Hard Rules
- Never hardcode any value — always use `config.py` and `.env`
- Never use sync functions in FastAPI — async throughout
- Never store raw PDF text in the database
- Never skip Pydantic validation on any API input or output
- Never install a package without adding it to `pyproject.toml`
- Never hardcode hex in web components — use PAPER tokens or `brand-*` utilities
- Never hardcode hex in Flutter widgets — use `AppTheme.*` constants
- Never use Redux/Zustand/Context store on web — local `useState` only
- Never touch DB directly from frontend — all DB calls go through the backend API

Always read DESIGN_SYSTEM.md before touching any UI, component, or stylesheet.
