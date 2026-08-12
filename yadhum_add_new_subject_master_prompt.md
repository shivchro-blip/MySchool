# Yadhum — Add New Subject (End-to-End Master Prompt)
# ─────────────────────────────────────────────────────────────────────────────
# HOW TO USE THIS PROMPT:
#
# In a new Claude project chat, upload the subject's PDF and say:
#   "Execute the subject master prompt for [Subject Name].
#    Subject slug: `computer-science`, Year: `plus2`, Class: 12.
#    Here is the PDF."
#
# Claude will read this file from the project, extract chapter information
# from the PDF, and execute all phases automatically.
#
# The following placeholders will be derived from your opening message:
#   SUBJECT_LABEL  — human-readable name (e.g. "Computer Science")
#   SUBJECT_SLUG   — kebab-case (e.g. "computer-science")
#   YEAR           — plus1 or plus2
#   CLASS_LEVEL    — Class_11 or Class_12
#   CLASS_NUM      — 11 or 12
#   SUBJECT_FOLDER — PascalCase (e.g. ComputerScience)
#
# Before starting Phase 1, Claude will:
#   1. Extract the full chapter list from the uploaded PDF
#   2. Propose ICON_NAME, ICON_BG, ICON_COLOR for the onboarding picker
#   3. Show a summary of what it found — wait for your confirmation
# ─────────────────────────────────────────────────────────────────────────────


## ══════════════════════════════════════════════════════════════════════════════
## PRE-PHASE — EXTRACT FROM PDF
## ══════════════════════════════════════════════════════════════════════════════

Before anything else:

1. Extract the full chapter list from the uploaded PDF. For each chapter show:
   - Chapter number
   - Chapter title
   - Proposed slug (kebab-case, e.g. chapter-01-introduction)

2. Propose onboarding picker values:
   - ICON_NAME: pick the best fitting lucide-react icon
   - ICON_BG: light tint hex color
   - ICON_COLOR: accent hex color (used for badges + buttons)

3. Show a summary and wait for my confirmation before Phase 0.


## ══════════════════════════════════════════════════════════════════════════════
## PHASE 0 — RECONNAISSANCE (read-only, no changes)
## ══════════════════════════════════════════════════════════════════════════════

Before touching anything, read these files and confirm their current state.
Do NOT make any changes in this phase.

1. `frontend/web/src/data/syllabus.js`
   - Show me the exact shape of one entry in the `chapters[]` array from the
     plus1.maths subject (keys: number, title, slug — no volume for non-Maths)
   - Confirm the YEAR key (plus1/plus2) exists and show its sibling subjects

2. `frontend/web/src/content/registry.js`
   - Show the exact pattern used to register one Class_12 English chapter:
     key = lesson slug, value = dynamic import arrow function
   - Confirm it is a plain LOADERS object literal (not a Set/Map)

3. `frontend/web/src/content/practiceRegistry.js`
   - Show the current glob pattern
   - Confirm it already uses `./Class_*/*/practice/*.js` (broadened glob)
     If it still says `./Class_*/English/practice/*.js`, flag it — we fix it
     in Phase 2

4. `frontend/web/src/pages/OnboardingPage.jsx`
   - Show the full SUBJECTS array (slug, name, Icon, bg, color shape)
   - Show the lucide-react import line
   - Note the current list of subject slugs so we place the new one correctly

5. `frontend/web/src/pages/syllabus/SubjectPage.jsx`
   - Confirm UNIT_STYLE constant (color, light values)
   - Confirm ChapterRow component exists (with enabled Practice button)
   - Confirm the chapters[] branch renders ChapterRow in a 2-column grid
   - Find the condition that controls FinalExamPrepEntryCard rendering.
     It currently reads something like:
       subject === 'english' || subject === 'computer-applications'
     Show the exact current condition — we will extend it in Phase 4.

6. One existing Class_12 content chapter file
   (e.g. frontend/web/src/content/Class_12/ComputerApplications/chapters/chapter-01-multimedia.js)
   - Show the exact top-level export shape:
     export default { eyebrow, title, author, pills[], tabs[] }
   - Show one full tab shape: { id, label, blocks[] }
   - List every block type used and its field names:
     teacher-voice → html (NOT text), wrapped in <p>...</p>
     quote-block   → quote, context (both required, context can be "")
     gloss-row     → word, def (NOT term/meaning)
     section-head  → text
     think-box     → label, text
     nav           → back (tab id or omit), next (tab id or omit),
                     nextLabel (string, required if next set),
                     practice (bool, true on last tab only)

