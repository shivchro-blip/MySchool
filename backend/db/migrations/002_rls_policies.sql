-- ============================================================
-- AI Exam Coach — Row Level Security Policies
-- Phase 1
-- Run AFTER 001_create_schema.sql
-- ============================================================


-- Enable RLS on all tables
alter table subjects         enable row level security;
alter table chapters         enable row level security;
alter table topics           enable row level security;
alter table content_chunks   enable row level security;
alter table questions        enable row level security;
alter table users            enable row level security;
alter table responses        enable row level security;
alter table ai_cache         enable row level security;
alter table usage_logs       enable row level security;


-- ============================================================
-- subjects — public read, admin write
-- ============================================================
create policy "subjects_public_read"
    on subjects for select
    using (is_active = true);


-- ============================================================
-- chapters — public read, admin write
-- ============================================================
create policy "chapters_public_read"
    on chapters for select
    using (is_active = true);


-- ============================================================
-- topics — public read
-- ============================================================
create policy "topics_public_read"
    on topics for select
    using (is_active = true);


-- ============================================================
-- content_chunks — public read (validated only)
-- ============================================================
create policy "content_chunks_public_read"
    on content_chunks for select
    using (is_validated = true);


-- ============================================================
-- questions — public read (validated and active)
-- ============================================================
create policy "questions_public_read"
    on questions for select
    using (is_validated = true and is_active = true);


-- ============================================================
-- users — students can only read and update their own row
-- ============================================================
create policy "users_select_own"
    on users for select
    using (auth.uid() = id);

create policy "users_update_own"
    on users for update
    using (auth.uid() = id);

create policy "users_insert_own"
    on users for insert
    with check (auth.uid() = id);


-- ============================================================
-- responses — students can only access their own
-- ============================================================
create policy "responses_select_own"
    on responses for select
    using (auth.uid() = user_id);

create policy "responses_insert_own"
    on responses for insert
    with check (auth.uid() = user_id);


-- ============================================================
-- ai_cache — backend service role only (no student access)
-- ============================================================
create policy "ai_cache_service_only"
    on ai_cache for all
    using (auth.role() = 'service_role');


-- ============================================================
-- usage_logs — students can read their own, service can write
-- ============================================================
create policy "usage_logs_select_own"
    on usage_logs for select
    using (auth.uid() = user_id);

create policy "usage_logs_service_insert"
    on usage_logs for insert
    with check (auth.role() = 'service_role');
