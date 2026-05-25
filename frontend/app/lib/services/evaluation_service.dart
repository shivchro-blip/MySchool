import '../models/evaluation_model.dart';
import 'api_service.dart';

class EvaluationService {
  final _api = ApiService();

  Future<EvaluationResponse> submit({
    required String questionId,
    required String studentAnswer,
    int             attemptNumber = 1,
  }) async {
    final data = await _api.post('/evaluation/submit', {
      'question_id':    questionId,
      'student_answer': studentAnswer,
      'attempt_number': attemptNumber,
    });
    return EvaluationResponse.fromJson(data as Map<String, dynamic>);
  }

  Future<EvaluationResponse> retry({
    required String responseId,
    required String newAnswer,
  }) async {
    final data = await _api.post('/evaluation/retry', {
      'response_id': responseId,
      'new_answer':  newAnswer,
    });
    return EvaluationResponse.fromJson(data as Map<String, dynamic>);
  }

  Future<Map<String, dynamic>> getProgress() async {
    return (await _api.get('/evaluation/progress')) as Map<String, dynamic>;
  }

  Future<List<dynamic>> getHistory({int limit = 20}) async {
    try {
      final data = await _api.get('/evaluation/history?limit=$limit');
      return (data as Map<String, dynamic>)['history'] as List<dynamic>? ?? [];
    } catch (_) {
      return [];
    }
  }
}
