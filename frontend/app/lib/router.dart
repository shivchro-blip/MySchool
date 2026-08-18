import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'services/auth_service.dart';
import 'services/user_preferences_service.dart';
import 'models/syllabus_model.dart';

import 'screens/login_screen.dart';
import 'screens/auth_callback_screen.dart';
import 'screens/onboarding_screen.dart';
import 'screens/dashboard_screen.dart';
import 'screens/courses_screen.dart';
import 'screens/subject_list_screen.dart';
import 'screens/chapter_list_screen.dart';
import 'screens/chapter_detail_screen.dart';
import 'screens/learn_screen.dart';
import 'screens/rich_learn_screen.dart';
import 'screens/sectioned_learn_screen.dart';
import 'screens/exam_practice_screen.dart';
import 'screens/final_exam_prep_screen.dart';
import 'screens/exam_paper_viewer_screen.dart';
import 'screens/model_paper_attempt_history_screen.dart';
import 'screens/model_paper_practice_session_screen.dart';
import 'screens/model_paper_viewer_screen.dart';
import 'screens/progress_screen.dart';
import 'screens/settings_screen.dart';
import 'screens/privacy_screen.dart';
import 'screens/terms_screen.dart';
import 'screens/contact_screen.dart';
import 'screens/delete_account_screen.dart';
import 'widgets/shell_scaffold.dart';

final router = GoRouter(
  initialLocation: '/dashboard',
  redirect: (context, state) async {
    if (state.matchedLocation == '/') return '/dashboard';

    final loggedIn = await AuthService().isLoggedIn();
    final onLogin = state.matchedLocation == '/login';
    // OAuth callback processes tokens before storing them — exempt from auth gate.
    final onCallback = state.matchedLocation == '/auth/callback';

    if (!loggedIn && !onLogin && !onCallback) return '/login';
    if (loggedIn && onLogin) return '/dashboard';

    // Onboarding gate — uses SharedPreferences as a fast cache.
    // null means unknown (first install / fresh login); dashboard initState
    // will do the definitive check after loading the user profile from API.
    if (loggedIn) {
      final onboarded = await UserPreferencesService.getOnboardingCompleted();
      final onOnboarding = state.matchedLocation == '/onboarding';

      if (onboarded == false && !onOnboarding) return '/onboarding';
      if (onboarded == true && onOnboarding) return '/dashboard';
    }

    return null;
  },
  routes: [
    GoRoute(path: '/login', builder: (_, __) => const LoginScreen()),
    GoRoute(
        path: '/auth/callback', builder: (_, __) => const AuthCallbackScreen()),
    GoRoute(path: '/onboarding', builder: (_, __) => const OnboardingScreen()),

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
                    classLevel: state.pathParameters['classLevel']!,
                    subjectSlug: state.pathParameters['subjectSlug']!,
                    subject: state.extra as Subject?,
                  ),
                  routes: [
                    GoRoute(
                      path: 'final-exam-prep',
                      builder: (_, state) => FinalExamPrepScreen(
                        classLevel: state.pathParameters['classLevel']!,
                        subjectSlug: state.pathParameters['subjectSlug']!,
                      ),
                      routes: [
                        GoRoute(
                          path: 'paper/:paperId',
                          builder: (_, state) => ExamPaperViewerScreen(
                            paperId: state.pathParameters['paperId']!,
                            classLevel: state.pathParameters['classLevel']!,
                            subjectSlug: state.pathParameters['subjectSlug']!,
                          ),
                        ),
                      ],
                    ),
                    GoRoute(
                      path: ':chapterSlug',
                      builder: (_, state) => ChapterDetailScreen(
                        classLevel: state.pathParameters['classLevel']!,
                        subjectSlug: state.pathParameters['subjectSlug']!,
                        chapterSlug: state.pathParameters['chapterSlug']!,
                        chapter: state.extra as Chapter?,
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
          path: '/settings',
          builder: (_, __) => const SettingsScreen(),
        ),
        GoRoute(
          path: '/privacy',
          builder: (_, __) => const PrivacyScreen(),
        ),
        GoRoute(
          path: '/terms',
          builder: (_, __) => const TermsScreen(),
        ),
        GoRoute(
          path: '/contact',
          builder: (_, __) => const ContactScreen(),
        ),
        GoRoute(
          path: '/delete-account',
          builder: (_, __) => const DeleteAccountScreen(),
        ),
        GoRoute(
          path: '/learn/:classLevel/:subjectSlug/:chapterSlug',
          builder: (_, state) => LearnScreen(
            classLevel: state.pathParameters['classLevel']!,
            subjectSlug: state.pathParameters['subjectSlug']!,
            chapterSlug: state.pathParameters['chapterSlug']!,
            chapter: state.extra as Chapter?,
          ),
        ),
        GoRoute(
          path: '/rich-learn/:classLevel/:subjectSlug/:chapterSlug',
          builder: (_, state) {
            final extra = state.extra as Map<String, dynamic>?;
            return RichLearnScreen(
              classLevel: state.pathParameters['classLevel']!,
              subjectSlug: state.pathParameters['subjectSlug']!,
              chapterSlug: state.pathParameters['chapterSlug']!,
              chapter: extra?['chapter'] as Chapter?,
              initialTabId: extra?['tab'] as String?,
            );
          },
        ),
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
        GoRoute(
          path: '/practice/:classLevel/:subjectSlug/:chapterSlug',
          builder: (_, state) => ExamPracticeScreen(
            classLevel: state.pathParameters['classLevel']!,
            subjectSlug: state.pathParameters['subjectSlug']!,
            chapterSlug: state.pathParameters['chapterSlug']!,
            chapter: state.extra as Chapter?,
          ),
        ),
        GoRoute(
          path: '/exam/:classLevel/:subjectSlug/:chapterSlug',
          builder: (_, state) => ExamPracticeScreen(
            classLevel: state.pathParameters['classLevel']!,
            subjectSlug: state.pathParameters['subjectSlug']!,
            chapterSlug: state.pathParameters['chapterSlug']!,
            chapter: state.extra as Chapter?,
          ),
        ),
        GoRoute(
          path: '/model-exam/:classLevel/:subjectSlug/:modelId',
          builder: (_, state) => ExamPracticeScreen(
            classLevel: state.pathParameters['classLevel']!,
            subjectSlug: state.pathParameters['subjectSlug']!,
            chapterSlug: state.pathParameters['modelId']!,
          ),
        ),
        GoRoute(
          path: '/model-paper/view/:classLevel/:subject/:setId',
          builder: (_, state) => ModelPaperViewerScreen(
            classLevel: state.pathParameters['classLevel']!,
            subjectSlug: state.pathParameters['subject']!,
            setId: state.pathParameters['setId']!,
          ),
        ),
        GoRoute(
          path: '/model-paper/practice/:classLevel/:subject/:setId',
          builder: (_, state) => ModelPaperPracticeSessionScreen(
            classLevel: state.pathParameters['classLevel']!,
            subjectSlug: state.pathParameters['subject']!,
            setId: state.pathParameters['setId']!,
          ),
        ),
        GoRoute(
          path: '/model-paper/history/:classLevel/:subject/:setId',
          builder: (_, state) => ModelPaperAttemptHistoryScreen(
            classLevel: state.pathParameters['classLevel']!,
            subjectSlug: state.pathParameters['subject']!,
            setId: state.pathParameters['setId']!,
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
