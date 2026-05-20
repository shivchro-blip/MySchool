-- ============================================================
-- Migration 005 — Add consent fields to users table
-- Run in Supabase SQL Editor after reviewing.
-- ============================================================

alter table users
  add column if not exists age_confirmation   text
    check (age_confirmation in ('adult', 'minor_with_consent')),
  add column if not exists terms_accepted_at  timestamptz,
  add column if not exists privacy_accepted_at timestamptz;

comment on column users.age_confirmation    is 'Self-reported age status at sign-up: adult or minor_with_consent';
comment on column users.terms_accepted_at   is 'UTC timestamp when user accepted Terms of Service';
comment on column users.privacy_accepted_at is 'UTC timestamp when user accepted Privacy Policy';
