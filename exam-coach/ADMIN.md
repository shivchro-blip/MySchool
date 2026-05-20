# Admin Panel Reference — content validation, questions, evaluations, pipeline
> Read this file for anything related to the admin panel (`frontend/admin/`).

---

## Run locally
```bash
cd exam-coach/frontend/admin
npm install
npm run dev     # http://localhost:5174
```

### Env — create `frontend/admin/.env.local`
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## Admin Pages and Routes

| Route | Page file | Purpose |
|-------|-----------|---------|
| `/login` | `LoginPage.jsx` | Admin authentication |
| `/` | `DashboardPage.jsx` | Overview stats (users, chunks, questions, avg score, cache hit rate, AI breakdown) |
| `/content` | `ContentPage.jsx` | Validate / edit / delete ChromaDB content chunks |
| `/questions` | `QuestionsPage.jsx` | Validate / manage question bank |
| `/evaluations` | `EvaluationsPage.jsx` | Review AI-scored student submissions |
| `/pipeline` | `PipelinePage.jsx` | Trigger embed + DB load for a structured JSON file |

### Components
| File | Purpose |
|------|---------|
| `components/AdminLayout.jsx` | Sidebar layout shell for authenticated admin pages |
| `components/StatCard.jsx` | Stat display card used on DashboardPage |

### API client
`src/api/client.js` — all calls hit `/api/v1/admin/*` with Bearer token from `localStorage` key `admin_token`.

---

## Admin Backend Routes

See BACKEND.md for the full route list under `/api/v1/admin/`.

Key routes used by each page:

| Page | Routes called |
|------|--------------|
| DashboardPage | `GET /admin/stats` |
| ContentPage | `GET /admin/content/pending`, `POST /admin/content/validate/{id}`, `POST /admin/content/invalidate/{id}`, `PUT /admin/content/{id}`, `DELETE /admin/content/{id}` |
| QuestionsPage | `GET /admin/questions`, `POST /admin/questions`, `PUT /admin/questions/{id}`, `DELETE /admin/questions/{id}` |
| EvaluationsPage | `GET /admin/evaluations/pending`, `POST /admin/evaluations/{id}/review` |
| PipelinePage | `POST /admin/pipeline/trigger` |

---

## Auth — How Admin Auth Differs from Student Auth

- Same Supabase auth backend; same JWT bearer token flow
- Distinction is in Supabase user metadata: `raw_user_meta_data->>'role' = 'admin'`
- Backend `core/admin_auth.py` `get_admin_user` dependency reads this metadata and returns 403 if role ≠ admin
- Admin panel stores token in `localStorage` key `admin_token` (students use `exam_coach_token`)
- **No role management in the admin panel** — grant/revoke via Supabase SQL Editor:

```sql
-- Grant admin
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'your-admin@email.com';
```

- Admin token expires with Supabase session (default 1 hour); logout and re-login to refresh
- Dev URL: `http://localhost:5174` | Production: `/admin`

---

## Content Validation Workflow

Content chunks are extracted from PDFs by the pipeline. They start as `is_validated = false`.

1. **Run pipeline** → PipelinePage → inserts chunks into Supabase + ChromaDB with `is_validated = false`
2. **Review chunks** → ContentPage shows all pending chunks
3. **Per chunk actions:**
   - ✓ Validate — set `is_validated = true` → chunk is now used by evaluation
   - ✏️ Edit → fix text → Save → still unvalidated until you click Validate
   - 🗑 Delete — remove wrong/duplicate/misextracted chunks
4. **Students cannot see or be evaluated on unvalidated content**
5. If no validated chunks exist for a chapter, AI evaluates on answer key alone with ⚠️ warning

### Chunk types
`summary` | `theme` | `glossary` | `author_info` | `exam_tip` | `key_points`

### Cache behaviour
AI responses cache for 7 days. Cache key includes `:validated=True/False`.
Validating content after a student received an evaluation does NOT retroactively change their cached result — new evaluations after validation get a fresh AI call.

---

## Question Management

Questions start as `is_validated = false` unless seeded in Phase 1.

| Action | Effect |
|--------|--------|
| ✓ Validate | Makes question visible to students |
| Unvalidate | Hides question from students (kept in DB) |
| Deactivate | Soft delete — sets `is_active = false` |

### Answer key structure by mark level
| Marks | Structure |
|-------|-----------|
| 2 | `{"key_term": "...", "detail": "..."}` |
| 5 | `{"points": ["...", "...", "..."]}` |
| 10 | `{"structure": "intro + body + conclusion", "points": [...]}` |

### TN Board mark level rules
| Marks | Answer type | Expected length |
|-------|-------------|-----------------|
| 1 | Single fact or term | 1 sentence |
| 2 | Term + brief explanation | 2–3 sentences |
| 5 | 3–4 developed points | 1 paragraph |
| 10 | Full structured essay | 200–300 words |

---

## Pipeline Page

Triggers embed + Supabase load for a chapter already extracted to JSON.

**Prerequisites:** JSON file must already exist in `content/structured/`.
If not, run extraction first:
```bash
python scripts/pdf_extract.py \
  --input  content/raw/textbook.pdf \
  --output content/structured/eng1_ch3.json \
  --subject ENG1 --class +1 --chapter 3 \
  --title "Chapter Title" --pages 45-67
```

**Form fields:**
| Field | Source |
|-------|--------|
| Subject UUID | Supabase → Table Editor → subjects table |
| Chapter UUID | Supabase → Table Editor → chapters table |
| JSON File Path | e.g. `content/structured/eng1_ch3.json` |

**What pipeline does:**
1. Embeds chunks into ChromaDB (local vector store)
2. Inserts chunks into Supabase `content_chunks` with `is_validated = false`

**After triggering:** Go to ContentPage and validate chunks before students use this chapter.

---

## Full Workflow: Adding a New Chapter

```
Step 1: Add chapter to database
         Supabase SQL Editor → INSERT into chapters table

Step 2: Extract PDF content
         python scripts/pdf_extract.py --input ... --output ...

Step 3: Trigger pipeline (PipelinePage)

Step 4: Validate content chunks (ContentPage)

Step 5: Validate questions (QuestionsPage)

Step 6: Test as student at http://localhost:5173

Step 7: Monitor evaluations (EvaluationsPage) after students use chapter
```

---

## Rate Limits

Free students: 20 AI calls per day. Resets at midnight via `reset_daily_ai_calls()` Supabase function.
Manual reset: `UPDATE users SET daily_ai_calls = 0 WHERE id = '...'` in Supabase.

---

## Hard Rules

- Never manage admin roles from the admin panel — use Supabase SQL Editor only
- Never touch ChromaDB directly — use pipeline trigger or `core/ai_gate.py`
- Validation must happen before students use a chapter
- `is_validated` can only be set True/False by admin — never by a student-facing route
