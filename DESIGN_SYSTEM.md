# Exam Coach — Design System
> **Claude Code: Read this file before touching ANY UI, component, or stylesheet.**
> Every color, spacing, and typography decision lives here. Never hardcode values.

---

## 1. Project Structure — Where Things Live

```
exam-coach/
├── DESIGN_SYSTEM.md              ← YOU ARE HERE
├── CLAUDE.md                     ← project brain / architecture rules
├── frontend/
│   ├── web/
│   │   ├── src/
│   │   │   ├── index.css         ← ALL CSS tokens defined here (:root vars + oklch overrides)
│   │   │   ├── content/          ← static JS content modules
│   │   │   │   ├── registry.js               ← chapterSlug → chapter content object
│   │   │   │   ├── practiceRegistry.js       ← chapterSlug → practice question set
│   │   │   │   └── Class_11/
│   │   │   │       └── English/
│   │   │   │           ├── chapters/         ← 18 chapter content files (*.js)
│   │   │   │           └── practice/         ← 18 practice question files (*.js)
│   │   │   ├── components/
│   │   │   │   └── ui/           ← shared UI components (Card, Button, Badge, Skeleton…)
│   │   │   └── pages/            ← screen-level components
│   │   └── tailwind.config.js    ← token aliases (CSS vars only — no hardcoded hex)
│   └── app/                      ← Flutter mobile
│       ├── lib/
│       │   ├── screens/          ← Flutter screens
│       │   ├── widgets/          ← shared widgets (ShellScaffold, etc.)
│       │   ├── models/           ← data models (chapter_content_model.dart, etc.)
│       │   ├── services/         ← API + content services
│       │   └── router.dart       ← GoRouter (ShellRoute wraps all content routes)
│       └── assets/content/
│           └── chapters/         ← JSON content for Flutter (separate from web JS)
└── backend/                      ← FastAPI
```

---

## 2. Color Tokens — PAPER Theme (active)

> **Redesign in progress (prompts 01–08).** New tokens use unprefixed names (`--bg`, `--ink`, `--accent`). Legacy `--ec-*` tokens still exist in `index.css` until prompts 02–07 restyle each component. Do not add new `--ec-*` tokens.

Define new tokens in `frontend/web/src/index.css` under `:root` (hex fallback) + `@supports (color: oklch(...))` (oklch override). Mirror in `tailwind.config.js` as CSS var references.

```css
/* Hex fallbacks first — work everywhere */
:root {
  --bg:          #f5f1eb;   /* warm off-white app background */
  --bg-2:        #faf8f4;   /* card paper */
  --bg-sunk:     #ede9e2;   /* recessed surface */
  --line:        #d9d3c8;   /* default border */
  --line-soft:   #e5e0d8;   /* subtle dividers */
  --ink:         #2e2a24;   /* primary text */
  --ink-2:       #5a5349;   /* secondary text */
  --ink-3:       #6e6760;   /* tertiary — lightest allowed for text (≥4.5:1 on --bg) */
  --ink-4:       #b0a89f;   /* DECORATION ONLY — never for text */
  --accent:      #3b5ea6;   /* ink blue — single accent */
  --accent-soft: #e0e8f7;
  --accent-ink:  #2c4880;   /* text on --accent-soft */
  --good:        #4a8c6a;   /* sage */
  --good-soft:   #e0f0e8;
  --good-ink:    #2f6850;   /* text on --good-soft, ≥5.5:1 */
  --warn:        #a07030;   /* caution — time running out, unsaved */
  --warn-soft:   #f5ede0;
  --pos:         #b86a2a;   /* achievement / streak / flame (≠ warn) */
  --pos-soft:    #f4e8d8;
  --danger:      #b03a30;   /* destructive only */
  --highlight:   #f5f0c8;   /* gentle yellow text marker */
}
/* oklch override for supporting browsers */
@supports (color: oklch(0 0 0)) {
  :root {
    --bg:          oklch(0.965 0.012 80);
    --bg-2:        oklch(0.985 0.008 85);
    --bg-sunk:     oklch(0.945 0.014 78);
    --line:        oklch(0.88 0.014 75);
    --line-soft:   oklch(0.92 0.012 78);
    --ink:         oklch(0.25 0.018 60);
    --ink-2:       oklch(0.42 0.014 55);
    --ink-3:       oklch(0.48 0.012 55);
    --ink-4:       oklch(0.72 0.010 55);
    --accent:      oklch(0.45 0.13 245);
    --accent-soft: oklch(0.93 0.04 245);
    --accent-ink:  oklch(0.35 0.14 245);
    --good:        oklch(0.55 0.09 155);
    --good-soft:   oklch(0.93 0.04 155);
    --good-ink:    oklch(0.40 0.10 155);
    --warn:        oklch(0.62 0.13 60);
    --warn-soft:   oklch(0.94 0.05 70);
    --pos:         oklch(0.55 0.13 50);
    --pos-soft:    oklch(0.94 0.05 60);
    --danger:      oklch(0.50 0.18 25);
    --highlight:   oklch(0.93 0.07 95);
  }
}
```

