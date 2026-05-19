import 'package:flutter/material.dart';

class FeedbackDetail {
  final List<String> strengths;
  final List<String> weaknesses;
  final List<String> missingPoints;
  final String       structureComment;
  final String       grammarComment;

  const FeedbackDetail({
    required this.strengths,
    required this.weaknesses,
    required this.missingPoints,
    required this.structureComment,
    required this.grammarComment,
  });

  factory FeedbackDetail.fromJson(Map<String, dynamic> json) =>
      FeedbackDetail(
        strengths:        List<String>.from(json['strengths'] ?? []),
        weaknesses:       List<String>.from(json['weaknesses'] ?? []),
        missingPoints:    List<String>.from(json['missing_points'] ?? []),
        structureComment: json['structure_comment'] as String? ?? '',
        grammarComment:   json['grammar_comment'] as String? ?? '',
      );
}

class EvaluationResponse {
  final String         responseId;
  final String         questionId;
  final double         marksAwarded;
  final int            marksTotal;
  final double         percentage;
  final FeedbackDetail feedback;
  final String         improvedAnswer;
  final String         modelUsed;
  final bool           cached;

  const EvaluationResponse({
    required this.responseId,
    required this.questionId,
    required this.marksAwarded,
    required this.marksTotal,
    required this.percentage,
    required this.feedback,
    required this.improvedAnswer,
    required this.modelUsed,
    required this.cached,
  });

  factory EvaluationResponse.fromJson(Map<String, dynamic> json) =>
      EvaluationResponse(
        responseId:    json['response_id'] as String,
        questionId:    json['question_id'] as String,
        marksAwarded:  (json['marks_awarded'] as num).toDouble(),
        marksTotal:    json['marks_total'] as int,
        percentage:    (json['percentage'] as num).toDouble(),
        feedback:      FeedbackDetail.fromJson(
                         json['feedback'] as Map<String, dynamic>,
                       ),
        improvedAnswer: json['improved_answer'] as String? ?? '',
        modelUsed:      json['model_used'] as String,
        cached:         json['cached'] as bool? ?? false,
      );

  String get scoreLabel =>
      '${marksAwarded % 1 == 0 ? marksAwarded.toInt() : marksAwarded}'
      '/$marksTotal marks';

  String get encouragement => percentage >= 80
      ? '🎉 Excellent work!'
      : percentage >= 50
          ? '👍 Good effort — keep going!'
          : '💪 Keep practising!';

  Color get scoreColor {
    if (percentage >= 80) return const Color(0xFF16A34A);
    if (percentage >= 50) return const Color(0xFFD97706);
    return const Color(0xFFDC2626);
  }
}
