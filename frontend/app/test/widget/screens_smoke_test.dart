// Widget smoke tests — verify each screen builds without throwing.
// Screens with embedded EvaluationService/SyllabusService make real network
// calls that fail fast (connection refused in test env). We only pump the first
// frame for those screens and confirm a loading or error indicator renders.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:exam_coach/models/syllabus_model.dart';
import 'package:exam_coach/screens/courses_screen.dart';
import 'package:exam_coach/screens/dashboard_screen.dart';
import 'package:exam_coach/screens/chapter_detail_screen.dart';
import 'package:exam_coach/screens/chapter_list_screen.dart';
import 'package:exam_coach/screens/login_screen.dart';
import 'package:exam_coach/screens/progress_screen.dart';
import 'package:exam_coach/screens/subject_list_screen.dart';
import 'helpers.dart';

// ── Shared test fixtures ──────────────────────────────────────────────────────

final _testChapter = Chapter(
  id:          'ch-uuid-1',
  slug:        'the-portrait-of-a-lady',
  subjectId:   'sub-1',
  number:      1,
  title:       'The Portrait of a Lady',
  contentType: 'prose',
  isActive:    true,
);

final _testSubject = Subject(
  id:         'sub-1',
  slug:       'english',
  code:       'ENG',
  name:       'English',
  classLevel: '+1',
  isActive:   true,
);

// ── LoginScreen ───────────────────────────────────────────────────────────────

group('LoginScreen smoke', () {
  testWidgets('renders email and password fields', (tester) async {
    await pumpApp(tester, const LoginScreen(), location: '/login');
    await tester.pumpAndSettle();

    expect(find.byType(Scaffold), findsOneWidget);
    expect(find.text('AI Exam Coach'), findsOneWidget);
    expect(find.widgetWithText(TextField, 'Email'), findsOneWidget);
    expect(find.widgetWithText(TextField, 'Password'), findsOneWidget);
  });

  testWidgets('shows validation error on empty submit', (tester) async {
    await pumpApp(tester, const LoginScreen(), location: '/login');
    await tester.pumpAndSettle();

    // Tap the Login button without entering credentials
    await tester.tap(find.text('Login'));
    await tester.pump();

    expect(find.text('Please enter email and password.'), findsOneWidget);
  });

  testWidgets('toggle to Sign Up changes button label', (tester) async {
    await pumpApp(tester, const LoginScreen(), location: '/login');
    await tester.pumpAndSettle();

    await tester.tap(find.text('Sign Up'));
    await tester.pumpAndSettle();

    expect(find.text('Create Account'), findsOneWidget);
  });
});

// ── CoursesScreen ─────────────────────────────────────────────────────────────

group('CoursesScreen smoke', () {
  testWidgets('renders both class cards from FakeSyllabusProvider', (tester) async {
    await pumpApp(tester, const CoursesScreen());
    await tester.pumpAndSettle();

    expect(find.byType(Scaffold), findsOneWidget);
    expect(find.text('My Courses'), findsOneWidget);
    expect(find.textContaining('+1'), findsWidgets);
    expect(find.textContaining('+2'), findsWidgets);
  });

  testWidgets('subject count shown for loaded provider', (tester) async {
    // FakeSyllabusProvider: 2 active +1 subjects, 1 active +2 subject
    await pumpApp(tester, const CoursesScreen());
    await tester.pumpAndSettle();

    expect(find.text('2 subjects'), findsOneWidget);
    expect(find.text('1 subject'), findsOneWidget);
  });
});

// ── SubjectListScreen ─────────────────────────────────────────────────────────

group('SubjectListScreen smoke', () {
  testWidgets('shows +1 subjects from provider', (tester) async {
    await pumpApp(
      tester,
      const SubjectListScreen(classLevel: '+1'),
    );
    await tester.pumpAndSettle();

    expect(find.text('+1 Courses'), findsOneWidget);
    // FakeSyllabusProvider has 2 active +1 subjects: English and Maths
    expect(find.text('English'), findsOneWidget);
    expect(find.text('Maths'), findsOneWidget);
  });

  testWidgets('empty message when no subjects for class', (tester) async {
    // FakeSyllabusProvider has no +3 subjects
    await pumpApp(
      tester,
      const SubjectListScreen(classLevel: '+3'),
    );
    await tester.pumpAndSettle();

    expect(find.text('No subjects found for this class.'), findsOneWidget);
  });
});

