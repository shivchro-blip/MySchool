# Security Audit — 2026-06-10

Scope: FastAPI backend, Supabase (PostgreSQL + RLS), React/Vite web app,
React/Vite admin panel. The Android app is a Bubble Wrap TWA wrapping the web
frontend, so all web fixes apply to it automatically.

Severity scale: **Critical** (exploitable now, real impact), **High**,
**Medium**, **Low / hardening**.

---

## 1. Findings & Fixes

### Critical

| # | Finding | Fix |
|---|---------|-----|
| C1 | **SECURITY DEFINER functions callable by any client.** `reset_daily_ai_calls()`, `consume_ai_call(uuid,int)` and `purge_expired_cache()` had the Postgres default `EXECUTE` grant to PUBLIC, and PostgREST exposes public-schema functions at `/rest/v1/rpc/*`. Anyone with the anon key could zero every user's AI quota, burn an arbitrary victim's quota (`p_user_id` is a parameter), or flush the AI cache. | `backend/db/migrations/011_lock_down_definer_functions.sql` — revokes EXECUTE from `public`/`anon`/`authenticated`, grants only `service_role`; also pins `search_path = public` on the two definer functions that lacked it (search-path hijacking hardening). **Must be run in Supabase SQL Editor.** |

### High

| # | Finding | Fix |
|---|---------|-----|
| H1 | **No single-session control** — one account could be shared across any number of devices/browsers. | Full implementation: see §2. |
| H2 | **No per-IP rate limiting** on AI-backed and session endpoints (AIGate enforces a per-user daily quota, but nothing limited request bursts; `slowapi` was declared in `pyproject.toml` but never wired). Supabase handles login/OTP throttling on its own endpoints. | `backend/core/rate_limit.py` (new) + wiring in `main.py`. Limits: `/learning/explain`, `/evaluation/submit`, `/evaluation/retry` → 30/min/IP; `/users/session/claim` → 10/min/IP; `PUT /users/me` → 20/min/IP. |
| H3 | **Vulnerable dependencies** (pip-audit): pyjwt 2.12.1 (4 advisories), starlette 1.0.0, urllib3 2.6.3 (2), idna 3.13, langchain-core 1.3.2. | Upgraded in the venv and floor-pinned in `backend/pyproject.toml` (`starlette>=1.0.1`, `urllib3>=2.7.0`, `idna>=3.15`, `pyjwt>=2.13.0`, `langchain-core>=1.3.3`). Re-audit: clean except chromadb (see Deferred). npm audit: react-router-dom advisories in web + admin fixed via `npm audit fix`; both now report 0 vulnerabilities and build clean. |

### Medium

| # | Finding | Fix |
|---|---------|-----|
| M1 | `.env.local` files committed to git (`frontend/admin/.env.local`, `frontend/web/.env.local`). They contain only the Supabase **publishable** anon key (public by design), so no secret leaked — but the pattern is dangerous. | `git rm --cached` both; `.gitignore` now covers `.env.local` / `.env.*.local`; added `frontend/web/.env.example` and `frontend/admin/.env.example`. `frontend/web/.env.production` stays tracked deliberately: it holds only public values the production build needs. |
| M2 | Signing material at repo root (`upload_certificate.pem`, `yadhum-twa/` with TWA keystore) was untracked but one `git add .` away from being committed. | `.gitignore` now excludes `*.pem`, `*.jks`, `*.keystore`, `*.p12`, `yadhum-twa/`, `migration*.patch`. |
| M3 | `GET /api/v1/learning/content/{slug}` served chapter content unauthenticated. (Low real impact: the same content is public-read under RLS, but every legitimate consumer is logged in.) | Requires auth + active session now (`api/v1/learning.py`). |
| M4 | Admin `PUT /content/{chunk_id}` accepted a **raw dict** body — only endpoint without Pydantic validation. | `EditChunkRequest` model with the same field whitelist + length caps (`api/v1/admin.py`). |
| M5 | Admin route guard checked only token **presence** — an expired/garbage `admin_token` rendered the admin UI (API calls would fail, but the shell loaded). | `frontend/admin/src/App.jsx` Guard now decodes the JWT and rejects expired/malformed tokens; admin client now also auto-logs-out on any 401 (it previously had no 401 handling at all). |

### Low / hardening

| # | Finding | Fix |
|---|---------|-----|
| L1 | CORS allowed all methods/headers (`*`). Origins were already restricted in production. | `main.py`: explicit method list + `Authorization, Content-Type, X-Session-Token` headers only. |
| L2 | Unbounded client-controlled `limit` query params (`/evaluation/history`, admin pending lists). | Bounded with `Query(ge=…, le=…)`. |
| L3 | `pytest`/`pip-audit` used but not declared. | Added `[dependency-groups] dev` to `backend/pyproject.toml`. |

### Verified clean (no action needed)

