# EduFlow LMS Dashboard — Design Handoff

## Overview
This package contains high-fidelity HTML design references for an **EduFlow Learning Management System (LMS) Dashboard**. The dashboard is a student-facing portal showing enrolled courses, assignments, learning progress, activity charts, certificates, and upcoming classes.

The goal is to **recreate this design in your existing codebase** using your established framework, component library, and patterns — not to ship the HTML directly.

---

## About the Design Files

The files in this bundle are **design prototypes built in HTML/React/Babel**. They are:

| File | Purpose |
|---|---|
| `"C:\Projects\TNSchool\exam-coach\Dummy_files\design_handoff_eduflow\LearnDash.html"` | Full interactive dashboard — desktop + tablet + mobile responsive |
| `C:\Projects\TNSchool\exam-coach\Dummy_files\design_handoff_eduflow\Mobile Preview.html` | The dashboard displayed inside an iPhone 15 Pro bezel |
| `C:\Projects\TNSchool\exam-coach\Dummy_files\design_handoff_eduflow\tweaks-panel.jsx` | Helper component (used internally by the prototype) |

Open `C:\Projects\TNSchool\exam-coach\Dummy_files\design_handoff_eduflow\LearnDash.html` in any browser to interact with the full design. Open `Mobile Preview.html` to see the mobile layout inside a phone frame.

---

## Fidelity

**HIGH-FIDELITY** — These are pixel-perfect mockups with final colors, typography, spacing, interactions, and animations. Recreate the UI as closely as possible using your codebase's existing libraries and component patterns.

---

## Design Tokens

### Colors
```
--accent-teal:    #2ec4b6   /* Primary accent — CTAs, active states, donut */
--accent-violet:  #9b72f0   /* Secondary accent — avatar, bar chart, violet cards */
--accent-coral:   #ff6b6b   /* Tertiary accent — notifications, warning badges */
--sidebar-bg:     #1a1d27   /* Dark sidebar background */
--page-bg:        #f0f2f8   /* Main page background (light blue-gray) */
--card-bg:        #ffffff   /* All card backgrounds */
--border:         #eef0f7   /* Card borders, dividers */
--border-light:   #f3f4f6   /* Table row dividers */
--text-primary:   #1a1d27   /* Headings, bold labels */
--text-secondary: #374151   /* Body text, descriptions */
--text-muted:     #6b7280   /* Secondary labels, instructors */
--text-disabled:  #9ca3af   /* Placeholders, hints */
--success:        #10b981   /* Green dot, positive trend */
--status-live:    { bg: #fff0f0, text: #e53e3e, dot: #e53e3e }
--status-progress:{ bg: #e8f4fd, text: #2b6cb0, dot: #4299e1 }
--status-done:    { bg: #f0fff4, text: #276749, dot: #48bb78 }
--status-pending: { bg: #fffaf0, text: #c05621, dot: #ed8936 }
```

### Typography
```
Font family: DM Sans (Google Fonts)
Weights used: 300, 400, 500, 600, 700

Scale:
  --text-xs:   10px / 11px
  --text-sm:   12px / 13px
  --text-base: 14px / 15px
  --text-lg:   16px / 18px
  --text-xl:   22px / 26px / 30px (stat card numbers)
  --heading:   15–18px, weight 700
```

### Spacing
```
Gap between cards (desktop):  20px
Gap between cards (mobile):   12px
Card internal padding:        18–24px
Sidebar width (open):         200px
Sidebar width (collapsed):    64px
Header height:                58–62px
Bottom nav height (mobile):   64px
```

### Border Radius
```
Cards:           14px (tweakable 0–28px)
Buttons/badges:  8–10px
Avatars:         50% (circle)
Stat card icons: 9–10px
Progress bars:   10px
```

### Shadows
```
Cards:       0 2px 12px rgba(0,0,0,0.05)
Stat cards:  0 4px 16px {accent}44  (hover: 0 12px 28px {accent}66)
Avatar:      0 4px 14px rgba(0,0,0,0.12)
```

---

## Screens & Views

### 1. Dashboard (default view)

**Layout:** Full viewport flex row — sidebar (left) + main area (right).
Main area = header (top) + scrollable body.
Body = vertical stack of sections with 20px gap.

**Stat Cards Row**
- 2 cards side by side (full width), flex row with gap
- Each card: colored background (teal / violet), 14px radius, 18px padding
- Decorative circles: absolute positioned, `rgba(255,255,255,0.12)` and `0.08`
- Icon box: 36×36px, `rgba(255,255,255,0.22)` bg, 9px radius
- Number: 26px, weight 700, white
- Label: 12px, `rgba(255,255,255,0.85)`, weight 500
- "View Details" link: 11px, `rgba(255,255,255,0.9)` + chevron icon
- Hover: translateY(-2px), deeper box-shadow

**Assignments Panel** (left half of bottom row)
- White card, 18px padding, 14px radius
- Header: "Assignments" (15px, 700) + "View All" button (teal)
- 3 assignment rows, each: 11px padding, 10px radius, `#f3f4f6` border
- Hover: border → `{color}55`, bg → `{color}0a`
- Each row: colored icon box (36×36, 9px radius) + name/date + chevron
- Colors per row: violet / teal / coral

**Progress Donut** (right half of bottom row)
- White card, centered content
- SVG donut: 160px, track `#eef0f7`, fill `accentTeal`, 10px stroke width
- Center text: `65%` (24px, 700) + "Progress" (11px, muted)
- Caption: 12px muted, centered

