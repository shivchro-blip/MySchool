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

## Legal & compliance — pre-launch checklist

Before going public, confirm:

- [ ] Privacy Policy page live at `/privacy`
- [ ] Terms of Service page live at `/terms`
- [ ] Contact page live at `/contact`
- [ ] Footer links visible on every page (web + mobile Settings)
- [ ] Cookie banner appears on first web visit
- [ ] Analytics consent modal appears on first mobile launch
- [ ] Sign-up form requires age confirmation + agreement checkbox (web + mobile)
- [ ] `CONTACT_EMAIL` constant points to a real, monitored inbox
- [ ] `LEGAL_LAST_UPDATED` constant set to current date
- [ ] HTTPS enabled on the deployed web URL
- [ ] Passwords stored hashed (bcrypt or argon2), never plain text
- [ ] `/docs/legal/admin/deletion-request-log.md` kept up to date
- [ ] `/docs/legal/admin/data-map.md` reflects all third-party services in use
