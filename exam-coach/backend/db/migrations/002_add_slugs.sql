-- Add URL-friendly slug columns to subjects and chapters.
-- Slugs are lowercase-hyphenated, globally unique per table, generated from name/title.

ALTER TABLE subjects ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE chapters ADD COLUMN IF NOT EXISTS slug TEXT;

-- Generate base slugs: strip non-alphanumeric chars, collapse spaces to hyphens
UPDATE subjects
SET slug = lower(
  regexp_replace(
    trim(regexp_replace(name, '[^a-zA-Z0-9 ]', '', 'g')),
    ' +', '-', 'g'
  )
)
WHERE slug IS NULL;

UPDATE chapters
SET slug = lower(
  regexp_replace(
    trim(regexp_replace(title, '[^a-zA-Z0-9 ]', '', 'g')),
    ' +', '-', 'g'
  )
)
WHERE slug IS NULL;

-- Deduplicate subject slugs: second occurrence of "english" becomes "english-2", etc.
WITH ranked AS (
  SELECT id,
         slug,
         ROW_NUMBER() OVER (PARTITION BY slug ORDER BY created_at, id) AS rn
  FROM subjects
)
UPDATE subjects s
SET slug = CASE WHEN r.rn > 1 THEN r.slug || '-' || r.rn ELSE r.slug END
FROM ranked r
WHERE s.id = r.id;

-- Deduplicate chapter slugs globally
WITH ranked AS (
  SELECT id,
         slug,
         ROW_NUMBER() OVER (PARTITION BY slug ORDER BY id) AS rn
  FROM chapters
)
UPDATE chapters c
SET slug = CASE WHEN r.rn > 1 THEN r.slug || '-' || r.rn ELSE r.slug END
FROM ranked r
WHERE c.id = r.id;

ALTER TABLE subjects ALTER COLUMN slug SET NOT NULL;
ALTER TABLE chapters ALTER COLUMN slug SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS subjects_slug_idx ON subjects(slug);
CREATE UNIQUE INDEX IF NOT EXISTS chapters_slug_idx ON chapters(slug);
