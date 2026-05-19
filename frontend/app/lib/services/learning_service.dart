import '../models/learning_model.dart';
import 'api_service.dart';

class LearningService {
  final _api = ApiService();

  Future<ExplainResponse> explain({
    required String chapterId,
    String?         topicId,
    String          question = '',
    String          language = 'en',
  }) async {
    final data = await _api.post('/learning/explain', {
      'chapter_id': chapterId,
      if (topicId != null) 'topic_id': topicId,
      'question':   question,
      'language':   language,
    });
    return ExplainResponse.fromJson(data as Map<String, dynamic>);
  }
}
