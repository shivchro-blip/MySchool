# Exam Coach — Claude Code Prompts (Revised)

Eight focused prompts. Paste them into Claude Code one at a time and verify each step before moving on.

**Run order rule:** Project Context (read first, prepend to every prompt) → 01 → 02 are foundation, don't skip. 03–07 can be run in any order, but only after 02 is **fully verified** — every screen depends on shared components from 02. Run 08 last.

**Before running any screen prompt (03–07):** confirm these exports exist and are error-free: `ScoreRing` (acting as `GoalRing`), `StreakChip`, `MasteryDots`, `Card`, `Sidebar`, `Button`, `TwoColLayout`, `ThreeColLayout`, `RailPanel`. If any are missing or produce import errors, fix prompt 02 before proceeding. Running a screen prompt against a broken 02 will silently degrade output.

---

## Project Context (prepend to every prompt below)

This block replaces the original audit prompt. The audit has already been performed — this is the result. Prepend this entire block to every prompt 01–08 so the LLM has the same ground truth on every run.

```
PROJECT: Exam Coach — a study app for middle & high school students (Tamil Nadu State Board, Plus One General English etc.). Students use it for hours; the visual goal is a CALM, FOCUSED, READABLE study-desk aesthetic — warm off-white background, ink blue single accent, serif for editorial moments. Replace the current saturated-blue + dark-panel + neon-orange-highlight aesthetic.

STACK
- React + Vite + Tailwind CSS (utility-first; tokens are encoded in tailwind.config.js and as CSS variables on :root for runtime overrides)
- Router: React Router v6 (BrowserRouter + Routes)
- State: useState only — no Redux, no Zustand, no Context. Cross-component state lives in route-level components or in custom hooks (useState + fetch internally). Do not introduce a state library.
- HTTP: native fetch wrapper at src/api/client.js
- Auth token: localStorage key `exam_coach_token`
- Dev server: `npm run dev` (Vite). Confirm it starts before any code-changing prompt.

EXISTING COMPONENTS — DO NOT DUPLICATE
src/components/ui/ exports the following. Restyle in place; do not create parallel components with new names.
  - Card             → restyle to new tokens, keep API
  - Button           → restyle, add `accent` and `soft` variants if missing, keep API
  - Input            → restyle, keep API
  - Badge            → this IS the design-system "Tag." When the prompts mention "Tag," use Badge. Do not create Tag.
  - Skeleton         → restyle, keep API. Use this for any loading state work.
  - ScoreRing        → this IS the "GoalRing" the prompts describe. Restyle, do not create GoalRing as a new component. If a different prop name is needed, add it to ScoreRing.
  - LoopStepper      → preserve logic. Restyle only if it appears on a redesigned screen.

EXISTING LAYOUT
src/components/layout/ exports:
  - PageShell        → becomes the entry point that selects between sidebar layout (≥900px) and bottom-nav layout (<900px). Update internals; keep export.
  - TopBar           → restyle, keep API. Used by Reading view and Practice.
  - BottomNav        → this IS the phone bottom tab bar. Do not build a second one in prompt 08. At <600px, BottomNav is the nav; at ≥900px, Sidebar is the nav.

NEW COMPONENTS TO BUILD (these do not exist yet)
  - Sidebar              (desktop nav rail, collapses to icon rail on tablet)
  - StreakChip
  - MasteryDots
  - TwoColLayout, ThreeColLayout, RailPanel  (layout primitives)
  - Eyebrow              (typographic label component)

CANONICAL MOCK FILE
All placeholder values for data not yet wired live in exactly one file: `src/mocks/examCoach.js`. Every entry must have a `// TODO: wire to real <source>` comment naming the eventual source (e.g. `// TODO: wire to /api/progress`). Do not scatter mock files across screens.

ROUTES (verified in audit)
- /                     → Home/Dashboard
- /courses              → NEW merged route (prompt 04). The current /class/:id and /subject/:id redirect here.
- /learn/:chapterId     → Reading view
- /practice/:paperId    → Quiz
- /progress             → NEW (prompt 07)

DATA SOURCES (verified in audit — wire to these, do not hardcode)
- Auth/user: src/auth/useUser.js (returns { name, classLabel, board, avatarUrl })
- Progress: src/api/client.js → getProgress() returns { streakDays, minutesToday, goalMinutes, chaptersDone, chaptersTotal, dailyMinutes:[7], avgScore }
- Course tree: src/api/client.js → getCourses() returns subjects → units → chapters
- Highlights: src/api/client.js → getHighlights(chapterId) / saveHighlight(...)
- Practice: src/api/client.js → getPaper(paperId), submitAnswer(...), submitPaper(...)

TESTS & CHECKS
- Lint: `npm run lint`
- Typecheck: not configured (project is JS, not TS). Skip typecheck steps.
- Tests: `npm test` (runs Vitest where files exist)
- Build: `npm run build`
- Run all four after every code-changing prompt. Report failures separately from visual mismatches.
```

---

## Global safety rules (apply to every prompt below)

These rules are non-negotiable and override any conflicting instruction in an individual prompt:

1. **Commit or stash before every code-changing prompt.** Run `git add -A && git commit -m "pre-redesign checkpoint: [prompt name]"` or `git stash`. If output is wrong, run `git checkout HEAD~1` or `git stash pop` to recover.
2. **Preserve all existing functionality.** Routing, authentication, data fetching, progress tracking, quiz scoring, saved highlights, and audio/listen behavior must not be altered, removed, or broken unless a prompt explicitly says otherwise. Visual refactors only touch presentation layers.
3. **Do not duplicate existing components.** Specifically: do NOT create `GoalRing` (use `ScoreRing`), `Tag` (use `Badge`), `Input` (already exists), or `Skeleton` (already exists), or a second bottom tab bar (use `BottomNav`). The component inventory in Project Context is the single source of truth.
4. **Do not hardcode product data.** Wire from the data sources listed in Project Context. If no source exists for a new element, add the value to `src/mocks/examCoach.js` with a `// TODO: wire to <real source>` comment naming the eventual source.
5. **Run checks after every code-changing prompt.** Run lint, tests, build. Report failures separately from any visual mismatches — do not mark a step complete if checks fail.
6. **Prefer shared layout primitives over page-specific CSS.** Never repeat a fixed rail width or spacing value inline. Reference the layout tokens from prompt 01.
7. **Tailwind is the styling system.** Encode design tokens as CSS variables on `:root` AND mirror them in `tailwind.config.js` so utility classes work (`bg-bg`, `text-ink`, `rounded-md`). Use arbitrary-value syntax `bg-[var(--bg)]` only when a runtime variable is needed and a Tailwind class doesn't exist.
8. **Keep old routes as redirects by default.** Per the audit, `/class/:id` and `/subject/:id` are still linked from existing emails. Preserve them as `<Navigate to="/courses" replace />` redirects. Never delete a route outright.
9. **Do not invent loading, empty, or error states.** Use `Skeleton` for loading per existing patterns. For zero-streak, empty chapter list, failed API, and offline states with no existing handler, leave a `// TODO: <state> state` comment in the markup and do not design a new state.
10. **Dark mode is deferred for all screens.** Do not add dark mode in this redesign. If a dark toggle exists in the codebase, leave it wired but add: `// TODO: dark theme not yet specified — unstyled until unified dark pass`.
11. **Mobile is the primary target.** Most students study on phone. Every screen prompt (03–07) describes the **phone layout first**, then the tablet/desktop expansion. Prompt 08 is a final pass that adds rails and validates breakpoints — it is not where mobile gets bolted on.
12. **All transitions are wrapped in `prefers-reduced-motion`.** Every CSS transition lives inside `@media (prefers-reduced-motion: no-preference) { … }`. Audit prompts 01–07 transitions before running 08.

