-- ============================================================
-- Migration: 010_fix_rls_user_update.sql
--
-- Fixes: users_update_own RLS policy (created in 002_rls_policies.sql)
-- was permissive — it used only a USING clause with no WITH CHECK,
-- meaning authenticated users could overwrite server-managed columns
-- (plan, daily_ai_calls, last_active_at, created_at, updated_at,
-- terms_accepted_at, privacy_accepted_at) via direct Supabase client
-- calls, bypassing backend enforcement entirely.
--
-- Fix: drop and recreate the policy with WITH CHECK subselects that
-- assert each locked column equals its current DB value. Any UPDATE
-- that tries to change a locked column fails the check and is
-- rejected by Postgres before it reaches the application.
--
-- User-editable columns (full_name, class, school, age_confirmation)
-- are intentionally not constrained here.
--
-- Locked columns:
--   plan, daily_ai_calls       — quota/billing, backend-managed only
--   created_at                 — immutable creation timestamp
--   updated_at                 — set by trigger, not by client
--   last_active_at             — set by backend on each AI call
--   terms_accepted_at          — consent timestamp, set at sign-up
--   privacy_accepted_at        — consent timestamp, set at sign-up
--
-- Run AFTER 005_consent_fields.sql.
-- ============================================================


-- Step 1: drop the existing permissive policy
drop policy if exists "users_update_own" on users;


-- Step 2: recreate with column-level write restrictions
--
-- NOT NULL columns use = for comparison.
-- Nullable timestamp columns use IS NOT DISTINCT FROM so that
-- NULL = NULL evaluates true (standard = returns NULL for NULLs).
create policy "users_update_own" on users
    for update
    using (auth.uid() = id)
    with check (
        auth.uid() = id
        AND plan                = (select plan                from users where id = auth.uid())
        AND daily_ai_calls      = (select daily_ai_calls      from users where id = auth.uid())
        AND created_at          = (select created_at          from users where id = auth.uid())
        AND updated_at          is not distinct from (select updated_at          from users where id = auth.uid())
        AND last_active_at      is not distinct from (select last_active_at      from users where id = auth.uid())
        AND terms_accepted_at   is not distinct from (select terms_accepted_at   from users where id = auth.uid())
        AND privacy_accepted_at is not distinct from (select privacy_accepted_at from users where id = auth.uid())
    );
