# AI Exam Coach — Project Brain

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
│   └── admin/            ← React + Vite admin panel
├── content/
│   ├── raw/              ← Drop PDFs here (gitignored)
│   ├── structured/       ← JSON output from content pipeline
│   └── embeddings/       ← ChromaDB vector store (gitignored)
├── source/
│   └── textbooks/        ← Source PDF textbooks (e.g. Class_12_English.pdf)
├── scripts/              ← One-time or offline scripts only
├── deploy/               ← nginx config, systemd services, deploy.sh
├── Dummy_files/          ← HTML source files for chapter content authoring
└── graphify-out/         ← Graphify analysis output, not source code
```

---

## Backend (FastAPI)

### Run locally
```bash
cd exam-coach/backend
pip install -e .
uvicorn main:app --reload          # dev server at http://localhost:8000
```

### Tests
```bash
pytest tests/ -v
pytest tests/test_evaluation.py -v  # single file
```
Test files: `test_api_integration`, `test_evaluation`, `test_tn_board`, `test_health`,
`test_validation_guard`, `test_content_pipeline`, `test_learning`, `test_syllabus`

### Routes
```
POST /api/v1/learning/explain
POST /api/v1/evaluation/submit
GET  /api/v1/syllabus/chapters
     /api/v1/users/…
     /api/v1/admin/…
