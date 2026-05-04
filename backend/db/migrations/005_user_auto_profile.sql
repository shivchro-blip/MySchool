-- ============================================================
-- AI Exam Coach — Auto-create user profile on signup
-- Phase: post-launch fix
-- Run this in Supabase SQL Editor
-- ============================================================

-- Function: called by trigger when a new auth user signs up
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.users (id, plan, daily_ai_calls)
    values (new.id, 'free', 0)
    on conflict (id) do nothing;
    return new;
end;
$$;

-- Trigger: fires after every insert into auth.users
create or replace trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure handle_new_user();
