-- Allow 3-mark questions (TN Board Part III / Para questions)
ALTER TABLE questions DROP CONSTRAINT IF EXISTS questions_marks_check;
ALTER TABLE questions ADD CONSTRAINT questions_marks_check
    CHECK (marks IN (1, 2, 3, 5, 10));
