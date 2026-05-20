-- ============================================================
-- AI Exam Coach — Atomic AI call counter increment
-- Run AFTER 008_onboarding_fields.sql
-- ============================================================

-- Atomically increments daily_ai_calls by 1 and returns the new value.
-- Using security definer so the service-key client can call it via rpc().
create or replace function increment_user_ai_calls(p_user_id uuid)
returns integer
language plpgsql
security definer
as $$
declare
    new_count integer;
begin
    update users
    set daily_ai_calls = daily_ai_calls + 1
    where id = p_user_id
    returning daily_ai_calls into new_count;
    return coalesce(new_count, 0);
end;
$$;
