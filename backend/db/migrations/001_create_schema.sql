-- ============================================================
-- AI Exam Coach — Database Schema
-- Phase 1
-- Run this in Supabase SQL Editor in order
-- ============================================================


-- ============================================================
-- EXTENSIONS
-- ============================================================

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";


-- ============================================================
-- TABLE: subjects
-- Stores +1 and +2 subjects
-- ============================================================

create table if not exists subjects (
    id          uuid primary key default uuid_generate_v4(),
    code        text not null unique,        -- e.g. "ENG1", "PHY2"
    name        text not null,              -- e.g. "English"
    class       text not null check (class in ('+1', '+2')),
    is_active   boolean not null default true,
    created_at  timestamptz not null default now()
);

comment on table subjects is 'Tamil Nadu State Board subjects for +1 and +2';


-- ============================================================
-- TABLE: chapters
-- Each subject has multiple chapters
-- ============================================================

create table if not exists chapters (
    id              uuid primary key default uuid_generate_v4(),
    subject_id      uuid not null references subjects(id) on delete cascade,
    number          integer not null,           -- chapter order number
    title           text not null,
    content_type    text not null check (content_type in ('prose', 'poem', 'grammar', 'vocabulary')),
    is_active       boolean not null default true,
    created_at      timestamptz not null default now(),
    unique (subject_id, number)
);

comment on table chapters is 'Chapters within each subject';


-- ============================================================
-- TABLE: topics
-- Each chapter has multiple topics
-- ============================================================

create table if not exists topics (
    id          uuid primary key default uuid_generate_v4(),
    chapter_id  uuid not null references chapters(id) on delete cascade,
    title       text not null,
    order_index integer not null default 0,
    is_active   boolean not null default true,
    created_at  timestamptz not null default now()
);

comment on table topics is 'Topics within each chapter';


-- ============================================================
-- TABLE: content_chunks
-- Structured content extracted from PDFs
-- Never store raw PDF text here — always structured JSON
-- ============================================================

create table if not exists content_chunks (
    id              uuid primary key default uuid_generate_v4(),
    topic_id        uuid references topics(id) on delete cascade,
    chapter_id      uuid references chapters(id) on delete cascade,
    subject_id      uuid not null references subjects(id) on delete cascade,
    chunk_type      text not null check (chunk_type in (
                        'summary',
                        'explanation',
                        'key_points',
                        'example',
                        'glossary',
                        'exam_tip',
                        'author_info',
                        'theme',
                        'character'
                    )),
    content         text not null,
    language        text not null default 'en' check (language in ('en', 'ta')),
    embedding_id    text,                       -- ChromaDB document ID reference
    is_validated    boolean not null default false,  -- human validated flag
    created_at      timestamptz not null default now(),
    updated_at      timestamptz not null default now()
);

comment on table content_chunks is 'Structured content chunks extracted from syllabus PDFs';

create index if not exists idx_content_chunks_subject on content_chunks(subject_id);
create index if not exists idx_content_chunks_chapter on content_chunks(chapter_id);
create index if not exists idx_content_chunks_topic   on content_chunks(topic_id);
create index if not exists idx_content_chunks_type    on content_chunks(chunk_type);


-- ============================================================
-- TABLE: questions
-- Practice questions per chapter/topic
-- ============================================================

create table if not exists questions (
    id              uuid primary key default uuid_generate_v4(),
    subject_id      uuid not null references subjects(id) on delete cascade,
    chapter_id      uuid not null references chapters(id) on delete cascade,
    topic_id        uuid references topics(id) on delete set null,
    question_text   text not null,
    marks           integer not null check (marks in (1, 2, 5, 10)),
    question_type   text not null check (question_type in (
                        'short_answer',
                        'paragraph',
                        'essay',
                        'fill_blank',
                        'match'
                    )),
    answer_key      jsonb,                      -- structured expected answer
    rubric          jsonb,                      -- marking scheme per mark
    source          text default 'manual' check (source in ('manual', 'previous_year', 'ai_generated')),
    is_validated    boolean not null default false,
    is_active       boolean not null default true,
    created_at      timestamptz not null default now(),
    updated_at      timestamptz not null default now()
);

comment on table questions is 'Practice questions with marking rubric';

create index if not exists idx_questions_subject on questions(subject_id);
create index if not exists idx_questions_chapter on questions(chapter_id);
create index if not exists idx_questions_marks   on questions(marks);


-- ============================================================
-- TABLE: users
-- Extends Supabase auth.users
-- ============================================================

create table if not exists users (
    id              uuid primary key references auth.users(id) on delete cascade,
    full_name       text,
    class           text check (class in ('+1', '+2')),
    school          text,
    plan            text not null default 'free' check (plan in ('free', 'paid')),
    daily_ai_calls  integer not null default 0,
    last_active_at  timestamptz,
    created_at      timestamptz not null default now(),
    updated_at      timestamptz not null default now()
);

comment on table users is 'Student profiles extending Supabase auth';


-- ============================================================
-- TABLE: responses
-- Student answers + AI evaluation results
-- ============================================================

create table if not exists responses (
    id                  uuid primary key default uuid_generate_v4(),
    user_id             uuid not null references users(id) on delete cascade,
    question_id         uuid not null references questions(id) on delete cascade,
    student_answer      text not null,
    ai_score            numeric(4,1),           -- e.g. 3.5 out of 5
    max_score           integer not null,
    ai_feedback         jsonb,                  -- structured feedback object
    improved_answer     text,                   -- AI-generated better answer
    is_human_reviewed   boolean not null default false,
    human_score         numeric(4,1),
    human_notes         text,
    attempt_number      integer not null default 1,
    created_at          timestamptz not null default now()
);

comment on table responses is 'Student answers with AI and human evaluation';

create index if not exists idx_responses_user     on responses(user_id);
create index if not exists idx_responses_question on responses(question_id);
create index if not exists idx_responses_created  on responses(created_at desc);


-- ============================================================
-- TABLE: ai_cache
-- Cache AI responses to reduce Ollama/OpenRouter calls
-- Key: hash of (question_id + student_answer)
-- ============================================================

create table if not exists ai_cache (
    id              uuid primary key default uuid_generate_v4(),
    cache_key       text not null unique,       -- sha256 hash
    prompt_type     text not null check (prompt_type in ('explain', 'evaluate', 'improve', 'translate')),
    response_text   text not null,
    model_used      text not null,              -- e.g. "mistral:7b-instruct"
    hit_count       integer not null default 1,
    expires_at      timestamptz not null default now() + interval '7 days',
    created_at      timestamptz not null default now()
);

comment on table ai_cache is 'Cached AI responses keyed by input hash — 7 day TTL';

create index if not exists idx_ai_cache_key     on ai_cache(cache_key);
create index if not exists idx_ai_cache_expires on ai_cache(expires_at);


-- ============================================================
-- TABLE: usage_logs
-- Track all AI calls per user for rate limiting
-- ============================================================

create table if not exists usage_logs (
    id          uuid primary key default uuid_generate_v4(),
    user_id     uuid references users(id) on delete set null,
    action      text not null check (action in ('explain', 'evaluate', 'improve', 'translate')),
    model_used  text not null,
    was_cached  boolean not null default false,
    tokens_used integer,
    duration_ms integer,
    created_at  timestamptz not null default now()
);

comment on table usage_logs is 'AI call logs for usage tracking and rate limiting';

create index if not exists idx_usage_logs_user    on usage_logs(user_id);
create index if not exists idx_usage_logs_created on usage_logs(created_at desc);
