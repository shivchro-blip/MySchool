import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'services/auth_service.dart';
import 'models/syllabus_model.dart';

import 'screens/login_screen.dart';
import 'screens/dashboard_screen.dart';
import 'screens/courses_screen.dart';
import 'screens/subject_list_screen.dart';
import 'screens/chapter_list_screen.dart';
import 'screens/chapter_detail_screen.dart';
import 'screens/learn_screen.dart';
import 'screens/rich_learn_screen.dart';
import 'screens/exam_practice_screen.dart';
import 'screens/progress_screen.dart';
import 'widgets/shell_scaffold.dart';

final router = GoRouter(
  initialLocation: '/dashboard',
  redirect: (context, state) async {
    // Redirect old root path to dashboard
    if (state.matchedLocation == '/') return '/dashboard';
    final loggedIn  = await AuthService().isLoggedIn();
    final onLogin   = state.matchedLocation == '/login';
    if (!loggedIn && !onLogin) return '/login';
    if (loggedIn  && onLogin)  return '/dashboard';
    return null;
  },
  routes: [

    GoRoute(path: '/login', builder: (_, __) => const LoginScreen()),

    // ── Shell: bottom navigation on all screens ────────────────────
    ShellRoute(
      builder: (context, state, child) => ShellScaffold(child: child),
      routes: [

        GoRoute(
          path: '/dashboard',
          builder: (_, __) => const DashboardScreen(),
        ),

        GoRoute(
          path: '/courses',
          builder: (_, __) => const CoursesScreen(),
          routes: [
            GoRoute(
              path: ':classLevel',
              builder: (_, state) => SubjectListScreen(
                classLevel: state.pathParameters['classLevel']!,
              ),
              routes: [
                GoRoute(
                  path: ':subjectSlug',
                  builder: (_, state) => ChapterListScreen(
                    classLevel:  state.pathParameters['classLevel']!,
                    subjectSlug: state.pathParameters['subjectSlug']!,
                    subject:     state.extra as Subject?,
                  ),
                  routes: [
                    GoRoute(
                      path: ':chapterSlug',
                      builder: (_, state) => ChapterDetailScreen(
                        classLevel:  state.pathParameters['classLevel']!,
                        subjectSlug: state.pathParameters['subjectSlug']!,
                        chapterSlug: state.pathParameters['chapterSlug']!,
                        chapter:     state.extra as Chapter?,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),

        GoRoute(
          path: '/progress',
          builder: (_, __) => const ProgressScreen(),
        ),

        GoRoute(
          path: '/learn/:classLevel/:subjectSlug/:chapterSlug',
          builder: (_, state) => LearnScreen(
            classLevel:  state.pathParameters['classLevel']!,
            subjectSlug: state.pathParameters['subjectSlug']!,
            chapterSlug: state.pathParameters['chapterSlug']!,
            chapter:     state.extra as Chapter?,
          ),
        ),

        GoRoute(
          path: '/rich-learn/:classLevel/:subjectSlug/:chapterSlug',
          builder: (_, state) {
            final extra = state.extra as Map<String, dynamic>?;
            return RichLearnScreen(
              classLevel:   state.pathParameters['classLevel']!,
              subjectSlug:  state.pathParameters['subjectSlug']!,
              chapterSlug:  state.pathParameters['chapterSlug']!,
              chapter:      extra?['chapter'] as Chapter?,
              initialTabId: extra?['tab']     as String?,
            );
          },
        ),

        GoRoute(
          path: '/practice/:classLevel/:subjectSlug/:chapterSlug',
          builder: (_, state) => ExamPracticeScreen(
            classLevel:  state.pathParameters['classLevel']!,
            subjectSlug: state.pathParameters['subjectSlug']!,
            chapterSlug: state.pathParameters['chapterSlug']!,
            chapter:     state.extra as Chapter?,
          ),
        ),

        GoRoute(
          path: '/exam/:classLevel/:subjectSlug/:chapterSlug',
          builder: (_, state) => ExamPracticeScreen(
            classLevel:  state.pathParameters['classLevel']!,
            subjectSlug: state.pathParameters['subjectSlug']!,
            chapterSlug: state.pathParameters['chapterSlug']!,
            chapter:     state.extra as Chapter?,
          ),
        ),

      ],
    ),

  ],

  errorBuilder: (_, state) => Scaffold(
    appBar: AppBar(title: const Text('Not Found')),
    body: Center(child: Text('Page not found: ${state.uri}')),
  ),
);
