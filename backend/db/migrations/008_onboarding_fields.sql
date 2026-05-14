-- ============================================================
-- Migration 008 — Onboarding fields + rename class→class_level
-- Prereqs: 001_create_schema.sql, 005_consent_fields.sql
-- Run in Supabase SQL Editor.
-- ============================================================

-- Rename column; PostgreSQL 14+ updates the check constraint
-- expression automatically on column rename.
alter table users rename column class to class_level;

-- Add onboarding fields:
alter table users
  add column if not exists subjects             text[]
    default array[]::text[],
  add column if not exists onboarding_completed boolean
    not null default false;

comment on column users.class_level         is 'Student class level (+1 or +2)';
comment on column users.subjects            is 'Selected subject slugs (english, maths, science)';
comment on column users.onboarding_completed is 'True once user finishes onboarding flow';

create index if not exists idx_users_class_level on users(class_level);
