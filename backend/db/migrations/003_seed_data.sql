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
