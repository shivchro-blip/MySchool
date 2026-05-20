import '../models/syllabus_model.dart';
import 'api_service.dart';

class SyllabusService {
  final _api = ApiService();

  Future<List<Subject>> getSubjects() async {
    final data = await _api.get('/syllabus/subjects', auth: false);
    return (data as List).map((j) => Subject.fromJson(j)).toList();
  }

  Future<List<Subject>> getSubjectsByClass(String classLevel) async {
    final all = await getSubjects();
    return all.where((s) => s.classLevel == classLevel && s.isActive).toList();
  }

  // Uses subject SLUG — backend route: /syllabus/subjects/{subject_slug}/chapters
  Future<List<Chapter>> getChapters(String subjectSlug) async {
    final data = await _api.get(
      '/syllabus/subjects/$subjectSlug/chapters',
      auth: false,
    );
    return (data as List)
        .map((j) => Chapter.fromJson(j))
        .where((c) => c.isActive)
        .toList();
  }

  // Uses chapter SLUG — backend route: /syllabus/chapters/{chapter_slug}/topics
  Future<List<Topic>> getTopics(String chapterSlug) async {
    final data = await _api.get(
      '/syllabus/chapters/$chapterSlug/topics',
      auth: false,
    );
    return (data as List).map((j) => Topic.fromJson(j)).toList();
  }

  // Uses chapter SLUG — backend route: /syllabus/chapters/{chapter_slug}/questions
  Future<List<Question>> getQuestions(String chapterSlug, {int? marks}) async {
    final query = marks != null ? '?marks=$marks' : '';
    final data  = await _api.get(
      '/syllabus/chapters/$chapterSlug/questions$query',
      auth: false,
    );
    return (data as List).map((j) => Question.fromJson(j)).toList();
  }

  // Group chapters by content type, sorted by number within each group
  Map<String, List<Chapter>> groupByType(List<Chapter> chapters) {
    final groups = <String, List<Chapter>>{};
    for (final ch in chapters) {
      (groups[ch.typeLabel] ??= []).add(ch);
    }
    for (final list in groups.values) {
      list.sort((a, b) => a.number.compareTo(b.number));
    }
    return groups;
  }
}