**Activity Card** (right column, desktop only)
- White card, 18px padding
- User avatar: 58×58 gradient circle (teal→violet), 3px white border
- Name: 700, 14px
- "Hours Activity" label + "+5% increase" (green, 10px)
- Bar chart: 5 bars (Mon–Fri), 80px height, hover reveals tooltip
- Bar color: `accentViolet55` default, `accentViolet` on hover

---

### 2. Sidebar Navigation

**Desktop:**
- Fixed left, 200px wide (collapses to 64px)
- Background: `#1a1d27`
- Logo row: teal book icon (34×34, 9px radius) + "EduFlow" text
- Nav items: icon + label, 10px radius, `accentTeal22` bg when active
- Active color: `accentTeal`; inactive: `rgba(255,255,255,0.5)`
- Bottom: Settings + Log out (dimmer, `rgba(255,255,255,0.4)`)

**Nav items (in order):**
1. Dashboard (grid icon)
2. Courses (book icon)
3. Assignments (clipboard icon)
4. Progress (clock/circle icon)
5. Activity (clock icon)
6. Certificate (badge icon)
7. Messages (chat icon)

**Mobile:** Hidden sidebar — opens as a slide-in drawer (240px) with dark overlay on tap of ☰

---

### 3. Header

- White bar, 58px height, `#eef0f7` bottom border
- Left: ☰ hamburger button + "Welcome back, **Alex!**" (teal bold)
- Right: search box (13px, rounded, `#f5f6fa` bg) + bell icon (coral dot notification) + avatar + name/role
- Mobile: hides search box text field, shows search icon instead

---

### 4. Activity Page (`/activity`)

- Full-width white card
- Centered avatar (72px gradient circle)
- 3 stat chips: Courses / Progress / This Week in `#f5f6fa` boxes
- Bar chart below with weekly hours label

---

### 5. Certificate Page (`/certificate`)

- 3 certificate cards in a responsive row
- Each card: white bg, colored icon (48×48), course name, issue date
- Completed progress bar (100% fill in card accent color)
- Hover lift effect

---

### 6. Progress Page (`/progress`)

- Left: large donut chart (180px)
- Right: per-course progress bars with % labels
- 4 courses with different accent colors

---

## Interactions & Behavior

| Element | Behavior |
|---|---|
| Sidebar toggle (☰) | Desktop: collapses sidebar to icon-only (64px). Mobile: opens/closes drawer |
| Nav item click | Sets active state, renders corresponding page |
| Stat card hover | translateY(-2px), deeper shadow |
| Assignment row hover | Border color + subtle bg tint |
| Bar chart hover | Bar highlights to full accent color, tooltip appears above |
| Mobile drawer | Slides in from left with 45% dark overlay; tap overlay to close |
| Bottom tab bar | Fixed at bottom on mobile/tablet, replaces sidebar nav |

### Transitions
```
Sidebar width:     width .25s ease
Hover transforms:  .18s ease
Color changes:     .15s ease
Bar chart:         background .2s
```

---

## Responsive Breakpoints

```
Mobile:  < 640px
Tablet:  640px – 900px
Desktop: ≥ 900px
```

**Mobile-specific:**
- Sidebar hidden; replaced by slide-in drawer + bottom tab bar (64px)
- Stat cards scroll horizontally if needed
- Assignments + Progress stack vertically
- Header shows only logo icon, search icon, bell, avatar (no text)
- Body padding: 14px; gap: 12px

**Tablet-specific:**
- Drawer nav (same as mobile)
- Bottom nav still shown
- Table hides Duration & Instructor columns (`col-hide-md`)
- Activity + Calendar/Weekly panels: side-by-side

**Desktop:**
- Full collapsible sidebar (200px ↔ 64px)
- All table columns visible
- Right column fixed at 248px width

---

## Component Checklist

- [ ] `<Sidebar>` — collapsible, with active state, logo, bottom links
- [ ] `<MobileDrawer>` — slide-in overlay nav for mobile
- [ ] `<BottomNav>` — fixed bottom tab bar (mobile/tablet only)
- [ ] `<Header>` — search, bell with badge, avatar, welcome text
- [ ] `<StatCard>` — colored bg, icon, value, label, hover effect
- [ ] `<StatusBadge>` — colored pill with dot (Live / In Progress / Completed / Pending)
- [ ] `<AssignmentRow>` — icon box, name, date, hover state
- [ ] `<DonutChart>` — SVG donut with center text
- [ ] `<BarChart>` — 5-column weekly chart with hover tooltips
- [ ] `<Avatar>` — initials circle with gradient bg
- [ ] `<ActivityCard>` — profile + bar chart
- [ ] `<CertificateCard>` — course cert with progress bar
- [ ] `<ProgressBar>` — labeled horizontal bar with accent color

---

## Assets

- **Icons:** All icons are inline SVG (stroke-based, `strokeLinecap: round`, `strokeLinejoin: round`). No external icon library required. You may substitute with your preferred icon set (Heroicons, Lucide, etc.) using the same icon names.
- **Fonts:** DM Sans from Google Fonts — `https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700`
- **Images:** None — all visuals are CSS/SVG

---

## Files in This Package

```
design_handoff_eduflow/
├── README.md              ← This file (full spec)
├── CLAUDE_CODE_PROMPT.md  ← Ready-to-paste prompt for Claude Code
├── LearnDash.html         ← Full interactive dashboard reference
├── Mobile Preview.html    ← iPhone frame mobile preview
└── tweaks-panel.jsx       ← Prototype helper (ignore in production)
```
