# Content Page Workflow

## Add a new Learn page for any chapter

### Step 1 — Place the HTML file here

Drop the teacher-style HTML file into this folder:

```
exam-coach/Dummy_files/<lesson-name>.html
```

### Step 2 — Run the converter

```bash
cd exam-coach/frontend/web
npm run content -- ../../Dummy_files/<lesson-name>.html <chapter-slug>
```

**Example:**
```bash
npm run content -- ../../Dummy_files/learn_portrait_teacher_style.html the-portrait-of-a-lady
```

The slug must match the database exactly. All +1 General English slugs:

| # | Title | Slug |
|---|-------|------|
| 1 | The Portrait of a Lady | `the-portrait-of-a-lady` |
| 2 | Once Upon a Time | `once-upon-a-time` |
| 3 | After Twenty Years | `after-twenty-years` |
| 4 | The Queen of Boxing | `the-queen-of-boxing` |
| 5 | Confessions of a Born Spectator | `confessions-of-a-born-spectator` |
| 6 | A Shot in the Dark | `a-shot-in-the-dark` |
| 7 | Forgetting | `forgetting` |
| 8 | Lines Written in Early Spring | `lines-written-in-early-spring` |
| 9 | The First Patient | `the-first-patient` |
| 10 | Tight Corners | `tight-corners` |
| 11 | Macavity, the Mystery Cat | `macavity-the-mystery-cat` |
| 12 | With the Photographer | `with-the-photographer` |
| 13 | The Convocation Address | `the-convocation-address` |
| 14 | Everest is not the Only Peak | `everest-is-not-the-only-peak` |
| 15 | The Singing Lesson | `the-singing-lesson` |
| 16 | The Accidental Tourist | `the-accidental-tourist` |
| 17 | The Hollow Crown | `the-hollow-crown` |
| 18 | The Never Never Nest | `the-never-never-nest` |

### Step 3 — Verify

```bash
npm run build
```

Green build = done. The `/learn/<slug>` route now shows the rich content page.

---

## What the script produces

| Output | Description |
|--------|-------------|
| `src/content/chapters/<slug>.js` | All tab content as structured JS data |
| `src/content/registry.js` | Updated — slug mapped to content (idempotent) |

---

## HTML file requirements

The HTML must use these CSS classes (standard teacher-style template):

| Class | Becomes |
|-------|---------|
| `.hero-eyebrow` `.hero-title` `.hero-author` `.pill` | Hero section metadata |
| `.tabs .tab` with `onclick="sw('id', ...)"` | Tab buttons |
| `.panel` with `id="p-{id}"` | Tab panels |
| `.teacher-voice` | Narrative paragraphs (HTML preserved) |
| `.section-head` | Section headings |
| `.think-box` with `.think-label` `.think-text` | Indigo callout boxes |
| `.quote-block` with `.quote-text` `.quote-explain` | Key line blocks |
| `.author-stat` with `.author-stat-label` `.author-stat-val` | Stat cards |
| `.device-block` with `.device-type` `.device-line` `.device-exp` | Literary device cards |
| `.gloss-row` with `.gloss-word` `.gloss-def` `.gloss-eg` | Glossary rows |
| `.btn-row` with `onclick="sw('id', ...)"` | Tab navigation buttons |
| `<span class="highlight">` | Amber callout inline text |

Back/Next buttons are auto-detected from the `sw('tabId', ...)` onclick pattern.
Practice buttons are auto-detected from `sendPrompt('Give me practice questions...')`.

---

## Future formats (planned)

| Format | Status |
|--------|--------|
| HTML (teacher-style template) | ✅ Supported now |
| JSON | Planned |
| Markdown | Planned |
