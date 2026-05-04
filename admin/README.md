# AI Exam Coach — Admin Panel

The admin panel is the operational backbone of the platform.
It is used to validate content, review AI evaluations, manage questions,
and trigger the content pipeline after new PDFs are added.

**URL (development):** http://localhost:5174
**URL (production):**  https://your-domain.com/admin

---

## Table of Contents

1. [Initial Setup](#1-initial-setup)
2. [Login](#2-login)
3. [Dashboard](#3-dashboard)
4. [Content Validation](#4-content-validation)
5. [Question Management](#5-question-management)
6. [Evaluation Review](#6-evaluation-review)
7. [Pipeline Trigger](#7-pipeline-trigger)
8. [Workflow: Adding a New Chapter](#8-workflow-adding-a-new-chapter)
9. [Architecture Notes](#9-architecture-notes)

---

## 1. Initial Setup

### 1.1 Set admin role in Supabase

Only users with `role: admin` in their Supabase metadata can log in.
Run this SQL in Supabase SQL Editor (replace with your email):

```sql
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'your-admin@email.com';
```

Verify it worked:
```sql
SELECT email, raw_user_meta_data->>'role' as role
FROM auth.users
WHERE email = 'your-admin@email.com';
```

### 1.2 Configure environment

```bash
cd frontend/admin
cp .env.local.example .env.local   # if example exists, otherwise create it
```

Contents of `frontend/admin/.env.local`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Get these values from Supabase → Project Settings → API.

### 1.3 Start the admin panel

```bash
# Terminal 1: backend must be running
cd backend && uvicorn main:app --reload --port 8000

# Terminal 2: admin panel
cd frontend/admin && npm install && npm run dev
```

Open http://localhost:5174

---

## 2. Login

- Navigate to http://localhost:5174
- Enter your admin email and password
- If login fails with 403: your user does not have `role: admin` — see step 1.1
- If login fails with 401: wrong credentials
- The session token is stored in localStorage and expires when Supabase token expires (default 1 hour)
- Logout via the link at the bottom of the sidebar

---

## 3. Dashboard

The dashboard shows a live overview of the system.

| Stat | What it means |
|------|---------------|
| Total Users | All registered students |
| Content Chunks | Total extracted chunks / pending validation |
| Questions | Total questions / pending validation |
| Avg Score | Average student score across all attempts |
| Cache Hit Rate | % of AI calls served from cache (target: >30%) |
| AI Calls by Model | Breakdown of Ollama vs OpenRouter vs cache usage |

**Pending Actions** links take you directly to the relevant page.
Check the dashboard daily in the first week after launch.

---

## 4. Content Validation

**Path:** Sidebar → 📚 Content

Content chunks are extracted from PDFs by the pipeline.
They start as `is_validated = false`.
Students cannot see or be evaluated on unvalidated content.

### 4.1 What you see

Each card shows:
- **Chunk type** (summary, theme, glossary, author_info, exam_tip, key_points)
- **Chapter** it belongs to
- **Section header** (the original heading from the PDF)
- **Language** (English or Tamil)
- **Full content text**

### 4.2 Actions per chunk

| Action | When to use |
|--------|-------------|
| ✓ Validate | Content is accurate and complete — approve it |
| ✏️ Edit | Content has minor errors — fix text then validate |
| 🗑 Delete | Content is wrong, duplicate, or from the wrong chapter |

### 4.3 Editing a chunk

1. Click ✏️ Edit — a textarea opens with the current content
2. Fix the text (spelling, formatting, missing information)
3. Click Save — the text updates in Supabase
4. The chunk remains unvalidated until you click ✓ Validate

### 4.4 What to check during validation

For **summary** chunks: Does it accurately summarise the chapter? Is it exam-relevant?

For **theme** chunks: Are the correct themes listed? Are they explained clearly?

For **glossary** chunks: Are the word definitions accurate? Are Tamil Nadu board terms used?

For **author_info** chunks: Is the author name correct? Are biographical facts accurate?

For **exam_tip** chunks: Is the tip specific to Tamil Nadu board exam patterns?

### 4.5 Validation affects evaluation quality

The evaluation module cross-checks ChromaDB results against `is_validated = true`
before using any content for scoring. Unvalidated chunks are excluded.
If no validated chunks exist for a chapter, the AI evaluates on the answer key alone
and the student sees a warning in their feedback.

**Validate content before students use the platform.**

---

## 5. Question Management

**Path:** Sidebar → ❓ Questions

### 5.1 Filter options

| Filter | Shows |
|--------|-------|
| All | Every question |
| Pending | Questions waiting for validation |
| Validated | Approved questions visible to students |
| Inactive | Deactivated questions (soft deleted) |

### 5.2 Actions

| Action | Effect |
|--------|--------|
| ✓ Validate | Makes question visible to students |
| Unvalidate | Hides question from students (keeps it in DB) |
| Deactivate | Soft delete — sets `is_active = false` |

### 5.3 Viewing the answer key

Click **View answer key** under any question to expand the JSON rubric.
The answer key structure differs by mark level:

**2-mark questions:**
```json
{
  "key_term": "Alphonse Daudet",
  "detail": "French author who wrote Monday Tales"
}
```

**5-mark questions:**
```json
{
  "points": [
    "Point 1 with explanation",
    "Point 2 with explanation",
    "Point 3 with explanation"
  ]
}
```

**10-mark questions:**
```json
{
  "structure": "intro + body + conclusion",
  "points": ["Setting", "Characters", "Conflict", "Climax", "Resolution", "Moral"]
}
```

### 5.4 Mark level rules (Tamil Nadu State Board)

| Marks | Answer type | Expected length | Structure |
|-------|-------------|-----------------|-----------|
| 1 | Single fact or term | 1 sentence | None |
| 2 | Term + brief explanation | 2–3 sentences | Definition + context |
| 5 | 3–4 developed points | 1 paragraph | Point + elaboration × 3 |
| 10 | Full structured essay | 200–300 words | Intro + 4–5 points + conclusion |

Questions seeded in Phase 1 are pre-validated.
Questions from the AI pipeline or added manually start as `is_validated = false`.

---

## 6. Evaluation Review

**Path:** Sidebar → 🤖 Evaluations

Shows all student submissions that have been scored by AI but not reviewed by a human.

### 6.1 What you see per card

- **Question text** and mark allocation
- **Student's answer** (full text)
- **AI score** with colour indicator (green ≥80%, yellow ≥50%, red <50%)
- **AI feedback** (expandable — shows strengths and weaknesses)

### 6.2 Submitting a review

1. Enter your score in the **Score / max** field (accepts decimals like 3.5)
2. Add optional notes in the **Notes** field
3. Click **Submit Review**
4. The card disappears — `is_human_reviewed = true` is saved to Supabase

### 6.3 When AI scores are wrong

Common cases where AI over-scores:
- Student answer is vague but uses correct vocabulary
- Answer is in Tamil and model gives benefit of the doubt

Common cases where AI under-scores:
- Student paraphrases correctly but uses different words than the model answer
- Answer structure is correct but model expected different ordering

Set your human score to override. Notes are stored for future training reference.

### 6.4 Review cadence

Aim to review all evaluations within 48 hours.
After 2–3 weeks of reviews, you will have enough data to measure AI accuracy.
Target: AI score within ±0.5 marks of human score on 80% of submissions.

---

## 7. Pipeline Trigger

**Path:** Sidebar → ⚙️ Pipeline

Triggers the embed + Supabase load steps for a chapter that has already been
extracted to a JSON file using `scripts/pdf_extract.py`.

### 7.1 Prerequisites before triggering

The JSON file must already exist in `content/structured/`.
If it does not, run the extraction script first:

```bash
cd C:\MyProjects\exam-coach
python scripts/pdf_extract.py \
  --input  content/raw/your_textbook.pdf \
  --output content/structured/eng1_ch3.json \
  --subject ENG1 \
  --class +1 \
  --chapter 3 \
  --title "The Last Lesson" \
  --pages 45-67
```

### 7.2 Get UUIDs from Supabase

You need the subject UUID and chapter UUID from Supabase Table Editor:

1. Go to Supabase → Table Editor → subjects table
2. Copy the `id` of ENG1 (subject UUID)
3. Go to chapters table, filter by subject_id
4. Copy the `id` of the correct chapter (chapter UUID)

### 7.3 Fill the form

| Field | Example value |
|-------|---------------|
| Subject UUID | `a1b2c3d4-...` (from subjects table) |
| Chapter UUID | `e5f6g7h8-...` (from chapters table) |
| JSON File Path | `content/structured/eng1_ch3.json` |

Click **⚙️ Trigger Pipeline**.

### 7.4 After triggering

The pipeline does two things:
1. Embeds all chunks into ChromaDB (local vector store)
2. Inserts all chunks into Supabase `content_chunks` with `is_validated = false`

After triggering, go to the **Content** page and validate the chunks
before students use this chapter.

### 7.5 Troubleshooting

| Error | Fix |
|-------|-----|
| JSON file not found | Run `pdf_extract.py` first |
| Subject UUID invalid | Copy exact UUID from Supabase — no spaces |
| 403 Forbidden | Your token expired — logout and login again |
| 503 Service Unavailable | Ollama is not running — `ollama serve` |

---

## 8. Workflow: Adding a New Chapter

Follow these steps in order every time you add a new chapter.

```
Step 1: Add chapter to database
         Supabase SQL Editor → INSERT into chapters table
         OR run 003_seed_data.sql with the new chapter added

Step 2: Extract PDF content
         python scripts/pdf_extract.py --input ... --output ... --chapter N

Step 3: Trigger pipeline from admin panel
         Pipeline page → fill Subject UUID + Chapter UUID + JSON path → Trigger

Step 4: Validate content chunks
         Content page → read each chunk → Validate or Edit+Validate or Delete

Step 5: Validate questions
         Questions page → filter Pending → Validate each question

Step 6: Test as a student
         Open http://localhost:5173 → select chapter → Learn and Practice
         Verify explanation quality and evaluation accuracy

Step 7: Monitor evaluations
         After students use the chapter → Evaluations page → review AI scores
```

---

## 9. Architecture Notes

### Why content must be validated before evaluation

The evaluation module uses a two-step verification:
1. ChromaDB vector search finds semantically similar chunks
2. Supabase cross-check confirms `is_validated = true`

Unvalidated chunks are excluded from evaluation context.
This prevents wrong or misextracted content from influencing student scores.

### Cache behaviour

AI responses are cached for 7 days keyed by:
`SHA256(prompt_type + chapter_id + topic_id + question)`

Validating content after a student has already received an evaluation
does NOT retroactively change their cached result.
The cache key includes `:validated=True/False` so new evaluations
after validation get a fresh AI call.

### Rate limits

Free students: 20 AI calls per day.
Rate limit resets at midnight via `reset_daily_ai_calls()` Supabase function.
To manually reset a student: update `daily_ai_calls = 0` in the users table.

### Admin role

Admin role is set in Supabase user metadata.
It is checked on every admin API request by `core/admin_auth.py`.
There is no admin role management in the admin panel itself —
use Supabase SQL Editor to grant or revoke admin access.