---

## Table of contents

- [01 — Design tokens](#01--design-tokens-apply-globally)
- [02 — Shared components](#02--shared-components)
- [03 — Home / dashboard](#03--home--dashboard)
- [04 — Course list + Subject overview](#04--course-list--subject-overview-merged)
- [05 — Chapter / Learn (reading view)](#05--chapter--learn-reading-view--most-important)
- [06 — Practice / quiz](#06--practice--quiz)
- [07 — Progress page (new)](#07--progress-page-new)
- [08 — Tablet & desktop expansion + accessibility audit](#08--tablet--desktop-expansion--accessibility-audit)

---

## 01 — Design tokens (apply globally)

> Replace the current color & type system with these tokens. **Safety rules apply — preserve all logic, only change presentation.**

```
[Prepend Project Context block above.]

Apply the following design tokens GLOBALLY using the Tailwind + CSS-variables hybrid pattern. Define hex values on :root for older browsers, override with oklch inside @supports for browsers that support it, and mirror token names in tailwind.config.js so utility classes work.

PATTERN (REQUIRED):
  In src/index.css (or whatever the global stylesheet entry is — confirm before editing):

    :root {
      /* hex fallbacks first — work everywhere */
      --bg: #f5f1eb;
      --bg-2: #faf8f4;
      /* …all hex values… */
    }
    @supports (color: oklch(0 0 0)) {
      :root {
        --bg: oklch(0.965 0.012 80);
        --bg-2: oklch(0.985 0.008 85);
        /* …all oklch values… */
      }
    }

  In tailwind.config.js, theme.extend:

    colors: {
      bg: 'var(--bg)',
      'bg-2': 'var(--bg-2)',
      'bg-sunk': 'var(--bg-sunk)',
      ink: 'var(--ink)',
      'ink-2': 'var(--ink-2)',
      'ink-3': 'var(--ink-3)',
      'ink-4': 'var(--ink-4)',
      accent: 'var(--accent)',
      'accent-soft': 'var(--accent-soft)',
      'accent-ink': 'var(--accent-ink)',
      good: 'var(--good)',
      'good-soft': 'var(--good-soft)',
      'good-ink': 'var(--good-ink)',
      warn: 'var(--warn)',
      'warn-soft': 'var(--warn-soft)',
      pos: 'var(--pos)',
      'pos-soft': 'var(--pos-soft)',
      danger: 'var(--danger)',
      line: 'var(--line)',
      'line-soft': 'var(--line-soft)',
      highlight: 'var(--highlight)',
    },
    spacing: { 1: '4px', 2: '8px', 3: '12px', 4: '16px', 5: '20px', 6: '24px', 7: '32px', 8: '40px', 9: '56px', 10: '72px' },
    borderRadius: { xs: '6px', sm: '10px', md: '14px', lg: '20px', xl: '28px' },
    fontFamily: {
      serif: ['"Source Serif 4"', 'Georgia', 'serif'],
      sans: ['Geist', 'system-ui', '-apple-system', 'sans-serif'],
      mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
    },
    transitionDuration: { fast: '120ms', base: '200ms', slow: '300ms', ring: '600ms' },
    transitionTimingFunction: {
      'soft-out': 'cubic-bezier(0.0, 0.0, 0.2, 1)',
      'soft-in-out': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    },

FONTS
Geist and Geist Mono are NOT on Google Fonts. Load via npm:
  npm install geist
Then in src/main.jsx:
  import 'geist/font/sans';
  import 'geist/font/mono';
Source Serif 4 from Google Fonts via <link> in index.html.
After loading, verify font rendering in browser devtools (Computed → font-family) — do not assume silent fallback to system-ui is acceptable.

COLORS — PAPER theme (default, warm study-desk)

  --bg:          oklch(0.965 0.012 80);     hex #f5f1eb   (warm off-white app background)
  --bg-2:        oklch(0.985 0.008 85);     hex #faf8f4   (card paper)
  --bg-sunk:     oklch(0.945 0.014 78);     hex #ede9e2   (recessed surface)
  --line:        oklch(0.88 0.014 75);      hex #d9d3c8
  --line-soft:   oklch(0.92 0.012 78);      hex #e5e0d8
  --ink:         oklch(0.25 0.018 60);      hex #2e2a24   (primary text)
  --ink-2:       oklch(0.42 0.014 55);      hex #5a5349   (secondary text)
  --ink-3:       oklch(0.48 0.012 55);      hex #6e6760   (tertiary — DARKENED from previous spec to pass WCAG AA on --bg, contrast ≈ 5.0:1)
  --ink-4:       oklch(0.72 0.010 55);      hex #b0a89f   (DECORATION ONLY — never used for text)
  --accent:      oklch(0.45 0.13 245);      hex #3b5ea6   (ink blue — single accent)
  --accent-soft: oklch(0.93 0.04 245);      hex #e0e8f7
  --accent-ink:  oklch(0.35 0.14 245);      hex #2c4880
  --good:        oklch(0.55 0.09 155);      hex #4a8c6a   (sage)
  --good-soft:   oklch(0.93 0.04 155);      hex #e0f0e8
  --good-ink:    oklch(0.40 0.10 155);      hex #2f6850   (NEW — for text on --good-soft, contrast ≈ 5.5:1)
  --warn:        oklch(0.62 0.13 60);       hex #a07030   (caution only — running out of time, unsaved changes)
  --warn-soft:   oklch(0.94 0.05 70);       hex #f5ede0
  --pos:         oklch(0.55 0.13 50);       hex #b86a2a   (NEW — achievement / streak / flame; semantically distinct from --warn)
  --pos-soft:    oklch(0.94 0.05 60);       hex #f4e8d8
  --danger:      oklch(0.50 0.18 25);       hex #b03a30   (NEW — destructive only: delete account, reset progress)
  --highlight:   oklch(0.93 0.07 95);       hex #f5f0c8   (gentle yellow marker)

  CONTRAST CONTRACT (verify before completing this prompt):
    --ink   on --bg        ≥ 12:1   (large body text)
    --ink-2 on --bg        ≥ 7:1
    --ink-3 on --bg        ≥ 4.5:1  (this is the lightest token allowed for any text)
    --ink-4 on --bg        — NO TEXT, decoration only
    --accent on --bg       ≥ 4.5:1
    --accent-ink on --accent-soft ≥ 4.5:1
    --good-ink on --good-soft     ≥ 4.5:1
    --warn   on --warn-soft       ≥ 4.5:1
    --pos    on --pos-soft        ≥ 4.5:1

SPACING (8pt grid — Tailwind class `p-4` = 16px etc., matches tailwind.config above):
  1=4 | 2=8 | 3=12 | 4=16 | 5=20 | 6=24 | 7=32 | 8=40 | 9=56 | 10=72

RADIUS:
  xs=6 | sm=10 | md=14 | lg=20 | xl=28

LAYOUT RAIL WIDTHS — define once, reference everywhere (these go on :root, not in Tailwind config since they're rail-specific):
  --rail-sidebar: 220px;
  --rail-sidebar-collapsed: 64px;
  --rail-left: 220px;
  --rail-right: 280px;
  --rail-subject: 320px;
  --rail-parts: 240px;
  --rail-map: 240px;

MOTION:
  --duration-fast: 120ms;
  --duration-base: 200ms;
  --duration-slow: 300ms;
  --duration-ring: 600ms;
  --ease-out:    cubic-bezier(0.0, 0.0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);

  Rules:
    • Interactive (hover, active, focus): fast / ease-out
    • Sidebar collapse, sheet open/close: base / ease-in-out
    • ScoreRing stroke: ring / ease-out
    • Nothing else animates unless this list is updated.
    • All transitions wrapped in @media (prefers-reduced-motion: no-preference) { … }.

SUBJECT COLOR GENERATION — STABLE BY ID
Do NOT use index-based hue generation. Hash the subject ID so colors are stable when subjects are reordered or added.

  function subjectHue(subjectId) {
    let sum = 0;
    for (let i = 0; i < subjectId.length; i++) sum = (sum + subjectId.charCodeAt(i) * (i + 1)) % 300;
    return 30 + sum;  // 30°–330°, skipping warn band
  }

  Active state:  oklch(0.50 0.10 H)
  Hover state:   oklch(0.55 0.08 H)
  Hex fallback:  precompute and store on the subject record at build time, OR generate at runtime via culori (npm i culori — small, tree-shakable). Do not approximate by hand.

USAGE RULES
  UI chrome (buttons, nav, labels, body of cards) → font-sans
  Eyebrow labels, mono numbers, codes, captions → font-mono
  Chapter titles, hero headlines, body of reading view, hero numbers → font-serif

HARD RULES:
  • ONLY touch color and typography CSS. Do not alter component logic, event handlers, data fetching, routing, or state management.
  • Replace the saturated blue app background with bg-bg. Replace dark panels and purple gradient cards with bg-bg-2 + 1px inset border-line-soft.
  • Replace neon-orange highlight text with span elements: bg-highlight rounded-[2px].
  • Body text: 18px Source Serif 4, line-height 1.65, color var(--ink). Never smaller than 13px anywhere.
  • Eyebrow labels: 11px Geist Mono, uppercase, letter-spacing 0.12em, color var(--ink-3).
  • Single accent only — var(--accent). No purple gradients, no bright pink.
  • Do not remove or rename any existing CSS class referenced in component or test files.

After applying:
1. Run: npm run lint, npm test, npm run build. Report failures — do not proceed if any fail.
2. Open the dev server and verify manually:
   • Background is warm off-white (not blue or black). Pass/fail.
   • Body text renders in Source Serif 4 (not system fallback) — confirm in devtools Computed pane. Pass/fail.
   • A primary button uses var(--ink) background. Pass/fail.
   • Run an automated contrast check: open devtools Accessibility → CSS Overview, or paste each of the contrast pairs in the contract above into a contrast checker. Report any pair below its target. Pass/fail per pair.
   Do not proceed if any of these fail.
```

---

## 02 — Shared components

> Refactor or build shared building blocks. **Do not replace component logic — only update markup and styles. All existing props, callbacks, and data bindings must remain intact.**

```
[Prepend Project Context block.]

Use the existing components listed in Project Context and build only the new ones. The full mapping:

RESTYLE IN PLACE (existing — do not duplicate):
  Card       — bg-bg-2, rounded-md, 1px inset border-line-soft, padding sm/md/lg/xl = 12/16/24/32. No heavy shadows.
  Button     — pill (rounded-full). Variants: primary, secondary, accent, ghost, soft. Sizes sm/md/lg = 28/36/44px. Min touch target 44px on mobile (use padding, not height reduction). Preserve onClick, disabled, aria-label, type props.
  Input      — restyle borders + focus ring to var(--accent), 2px outline, 2px offset.
  Badge      — this is the design-system "Tag." Tones: neutral, accent, good, warn, pos. 11px pill.
  Skeleton   — restyle to bg-bg-sunk shimmer, do not change API.
  ScoreRing  — this acts as "GoalRing" everywhere the prompts mention it. Update visuals: 96px SVG, stroke 7px, track var(--line), value var(--accent), transition var(--duration-ring) var(--ease-out) wrapped in prefers-reduced-motion. Center: serif 26px value + mono uppercase 10.5px caption. Add `caption` prop if the existing API doesn't support a custom center label, but do NOT rename to GoalRing.
  LoopStepper — preserve logic. Restyle borders/colors to new tokens only if visible on a redesigned screen.
  TopBar     — restyle, keep API. Hairline bottom border, transparent or bg-bg.
  BottomNav  — restyle, keep API. 64px tall, bg-bg-2, 1px top border-line-soft, safe-area-inset-bottom padding. 4 icons: Home / Courses / Practice / Progress.
  PageShell  — update internals: at ≥900px render Sidebar + content, at <900px render content + BottomNav. Keep export. This is the canonical layout entry point for every screen.

BUILD NEW (these do not exist in src/components/ui/ or src/components/layout/):
  Sidebar         — desktop nav rail (var(--rail-sidebar)). Logo: rounded-[5px] accent square + serif "Exam Coach". Nav: Home, Courses, Practice, Progress with line icons (1.5px stroke). Active: bg-bg-sunk pill + text-ink + 600 weight. Inactive: text-ink-2, hover bg-bg-sunk. Bottom: 32px round avatar + name + "Class XI · TN Board" subtitle, separated by hairline, wired from useUser(). At <900px: collapse to var(--rail-sidebar-collapsed) icon-only rail with hover/tap tooltips. At <600px: hide entirely (BottomNav takes over).

  StreakChip      — bg-pos-soft text-pos rounded-full px-2 py-1, flame icon (line, 1.5px), "{n}-day streak". Wire streak from getProgress().streakDays. (Note: uses --pos NOT --warn — streaks are achievements, not warnings.)

  MasteryDots     — 5 dots, 6×6px rounded; filled = bg-good, empty = bg-line. 3px gap. Prop: `level` (0–5).

  Eyebrow         — <span> with font-mono uppercase tracking-[0.12em] text-[11px] text-ink-3. Prop: children.

  TwoColLayout    — flex row. Props: { leftWidth: string, children: [left, right] }. leftWidth accepts a CSS var or px string. Right column is 1fr.

  ThreeColLayout  — Props: { leftWidth, rightWidth, children: [left, center, right] }. Left + 1fr center + right.

  RailPanel       — scrollable column. Props: { width: string, border: 'left'|'right'|'none', padding: string, children }. Width accepts a CSS var. Renders the appropriate 1px solid border-line-soft on the chosen side.

ICONS — use lucide-react (already in package.json per audit; verify before adding). 1.5–1.6px stroke (lucide default), 18px default size. No filled icons.

After refactoring:
1. Run npm run lint, npm test, npm run build. Report failures — do not proceed if any fail.
2. Open the dev server and manually verify:
   • Sidebar renders at correct width with nav labels visible at ≥900px. Pass/fail.
   • A primary Button is pill-shaped with bg-ink. Pass/fail.
   • A Card shows the inset border (not a drop shadow). Pass/fail.
   • ScoreRing renders with the SVG ring visible and center text present. Pass/fail.
3. Confirm these exports import error-free (write a one-line smoke import in src/__smoke__/components.smoke.js):
   ScoreRing, StreakChip, MasteryDots, Card, Sidebar, Button, Badge, Input, Skeleton, TwoColLayout, ThreeColLayout, RailPanel, Eyebrow, PageShell, TopBar, BottomNav.
   List any that fail to import.
```

---

## 03 — Home / dashboard

> Redesign Home. **Phone layout described first; tablet/desktop expansion follows. Visual changes only — do not alter data fetching or navigation handlers.**

```
[Prepend Project Context block.]

PRE-CHECK: Confirm these imports resolve without errors: ScoreRing, StreakChip, MasteryDots, Card, Sidebar, BottomNav, PageShell, TwoColLayout, Badge, Skeleton. If any fail, stop and fix prompt 02 first.

Dark mode: covered by global rule 10 — do not add or change dark mode in this step.

DATA: Wire all values from src/auth/useUser.js and src/api/client.js → getProgress() and getCourses(). Anything not yet covered goes in src/mocks/examCoach.js with a `// TODO: wire to <real source>` comment.

GREETING — DERIVED, NOT HARDCODED:
  • Salutation derived from new Date().getHours():
      0–4   → "Up late, {name}."
      5–11  → "Good morning, {name}."
      12–17 → "Good afternoon, {name}."
      18–23 → "Good evening, {name}."
  • Date eyebrow uses Intl.DateTimeFormat with the user's locale:
      new Intl.DateTimeFormat(navigator.language, { weekday: 'long', day: 'numeric', month: 'short' }).format(new Date())

LOCKED CHAPTER UX — INLINE DISCLOSURE, NOT TOOLTIP:
  Locked rows render with opacity 0.6, lock icon (lucide Lock, ink-3), cursor-not-allowed at row level. On click, expand a one-line message INLINE under the row:
    "Finish {prevChapterTitle} to unlock this."
  The message is a div that toggles via useState in the row component. Do NOT use a tooltip (touch-unreliable), do NOT use a toast, do NOT use a modal. Auto-collapse after 5s OR on next click anywhere.

═══════════════════════════════════════════════
PHONE LAYOUT (default, <900px) — DESIGN THIS FIRST
═══════════════════════════════════════════════

Wrapper: PageShell (renders BottomNav at this width).
Main padding: px-5 pt-6 pb-8 (20px / 24px / 40px). Background: bg-bg.

GREETING ROW (stacked):
  • Eyebrow with derived date.
  • H1 28px serif (mobile-tuned from 34px desktop): the derived salutation.
  • Subline 14.5px text-ink-2: "{N} chapters from finishing {currentUnit}." {N} bold and text-ink. Wire from progress + course data.
  • StreakChip on its own row beneath the subline (no search button on phone — search lives in TopBar of inner pages).

CONTINUE CARD (full-width):
  • Eyebrow "Continue · {unit} · {section}".
  • H2 22px serif chapter title.
  • Author + chapter no + "~{N} min left".
  • 6px progress bar, accent fill, % from data.
  • 2 buttons in a single row: Resume (primary, flex-1), Practice (secondary, flex-1). Listen demoted to a ghost icon button to the right.
  • Wire all handlers — do not replace logic.

GOAL CARD (full-width, stacked under Continue):
  • Eyebrow "Today's goal".
  • Row: ScoreRing (left) + "{N} minutes to go" + "Adjust" soft sm button (right).
  • 3 stats below as a 3-column grid: streak, avg score, chapters done.

SPACED REVIEW ROW (bg-bg-sunk):
  • Card count + 3 word chips.
  • "Start review" primary sm button. Wire to existing review route.

CHAPTER LIST:
  • Section header.
  • Single rounded container, hairlines between rows.
  • Row layout: number badge + title (serif 16px) + small progress bar + MasteryDots + single "Open" button (which routes based on chapter state — Learn for in-progress/next, Practice for done). On phone, two buttons per row would crowd the layout — keep one and let chapter state drive the action.
  • Locked rows: inline disclosure pattern above.

═══════════════════════════════════════════════
TABLET / DESKTOP EXPANSION (≥900px)
═══════════════════════════════════════════════

PageShell renders Sidebar instead of BottomNav. Wrap content in TwoColLayout with leftWidth = var(--rail-sidebar).

Main padding: p-7 → p-8 (32–40px).

GREETING ROW becomes horizontal: H1 grows to 34px serif. StreakChip + 36px round search button on the right.

HERO GRID becomes 2 cards side-by-side at 1.5fr 1fr (gap-4):
  Continue card adds:
    • 3 buttons in one row: Resume (primary), Practice (secondary), Listen (ghost).
    • Subtle chapter-number watermark, 4% opacity, 140px serif, absolute-positioned bottom-right of card.
  Goal card adds:
    • "Adjust goal" full label instead of "Adjust".

CHAPTER LIST adds Practice button alongside Open at ≥900px (two buttons per row become viable).

After changes:
1. Run npm run lint, npm test, npm run build. Report failures — do not proceed.
2. Manually verify in browser (test at 380px AND 1280px):
   • Greeting salutation matches the current hour. Pass/fail at both widths.
   • StreakChip shows real value from getProgress().streakDays. Pass/fail.
   • Chapter list renders rows from real getCourses() data. Pass/fail.
   • Locked row shows inline disclosure on click (not a tooltip). Pass/fail.
   • At 380px, hero cards are stacked. At 1280px, side-by-side. Pass/fail.
```

---

## 04 — Course list + Subject overview (merged)

> Merge two screens into one. **Phone-first. Keep old routes as redirects — do not delete them.**

```
[Prepend Project Context block.]

PRE-CHECK: Confirm imports resolve: Card, Sidebar, PageShell, TwoColLayout, ThreeColLayout, RailPanel, Badge. If any fail, stop and fix prompt 02.

Dark mode: covered by global rule 10.

ROUTE HANDLING:
  • Add /courses as the new merged route.
  • Old routes /class/:id and /subject/:id render <Navigate to="/courses" replace />.
  • Preserve any analytics or tracking calls already firing on those old routes — wrap the Navigate in an effect that fires the same event before redirect.

DATA: Wire subject list, unit list, and progress from getCourses() and getProgress(). Subject color hue from subjectHue(subject.id) per the hash rule in prompt 01. Do not hardcode names, counts, or progress.

═══════════════════════════════════════════════
PHONE LAYOUT (<900px)
═══════════════════════════════════════════════

Layout: PageShell (BottomNav). Single column.

SUBJECT STRIP (top, horizontal scroll):
  • Eyebrow "Class XI · TN Board" — from useUser().
  • Below: horizontal scrollable strip of subject pills (h-9, px-4, rounded-full). Active: bg-bg-2 1px inset border-line + colored 4px left bar in subjectHue. Inactive: bg-bg-sunk text-ink-2.
  • Selected subject persists in URL search param (`?subject=english`) so refresh / share works.

SUBJECT DETAIL (below strip):
  • Breadcrumb single line, text-ink-3 mono 11px.
  • H1 28px serif (subject name).
  • 12px text-ink-2 description (max 2 lines, line-clamp-2).
  • Stats row (3 cols): units count, texts count, progress %.
  • Units list as cards. Current unit: 1.5px inset ring-accent. Tap routes to existing chapter list route.

═══════════════════════════════════════════════
TABLET / DESKTOP (≥900px)
═══════════════════════════════════════════════

Layout: PageShell with Sidebar. Then ThreeColLayout: leftWidth = var(--rail-sidebar) (sidebar already rendered by PageShell, so the inner layout is TwoColLayout) | leftWidth = var(--rail-subject) for subject rail | 1fr detail.

Reframe: PageShell renders Sidebar at this width. Inside, use TwoColLayout with leftWidth = var(--rail-subject) for subject rail | 1fr for detail.

SUBJECT RAIL (RailPanel, width=var(--rail-subject), border=right, padding=p-6):
  • Eyebrow "Class XI · TN Board".
  • H2 22px serif "Your subjects".
  • Vertical list of subjects. Active: bg-bg-2 + 1px inset border-line. Hue dot (10px) on each row in subjectHue(subjectId).

SUBJECT DETAIL (right column, scrolls, padding p-7 → p-8):
  • Breadcrumb row.
  • H1 grows to 40px serif.
  • Description allowed up to 3 lines.
  • Stats row in larger card with serif numbers (28px).
  • Units list in a 2-col grid at ≥1200px.

After changes:
1. Verify old routes redirect: hit /class/11 and /subject/english manually — confirm both land on /courses with the right subject preselected (via search param). Pass/fail per route.
2. Run npm run lint, npm test, npm run build. Report failures.
3. Manually verify at 380px AND 1280px:
   • Subject list renders from real getCourses(). Pass/fail.
   • Selecting a subject updates the URL and detail view. Pass/fail.
   • At 380px, layout is single column with horizontal subject strip. At 1280px, two columns with vertical subject rail. Pass/fail.
   • Subject hue is stable: refresh the page, confirm each subject keeps the same hue. Pass/fail.
```

---

## 05 — Chapter / Learn (reading view) — most important

> Replace the visual layer of the reading view. **Phone-first. The reading view has complex interaction logic — preserve all of it.**

```
[Prepend Project Context block.]

PRE-CHECK: Confirm imports resolve: Card, Sidebar, PageShell, TopBar, TwoColLayout, ThreeColLayout, RailPanel, Skeleton. If any fail, stop and fix prompt 02.

Dark mode: covered by global rule 10.

CRITICAL PRESERVATION RULES FOR THIS SCREEN:
  • Do not remove or rewrite any handler related to: highlight saving, highlight rendering, audio playback, scroll position tracking, section progress updates, recall/quiz answer submission, bookmark saving.
  • Keep all existing component props and data bindings intact.
  • If the existing highlight system applies a CSS class to spans, keep that class — add the new visual style (bg-highlight) to that class instead of replacing the span structure.
  • If "Why this matters" or "Pause · Recall" exist as components, restyle — do not rewrite.
  • Listen / Save buttons in TopBar must remain wired to existing handlers.

PAUSE · RECALL vs QUICK CHECK — SEMANTICALLY DISTINCT:
  • Pause · Recall is REFLECTIVE: free-text or short-answer self-check, no grading, no correctness. Lives inline in the reader column. Surface: bg-bg-sunk, no border accent.
  • Quick Check is GRADED: multiple choice, has correct/wrong feedback. Lives in the right rail (desktop) or in a bottom sheet (phone). Surface: bg-accent-soft, distinct from Pause · Recall.
  Treat them as different artifacts. Visual difference must be preserved across breakpoints.

DROP-CAP — SCRIPT-AWARE:
  Detect the first paragraph's script. Apply CSS drop-cap (`::first-letter`) only when first character matches Latin range (\u0000-\u024F).
  For Tamil (\u0B80-\u0BFF) and other non-Latin scripts, do NOT apply drop-cap — render the paragraph normally. Add a small comment in the component: `// drop-cap suppressed for non-Latin scripts to avoid float misalignment`.

═══════════════════════════════════════════════
PHONE LAYOUT (<900px)
═══════════════════════════════════════════════

Wrapper: PageShell (BottomNav).

TOP BAR: Back arrow (preserve handler) → chapter title (truncated, 14px serif) → Listen icon (ghost, preserve handler) → Save icon (ghost, preserve handler). No breadcrumb at this width.

SECTIONS DRAWER:
  Section list lives in a bottom sheet opened by a "Sections" button below the TopBar OR a sticky in-page TOC pinned to the top of the reader column (collapsible disclosure). Pick the in-page TOC — it's discoverable without an extra tap. Active section: 600 weight + 2px left bar accent.

READER COLUMN (full-width minus 20px horizontal padding):
  • H1 32px Source Serif 4 (mobile-tuned from 44px desktop).
  • Body: 18px Source Serif 4, line-height 1.65, text-ink. font-feature-settings: "liga","onum".
  • Drop-cap on first paragraph (Latin only): `::first-letter { float: left; font-size: 48px; line-height: 0.85; padding-top: 4px; padding-right: 8px; font-weight: 600; }`. Smaller than desktop's 64px to fit narrow column.
  • Highlights: bg-highlight rounded-[2px]. Apply to existing highlight class.
  • "Why this matters" aside: bg-bg-2 rounded-[12px] card, 3px left border-accent. Restyle existing.
  • "Pause · Recall" card: bg-bg-sunk rounded-[14px]. Wire to existing handler.
  • Prev / Next section buttons full-width stacked, mt-8.

QUICK CHECK & EXTRAS — STICKY ICON STRIP:
  Right rail content (Quick check, Highlights count, Author at a glance, Glossary) collapses into a sticky icon strip on the right edge of the screen at 80% from top, 4 small round icon buttons. Tapping each opens a bottom sheet with that one section's content.
  Bottom sheet pattern: lazy-load via React.lazy + Suspense, BUT prefetch the chunk on viewport-enter of the icon strip (not on first tap) — use IntersectionObserver. This avoids the first-tap latency.
  Quick Check bottom sheet uses bg-accent-soft surface so it visually reads different from the Pause · Recall inline (bg-bg-sunk).

═══════════════════════════════════════════════
TABLET (900–1199px)
═══════════════════════════════════════════════

PageShell renders Sidebar (collapsed icon rail at this range).
ThreeColLayout: leftWidth = var(--rail-left) for sections rail | 1fr reader | NO right rail (right rail content lives behind a "Companion" button in TopBar that opens a slide-in sheet — same lazy-load + viewport-enter prefetch as phone).

SECTIONS RAIL (RailPanel left):
  • Eyebrow "Sections". Section list wired to existing data.
  • Active section: bg-bg-sunk + 600 weight + 2px left border-accent.
  • Reading time card at bottom.

READER COLUMN (max-width 640px, centered, padding p-8 clamp(24px, 6vw, 80px)):
  • H1 grows to 44px Source Serif 4.
  • Drop-cap grows to 64px.
  • Otherwise identical to phone reader.

═══════════════════════════════════════════════
DESKTOP (≥1200px)
═══════════════════════════════════════════════

ThreeColLayout: leftWidth = var(--rail-left) | 1fr reader (max-w 640px centered) | rightWidth = var(--rail-right) for Companion rail.

RIGHT RAIL (RailPanel right):
  • Eyebrow "While you read".
  • "Author at a glance" card.
  • "{n} highlights saved" — wire count + last quote from getHighlights().
  • Quick check — bg-accent-soft.
  • Glossary tap-throughs.

Note: Companion button in TopBar is hidden at ≥1200px (rail is visible).

After changes:
1. Manually verify these interactions still work at 380px AND 1280px:
   • Save a highlight — persists on reload. Pass/fail.
   • Tap Listen — audio fires. Pass/fail.
   • Advance to next section — section progress updates. Pass/fail.
   • Submit a Pause · Recall answer — existing handler fires. Pass/fail.
   • Open Quick check (bottom sheet on phone, rail on desktop) and submit — grading fires. Pass/fail.
2. Run npm run lint, npm test, npm run build. Report failures.
3. Manually verify:
   • Body text renders in Source Serif 4 at 18px on bg-bg. Pass/fail.
   • Drop-cap appears on first paragraph for Latin chapters; absent for Tamil chapters (test by switching chapter language). Pass/fail.
   • Highlighted text shows gentle yellow background (no neon orange). Pass/fail.
   • Pause · Recall and Quick check are visually distinguishable (bg-bg-sunk vs bg-accent-soft). Pass/fail.
```

---

## 06 — Practice / quiz

> Redesign the quiz screen. **Phone-first. Preserve all scoring, answer submission, timer, and paper-submission handlers.**

```
[Prepend Project Context block.]

PRE-CHECK: Confirm imports resolve: Card, Sidebar, PageShell, TopBar, ThreeColLayout, RailPanel, Badge, LoopStepper. If any fail, stop and fix prompt 02.

Dark mode: covered by global rule 10.

CRITICAL PRESERVATION RULES:
  • Do not rewrite or remove: answer selection handlers, score calculation, timer logic, paper submission handler, question navigation, answer state (correct/wrong/unanswered).
  • Wire all question data, answer states, score, timer, and part metadata from getPaper(paperId).
  • Option tiles must keep existing onClick handlers and selected/correct/wrong state bindings.

PERFORMANCE — BUDGET ANDROID:
  Wrap the OptionTile component in React.memo with a custom equality fn that compares { selected, correct, optionId }. Wrap onClick handlers passed to options in useCallback in the parent question component. Without this, a 50-question paper re-renders all options on every state change and feels laggy on low-end devices.

QUESTION MAP STATE COLORS (5 distinct, learnable):
  correct  → bg-good-soft text-good-ink
  answered → bg-accent-soft text-accent-ink
  wrong    → bg-warn-soft text-warn
  current  → bg-ink text-bg-2
  untouched → bg-bg + 1px border-line-soft text-ink-3

═══════════════════════════════════════════════
PHONE LAYOUT (<900px)
═══════════════════════════════════════════════

Wrapper: PageShell (BottomNav hidden during quiz to avoid accidental nav loss — confirm with audit; if BottomNav must remain visible, add a confirm dialog on tab change while quiz is active. Otherwise hide for the duration.).

TOP BAR: Back (existing handler, prompts confirm if quiz in progress) → chapter title 14px serif. Right: Time (mono) → "Submit" primary sm.

PARTS STRIP (horizontal scroll, just below TopBar):
  Pills, one per part, with answered count "/ total" small. Active: bg-bg-sunk + 1px inset border-line. Tap scrolls questions to that part.

QUESTIONS STREAM (full-width minus 20px padding):
  Score bar fixed at top of stream (sticky), bg-bg-2 with 1px bottom border-line-soft. Wire from existing score state.
  Question cards: bg-bg-2 rounded-md p-4. H3 question text in serif 16px.
  Option tiles in 1-column grid (1×4) — DO NOT use 2×2 on phone, the labels truncate.
  Correct option: bg-good-soft + 1px border-good + check icon.
  Wrong option: bg-warn-soft + 1px border-warn + x icon.
  Explanation strip: text-good-ink on bg-good-soft (uses --good-ink for AA contrast).

QUESTION MAP — BOTTOM SHEET:
  Floating "Map" button bottom-right, 44px round, bg-ink text-bg-2. Opens bottom sheet with the question map grid (5×n) + timer at top of sheet. Lazy-load + viewport-enter prefetch pattern (same as Companion sheet in prompt 05).

═══════════════════════════════════════════════
TABLET (900–1199px)
═══════════════════════════════════════════════

PageShell renders collapsed Sidebar.
ThreeColLayout: leftWidth = var(--rail-parts) for parts list | 1fr questions | NO map rail (Map button in TopBar opens bottom sheet, lazy-loaded).

PARTS LIST (RailPanel left):
  Vertical list. Progress hairline under each part wired to answered count. Active: bg-bg-sunk + 1px inset border-line.

QUESTIONS STREAM (max-w 720px, padding p-7):
  Same as phone but option tiles can use 2-column grid (2×2) when option text is short — detect option max length, fall back to 1×4 if any option > 40 chars.

═══════════════════════════════════════════════
DESKTOP (≥1200px)
═══════════════════════════════════════════════

ThreeColLayout: leftWidth = var(--rail-parts) | 1fr questions | rightWidth = var(--rail-map) for question map.

QUESTION MAP (RailPanel right):
  Grid of tiles using the 5-state color grammar above. Timer mono at the top.

After changes:
1. Manually verify at 380px AND 1280px:
   • Selecting an answer updates the question map tile to the correct status color. Pass/fail.
   • Timer continues counting while answering. Pass/fail.
   • Submit paper button fires existing handler. Pass/fail.
   • At 380px, options render 1-column. At 1280px, parts list + map both visible. Pass/fail.
   • Performance: scroll through 30 questions on a throttled "Slow 4G + 4× CPU slowdown" devtools profile and confirm no jank > 100ms during option selection. Pass/fail.
2. Run npm run lint, npm test, npm run build. Report failures.
3. Manually verify:
   • Background is warm off-white (not black). Pass/fail.
   • Option tile state colors match grammar. Pass/fail.
   • Parts list progress hairline reflects real answered counts. Pass/fail.
```

---

## 07 — Progress page (new)

> Add a new /progress page. **Phone-first. Wire all values from existing analytics — do not hardcode.**

```
[Prepend Project Context block.]

PRE-CHECK: Confirm imports resolve: Card, Sidebar, PageShell, TwoColLayout, Badge, Skeleton. If any fail, stop and fix prompt 02.

Dark mode: covered by global rule 10.

DATA FIRST — useProgress() CUSTOM HOOK:
  Before building UI, create src/hooks/useProgress.js that fetches all progress data in ONE place (single fetch, single useState). This avoids prop drilling and keeps the useState-only constraint clean. Pattern:

    export function useProgress() {
      const [state, setState] = useState({ data: null, loading: true, error: null });
      useEffect(() => {
        let mounted = true;
        getProgress().then(data => mounted && setState({ data, loading: false, error: null }))
                     .catch(err => mounted && setState({ data: null, loading: false, error: err }));
        return () => { mounted = false; };
      }, []);
      return state;
    }

  The Progress page consumes useProgress() once at the top and passes slices down as props. Sub-components do not fetch independently.
  The data shape (verified in audit) returns { streakDays, dailyMinutes:[7], dailyMinutes28:[28], avgScore, chaptersDone, chaptersTotal, masteryByUnit:[{ unitId, unitName, percent }], weakTopics:[{ topic, chapter, score, chapterId }], recentPractice:[{ paperId, title, score, date }] }. If any field is missing in the real API, add it to src/mocks/examCoach.js with `// TODO: wire to /api/progress.<field>`.

═══════════════════════════════════════════════
PHONE LAYOUT (<900px)
═══════════════════════════════════════════════

Wrapper: PageShell (BottomNav). Padding: px-5 pt-6 pb-8. Background: bg-bg.

EDITORIAL HEADER:
  • Eyebrow "Last 28 days".
  • H1 28px serif: dynamic headline. Compute trend = sum(dailyMinutes28 last 7) vs sum(prior 7). Choose copy:
      trend > +10%   → "You're studying more this week."
      trend < -10%   → "You've slowed down a bit this week."
      otherwise      → "Steady week of study."
  • 14.5px text-ink-2 paragraph (max 2 lines): summarise avg minutes/day vs last week. Bold the headline number in text-ink.

KPI STRIP (2×2 grid on phone, gap-3):
  Each KPI: bg-bg-2 rounded-md p-3, 1px inset border-line-soft.
    [Eyebrow label] [serif 24px value + mono 11px delta in text-good if positive, text-warn if negative] [11px text-ink-3 sub-caption]
  KPIs: Day streak / Minutes today / Avg score / Chapters done.

DAILY STUDY TIME CHART (full-width Card):
  • Eyebrow "Last 7 days" + serif 16px "Daily study time" + mono "min".
  • 7-column flex grid, height 100px (mobile-tuned from 140px desktop), bars align-items: flex-end. Wire from dailyMinutes (last 7).
  • Past days: bg-ink-2. Today (last col): bg-accent. min-height 4px if > 0; show 2px bg-line stub for rest days.
  • Mono number above each non-zero bar. Day label below in mono 11px.

MASTERY BY UNIT (full-width Card):
  Horizontal bars. Fill: bg-good if > 60%, bg-accent if > 20%, bg-ink-3 otherwise.

WEAK TOPICS (full-width Card):
  Rows bg-bg-sunk rounded-[10px] p-3. Topic / chapter / score. Chevron right routes to /learn/{chapterId}.

RECENT PRACTICE (full-width Card, borderless rows + 1px line-soft dividers):
  "Review →" link routes to existing practice review route.

═══════════════════════════════════════════════
TABLET (900–1199px)
═══════════════════════════════════════════════

PageShell renders Sidebar.
Layout: TwoColLayout, leftWidth = var(--rail-sidebar) | 1fr content. Padding: p-7.

EDITORIAL HEADER: H1 grows to 34px serif. Subline max-w-[580px].

KPI STRIP becomes 4-column grid (repeat(4, 1fr)).

CHART height grows to 140px.

═══════════════════════════════════════════════
DESKTOP (≥1200px)
═══════════════════════════════════════════════

Two-col content row added: 1.4fr (Mastery by unit) | 1fr (Weak topics) — gap-4.

After changes:
1. Run npm run lint, npm test, npm run build. Report failures.
2. Manually verify at 380px AND 1280px:
   • KPI strip shows real values from useProgress(). Pass/fail.
   • Bar chart bars proportional to real daily minutes. Pass/fail.
   • "Review →" links navigate to real practice routes (not 404). Pass/fail.
   • Headline copy adapts to actual trend (don't hardcode the "studying more" variant). Pass/fail.
   • At 380px, KPI strip is 2×2. At 1280px, 1×4. Pass/fail.
   • While loading, skeletons show — not a blank screen or zero values. Pass/fail.
```

---

## 08 — Tablet & desktop expansion + accessibility audit

> Final pass — validate all rails, breakpoints, AA contrast, and motion preferences. **No mobile bolt-on here — mobile was already designed in 03–07. This pass only validates the expansion layouts and the global accessibility contract.**

```
[Prepend Project Context block.]

This pass does TWO things:
  A. Validates that the tablet/desktop expansions defined in prompts 03–07 actually render correctly at each breakpoint.
  B. Audits the entire app for accessibility regressions.

No new layout work. If a screen is broken at a width, return to its prompt — do not patch here.

═══════════════════════════════════════════════
A. BREAKPOINT VALIDATION
═══════════════════════════════════════════════

Test at four widths: 380px, 768px, 1024px, 1280px. For each width, walk through every redesigned screen and report pass/fail.

380px (phone):
  Home          — single column, hero cards stacked, BottomNav visible. Pass/fail.
  Courses       — horizontal subject strip, single-column detail. Pass/fail.
  Learn         — full-width reader, in-page TOC visible, Quick check icon strip on right edge. Pass/fail.
  Practice      — single-column options (1×4), parts strip horizontal, Map button bottom-right. Pass/fail.
  Progress      — KPI strip 2×2, chart 100px. Pass/fail.
  Sidebar absent everywhere; BottomNav visible everywhere. No horizontal scroll. Pass/fail.

768px (tablet):
  Sidebar collapsed to icon rail (var(--rail-sidebar-collapsed) = 64px). Pass/fail.
  Learn — Companion rail HIDDEN, button visible in TopBar, opens slide-in sheet. Pass/fail.
  Practice — question map rail HIDDEN, Map button visible. Pass/fail.
  Courses — 2-col layout (subject rail + detail). Pass/fail.

1024px (laptop — known tight zone):
  All screens render without horizontal scroll. Pass/fail per screen.
  Reader column max-w 640px + left rail 220px + sidebar 64px (collapsed) = ~924px content + chrome. Confirm no clipping. Pass/fail.

1280px (desktop):
  Sidebar at full var(--rail-sidebar) = 220px, all rails visible. Pass/fail.
  Learn — right Companion rail visible (≥1200px threshold). Pass/fail.
  Practice — both parts and map rails visible. Pass/fail.
  Progress — 2-col content row visible (Mastery + Weak topics side by side). Pass/fail.

═══════════════════════════════════════════════
B. ACCESSIBILITY AUDIT
═══════════════════════════════════════════════

CONTRAST (run automated check + manual spot-check):
  • Open devtools Accessibility → CSS Overview.
  • Verify every pair from the Contrast Contract in prompt 01:
      ink on bg, ink-2 on bg, ink-3 on bg, accent on bg, accent-ink on accent-soft, good-ink on good-soft, warn on warn-soft, pos on pos-soft.
  • Report any pair that fails. ink-4 on anything for text is an automatic fail (ink-4 is decoration only).

TOUCH TARGETS:
  • Every interactive element ≥ 44px hit target on touch (use min-height/padding, not just height).
  • Audit: Buttons sm (28px) MUST have py-2 padding to reach 44px on mobile. Confirm.
  • Icon buttons MUST be ≥ 44×44.

FOCUS:
  • Visible focus ring on every interactive element: 2px outline-accent, 2px offset.
  • Tab through Home, Courses, Learn, Practice, Progress. Confirm focus visible at every stop. Pass/fail per screen.

MOTION:
  • Audit every CSS transition added in prompts 01–07. Each must be wrapped in @media (prefers-reduced-motion: no-preference) { … }.
  • Set OS to "reduce motion" and verify no animation plays. Pass/fail.

KEYBOARD NAVIGATION:
  • Quiz: Tab through option tiles, press Enter/Space to select. Confirm answer registers. Pass/fail.
  • Reader: Tab to highlight controls, confirm they trigger. Pass/fail.

SCREEN READER (basic):
  • VoiceOver / NVDA on Home: announces greeting, then continue card, then goal card. Pass/fail.
  • Quiz options must announce as a radiogroup. Confirm role="radiogroup" on the option container and role="radio" on each tile. Pass/fail.

═══════════════════════════════════════════════
C. SMOKE TEST (functional regression check)
═══════════════════════════════════════════════

Run through these actions end-to-end and confirm each works:
  • Navigate to every redesigned route from BottomNav (phone) / Sidebar (desktop). Pass/fail.
  • Select an answer in Practice; confirm question map tile updates color correctly. Pass/fail.
  • Save a highlight in the reader; reload and confirm it persists. Pass/fail.
  • Play audio (Listen) in the reader; confirm it fires. Pass/fail.
  • Open Progress; confirm KPIs reflect real data including the quiz answer just submitted. Pass/fail.
  • At 380px, hit the locked chapter on Home; confirm inline disclosure (not tooltip) appears. Pass/fail.
  • Switch chapter to a Tamil-script chapter; confirm drop-cap is suppressed. Pass/fail.

After this pass:
1. Run npm run lint, npm test, npm run build. Report failures.
2. Submit the breakpoint validation table, accessibility audit results, and smoke test results as a single report.
```

---

## How to use

1. **Prepend Project Context to every prompt** before pasting into Claude Code. This replaces the audit step.
2. Run **01** (tokens) and **02** (components) in order — these are foundation, don't skip.
3. Before running any screen prompt (03–07), confirm all shared component imports from 02 are error-free.
4. Run **03–07** in any order, one at a time. Each prompt designs phone first, then tablet/desktop expansion. After each: run checks, verify visuals with the pass/fail checklist, then proceed.
5. Finally run **08** to validate breakpoints and audit accessibility. This pass does NOT bolt mobile on — mobile is already in 03–07.

**If a step produces wrong output:** reference the prompt by name (e.g. *"This doesn't match prompt 05 — Quick check should be bg-accent-soft, Pause · Recall should be bg-bg-sunk"*) and paste any lint/test failures. Fix check failures before addressing visual issues.

**Recovery:** if a prompt produces wrong output, run `git checkout HEAD~1` (or `git stash pop` if you stashed) to return to the pre-prompt checkpoint, then re-run with corrections.
