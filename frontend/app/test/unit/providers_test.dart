import 'package:flutter_test/flutter_test.dart';
import 'package:exam_coach/models/user_model.dart';
import 'package:exam_coach/config/syllabus_config.dart';
import 'package:exam_coach/providers/syllabus_provider.dart';
import 'package:exam_coach/providers/user_provider.dart';
import 'package:exam_coach/services/user_service.dart';
import 'package:mocktail/mocktail.dart';

class MockUserService extends Mock implements UserService {}

const _profile =
    UserProfile(id: 'u1', fullName: 'Meena', plan: 'free', dailyAiCalls: 0);

void main() {
  group('SyllabusProvider', () {
    late SyllabusProvider provider;

    setUp(() {
      provider = SyllabusProvider();
    });

    test('initial state: not loaded, no error, empty subjects', () {
      expect(provider.loaded, isFalse);
      expect(provider.error, isNull);
      expect(provider.subjects, isEmpty);
    });

    test('load success sets subjects and loaded=true', () async {
      await provider.load();
      expect(provider.loaded, isTrue);
      expect(provider.subjects, SyllabusConfig.getSubjects());
      expect(provider.error, isNull);
    });

    test('byClass filters by classLevel and isActive', () async {
      await provider.load();
      final plus1 = provider.byClass('+1');
      expect(plus1.length, 3);
      expect(
        plus1.map((s) => s.slug),
        containsAll(const ['english', 'maths', 'science']),
      );
    });

    test('plus1Count and plus2Count', () async {
      await provider.load();
      expect(provider.plus1Count, 3);
      expect(provider.plus2Count, 2);
    });

    test('course class levels expose both dashboard courses', () {
      expect(SyllabusConfig.courseClassLevels, const ['+1', '+2']);
      expect(SyllabusConfig.courseCount, 2);
      expect(SyllabusConfig.subjectCountForClass('+1'), 3);
      expect(SyllabusConfig.subjectCountForClass('+2'), 2);
    });

    test('load error sets error string, loaded stays false', () async {
      await provider.load();
      expect(provider.loaded, isTrue);
      expect(provider.error, isNull);
    });

    test('loadIfNeeded skips second network call when already loaded',
        () async {
      await provider.loadIfNeeded();
      await provider.loadIfNeeded();
      expect(provider.loaded, isTrue);
    });
  });

  group('UserProvider', () {
    late MockUserService mockSvc;
    late UserProvider provider;

    setUp(() {
      mockSvc = MockUserService();
      provider = UserProvider(mockSvc);
    });

    test('initial state: profile null, not loading', () {
      expect(provider.profile, isNull);
      expect(provider.loading, isFalse);
      expect(provider.loaded, isFalse);
    });

    test('load success sets profile', () async {
      when(() => mockSvc.getProfile()).thenAnswer((_) async => _profile);
      await provider.load();
      expect(provider.profile?.fullName, 'Meena');
      expect(provider.loading, isFalse);
      expect(provider.loaded, isTrue);
      expect(provider.error, isNull);
    });

    test('load error sets error string', () async {
      when(() => mockSvc.getProfile()).thenThrow(Exception('auth'));
      await provider.load();
      expect(provider.profile, isNull);
      expect(provider.loaded, isTrue);
      expect(provider.error, contains('auth'));
    });

    test('loadIfNeeded skips second network call', () async {
      when(() => mockSvc.getProfile()).thenAnswer((_) async => _profile);
      await provider.loadIfNeeded();
      await provider.loadIfNeeded();
      verify(() => mockSvc.getProfile()).called(1);
    });

    test('clear resets profile and error', () async {
      when(() => mockSvc.getProfile()).thenAnswer((_) async => _profile);
      await provider.load();
      provider.clear();
      expect(provider.profile, isNull);
      expect(provider.loaded, isFalse);
      expect(provider.error, isNull);
    });
  });
}
