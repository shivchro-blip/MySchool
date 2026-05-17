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

### Active tokens (PAPER system — use these)

Defined in `frontend/web/src/index.css` under `:root` (light) and `[data-theme="dark"]`.
Aliased in `tailwind.config.js` as Tailwind color utilities — no hardcoded hex in config.

**PAPER tokens are active. Legacy `--ec-*` tokens are being retired — do not add new `--ec-*` tokens.**

#### Light theme (`:root`)

```css
/* Surfaces */
--bg:          #F5F1EB;   /* page background (warm paper) */
--bg-2:        #FFFFFF;   /* card surface */
--bg-sunk:     #EDE9E2;   /* recessed surface */

/* Borders */
--line:        #E5E7EB;   /* default border */
--line-soft:   #E8E3DB;   /* subtle dividers */

/* Text */
--ink:         #1E293B;   /* primary text */
--ink-2:       #64748B;   /* secondary text */
--ink-3:       #64748B;   /* tertiary (≥4.5:1 on --bg) */
--ink-4:       #94A3B8;   /* DECORATION ONLY — never for text */

/* Accent — UI chrome, active nav, progress */
--accent:      #1B4B82;
--accent-soft: #E6F1FB;
--accent-ink:  #0C447C;   /* text on --accent-soft */

/* Semantic */
--good:        #1D9E75;
--good-soft:   #E1F5EE;
--good-ink:    #085041;
--warn:        #EF9F27;
--warn-soft:   #FAEEDA;
--pos:         #b86a2a;   /* achievement / streak */
--pos-soft:    #f4e8d8;
--danger:      #E24B4A;
--highlight:   #FEF9C3;   /* inline text marker */

/* AI feature surfaces */
--ai:          #8B5CF6;
--ai-soft:     #EEEDFE;
```

#### Dark theme (`[data-theme="dark"]`)

```css
--bg:          #0F172A;
--bg-2:        #1E293B;
--bg-sunk:     #0B1120;
--line:        #334155;
--line-soft:   #1E293B;
--ink:         #F1F5F9;
--ink-2:       #CBD5E1;
--ink-3:       #94A3B8;
--ink-4:       #475569;
--accent:      #3B82F6;
--accent-soft: #1E3A5F;
--accent-ink:  #93C5FD;
--good:        #34D399;
--good-soft:   #065F46;
--good-ink:    #A7F3D0;
--warn:        #FBB040;
--warn-soft:   #451A03;
--pos:         #FCD34D;
--pos-soft:    #451A03;
--danger:      #F87171;
--highlight:   #3D2F00;
--ai:          #A78BFA;
--ai-soft:     #2E1065;
```

### Brand palette (primary CTA buttons)

The `brand.*` scale is **purple** — used for primary action buttons (`.btn-primary`, `bg-brand-600`),
distinct from `--accent` (navy). Do not conflate them.

```js
// tailwind.config.js — brand.*
brand: {
  50:  '#EEEDFE',
  100: '#CECBF6',
  200: '#AFA9EC',
  300: '#9F99E8',
  400: '#7F77DD',
  500: '#6860CC',
  600: '#534AB7',   ← primary button background
  700: '#3C3489',   ← primary button hover
  800: '#26215C',
  900: '#1A1640',
}
```

**Color axis split:**
| Axis | Token | Use case |
|------|-------|----------|
| Navigation / chrome | `--accent` (#1B4B82 light / #3B82F6 dark) | active nav, progress fill, focus rings |
| Primary action | `brand-600` (#534AB7) | buttons, CTAs |

### Contrast contract
- `--ink` on `--bg` ≥ 12:1
- `--ink-2` on `--bg` ≥ 7:1
- `--ink-3` on `--bg` ≥ 4.5:1 (lightest allowed for text)
- `--ink-4` — no text, decoration only
- `--accent` on `--bg` ≥ 4.5:1
- `--accent-ink` on `--accent-soft` ≥ 4.5:1
- `--good-ink` on `--good-soft` ≥ 4.5:1

### Extended tokens (also in `:root`)

These tokens exist in `index.css` alongside the PAPER tokens. Use them where appropriate:

```css
/* Canvas / surface aliases (supplement PAPER tokens) */
--bg-canvas:             #F5F1EB;   /* alias of --bg */
--bg-surface:            #FFFFFF;   /* alias of --bg-2 */
--border-soft:           rgba(15, 23, 42, 0.06);
--border-strong:         rgba(15, 23, 42, 0.10);
--text-primary:          #0F172A;
--text-muted:            #5E6B7A;
--text-faint:            #7B8794;

/* Brand teal (used in some card/button surfaces) */
--brand-teal:            #2A7B6F;
--brand-teal-soft:       rgba(42, 123, 111, 0.10);
--brand-teal-soft-hover: rgba(42, 123, 111, 0.18);
--brand-teal-hover:      #226860;
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
static const Color brand      = Color(0xFF2A7B6F);  // teal-green — all brand elements
static const Color brandLight = Color(0xFFE6F4F2);
static const Color brandDark  = Color(0xFF1d5c53);
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