**Contrast contract (verify before shipping any screen):**
- `--ink` on `--bg` ≥ 12:1
- `--ink-2` on `--bg` ≥ 7:1
- `--ink-3` on `--bg` ≥ 4.5:1 (lightest allowed for text)
- `--ink-4` — NO TEXT, decoration only
- `--accent` on `--bg` ≥ 4.5:1
- `--accent-ink` on `--accent-soft` ≥ 4.5:1
- `--good-ink` on `--good-soft` ≥ 4.5:1
- `--warn` on `--warn-soft` ≥ 4.5:1
- `--pos` on `--pos-soft` ≥ 4.5:1

### Legacy tokens (kept until restyle complete)

The original dark-navy tokens (`--ec-bg-page`, `--ec-blue`, etc.) remain in `index.css` and are used by `.ec-*` classes. Prompts 02–07 restyle each component to use the PAPER tokens above. Delete `--ec-*` vars after the restyle is complete.

---

## 3. Typography Scale

```css
/* In globals.css */
:root {
  --ec-font:           -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;

  --ec-text-xs:        10px;   /* Metadata labels (UPPERCASE + tracked) */
  --ec-text-sm:        11px;   /* Tags, badges */
  --ec-text-base:      13px;   /* Body text, sidebar items */
  --ec-text-md:        14px;   /* Secondary body, card text */
  --ec-text-lg:        17px;   /* Section headings (sh) */
  --ec-text-xl:        22px;   /* Sub-page titles */
  --ec-text-2xl:       26px;   /* Banner / chapter title */

  --ec-leading:        1.85;   /* Body line height — generous for reading */
  --ec-tracking-wide:  0.1em;  /* Used on ALL CAPS metadata labels */
}
```

**Rules:**
- Metadata labels (UNIT 1 · PROSE, SECTIONS, EDUCATION) → `var(--ec-text-xs)` + `letter-spacing: var(--ec-tracking-wide)` + `text-transform: uppercase`
- Body paragraphs → `var(--ec-text-base)` + `line-height: var(--ec-leading)`
- Key terms inside body → wrap in `<strong>` → color: `var(--ec-amber)`
- Italicised emphasis inside body → wrap in `<em>` → color: `var(--ec-text-primary)`

---

## 4. Spacing Scale

```css
:root {
  --ec-space-1:   4px;
  --ec-space-2:   8px;
  --ec-space-3:  12px;
  --ec-space-4:  16px;
  --ec-space-5:  20px;
  --ec-space-6:  24px;
  --ec-space-7:  28px;
  --ec-space-8:  36px;
}
```

Page horizontal padding: `var(--ec-space-7)` (28px) on all top-level containers.

---

## 5. Border Radius

```css
:root {
  --ec-radius-sm:   6px;   /* Sidebar active item right corners */
  --ec-radius-md:   8px;   /* Info cards, progress bar */
  --ec-radius-lg:  10px;   /* Banner, large cards */
  --ec-radius-pill: 100px; /* Step pills, tags */
}
```

---

## 6. Component Specs

### NavBar
```
Height:          52px
Background:      var(--ec-bg-page)
Border-bottom:   0.5px solid var(--ec-border-subtle)
Logo badge:      30×30px, radius 7px, background var(--ec-blue), white bold text
Nav links:       var(--ec-text-muted), hover → var(--ec-blue-text), transition 180ms
```

### PageBanner
```
Background:      var(--ec-bg-card)
Border:          0.5px solid var(--ec-border)
Border-radius:   var(--ec-radius-lg)
Margin:          0 var(--ec-space-7)
Padding:         24px 28px 22px
Decorative ring: position absolute, top-right, border-only circle, blue + teal, opacity 0.06-0.07
Meta label:      var(--ec-text-xs) + var(--ec-tracking-wide) + var(--ec-blue-meta)
Title:           var(--ec-text-2xl), weight 700, var(--ec-text-primary)
Author:          var(--ec-text-base), var(--ec-blue-meta)
Tags:            background var(--ec-blue-dim), border var(--ec-blue-border),
                 color var(--ec-blue-text), var(--ec-text-sm), radius var(--ec-radius-pill)
```

