# Yadhum — Model Q&A Paper Generation Prompt (Full Detail)
# ═══════════════════════════════════════════════════════════════════════════════
#
# HOW TO USE:
# In a new chat, upload the subject PDF and say:
#
#   "Generate model Q&A papers for [Subject Name].
#    Subject slug: `physics`, Year: `plus2`, Class: 12.
#    All 18 chapters are already live on Yadhum.
#    Here is the PDF."
#
# This prompt is fully self-contained — every structural detail, exact field
# names, and complete JS examples are included. No prior context needed.
# ═══════════════════════════════════════════════════════════════════════════════


## STEP 0 — DERIVE VARIABLES FROM OPENING MESSAGE

From the user's opening message, derive these variables used throughout:

  SUBJECT_LABEL     e.g. "Physics"
  SUBJECT_SLUG      e.g. "physics"           (kebab-case, from user message)
  YEAR              e.g. "plus2"             (plus1 or plus2)
  CLASS_NUM         e.g. "12"               (11 or 12)
  CLASS_LABEL       e.g. "Class 12"
  CLASS_LEVEL       e.g. "Class_12"          (underscore version)
  PAPER_SLUG_PREFIX e.g. "class12-physics"   (= "class" + CLASS_NUM + "-" + SUBJECT_SLUG)
  EXPORT_PREFIX     e.g. "class12Physics"    (= "class" + CLASS_NUM + PascalCase subject)
  SUBJECT_FOLDER    e.g. "Physics"           (PascalCase — used in file paths)

Then scan the uploaded PDF and list all chapter titles with proposed slugs.
Wait for user confirmation before building any files.


## STEP 1 — BUILD 5 MODEL PAPER JS FILES

Build all 5 files IN THIS CHAT (not Claude Code).
Present each file for download immediately after building it.
Claude Code only handles wiring (Step 2) — not content generation.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
### FILE NAMES

  class12PhysicsModelQA1.js   (EXPORT_PREFIX + "ModelQA" + set_number + ".js")
  class12PhysicsModelQA2.js
  class12PhysicsModelQA3.js
  class12PhysicsModelQA4.js
  class12PhysicsModelQA5.js

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
### COMPLETE FILE STRUCTURE (copy this exactly for every set)

CRITICAL: Every file MUST have BOTH a named export AND a default export.
The registry uses the named export. The viewer uses the default export.

─────────────────────────────────────────────────────────────────────────────
// File: class12PhysicsModelQA1.js

