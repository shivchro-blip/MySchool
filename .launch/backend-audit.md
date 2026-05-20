# Backend Security Audit
**Date:** 2026-05-19  
**Stack:** FastAPI + uvicorn, Supabase PostgreSQL (via SDK), Ollama mistral:7b-instruct, no Sentry  
**Scope:** `exam-coach/backend/` — read-only, no changes made

---

## 1. ENVIRONMENT CONFIG

### 1.1 ENV vars & config files
**PASS** — `config.py:1–25` uses `pydantic_settings.BaseSettings` with `env_file=".env"`. All secrets read from env, not hardcoded. `.env.example` documents all required vars.

### 1.2 APP_ENV / debug mode check
**PASS** — `main.py:14` gates `/api/docs` behind `settings.app_env == "development"`. `main.py:19` gates CORS wildcard the same way.

**WARN** — The current `.env` has `APP_ENV=development`. This is the local dev file and should not be deployed as-is. There is no guard that raises an error if `APP_ENV` is not explicitly set to `"production"` in production. A misconfigured deploy (forgot to set env var) silently defaults to `"development"` (`config.py:17` default = `"development"`), opening `/api/docs` and CORS `*`. Recommended: change the default to `"production"`.

### 1.3 SECRET_KEY
**WARN** — `config.py:18` declares `secret_key: str = ""` but it is **never read anywhere** in the codebase. Auth is fully delegated to Supabase (`db.auth.get_user()`), so there is no JWT signing here. The field is vestigial. Either remove it or document why it exists — a reviewer might assume auth falls back to a local JWT signer and be misled.

### 1.4 CORS
**PASS** (production path) — `main.py:18–27` uses `["*"]` only in `development`; in production, splits `settings.allowed_origins` on commas.

**NOTE** — Current `.env` `ALLOWED_ORIGINS` contains 7 localhost origins. Fine for local dev; the production `.env` must be set to the actual domain(s) only.

### 1.5 Supabase credentials in `.env`
**FAIL** — `.env` contains live Supabase credentials including `SUPABASE_SERVICE_ROLE_KEY` (a full-privilege JWT). The submodule's `.gitignore` (`exam-coach/.gitignore`) does **not** list `.env`. If `.env` is ever staged and committed to `exam-coach`, these credentials go into git history permanently.

**Action required before any git push:** Confirm `backend/.env` is untracked (`git ls-files backend/.env` returns nothing — currently verified OK), then add `backend/.env` to `exam-coach/.gitignore`.

---

## 2. API SECURITY

### 2.1 Swagger / ReDoc in production
**PASS** — `main.py:14–16`: `docs_url="/api/docs" if settings.app_env == "development" else None`. ReDoc is `None` unconditionally (`redoc_url=None`).

**Coupled to WARN 1.2** — If `APP_ENV` is not set, default is `"development"` and docs open.

### 2.2 Rate limiting on auth endpoints
**N/A** — This backend has no `/auth/signup`, `/auth/login`, or OTP endpoints. Auth is handled entirely by Supabase directly (client calls Supabase Auth, then sends JWT to this API). No auth endpoints to rate-limit here.

**INFO** — AI call rate limiting exists at the application layer via `AIGate.call()` → `UsersRepository.is_over_limit()` (20 calls/day free tier). This is a business-logic limit, not an HTTP-level rate limit. There is no HTTP-level throttle (no `slowapi`, no nginx `limit_req`). A motivated attacker could flood non-AI endpoints (e.g. `/api/v1/syllabus/subjects`) with no back-pressure. Low risk given public read-only nature of syllabus endpoints, but worth noting for launch.

### 2.3 Unauthenticated endpoints that handle user data
**PASS** — All user-data endpoints (`/users/me`, `/users/me/usage`, `/evaluation/*`, `/learning/explain`) require `Depends(get_current_user)`.

**WARN (by design — verify intent)** — These endpoints are public (no auth dependency):

| Endpoint | File | Concern |
|---|---|---|
| `GET /api/v1/syllabus/subjects` | `syllabus.py:8` | Public — OK, read-only catalog |
| `GET /api/v1/syllabus/subjects/{slug}/chapters` | `syllabus.py:13` | Public — OK |
| `GET /api/v1/syllabus/chapters/{slug}/topics` | `syllabus.py:25` | Public — OK |
| `GET /api/v1/syllabus/chapters/{slug}/questions` | `syllabus.py:34` | **WARN** — returns all questions including `answer_key` and `rubric` fields with no auth. Likely intentional for the practice UI, but means the model answers are publicly readable by anyone who calls the API directly. Confirm this is intentional. |
| `GET /api/v1/learning/content/{chapter_slug}` | `learning.py:25` | **WARN** — returns validated content chunks with no auth. If content is behind a paywall in future, this endpoint needs auth. |
| `GET /health` | `main.py:34` | Public — correct, needed for uptime checks. |

