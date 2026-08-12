# Yadhum — Add New Subject (End-to-End Master Prompt)
# ─────────────────────────────────────────────────────────────────────────────
# HOW TO USE THIS PROMPT:
#
# FIRST CHAT — always start here:
#   Upload the subject's PDF and say:
#   "Execute the subject master prompt for [Subject Name].
#    Subject slug: `physics`, Year: `plus2`, Class: 12.
#    Here is the PDF."
#
# Claude will:
#   1. Extract the full chapter list from the PDF
#   2. Calculate the batch plan (4 chapters per batch)
#   3. Execute Phase 1 (syllabus + onboarding wiring)
#   4. Execute Batch 1 (first 4 chapters — learn + practice)
#   5. Present all files for download and commit to git
#   6. Print the RESUME MESSAGE for the next chat
#
# SUBSEQUENT CHATS — paste the resume message Claude printed, upload the PDF:
#   "Resume subject master prompt — SUBJECT_LABEL, Batch 2 of N.
#    Chapters 5–8. Previous batches committed at [hash].
#    Here is the PDF."
#
# FINAL CHAT — after all chapter batches are done:
#   "Execute Phase 4 (model papers) for SUBJECT_LABEL.
#    Subject slug: `physics`, Year: `plus2`, Class: 12.
#    All chapters committed. Here is the PDF."
# ─────────────────────────────────────────────────────────────────────────────


## ══════════════════════════════════════════════════════════════════════════════
## PRE-PHASE — EXTRACT + PLAN (runs only in the FIRST chat)
## ══════════════════════════════════════════════════════════════════════════════

Only run this if this is the FIRST chat for this subject (no previous batches).

1. Extract the full chapter list from the uploaded PDF:
   - Chapter number, title, page range
   - Proposed slug (kebab-case, e.g. chapter-01-introduction)

2. Calculate the batch plan:
   - 4 chapters per batch
   - Last batch gets whatever remains (1–4 chapters)
   - Example: 18 chapters → Batch 1: Ch 1–4, Batch 2: Ch 5–8, Batch 3: Ch 9–12,
     Batch 4: Ch 13–16, Batch 5: Ch 17–18

3. Propose onboarding picker values:
   - ICON_NAME: best fitting lucide-react icon
   - ICON_BG: light tint hex color
   - ICON_COLOR: accent hex color

4. Show the full batch plan and wait for confirmation before Phase 0.


## ══════════════════════════════════════════════════════════════════════════════
## PHASE 0 — RECONNAISSANCE (runs only in the FIRST chat)
## ══════════════════════════════════════════════════════════════════════════════

Only run Phase 0 in the FIRST chat. Subsequent batch chats skip straight to
the current batch's Phase 2 + Phase 3.

Read these files. Do NOT make changes.

1. `frontend/web/src/data/syllabus.js`
   - Shape of one chapters[] entry (number, title, slug — no volume)
   - Confirm YEAR key exists

2. `frontend/web/src/content/registry.js`
   - Registration pattern: key = slug, value = dynamic import arrow fn

3. `frontend/web/src/content/practiceRegistry.js`
   - Confirm glob = `./Class_*/*/practice/*.js`

4. `frontend/web/src/pages/OnboardingPage.jsx`
   - Full SUBJECTS array and lucide-react import line

5. `frontend/web/src/pages/syllabus/SubjectPage.jsx`
   - FinalExamPrepEntryCard condition (current list of allowed subjects)

6. One existing ComputerApplications chapter file
   - Exact block shapes: teacher-voice(html), gloss-row(word/def),
     quote-block(quote/context), section-head(text), think-box(label/text),
     nav(back/next/nextLabel/practice)

7. One existing ComputerApplications practice file
   - mcq shape: { id, html, options[], answer, hint }
   - short/long shape: { q, ans } — flat questions[], no sections wrapper

Report findings. Wait for confirmation before Phase 1.


## ══════════════════════════════════════════════════════════════════════════════
## PHASE 1 — SYLLABUS + ONBOARDING WIRING (runs only in the FIRST chat)
## ══════════════════════════════════════════════════════════════════════════════

### STEP 1A — syllabus.js

Add subject entry with ALL chapters (not just Batch 1 — the full list):
```js
"SUBJECT_SLUG": {
  label: "SUBJECT_LABEL",
  slug: "SUBJECT_SLUG",
  chapters: [
    // all N chapters here
    // { number: N, title: "...", slug: "chapter-NN-..." }
  ],
},
```

Show diff. Wait for confirm.

### STEP 1B — OnboardingPage.jsx

Add icon import + SUBJECTS entry. Show diff. Wait for confirm.

### STEP 1C — Commit Phase 1

```
git add -A
git commit -m "feat: add SUBJECT_LABEL (YEAR) — syllabus + onboarding"
git push origin master
```

Verify on yadhum.net: subject card appears, chapter list shows all N chapters.
Report. Wait for confirm before starting Batch 1.