export const class12PhysicsModelQA1 = {
  // ── Top-level metadata ──────────────────────────────────────────────────
  paperId:      "class12-physics-model-qa-1",
  // paperId format: PAPER_SLUG_PREFIX + "-model-qa-" + N
  // e.g. "class12-physics-model-qa-1" for Set 1

  title:        "Model Q&A 1",
  classLabel:   "Class 12",           // CLASS_LABEL
  subject:      "Physics",            // SUBJECT_LABEL (human-readable)
  duration:     "3.00 Hours",
  maximumMarks: 90,
  totalPages:   6,

  // ── pages[] — viewer render tree ────────────────────────────────────────
  // Always 2 pages.
  // Page 1 = paper header + Part I (all 20 MCQ questions)
  // Page 2 = Parts II, III, IV (short, brief, long)
  // First block of page 1: paper_header
  // Second block of page 1: metadata_row
  // Third block of page 1: instructions
  // Last block of every page: footer_note

  pages: [
    {
      pageNumber: 1,
      blocks: [

        {
          type: "paper_header",
          content: "CLASS XII — PHYSICS\nMODEL QUESTION PAPER — SET 1",
          // Two lines separated by \n
          // First line: "CLASS XII — SUBJECT_LABEL" (use actual CLASS_NUM)
          // Second line: "MODEL QUESTION PAPER — SET N"
        },

        {
          type: "metadata_row",
          duration: "3.00 Hours",
          maximumMarks: 90,
          totalPages: 6,
        },

        {
          type: "instructions",
          content: "Answer all questions. Figures in the margin indicate full marks.",
        },

        { type: "part_heading", content: "PART - I" },

        { type: "section_heading", content: "Choose the correct answer (20 × 1 = 20)" },

        // mcq_question — repeat 20 times (questionId "1" through "20")
        {
          type: "mcq_question",
          questionId: "1",        // string, "1" through "20"
          marks: 1,
          content: "The SI unit of electric charge is:",
          options: [
            "Ampere",             // 4 options as plain strings
            "Coulomb",            // NO letter prefix (A/B/C/D added by renderer)
            "Volt",
            "Ohm",
          ],
        },
        // ... questions 2 through 20 here ...

        { type: "footer_note", content: "[ Turn over" },
        // "[ Turn over" on page 1, "- o O o -" on page 2
      ],
    },

    {
      pageNumber: 2,
      blocks: [

        // PART II — Short Answers (5 questions × 2 marks = 10 marks)
        { type: "part_heading", content: "PART - II" },
        { type: "section_heading", content: "Short Answer Questions (5 × 2 = 10)" },

        // question — for short/brief/long answer questions
        // questionId continues from MCQ (starts at "21")
        { type: "question", questionId: "21", marks: 2, content: "Define electric flux. State its SI unit." },
        { type: "question", questionId: "22", marks: 2, content: "..." },
        { type: "question", questionId: "23", marks: 2, content: "..." },
        { type: "question", questionId: "24", marks: 2, content: "..." },
        { type: "question", questionId: "25", marks: 2, content: "..." },

        // PART III — Brief Answers (5 questions × 3 marks = 15 marks)
        { type: "part_heading", content: "PART - III" },
        { type: "section_heading", content: "Brief Answer Questions (5 × 3 = 15)" },

        { type: "question", questionId: "26", marks: 3, content: "State and explain Gauss's law." },
        { type: "question", questionId: "27", marks: 3, content: "..." },
        { type: "question", questionId: "28", marks: 3, content: "..." },
        { type: "question", questionId: "29", marks: 3, content: "..." },

        // or_question — use for at least one question in Part III
        // Use for ALL questions in Part IV
        {
          type: "or_question",
          questionId: "30",
          marks: 3,
          optionA: { content: "Explain the superposition principle of electric forces." },
          optionB: { content: "Derive the expression for electric field due to a dipole on axial line." },
        },

        // PART IV — Long Essays (5 questions × 9 marks = 45 marks)
        { type: "part_heading", content: "PART - IV" },
        { type: "section_heading", content: "Long Essay Questions (5 × 9 = 45)" },

        // In Part IV: each main question is followed by an or_question with same questionId
        { type: "question", questionId: "31", marks: 9, content: "Derive Coulomb's law from Gauss's law..." },
        {
          type: "or_question", questionId: "31", marks: 9,
          optionA: { content: "Alternative question A for same marks" },
          optionB: { content: "Alternative question B for same marks" },
        },

        { type: "question", questionId: "32", marks: 9, content: "..." },
        { type: "or_question", questionId: "32", marks: 9, optionA: { content: "..." }, optionB: { content: "..." } },

        { type: "question", questionId: "33", marks: 9, content: "..." },
        { type: "or_question", questionId: "33", marks: 9, optionA: { content: "..." }, optionB: { content: "..." } },

        { type: "question", questionId: "34", marks: 9, content: "..." },
        { type: "or_question", questionId: "34", marks: 9, optionA: { content: "..." }, optionB: { content: "..." } },

        { type: "question", questionId: "35", marks: 9, content: "..." },
        { type: "or_question", questionId: "35", marks: 9, optionA: { content: "..." }, optionB: { content: "..." } },

        { type: "footer_note", content: "- o O o -" },
      ],
    },
  ],

  // ── practice{} — practice exam data ─────────────────────────────────────
  practice: {
    meta: {
      subject:      "Physics — Class XII",
      // format: "SUBJECT_LABEL — CLASS_LABEL"

      unit:         "Model Q&A 1 — Full Syllabus",
      time:         "3.00 hrs",
      totalMarks:   90,
      // CRITICAL: totalMarks MUST equal exact sum of all parts[].scoreMax
      // 20 + 10 + 15 + 45 = 90

      instructions: "Answer all questions",
      answerSource: "Model answers prepared from Tamil Nadu Samacheer Kalvi Class 12 Physics textbook (2024 Edition).",
      // format: "Model answers prepared from Tamil Nadu Samacheer Kalvi CLASS_LABEL SUBJECT_LABEL textbook (2024 Edition)."
    },

    parts: [

      // ════════════════════════════════════════════════════════════
      // PART I — MCQ
      // type: "mcq"
      // Uses sections[] wrapper — this is the ONLY part type that does
      // ════════════════════════════════════════════════════════════
      {
        id:          "p1",
        navLabel:    "Part I — MCQ (20 × 1)",
        title:       "Part I — Objective Type",
        type:        "mcq",
        scoreMax:    20,
        marksPer:    1,
        instruction: "Choose the correct answer.",
        sections: [
          {
            label: "All Chapters",
            // Can have multiple section groups if desired:
            // { label: "Electrostatics", questions: [...] },
            // { label: "Current Electricity", questions: [...] },
            questions: [
              {
                id:          "q1",
                html:        "The SI unit of electric charge is:",
                // html field — plain text is fine, HTML tags allowed if needed
                options: [
                  "a) Ampere",      // MUST include letter prefix "a) ", "b) ", "c) ", "d) "
                  "b) Coulomb",
                  "c) Volt",
                  "d) Ohm",
                ],
                answer:      1,     // 0-based integer: 0=a, 1=b, 2=c, 3=d
                officialKey: "b",  // letter string matching the answer index
              },
              // ... 19 more questions (q2 through q20) ...
            ],
          },
        ],
      },

      // ════════════════════════════════════════════════════════════
      // PART II — Short Answers
      // type: "short-essay"
      // Uses FLAT questions[] — NO sections wrapper
      // ════════════════════════════════════════════════════════════
      {
        id:          "p2",
        navLabel:    "Part II — Short Answers (5 × 2)",
        title:       "Part II — Short Answer Questions",
        type:        "short-essay",
        scoreMax:    10,
        marksPer:    2,
        instruction: "Answer in 2–3 sentences.",
        questions: [           // flat array, NO sections wrapper
          {
            q:           "Define electric flux. State its SI unit.",
            // q = question text (plain string, no html tags)
            ans:         "Electric flux is the total number of electric field lines passing perpendicularly through a surface. Mathematically φ = E·A·cosθ where θ is the angle between the electric field and the area vector. SI unit: Nm²C⁻¹.",
            // ans = complete model answer — board exam quality
            officialKey: "Chapter 1",
            // officialKey = chapter reference for student
          },
          // ... 4 more questions (5 total for Part II) ...
        ],
      },

      // ════════════════════════════════════════════════════════════
      // PART III — Brief Answers
      // Exact same shape as Part II — flat questions[], type "short-essay"
      // ════════════════════════════════════════════════════════════
      {
        id:          "p3",
        navLabel:    "Part III — Brief Answers (5 × 3)",
        title:       "Part III — Brief Answer Questions",
        type:        "short-essay",
        scoreMax:    15,
        marksPer:    3,
        instruction: "Answer in 4–6 sentences.",
        questions: [
          {
            q:           "State and explain Gauss's law.",
            ans:         "Gauss's law states that the total electric flux through any closed surface (Gaussian surface) equals the total charge enclosed divided by ε₀. Mathematically: φ = Q_enclosed/ε₀. It is a fundamental law of electrostatics that simplifies the calculation of electric fields for symmetric charge distributions like infinite planes, cylinders, and spheres.",
            officialKey: "Chapter 1",
          },
          // ... 4 more (5 total for Part III) ...
        ],
      },

      // ════════════════════════════════════════════════════════════
      // PART IV — Long Essays
      // type: "long-essay"
      // Flat questions[] — NO sections wrapper
      // Each question has optional id field
      // ════════════════════════════════════════════════════════════
      {
        id:          "p4",
        navLabel:    "Part IV — Long Essays (5 × 9)",
        title:       "Part IV — Long Essay Questions",
        type:        "long-essay",
        scoreMax:    45,
        marksPer:    9,
        instruction: "Answer in detail.",
        questions: [
          {
            id:          "l1",
            q:           "Derive Coulomb's law from Gauss's law and explain its significance.",
            ans:         "Derivation:\nStep 1: Consider a point charge +Q placed at the origin.\nStep 2: Draw a Gaussian spherical surface of radius r centered on the charge.\nStep 3: By symmetry, E is constant in magnitude over the surface and directed radially outward.\nStep 4: Apply Gauss's law: φ = E × 4πr² = Q/ε₀\nStep 5: Therefore E = Q/(4πε₀r²)\nStep 6: Force on charge q₀ at distance r: F = q₀E = Qq₀/(4πε₀r²)\nThis is Coulomb's law: F = kQq/r² where k = 1/(4πε₀) = 9×10⁹ Nm²C⁻².\n\nSignificance:\n1. Inverse square law — force decreases with square of distance.\n2. Valid for point charges or spherically symmetric charge distributions.\n3. Force is along the line joining the charges.\n4. Like charges repel, unlike charges attract.",
            officialKey: "Chapter 1",
          },
          // ... 4 more long essays (5 total for Part IV) ...
        ],
      },

    ],
  },
}   // end of named export object

