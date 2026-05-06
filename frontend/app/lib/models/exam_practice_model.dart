import 'package:flutter/foundation.dart';

enum ExamQuestionType { mcq, reference, written }

@immutable
class SubQuestion {
  final String q;
  final String modelAnswer;
  const SubQuestion({required this.q, required this.modelAnswer});
}

@immutable
class ExamQuestion {
  final int              id;
  final ExamQuestionType type;
  final int              marks;
  // MCQ
  final String?       html;
  final List<String>? options;
  final int?          correct;
  final String?       hint;
  final String?       section;
  // Reference
  final String?             verse;
  final List<SubQuestion>?  subs;
  // Written
  final String? modelAnswer;

  const ExamQuestion({
    required this.id,
    required this.type,
    required this.marks,
    this.html,
    this.options,
    this.correct,
    this.hint,
    this.section,
    this.verse,
    this.subs,
    this.modelAnswer,
  });
}

class ExamAttempt {
  final int      id;
  String         status;       // 'in_progress' | 'submitted'
  Map<int, Object> answers;    // mcq→int, written→String, reference→Map<int,String>
  int?           mcqScore;
  DateTime?      submittedAt;

  ExamAttempt({
    required this.id,
    this.status      = 'in_progress',
    Map<int, Object>? answers,
    this.mcqScore,
    this.submittedAt,
  }) : answers = answers ?? {};
}