### 2.4 Admin role check
**PASS** — `core/admin_auth.py:26–29`: checks `user_metadata.role == "admin"` from Supabase JWT. Returns 403 if not admin.

**WARN** — Admin role is stored in `user_metadata` (writable by the user themselves in some Supabase configurations). Confirm in Supabase dashboard that `user_metadata` is not user-writable (use `app_metadata` instead, which requires service-role key to modify). If users can write their own `user_metadata`, they can self-escalate to admin.

### 2.5 Path traversal in admin pipeline trigger
**WARN** — `admin.py:500–501`:
```python
json_path = Path(body.json_path)
if not json_path.exists():
    raise HTTPException(...)
chunks = load_structured_json(str(json_path))
```
`body.json_path` is a free-form string from admin user input. An admin could pass `../../../../etc/passwd` or any absolute path. The only guard is `is_admin`. Since admin is trusted, blast radius is limited — but the intent is "path inside `content/structured/`". Recommend validating the path is within the expected directory before opening it.

---

## 3. OLLAMA

### 3.1 Base URL config
**PASS** — `config.py:11`: `ollama_base_url: str = "http://localhost:11434"`. Read from env via `pydantic_settings`. `ai/ollama_client.py:7`: uses `settings.ollama_base_url`.

### 3.2 Hardcoded vs env
**PASS** — URL is env-configurable. Default is localhost, which is correct for local Ollama.

### 3.3 Timeout
**PASS** — `ai/ollama_client.py:11`: `DEFAULT_TIMEOUT = 120.0` (2 minutes). Applied at `httpx.AsyncClient(timeout=DEFAULT_TIMEOUT)` in `chat()`. Health check uses a shorter `timeout=3.0`.

### 3.4 Ollama down / graceful degradation
**PASS** — `ai/router.py:27–37`: Ollama failure is caught and falls back to OpenRouter. Both failing raises `RuntimeError` which propagates to `AIGate`, which raises `AIUnavailableError`, which routes return as HTTP 503. No crash.

**INFO** — If Ollama is down and `OPENROUTER_API_KEY` is not set, OpenRouter immediately raises `RuntimeError("OPENROUTER_API_KEY not set")` (`openrouter_client.py:19`), which still results in 503. Acceptable.

---

## 4. SENTRY

### 4.1 sentry_sdk.init() present?
**FAIL** — No `sentry_sdk` import or `sentry_sdk.init()` call found anywhere in the codebase.

### 4.2 SENTRY_DSN in .env.example?
**FAIL** — `.env.example` has no `SENTRY_DSN` entry.

### 4.3 Where to add it
Add to `main.py` before `app = FastAPI(...)`, gated on `app_env == "production"`:
```python
# main.py (after imports, before app = FastAPI(...))
if settings.sentry_dsn and settings.app_env == "production":
    import sentry_sdk
    sentry_sdk.init(dsn=settings.sentry_dsn, traces_sample_rate=0.1)
```
Add `sentry_dsn: str = ""` to `config.py` Settings and `SENTRY_DSN=` to `.env.example`.

---

## 5. HEALTH ENDPOINTS

### 5.1 Health endpoint exists?
**PASS** — `GET /health` at `main.py:34–69`.

### 5.2 What does it check?
**PASS** — Checks all three dependencies:
- Ollama: `GET /api/tags` with 3s timeout
- Supabase: `subjects.select("id").limit(1)`
- ChromaDB: `get_collection_stats()`

Each wrapped in `try/except`, reports `"unavailable"` on failure without crashing.

### 5.3 Auth requirement?
**PASS** — `/health` has no auth dependency. Correct for uptime monitors.

**INFO** — `HealthResponse` includes `env=settings.app_env`. In production this would expose `"production"` to any caller. Low risk, but could be removed from the public response if desired.

---

## 6. LOGGING

### 6.1 Structured logging (JSON format)
**FAIL** — No Python `logging` module configured anywhere. No `structlog` or JSON formatter. No logging middleware.