export default class12PhysicsModelQA1
// Default export uses the SAME variable name as the named export
─────────────────────────────────────────────────────────────────────────────

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
### MARKS VERIFICATION (run this check before finalizing each file)

  Part I  MCQ:        scoreMax = 20   (20 questions × 1 mark)
  Part II Short:      scoreMax = 10   (5 questions × 2 marks)
  Part III Brief:     scoreMax = 15   (5 questions × 3 marks)
  Part IV Long:       scoreMax = 45   (5 questions × 9 marks)
  ─────────────────────────────────────────────────────────────────
  SUM:                          90  ← meta.totalMarks must equal this exactly

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
### QUESTION DISTRIBUTION ACROSS 5 SETS

Every set must cover ALL chapters. Rotate the heavy focus per set:

  Set 1: Chapters 1–4   heavy in Part IV long essays | fresh MCQs for all chapters
  Set 2: Chapters 4–8   heavy in Part IV             | no repeated MCQs from Set 1
  Set 3: Chapters 7–12  heavy in Part IV             | no repeated MCQs from Sets 1–2
  Set 4: Chapters 10–15 heavy in Part IV             | no repeated MCQs from Sets 1–3
  Set 5: Chapters 13–18 heavy in Part IV             | no repeated MCQs from Sets 1–4