7. One existing Class_12 practice file
   (e.g. frontend/web/src/content/Class_12/ComputerApplications/practice/chapter-01-multimedia.js)
   - Show exact export shape:
     export default { meta: { subject, unit, time, totalMarks, instructions },
                      parts[] }
   - Show one mcq part shape and one short-essay/long-essay part shape
   - Confirm field names:
     mcq questions:        { id, html, options[], answer, hint }
       options are strings like "a) option text" (letter prefix included)
       answer is 0-based integer index
     short/long questions: { q, ans }   (field is `q` not `html`)
     short/long parts use flat questions:[] (NO sections wrapper)

Report all findings. Wait for my confirmation before Phase 1.


## ══════════════════════════════════════════════════════════════════════════════
## PHASE 1 — SYLLABUS + ONBOARDING WIRING
## ══════════════════════════════════════════════════════════════════════════════
## One step at a time. Show diff, wait for confirm, then apply.
## ══════════════════════════════════════════════════════════════════════════════

### STEP 1A — syllabus.js: Add subject entry

Open `frontend/web/src/data/syllabus.js`.
Inside the `YEAR:` key, after the last existing subject entry, add:

```js
"SUBJECT_SLUG": {
  label: "SUBJECT_LABEL",
  slug: "SUBJECT_SLUG",
  chapters: [
    // { number: N, title: "Chapter Title", slug: "chapter-NN-slug" }
    // No volume, no category, no color, no year fields
  ],
},
```

Rules:
- Keys are exactly: label, slug, chapters[]
- Each chapter: number (integer), title (string), slug (kebab-case)
- slug at subject level must match SUBJECT_SLUG exactly

Show diff. Wait for confirm before Step 1B.

---

### STEP 1B — OnboardingPage.jsx: Add subject to picker

Open `frontend/web/src/pages/OnboardingPage.jsx`.

1. Add ICON_NAME to the existing lucide-react import line (if not already there)
2. Add to SUBJECTS array after the last existing non-Science subject, before Science:
   ```js
   { slug: 'SUBJECT_SLUG', name: 'SUBJECT_LABEL', Icon: ICON_NAME,
     bg: 'ICON_BG', color: 'ICON_COLOR' }
   ```

Show diff of both changes. Wait for confirm.

---

### STEP 1C — Commit Phase 1

```
git add -A
git commit -m "feat: add SUBJECT_LABEL subject (YEAR) — syllabus + onboarding wiring"
git push origin master
```

After Cloudflare deploys, verify:
- `yadhum.net/YEAR` → SUBJECT_LABEL card appears
- `yadhum.net/YEAR/SUBJECT_SLUG` → flat chapter list with all chapters
- New signup onboarding Step 2 → SUBJECT_LABEL appears as pickable subject

Report screenshots. Wait for confirm before Phase 2.


## ══════════════════════════════════════════════════════════════════════════════
## PHASE 2 — CHAPTER CONTENT FILES
## ══════════════════════════════════════════════════════════════════════════════
## Build ALL chapters from the PDF, then commit all at once.
## ══════════════════════════════════════════════════════════════════════════════

For each chapter, extract content from the PDF and create a learn content file.

### Content file structure (per chapter):

File path:
`frontend/web/src/content/CLASS_LEVEL/SUBJECT_FOLDER/chapters/CHAPTER_SLUG.js`

Export shape:
```js
export default {
  eyebrow: "Chapter N · CLASS_LABEL SUBJECT_LABEL",
  title: "Chapter Title",
  author: "",
  pills: ["Theory", "Board Exam Important"],   // adjust as relevant
  tabs: [
    {
      id: "tab-id",
      label: "Tab Label",
      blocks: [
        // teacher-voice, section-head, gloss-row, think-box,
        // quote-block, nav blocks
      ],
    },
  ],
}
```

Block rules (CRITICAL — shapes confirmed in Phase 0):
- teacher-voice: `{ type: "teacher-voice", html: "<p>...</p>" }`
- gloss-row:     `{ type: "gloss-row", word: "Term", def: "Definition" }`
- quote-block:   `{ type: "quote-block", quote: "...", context: "" }`
- section-head:  `{ type: "section-head", text: "..." }`
- think-box:     `{ type: "think-box", label: "⭐ Exam Tip", text: "..." }`
- nav (non-last tab): `{ type: "nav", back: "prev-tab-id", next: "next-tab-id", nextLabel: "Next: Tab Name →" }`
- nav (last tab):     `{ type: "nav", back: "prev-tab-id", practice: true }`
- nav (first tab):    `{ type: "nav", next: "next-tab-id", nextLabel: "Next: Tab Name →" }`

Teaching style:
- Use simple English with Tamil word help for difficult terms
- Every important concept: gloss-row for definition, think-box for real-life example
- Mark exam-important facts with ⭐ Exam Tip think-boxes
- Mark common mistakes with ⚠️ Common Mistake think-boxes
- Mark Tamil help with 🔤 Tamil Word Help think-boxes

After building all chapter files, register ALL of them in registry.js:
```js
'CHAPTER_SLUG': () => import('./CLASS_LEVEL/SUBJECT_FOLDER/chapters/CHAPTER_SLUG'),
```

