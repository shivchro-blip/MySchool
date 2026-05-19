import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:exam_coach/models/syllabus_model.dart';
import 'package:exam_coach/models/user_model.dart';
import 'package:exam_coach/providers/syllabus_provider.dart';
import 'package:exam_coach/providers/user_provider.dart';

// ── Fake providers ────────────────────────────────────────────────────────────

class FakeSyllabusProvider extends SyllabusProvider {
  final List<Subject> _data;

  FakeSyllabusProvider([List<Subject>? data]) : _data = data ?? _defaultSubjects;

  static final _defaultSubjects = [
    Subject(id: '1', slug: 'english', code: 'ENG',
        name: 'English', classLevel: '+1', isActive: true),
    Subject(id: '2', slug: 'maths', code: 'MATH',
        name: 'Maths', classLevel: '+1', isActive: true),
    Subject(id: '3', slug: 'science', code: 'SCI',
        name: 'Science', classLevel: '+2', isActive: true),
  ];

  @override
  List<Subject> get subjects => _data;

  @override
  bool get loaded => true;

  @override
  String? get error => null;
}

class FakeUserProvider extends UserProvider {
  final UserProfile? _fakeProfile;

  FakeUserProvider([UserProfile? profile])
      : _fakeProfile = profile ??
            UserProfile(
              id: 'u1',
              fullName: 'Test Student',
              classLevel: '+1',
              plan: 'free',
              dailyAiCalls: 3,
            );

  @override
  UserProfile? get profile => _fakeProfile;

  @override
  bool get loading => false;

  @override
  String? get error => null;

  @override
  Future<void> loadIfNeeded() async {}

  @override
  Future<void> load() async {}
}

// ── Widget pump helper ────────────────────────────────────────────────────────

/// Wraps [widget] in providers + a GoRouter pointing at [location].
Future<void> pumpApp(
  WidgetTester tester,
  Widget widget, {
  String location = '/',
  FakeSyllabusProvider? syllabusProvider,
  FakeUserProvider? userProvider,
}) async {
  final router = GoRouter(
    initialLocation: location,
    routes: [
      GoRoute(
        path: location,
        builder: (_, __) => widget,
      ),
    ],
  );

  await tester.pumpWidget(
    MultiProvider(
      providers: [
        ChangeNotifierProvider<SyllabusProvider>(
            create: (_) => syllabusProvider ?? FakeSyllabusProvider()),
        ChangeNotifierProvider<UserProvider>(
            create: (_) => userProvider ?? FakeUserProvider()),
      ],
      child: MaterialApp.router(routerConfig: router),
    ),
  );
}
