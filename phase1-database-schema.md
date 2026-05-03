# AI Exam Coach — Phase 1: Database Schema
> Open Claude Code inside C:\MyProjects\exam-coach and paste this entire file.

---

## Context

Read CLAUDE.md before doing anything.
This phase creates the complete Supabase database schema.
Do not write any Python or API code yet — database only.

---

## Your Task

Create the following files with exactly the content shown, then
run the SQL in Supabase.

---

## Step 1: Create the migrations folder

```bash
mkdir -p backend/db/migrations
```

---

## Step 2: Create all schema files

---

### FILE: backend/db/migrations/001_create_schema.sql

```sql
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
```

---

### FILE: backend/db/migrations/002_rls_policies.sql

```sql
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
```

---

### FILE: backend/db/migrations/003_seed_data.sql

```sql
-- ============================================================
-- AI Exam Coach — Seed Data
-- Phase 1 — MVP: +1 English only
-- Run AFTER 002_rls_policies.sql
-- ============================================================


-- ============================================================
-- Subject: +1 English
-- ============================================================
insert into subjects (code, name, class) values
    ('ENG1', 'English', '+1')
on conflict (code) do nothing;


-- ============================================================
-- Chapters: +1 English Prose (MVP scope)
-- ============================================================
with subj as (select id from subjects where code = 'ENG1')
insert into chapters (subject_id, number, title, content_type)
select
    subj.id,
    ch.number,
    ch.title,
    ch.content_type
from subj, (values
    (1, 'A Prayer to the Teacher (Poem)',          'poem'),
    (2, 'A Dilemma (Prose)',                        'prose'),
    (3, 'The Last Lesson (Prose)',                  'prose'),
    (4, 'Confessions of a Born Spectator (Poem)',   'poem'),
    (5, 'The Portrait of a Lady (Prose)',           'prose'),
    (6, 'The Night the Ghost Got In (Prose)',       'prose'),
    (7, 'I am Every Woman (Poem)',                  'poem'),
    (8, 'The Accidental Tourist (Prose)',           'prose')
) as ch(number, title, content_type)
on conflict (subject_id, number) do nothing;


-- ============================================================
-- Topics: Chapter 3 — The Last Lesson (MVP first chapter)
-- ============================================================
with ch as (
    select c.id from chapters c
    join subjects s on s.id = c.subject_id
    where s.code = 'ENG1' and c.number = 3
)
insert into topics (chapter_id, title, order_index)
select
    ch.id,
    t.title,
    t.order_index
from ch, (values
    ('About the Author',        1),
    ('Summary',                 2),
    ('Themes',                  3),
    ('Characters',              4),
    ('Key Passages',            5),
    ('Glossary',                6),
    ('Exam Tips',               7)
) as t(title, order_index)
on conflict do nothing;


-- ============================================================
-- Sample Questions: The Last Lesson
-- ============================================================
with ch as (
    select c.id as chapter_id, s.id as subject_id
    from chapters c
    join subjects s on s.id = c.subject_id
    where s.code = 'ENG1' and c.number = 3
)
insert into questions (
    subject_id,
    chapter_id,
    question_text,
    marks,
    question_type,
    answer_key,
    rubric,
    source,
    is_validated
)
select
    ch.subject_id,
    ch.chapter_id,
    q.question_text,
    q.marks,
    q.question_type,
    q.answer_key::jsonb,
    q.rubric::jsonb,
    'manual',
    true
from ch, (values

    -- 2-mark questions
    (
        'Who is the author of The Last Lesson?',
        2,
        'short_answer',
        '{"key_term": "Alphonse Daudet", "detail": "French author who wrote this story as part of Monday Tales"}',
        '{"2": "Name Alphonse Daudet and mention he is French", "1": "Name only"}'
    ),
    (
        'What subject did M. Hamel teach?',
        2,
        'short_answer',
        '{"key_term": "French", "detail": "M. Hamel was the French language teacher in the village school"}',
        '{"2": "French language with context", "1": "French only"}'
    ),

    -- 5-mark questions
    (
        'Describe the character of M. Hamel as seen in The Last Lesson.',
        5,
        'paragraph',
        '{"points": ["Dedicated teacher", "Patriotic Frenchman", "Regretful at end", "Kind in last class", "Symbolic of French identity"]}',
        '{"5": "All 4-5 points with elaboration", "4": "3-4 points", "3": "2-3 points", "2": "1-2 points", "1": "Vague mention"}'
    ),
    (
        'What is the theme of The Last Lesson?',
        5,
        'paragraph',
        '{"points": ["Love for mother tongue", "Loss of freedom", "Importance of education", "Patriotism", "Regret and responsibility"]}',
        '{"5": "3+ themes explained clearly", "3": "2 themes", "2": "1 theme", "1": "Vague"}'
    ),

    -- 10-mark questions
    (
        'Give a detailed summary of The Last Lesson.',
        10,
        'essay',
        '{"structure": "intro + body + conclusion", "points": ["Setting in Alsace", "Franz late for school", "Prussian order", "M. Hamel last class", "Village people attend", "Emotional farewell", "Patriotic message"]}',
        '{"10": "Full essay, all key events, intro+conclusion", "8": "Most events, minor gaps", "6": "Key events, weak structure", "4": "Some events only", "2": "Very limited"}'
    )

) as q(question_text, marks, question_type, answer_key, rubric)
on conflict do nothing;
```