Rules:
  - 100 unique MCQ questions across all 5 sets (20 per set, zero repeats)
  - Long essay topics rotate — no chapter gets Part IV in all 5 sets
  - Part II and Part III questions also vary across sets
  - or_question in pages[] must match the difficulty of the main question

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
### MODEL ANSWER QUALITY STANDARDS

Practice answers (in practice.parts[].questions[].ans) must be:
  - Board exam quality — enough for a student to get full marks
  - Structured: numbered steps, formulas, definitions, examples where relevant
  - Complete: address every sub-part the question asks
  - Part II short answers: 3–5 sentences
  - Part III brief answers: 5–8 sentences
  - Part IV long essays: 10–20 sentences, organized by sub-topic, use \n for line breaks

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
### OPTION FORMAT — CRITICAL DIFFERENCE BETWEEN pages[] AND practice[]

In pages[] mcq_question blocks:
  options are plain strings with NO letter prefix (renderer adds A/B/C/D):
  options: ["Coulomb", "Ampere", "Volt", "Ohm"]

In practice[] MCQ questions:
  options MUST include letter prefix "a) ", "b) ", "c) ", "d) ":
  options: ["a) Coulomb", "b) Ampere", "c) Volt", "d) Ohm"]
  answer: 1        (0-based index: a=0, b=1, c=2, d=3)
  officialKey: "b" (letter string matching the index)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
### BUILD AND DOWNLOAD ORDER

1. Build Set 1 fully → present for download → wait for user confirmation
2. Build Set 2 → present → confirm
3. Build Set 3 → present → confirm
4. Build Set 4 → present → confirm
5. Build Set 5 → present → confirm
6. After all 5 confirmed downloaded, print the Claude Code wiring prompt (Step 2 below)


## STEP 2 — WIRE INTO YADHUM (Claude Code prompt — print this after all 5 files downloaded)

After the user confirms all 5 files are downloaded, print the following
Claude Code prompt verbatim (with all CAPS placeholders filled in):

────────────────────────────────────────────────────────────────────────────────
I have 5 new model paper files for [SUBJECT_LABEL] Final Exam Prep.

