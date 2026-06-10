-- ============================================================
-- Migration: 011_lock_down_definer_functions.sql
--
-- SECURITY FIX (critical): all SECURITY DEFINER functions created in
-- 004_functions.sql / 005_user_auto_profile.sql / 009_atomic_ai_quota.sql
-- were left with the Postgres default EXECUTE grant to PUBLIC. Because
-- PostgREST exposes public-schema functions via /rest/v1/rpc/*, any
-- client holding the anon or authenticated key could call:
--
--   * reset_daily_ai_calls()  → zero the AI quota counter for EVERY user
--                               (free-plan quota bypass for all users)
--   * consume_ai_call(uuid,…) → burn another user's daily quota (DoS),
--                               passing any p_user_id and any limit
--   * purge_expired_cache()   → flush the AI response cache on demand
--
-- Fix: revoke EXECUTE from PUBLIC / anon / authenticated and grant it
-- only to service_role (the backend's service-key client). The backend
-- is the only legitimate caller of these functions.
--
-- Also hardens functions that were missing an explicit search_path
-- (SECURITY DEFINER functions without `set search_path` are vulnerable
-- to search-path hijacking).
--
-- Run AFTER 010_fix_rls_user_update.sql.
-- ============================================================


-- Step 1: pin search_path on the two definer functions that lacked it
create or replace function purge_expired_cache()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
    deleted_count integer;
begin
    delete from ai_cache where expires_at < now();
    get diagnostics deleted_count = row_count;
    return deleted_count;
end;
$$;

create or replace function reset_daily_ai_calls()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
    update users set daily_ai_calls = 0;
end;
$$;


-- Step 2: revoke client execution on all backend-only functions
revoke execute on function purge_expired_cache()          from public, anon, authenticated;
revoke execute on function reset_daily_ai_calls()         from public, anon, authenticated;
revoke execute on function consume_ai_call(uuid, integer) from public, anon, authenticated;
revoke execute on function handle_new_user()              from public, anon, authenticated;

grant execute on function purge_expired_cache()          to service_role;
grant execute on function reset_daily_ai_calls()         to service_role;
grant execute on function consume_ai_call(uuid, integer) to service_role;