GET  /health       ← no auth; checks Ollama + Supabase + ChromaDB
GET  /api/docs     ← dev only, disabled in production
```

### Env — copy `backend/.env.example` → `backend/.env`
```
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=mistral:7b-instruct
OPENROUTER_API_KEY=
OPENROUTER_MODEL=anthropic/claude-3-haiku
APP_ENV=development
SECRET_KEY=
ALLOWED_ORIGINS=http://localhost:5173
REDIS_URL=
CACHE_TTL_SECONDS=604800
```

### Folder Roles (Never Mix These)
| Path | Purpose |
|------|---------|
| `db/client.py` | Supabase client — used ONLY by repositories |
| `db/repositories/syllabus_repo.py` | all syllabus DB queries |
| `db/repositories/questions_repo.py` | all question DB queries |
| `db/repositories/responses_repo.py` | all response DB queries |
| `db/repositories/cache_repo.py` | all cache DB queries |
| `db/repositories/users_repo.py` | all user DB queries |
| `core/ai_gate.py` | single entry point for ALL AI calls |
| `ai/router.py` | pure LLM dispatch (Ollama → OpenRouter) — called ONLY by AIGate |
| `modules/learning/` | explain topic logic only |
| `modules/evaluation/` | score + feedback logic only |
| `modules/content_pipeline/` | PDF extraction + embedding only |

### Architecture Rules
- `get_db()` called only inside `db/repositories/*.py` — nowhere else
- `get_public_db()` for RLS queries (anon key); `get_db()` for service-key operations
- AIGate is the ONLY class that checks rate limits, reads cache, and logs usage
- `ai/router.py` is called ONLY by AIGate — never from modules or routes
- Modules instantiate repositories and AIGate — they never touch `get_db()`

### AIGate Interface
```python
gate = AIGate()
response, model_used, was_cached = await gate.call(
    messages=[{"role": "user", "content": "..."}],
    prompt_type="explain",       # used for logging/cache namespace
    cache_key_content="...",     # deterministic string for cache lookup
    user_id="uuid-or-None",
    temperature=0.3,
    max_tokens=1024,
)
# Raises: RateLimitError | AIUnavailableError
```

### Validation Contract
- ChromaDB chunks used for evaluation only if `is_validated=True` in Supabase
- `is_validated` set True ONLY by admin in admin panel
- If no validated chunks exist for a chapter, evaluation uses answer key only
- Feedback contains ⚠️ warning when unvalidated content is used
- Cache keys include `:validated=True/False` so results are cached separately

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

### Run locally
```bash
cd exam-coach/frontend/web
npm install
npm run dev     # http://localhost:5173
npm run build
```

### Utility scripts
```bash
npm run content          # html-to-content.js: Dummy_files HTML → JS content modules
npm run export-practice  # export-practice-json.mjs: practice JS → JSON (for Flutter)
```

### Env — create `frontend/web/.env.local`
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

### Folder structure
```
frontend/web/src/
├── api/             ← fetch wrapper (client.js), auth helpers
├── assets/          ← static assets
├── components/
│   ├── layout/      ← DashboardShell, DashboardSidebar
│   ├── nav/         ← nav components
│   └── ui/          ← Badge, BrandLogo, Button, Card, Input, Navbar
├── content/
│   ├── registry.js            ← chapterSlug → chapter content object
│   ├── practiceRegistry.js    ← chapterSlug → practice question set
│   ├── Class_11/English/
│   │   ├── chapters/          ← 18 chapter JS modules
│   │   └── practice/          ← 18 practice JS modules
│   └── Class_12/English/
│       ├── chapters/          ← 17 chapter JS modules
│       └── practice/          ← 17 practice JS modules
├── data/
│   └── syllabus.js            ← subject/class definitions (mirrored in Flutter SyllabusConfig)
├── hooks/           ← custom React hooks
├── lib/             ← utilities
├── pages/
│   ├── DashboardPage.jsx
│   ├── CoursesIndexPage.jsx
│   ├── ProgressPage.jsx
│   ├── ActivityPage.jsx
│   ├── CertificatePage.jsx
│   ├── ChapterPracticeExamPage.jsx
│   ├── LearnRichPage.jsx      ← embedded component (used by SectionPage/TextSection)
│   ├── PracticeRichPage.jsx   ← embedded component (used by PracticeSection)
│   └── syllabus/
│       ├── YearPage.jsx
│       ├── SubjectPage.jsx
│       ├── LessonListPage.jsx
│       ├── LessonDetailPage.jsx
│       ├── SectionPage.jsx
│       └── sections/          ← AboutAuthorSection, AskAISection, AttemptHistorySection,
│                                 ComprehensionSection, GlossarySection, PracticeSection, TextSection
└── utils/
```

### Routes (from `App.jsx`)
```
/login
/                               ← DashboardPage
/courses                        ← CoursesIndexPage
/progress                       ← ProgressPage
/activity                       ← ActivityPage
/certificate                    ← CertificatePage
/practice-exam                  ← ChapterPracticeExamPage
/:year                          ← YearPage
/:year/:subject                 ← SubjectPage
/:year/:subject/:category       ← LessonListPage
/:year/:subject/:category/:lesson            ← LessonDetailPage
/:year/:subject/:category/:lesson/:section   ← SectionPage (renders LearnRichPage or PracticeRichPage)
```

### State and HTTP
- Router: React Router v6 (BrowserRouter + Routes)
- State: local `useState` only — no Redux/Zustand/Context store
- HTTP: native fetch wrapper at `src/api/client.js`; auth token in `localStorage` key `exam_coach_token`

### Content registry pattern
- Components import ONLY `registry.js` or `practiceRegistry.js`, never individual chapter files
- Adding new class/subject: create `content/Class_12/Math/`, add imports to registry files only

---

## Mobile App (Flutter)

### Run locally
```bash
cd exam-coach/frontend/app
flutter run                       # default connected device
flutter run -d android            # Android emulator
flutter run -d ios                # iOS simulator
```

### Build
```bash
flutter build apk                 # Android release APK
flutter build appbundle           # Android App Bundle (Play Store)
flutter build ios --release       # iOS release (requires Xcode on Mac)
```

### Key dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| `go_router` | ^13.2.0 | navigation |
| `provider` | ^6.1.2 | state management |
| `google_fonts` | ^6.2.1 | Inter font |
| `flutter_secure_storage` | ^9.0.0 | token storage |
| `http` | ^1.2.0 | API calls |

### Config (no .env file — use --dart-define)
```bash
flutter run --dart-define=API_BASE_URL=http://10.0.2.2:8000/api/v1   # Android emulator
flutter run --dart-define=API_BASE_URL=http://192.168.x.x:8000/api/v1 # physical device
```
Default is `http://localhost:8000/api/v1`. See `lib/config/app_config.dart`.

### Folder structure
```
frontend/app/
├── lib/
│   ├── config/
│   │   ├── app_config.dart       ← AppConfig constants (API_BASE_URL, freeAiCallsPerDay, etc.)
│   │   ├── theme.dart            ← AppTheme (light + dark ThemeData, all color constants)
│   │   ├── syllabus_config.dart  ← SyllabusConfig (unit/lesson list — mirrors web's syllabus.js)
│   │   └── config.dart           ← barrel export for config/
│   ├── models/                   ← data models
│   ├── providers/                ← Provider state classes
│   ├── screens/                  ← one file per screen
│   ├── services/                 ← API + content services
│   ├── widgets/                  ← shared widgets
│   └── router.dart               ← GoRouter definition (all routes)
└── assets/content/
    ├── Class_11/English/
    │   ├── chapters/             ← 18 JSON chapter files
    │   └── practice/             ← 18 JSON practice files
    └── Class_12/English/
        ├── chapters/             ← JSON chapter files
        └── practice/             ← JSON practice files
```

### Screens
| Screen | File |
|--------|------|
| Login | `login_screen.dart` |
| Dashboard | `dashboard_screen.dart` |
| Courses list | `courses_screen.dart` |
| Subject list | `subject_list_screen.dart` |
| Chapter list | `chapter_list_screen.dart` |
| Chapter detail | `chapter_detail_screen.dart` |
| Learn (simple) | `learn_screen.dart` |
| Learn (rich tabs) | `rich_learn_screen.dart` |
| Practice / Exam | `exam_practice_screen.dart` |
| Progress | `progress_screen.dart` |

### Routes (from `router.dart`)
```
/login                                         ← outside ShellRoute, no bottom nav
/dashboard
/courses
/courses/:classLevel
/courses/:classLevel/:subjectSlug
/courses/:classLevel/:subjectSlug/:chapterSlug
/progress
/learn/:classLevel/:subjectSlug/:chapterSlug
/rich-learn/:classLevel/:subjectSlug/:chapterSlug
/practice/:classLevel/:subjectSlug/:chapterSlug
/exam/:classLevel/:subjectSlug/:chapterSlug
```
All routes except `/login` are inside `ShellRoute` → `ShellScaffold` → bottom nav (Home / Courses / Progress).

### Navigation rules
- `context.push()` for drill-down (preserves back stack)
- `context.go()` for tab switches (replaces stack)
- Back button: `context.canPop() ? context.pop() : context.go('/dashboard')`

### RichLearnScreen tab structure
Fixed action row (Practice / Attempt History / Ask AI) always visible — never scrolls off screen.
`_computeAllTabs()` unconditionally appends action tabs for every chapter.

---

## Admin Panel

### Run locally
```bash
cd exam-coach/frontend/admin
npm install
npm run dev
```

### Pages
| Page | Purpose |
|------|---------|
| LoginPage | Admin authentication |
| DashboardPage | Overview stats |
| ContentPage | Manage chapters, validate content |
| EvaluationsPage | Review student evaluations |
| PipelinePage | Run PDF ingestion pipeline |
| QuestionsPage | Manage question bank |

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

Always read DESIGN_SYSTEM.md before touching any UI, component, or stylesheet.