Files are at:
  C:\Projects\TNSchool\Dummy_files\[SUBJECT_LABEL]\[YEAR]\[EXPORT_PREFIX]ModelQA1.js
  C:\Projects\TNSchool\Dummy_files\[SUBJECT_LABEL]\[YEAR]\[EXPORT_PREFIX]ModelQA2.js
  C:\Projects\TNSchool\Dummy_files\[SUBJECT_LABEL]\[YEAR]\[EXPORT_PREFIX]ModelQA3.js
  C:\Projects\TNSchool\Dummy_files\[SUBJECT_LABEL]\[YEAR]\[EXPORT_PREFIX]ModelQA4.js
  C:\Projects\TNSchool\Dummy_files\[SUBJECT_LABEL]\[YEAR]\[EXPORT_PREFIX]ModelQA5.js

Before making any changes, read these files to confirm exact shapes:
  1. frontend/web/src/data/examPapers/class12ComputerApplicationsModelQA1.js
     Confirm: named export + default export, paperId, pages[], practice{meta, parts[]}
  2. frontend/web/src/data/examPaperRegistry.js
     Confirm key pattern: 'class12-computer-applications-model-qa-N'
  3. frontend/web/src/data/finalExamPrepData.js
     Confirm shape of Computer Applications model papers array (id, label, title, modelId)
  4. frontend/web/src/pages/syllabus/FinalExamPrepPage.jsx
     Confirm lookup key pattern: 'plus2-computer-applications'
  5. frontend/web/src/pages/syllabus/SubjectPage.jsx
     Find current FinalExamPrepEntryCard condition (list of allowed subject slugs)
  6. frontend/web/src/App.jsx
     Find Computer Applications final-exam-prep and model-exam routes

Then execute all steps below without confirmation between steps:

STEP A — Copy 5 model paper files
Read each file from Dummy_files above. Verify each matches
class12ComputerApplicationsModelQA1.js shape exactly:
  - named export (const EXPORT_PREFIXModelQAN = { ... })
  - default export (export default EXPORT_PREFIXModelQAN)
  - fields: paperId, title, classLabel, subject, duration, maximumMarks, totalPages
  - pages[]: [{pageNumber, blocks:[]}]
  - practice{}: {meta{subject,unit,time,totalMarks,instructions,answerSource}, parts[]}
If any field differs, adapt to match.
Copy to:
  frontend/web/src/data/examPapers/[EXPORT_PREFIX]ModelQA1.js
  frontend/web/src/data/examPapers/[EXPORT_PREFIX]ModelQA2.js
  frontend/web/src/data/examPapers/[EXPORT_PREFIX]ModelQA3.js
  frontend/web/src/data/examPapers/[EXPORT_PREFIX]ModelQA4.js
  frontend/web/src/data/examPapers/[EXPORT_PREFIX]ModelQA5.js

STEP B — Register in examPaperRegistry.js
Add 5 entries to LOADERS object after Computer Applications entries:
  '[PAPER_SLUG_PREFIX]-model-qa-1': () => import('./examPapers/[EXPORT_PREFIX]ModelQA1'),
  '[PAPER_SLUG_PREFIX]-model-qa-2': () => import('./examPapers/[EXPORT_PREFIX]ModelQA2'),
  '[PAPER_SLUG_PREFIX]-model-qa-3': () => import('./examPapers/[EXPORT_PREFIX]ModelQA3'),
  '[PAPER_SLUG_PREFIX]-model-qa-4': () => import('./examPapers/[EXPORT_PREFIX]ModelQA4'),
  '[PAPER_SLUG_PREFIX]-model-qa-5': () => import('./examPapers/[EXPORT_PREFIX]ModelQA5'),

STEP C — Add metadata array in finalExamPrepData.js
Add a new exported array in the same shape as the Computer Applications array.
Name it following the same convention used for Computer Applications.
5 entries, each with:
  { id: '[PAPER_SLUG_PREFIX]-model-qa-N',
    label: 'Set N',
    title: 'Full Syllabus Model Paper — Set N',
    modelId: '[PAPER_SLUG_PREFIX]-model-qa-N' }
Export the array.

STEP D — Wire FinalExamPrepPage.jsx
Add [SUBJECT_LABEL] to the subject lookup map.
Key: '[YEAR]-[SUBJECT_SLUG]'
basePath for ModelPaperListCard: '/[YEAR]/[SUBJECT_SLUG]'
No annual papers — pass empty array [] for the papers prop.