### SideNav
```
Width:           185px
Section label:   var(--ec-text-xs) + uppercase + var(--ec-blue-meta), margin-bottom 12px
Inactive item:   var(--ec-text-base), color var(--ec-text-dimmed), border-left 2px solid transparent
Hover item:      color var(--ec-blue-text), bg var(--ec-blue-dim), border-left var(--ec-border)
Active item:     color var(--ec-blue-text), bg var(--ec-blue-dim),
                 border-left: 2px solid var(--ec-blue), font-weight 600
Border-radius:   0 var(--ec-radius-sm) var(--ec-radius-sm) 0  (right side only)
Transition:      all 150ms ease
```

### StepIndicator
```
Active pill:     background var(--ec-blue), white text, radius var(--ec-radius-pill)
                 Inner number: 16×16px circle, rgba(255,255,255,0.2)
Inactive pill:   border 0.5px solid var(--ec-border), color var(--ec-text-dimmed)
Connector:       20px wide, border-top 1px dashed var(--ec-border-subtle)
```

### ProgressBar
```
Container:       background var(--ec-bg-card), border var(--ec-border), radius var(--ec-radius-md)
                 margin 0 var(--ec-space-7), padding 12px 16px
Track:           height 3px, background var(--ec-border-subtle), radius 2px
Fill:            background var(--ec-blue), radius 2px
Label text:      var(--ec-text-xs) + var(--ec-blue-meta)
```

### InfoCard (3 variants)
All share: `border-radius: 0 var(--ec-radius-md) var(--ec-radius-md) 0`, `border-left: 2px solid`, padding `13px 16px`, margin-bottom `10px`

| Variant  | Left border          | Background            | Card border             | Label color         |
|----------|----------------------|-----------------------|-------------------------|---------------------|
| teal     | `var(--ec-teal)`     | `var(--ec-teal-bg)`   | `var(--ec-teal-border)` | `var(--ec-teal)`    |
| amber    | `var(--ec-amber)`    | `var(--ec-amber-bg)`  | `var(--ec-amber-border)`| `var(--ec-amber)`   |
| violet   | `var(--ec-violet)`   | `var(--ec-violet-bg)` | `var(--ec-violet-border)`| `var(--ec-violet)` |

Card label: `var(--ec-text-xs)` + uppercase + `letter-spacing: var(--ec-tracking-wide)` + `font-weight 600`
Card text: `var(--ec-text-base)`, `line-height 1.75`, `var(--ec-text-muted)`

### SectionHeading
```
Font-size:     var(--ec-text-lg), weight 700, color var(--ec-text-primary)
Margin:        22px 0 14px
Underline:     ::after pseudo, 32px wide, 2px high, background var(--ec-blue),
               border-radius 2px, position absolute bottom 0 left 0
CSS class:     .ec-section-head
```

### Tag / Pill (hero tags)
```
CSS class:     .ec-tag
Background:    var(--ec-blue-dim)
Border:        0.5px solid var(--ec-blue-border)
Color:         var(--ec-blue-text)
Font-size:     var(--ec-text-sm)
Border-radius: var(--ec-radius-pill)
Padding:       3px 10px
```

### ThinkBox
```
CSS class:     .ec-think-box
Background:    var(--ec-bg-card-hover)
Border-left:   4px solid var(--ec-blue)
Border-radius: 0 12px 12px 0
Padding:       16px 18px
Label color:   var(--ec-blue-text), var(--ec-text-xs), uppercase, tracked, weight 600
Body color:    var(--ec-text-body)
```

### QuoteBlock
```
CSS class:     .ec-quote-block
Background:    var(--ec-bg-card)
Border:        0.5px solid var(--ec-border)
Border-radius: 12px
Padding:       16px 20px
Quote text:    15px italic, var(--ec-text-primary), border-left 2px solid var(--ec-blue)
Context text:  var(--ec-text-base), var(--ec-text-body)
               ← data field is named "context" in JS and Dart models (not "explain")
```

### DeviceBlock
```
CSS class:     .ec-device-block
Background:    var(--ec-bg-card)
Border:        0.5px solid var(--ec-border)
Border-radius: 12px
Padding:       14px 16px
Kind label:    var(--ec-text-xs), uppercase, tracked, var(--ec-text-muted)
Line text:     var(--ec-text-base), italic, var(--ec-blue-text)
Exp text:      var(--ec-text-base), var(--ec-text-body)
```