## ══════════════════════════════════════════════════════════════════════════════
## PHASE 2+3 — CHAPTER BATCHES (4 chapters per batch)
## ══════════════════════════════════════════════════════════════════════════════
## Each batch = learn content (Phase 2) + practice files (Phase 3) for 4 chapters.
## All files in a batch are built, presented for download, then committed together.
## ══════════════════════════════════════════════════════════════════════════════

### For the current batch (chapters X through Y):

**STEP A — Build learn content files (all 4 chapters)**

For each chapter in this batch, extract content from the PDF and create:
`frontend/web/src/content/CLASS_LEVEL/SUBJECT_FOLDER/chapters/CHAPTER_SLUG.js`

Export shape:
```js
export default {
  eyebrow: "Chapter N · CLASS_LABEL SUBJECT_LABEL",
  title: "Chapter Title",
  author: "",
  pills: ["Theory", "Board Exam Important"],
  tabs: [
    {
      id: "tab-id",
      label: "Tab Label",
      blocks: [ /* blocks */ ],
    },
  ],
}
```

Block rules (CRITICAL):
- teacher-voice: `{ type: "teacher-voice", html: "<p>...</p>" }`
- gloss-row:     `{ type: "gloss-row", word: "Term", def: "Definition" }`
- quote-block:   `{ type: "quote-block", quote: "...", context: "" }`
- section-head:  `{ type: "section-head", text: "..." }`
- think-box:     `{ type: "think-box", label: "⭐ Exam Tip", text: "..." }`
- nav first tab: `{ type: "nav", next: "next-id", nextLabel: "Next: Name →" }`
- nav middle:    `{ type: "nav", back: "prev-id", next: "next-id", nextLabel: "Next: Name →" }`
- nav last tab:  `{ type: "nav", back: "prev-id", practice: true }`
- NEVER use `prev:` — the field is `back:`
- ALWAYS include `nextLabel` when `next` is set

Teaching style:
- Simple English, Tamil word help for difficult terms (🔤)
- gloss-row for every definition
- think-box for real-life examples (🌍), exam tips (⭐), common mistakes (⚠️)

After building all 4 learn files — present each one for download immediately.

---

**STEP B — Build practice files (all 4 chapters)**

For each chapter, extract textbook evaluation questions and create:
`frontend/web/src/content/CLASS_LEVEL/SUBJECT_FOLDER/practice/CHAPTER_SLUG.js`

Filename = chapter slug exactly (NO -practice suffix).

Export shape:
```js
export default {
  meta: {
    subject: "SUBJECT_LABEL — CLASS_LABEL",
    unit: "Chapter N — Chapter Title",
    time: "3.00 hrs",
    totalMarks: 47,   // must equal sum of all parts[].scoreMax
    instructions: "Samacheer Kalvi — Answer all questions",
  },
  parts: [
    {
      id: "p1", navLabel: "Part I — MCQ (20 x 1)", title: "Part I",
      type: "mcq", scoreMax: 20, marksPer: 1,
      sections: [{ label: "Chapter Name", questions: [
        { id: "q1", html: "Question?",
          options: ["a) opt", "b) opt", "c) opt", "d) opt"],
          answer: 0,   // 0-based index
          hint: "Why this is correct." },
      ]}],
    },
    {
      id: "p2", navLabel: "Part II — Short Answers (5 x 2)", title: "Part II",
      type: "short-essay", scoreMax: 10, marksPer: 2,
      questions: [    // flat array — NO sections wrapper
        { q: "Question text", ans: "Model answer." },
      ],
    },
    {
      id: "p3", navLabel: "Part III — Brief Answers (3 x 3)", title: "Part III",
      type: "short-essay", scoreMax: 9, marksPer: 3,
      questions: [ { q: "...", ans: "..." } ],
    },
    {
      id: "p4", navLabel: "Part IV — Long Essays (2 x 4)", title: "Part IV",
      type: "long-essay", scoreMax: 8, marksPer: 4,
      questions: [ { q: "...", ans: "..." } ],
    },
  ],
}
```

Standard distribution: 20+10+9+8 = 47 marks. Adjust if chapter has fewer questions.

After building all 4 practice files — present each one for download immediately.

---

**STEP C — Commit the batch**

Give this to Claude Code:
```
Create these 8 files (4 learn + 4 practice) for SUBJECT_LABEL Batch N:

Learn files:
  frontend/web/src/content/CLASS_LEVEL/SUBJECT_FOLDER/chapters/chapter-XX-slug.js
  [repeat for all 4]

Practice files:
  frontend/web/src/content/CLASS_LEVEL/SUBJECT_FOLDER/practice/chapter-XX-slug.js
  [repeat for all 4]

Source files are at:
  C:\Projects\TNSchool\Dummy_files\SUBJECT_LABEL\YEAR\

After creating all files, register learn files in registry.js:
  'chapter-XX-slug': () => import('./CLASS_LEVEL/SUBJECT_FOLDER/chapters/chapter-XX-slug'),
  [repeat for all 4]

Verify practiceRegistry glob = ./Class_*/*/practice/*.js (no change needed if already broadened).

Then commit:
git add -A
git commit -m "feat: add SUBJECT_LABEL Chapters X–Y (learn + practice)"
git push origin master

Report commit hash.
```

