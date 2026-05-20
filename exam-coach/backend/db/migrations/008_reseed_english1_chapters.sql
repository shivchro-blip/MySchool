-- ============================================================
-- Replace MVP placeholder chapters with real TN Board +1 English
-- curriculum: 6 units × 3 chapters = 18 chapters.
-- Also corrects subject name to official "General English".
-- WARNING: cascades delete existing topics, questions, and
-- content_chunks linked to old placeholder chapters.
-- ============================================================

BEGIN;

-- Correct the subject name to the official TN Board title
UPDATE subjects
SET    name = 'General English'
WHERE  code = 'ENG1';

-- Remove MVP placeholder chapters for ENG1 (cascades to topics,
-- questions, and content_chunks via ON DELETE CASCADE)
DELETE FROM chapters
WHERE  subject_id = (SELECT id FROM subjects WHERE code = 'ENG1');

-- Insert 18 real chapters with slugs generated using the same
-- logic as migration 002_add_slugs.sql
WITH subj AS (SELECT id FROM subjects WHERE code = 'ENG1')
INSERT INTO chapters (subject_id, number, title, slug, content_type)
SELECT
    subj.id,
    ch.number,
    ch.title,
    lower(
        regexp_replace(
            trim(regexp_replace(ch.title, '[^a-zA-Z0-9 ]', '', 'g')),
            ' +', '-', 'g'
        )
    ) AS slug,
    ch.content_type
FROM subj, (VALUES
    -- Unit 1 · Memory · Relationships · Duty
    (1,  'The Portrait of a Lady',          'prose'),
    (2,  'Once Upon a Time',                'poem'),
    (3,  'After Twenty Years',              'prose'),
    -- Unit 2 · Courage · Sports · Human Nature
    (4,  'The Queen of Boxing',             'prose'),
    (5,  'Confessions of a Born Spectator', 'poem'),
    (6,  'A Shot in the Dark',              'prose'),
    -- Unit 3 · Nature · Mind · Comedy
    (7,  'Forgetting',                      'prose'),
    (8,  'Lines Written in Early Spring',   'poem'),
    (9,  'The First Patient',               'prose'),
    -- Unit 4 · Wisdom · Mischief · Vanity
    (10, 'Tight Corners',                   'prose'),
    (11, 'Macavity, the Mystery Cat',        'poem'),
    (12, 'With the Photographer',           'prose'),
    -- Unit 5 · Duty · Aspiration · Emotion
    (13, 'The Convocation Address',         'prose'),
    (14, 'Everest is not the Only Peak',    'poem'),
    (15, 'The Singing Lesson',              'prose'),
    -- Unit 6 · Travel · Mortality · Greed
    (16, 'The Accidental Tourist',          'prose'),
    (17, 'The Hollow Crown',               'poem'),
    (18, 'The Never Never Nest',           'prose')
) AS ch(number, title, content_type);

COMMIT;
