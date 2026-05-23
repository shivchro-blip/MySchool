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
│   │   │   ├── index.css         ← ALL web CSS tokens (:root light + [data-theme="dark"])
│   │   │   ├── content/          ← static JS content modules
│   │   │   │   ├── registry.js
│   │   │   │   ├── practiceRegistry.js
│   │   │   │   └── Class_11/ + Class_12/
│   │   │   ├── components/ui/    ← Badge, BrandLogo, Button, Card, Input, Navbar
│   │   │   └── pages/
│   │   └── tailwind.config.js    ← token aliases (CSS vars only — no hardcoded hex)
│   └── app/                      ← Flutter mobile
│       ├── lib/
│       │   ├── config/theme.dart ← AppTheme (all Flutter color constants + ThemeData)
│       │   ├── screens/
│       │   └── widgets/
│       └── assets/content/       ← JSON chapter/practice files for Flutter
└── backend/
```

**Important:** Web and Flutter use **entirely separate design systems** with different color palettes
and no shared token layer. The teal brand on Flutter (`#2A7B6F`) is unrelated to the navy accent
on web (`#1B4B82`). Do not attempt to unify them.

---

## 2. Web Color Tokens

### Canonical tokens (use these for all new code)

Defined in `frontend/web/src/index.css` under `:root` (light) and `[data-theme="dark"]`.
Aliased in `tailwind.config.js` as Tailwind color utilities — no hardcoded hex in config.

**Legacy `--ec-*` tokens are being retired — do not add new ones.**

#### Light theme (`:root`)

```css
/* Surfaces */
--page-bg:     #FBFAF7;   /* page background — warm white */
--surface:     #FFFFFF;   /* card / panel surface */
--surface-alt: #F1EFE8;   /* recessed / alternate surface */
--border:      #E8E5DD;   /* default border */

/* Text */
--text-primary:   #1F2A27;   /* headings, body */
--text-secondary: #5C6B66;   /* labels, secondary body */
--text-tertiary:  #97A09B;   /* placeholders, decoration */

/* Brand */
--brand-deep:  #04342C;   /* header bar, deep surfaces */
--brand:       #1D9E75;   /* primary brand, active states */
--brand-strong:#0F6E56;   /* links, hover, emphasis */

/* Exam tip callout */
--tip-bg:      #FBF1DD;
--tip-border:  #E9C27A;
--tip-text:    #8A5A12;

/* Semantic (unchanged) */
--good:        #1D9E75;   --good-soft: #E1F5EE;   --good-ink: #085041;
--warn:        #EF9F27;   --warn-soft: #FAEEDA;
--danger:      #E24B4A;
--ai:          #8B5CF6;   --ai-soft:   #EEEDFE;
```

#### Dark theme (`[data-theme="dark"]`)

```css
/* Surfaces */
--page-bg:     #0E1A16;
--surface:     #15241F;
--surface-alt: #1C302A;
--border:      #2A3D36;

/* Text */
--text-primary:   #E8EDEA;
--text-secondary: #9DAAA4;
--text-tertiary:  #6B7872;

/* Brand */
--brand-deep:  #04342C;   /* same in both modes */
--brand:       #34C99A;
--brand-strong:#5DCAA5;

/* Exam tip callout */
--tip-bg:      #2E2412;
--tip-border:  #6B5117;
--tip-text:    #E0B25C;
```

### PAPER aliases (legacy — keep working, migrate away in Phase 4+)

Old token names now alias the canonical tokens above:

| Old name | → Resolves to |
|----------|--------------|
| `--bg` | `--page-bg` |
| `--bg-2` | `--surface` |
| `--bg-sunk` | `--surface-alt` |
| `--line`, `--line-soft` | `--border` |
| `--ink` | `--text-primary` |
| `--ink-2`, `--ink-3` | `--text-secondary` |
| `--ink-4` | `--text-tertiary` |
| `--accent` | `--brand-strong` (light) / `--brand` (dark) |
| `--brand-teal` | `--brand` |

### Color axis