---

**STEP D — Print resume message for next chat**

After the commit is confirmed, print this EXACTLY (filled in):

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RESUME MESSAGE FOR NEXT CHAT (copy this exactly):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Resume subject master prompt — [SUBJECT_LABEL], Batch [N+1] of [TOTAL_BATCHES].
Chapters [next_start]–[next_end]. Previous batches committed at [commit_hash].
Here is the PDF.

[Upload the PDF again in the next chat]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

If this was the LAST chapter batch, print instead:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALL CHAPTERS DONE. FINAL CHAT MESSAGE (copy this):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Execute Phase 4 (model papers) for [SUBJECT_LABEL].
Subject slug: `[SUBJECT_SLUG]`, Year: `[YEAR]`, Class: [CLASS_NUM].
All [N] chapters committed at [commit_hash].
Here is the PDF.

[Upload the PDF again in the next chat]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```


## ══════════════════════════════════════════════════════════════════════════════
## PHASE 4 — FINAL EXAM PREP / MODEL PAPERS
## ══════════════════════════════════════════════════════════════════════════════
## Runs in its own dedicated chat after all chapter batches are done.
## Uses yadhum_model_papers_master_prompt.md from this project.
## ══════════════════════════════════════════════════════════════════════════════

When the opening message says "Execute Phase 4 (model papers) for [SUBJECT]":

1. Read `yadhum_model_papers_master_prompt.md` from this project
2. Fill in all placeholders from the opening message
3. Execute that prompt's Phase 0 → Phase 1 → Phase 2 in sequence

The model papers prompt will:
- Build 5 model paper data files (one per set, all chapters covered)
- Register in examPaperRegistry.js
- Add metadata to finalExamPrepData.js
- Wire FinalExamPrepPage.jsx with subject lookup
- Add App.jsx routes for final-exam-prep and model-exam
- Extend SubjectPage.jsx FinalExamPrepEntryCard condition:
    subject === 'english' || subject === 'computer-applications' || subject === 'SUBJECT_SLUG'
- Commit and push everything

After deploy verify the full flow:
yadhum.net/YEAR/SUBJECT_SLUG/final-exam-prep → 5 sets visible
View Paper → paper renders
Start Practice → exam loads with MCQ questions


## ══════════════════════════════════════════════════════════════════════════════
## CONSTRAINTS (every phase, every chat)
## ══════════════════════════════════════════════════════════════════════════════

- Do NOT modify English or Computer Applications files
- Do NOT change SubjectPage.jsx, LearnRichPage.jsx, ChapterPracticeExam.jsx logic
- Do NOT use underscores in filenames — kebab-case only
- Do NOT use `prev:` in nav blocks — field is `back:`
- Do NOT omit `nextLabel` when `next` is set in a nav block
- Do NOT add volume:/year:/color:/categories: to chapters[] entries
- Always git add -A (not git add -u)
- Always present files for download BEFORE giving Claude Code the commit prompt


## ══════════════════════════════════════════════════════════════════════════════
## KNOWN ARCHITECTURE FACTS
## ══════════════════════════════════════════════════════════════════════════════

URL PATTERNS:
- /:year/:subject/chapters/:slug          → LessonDetailPage
- /:year/:subject/chapters/:slug/:section → SectionPage → LearnRichPage
- /:year/:subject/chapters/:slug/practice → SectionPage → practice exam
- /:year/:subject/final-exam-prep         → FinalExamPrepPage
- /:year/:subject/final-exam-prep/paper/:id → ExamPaperViewerPage
- /:year/:subject/model-exam/:modelId     → ModelExamPracticePage
- "chapters" is a hardcoded literal :category — never add category field

REGISTRY:
- practiceRegistry glob = ./Class_*/*/practice/*.js (already broadened)
- practice file must be named CHAPTER_SLUG.js (NOT CHAPTER_SLUG-practice.js)
- contentRegistry and practiceRegistry both use chapter slug as key

ROUTING:
- Chapter routes generic — no App.jsx changes needed for new chapters
- Model exam routes hardcoded per subject — must be added in App.jsx (Phase 4)
- ChapterPracticeExam.jsx draft key uses useParams() dynamically (commit 8c6e903)

SUBJECT PAGE:
- isSubjectAllowed() generic — no whitelist to update
- YearPage.jsx data-driven from syllabus.js — no hardcoding
- OnboardingPage.jsx SUBJECTS separate from syllabus.js — update manually
- FinalExamPrepEntryCard condition must be extended for each new subject
- SubjectPage placeholder cards (Coming Soon) already render for chapters[] subjects

EXAM PAPERS:
- Registry key: classNN-SUBJECT_SLUG-model-qa-N
- Named + default export both required in model paper files
- Start Practice button derives route from paperId automatically (commit 17f7c0b)
- finalExamPrepData.js lookup key: 'YEAR-SUBJECT_SLUG'
- ModelPaperListCard basePath: '/YEAR/SUBJECT_SLUG'
