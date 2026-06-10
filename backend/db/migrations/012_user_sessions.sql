-- ============================================================
-- Migration: 012_user_sessions.sql
--
-- Single-session enforcement: one active session per user.
--
-- The backend stores only the SHA-256 hash of the session token
-- (never plaintext). A UNIQUE index on user_id enforces the
-- one-session-per-user invariant at the database level — a new
-- login replaces the previous row, which immediately invalidates
-- the session token held by any other browser/device (including
-- the TWA, which wraps the same web frontend).
--
-- RLS: students may read and delete their own row (diagnostics /
-- logout). INSERT and UPDATE are deliberately NOT granted to
-- clients — only the backend (service role, bypasses RLS) may
-- create or rotate sessions, so a client can never forge a
-- session row directly through PostgREST.
--
-- Run AFTER 011_lock_down_definer_functions.sql.
-- ============================================================

create table if not exists user_sessions (
    id                 uuid primary key default gen_random_uuid(),
    user_id            uuid not null references auth.users (id) on delete cascade,
    session_token_hash text not null,
    created_at         timestamptz not null default now(),
    last_seen_at       timestamptz not null default now(),
    device_hint        text  -- first 80 chars of User-Agent, diagnostics only
);

-- One active session per user, enforced by the database itself.
create unique index if not exists user_sessions_user_id_uidx
    on user_sessions (user_id);

alter table user_sessions enable row level security;

create policy "user_sessions_select_own"
    on user_sessions for select
    using (auth.uid() = user_id);

create policy "user_sessions_delete_own"
    on user_sessions for delete
    using (auth.uid() = user_id);

-- No insert/update policies on purpose: writes go through the backend
-- service-role client only.
