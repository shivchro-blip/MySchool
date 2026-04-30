import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'services/auth_service.dart';
import 'screens/login_screen.dart';
import 'screens/home_screen.dart';
import 'screens/learn_screen.dart';
import 'screens/practice_screen.dart';
import 'screens/progress_screen.dart';

final router = GoRouter(
  initialLocation: '/',
  redirect: (context, state) async {
    final loggedIn = await AuthService().isLoggedIn();
    final onLogin  = state.matchedLocation == '/login';
    if (!loggedIn && !onLogin) return '/login';
    if (loggedIn && onLogin)  return '/';
    return null;
  },
  routes: [
    GoRoute(path: '/login',    builder: (_, __) => const LoginScreen()),
    GoRoute(path: '/',         builder: (_, __) => const HomeScreen()),
    GoRoute(
      path:    '/learn/:chapterId',
      builder: (_, state) => LearnScreen(
        chapterId: state.pathParameters['chapterId']!,
      ),
    ),
    GoRoute(
      path:    '/practice/:chapterId',
      builder: (_, state) => PracticeScreen(
        chapterId: state.pathParameters['chapterId']!,
      ),
    ),
    GoRoute(path: '/progress', builder: (_, __) => const ProgressScreen()),
  ],
  errorBuilder: (_, state) => Scaffold(
    body: Center(child: Text('Page not found: ${state.error}')),
  ),
);
