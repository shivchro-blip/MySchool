# Backend Reference — FastAPI, routes, AI, DB repositories
> Read this file for any backend route, service, AI, database, or validation question.

---

## Run locally
```bash
cd exam-coach/backend
pip install -e .
uvicorn main:app --reload          # dev server at http://localhost:8000
```

## Tests
```bash
pytest tests/ -v
pytest tests/test_evaluation.py -v  # single file
```

| Test file | Covers |
|-----------|--------|
| `test_api_integration.py` | end-to-end route tests |
| `test_evaluation.py` | scoring + feedback logic |
| `test_tn_board.py` | TN Board constraint validation |
| `test_health.py` | health check endpoint |
| `test_validation_guard.py` | ChromaDB is_validated flow |
| `test_content_pipeline.py` | PDF extraction + embedding |
| `test_learning.py` | explain topic logic |
| `test_syllabus.py` | syllabus DB queries |

---

## All Routes

### Health
| Method | Path | Auth | Notes |
|--------|------|------|-------|
| GET | `/health` | none | checks Ollama + Supabase + ChromaDB |
| GET | `/api/docs` | none | dev only — disabled in production |

### Syllabus (`/api/v1/syllabus`)
| Method | Path | Auth |
|--------|------|------|
| GET | `/api/v1/syllabus/subjects` | none |
| GET | `/api/v1/syllabus/subjects/{subject_slug}/chapters` | none |
| GET | `/api/v1/syllabus/chapters/{chapter_slug}/topics` | none |
| GET | `/api/v1/syllabus/chapters/{chapter_slug}/questions` | none |

### Learning (`/api/v1/learning`)
| Method | Path | Auth |
|--------|------|------|
| POST | `/api/v1/learning/explain` | required |
| GET | `/api/v1/learning/content/{chapter_slug}` | optional |

### Evaluation (`/api/v1/evaluation`)
| Method | Path | Auth |
|--------|------|------|
| POST | `/api/v1/evaluation/submit` | required |
| POST | `/api/v1/evaluation/retry` | required |
| GET | `/api/v1/evaluation/progress` | required |
| GET | `/api/v1/evaluation/history` | required |

### Users (`/api/v1/users`)
| Method | Path | Auth |
|--------|------|------|
| GET | `/api/v1/users/me` | required |
| PUT | `/api/v1/users/me` | required |
| GET | `/api/v1/users/me/usage` | required |

### Admin (`/api/v1/admin`) — all require admin role
| Method | Path | Notes |
|--------|------|-------|
| GET | `/api/v1/admin/content/pending` | unvalidated chunks |
| POST | `/api/v1/admin/content/validate/{chunk_id}` | set is_validated=True |
| POST | `/api/v1/admin/content/invalidate/{chunk_id}` | set is_validated=False |
| PUT | `/api/v1/admin/content/{chunk_id}` | edit chunk text |
| DELETE | `/api/v1/admin/content/{chunk_id}` | delete chunk |
| GET | `/api/v1/admin/evaluations/pending` | unreviewed AI evaluations |
| POST | `/api/v1/admin/evaluations/{response_id}/review` | submit human review |
| GET | `/api/v1/admin/questions` | all questions |
| POST | `/api/v1/admin/questions` | create question |
| PUT | `/api/v1/admin/questions/{question_id}` | update question |
| DELETE | `/api/v1/admin/questions/{question_id}` | delete question |
| POST | `/api/v1/admin/questions/import-html` | parse practice HTML → questions |
| GET | `/api/v1/admin/stats` | system stats (users, chunks, cache hit rate, AI breakdown) |
| POST | `/api/v1/admin/pipeline/trigger` | embed + load a structured JSON file |

---

## Folder Roles (Never Mix These)