### 6.2 print() / console.print() calls
**WARN** — All observability output uses `rich.Console.print()` rather than `logging`. These go to stdout with ANSI color codes, which is fine locally but:
- Not parseable by log aggregators (Datadog, CloudWatch, Loki) in production
- No log levels — debug verbosity is always on
- No way to suppress console noise without changing code

Files affected:
- `ai/router.py:20,28,31` — 3 calls — LLM routing decisions
- `core/ai_gate.py:40` — cache hit messages
- `modules/evaluation/service.py:69,93,103,114,120,128,175,247,368` — 9 calls — evaluation flow
- `modules/learning/service.py:44,65,121` — 3 calls — explain flow
- `modules/content_pipeline/` — 8 calls — pipeline scripts only (acceptable)

### 6.3 Request logging middleware
**FAIL** — No request/response logging middleware in `main.py`. No way to trace which user called which endpoint or measure per-route latency in production.

---

## 7. DATABASE

### 7.1 Connection method
**PASS** — Supabase Python SDK (`supabase.create_client`). Not a raw `psycopg2` connection. Uses service-role key for writes, which bypasses RLS (by design for backend).

### 7.2 Connection string from env
**PASS** — `db/client.py:10–16`: checks `settings.supabase_url` and `settings.supabase_service_key` from env; raises `RuntimeError` if empty.

### 7.3 SQL injection via f-strings
**PASS** — No raw SQL queries found anywhere. All DB access goes through the Supabase Python SDK's query builder (`.table().select().eq()...`), which parameterizes automatically. Zero f-string SQL patterns found.

### 7.4 Connection singleton
**INFO** — `db/client.py:4–18`: module-level singleton (`_client`). Single Supabase client is reused across requests. Supabase SDK handles the underlying HTTP connection pool. Acceptable for this stack.

### 7.5 Mass assignment risk on profile update
**PASS** — `api/v1/users.py:22`: uses `body.model_dump(exclude_none=True)` where `body` is `UpdateProfileRequest` — a Pydantic model with only 3 explicit fields (`full_name`, `class_level`, `school`). Cannot be used to update `plan`, `daily_ai_calls`, or `id`.

---

## Summary Table

| # | Area | Finding | Severity |
|---|---|---|---|
| 1.2 | Default APP_ENV | Default is `"development"` — misconfig opens /docs + CORS `*` | WARN |
| 1.3 | SECRET_KEY unused | Declared but never read — remove or document | WARN |
| 1.5 | `.env` not in `.gitignore` | Live credentials at risk if accidentally committed | **FAIL** |
| 2.2 | No HTTP rate limiting | Public endpoints have no throttle | INFO |
| 2.3 | Questions endpoint public | Returns `answer_key` + `rubric` without auth | WARN |
| 2.3 | Content endpoint public | Returns full content chunks without auth | WARN |
| 2.4 | Admin role in user_metadata | May be user-writable in Supabase — verify | WARN |
| 2.5 | Path traversal in pipeline | Admin can pass arbitrary FS path to `json_path` | WARN |
| 4.1 | No Sentry | No error tracking in production | **FAIL** |
| 4.2 | SENTRY_DSN missing | Not in `.env.example` | **FAIL** |
| 5.4 | Health leaks env name | `/health` exposes `app_env` value | INFO |
| 6.1 | No structured logging | No JSON logs, no log levels | **FAIL** |
| 6.2 | console.print throughout | Not parseable by log aggregators in prod | WARN |
| 6.3 | No request middleware | No per-route access logs or latency tracking | **FAIL** |

**PASS (no action needed):** docs_url gating, CORS production path, Ollama URL from env, Ollama timeout, Ollama graceful degradation, /health checks all deps, /health no auth, no raw SQL, no hardcoded secrets, no f-string SQL injection, profile update no mass assignment, admin 403 guard, auth via Supabase JWT.

---

## Priority Actions Before Launch

1. **Add `backend/.env` to `exam-coach/.gitignore`** — prevents accidental credential commit (currently untracked but unprotected)
2. **Change `app_env` default to `"production"`** in `config.py:17`
3. **Wire Sentry** — add `sentry_sdk` to deps, add `SENTRY_DSN` to `.env.example` and `config.py`, init in `main.py`
4. **Add structured logging** — replace `rich.Console` calls with Python `logging` + JSON formatter in production; add request middleware to `main.py`
5. **Verify Supabase admin role field** — confirm role check uses `app_metadata`, not `user_metadata`
6. **Validate `json_path`** in `admin.py:500` to be within expected `content/structured/` directory
