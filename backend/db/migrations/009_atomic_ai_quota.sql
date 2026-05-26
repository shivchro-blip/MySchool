-- ============================================================
-- Atomic AI quota consumption
-- Prevents concurrent requests from bypassing the free daily limit.
-- ============================================================

create or replace function consume_ai_call(
    p_user_id uuid,
    p_free_daily_limit integer default 20
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
    new_count integer;
begin
    update users
       set daily_ai_calls = daily_ai_calls + 1
     where id = p_user_id
       and (
           plan = 'paid'
           or daily_ai_calls < p_free_daily_limit
       )
     returning daily_ai_calls into new_count;

    return new_count;
end;
$$;