STEP E — Add App.jsx routes
Add immediately after Computer Applications routes:
  /[YEAR]/[SUBJECT_SLUG]/final-exam-prep
    → <FinalExamPrepPage classLevel="[YEAR]" subjectSlug="[SUBJECT_SLUG]" />
  /[YEAR]/[SUBJECT_SLUG]/final-exam-prep/paper/:paperId
    → <ExamPaperViewerPage backPath="/[YEAR]/[SUBJECT_SLUG]/final-exam-prep" />
  /[YEAR]/[SUBJECT_SLUG]/model-exam/:modelId
    → <ModelExamPracticePage classLevel="[YEAR]" />

STEP F — Update SubjectPage.jsx FinalExamPrepEntryCard condition
Find the condition: subject === 'english' || subject === 'computer-applications' || ...
Add [SUBJECT_SLUG] to it.
Replace the "Final Exam Prep — Coming Soon" placeholder for [SUBJECT_SLUG]
with the real FinalExamPrepEntryCard:
  dest="/[YEAR]/[SUBJECT_SLUG]/final-exam-prep"
  classLabel="[CLASS_LABEL] [SUBJECT_LABEL]"

STEP G — Commit and push
git add -A
git commit -m "feat: add [SUBJECT_LABEL] Final Exam Prep — 5 model papers, routes, subject page card"
git push origin master
Report the commit hash.

STEP H — Static verification (no browser needed)
Trace and confirm:
1. /[YEAR]/[SUBJECT_SLUG] → real FinalExamPrepEntryCard (not Coming Soon)
2. /[YEAR]/[SUBJECT_SLUG]/final-exam-prep → 5 model paper sets visible
3. Practice Set 1 → /[YEAR]/[SUBJECT_SLUG]/model-exam/[PAPER_SLUG_PREFIX]-model-qa-1
   → registry resolves → practice exam data loads
4. View Paper Set 1 → /[YEAR]/[SUBJECT_SLUG]/final-exam-prep/paper/[PAPER_SLUG_PREFIX]-model-qa-1
   → pages render → Start Practice button navigates correctly
Report any issues.
────────────────────────────────────────────────────────────────────────────────


## QUICK REFERENCE — ALL BLOCK TYPES

### pages[] block types and their fields:

  paper_header    content: "CLASS XII — PHYSICS\nMODEL QUESTION PAPER — SET N"
  metadata_row    duration, maximumMarks, totalPages
  instructions    content: "Answer all questions..."
  part_heading    content: "PART - I" / "PART - II" / "PART - III" / "PART - IV"
  section_heading content: "Choose the correct answer (20 × 1 = 20)"
  mcq_question    questionId, marks, content, options[] (NO letter prefix in options)
  question        questionId, marks, content
  or_question     questionId, marks, optionA{content}, optionB{content}
  footer_note     content: "[ Turn over" (page 1) or "- o O o -" (last page)

### practice{} parts and their question shapes:

  type "mcq":
    sections: [{ label, questions: [{ id, html, options[], answer, officialKey }] }]
    options: ["a) text", "b) text", "c) text", "d) text"]  — WITH letter prefix
    answer: 0-based integer (0=a, 1=b, 2=c, 3=d)
    officialKey: "a" / "b" / "c" / "d"

  type "short-essay":
    questions: [{ q, ans, officialKey }]   — flat array, NO sections wrapper
    q: plain string question text
    ans: model answer string

  type "long-essay":
    questions: [{ id, q, ans, officialKey }]  — flat array, id optional
    q: plain string question text
    ans: detailed multi-paragraph model answer, use \n for line breaks


## KNOWN ARCHITECTURE FACTS

- examPaperRegistry.js is a plain LOADERS object: key → () => import(path)
- FinalExamPrepPage lookup key: '[YEAR]-[SUBJECT_SLUG]' (e.g. 'plus2-physics')
- ModelPaperListCard props: papers[], basePath, each paper: {id, label, title, modelId}
- Start Practice button in ExamPaperViewerPage derives the model-exam route
  automatically from paperId using regex — works for any subject (commit 17f7c0b)
- App.jsx model-exam and final-exam-prep routes are per-subject — must add manually
- SubjectPage FinalExamPrepEntryCard condition must be extended for every new subject
- No annual papers → pass [] for the annual papers prop in FinalExamPrepPage
- practice.meta.totalMarks must EXACTLY equal sum of all parts[].scoreMax
