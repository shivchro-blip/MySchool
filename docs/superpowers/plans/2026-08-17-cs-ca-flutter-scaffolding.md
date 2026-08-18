# Computer Science & Computer Applications — Flutter Structural Scaffolding (Phase 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the structural plumbing (models, screen, config, routing, theming, asset dirs) so Computer Applications and Computer Science (Class 11 + Class 12) appear and navigate correctly in the Flutter app, with zero content files yet and zero regressions to English/Maths/Science.

**Architecture:** CS/CA chapters are flat numbered lists (no units, no volumes) rendered by a new `_buildFlatChapterList()` branch in `ChapterListScreen`, parallel to the existing English (units) and Maths (volumes) branches. Learn content for these subjects uses a new `sections[]` shape (mirrors `frontend/web/src/content/**/chapters/*.js`), modeled by a new `SectionedChapterContent` and rendered by a new `SectionedLearnScreen` — a sibling of `RichLearnScreen`, not a modification of it. A shared `AssetFolder.toFolder()` helper (new, small) fixes an existing folder-name-mapping bug (`computer-applications` → `Computer-applications` instead of `ComputerApplications`) shared by both `ChapterContentService` and `ExamPracticeService`.

**Tech Stack:** Flutter (SDK >=3.0.0), go_router 13, provider 6, flutter_markdown 0.7.4 (already a dependency — do not add a new markdown package).

## Global Constraints

