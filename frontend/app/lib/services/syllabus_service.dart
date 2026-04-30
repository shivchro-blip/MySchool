import '../models/syllabus_model.dart';
import 'api_service.dart';

class SyllabusService {
  final _api = ApiService();

  Future<List<Subject>> getSubjects() async {
    final data = await _api.get('/syllabus/subjects', auth: false);
    return (data as List).map((j) => Subject.fromJson(j)).toList();
  }

  Future<List<Chapter>> getChapters(String subjectId) async {
    final data = await _api.get(
      '/syllabus/subjects/$subjectId/chapters',
      auth: false,
    );
    return (data as List).map((j) => Chapter.fromJson(j)).toList();
  }

  Future<List<Topic>> getTopics(String chapterId) async {
    final data = await _api.get(
      '/syllabus/chapters/$chapterId/topics',
      auth: false,
    );
    return (data as List).map((j) => Topic.fromJson(j)).toList();
  }

  Future<List<Question>> getQuestions(String chapterId, {int? marks}) async {
    final query = marks != null ? '?marks=$marks' : '';
    final data  = await _api.get(
      '/syllabus/chapters/$chapterId/questions$query',
      auth: false,
    );
    return (data as List).map((j) => Question.fromJson(j)).toList();
  }
}
