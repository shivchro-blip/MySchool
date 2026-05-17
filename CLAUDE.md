# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

`TNSchool` is the outer git repo. The entire application lives in the `exam-coach/` git submodule, which has its own detailed `CLAUDE.md`. **Always read `exam-coach/CLAUDE.md` before working on any code.**

```
TNSchool/                   ← outer repo (you are here)
├── exam-coach/             ← git submodule — all application code
│   ├── backend/            ← FastAPI (Python 3.11+)
│   ├── frontend/
│   │   ├── web/            ← React + Vite (http://localhost:5173)
│   │   ├── app/            ← Flutter mobile
│   │   └── admin/          ← React + Vite admin (http://localhost:5174)
│   ├── content/            ← PDFs, structured JSON, ChromaDB embeddings
│   ├── scripts/            ← offline/one-time scripts
│   ├── deploy/             ← nginx, systemd, deploy.sh
│   ├── CLAUDE.md           ← primary architecture reference
│   ├── BACKEND.md
│   ├── FRONTEND.md
│   ├── ADMIN.md
│   └── DESIGN_SYSTEM.md
└── Dummy_files/            ← HTML source files for chapter content authoring
    └── WORKFLOW.md         ← how to convert HTML → web content
```

## Submodule Setup

```bash
git submodule update --init --recursive   # after first clone
git submodule update --remote             # pull latest submodule commit
```

When committing submodule pointer changes, commit in `exam-coach/` first, then commit the updated pointer in `TNSchool/`.

## Key Commands

All commands run from inside `exam-coach/` unless noted.

### Backend
```bash
cd exam-coach/backend
pip install -e .
cp .env.example .env          # fill in Supabase + Ollama values
uvicorn main:app --reload     # http://localhost:8000
```

### Tests
```bash
cd exam-coach/backend
pytest tests/test_health.py tests/test_learning.py tests/test_evaluation.py tests/test_content_pipeline.py -v
pytest tests/test_health.py::test_name -v   # single test
```

### Web frontend
```bash
cd exam-coach/frontend/web
npm install
npm run dev     # http://localhost:5173
npm run build
```

### Admin panel
```bash
cd exam-coach/frontend/admin
npm install
npm run dev     # http://localhost:5174
```

### Flutter mobile
```bash
cd exam-coach/frontend/app
flutter run
```

### E2E tests (Playwright)
```bash
cd exam-coach/frontend/web
npx playwright test --project=chromium
```

## Content Authoring Workflow (Dummy_files)

`Dummy_files/` holds teacher-style HTML files used to author chapter learn pages.

```bash
cd exam-coach/frontend/web
npm run content -- ../../Dummy_files/<lesson-name>.html <chapter-slug>
npm run build   # verify
```

The script writes to `src/content/chapters/<slug>.js` and updates `src/content/registry.js`. See `Dummy_files/WORKFLOW.md` for the full HTML class contract and the complete slug table.

## Pre-Launch Checklist

Before going public (from `Dummy_files/Pending_Tasks.txt`):
1. Run `backend/db/migrations/005_consent_fields.sql` in Supabase SQL Editor
2. Replace placeholder email in `legal_constants.js` / `legal_constants.dart`
3. Copy final legal content into `frontend/web/src/legal/` and `frontend/app/assets/content/legal/`
4. Set `LEGAL_LAST_UPDATED` to the finalized date
