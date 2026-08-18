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
