# Frontend Reference — Web (React) + Flutter (Mobile)
> Read this file for any UI, component, page, screen, route, hook, or state question.
> Always read DESIGN_SYSTEM.md before touching any component or stylesheet.

---

## Web App (`frontend/web/`)

### Run locally
```bash
cd exam-coach/frontend/web
npm install
npm run dev     # http://localhost:5173
npm run build
```

### Utility scripts
```bash
npm run content          # html-to-content.js: Dummy_files HTML → JS content modules
npm run export-practice  # export-practice-json.mjs: practice JS → JSON (for Flutter)
```

### Env — create `frontend/web/.env.local`
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

---

### Folder structure

```
frontend/web/src/
├── api/
│   ├── auth.js             ← Supabase auth helpers (sign in, sign out, callbacks)
│   ├── client.js           ← fetch wrapper; auth token in localStorage key exam_coach_token
│   ├── evaluation.js       ← evaluation API calls
│   ├── learning.js         ← learning API calls
│   └── users.js            ← user profile API calls
├── assets/                 ← static assets
├── components/
│   ├── layout/
│   │   ├── AppFooter.jsx
│   │   ├── DashboardShell.jsx
│   │   ├── DashboardSidebar.jsx
│   │   └── PublicLayout.jsx
│   ├── nav/
│   │   └── Breadcrumb.jsx
│   └── ui/
│       ├── Badge.jsx
│       ├── BrandLogo.jsx
│       ├── Button.jsx
│       ├── Card.jsx
│       ├── Eyebrow.jsx
│       ├── Input.jsx
│       ├── Navbar.tsx + Navbar.module.css
│       ├── PageHeader.jsx
│       ├── PageTitle.jsx
│       └── index.js        ← barrel export
├── content/
│   ├── registry.js                       ← chapterSlug → chapter content object
│   ├── practiceRegistry.js               ← chapterSlug → practice question set
│   ├── Class_11/English/
│   │   ├── chapters/       ← 18 chapter JS modules
│   │   └── practice/       ← 18 practice JS modules
│   └── Class_12/English/
│       ├── chapters/       ← 18 chapter JS modules
│       └── practice/       ← 18 practice JS modules
├── data/
│   └── syllabus.js         ← subject/class definitions (mirrored in Flutter SyllabusConfig)
├── hooks/
│   └── useTheme.js         ← light/dark theme hook
├── lib/
│   ├── legal-constants.js  ← CONTACT_EMAIL, LEGAL_LAST_UPDATED, privacy/terms text
│   ├── nav.js              ← nav helper utilities
│   └── userAccess.js       ← user access/gating helpers
├── pages/
│   ├── ActivityPage.jsx
│   ├── AuthCallbackPage.jsx
│   ├── CertificatePage.jsx
│   ├── ChapterPracticeExam.jsx
│   ├── ChapterPracticeExamPage.jsx
│   ├── ContactPage.jsx
│   ├── CoursesIndexPage.jsx
│   ├── DashboardPage.jsx
│   ├── LearnRichPage.jsx       ← embedded component (used by SectionPage/TextSection)
│   ├── LoginPage.jsx
│   ├── OnboardingPage.jsx
│   ├── PracticeRichPage.jsx    ← embedded component (used by PracticeSection)
│   ├── PrivacyPage.jsx
│   ├── ProgressPage.jsx
│   ├── TermsPage.jsx
│   └── syllabus/
│       ├── LessonDetailPage.jsx
│       ├── LessonListPage.jsx
│       ├── NotFound.jsx
│       ├── SectionPage.jsx
│       ├── SubjectPage.jsx
│       ├── YearPage.jsx
│       └── sections/
│           ├── AboutAuthorSection.jsx
│           ├── AskAISection.jsx
│           ├── AttemptHistorySection.jsx
│           ├── ComprehensionSection.jsx
│           ├── GlossarySection.jsx
│           ├── PracticeSection.jsx
│           └── TextSection.jsx
└── utils/
    ├── answerValidation.js
    ├── practiceDraftStorage.js
    └── resolveTabIcon.js
```

---

### Routes (from `App.jsx`)