### EC Buttons
```
Primary (.ec-btn-primary):
  Background:    var(--ec-blue)
  Color:         var(--ec-text-primary)
  Border-radius: var(--ec-radius-pill)
  Padding:       8px 20px
  Hover:         opacity 0.85

Secondary (.ec-btn-secondary):
  Background:    transparent
  Border:        0.5px solid var(--ec-border)
  Color:         var(--ec-text-body)
  Border-radius: var(--ec-radius-pill)
  Hover:         bg var(--ec-blue-dim), border var(--ec-blue-border), color var(--ec-text-primary)
```

### Practice Button (🔥 — primary action CTA)
Used everywhere a student starts or navigates to practice/exam. Label is always **"Practice"** (never "Practice questions", "Start Practice", "Go to Practice").

**Web (Tailwind):**
```
bg-[#1E2A44] hover:bg-[#2E3A59] text-white font-semibold rounded-pill px-4 py-2
Prefix: 🔥 emoji
```

**Flutter:**
```dart
ElevatedButton.styleFrom(
  backgroundColor: Color(0xFF1E2A44),
  foregroundColor: Colors.white,
  overlayColor:    Color(0xFF2E3A59),
  elevation:       0,
)
// label: "🔥 Practice"
```

---

## 7. Tailwind Config Aliases

`tailwind.config.js` at `frontend/web/`. PAPER tokens map to CSS vars — no hardcoded hex in config:

```js
// theme.extend.colors — PAPER tokens
{
  bg:          'var(--bg)',
  'bg-2':      'var(--bg-2)',
  'bg-sunk':   'var(--bg-sunk)',
  ink:         'var(--ink)',
  'ink-2':     'var(--ink-2)',
  'ink-3':     'var(--ink-3)',
  'ink-4':     'var(--ink-4)',
  accent:      'var(--accent)',
  'accent-soft': 'var(--accent-soft)',
  'accent-ink':  'var(--accent-ink)',
  good:        'var(--good)',
  'good-soft': 'var(--good-soft)',
  'good-ink':  'var(--good-ink)',
  warn:        'var(--warn)',
  'warn-soft': 'var(--warn-soft)',
  pos:         'var(--pos)',
  'pos-soft':  'var(--pos-soft)',
  danger:      'var(--danger)',
  line:        'var(--line)',
  'line-soft': 'var(--line-soft)',
  highlight:   'var(--highlight)',
}

// theme.extend.fontFamily
{
  sans:  ['Geist', '"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
  serif: ['"Source Serif 4"', 'Georgia', 'serif'],
  mono:  ['"Geist Mono"', 'ui-monospace', 'monospace'],
}
```

**Font usage rules:**
- UI chrome (buttons, nav, labels, card bodies) → `font-sans`
- Eyebrow labels, mono numbers, codes, captions → `font-mono`
- Chapter titles, hero headlines, reading view body, hero numbers → `font-serif`

---

## 8. Color Usage Rules — Read Before Every UI Decision

| Situation | Token to use | Never use |
|---|---|---|
| Page background | `--ec-bg-page` | white, gray, custom hex |
| Card / panel bg | `--ec-bg-card` | same as page bg |
| Active nav item | `--ec-blue` border + `--ec-blue-dim` bg | green, purple, or any other color |
| Key term in prose | `--ec-amber` | bold alone, red, blue |
| Info card — Education | `--ec-teal` | blue, green |
| Info card — Career | `--ec-amber` | yellow, orange |
| Info card — Awards | `--ec-violet` | purple, pink |
| Correct answer | `--ec-success` | teal, blue |
| Wrong answer | `--ec-danger` | red-500, custom hex |
| Progress fill | `--ec-blue` | green, teal |
| New card type needed | Pick teal / amber / violet in rotation | invent a new hex color |

---

## 9. What Claude Code Must Do on Every UI Task

1. **Read this file first.** No exceptions.
2. **Never hardcode a hex value** in any component or stylesheet.
3. **Use existing components** from `components/ui/` before creating new ones.
4. **New component?** Add its spec to Section 6 of this file after building it.
5. **New color needed?** Add it to Section 2 of this file and `globals.css` simultaneously. Do not use it inline.
6. **Do not change token values** without updating this file to match.

---

## 10. The Why (for future sessions)

This app is a student study platform. The color system is built on cognitive science:
- **Deep navy base** → reduces eye fatigue during long reading sessions
- **Blue accents** → calm focus, proven to aid retention of complex content
- **Amber for key terms only** → memory trigger (warm colors boost detail recall)
- **Teal / violet for card types** → visual differentiation without distraction
- **Minimal palette** → fewer colors = less cognitive noise = better focus

Do not introduce bright, saturated, or warm colors into the base UI. They increase arousal and shorten focus span — the opposite of what students need.