- **No hardcoded secrets** anywhere in backend or either frontend; all secrets flow through `config.py` ← `.env` (gitignored). The only key in frontend code is the Supabase *publishable* key, which is designed to be public.
- **No SQL injection surface**: all DB access goes through the supabase-py query builder (parameterised PostgREST) — no raw SQL anywhere in app code.
- **JWT handling**: HS256 local verification checks signature, expiry and audience (`python-jose`); falls back to live GoTrue validation. Admin gate always does a live lookup (`allow_local=False`) so role revocation is immediate.
- **RLS**: enabled on all nine original tables (002); `users_update_own` already locks `plan`, `daily_ai_calls` and consent/timestamp columns via WITH CHECK subselects (010). Write-access defaults to deny for tables without write policies.
- **Service role key**: used only server-side in `db/client.py`; never shipped to any client. `UpdateProfileRequest` cannot touch `plan`/`daily_ai_calls`.
- **Logs**: no tokens or PII written to logs (`usage_logs` stores action metadata only).
- **OpenAPI docs** already disabled outside development.

---

## 2. Single-Session Enforcement (Phase 2)

One active login per account, across web, admin and the TWA.

**Database** — `backend/db/migrations/012_user_sessions.sql` *(run in Supabase SQL Editor after 011)*
- `user_sessions(id, user_id → auth.users, session_token_hash, created_at, last_seen_at, device_hint)`.
- Only the **SHA-256 hash** of the token is stored. `device_hint` = first 80 chars of User-Agent.
- `UNIQUE INDEX on user_id` — the single-session invariant is enforced by the database itself.
- RLS: select/delete own row only. No client insert/update policies — sessions are created exclusively by the backend service role, so a client can never forge one via PostgREST.

**Backend**
- `db/repositories/sessions_repo.py` — hash/replace/touch/delete (touch throttled to 1 write/60 s).
- `core/session.py` — `verify_session` dependency: resolves the JWT user, compares `X-Session-Token` hash with `secrets.compare_digest`, updates `last_seen_at`. Mismatch/missing → 401 `{"detail": "SESSION_INVALIDATED", "message": "Your session was ended because you signed in from another location."}` (handler in `core/errors.py`).
- `POST /api/v1/users/session/claim` — deletes all existing rows for the user, stores hash of a fresh `secrets.token_hex(32)`, returns the raw token (the only time it leaves the server). `DELETE /api/v1/users/session` — logout.
- `verify_session` applied to: all `/users/me*`, all `/evaluation/*`, `/learning/explain`, `/learning/content/*`, and the entire `/admin/*` router (router-level dependency). `/syllabus/*` stays public by design (catalog data, public-read under RLS).

**Web frontend** (`frontend/web`)
- `api/auth.js`: `claimSession()` after email login, signup and Google OAuth callback; `logout()` releases the server session. Token kept in `localStorage` alongside the JWT (see Deferred D2 re: httpOnly cookies).
- `api/client.js`: sends `X-Session-Token` on every call; on 401 distinguishes `SESSION_INVALIDATED`, clears all auth state, redirects to `/login`; `LoginPage` shows: *"You were signed out because your account was accessed from another location."*

**Admin frontend** (`frontend/admin`) — same pattern: claim on login, header on every call, 401 auto-logout + banner, session release on logout.

> Rollout note: when 012 is applied and the backend deployed, every existing logged-in user gets a one-time forced re-login (no session row yet → `SESSION_INVALIDATED`). Expected and harmless.
> Note: an admin who logs into the admin panel and the student app with the *same account* will kick their own other session — accounts are per-surface in practice, so this is acceptable.

---

## 3. Intentionally Deferred

| # | Item | Justification |
|---|------|---------------|
| D1 | **chromadb CVE-2026-45829** | No fixed release published yet. Exposure is minimal: ChromaDB runs embedded (local folder `content/embeddings/`), never network-exposed. Re-check on next dependency pass. |
| D2 | **httpOnly cookies for JWT/session token** | The API lives on a separate origin (`api.yadhum.net`) from the app; cross-site cookies would require `SameSite=None` + CORS credential mode + CSRF defenses — a larger re-architecture. Supabase's own client model is localStorage-based. The session token has the same XSS exposure profile as the JWT already stored there; single-session enforcement actually *reduces* the value of a stolen token (next legitimate login revokes it). |
| D3 | **Supabase auth rate limits / OTP throttling** | Login/signup/OTP hit Supabase directly, not our backend. Supabase applies sensible defaults; review under Dashboard → Authentication → Rate Limits. Cannot be set from this repo. |
| D4 | **slowapi in-memory storage** | Correct for the current single-process uvicorn deployment. If workers scale out, switch to Redis via `storage_uri` (noted in `core/rate_limit.py`). |
| D5 | **`/syllabus/*` left public** | Catalog data, already public-read under RLS; no quota or PII involved. Deliberate. |
| D6 | **13 pre-existing test failures** | All 13 fail identically on the pre-audit baseline (verified by stashing): they require a real `backend/.env` + running services (Supabase creds, Ollama health). Not regressions; out of audit scope. |
| D7 | **JWT refresh-token flow** (`auth.js` TODO) | Pre-existing UX gap (re-login after 1 h), not a vulnerability. |

---

## 4. Operator Checklist (manual steps)

1. Run `backend/db/migrations/011_lock_down_definer_functions.sql` in Supabase SQL Editor. **Do this first — it closes the critical hole.**
2. Run `backend/db/migrations/012_user_sessions.sql`.
3. Deploy backend (`uv pip install -e .` picks up the new security floors) and both frontends together — the frontends must ship the session-claim logic at the same time `verify_session` goes live.
4. Optional: review Supabase Dashboard → Authentication → Rate Limits (D3).
