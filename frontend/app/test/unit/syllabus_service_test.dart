import 'package:flutter_test/flutter_test.dart';
import 'package:exam_coach/models/syllabus_model.dart';
import 'package:exam_coach/services/syllabus_service.dart';

Chapter _ch(int number, String contentType) => Chapter(
  id: 'id-$number',
  slug: 'ch-$number',
  subjectId: 'sub-1',
  number: number,
  title: 'Chapter $number',
  contentType: contentType,
  isActive: true,
);

void main() {
  final svc = SyllabusService();

  group('groupByType', () {
    test('groups prose and poem separately', () {
      final chapters = [_ch(2, 'prose'), _ch(1, 'poem'), _ch(3, 'prose')];
      final result = svc.groupByType(chapters);
      expect(result.keys, containsAll(['Prose', 'Poetry']));
      expect(result['Prose']!.map((c) => c.number).toList(), [2, 3]);
      expect(result['Poetry']!.map((c) => c.number).toList(), [1]);
    });

    test('sorts chapters by number within each group', () {
      final chapters = [_ch(3, 'prose'), _ch(1, 'prose'), _ch(2, 'prose')];
      final result = svc.groupByType(chapters);
      expect(result['Prose']!.map((c) => c.number).toList(), [1, 2, 3]);
    });

    test('empty list returns empty map', () {
      expect(svc.groupByType([]), isEmpty);
    });

    test('all types produce correct group keys', () {
      final chapters = [
        _ch(1, 'prose'),
        _ch(2, 'poem'),
        _ch(3, 'grammar'),
        _ch(4, 'vocabulary'),
        _ch(5, 'supplementary'),
      ];
      final result = svc.groupByType(chapters);
      expect(result.keys.toSet(),
          {'Prose', 'Poetry', 'Grammar', 'Vocabulary', 'Supplementary'});
    });

    test('single chapter produces single-item group', () {
      final result = svc.groupByType([_ch(1, 'prose')]);
      expect(result['Prose']!.length, 1);
    });

    test('unknown content type uses raw value as key', () {
      final result = svc.groupByType([_ch(1, 'drama')]);
      expect(result.containsKey('drama'), isTrue);
    });
  });
}
