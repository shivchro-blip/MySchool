import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:exam_coach/models/syllabus_model.dart';
import 'package:exam_coach/models/user_model.dart';
import 'package:exam_coach/providers/syllabus_provider.dart';
import 'package:exam_coach/providers/user_provider.dart';
import 'package:exam_coach/services/syllabus_service.dart';
import 'package:exam_coach/services/user_service.dart';

class MockSyllabusService extends Mock implements SyllabusService {}
class MockUserService extends Mock implements UserService {}

final _sub1 = Subject(id: '1', slug: 'eng', code: 'ENG',
    name: 'English', classLevel: '+1', isActive: true);
final _sub2 = Subject(id: '2', slug: 'math', code: 'MATH',
    name: 'Maths', classLevel: '+2', isActive: true);
final _inactive = Subject(id: '3', slug: 'sci', code: 'SCI',
    name: 'Science', classLevel: '+1', isActive: false);

final _profile = UserProfile(
    id: 'u1', fullName: 'Meena', plan: 'free', dailyAiCalls: 0);

void main() {
  group('SyllabusProvider', () {
    late MockSyllabusService mockSvc;
    late SyllabusProvider provider;

    setUp(() {
      mockSvc  = MockSyllabusService();
      provider = SyllabusProvider(mockSvc);
    });

    test('initial state: not loaded, no error, empty subjects', () {
      expect(provider.loaded, isFalse);
      expect(provider.error, isNull);
      expect(provider.subjects, isEmpty);
    });

    test('load success sets subjects and loaded=true', () async {
      when(() => mockSvc.getSubjects())
          .thenAnswer((_) async => [_sub1, _sub2, _inactive]);
      await provider.load();
      expect(provider.loaded, isTrue);
      expect(provider.subjects.length, 3);
      expect(provider.error, isNull);
    });

    test('byClass filters by classLevel and isActive', () async {
      when(() => mockSvc.getSubjects())
          .thenAnswer((_) async => [_sub1, _sub2, _inactive]);
      await provider.load();
      final plus1 = provider.byClass('+1');
      expect(plus1.length, 1);
      expect(plus1.first.slug, 'eng');
    });

    test('plus1Count and plus2Count', () async {
      when(() => mockSvc.getSubjects())
          .thenAnswer((_) async => [_sub1, _sub2, _inactive]);
      await provider.load();
      expect(provider.plus1Count, 1);
      expect(provider.plus2Count, 1);
    });

    test('load error sets error string, loaded stays false', () async {
      when(() => mockSvc.getSubjects()).thenThrow(Exception('network'));
      await provider.load();
      expect(provider.loaded, isFalse);
      expect(provider.error, contains('network'));
    });

    test('loadIfNeeded skips second network call when already loaded', () async {
      when(() => mockSvc.getSubjects())
          .thenAnswer((_) async => [_sub1]);
      await provider.loadIfNeeded();
      await provider.loadIfNeeded();
      verify(() => mockSvc.getSubjects()).called(1);
    });
  });

  group('UserProvider', () {
    late MockUserService mockSvc;
    late UserProvider provider;

    setUp(() {
      mockSvc  = MockUserService();
      provider = UserProvider(mockSvc);
    });

    test('initial state: profile null, not loading', () {
      expect(provider.profile, isNull);
      expect(provider.loading, isFalse);
    });

    test('load success sets profile', () async {
      when(() => mockSvc.getProfile()).thenAnswer((_) async => _profile);
      await provider.load();
      expect(provider.profile?.fullName, 'Meena');
      expect(provider.loading, isFalse);
      expect(provider.error, isNull);
    });

    test('load error sets error string', () async {
      when(() => mockSvc.getProfile()).thenThrow(Exception('auth'));
      await provider.load();
      expect(provider.profile, isNull);
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
      expect(provider.error, isNull);
    });
  });
}