// ── ChapterDetailScreen ───────────────────────────────────────────────────────

group('ChapterDetailScreen smoke', () {
  testWidgets('renders chapter title and action cards', (tester) async {
    await pumpApp(
      tester,
      ChapterDetailScreen(
        classLevel:  '+1',
        subjectSlug: 'english',
        chapterSlug: _testChapter.slug,
        chapter:     _testChapter,
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('The Portrait of a Lady'), findsWidgets);
    expect(find.text('Learn'), findsOneWidget);
    expect(find.text('Practice'), findsOneWidget);
    expect(find.text('Ask AI'), findsOneWidget);
  });

  testWidgets('shows chapter number badge', (tester) async {
    await pumpApp(
      tester,
      ChapterDetailScreen(
        classLevel:  '+1',
        subjectSlug: 'english',
        chapterSlug: _testChapter.slug,
        chapter:     _testChapter,
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('Chapter 1'), findsOneWidget);
  });

  testWidgets('renders without chapter object (slug fallback)', (tester) async {
    await pumpApp(
      tester,
      const ChapterDetailScreen(
        classLevel:  '+1',
        subjectSlug: 'english',
        chapterSlug: 'the-portrait-of-a-lady',
      ),
    );
    await tester.pumpAndSettle();

    // Title falls back to slug
    expect(find.text('the-portrait-of-a-lady'), findsWidgets);
  });
});

// ── DashboardScreen ───────────────────────────────────────────────────────────

group('DashboardScreen smoke', () {
  testWidgets('renders without throwing (first frame)', (tester) async {
    await pumpApp(tester, const DashboardScreen());
    await tester.pump(); // first frame only — avoids network timeout

    // Should have a Scaffold even before async completes
    expect(find.byType(Scaffold), findsOneWidget);
  });

  testWidgets('shows welcome message with fake user name', (tester) async {
    await pumpApp(tester, const DashboardScreen());
    await tester.pump();

    expect(find.text('Welcome back,'), findsOneWidget);
    // FakeUserProvider returns displayName='Test Student'
    expect(find.text('Test Student'), findsOneWidget);
  });

  testWidgets('shows class cards for +1 and +2', (tester) async {
    await pumpApp(tester, const DashboardScreen());
    await tester.pump();

    expect(find.text('My Courses'), findsOneWidget);
    // FakeSyllabusProvider: loaded=true, 2 +1 subjects, 1 +2 subject
    expect(find.textContaining('Class XI'), findsOneWidget);
    expect(find.textContaining('Class XII'), findsOneWidget);
  });
});

// ── ChapterListScreen ─────────────────────────────────────────────────────────

group('ChapterListScreen smoke', () {
  testWidgets('shows loading indicator initially', (tester) async {
    await pumpApp(
      tester,
      ChapterListScreen(
        classLevel:  '+1',
        subjectSlug: 'english',
        subject:     _testSubject,
      ),
    );
    await tester.pump(); // first frame before network call completes

    // Initial state: loading
    expect(find.byType(CircularProgressIndicator), findsOneWidget);
  });

  testWidgets('shows subject name in AppBar', (tester) async {
    await pumpApp(
      tester,
      ChapterListScreen(
        classLevel:  '+1',
        subjectSlug: 'english',
        subject:     _testSubject,
      ),
    );
    await tester.pump();

    expect(find.text('English'), findsOneWidget);
  });
});

// ── ProgressScreen ────────────────────────────────────────────────────────────

group('ProgressScreen smoke', () {
  testWidgets('shows loading indicator initially', (tester) async {
    await pumpApp(tester, const ProgressScreen());
    await tester.pump();

    expect(find.byType(CircularProgressIndicator), findsOneWidget);
    expect(find.text('My Progress'), findsOneWidget);
  });
});