| Axis | Token | Use case |
|------|-------|----------|
| Header / sidebar chrome | `--brand-deep` (#04342C, both modes) | chrome background |
| Navigation / links | `--brand-strong` / `--brand` | active nav, breadcrumbs, links |
| Primary brand | `--brand` | icons, progress bars, highlights |

### Contrast contract
- `--text-primary` on `--page-bg` ≥ 12:1
- `--text-secondary` on `--page-bg` ≥ 4.5:1
- `--text-tertiary` — decorative only, use `--text-secondary` for readable text
- `--brand-strong` on `--page-bg` ≥ 4.5:1
- `--tip-text` on `--tip-bg` ≥ 4.5:1

### Extended aliases (also in `:root`)

```css
/* Legacy canvas aliases */
--bg-canvas:   var(--page-bg)
--bg-surface:  var(--surface)

/* Borders */
--border-soft:   rgba(15, 23, 42, 0.06)
--border-strong: rgba(15, 23, 42, 0.10)

/* Text aliases */
--text-muted:  var(--text-secondary)
--text-faint:  var(--text-tertiary)

/* Brand teal aliases (point at --brand now) */
--brand-teal:            var(--brand)
--brand-teal-soft:       rgba(29, 158, 117, 0.10)
--brand-teal-soft-hover: rgba(29, 158, 117, 0.18)
--brand-teal-hover:      var(--brand-strong)
--accent-navy:           #1E3A5F;

/* Radius shortcuts */
--radius-card:    16px;
--radius-button:  12px;
--radius-pill:    9999px;

/* Shadow shortcuts */
--shadow-card:       0 1px 2px rgba(15,23,42,0.04), 0 1px 1px rgba(15,23,42,0.03);
--shadow-card-hover: 0 4px 12px rgba(15,23,42,0.06), 0 2px 4px rgba(15,23,42,0.04);
```

### Legacy tokens (kept until restyle complete)

Original dark-navy `--ec-*` tokens (`--ec-bg-page`, `--ec-blue`, etc.) remain in `index.css`
and are used by `.ec-*` classes. Do not add new `--ec-*` tokens. Remove them after each component
is restyled to use PAPER tokens.

---

## 3. Web Typography

### Fonts (tailwind.config.js)
```js
fontFamily: {
  sans:  ['Geist', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
  serif: ['"Source Serif 4"', 'Georgia', 'serif'],
  mono:  ['"Geist Mono"', 'ui-monospace', 'monospace'],
}
```
Font files loaded via `@font-face` in `index.css` from `/fonts/` (Geist variable woff2 files).

**Font usage rules:**
- UI chrome (buttons, nav, labels, card bodies) → `font-sans`
- Eyebrow labels, mono numbers, codes, captions → `font-mono`
- Chapter titles, hero headlines, reading body, hero numbers → `font-serif`

### Legacy `--ec-text-*` scale (still in use in `--ec-*` components)
```
--ec-text-xs:   10px   /* metadata labels (UPPERCASE + tracked) */
--ec-text-sm:   11px   /* tags, badges */
--ec-text-base: 13px   /* body text */
--ec-text-md:   14px   /* secondary body */
--ec-text-lg:   17px   /* section headings */
--ec-text-xl:   22px   /* sub-page titles */
--ec-text-2xl:  26px   /* banner / chapter title */
--ec-leading:   1.85   /* body line height */
--ec-tracking-wide: 0.1em  /* ALL CAPS metadata labels */
```

---

## 4. Web Border Radius

From `tailwind.config.js`:
```
pill: 100px
xs:    6px
sm:   10px
md:   14px
lg:   20px
xl:   28px
```

Legacy `--ec-radius-*` vars (still in index.css for `--ec-*` components):
```
--ec-radius-sm:   6px
--ec-radius-md:   8px
--ec-radius-lg:  10px
--ec-radius-pill: 100px
```

---

## 5. Web Shadows & Motion

```js
// tailwind.config.js
boxShadow: {
  card:    '0 0 0 1px rgb(0 0 0 / 0.04), 0 1px 3px 0 rgb(0 0 0 / 0.05)',
  'card-md': '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07)',
}
transitionDuration: { fast: '120ms', base: '200ms', slow: '300ms', ring: '600ms' }
transitionTimingFunction: {
  'soft-out':    'cubic-bezier(0.0, 0.0, 0.2, 1)',
  'soft-in-out': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
}
```

CSS vars also in `index.css`:
```
--duration-fast: 120ms  --duration-base: 200ms
--duration-slow: 300ms  --duration-ring: 600ms
--ease-out:    cubic-bezier(0.0, 0.0, 0.2, 1)
--ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1)
```

---

## 6. Web Layout Rail Widths

```css
--rail-sidebar:            220px
--rail-sidebar-collapsed:   64px
--rail-left:               220px
--rail-right:              280px
--rail-subject:            320px
--rail-parts:              240px
--rail-map:                240px
```

---

## 7. Web Component Library (`components/ui/`)

| Component | File | Notes |
|-----------|------|-------|
| Badge | `Badge.jsx` | status chips |
| BrandLogo | `BrandLogo.jsx` | app logo mark |
| Button | `Button.jsx` | uses `brand-*` palette for primary |
| Card | `Card.jsx` | uses `shadow-card` + `rounded-md` |
| Eyebrow | `Eyebrow.jsx` | small uppercase label / section eyebrow |
| Input | `Input.jsx` | text inputs |
| Navbar | `Navbar.tsx` + `Navbar.module.css` | top navigation bar |
| PageHeader | `PageHeader.jsx` | page-level header block |
| PageTitle | `PageTitle.jsx` | page title typography |

Layout components (`components/layout/`): `AppFooter.jsx`, `DashboardShell.jsx`, `DashboardSidebar.jsx`, `PublicLayout.jsx`.

Nav components (`components/nav/`): `Breadcrumb.jsx`.

### Button classes (from `index.css` `@layer components`)
```css
.btn-primary   → bg-brand-600, text-white, rounded-xl, hover:bg-brand-700
.btn-secondary → bg-white, border border-gray-200, text-gray-700, hover:bg-gray-50
.card          → bg-white, rounded-2xl, shadow-card, border border-gray-100
.card-hover    → .card + hover:shadow-card-md hover:-translate-y-0.5
```

### Content block CSS classes (`.ec-*` — legacy, use until restyled)

```
.ec-section-head   → section heading, 17px, underline accent
.ec-tag            → pill tag (bg --ec-blue-dim, border --ec-blue-border)
.ec-think-box      → callout with left border, --ec-blue accent
.ec-quote-block    → quote with context text (field named "context" in JS + Dart models)
.ec-device-block   → dialogue/device block
.ec-btn-primary    → action button (--ec-blue bg)
.ec-btn-secondary  → ghost button (transparent bg, --ec-border border)
```

InfoCard variants (3): `teal` (Education), `amber` (Career/Caution), `violet` (Awards).
All share: `border-radius: 0 var(--ec-radius-md) var(--ec-radius-md) 0`, left border 2px.

---

## 8. Web Color Usage Rules

| Situation | Token | Never use |
|-----------|-------|-----------|
| Page background | `--bg` | white, gray, custom hex |
| Card / panel bg | `--bg-2` | same as page bg |
| Recessed surface | `--bg-sunk` | — |
| Active nav, progress | `--accent` | any other color |
| Primary CTA button | `brand-600` | `--accent`, custom hex |
| Correct answer | `--good` | teal, blue |
| Wrong answer | `--danger` | red-500, custom hex |
| AI feature surface | `--ai`, `--ai-soft` | purple hex directly |
| Info card — Education | `--ec-teal` (legacy) | blue, green |
| Info card — Career | `--ec-amber` (legacy) | yellow, orange |
| Info card — Awards | `--ec-violet` (legacy) | purple, pink |
| New card type needed | use teal / amber / violet in rotation | invent a new hex |

---

## 9. Flutter Design System

**Flutter uses a completely separate design system** from the web. All Flutter tokens live in
`frontend/app/lib/config/theme.dart` (the `AppTheme` class). Do not import web CSS vars into Flutter.

### Brand and core colors

```dart
// AppTheme constants (from theme.dart)
static const Color brand       = Color(0xFF1D9E75);  // primary brand green
static const Color brandDeep   = Color(0xFF04342C);  // header bar (both modes)
static const Color brandStrong = Color(0xFF0F6E56);  // links / hover
static const Color brandLight  = Color(0xFFE6F5EE);  // soft brand tint (light)
static const Color darkBrand   = Color(0xFF34C99A);  // brand on dark bg
static const Color darkBrandStrong = Color(0xFF5DCAA5);
```

### Light theme tokens

```dart
// Surfaces
surface    = Color(0xFFF9FAFB)
card       = Colors.white

// Text
textPrimary   = Color(0xFF111827)
textSecondary = Color(0xFF6B7280)
textMuted     = Color(0xFF9CA3AF)

// UI
border  = Color(0xFFE5E7EB)
error   = Color(0xFFDC2626)
warning = Color(0xFFD97706)
success = Color(0xFF16A34A)
```

### Dark theme tokens

```dart
// Surfaces
darkSurface = Color(0xFF0F1117)
darkCard    = Color(0xFF1A1D27)
darkBorder  = Color(0xFF2D3142)

// Text
darkText      = Color(0xFFF9FAFB)
darkText2     = Color(0xFF9CA3AF)
darkTextMuted = Color(0xFF6B7280)
```

### Subject / class colors (same in both modes)

```dart
english  = Color(0xFF2A7B6F)   englishBg  = Color(0xFFE6F4F2)
maths    = Color(0xFF5C6BC0)   mathsBg    = Color(0xFFEEEFF9)
science  = Color(0xFFD97020)   scienceBg  = Color(0xFFFBEEE0)
plus1    = Color(0xFF2EC4B6)   plus1Bg    = Color(0xFFE7FAFA)
plus2    = Color(0xFF9B72F0)   plus2Bg    = Color(0xFFF0EBFE)
```

### Typography

Google Fonts **Inter** (`google_fonts: ^6.2.1`). Applied to all `textTheme` and button styles via
`GoogleFonts.interTextTheme()` and `GoogleFonts.inter(...)`.

### Shape and radius

```dart
Card:     BorderRadius.circular(12)
Input:    BorderRadius.circular(10)
Button:   BorderRadius.circular(10)
```

### ThemeData

Flutter uses **Material 3** (`useMaterial3: true`). Theme built by `AppTheme.light` and `AppTheme.dark`.
Light/dark mode toggled by `ThemeToggle` widget — see `widgets/theme_toggle.dart`.

### Context-aware helpers

```dart
AppTheme.surfaceOf(ctx)     // surface or darkSurface
AppTheme.cardOf(ctx)        // card or darkCard
AppTheme.borderOf(ctx)      // border or darkBorder
AppTheme.textOf(ctx)        // textPrimary or darkText
AppTheme.text2Of(ctx)       // textSecondary or darkText2
AppTheme.brandLightOf(ctx)  // brandLight or darkBrandLight
// Also: errorBgOf, successBgOf, warningBgOf, etc.
```

### Navigation

Bottom nav: 3 items — Home / Courses / Progress. Managed by `ShellScaffold` widget.
Selected color: `AppTheme.brand` (#2A7B6F). Unselected: `textMuted` (light) / `darkTextMuted` (dark).

### Shared widgets (`lib/widgets/`)

| Widget | File | Purpose |
|--------|------|---------|
| `ShellScaffold` | `shell_scaffold.dart` | Bottom nav shell for all authenticated routes |
| `AccordionCard` | `accordion_card.dart` | Expandable card |
| `AnalyticsConsentModal` | `analytics_consent_modal.dart` | Analytics consent dialog (first launch) |
| `AppButton` | `app_button.dart` | Primary / secondary buttons using `AppTheme.brand` |
| `BrandLogo` | `brand_logo.dart` | App logo mark |
| `ErrorView` | `error_view.dart` | Error state display |
| `Eyebrow` | `eyebrow.dart` | Small uppercase label / section eyebrow |
| `GoogleSignInButton` | `google_sign_in_button.dart` | Google OAuth sign-in button |
| `MarksChip` | `marks_chip.dart` | Marks level indicator chip |
| `McqOption` | `mcq_option.dart` | MCQ answer option widget |
| `PageHeader` | `page_header.dart` | Page-level header block |
| `PageTitle` | `page_title.dart` | Page title typography |
| `ScoreCard` | `score_card.dart` | Practice score display |
| `ThemeToggle` | `theme_toggle.dart` | Light/dark mode switch |

---

## 10. What Claude Code Must Do on Every UI Task

### Web
1. Read this file first. No exceptions.
2. Never hardcode a hex value — use PAPER tokens (`--bg`, `--ink`, `--accent`) or `brand-*` utilities.
3. Use existing components from `components/ui/` before creating new ones.
4. New web component? Add its spec to Section 7 of this file.
5. New color needed? Add it to Section 2 and `index.css` simultaneously.
6. Do not add new `--ec-*` tokens.

### Flutter
1. Read `lib/config/theme.dart` before writing any widget color.
2. Never hardcode hex in widget files — use `AppTheme.*` constants or `AppTheme.*Of(ctx)` helpers.
3. Use `AppTheme.isDark(ctx)` for conditional styling; never check brightness directly.
4. New widget? Add its description to Section 9 of this file.
