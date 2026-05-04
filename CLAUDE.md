# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Layout

```
exam-coach/          ← main project (see exam-coach/CLAUDE.md for full architecture)
graphify-out/        ← graphify analysis output, not source code
phase-navigation-system.md  ← phase spec for the navigation system feature
```

All development work happens inside `exam-coach/`. Read `exam-coach/CLAUDE.md` before touching any code.

## Commands

**Backend (FastAPI, Python 3.11+)**
```bash
cd exam-coach/backend
pip install -e .
uvicorn main:app --reload          # dev server at http://localhost:8000
pytest tests/ -v                   # all tests
pytest tests/test_evaluation.py -v # single test file
```

**Frontend Web (React + Vite)**
```bash
cd exam-coach/frontend/web
npm install
npm run dev     # http://localhost:5173
npm run build
```

**Admin Panel**
```bash
cd exam-coach/frontend/admin
npm install
npm run dev
```

**Mobile (Flutter)**
```bash
cd exam-coach/frontend/app
flutter run
```

## Architecture in One Paragraph

FastAPI backend with four strict layers: routes (`api/v1/`) → modules (`modules/`) → repositories (`db/repositories/`) → Supabase. All LLM calls flow through `core/ai_gate.py` only (Ollama first, OpenRouter fallback). ChromaDB stores vectors locally at `content/embeddings/`. `core/tn_board.py` is the single source of truth for all Tamil Nadu board constraints (class levels, mark levels, content types) — imported by models, prompts, and the rubric engine.

## Key Invariants

- `get_db()` called only inside `db/repositories/*.py`
- LLM calls only through `core/ai_gate.py`, never from routes or modules directly
- Evaluation uses ChromaDB chunks only when `is_validated=True` in Supabase
- All config via `config.py` + `.env` — no hardcoded values
- FastAPI handlers must be `async`

## Env Setup

Copy `exam-coach/backend/.env.example` → `exam-coach/backend/.env` and fill:
- `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_KEY`
- `OLLAMA_BASE_URL` (default: `http://localhost:11434`)
- `OPENROUTER_API_KEY` (paid fallback, optional for dev)

Frontend: create `exam-coach/frontend/web/.env.local` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