| Path | Component | Notes |
|------|-----------|-------|
| `/login` | `LoginPage` | public |
| `/auth/callback` | `AuthCallbackPage` | OAuth callback |
| `/privacy` | `PrivacyPage` | public |
| `/terms` | `TermsPage` | public |
| `/contact` | `ContactPage` | public |
| `/onboarding` | `OnboardingPage` | requires auth |
| `/` | `DashboardPage` | requires auth |
| `/courses` | `CoursesIndexPage` | requires auth |
| `/progress` | `ProgressPage` | requires auth |
| `/activity` | `ActivityPage` | requires auth |
| `/certificate` | `CertificatePage` | requires auth |
| `/practice-exam` | `ChapterPracticeExamPage` | requires auth |
| `/:year` | `YearPage` | requires auth |
| `/:year/:subject` | `SubjectPage` | requires auth |
| `/:year/:subject/:category` | `LessonListPage` | requires auth |
| `/:year/:subject/:category/:lesson` | `LessonDetailPage` | requires auth |
| `/:year/:subject/:category/:lesson/:section` | `SectionPage` → `LearnRichPage` or `PracticeRichPage` | requires auth |

---

### State management
- Router: React Router v6 (`BrowserRouter` + `Routes`)
- State: local `useState` only — **no Redux, Zustand, or Context store**
- HTTP: native fetch wrapper at `src/api/client.js`; auth token in `localStorage` key `exam_coach_token`

### Content registry pattern
- Components import **only** `registry.js` or `practiceRegistry.js` — never individual chapter files
- Adding new class/subject: create `content/Class_12/Math/`, add imports to registry files only

### Design token usage (web)
- Use PAPER tokens (`--bg`, `--ink`, `--accent`, etc.) — never hardcode hex
- Primary buttons use `brand-600` (`#534AB7`) — distinct from `--accent`
- Full token reference → DESIGN_SYSTEM.md Sections 2–8
- Never add new `--ec-*` tokens; remove them as components are restyled

---

## Flutter App (`frontend/app/`)

### Run locally
```bash
cd exam-coach/frontend/app
flutter run                        # default device
flutter run -d android             # Android emulator
flutter run -d ios                 # iOS simulator
```

### Build
```bash
flutter build apk
flutter build appbundle
flutter build ios --release
```

### Key dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| `go_router` | ^13.2.0 | navigation |
| `provider` | ^6.1.2 | state management |
| `google_fonts` | ^6.2.1 | Inter font |
| `flutter_secure_storage` | ^9.0.0 | token storage |
| `http` | ^1.2.0 | API calls |

### Config (no .env — use --dart-define)
```bash
flutter run --dart-define=API_BASE_URL=http://10.0.2.2:8000/api/v1   # Android emulator
flutter run --dart-define=API_BASE_URL=http://192.168.x.x:8000/api/v1 # physical device
```
Default: `http://localhost:8000/api/v1`. Defined in `lib/config/app_config.dart`.

---

### Folder structure

```
frontend/app/
├── lib/
│   ├── config/
│   │   ├── app_config.dart        ← AppConfig constants (API_BASE_URL, freeAiCallsPerDay, etc.)
│   │   ├── config.dart            ← barrel export for config/
│   │   ├── legal_constants.dart   ← CONTACT_EMAIL, LEGAL_LAST_UPDATED
│   │   ├── syllabus_config.dart   ← SyllabusConfig (unit/lesson list — mirrors web's syllabus.js)
│   │   └── theme.dart             ← AppTheme (light + dark ThemeData, all color constants)
│   ├── models/
│   │   ├── chapter_content_model.dart
│   │   ├── evaluation_model.dart
│   │   ├── exam_practice_model.dart
│   │   ├── learning_model.dart
│   │   ├── syllabus_model.dart
│   │   └── user_model.dart
│   ├── providers/
│   │   ├── syllabus_provider.dart
│   │   ├── theme_provider.dart
│   │   └── user_provider.dart
│   ├── screens/
│   │   ├── auth_callback_screen.dart
│   │   ├── chapter_detail_screen.dart
│   │   ├── chapter_list_screen.dart
│   │   ├── contact_screen.dart
│   │   ├── courses_screen.dart
│   │   ├── dashboard_screen.dart
│   │   ├── exam_practice_screen.dart
│   │   ├── learn_screen.dart
│   │   ├── login_screen.dart
│   │   ├── onboarding_screen.dart
│   │   ├── privacy_screen.dart
│   │   ├── progress_screen.dart
│   │   ├── rich_learn_screen.dart
│   │   ├── settings_screen.dart
│   │   ├── subject_list_screen.dart
│   │   └── terms_screen.dart
│   ├── services/
│   │   ├── api_service.dart
│   │   ├── auth_service.dart
│   │   ├── chapter_content_service.dart
│   │   ├── evaluation_service.dart
│   │   ├── exam_practice_service.dart
│   │   ├── learning_service.dart
│   │   ├── syllabus_service.dart
│   │   ├── user_preferences_service.dart
│   │   └── user_service.dart
│   ├── widgets/
│   │   ├── accordion_card.dart
│   │   ├── analytics_consent_modal.dart
│   │   ├── app_button.dart
│   │   ├── brand_logo.dart
│   │   ├── error_view.dart
│   │   ├── eyebrow.dart
│   │   ├── google_sign_in_button.dart
│   │   ├── marks_chip.dart
│   │   ├── mcq_option.dart
│   │   ├── page_header.dart
│   │   ├── page_title.dart
│   │   ├── score_card.dart
│   │   ├── shell_scaffold.dart
│   │   └── theme_toggle.dart
│   └── router.dart                ← GoRouter definition (all routes)
└── assets/content/
    ├── Class_11/English/
    │   ├── chapters/              ← 18 JSON chapter files
    │   └── practice/              ← 18 JSON practice files
    └── Class_12/English/
        ├── chapters/              ← 18 JSON chapter files
        └── practice/              ← 18 JSON practice files
```

