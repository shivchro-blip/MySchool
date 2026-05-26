import 'package:flutter/foundation.dart';

enum ModelPracticeQuestionType { mcq, reference, written }

@immutable
class ModelPracticeSubQuestion {
  final String prompt;
  final String modelAnswer;
  final String officialKey;

  const ModelPracticeSubQuestion({
    required this.prompt,
    required this.modelAnswer,
    this.officialKey = '',
  });
}

@immutable
class ModelPracticeQuestion {
  final int number;
  final String sourceId;
  final ModelPracticeQuestionType type;
  final String partId;
  final String partTitle;
  final String sectionName;
  final String sectionInstructions;
  final String groupLabel;
  final int marks;
  final int? partScoreMax;
  final String prompt;
  final List<String> options;
  final int? correctIndex;
  final String officialKey;
  final String? referenceText;
  final List<ModelPracticeSubQuestion> subQuestions;
  final String? modelAnswer;

  const ModelPracticeQuestion({
    required this.number,
    required this.sourceId,
    required this.type,
    required this.partId,
    required this.partTitle,
    required this.sectionName,
    required this.sectionInstructions,
    required this.groupLabel,
    required this.marks,
    this.partScoreMax,
    required this.prompt,
    this.options = const <String>[],
    this.correctIndex,
    this.officialKey = '',
    this.referenceText,
    this.subQuestions = const <ModelPracticeSubQuestion>[],
    this.modelAnswer,
  });
}

@immutable
class ModelPaperAttemptSummary {
  final int score;
  final int total;
  final DateTime date;

  const ModelPaperAttemptSummary({
    required this.score,
    required this.total,
    required this.date,
  });

  int get percentage => total > 0 ? ((score / total) * 100).round() : 0;
}
