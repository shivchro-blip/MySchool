-- ============================================================
-- AI Exam Coach — Helper Functions
-- Phase 1
-- Run AFTER 003_seed_data.sql
-- ============================================================


-- ============================================================
-- Function: expire old cache entries
-- Call this via a Supabase cron job daily
-- ============================================================
create or replace function purge_expired_cache()
returns integer
language plpgsql
security definer
as $$
declare
    deleted_count integer;
begin
    delete from ai_cache where expires_at < now();
    get diagnostics deleted_count = row_count;
    return deleted_count;
end;
$$;


-- ============================================================
-- Function: reset daily AI call counter
-- Call this via a Supabase cron job at midnight IST
-- ============================================================
create or replace function reset_daily_ai_calls()
returns void
language plpgsql
security definer
as $$
begin
    update users set daily_ai_calls = 0;
end;
$$;


-- ============================================================
-- Function: auto-update updated_at timestamp
-- ============================================================
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

create trigger set_updated_at_users
    before update on users
    for each row execute function set_updated_at();

create trigger set_updated_at_questions
    before update on questions
    for each row execute function set_updated_at();

create trigger set_updated_at_content_chunks
    before update on content_chunks
    for each row execute function set_updated_at();
