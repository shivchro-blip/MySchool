import 'dart:convert';
import 'package:flutter/services.dart';
import '../models/exam_practice_model.dart';
import '../utils/exam_paper_adapter.dart';
import '../utils/asset_folder.dart';

class ExamPracticeService {
  static Future<List<ExamQuestion>> getQuestions(
    String classLevel,
    String subjectSlug,
    String chapterSlug,
  ) async {
    try {
      final folder = AssetFolder.toFolder(classLevel, subjectSlug);
      final raw = await rootBundle.loadString(
        'assets/content/$folder/practice/$chapterSlug.json',
      );
      final data = jsonDecode(raw) as Map<String, dynamic>;
      return _adapt(data);
    } catch (_) {
      // No practice JSON — fall back to generating questions from viewer data.
      final adapted = ExamPaperAdapter.fromPaperId(chapterSlug);
      return adapted;
    }
  }

static List<ExamQuestion> _adapt(Map<String, dynamic> data) {
    final parts  = data['parts'] as List<dynamic>;
    var   idx    = 1;
    final result = <ExamQuestion>[];

    for (final rawPart in parts) {
      final part  = rawPart as Map<String, dynamic>;
      final type  = part['type']     as String;
      final marks = part['marksPer'] as int? ?? 1;

      if (type == 'mcq') {
        for (final rawSec in (part['sections'] as List<dynamic>)) {
          final sec   = rawSec as Map<String, dynamic>;
          final label = sec['label'] as String? ?? '';
          for (final rawQ in (sec['questions'] as List<dynamic>)) {
            final q = rawQ as Map<String, dynamic>;
            result.add(ExamQuestion(
              id:      idx++,
              type:    ExamQuestionType.mcq,
              marks:   marks,
              section: label,
              html:    q['html'] as String,
              options: (q['options'] as List<dynamic>)
                  .cast<String>()
                  .map((o) => o.replaceFirst(
                        RegExp(r'^[a-d]\)\s*', caseSensitive: false), ''))
                  .toList(),
              correct: q['answer'] as int?,
              hint:    q['hint']   as String?,
            ));
          }
        }
      } else if (type == 'reference') {
        for (final rawQ in (part['questions'] as List<dynamic>)) {
          final q = rawQ as Map<String, dynamic>;
          result.add(ExamQuestion(
            id:    idx++,
            type:  ExamQuestionType.reference,
            marks: marks,
            verse: q['verse'] as String?,
            subs:  (q['subs'] as List<dynamic>).map((s) {
              final sub = s as Map<String, dynamic>;
              return SubQuestion(
                q:           sub['q'] as String,
                modelAnswer: sub['a'] as String,
              );
            }).toList(),
          ));
        }
      } else if (type == 'short-essay' || type == 'long-essay') {
        for (final rawQ in (part['questions'] as List<dynamic>)) {
          final q = rawQ as Map<String, dynamic>;
          result.add(ExamQuestion(
            id:          idx++,
            type:        ExamQuestionType.written,
            marks:       marks,
            html:        q['q']   as String,
            modelAnswer: q['ans'] as String,
          ));
        }
      }
    }

    return result;
  }
}
