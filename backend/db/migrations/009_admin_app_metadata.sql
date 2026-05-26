-- ============================================================
-- Migration 009 - Move admin authorization to trusted app_metadata
-- Prereqs: Supabase service role or database owner access.
-- Run in Supabase SQL Editor after filling the existing admin list below.
-- ============================================================

begin;

create temp table _existing_admins_to_promote (
    user_id uuid,
    email   text,
    check (user_id is not null or email is not null)
);

-- REQUIRED BEFORE RUNNING:
-- Add every currently legitimate admin here, by auth.users.id or email.
-- Examples:
-- insert into _existing_admins_to_promote (user_id, email) values
--   ('00000000-0000-0000-0000-000000000000', null),
--   (null, 'admin@example.com');

do $$
declare
    requested_count integer;
    updated_count   integer;
begin
    select count(*) into requested_count
    from _existing_admins_to_promote;

    if requested_count = 0 then
        raise exception
            'Fill _existing_admins_to_promote with current admin user IDs/emails before running this migration';
    end if;

    with updated_users as (
        update auth.users u
        set raw_app_meta_data = jsonb_set(
            coalesce(u.raw_app_meta_data, '{}'::jsonb),
            '{role}',
            '"admin"'::jsonb,
            true
        )
        where exists (
            select 1
            from _existing_admins_to_promote a
            where (a.user_id is not null and a.user_id = u.id)
               or (a.email is not null and lower(a.email) = lower(u.email))
        )
        returning 1
    )
    select count(*) into updated_count
    from updated_users;

    if updated_count <> requested_count then
        raise exception
            'Updated % admin user(s), but % admin identifier(s) were supplied',
            updated_count,
            requested_count;
    end if;
end $$;

commit;