Then commit everything at once:
```
git add -A
git commit -m "feat: add SUBJECT_LABEL — all N chapters (learn content)"
git push origin master
```

After deploy, spot-check 3 chapters. Report. Wait for confirm before Phase 3.


## ══════════════════════════════════════════════════════════════════════════════
## PHASE 3 — CHAPTER PRACTICE FILES
## ══════════════════════════════════════════════════════════════════════════════
## Build ALL practice files from the PDF evaluation questions, commit all at once.
## ══════════════════════════════════════════════════════════════════════════════

For each chapter, extract the textbook evaluation questions and build a practice file.

### Practice file structure (per chapter):

File path:
`frontend/web/src/content/CLASS_LEVEL/SUBJECT_FOLDER/practice/CHAPTER_SLUG.js`

IMPORTANT: filename = chapter slug exactly (no -practice suffix).

Export shape:
```js
export default {
  meta: {
    subject: "SUBJECT_LABEL — CLASS_LABEL",
    unit: "Chapter N — Chapter Title",
    time: "3.00 hrs",
    totalMarks: 47,          // must equal sum of all parts[].scoreMax
    instructions: "Samacheer Kalvi — Answer all questions",
  },
  parts: [
    {
      id: "p1",
      navLabel: "Part I — MCQ (20 x 1)",
      title: "Part I — Objective Type",
      type: "mcq",
      scoreMax: 20,
      marksPer: 1,
      sections: [
        {
          label: "Section Name",
          questions: [
            {
              id: "q1",
              html: "Question text",
              options: ["a) option", "b) option", "c) option", "d) option"],
              answer: 0,    // 0-based integer index of correct answer
              hint: "Explanation of why this is correct.",
            },
          ],
        },
      ],
    },
    {
      id: "p2",
      navLabel: "Part II — Short Answers (5 x 2)",
      title: "Part II — Short Answer Questions",
      type: "short-essay",
      scoreMax: 10,
      marksPer: 2,
      questions: [          // flat array, NO sections wrapper
        { q: "Question text", ans: "Model answer." },
      ],
    },
    {
      id: "p3",
      navLabel: "Part III — Brief Answers (3 x 3)",
      title: "Part III — Brief Answer Questions",
      type: "short-essay",
      scoreMax: 9,
      marksPer: 3,
      questions: [
        { q: "Question text", ans: "Model answer." },
      ],
    },
    {
      id: "p4",
      navLabel: "Part IV — Long Essays (2 x 4)",
      title: "Part IV — Detailed Answer Questions",
      type: "long-essay",
      scoreMax: 8,
      marksPer: 4,
      questions: [
        { q: "Question text", ans: "Detailed model answer." },
      ],
    },
  ],
}
```