---

### FILE: backend/db/migrations/004_functions.sql

```sql
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
```

---

## Step 3: Update the Supabase client file

### FILE: backend/db/client.py

```python
from supabase import create_client, Client
from config import settings

_client: Client | None = None


def get_db() -> Client:
    global _client
    if _client is None:
        if not settings.supabase_url or not settings.supabase_service_key:
            raise RuntimeError(
                "Supabase credentials not configured. "
                "Copy backend/.env.example to backend/.env and fill in values."
            )
        _client = create_client(
            settings.supabase_url,
            settings.supabase_service_key,
        )
    return _client


def get_public_db() -> Client:
    """
    Returns a client using the anon key.
    Use this for operations that respect RLS policies.
    """
    if not settings.supabase_url or not settings.supabase_anon_key:
        raise RuntimeError("Supabase anon credentials not configured.")
    return create_client(
        settings.supabase_url,
        settings.supabase_anon_key,
    )
```

---

## Step 4: Create the DB query layer stubs

### FILE: backend/db/syllabus.py

```python
# Syllabus queries
# All database access for subjects, chapters, topics lives here

from .client import get_db


async def get_all_subjects() -> list[dict]:
    db = get_db()
    result = db.table("subjects").select("*").eq("is_active", True).execute()
    return result.data


async def get_chapters_by_subject(subject_id: str) -> list[dict]:
    db = get_db()
    result = (
        db.table("chapters")
        .select("*")
        .eq("subject_id", subject_id)
        .eq("is_active", True)
        .order("number")
        .execute()
    )
    return result.data


async def get_topics_by_chapter(chapter_id: str) -> list[dict]:
    db = get_db()
    result = (
        db.table("topics")
        .select("*")
        .eq("chapter_id", chapter_id)
        .eq("is_active", True)
        .order("order_index")
        .execute()
    )
    return result.data
```

---

### FILE: backend/db/questions.py

```python
# Question queries
# All database access for questions lives here

from .client import get_db


async def get_questions_by_chapter(
    chapter_id: str,
    marks: int | None = None,
) -> list[dict]:
    db = get_db()
    query = (
        db.table("questions")
        .select("*")
        .eq("chapter_id", chapter_id)
        .eq("is_validated", True)
        .eq("is_active", True)
    )
    if marks:
        query = query.eq("marks", marks)
    result = query.order("marks").execute()
    return result.data


async def get_question_by_id(question_id: str) -> dict | None:
    db = get_db()
    result = (
        db.table("questions")
        .select("*")
        .eq("id", question_id)
        .single()
        .execute()
    )
    return result.data
```

---

### FILE: backend/db/responses.py