---

### Screens

| Screen | File |
|--------|------|
| Login | `login_screen.dart` |
| OAuth Callback | `auth_callback_screen.dart` |
| Onboarding | `onboarding_screen.dart` |
| Dashboard | `dashboard_screen.dart` |
| Courses list | `courses_screen.dart` |
| Subject list | `subject_list_screen.dart` |
| Chapter list | `chapter_list_screen.dart` |
| Chapter detail | `chapter_detail_screen.dart` |
| Learn (simple) | `learn_screen.dart` |
| Learn (rich tabs) | `rich_learn_screen.dart` |
| Practice / Exam | `exam_practice_screen.dart` |
| Progress | `progress_screen.dart` |
| Settings | `settings_screen.dart` |
| Privacy | `privacy_screen.dart` |
| Terms | `terms_screen.dart` |
| Contact | `contact_screen.dart` |

### Routes (from `router.dart`)

| Route | Notes |
|-------|-------|
| `/login` | outside ShellRoute, no bottom nav |
| `/auth/callback` | outside ShellRoute |
| `/onboarding` | outside ShellRoute; shown when `onboarded == false` |
| `/dashboard` | inside ShellRoute |
| `/courses` | inside ShellRoute |
| `/courses/:classLevel` | inside ShellRoute |
| `/courses/:classLevel/:subjectSlug` | inside ShellRoute |
| `/courses/:classLevel/:subjectSlug/:chapterSlug` | inside ShellRoute |
| `/progress` | inside ShellRoute |
| `/settings` | inside ShellRoute |
| `/privacy` | inside ShellRoute |
| `/terms` | inside ShellRoute |
| `/contact` | inside ShellRoute |
| `/learn/:classLevel/:subjectSlug/:chapterSlug` | inside ShellRoute |
| `/rich-learn/:classLevel/:subjectSlug/:chapterSlug` | inside ShellRoute |
| `/practice/:classLevel/:subjectSlug/:chapterSlug` | inside ShellRoute |
| `/exam/:classLevel/:subjectSlug/:chapterSlug` | inside ShellRoute |

All ShellRoute screens wrap in `ShellScaffold` → bottom nav (Home / Courses / Progress).

### Navigation rules
- `context.push()` for drill-down (preserves back stack)
- `context.go()` for tab switches (replaces stack)
- Back button: `context.canPop() ? context.pop() : context.go('/dashboard')`

### RichLearnScreen tab structure
Fixed action row (Practice / Attempt History / Ask AI) always visible — never scrolls off screen.
`_computeAllTabs()` unconditionally appends action tabs for every chapter.

### AppTheme usage rules
- Never hardcode hex in widget files — use `AppTheme.*` constants or `AppTheme.*Of(ctx)` helpers
- Use `AppTheme.isDark(ctx)` for conditional styling — never check brightness directly
- Read `lib/config/theme.dart` before writing any widget color
- Full token reference → DESIGN_SYSTEM.md Section 9

---

## Cross-Platform Sync Points

These files must be kept in sync manually — no automated check:

| Web | Flutter | What they share |
|-----|---------|-----------------|
| `frontend/web/src/data/syllabus.js` | `frontend/app/lib/config/syllabus_config.dart` | Subject list, unit structure, lesson slugs |

Any addition or rename of a class level, subject, unit, or chapter slug must be applied to **both** files.

---

## Hard Rules

- Never hardcode hex — use PAPER tokens (web) or `AppTheme.*` (Flutter)
- Never use Redux / Zustand / Context store on web
- Never touch DB directly from frontend — all DB calls go through the backend API
- Always read DESIGN_SYSTEM.md before any UI change
- State on web: local `useState` only
- New web component: add its spec to DESIGN_SYSTEM.md Section 7
- New Flutter widget: add its description to DESIGN_SYSTEM.md Section 9