Standard marks distribution (adjust per chapter's actual evaluation):
- Part I MCQ: 20 questions × 1 mark = 20
- Part II Short: 5 questions × 2 marks = 10
- Part III Brief: 3 questions × 3 marks = 9
- Part IV Long: 2 questions × 4 marks = 8
- Total = 47 (adjust scoreMax values if chapter has different distribution)

After building all practice files, confirm practiceRegistry glob:
`import.meta.glob('./Class_*/*/practice/*.js')` — no change needed if already broadened.

Then commit everything at once:
```
git add -A
git commit -m "feat: add SUBJECT_LABEL — all N chapters (practice exams)"
git push origin master
```

After deploy, spot-check 3 chapters. Report. Wait for confirm before Phase 4.


## ══════════════════════════════════════════════════════════════════════════════
## PHASE 4 — FINAL EXAM PREP (Model Papers)
## ══════════════════════════════════════════════════════════════════════════════

After all chapters are live, build the Final Exam Prep section.
This uses the yadhum_model_papers_master_prompt.md in this project.
Execute that prompt now with:
  SUBJECT_LABEL  = SUBJECT_LABEL
  SUBJECT_SLUG   = SUBJECT_SLUG
  YEAR           = YEAR
  CLASS_NUM      = CLASS_NUM
  PAPER_SLUG_PREFIX = classXX-SUBJECT_SLUG
  EXPORT_PREFIX     = classXXSUBJECT_FOLDER
  TOTAL_CHAPTERS    = N
  CHAPTER_TITLES    = [all chapter titles]

The model papers prompt will:
1. Build 5 model paper data files covering all chapters
2. Register them in examPaperRegistry.js
3. Add metadata to finalExamPrepData.js
4. Wire FinalExamPrepPage.jsx
5. Add App.jsx routes
6. Update SubjectPage.jsx FinalExamPrepEntryCard condition to include SUBJECT_SLUG
7. Commit and push everything

After deploy, verify the Final Exam Prep page and practice flow work end-to-end.


## ══════════════════════════════════════════════════════════════════════════════
## PHASE 5 — FINAL VERIFICATION
## ══════════════════════════════════════════════════════════════════════════════

After all phases are complete:

1. `yadhum.net/YEAR` → SUBJECT_LABEL card appears alongside other subjects
2. `yadhum.net/YEAR/SUBJECT_SLUG` → all chapters in 2-column grid, Final Exam Prep card visible
3. `yadhum.net/YEAR/SUBJECT_SLUG/final-exam-prep` → 5 model paper sets appear
4. Click View Paper on Set 1 → paper renders correctly
5. Click Start Practice on Set 1 → practice exam loads with MCQ questions
6. Spot-check 3 random chapter Learn pages → tabs render
7. Spot-check 3 random chapter Practice pages → exam loads, Review & Submit works
8. New account signup → SUBJECT_LABEL appears in onboarding Step 2

Report screenshots. Fix any issues before declaring subject complete.


## ══════════════════════════════════════════════════════════════════════════════
## CONSTRAINTS (apply to every phase)
## ══════════════════════════════════════════════════════════════════════════════

- Do NOT modify any existing English or Computer Applications files
- Do NOT change SubjectPage.jsx, LearnRichPage.jsx, LessonDetailPage.jsx,
  ChapterPracticeExam.jsx rendering logic — only add data
- Do NOT use underscores in content filenames — use hyphens (kebab-case)
- Do NOT add volume:/year:/subject:/color:/categories: to chapters[] entry
- Match exact code style of existing ComputerApplications files
- git add -A (not git add -u) to capture new untracked files
- Never skip Phase 0 reconnaissance — shapes change between sessions


## ══════════════════════════════════════════════════════════════════════════════
## KNOWN ARCHITECTURE FACTS (do not re-investigate these)
## ══════════════════════════════════════════════════════════════════════════════

URL PATTERNS:
- /:year/:subject/chapters/:chapterSlug          → LessonDetailPage
- /:year/:subject/chapters/:chapterSlug/:section → SectionPage → LearnRichPage
- /:year/:subject/chapters/:chapterSlug/practice → SectionPage → practice exam
- /:year/:subject/final-exam-prep                → FinalExamPrepPage
- /:year/:subject/final-exam-prep/paper/:id      → ExamPaperViewerPage
- /:year/:subject/model-exam/:modelId            → ModelExamPracticePage
- "chapters" is a hardcoded literal string as :category — do NOT add category field

REGISTRY FACTS:
- practiceRegistry glob = ./Class_*/*/practice/*.js (already broadened)
- contentRegistry key = chapter slug = filename without extension
- practice file must be named CHAPTER_SLUG.js (NOT CHAPTER_SLUG-practice.js)
- Both registries use the same slug as the key

ROUTING FACTS:
- App.jsx routes are generic (/:year/:subject/...) — no new chapter routes needed
- getSubjectChapters() in LessonDetailPage handles chapters[] automatically
- Model exam routes ARE hardcoded per subject — must be added in App.jsx for each new subject
- ChapterPracticeExam.jsx draft key uses useParams() year/subject dynamically (commit 8c6e903)

SUBJECT PAGE FACTS:
- isSubjectAllowed() in userAccess.js is generic — no whitelist to update
- YearPage.jsx subject cards are data-driven from syllabus.js — no hardcoding
- OnboardingPage.jsx SUBJECTS array is SEPARATE from syllabus.js — must update manually
- SubjectPage.jsx FinalExamPrepEntryCard condition currently reads:
    subject === 'english' || subject === 'computer-applications'
  MUST extend this for every new subject:
    subject === 'english' || subject === 'computer-applications' || subject === 'SUBJECT_SLUG'

EXAM PAPER FACTS:
- examPaperRegistry.js key pattern for model papers: classNN-SUBJECT_SLUG-model-qa-N
- Both named export AND default export required in each model paper file
- "Start Practice" button in ExamPaperViewerPage derives route from paperId using
  regex match on -model-qa-N suffix — works automatically for any subject slug
- finalExamPrepData.js lookup key pattern: 'YEAR-SUBJECT_SLUG'
- ModelPaperListCard basePath prop must be '/YEAR/SUBJECT_SLUG'
- Annual papers (Previous Year Papers) — leave as Coming Soon placeholder until
  actual past papers are available

NAV BLOCK FACTS (critical — wrong shape causes broken navigation):
- Non-last tab: { type: "nav", back: "prev-id", next: "next-id", nextLabel: "Next: Name →" }
- First tab:    { type: "nav", next: "next-id", nextLabel: "Next: Name →" }
- Last tab:     { type: "nav", back: "prev-id", practice: true }
- Do NOT use `prev:` field — the field is `back:` (not `prev:`)
- Do NOT omit nextLabel when next is set — causes broken/empty button