```python
# Response queries
# All database access for student answers and evaluations lives here

from .client import get_db


async def save_response(
    user_id: str,
    question_id: str,
    student_answer: str,
    max_score: int,
    attempt_number: int = 1,
) -> dict:
    db = get_db()
    result = (
        db.table("responses")
        .insert({
            "user_id": user_id,
            "question_id": question_id,
            "student_answer": student_answer,
            "max_score": max_score,
            "attempt_number": attempt_number,
        })
        .execute()
    )
    return result.data[0]


async def update_response_with_evaluation(
    response_id: str,
    ai_score: float,
    ai_feedback: dict,
    improved_answer: str,
    model_used: str,
) -> dict:
    db = get_db()
    result = (
        db.table("responses")
        .update({
            "ai_score": ai_score,
            "ai_feedback": ai_feedback,
            "improved_answer": improved_answer,
        })
        .eq("id", response_id)
        .execute()
    )
    return result.data[0]


async def get_responses_by_user(user_id: str, limit: int = 20) -> list[dict]:
    db = get_db()
    result = (
        db.table("responses")
        .select("*, questions(question_text, marks)")
        .eq("user_id", user_id)
        .order("created_at", desc=True)
        .limit(limit)
        .execute()
    )
    return result.data
```

---

### FILE: backend/db/cache.py

```python
# AI response cache queries
# Reduces Ollama/OpenRouter calls

import hashlib
from .client import get_db


def make_cache_key(prompt_type: str, content: str) -> str:
    """Generate a consistent SHA256 cache key."""
    raw = f"{prompt_type}:{content}"
    return hashlib.sha256(raw.encode()).hexdigest()


async def get_cached_response(cache_key: str) -> str | None:
    db = get_db()
    try:
        result = (
            db.table("ai_cache")
            .select("response_text")
            .eq("cache_key", cache_key)
            .gt("expires_at", "now()")
            .single()
            .execute()
        )
        if result.data:
            db.table("ai_cache").update(
                {"hit_count": result.data.get("hit_count", 1) + 1}
            ).eq("cache_key", cache_key).execute()
            return result.data["response_text"]
    except Exception:
        return None
    return None


async def save_cached_response(
    cache_key: str,
    prompt_type: str,
    response_text: str,
    model_used: str,
) -> None:
    db = get_db()
    try:
        db.table("ai_cache").upsert({
            "cache_key": cache_key,
            "prompt_type": prompt_type,
            "response_text": response_text,
            "model_used": model_used,
        }).execute()
    except Exception:
        pass
```

---

## Step 5: Run the SQL in Supabase

Instruct the user to do the following manually:

```
1. Go to https://supabase.com and open your exam-coach project
2. Click "SQL Editor" in the left sidebar
3. Run each file in order:
   - backend/db/migrations/001_create_schema.sql
   - backend/db/migrations/002_rls_policies.sql
   - backend/db/migrations/003_seed_data.sql
   - backend/db/migrations/004_functions.sql
4. After running, go to Table Editor and verify these tables exist:
   - subjects (should have 1 row: ENG1)
   - chapters (should have 8 rows)
   - questions (should have 5 rows for The Last Lesson)
```

---

## Step 6: Update CLAUDE.md phase log

Open CLAUDE.md and replace the Phase Log section with:

```markdown
## Phase Log (Update This at the Start of Every Phase)
- Phase 0: Project scaffold ✓
- Phase 1: Database schema, RLS, seed data ← current
```

---

## Step 7: Commit to git

```bash
git add .
git commit -m "Phase 1: Database schema — tables, RLS, seed data, query layer"
```

---

## Step 8: Print completion summary

```
✓ backend/db/migrations/001_create_schema.sql   — 8 tables created
✓ backend/db/migrations/002_rls_policies.sql    — RLS policies
✓ backend/db/migrations/003_seed_data.sql       — ENG1 seed data
✓ backend/db/migrations/004_functions.sql       — helper functions
✓ backend/db/client.py                          — updated
✓ backend/db/syllabus.py                        — query stubs
✓ backend/db/questions.py                       — query stubs
✓ backend/db/responses.py                       — query stubs
✓ backend/db/cache.py                           — cache helpers
✓ CLAUDE.md updated
✓ Git committed

ACTION REQUIRED:
Run the 4 SQL files in Supabase SQL Editor in order (001 → 004).
Verify tables exist in Supabase Table Editor before moving to Phase 2.

Phase 1 complete.
Next: Phase 2 — Content Pipeline (PDF → structured JSON → ChromaDB)
```