| Path | Purpose | Files |
|------|---------|-------|
| `backend/main.py` | FastAPI app entry point | — |
| `backend/config.py` | Settings (pydantic-settings) | `settings` object |
| `backend/api/v1/router.py` | Includes all sub-routers | — |
| `backend/api/v1/deps.py` | Shared auth dependencies | `get_current_user`, `get_optional_user`, `get_admin_user` |
| `backend/api/v1/syllabus.py` | Syllabus routes | — |
| `backend/api/v1/learning.py` | Learning routes | — |
| `backend/api/v1/evaluation.py` | Evaluation routes | — |
| `backend/api/v1/users.py` | User routes | — |
| `backend/api/v1/admin.py` | Admin routes | — |
| `backend/core/ai_gate.py` | **Single entry point for ALL AI calls** | `AIGate` class |
| `backend/core/admin_auth.py` | Admin auth dependency | `get_admin_user` |
| `backend/core/auth.py` | Student auth dependency | `get_current_user`, `get_optional_user`, `_resolve_user` |
| `backend/core/errors.py` | Custom exception classes | — |
| `backend/core/llm_response.py` | LLM response parsing helpers | — |
| `backend/core/tn_board.py` | **TN Board constraints — single source of truth** | — |
| `backend/ai/router.py` | Pure LLM dispatch (Ollama → OpenRouter) — called **only** by AIGate | — |
| `backend/ai/ollama_client.py` | Ollama HTTP client | — |
| `backend/ai/openrouter_client.py` | OpenRouter HTTP client | — |
| `backend/db/client.py` | Supabase client — used **only** by repositories | — |
| `backend/db/repositories/syllabus_repo.py` | All syllabus DB queries | — |
| `backend/db/repositories/questions_repo.py` | All question DB queries | — |
| `backend/db/repositories/responses_repo.py` | All response DB queries | — |
| `backend/db/repositories/cache_repo.py` | All cache DB queries | — |
| `backend/db/repositories/users_repo.py` | All user DB queries | — |
| `backend/models/common.py` | Shared Pydantic models | — |
| `backend/models/evaluation.py` | Evaluation request/response models | — |
| `backend/models/learning.py` | Learning request/response models | — |
| `backend/models/syllabus.py` | Syllabus response models | — |
| `backend/models/user.py` | User profile models | — |
| `backend/modules/learning/service.py` | Explain topic logic | — |
| `backend/modules/learning/prompts.py` | Learning prompt templates | — |
| `backend/modules/evaluation/service.py` | Score + feedback logic | — |
| `backend/modules/evaluation/rubric.py` | TN Board rubric definitions | — |
| `backend/modules/evaluation/prompts.py` | Evaluation prompt templates | — |
| `backend/modules/content_pipeline/extractor.py` | PDF text extraction | — |
| `backend/modules/content_pipeline/structurer.py` | Structure raw text into chunks | — |
| `backend/modules/content_pipeline/embedder.py` | Create ChromaDB embeddings | — |
| `backend/modules/content_pipeline/db_loader.py` | Load chunks into Supabase | — |

---

## Architecture Rules

- `get_db()` called **only** inside `db/repositories/*.py` — nowhere else
- `get_public_db()` for RLS queries (anon key); `get_db()` for service-key operations
- AIGate is the **only** class that checks rate limits, reads cache, and logs usage
- `ai/router.py` is called **only** by AIGate — never from modules or routes
- Modules instantiate repositories and AIGate — they never touch `get_db()` directly
- Never use sync functions in FastAPI — async throughout
- Never skip Pydantic validation on any API input or output

---

## AIGate Interface

```python
gate = AIGate()
response, model_used, was_cached = await gate.call(
    messages=[{"role": "user", "content": "..."}],
    prompt_type="explain",       # used for logging / cache namespace
    cache_key_content="...",     # deterministic string for cache lookup
    user_id="uuid-or-None",
    temperature=0.3,
    max_tokens=1024,
)
# Raises: RateLimitError | AIUnavailableError
```

---

## Validation Contract

- ChromaDB chunks used for evaluation only if `is_validated=True` in Supabase
- `is_validated` set True **only** by admin in admin panel
- If no validated chunks exist for a chapter, evaluation uses answer key only
- Feedback contains ⚠️ warning when unvalidated content is used
- Cache keys include `:validated=True/False` so results are cached separately
- See ADMIN.md for the full validation workflow

---

## TN Board Context (`core/tn_board.py`)

Single source of truth for all Tamil Nadu State Board constraints.
Connected to: `models/syllabus.py`, `modules/evaluation/rubric.py`,
`modules/learning/prompts.py`, `modules/evaluation/prompts.py`.

When adding a new class level, mark level, or content type:
1. Update `core/tn_board.py`
2. Add Supabase CHECK constraints in a new migration SQL file
3. Models and prompts update automatically via imports

---

## Env vars — copy `backend/.env.example` → `backend/.env`

| Variable | Description |
|----------|-------------|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anon/public key (RLS enforced) |
| `SUPABASE_SERVICE_KEY` | Supabase service role key (bypasses RLS) |
| `OLLAMA_BASE_URL` | Ollama server URL (default: `http://localhost:11434`) |
| `OLLAMA_MODEL` | Model to use (default: `mistral:7b-instruct`) |
| `OPENROUTER_API_KEY` | OpenRouter API key (paid users fallback) |
| `OPENROUTER_MODEL` | Model for fallback (default: `anthropic/claude-3-haiku`) |
| `APP_ENV` | `development` or `production` |
| `SECRET_KEY` | App secret key |
| `ALLOWED_ORIGINS` | CORS allowed origins (default: `http://localhost:5173`) |
| `REDIS_URL` | Redis URL (optional — falls back to Supabase cache table) |
| `CACHE_TTL_SECONDS` | Cache TTL in seconds (default: `604800` = 7 days) |

---

## Hard Rules

- Never hardcode any value — always use `config.py` and `.env`
- Never use sync functions in FastAPI — async throughout
- Never store raw PDF text in the database
- Never skip Pydantic validation on any API input or output
- Never install a package without adding it to `pyproject.toml`
- `get_db()` only inside `db/repositories/*.py`
- `ai/router.py` only called by `AIGate`