- Pubspec package name is `yadhum` (not `exam_coach`) — any new test file must import `package:yadhum/...`. The existing `test/widget/screens_smoke_test.dart` and `test/widget/helpers.dart` import `package:exam_coach/...` and are **pre-existing broken** (123 `flutter analyze` errors, confirmed baseline before this plan touches anything). Do not fix them as part of this plan — out of scope. `flutter analyze lib` is clean (0 issues) — that is the correct baseline to compare against.
- `flutter_markdown: ^0.7.4` is already in `pubspec.yaml` — reuse it, do not add a new markdown dependency.
- Chapter slugs, numbers, and titles for CS/CA must match `frontend/web/src/data/syllabus.js` byte-for-byte (they are asset file-path keys).
- Never hardcode hex colors outside `lib/config/theme.dart` (`AppTheme.*` constants only), per project CLAUDE.md.
- Do not touch `_isEnglishFinalExamSubject` / the Final Exam Prep card — CS/CA renders through a brand-new `_buildFlatChapterList()` branch that never calls `_buildUnitList()`, so that gate is structurally unreachable for CS/CA. No change needed there for Phase 1 (this satisfies the spec's own fallback instruction: "if it would crash, leave CS/CA out of this flag").
- No commits — user reviews and commits manually (per Step 10 of the original request).

---

## File Structure

| File | Status | Responsibility |
|---|---|---|
| `lib/models/sectioned_chapter_content.dart` | new | `SectionNav`, `ContentSection`, `SectionedChapterContent` — mirrors web's `sections[]` JSON shape |
| `lib/utils/asset_folder.dart` | new | Single source of truth for subject-slug → asset-folder-name mapping (fixes existing bug, shared by two services) |
| `lib/services/chapter_content_service.dart` | modify | Add `loadSectionedContent()`; use shared `AssetFolder.toFolder()` |
| `lib/services/exam_practice_service.dart` | modify | Use shared `AssetFolder.toFolder()` (bug fix, no behavior change for English) |
| `lib/config/syllabus_config.dart` | modify | Add `FlatChapter` type, 4 new `_subjects` entries, 4 new flat-chapter constants, `getFlatChapters()` |
| `lib/config/theme.dart` | modify | Add `computerApplications`/`computerScience` colors, wire into `subjectColor`/`subjectBg` |
| `lib/screens/subject_list_screen.dart` | modify | `_iconFor()` — add CS/CA cases |
| `lib/screens/chapter_list_screen.dart` | modify | Add flat-chapter-list rendering branch + `_FlatChapterTile` |
| `lib/screens/sectioned_learn_screen.dart` | new | Renders `SectionedChapterContent`, one section at a time, with Back/Next/Practice nav |
| `lib/router.dart` | modify | Add `/sectioned-learn/:classLevel/:subjectSlug/:chapterSlug` route |
| `pubspec.yaml` | modify | Register 8 new asset directories |
| `assets/content/Class_{11,12}/Computer{Applications,Science}/{chapters,practice}/.gitkeep.json` | new (×8) | Empty-but-tracked directories; harmless placeholder JSON never loaded by real chapter slugs |
| `test/unit/sectioned_chapter_content_test.dart` | new | TDD test for the new model's `fromJson` |
| `test/unit/asset_folder_test.dart` | new | TDD test for the new folder-mapping helper |

---

### Task 1: `SectionedChapterContent` model

**Files:**
- Create: `frontend/app/lib/models/sectioned_chapter_content.dart`
- Test: `frontend/app/test/unit/sectioned_chapter_content_test.dart`

**Interfaces:**
- Produces: `SectionNav {back, next, nextLabel, practice}`, `ContentSection {id, title, content, nav}`, `SectionedChapterContent {chapterNumber, title, subject, classLabel, curriculum, sections}`, all with `fromJson(Map<String, dynamic>)` factories. Consumed by Task 3 (`ChapterContentService.loadSectionedContent`) and Task 8 (`SectionedLearnScreen`).

- [ ] **Step 1: Write the failing test**

Create `frontend/app/test/unit/sectioned_chapter_content_test.dart`:

```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:yadhum/models/sectioned_chapter_content.dart';

void main() {
  group('SectionNav.fromJson', () {
    test('maps all fields', () {
      final nav = SectionNav.fromJson({
        'back': 'intro',
        'next': 'generations',
        'nextLabel': 'Next: Generations →',
        'practice': true,
      });
      expect(nav.back, 'intro');
      expect(nav.next, 'generations');
      expect(nav.nextLabel, 'Next: Generations →');
      expect(nav.practice, isTrue);
    });

    test('practice defaults to false when absent', () {
      final nav = SectionNav.fromJson({'back': 'intro'});
      expect(nav.practice, isFalse);
      expect(nav.next, isNull);
    });
  });

  group('ContentSection.fromJson', () {
    test('maps id/title/content and nested nav', () {
      final section = ContentSection.fromJson({
        'id': 'intro',
        'title': 'Introduction',
        'content': 'Computers are present in every sphere of life.',
        'nav': {'next': 'generations', 'nextLabel': 'Next →'},
      });
      expect(section.id, 'intro');
      expect(section.title, 'Introduction');
      expect(section.content, 'Computers are present in every sphere of life.');
      expect(section.nav?.next, 'generations');
    });

    test('nav is null when absent', () {
      final section = ContentSection.fromJson({
        'id': 'intro', 'title': 'Introduction', 'content': 'x',
      });
      expect(section.nav, isNull);
    });
  });

  group('SectionedChapterContent.fromJson', () {
    test('maps top-level fields and sections list', () {
      final content = SectionedChapterContent.fromJson({
        'chapterNumber': 1,
        'title': 'Introduction to Computers',
        'subject': 'Computer Applications',
        'classLabel': 'Class 11',
        'curriculum': 'Samacheer Kalvi',
        'sections': [
          {
            'id': 'intro',
            'title': 'Introduction',
            'content': 'x',
            'nav': {'next': 'generations', 'practice': false},
          },
        ],
      });
      expect(content.chapterNumber, 1);
      expect(content.title, 'Introduction to Computers');
      expect(content.subject, 'Computer Applications');
      expect(content.classLabel, 'Class 11');
      expect(content.curriculum, 'Samacheer Kalvi');
      expect(content.sections.length, 1);
      expect(content.sections.first.id, 'intro');
    });

    test('sections defaults to empty list when absent', () {
      final content = SectionedChapterContent.fromJson({
        'chapterNumber': 1, 'title': 't', 'subject': 's',
        'classLabel': 'c', 'curriculum': 'cur',
      });
      expect(content.sections, isEmpty);
    });

    test('sectionById finds a section, returns null when missing', () {
      final content = SectionedChapterContent.fromJson({
        'chapterNumber': 1, 'title': 't', 'subject': 's',
        'classLabel': 'c', 'curriculum': 'cur',
        'sections': [
          {'id': 'intro', 'title': 'Introduction', 'content': 'x'},
        ],
      });
      expect(content.sectionById('intro')?.title, 'Introduction');
      expect(content.sectionById('missing'), isNull);
    });
  });
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd frontend/app && flutter test test/unit/sectioned_chapter_content_test.dart`
Expected: FAIL — `Target of URI doesn't exist: 'package:yadhum/models/sectioned_chapter_content.dart'`

- [ ] **Step 3: Write the model**

Create `frontend/app/lib/models/sectioned_chapter_content.dart`:

```dart
// Models for CS/CA static chapter content (mirrors web content/chapters/*.js sections[] shape)

class SectionNav {
  final String? back;
  final String? next;
  final String? nextLabel;
  final bool    practice;

  const SectionNav({this.back, this.next, this.nextLabel, this.practice = false});

  factory SectionNav.fromJson(Map<String, dynamic> j) => SectionNav(
    back:      j['back']      as String?,
    next:      j['next']      as String?,
    nextLabel: j['nextLabel'] as String?,
    practice:  j['practice']  as bool? ?? false,
  );
}

class ContentSection {
  final String      id;
  final String      title;
  final String      content;
  final SectionNav? nav;

  const ContentSection({
    required this.id,
    required this.title,
    required this.content,
    this.nav,
  });

  factory ContentSection.fromJson(Map<String, dynamic> j) => ContentSection(
    id:      j['id']      as String? ?? '',
    title:   j['title']   as String? ?? '',
    content: j['content'] as String? ?? '',
    nav: j['nav'] != null
        ? SectionNav.fromJson(j['nav'] as Map<String, dynamic>)
        : null,
  );
}

class SectionedChapterContent {
  final int    chapterNumber;
  final String title;
  final String subject;
  final String classLabel;
  final String curriculum;
  final List<ContentSection> sections;

  const SectionedChapterContent({
    required this.chapterNumber,
    required this.title,
    required this.subject,
    required this.classLabel,
    required this.curriculum,
    required this.sections,
  });

  factory SectionedChapterContent.fromJson(Map<String, dynamic> j) =>
      SectionedChapterContent(
        chapterNumber: j['chapterNumber'] as int? ?? 0,
        title:         j['title']         as String? ?? '',
        subject:       j['subject']       as String? ?? '',
        classLabel:    j['classLabel']    as String? ?? '',
        curriculum:    j['curriculum']    as String? ?? '',
        sections: (j['sections'] as List<dynamic>? ?? [])
            .map((s) => ContentSection.fromJson(s as Map<String, dynamic>))
            .toList(),
      );

  ContentSection? sectionById(String id) {
    for (final s in sections) {
      if (s.id == id) return s;
    }
    return null;
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd frontend/app && flutter test test/unit/sectioned_chapter_content_test.dart`
Expected: PASS (9 tests)

- [ ] **Step 5: Commit**

```bash
git add frontend/app/lib/models/sectioned_chapter_content.dart frontend/app/test/unit/sectioned_chapter_content_test.dart
git commit -m "feat(app): add SectionedChapterContent model for CS/CA learn content"
```

---

### Task 2: Shared `AssetFolder` mapping helper (bug fix)

Both `ChapterContentService._toAssetFolder` and `ExamPracticeService._toAssetFolder` currently do `subjectSlug[0].toUpperCase() + rest` — this maps `english` → `English` correctly, but `computer-applications` → `Computer-applications` (wrong; the real directory is `ComputerApplications`). Extract one shared, explicit mapping.

**Files:**
- Create: `frontend/app/lib/utils/asset_folder.dart`
- Test: `frontend/app/test/unit/asset_folder_test.dart`
- Modify: `frontend/app/lib/services/chapter_content_service.dart` (Task 3)
- Modify: `frontend/app/lib/services/exam_practice_service.dart` (Task 3)

**Interfaces:**
- Produces: `AssetFolder.toFolder(String classLevel, String subjectSlug) -> String` returning e.g. `Class_11/ComputerApplications`. Consumed by Task 3.

- [ ] **Step 1: Write the failing test**

Create `frontend/app/test/unit/asset_folder_test.dart`:

```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:yadhum/utils/asset_folder.dart';

void main() {
  group('AssetFolder.toFolder', () {
    test('english class +1', () {
      expect(AssetFolder.toFolder('+1', 'english'), 'Class_11/English');
    });

    test('english class +2', () {
      expect(AssetFolder.toFolder('+2', 'english'), 'Class_12/English');
    });

    test('computer-applications maps to ComputerApplications (no stray hyphen)', () {
      expect(AssetFolder.toFolder('+1', 'computer-applications'),
          'Class_11/ComputerApplications');
    });

    test('computer-science maps to ComputerScience', () {
      expect(AssetFolder.toFolder('+2', 'computer-science'),
          'Class_12/ComputerScience');
    });

    test('unknown slug falls back to capitalize-first-letter', () {
      expect(AssetFolder.toFolder('+1', 'maths'), 'Class_11/Maths');
    });

    test('unknown classLevel passes through unchanged', () {
      expect(AssetFolder.toFolder('+3', 'english'), '+3/English');
    });
  });
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd frontend/app && flutter test test/unit/asset_folder_test.dart`
Expected: FAIL — `Target of URI doesn't exist: 'package:yadhum/utils/asset_folder.dart'`

- [ ] **Step 3: Write the helper**

Create `frontend/app/lib/utils/asset_folder.dart`:

```dart
// Single source of truth for subject-slug → assets/content folder-name mapping.
// Shared by ChapterContentService and ExamPracticeService so both stay in sync.
class AssetFolder {
  static const _explicitSubjectFolders = {
    'computer-applications': 'ComputerApplications',
    'computer-science':      'ComputerScience',
  };

  static String toFolder(String classLevel, String subjectSlug) {
    final cl = switch (classLevel.toLowerCase()) {
      '+1' => 'Class_11',
      '+2' => 'Class_12',
      _ => classLevel,
    };
    final sub = _explicitSubjectFolders[subjectSlug.toLowerCase()] ??
        (subjectSlug.isEmpty
            ? subjectSlug
            : subjectSlug[0].toUpperCase() + subjectSlug.substring(1));
    return '$cl/$sub';
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd frontend/app && flutter test test/unit/asset_folder_test.dart`
Expected: PASS (6 tests)

- [ ] **Step 5: Commit**

```bash
git add frontend/app/lib/utils/asset_folder.dart frontend/app/test/unit/asset_folder_test.dart
git commit -m "feat(app): add shared AssetFolder mapping helper"
```

---

### Task 3: Wire `AssetFolder` into both services + add `loadSectionedContent()`

**Files:**
- Modify: `frontend/app/lib/services/chapter_content_service.dart`
- Modify: `frontend/app/lib/services/exam_practice_service.dart`

**Interfaces:**
- Consumes: `AssetFolder.toFolder` (Task 2), `SectionedChapterContent.fromJson` (Task 1).
- Produces: `ChapterContentService().loadSectionedContent(classLevel, subjectSlug, chapterSlug) -> Future<SectionedChapterContent?>`. Consumed by Task 8 (`SectionedLearnScreen`).

- [ ] **Step 1: Update `ChapterContentService`**

Full replacement for `frontend/app/lib/services/chapter_content_service.dart`:

```dart
import 'dart:convert';
import 'package:flutter/services.dart';
import '../models/chapter_content_model.dart';
import '../models/sectioned_chapter_content.dart';
import '../utils/asset_folder.dart';

class ChapterContentService {
  static final ChapterContentService _instance = ChapterContentService._();
  factory ChapterContentService() => _instance;
  ChapterContentService._();

  final Map<String, ChapterContent?> _cache = {};
  final Map<String, SectionedChapterContent?> _sectionedCache = {};

  Future<ChapterContent?> loadContent(
    String classLevel,
    String subjectSlug,
    String chapterSlug,
  ) async {
    final cacheKey = '$classLevel/$subjectSlug/$chapterSlug';
    if (_cache.containsKey(cacheKey)) {
      return _cache[cacheKey];
    }
    try {
      final folder = AssetFolder.toFolder(classLevel, subjectSlug);
      final raw = await rootBundle.loadString(
        'assets/content/$folder/chapters/$chapterSlug.json',
      );
      final data = jsonDecode(raw) as Map<String, dynamic>;
      final content = ChapterContent.fromJson(data);
      _cache[cacheKey] = content;
      return content;
    } catch (_) {
      _cache[cacheKey] = null;
      return null;
    }
  }

  Future<SectionedChapterContent?> loadSectionedContent(
    String classLevel,
    String subjectSlug,
    String chapterSlug,
  ) async {
    final cacheKey = '$classLevel/$subjectSlug/$chapterSlug';
    if (_sectionedCache.containsKey(cacheKey)) {
      return _sectionedCache[cacheKey];
    }
    try {
      final folder = AssetFolder.toFolder(classLevel, subjectSlug);
      final raw = await rootBundle.loadString(
        'assets/content/$folder/chapters/$chapterSlug.json',
      );
      final data = jsonDecode(raw) as Map<String, dynamic>;
      final content = SectionedChapterContent.fromJson(data);
      _sectionedCache[cacheKey] = content;
      return content;
    } catch (_) {
      _sectionedCache[cacheKey] = null;
      return null;
    }
  }

  bool hasContent(String classLevel, String subjectSlug, String chapterSlug) {
    final key = '$classLevel/$subjectSlug/$chapterSlug';
    return _cache.containsKey(key) ? _cache[key] != null : false;
  }
}
```

(`_toAssetFolder` removed — replaced by the shared `AssetFolder.toFolder`. Behavior for English is unchanged; `loadContent`/`loadSectionedContent` are cached independently since they parse the same file two different ways and neither should poison the other's cache.)

- [ ] **Step 2: Update `ExamPracticeService`**

In `frontend/app/lib/services/exam_practice_service.dart`:

Replace:
```dart
import 'dart:convert';
import 'package:flutter/services.dart';
import '../models/exam_practice_model.dart';
import '../utils/exam_paper_adapter.dart';

class ExamPracticeService {
```
with:
```dart
import 'dart:convert';
import 'package:flutter/services.dart';
import '../models/exam_practice_model.dart';
import '../utils/exam_paper_adapter.dart';
import '../utils/asset_folder.dart';

class ExamPracticeService {
```

Replace:
```dart
      final folder = _toAssetFolder(classLevel, subjectSlug);
```
with:
```dart
      final folder = AssetFolder.toFolder(classLevel, subjectSlug);
```

Delete the now-unused private method:
```dart
  static String _toAssetFolder(String classLevel, String subjectSlug) {
    final cl = switch (classLevel.toLowerCase()) {
      '+1' => 'Class_11',
      '+2' => 'Class_12',
      _ => classLevel,
    };
    final sub = subjectSlug.isEmpty
        ? subjectSlug
        : subjectSlug[0].toUpperCase() + subjectSlug.substring(1);
    return '$cl/$sub';
  }
```

- [ ] **Step 3: Run analyze to confirm no breakage**

Run: `cd frontend/app && flutter analyze lib`
Expected: `No issues found!`

- [ ] **Step 4: Commit**

```bash
git add frontend/app/lib/services/chapter_content_service.dart frontend/app/lib/services/exam_practice_service.dart
git commit -m "fix(app): route both content services through shared AssetFolder mapping"
```

---

### Task 4: `syllabus_config.dart` — flat chapters + 4 new subjects

**Files:**
- Modify: `frontend/app/lib/config/syllabus_config.dart`

**Interfaces:**
- Produces: `FlatChapter {number, title, slug}`, `SyllabusConfig.getFlatChapters(classLevel, subjectSlug) -> List<FlatChapter>?`. Consumed by Task 7 (`ChapterListScreen`).

- [ ] **Step 1: Add the `FlatChapter` type**

In `frontend/app/lib/config/syllabus_config.dart`, after the `MathsChapter` class (after line 60), add:

```dart
class FlatChapter {
  final int    number;
  final String title;
  final String slug;
  const FlatChapter({
    required this.number,
    required this.title,
    required this.slug,
  });
}
```

- [ ] **Step 2: Add the 4 new subjects to `_subjects`**

Replace the `_subjects` list (lines 64-70):
```dart
  static const _subjects = [
    SubjectConfig(slug: 'english', name: 'English', classLevel: '+1'),
    SubjectConfig(slug: 'maths', name: 'Mathematics', classLevel: '+1'),
    SubjectConfig(slug: 'science', name: 'Science', classLevel: '+1'),
    SubjectConfig(slug: 'english', name: 'English', classLevel: '+2'),
    SubjectConfig(slug: 'maths', name: 'Mathematics', classLevel: '+2'),
  ];
```
with:
```dart
  static const _subjects = [
    SubjectConfig(slug: 'english', name: 'English', classLevel: '+1'),
    SubjectConfig(slug: 'maths', name: 'Mathematics', classLevel: '+1'),
    SubjectConfig(slug: 'science', name: 'Science', classLevel: '+1'),
    SubjectConfig(slug: 'computer-applications', name: 'Computer Applications', classLevel: '+1'),
    SubjectConfig(slug: 'computer-science', name: 'Computer Science', classLevel: '+1'),
    SubjectConfig(slug: 'english', name: 'English', classLevel: '+2'),
    SubjectConfig(slug: 'maths', name: 'Mathematics', classLevel: '+2'),
    SubjectConfig(slug: 'computer-applications', name: 'Computer Applications', classLevel: '+2'),
    SubjectConfig(slug: 'computer-science', name: 'Computer Science', classLevel: '+2'),
  ];
```

- [ ] **Step 3: Add the 4 flat-chapter constants**

After the `_plus1Maths` constant (after line 404, before `getUnits`), add — chapter numbers/titles/slugs copied verbatim from `frontend/web/src/data/syllabus.js`:

```dart
  static const _plus1ComputerApplications = [
    FlatChapter(number: 1, title: 'Introduction to Computers', slug: 'chapter-01-introduction-to-computers'),
    FlatChapter(number: 2, title: 'Number Systems', slug: 'chapter-02-number-systems'),
    FlatChapter(number: 3, title: 'Computer Organisation', slug: 'chapter-03-computer-organisation'),
    FlatChapter(number: 4, title: 'Theoretical Concepts of Operating System', slug: 'chapter-04-theoretical-concepts-of-operating-system'),
    FlatChapter(number: 5, title: 'Working with Windows Operating System', slug: 'chapter-05-working-with-windows-operating-system'),
    FlatChapter(number: 6, title: 'Introduction to Word Processor', slug: 'chapter-06-introduction-to-word-processor'),
    FlatChapter(number: 7, title: 'Working with OpenOffice Calc', slug: 'chapter-07-working-with-openoffice-calc'),
    FlatChapter(number: 8, title: 'Presentation Basics', slug: 'chapter-08-presentation-basics'),
    FlatChapter(number: 9, title: 'Introduction to Internet and Email', slug: 'chapter-09-introduction-to-internet-and-email'),
    FlatChapter(number: 10, title: 'HTML — Structural Tags', slug: 'chapter-10-html-structural-tags'),
    FlatChapter(number: 11, title: 'HTML — Formatting Text, Tables, Lists and Links', slug: 'chapter-11-html-formatting-tables-lists-links'),
    FlatChapter(number: 12, title: 'HTML — Multimedia Elements and Forms', slug: 'chapter-12-html-multimedia-elements-and-forms'),
    FlatChapter(number: 13, title: 'CSS — Cascading Style Sheets', slug: 'chapter-13-css-cascading-style-sheets'),
    FlatChapter(number: 14, title: 'Introduction to JavaScript', slug: 'chapter-14-introduction-to-javascript'),
    FlatChapter(number: 15, title: 'Control Structure in JavaScript', slug: 'chapter-15-control-structure-in-javascript'),
    FlatChapter(number: 16, title: 'JavaScript Functions', slug: 'chapter-16-javascript-functions'),
    FlatChapter(number: 17, title: 'Computer Ethics and Cyber Security', slug: 'chapter-17-computer-ethics-and-cyber-security'),
    FlatChapter(number: 18, title: 'Tamil Computing', slug: 'chapter-18-tamil-computing'),
  ];

  static const _plus1ComputerScience = [
    FlatChapter(number: 1, title: 'Introduction to Computers', slug: 'cs-chapter-01-introduction-to-computers'),
    FlatChapter(number: 2, title: 'Number Systems', slug: 'cs-chapter-02-number-systems'),
    FlatChapter(number: 3, title: 'Computer Organization', slug: 'cs-chapter-03-computer-organization'),
    FlatChapter(number: 4, title: 'Theoretical Concepts of Operating System', slug: 'cs-chapter-04-theoretical-concepts-of-operating-system'),
    FlatChapter(number: 5, title: 'Working with Windows Operating System', slug: 'cs-chapter-05-working-with-windows-operating-system'),
    FlatChapter(number: 6, title: 'Specification and Abstraction', slug: 'cs-chapter-06-specification-and-abstraction'),
    FlatChapter(number: 7, title: 'Composition and Decomposition', slug: 'cs-chapter-07-composition-and-decomposition'),
    FlatChapter(number: 8, title: 'Iteration and Recursion', slug: 'cs-chapter-08-iteration-and-recursion'),
    FlatChapter(number: 9, title: 'Introduction to C++', slug: 'cs-chapter-09-introduction-to-cpp'),
    FlatChapter(number: 10, title: 'Flow of Control', slug: 'cs-chapter-10-flow-of-control'),
    FlatChapter(number: 11, title: 'Functions', slug: 'cs-chapter-11-functions'),
    FlatChapter(number: 12, title: 'Arrays and Structures', slug: 'cs-chapter-12-arrays-and-structures'),
    FlatChapter(number: 13, title: 'Introduction to Object Oriented Programming Techniques', slug: 'cs-chapter-13-introduction-to-oop-techniques'),
    FlatChapter(number: 14, title: 'Classes and Objects', slug: 'cs-chapter-14-classes-and-objects'),
    FlatChapter(number: 15, title: 'Polymorphism', slug: 'cs-chapter-15-polymorphism'),
    FlatChapter(number: 16, title: 'Inheritance', slug: 'cs-chapter-16-inheritance'),
    FlatChapter(number: 17, title: 'Computer Ethics and Cyber Security', slug: 'cs-chapter-17-computer-ethics-and-cyber-security'),
    FlatChapter(number: 18, title: 'Tamil Computing', slug: 'cs-chapter-18-tamil-computing'),
  ];

  static const _plus2ComputerApplications = [
    FlatChapter(number: 1, title: 'Multimedia', slug: 'chapter-01-multimedia'),
    FlatChapter(number: 2, title: 'An Introduction to Adobe PageMaker', slug: 'chapter-02-pagemaker'),
    FlatChapter(number: 3, title: 'Introduction to Database Management System', slug: 'chapter-03-dbms'),
    FlatChapter(number: 4, title: 'PHP: Hypertext Preprocessor', slug: 'chapter-04-php-intro'),
    FlatChapter(number: 5, title: 'Functions and Arrays in PHP', slug: 'chapter-05-php-functions-arrays'),
    FlatChapter(number: 6, title: 'Conditional Statements in PHP', slug: 'chapter-06-php-conditionals'),
    FlatChapter(number: 7, title: 'Loops in PHP', slug: 'chapter-07-php-loops'),
    FlatChapter(number: 8, title: 'Forms and Files', slug: 'chapter-08-forms-files'),
    FlatChapter(number: 9, title: 'Connecting PHP and MySQL', slug: 'chapter-09-php-mysql'),
    FlatChapter(number: 10, title: 'Introduction to Computer Networks', slug: 'chapter-10-networks-intro'),
    FlatChapter(number: 11, title: 'Network Examples and Protocols', slug: 'chapter-11-network-protocols'),
    FlatChapter(number: 12, title: 'Domain Name System (DNS)', slug: 'chapter-12-dns'),
    FlatChapter(number: 13, title: 'Network Cabling', slug: 'chapter-13-network-cabling'),
    FlatChapter(number: 14, title: 'Open Source Concepts', slug: 'chapter-14-open-source'),
    FlatChapter(number: 15, title: 'E-Commerce', slug: 'chapter-15-ecommerce'),
    FlatChapter(number: 16, title: 'Electronic Payment Systems', slug: 'chapter-16-payment-systems'),
    FlatChapter(number: 17, title: 'E-Commerce Security Systems', slug: 'chapter-17-ecommerce-security'),
    FlatChapter(number: 18, title: 'Electronic Data Interchange (EDI)', slug: 'chapter-18-edi'),
  ];

  static const _plus2ComputerScience = [
    FlatChapter(number: 1, title: 'Function', slug: 'chapter-01-functions'),
    FlatChapter(number: 2, title: 'Data Abstraction', slug: 'chapter-02-data-abstraction'),
    FlatChapter(number: 3, title: 'Scoping', slug: 'chapter-03-scoping'),
    FlatChapter(number: 4, title: 'Algorithmic Strategies', slug: 'chapter-04-algorithmic-strategies'),
    FlatChapter(number: 5, title: 'Python - Variables and Operators', slug: 'chapter-05-python-variables-operators'),
    FlatChapter(number: 6, title: 'Control Structures', slug: 'chapter-06-control-structures'),
    FlatChapter(number: 7, title: 'Python Functions', slug: 'chapter-07-python-functions'),
    FlatChapter(number: 8, title: 'Strings and String Manipulation', slug: 'chapter-08-strings-manipulation'),
    FlatChapter(number: 9, title: 'Lists, Tuples, Sets and Dictionary', slug: 'chapter-09-lists-tuples-sets-dictionary'),
    FlatChapter(number: 10, title: 'Python Classes and Objects', slug: 'chapter-10-python-classes-objects'),
    FlatChapter(number: 11, title: 'Database Concepts', slug: 'chapter-11-database-concepts'),
    FlatChapter(number: 12, title: 'Structured Query Language (SQL)', slug: 'chapter-12-sql'),
    FlatChapter(number: 13, title: 'Python and CSV Files', slug: 'chapter-13-python-csv-files'),
    FlatChapter(number: 14, title: 'Importing C++ Programs in Python', slug: 'chapter-14-importing-cpp-in-python'),
    FlatChapter(number: 15, title: 'Data Manipulation through SQL', slug: 'chapter-15-data-manipulation-sql'),
    FlatChapter(number: 16, title: 'Data Visualization using pyplot', slug: 'chapter-16-data-visualization-pyplot'),
  ];
```

- [ ] **Step 4: Add `getFlatChapters()`**

After the `getMathsChapters` method (after line 422), add:

```dart
  static List<FlatChapter>? getFlatChapters(
      String classLevel, String subjectSlug) {
    final key = '${classLevel.toLowerCase()}/${subjectSlug.toLowerCase()}';
    return switch (key) {
      '+1/computer-applications' => _plus1ComputerApplications,
      '+1/computer-science' => _plus1ComputerScience,
      '+2/computer-applications' => _plus2ComputerApplications,
      '+2/computer-science' => _plus2ComputerScience,
      _ => null,
    };
  }
```

- [ ] **Step 5: Run analyze**

Run: `cd frontend/app && flutter analyze lib`
Expected: `No issues found!`

- [ ] **Step 6: Commit**

```bash
git add frontend/app/lib/config/syllabus_config.dart
git commit -m "feat(app): add CS/CA subjects and flat chapter lists to SyllabusConfig"
```

---

### Task 5: Theme colors for CS/CA

**Files:**
- Modify: `frontend/app/lib/config/theme.dart`

**Interfaces:**
- Produces: `AppTheme.computerApplications`, `AppTheme.computerApplicationsBg`, `AppTheme.computerScience`, `AppTheme.computerScienceBg`. `subjectColor`/`subjectBg` now resolve these for names containing "computer application" / "computer science". Consumed by Task 6, 7, 8 (any screen calling `AppTheme.subjectColor(name)`).

- [ ] **Step 1: Add the color constants**

In `frontend/app/lib/config/theme.dart`, after line 59 (`static const Color scienceBg  = Color(0xFFFBEEE0);`), add:

```dart
  static const Color computerApplications   = Color(0xFF0EA5E9);
  static const Color computerApplicationsBg = Color(0xFFE0F2FE);
  static const Color computerScience        = Color(0xFF7C3AED);
  static const Color computerScienceBg      = Color(0xFFF1EAFE);
```

- [ ] **Step 2: Wire into `subjectColor`/`subjectBg`**

Replace `subjectColor` (lines 119-125):
```dart
  static Color subjectColor(String name) {
    final n = name.toLowerCase();
    if (n.contains('english')) return english;
    if (n.contains('math'))    return maths;
    if (n.contains('science')) return science;
    return const Color(0xFF6B7280);
  }
```
with:
```dart
  static Color subjectColor(String name) {
    final n = name.toLowerCase();
    if (n.contains('english')) return english;
    if (n.contains('math'))    return maths;
    if (n.contains('computer application')) return computerApplications;
    if (n.contains('computer science'))      return computerScience;
    if (n.contains('science')) return science;
    return const Color(0xFF6B7280);
  }
```

Replace `subjectBg` (lines 127-133):
```dart
  static Color subjectBg(String name) {
    final n = name.toLowerCase();
    if (n.contains('english')) return englishBg;
    if (n.contains('math'))    return mathsBg;
    if (n.contains('science')) return scienceBg;
    return const Color(0xFFF3F4F6);
  }
```
with:
```dart
  static Color subjectBg(String name) {
    final n = name.toLowerCase();
    if (n.contains('english')) return englishBg;
    if (n.contains('math'))    return mathsBg;
    if (n.contains('computer application')) return computerApplicationsBg;
    if (n.contains('computer science'))      return computerScienceBg;
    if (n.contains('science')) return scienceBg;
    return const Color(0xFFF3F4F6);
  }
```

`'science'` must stay checked *after* `'computer science'` — `"computer science".contains('science')` is `true`, so `computer science` would otherwise be misrouted to the generic `science` teal.

- [ ] **Step 3: Run analyze**

Run: `cd frontend/app && flutter analyze lib`
Expected: `No issues found!`

- [ ] **Step 4: Commit**

```bash
git add frontend/app/lib/config/theme.dart
git commit -m "feat(app): add Computer Applications/Science theme colors"
```

---

### Task 6: Subject-list icons for CS/CA

**Files:**
- Modify: `frontend/app/lib/screens/subject_list_screen.dart`

**Interfaces:**
- Consumes: none new. Produces: `_iconFor` now returns distinct icons for CS vs CA.

- [ ] **Step 1: Update `_iconFor`**

In `frontend/app/lib/screens/subject_list_screen.dart`, replace (lines 183-195):
```dart
  static IconData _iconFor(String name) {
    final n = name.toLowerCase();
    if (n.contains('english')) {
      return Icons.menu_book_outlined;
    }
    if (n.contains('math')) {
      return Icons.calculate_outlined;
    }
    if (n.contains('science')) {
      return Icons.science_outlined;
    }
    return Icons.book_outlined;
  }
```
with:
```dart
  static IconData _iconFor(String name) {
    final n = name.toLowerCase();
    if (n.contains('english')) {
      return Icons.menu_book_outlined;
    }
    if (n.contains('math')) {
      return Icons.calculate_outlined;
    }
    if (n.contains('computer application')) {
      return Icons.desktop_windows_outlined;
    }
    if (n.contains('computer science')) {
      return Icons.code_rounded;
    }
    if (n.contains('science')) {
      return Icons.science_outlined;
    }
    return Icons.book_outlined;
  }
```

(Same ordering note as Task 5 — `computer science` must be checked before the generic `science` branch.)

- [ ] **Step 2: Run analyze**

Run: `cd frontend/app && flutter analyze lib`
Expected: `No issues found!`

- [ ] **Step 3: Commit**

```bash
git add frontend/app/lib/screens/subject_list_screen.dart
git commit -m "feat(app): add distinct icons for Computer Applications/Science"
```

---

### Task 7: `ChapterListScreen` — flat chapter list rendering

**Files:**
- Modify: `frontend/app/lib/screens/chapter_list_screen.dart`

**Interfaces:**
- Consumes: `SyllabusConfig.getFlatChapters` (Task 4), `AppTheme.subjectColor` (Task 5).
- Produces: chapter tiles that push to `/sectioned-learn/:classLevel/:subjectSlug/:chapterSlug` (Task 9) and `/practice/:classLevel/:subjectSlug/:chapterSlug` (existing route, unchanged).

- [ ] **Step 1: Add `_flatChapters` state and load it**

In `frontend/app/lib/screens/chapter_list_screen.dart`, in `_ChapterListScreenState`, replace the state fields (lines 26-29):
```dart
  List<Chapter> _chapters = [];
  List<UnitConfig>? _units;
  List<MathsChapter>? _mathsChapters;
  Map<String, Chapter> _bySlug = {};
```
with:
```dart
  List<Chapter> _chapters = [];
  List<UnitConfig>? _units;
  List<MathsChapter>? _mathsChapters;
  List<FlatChapter>? _flatChapters;
  Map<String, Chapter> _bySlug = {};
```

Replace `_loadFromStaticSyllabus` (lines 46-70):
```dart
  void _loadFromStaticSyllabus() {
    final mathsChapters =
        SyllabusConfig.getMathsChapters(widget.classLevel, widget.subjectSlug);
    final units =
        SyllabusConfig.getUnits(widget.classLevel, widget.subjectSlug);
    final chapters =
        units == null ? const <Chapter>[] : _chaptersFromUnits(units);

    setState(() {
      _mathsChapters = mathsChapters;
      _units = units;
      _chapters = chapters;
      _bySlug = {for (final chapter in chapters) chapter.slug: chapter};
    });

    assert(() {
      debugPrint(
        'Subject detail loaded from static SYLLABUS: '
        'class=${widget.classLevel}, subject=${widget.subjectSlug}, '
        'units=${units?.length ?? 0}, lessons=${chapters.length}, '
        'mathsChapters=${mathsChapters?.length ?? 0}',
      );
      return true;
    }());
  }
```
with:
```dart
  void _loadFromStaticSyllabus() {
    final mathsChapters =
        SyllabusConfig.getMathsChapters(widget.classLevel, widget.subjectSlug);
    final units =
        SyllabusConfig.getUnits(widget.classLevel, widget.subjectSlug);
    final flatChapters =
        SyllabusConfig.getFlatChapters(widget.classLevel, widget.subjectSlug);
    final chapters =
        units == null ? const <Chapter>[] : _chaptersFromUnits(units);

    setState(() {
      _mathsChapters = mathsChapters;
      _units = units;
      _flatChapters = flatChapters;
      _chapters = chapters;
      _bySlug = {for (final chapter in chapters) chapter.slug: chapter};
    });

    assert(() {
      debugPrint(
        'Subject detail loaded from static SYLLABUS: '
        'class=${widget.classLevel}, subject=${widget.subjectSlug}, '
        'units=${units?.length ?? 0}, lessons=${chapters.length}, '
        'mathsChapters=${mathsChapters?.length ?? 0}, '
        'flatChapters=${flatChapters?.length ?? 0}',
      );
      return true;
    }());
  }
```

- [ ] **Step 2: Dispatch to the new branch in `build()`**

Replace the `body:` ternary chain (lines 111-115):
```dart
        child: _mathsChapters != null
            ? _buildMathsList()
            : _units != null
                ? _buildUnitList()
                : _buildEmptyStaticList(),
```
with:
```dart
        child: _mathsChapters != null
            ? _buildMathsList()
            : _units != null
                ? _buildUnitList()
                : _flatChapters != null
                    ? _buildFlatChapterList()
                    : _buildEmptyStaticList(),
```

- [ ] **Step 3: Add `_buildFlatChapterList()` and `_FlatChapterTile`**

After the `_buildMathsList` method (after line 219, before the closing brace of `_ChapterListScreenState`), add:

```dart
  Widget _buildFlatChapterList() {
    final chapters = _flatChapters!;
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
      children: [
        Text(
          '${chapters.length} Chapters',
          style: TextStyle(fontSize: 12, color: AppTheme.textMutedOf(context)),
        ),
        const SizedBox(height: 12),
        for (final chapter in chapters)
          Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: _FlatChapterTile(
              chapter: chapter,
              accentColor: _color,
              classLevel: widget.classLevel,
              subjectSlug: widget.subjectSlug,
            ),
          ),
      ],
    );
  }
```

After the `_MathsChapterTile` class (after line 625, before `_DisabledActionButton`), add:

```dart
class _FlatChapterTile extends StatelessWidget {
  final FlatChapter chapter;
  final Color accentColor;
  final String classLevel;
  final String subjectSlug;

  const _FlatChapterTile({
    required this.chapter,
    required this.accentColor,
    required this.classLevel,
    required this.subjectSlug,
  });

  Chapter get _asChapter => Chapter(
        id: 'local/$classLevel/$subjectSlug/${chapter.slug}',
        slug: chapter.slug,
        subjectId: '$classLevel/$subjectSlug',
        number: chapter.number,
        title: chapter.title,
        contentType: 'lesson',
        isActive: true,
      );

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: AppTheme.cardOf(context),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppTheme.borderOf(context)),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
        child: Row(
          children: [
            Container(
              width: 38,
              height: 38,
              decoration: BoxDecoration(
                color: accentColor.withAlpha(22),
                borderRadius: BorderRadius.circular(9),
              ),
              child: Center(
                child: Text(
                  '${chapter.number}',
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w700,
                    color: accentColor,
                  ),
                ),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                chapter.title,
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.textOf(context),
                ),
              ),
            ),
            const SizedBox(width: 8),
            _ActionButton(
              label: 'Learn',
              color: accentColor,
              onTap: () => context.push(
                '/sectioned-learn/$classLevel/$subjectSlug/${chapter.slug}',
                extra: {'chapter': _asChapter, 'section': null},
              ),
            ),
            const SizedBox(width: 6),
            _ActionButton(
              label: 'Practice',
              color: accentColor,
              outline: true,
              onTap: () => context.push(
                '/practice/$classLevel/$subjectSlug/${chapter.slug}',
                extra: _asChapter,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

`_ActionButton` already exists in this file (defined for the English unit list) and is reused as-is — no change needed to it.

- [ ] **Step 4: Run analyze**

Run: `cd frontend/app && flutter analyze lib`
Expected: `No issues found!`

- [ ] **Step 5: Commit**

```bash
git add frontend/app/lib/screens/chapter_list_screen.dart
git commit -m "feat(app): render flat chapter list for CS/CA subjects"
```

---

### Task 8: `SectionedLearnScreen`

**Files:**
- Create: `frontend/app/lib/screens/sectioned_learn_screen.dart`

**Interfaces:**
- Consumes: `ChapterContentService().loadSectionedContent` (Task 3), `SectionedChapterContent`/`ContentSection`/`SectionNav` (Task 1), `AppTheme.*` (existing + Task 5).
- Produces: `SectionedLearnScreen({classLevel, subjectSlug, chapterSlug, chapter, initialSectionId})`. Consumed by Task 9 (router).

- [ ] **Step 1: Write the screen**

Create `frontend/app/lib/screens/sectioned_learn_screen.dart`:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:go_router/go_router.dart';
import '../config/theme.dart';
import '../models/syllabus_model.dart';
import '../models/sectioned_chapter_content.dart';
import '../services/chapter_content_service.dart';

class SectionedLearnScreen extends StatefulWidget {
  final String   classLevel;
  final String   subjectSlug;
  final String   chapterSlug;
  final Chapter? chapter;
  final String?  initialSectionId;

  const SectionedLearnScreen({
    super.key,
    required this.classLevel,
    required this.subjectSlug,
    required this.chapterSlug,
    this.chapter,
    this.initialSectionId,
  });

  @override
  State<SectionedLearnScreen> createState() => _SectionedLearnScreenState();
}

class _SectionedLearnScreenState extends State<SectionedLearnScreen> {
  SectionedChapterContent? _content;
  bool    _loading = true;
  String? _activeSectionId;

  @override
  void initState() {
    super.initState();
    _loadContent();
  }

  Future<void> _loadContent() async {
    final c = await ChapterContentService()
        .loadSectionedContent(widget.classLevel, widget.subjectSlug, widget.chapterSlug);
    if (!mounted) return;
    setState(() {
      _content = c;
      _loading = false;
      _activeSectionId = widget.initialSectionId;
    });
  }

  void _selectSection(String id) => setState(() => _activeSectionId = id);
  void _clearSection() => setState(() => _activeSectionId = null);

  @override
  Widget build(BuildContext context) {
    final title = widget.chapter?.title ?? 'Learn';
    return Scaffold(
      appBar: AppBar(
        title: Text(title, overflow: TextOverflow.ellipsis),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            if (_activeSectionId != null && widget.initialSectionId == null) {
              _clearSection();
            } else if (context.canPop()) {
              context.pop();
            } else {
              context.go('/dashboard');
            }
          },
        ),
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _content == null
              ? _buildNoContent()
              : _buildContent(_content!),
    );
  }

  Widget _buildNoContent() => Center(
    child: Padding(
      padding: const EdgeInsets.all(32),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.menu_book_outlined, size: 40, color: AppTheme.textMutedOf(context)),
          const SizedBox(height: 16),
          Text(
            'No content available yet for this chapter.',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 14, color: AppTheme.text2Of(context)),
          ),
        ],
      ),
    ),
  );

  Widget _buildContent(SectionedChapterContent content) {
    final activeId = _activeSectionId;
    final active = activeId != null ? content.sectionById(activeId) : null;
    return Column(
      children: [
        _ChapterHeader(content: content),
        const Divider(height: 1),
        Expanded(
          child: active != null
              ? _SectionView(
                  section: active,
                  accentColor: AppTheme.subjectColor(content.subject),
                  onSelectSection: _selectSection,
                  onPractice: () => context.push(
                    '/practice/${widget.classLevel}/${widget.subjectSlug}/${widget.chapterSlug}',
                    extra: widget.chapter,
                  ),
                )
              : _SectionPicker(
                  sections: content.sections,
                  accentColor: AppTheme.subjectColor(content.subject),
                  onSelectSection: _selectSection,
                ),
        ),
      ],
    );
  }
}

class _ChapterHeader extends StatelessWidget {
  final SectionedChapterContent content;
  const _ChapterHeader({required this.content});

  @override
  Widget build(BuildContext context) => Container(
    color: AppTheme.cardOf(context),
    padding: const EdgeInsets.fromLTRB(16, 14, 16, 14),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '${content.classLabel} · ${content.curriculum}',
          style: TextStyle(
            fontSize: 11, fontWeight: FontWeight.w600,
            color: AppTheme.subjectColor(content.subject), letterSpacing: 0.3,
          ),
        ),
        const SizedBox(height: 4),
        Text(content.title, style: AppTheme.pageTitleStyle(context)),
      ],
    ),
  );
}

class _SectionPicker extends StatelessWidget {
  final List<ContentSection> sections;
  final Color accentColor;
  final void Function(String) onSelectSection;

  const _SectionPicker({
    required this.sections,
    required this.accentColor,
    required this.onSelectSection,
  });

  @override
  Widget build(BuildContext context) => ListView.builder(
    padding: const EdgeInsets.fromLTRB(16, 16, 16, 40),
    itemCount: sections.length,
    itemBuilder: (_, i) {
      final section = sections[i];
      return Padding(
        padding: const EdgeInsets.only(bottom: 10),
        child: InkWell(
          borderRadius: BorderRadius.circular(12),
          onTap: () => onSelectSection(section.id),
          child: Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: AppTheme.cardOf(context),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppTheme.borderOf(context)),
            ),
            child: Row(
              children: [
                Container(
                  width: 32, height: 32,
                  decoration: BoxDecoration(
                    color: accentColor.withAlpha(22),
                    borderRadius: BorderRadius.circular(9),
                  ),
                  child: Center(
                    child: Text(
                      '${i + 1}',
                      style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: accentColor),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    section.title,
                    style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: AppTheme.textOf(context)),
                  ),
                ),
                Icon(Icons.arrow_forward_ios, size: 14, color: AppTheme.textMutedOf(context)),
              ],
            ),
          ),
        ),
      );
    },
  );
}

class _SectionView extends StatelessWidget {
  final ContentSection section;
  final Color accentColor;
  final void Function(String) onSelectSection;
  final VoidCallback onPractice;

  const _SectionView({
    required this.section,
    required this.accentColor,
    required this.onSelectSection,
    required this.onPractice,
  });

  @override
  Widget build(BuildContext context) => ListView(
    padding: const EdgeInsets.fromLTRB(16, 16, 16, 40),
    children: [
      Text(
        section.title,
        style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: AppTheme.textOf(context)),
      ),
      const SizedBox(height: 4),
      Container(
        width: 32, height: 2.5,
        decoration: BoxDecoration(color: accentColor, borderRadius: BorderRadius.circular(2)),
      ),
      const SizedBox(height: 16),
      MarkdownBody(
        data: section.content,
        styleSheet: MarkdownStyleSheet.fromTheme(Theme.of(context)).copyWith(
          p: TextStyle(fontSize: 15, height: 1.6, color: AppTheme.text2Of(context)),
          strong: TextStyle(fontWeight: FontWeight.w700, color: AppTheme.textOf(context)),
        ),
      ),
      const SizedBox(height: 24),
      _NavRow(nav: section.nav, accentColor: accentColor, onSelectSection: onSelectSection, onPractice: onPractice),
    ],
  );
}

class _NavRow extends StatelessWidget {
  final SectionNav? nav;
  final Color accentColor;
  final void Function(String) onSelectSection;
  final VoidCallback onPractice;

  const _NavRow({
    required this.nav,
    required this.accentColor,
    required this.onSelectSection,
    required this.onPractice,
  });

  @override
  Widget build(BuildContext context) {
    final n = nav;
    if (n == null) return const SizedBox.shrink();
    return Wrap(
      spacing: 8, runSpacing: 8,
      children: [
        if (n.back != null)
          OutlinedButton(
            onPressed: () => onSelectSection(n.back!),
            style: OutlinedButton.styleFrom(
              minimumSize: const Size(0, 38),
              padding: const EdgeInsets.symmetric(horizontal: 16),
              side: BorderSide(color: AppTheme.borderOf(context)),
            ),
            child: Text('← Back', style: TextStyle(color: AppTheme.text2Of(context))),
          ),
        if (n.practice)
          ElevatedButton(
            onPressed: onPractice,
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.brand,
              foregroundColor: Colors.white,
              overlayColor: AppTheme.brandDark,
              minimumSize: const Size(0, 38),
              padding: const EdgeInsets.symmetric(horizontal: 16),
              elevation: 0,
            ),
            child: const Text('🔥 Practice', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
          ),
        if (n.next != null)
          ElevatedButton(
            onPressed: () => onSelectSection(n.next!),
            style: ElevatedButton.styleFrom(
              backgroundColor: accentColor,
              minimumSize: const Size(0, 38),
              padding: const EdgeInsets.symmetric(horizontal: 16),
            ),
            child: Text(
              n.nextLabel ?? 'Next →',
              style: const TextStyle(color: Colors.white, fontSize: 13),
            ),
          ),
      ],
    );
  }
}
```

Notes on choices, so the reviewer isn't guessing:
- Section navigation (`_selectSection`) is an in-place `setState`, exactly mirroring `RichLearnScreen._switchTab` — no route push per section, so Back/Next feel instant.
- The AppBar back button special-cases "inside a section, reached via the picker" → clears to the picker instead of popping the whole screen, matching the request's "if no section ID, show a section picker" behavior bidirectionally.
- `onPractice` pushes the existing generic `/practice/:classLevel/:subjectSlug/:chapterSlug` route — untouched, per the request's "practice routes should continue to work as-is."

- [ ] **Step 2: Run analyze**

Run: `cd frontend/app && flutter analyze lib`
Expected: `No issues found!`

- [ ] **Step 3: Commit**

```bash
git add frontend/app/lib/screens/sectioned_learn_screen.dart
git commit -m "feat(app): add SectionedLearnScreen for CS/CA sections[] content"
```

---

### Task 9: Router wiring

**Files:**
- Modify: `frontend/app/lib/router.dart`

**Interfaces:**
- Consumes: `SectionedLearnScreen` (Task 8).

- [ ] **Step 1: Import and add the route**

In `frontend/app/lib/router.dart`, add the import after line 16 (`import 'screens/rich_learn_screen.dart';`):
```dart
import 'screens/sectioned_learn_screen.dart';
```

Add a new `GoRoute` immediately after the `/rich-learn/...` route (after line 166, before the `/practice/...` route at line 167):
```dart
        GoRoute(
          path: '/sectioned-learn/:classLevel/:subjectSlug/:chapterSlug',
          builder: (_, state) {
            final extra = state.extra as Map<String, dynamic>?;
            return SectionedLearnScreen(
              classLevel: state.pathParameters['classLevel']!,
              subjectSlug: state.pathParameters['subjectSlug']!,
              chapterSlug: state.pathParameters['chapterSlug']!,
              chapter: extra?['chapter'] as Chapter?,
              initialSectionId: extra?['section'] as String?,
            );
          },
        ),
```

This mirrors the `/rich-learn/...` route exactly (same path-param names, same `extra` map convention with a `chapter` key, and a second key — `section` here vs `tab` there — for the sub-navigation target).

- [ ] **Step 2: Run analyze**

Run: `cd frontend/app && flutter analyze lib`
Expected: `No issues found!`

- [ ] **Step 3: Commit**

```bash
git add frontend/app/lib/router.dart
git commit -m "feat(app): wire /sectioned-learn route to SectionedLearnScreen"
```

---

### Task 10: Asset directories + pubspec registration

**Files:**
- Create: `frontend/app/assets/content/Class_11/ComputerApplications/chapters/.gitkeep.json`
- Create: `frontend/app/assets/content/Class_11/ComputerApplications/practice/.gitkeep.json`
- Create: `frontend/app/assets/content/Class_11/ComputerScience/chapters/.gitkeep.json`
- Create: `frontend/app/assets/content/Class_11/ComputerScience/practice/.gitkeep.json`
- Create: `frontend/app/assets/content/Class_12/ComputerApplications/chapters/.gitkeep.json`
- Create: `frontend/app/assets/content/Class_12/ComputerApplications/practice/.gitkeep.json`
- Create: `frontend/app/assets/content/Class_12/ComputerScience/chapters/.gitkeep.json`
- Create: `frontend/app/assets/content/Class_12/ComputerScience/practice/.gitkeep.json`
- Modify: `frontend/app/pubspec.yaml`

**Interfaces:** none (data files only).

- [ ] **Step 1: Create the 8 placeholder files**

Each `.gitkeep.json` file gets identical content — a syntactically valid, harmless placeholder that is never loaded by a real chapter/practice request (real requests use the actual chapter slug, e.g. `chapter-01-introduction-to-computers.json`, never `.gitkeep.json`):

```json
{
  "_placeholder": true,
  "_note": "Tracks this directory in git until real content is added in Phase 2."
}
```

Write this exact content to all 8 paths listed above.

- [ ] **Step 2: Register the 8 directories in `pubspec.yaml`**

In `frontend/app/pubspec.yaml`, replace the `assets:` block (lines 46-54):
```yaml
  assets:
    - assets/
    - assets/images/
    - assets/content/Class_11/English/chapters/
    - assets/content/Class_11/English/practice/
    - assets/content/Class_12/English/chapters/
    - assets/content/Class_12/English/practice/
    - assets/content/legal/
    - assets/model_papers/
```
with:
```yaml
  assets:
    - assets/
    - assets/images/
    - assets/content/Class_11/English/chapters/
    - assets/content/Class_11/English/practice/
    - assets/content/Class_12/English/chapters/
    - assets/content/Class_12/English/practice/
    - assets/content/Class_11/ComputerApplications/chapters/
    - assets/content/Class_11/ComputerApplications/practice/
    - assets/content/Class_11/ComputerScience/chapters/
    - assets/content/Class_11/ComputerScience/practice/
    - assets/content/Class_12/ComputerApplications/chapters/
    - assets/content/Class_12/ComputerApplications/practice/
    - assets/content/Class_12/ComputerScience/chapters/
    - assets/content/Class_12/ComputerScience/practice/
    - assets/content/legal/
    - assets/model_papers/
```

- [ ] **Step 3: Run `flutter pub get` to confirm the pubspec is still valid**

Run: `cd frontend/app && flutter pub get`
Expected: `Got dependencies!` with no errors.

- [ ] **Step 4: Commit**

```bash
git add frontend/app/pubspec.yaml frontend/app/assets/content/Class_11/ComputerApplications frontend/app/assets/content/Class_11/ComputerScience frontend/app/assets/content/Class_12/ComputerApplications frontend/app/assets/content/Class_12/ComputerScience
git commit -m "chore(app): register CS/CA asset directories"
```

---

### Task 11: Full verification

**Files:** none — verification only.

- [ ] **Step 1: Full `flutter analyze`**

Run: `cd frontend/app && flutter analyze lib`
Expected: `No issues found!` — zero tolerance, per the original request. (Do not run bare `flutter analyze` — it will also scan `test/`, which has the pre-existing, out-of-scope `exam_coach` package-name breakage documented in Global Constraints. If new work is suspected of touching that count, diff against the 123-issue baseline captured before this plan started.)

- [ ] **Step 2: Run the new unit tests**

Run: `cd frontend/app && flutter test test/unit/sectioned_chapter_content_test.dart test/unit/asset_folder_test.dart`
Expected: All PASS (15 tests total).

- [ ] **Step 3: Debug APK build**

Run: `cd frontend/app && flutter build apk --debug`
Expected: `Built build\app\outputs\flutter-apk\app-debug.apk`. If it fails, fix before proceeding — do not report success.

- [ ] **Step 4: Manual trace-through verification (read-only — no emulator available)**

Confirm by reading (not executing) that:
- `SyllabusProvider.load()` → `SyllabusConfig.getSubjects()` now returns 9 subjects (was 5); English/Maths/Science entries are byte-identical to before (diff `syllabus_config.dart` against git to confirm only additive changes).
- `SubjectListScreen` renders from `SyllabusProvider.byClass()` with no changes to that screen itself — the 4 new subjects flow through automatically once `SyllabusConfig` and `theme.dart`/`subject_list_screen.dart` icon/color lookups are updated.
- `ChapterListScreen._loadFromStaticSyllabus()` for `computer-applications`/`computer-science` sets `_flatChapters` (18 or 16 entries) and leaves `_units`/`_mathsChapters` null, so `build()` dispatches to `_buildFlatChapterList()`.
- Tapping "Learn" on a flat-chapter tile pushes `/sectioned-learn/:classLevel/:subjectSlug/:chapterSlug`, which `router.dart` now resolves to `SectionedLearnScreen` — confirmed by reading the route table, since no CS/CA JSON exists yet to click through live.
- Tapping "Learn" on an English lesson (existing path, unchanged) still pushes `/rich-learn/...` → `RichLearnScreen` — confirmed by reading `_LessonRow` in `chapter_list_screen.dart`, untouched by this plan.

- [ ] **Step 5: Report to user for review**

Per the original request (Step 10 — do not commit further/do not push), present:
1. Full list of files created/modified (`git status`)
2. `git diff --stat`
3. Confirmation that Tasks 1-10 were each committed individually (or squash if the user prefers — ask, don't assume)
4. `flutter analyze lib` output (clean)
5. `flutter build apk --debug` output (success)

Wait for user review before any further action (push, PR, etc.) — none of that is in scope for this plan.
