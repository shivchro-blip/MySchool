import 'package:flutter_test/flutter_test.dart';
import 'package:exam_coach/models/syllabus_model.dart';
import 'package:exam_coach/models/user_model.dart';

void main() {
  group('Subject.fromJson', () {
    test('maps standard fields', () {
      final s = Subject.fromJson({
        'id': 'uuid-1',
        'slug': 'english',
        'code': 'ENG',
        'name': 'English',
        'class_level': '+1',
        'is_active': true,
      });
      expect(s.id, 'uuid-1');
      expect(s.slug, 'english');
      expect(s.classLevel, '+1');
      expect(s.isActive, isTrue);
    });

    test('slug falls back to code when absent', () {
      final s = Subject.fromJson({
        'id': 'uuid-2',
        'code': 'MATH',
        'name': 'Maths',
        'class_level': '+2',
      });
      expect(s.slug, 'MATH');
    });

    test('is_active defaults true', () {
      final s = Subject.fromJson({
        'id': 'uuid-3',
        'code': 'SCI',
        'name': 'Science',
        'class_level': '+1',
      });
      expect(s.isActive, isTrue);
    });

    test('class_level falls back to class key', () {
      final s = Subject.fromJson({
        'id': 'uuid-4',
        'code': 'ENG',
        'name': 'English',
        'class': '+2',
      });
      expect(s.classLevel, '+2');
    });
  });

  group('Chapter.fromJson + getters', () {
    Chapter make(String contentType) => Chapter.fromJson({
      'id': 'ch-1',
      'slug': 'chapter-one',
      'subject_id': 'sub-1',
      'number': 1,
      'title': 'Test Chapter',
      'content_type': contentType,
    });

    test('prose → typeLabel Prose, typeIcon 📖', () {
      final ch = make('prose');
      expect(ch.typeLabel, 'Prose');
      expect(ch.typeIcon, '📖');
    });

    test('poem → typeLabel Poetry, typeIcon 🎵', () {
      final ch = make('poem');
      expect(ch.typeLabel, 'Poetry');
      expect(ch.typeIcon, '🎵');
    });

    test('grammar → Grammar / ✏️', () {
      final ch = make('grammar');
      expect(ch.typeLabel, 'Grammar');
      expect(ch.typeIcon, '✏️');
    });

    test('vocabulary → Vocabulary / 🔤', () {
      final ch = make('vocabulary');
      expect(ch.typeLabel, 'Vocabulary');
      expect(ch.typeIcon, '🔤');
    });

    test('supplementary → Supplementary / 📝', () {
      final ch = make('supplementary');
      expect(ch.typeLabel, 'Supplementary');
      expect(ch.typeIcon, '📝');
    });

    test('unknown type → passthrough label / 📄', () {
      final ch = make('drama');
      expect(ch.typeLabel, 'drama');
      expect(ch.typeIcon, '📄');
    });

    test('is_active defaults true', () {
      expect(make('prose').isActive, isTrue);
    });
  });

  group('Question.fromJson + getters', () {
    Question make(int marks) => Question.fromJson({
      'id': 'q-1',
      'question_text': 'What is X?',
      'marks': marks,
      'question_type': 'short_answer',
    });

    test('partLabel 1-mark → Part I', () {
      expect(make(1).partLabel, 'Part I — Very Short Answer');
    });

    test('partLabel 2-mark → Part II', () {
      expect(make(2).partLabel, 'Part II — Short Answer');
    });

    test('partLabel 5-mark → Part III', () {
      expect(make(5).partLabel, 'Part III — Short Essay');
    });

    test('partLabel 10-mark → Part IV', () {
      expect(make(10).partLabel, 'Part IV — Long Essay');
    });

    test('partLabel unknown → Questions', () {
      expect(make(3).partLabel, 'Questions');
    });

    test('is_validated defaults false', () {
      expect(make(1).isValidated, isFalse);
    });
  });

  group('UserProfile.fromJson', () {
    test('maps all fields', () {
      final p = UserProfile.fromJson({
        'id': 'user-1',
        'full_name': 'Karthik',
        'class_level': '+1',
        'school': 'GHS Coimbatore',
        'plan': 'pro',
        'daily_ai_calls': 5,
      });
      expect(p.id, 'user-1');
      expect(p.displayName, 'Karthik');
      expect(p.plan, 'pro');
      expect(p.dailyAiCalls, 5);
    });

    test('displayName falls back to Student when fullName null', () {
      final p = UserProfile.fromJson({
        'id': 'user-2',
        'plan': 'free',
        'daily_ai_calls': 0,
      });
      expect(p.displayName, 'Student');
    });

    test('displayName falls back to Student when fullName empty', () {
      final p = UserProfile.fromJson({
        'id': 'user-3',
        'full_name': '',
        'plan': 'free',
        'daily_ai_calls': 0,
      });
      expect(p.displayName, 'Student');
    });

    test('plan defaults to free', () {
      final p = UserProfile.fromJson({'id': 'u', 'daily_ai_calls': 0});
      expect(p.plan, 'free');
    });
  });

  group('UsageStats.fromJson', () {
    test('maps all fields', () {
      final s = UsageStats.fromJson({
        'daily_ai_calls': 3,
        'daily_limit': 10,
        'calls_remaining': 7,
        'plan': 'free',
      });
      expect(s.dailyAiCalls, 3);
      expect(s.dailyLimit, 10);
      expect(s.callsRemaining, 7);
    });

    test('defaults when fields absent', () {
      final s = UsageStats.fromJson({});
      expect(s.dailyAiCalls, 0);
      expect(s.dailyLimit, 20);
      expect(s.callsRemaining, 20);
      expect(s.plan, 'free');
    });
  });
}
