import '../config/exam_papers/exam_paper_registry.dart';
import '../models/exam_paper_model.dart';
import '../models/exam_practice_model.dart';

/// Converts a viewer-format [ExamPaperData] into a flat list of [ExamQuestion]s
/// for use when no dedicated practice JSON exists.
/// MCQ correct answers are null (no answer key in the viewer data).
class ExamPaperAdapter {
  static List<ExamQuestion> fromPaperId(String paperId) {
    final paper = getExamPaperById(paperId);
    if (paper == null) return const [];
    return adapt(paper);
  }

  static List<ExamQuestion> adapt(ExamPaperData paper) {
    final result = <ExamQuestion>[];
    var idx = 1;

    for (final page in paper.pages) {
      for (final block in page.blocks) {
        switch (block.type) {
          case 'mcq_question':
            if (block.content != null && block.options != null) {
              result.add(ExamQuestion(
                id: idx++,
                type: ExamQuestionType.mcq,
                marks: block.marks ?? 1,
                html: block.content,
                options: block.options!
                    .map((o) => o.replaceFirst(
                          RegExp(r'^[a-d]\)\s*', caseSensitive: false),
                          '',
                        ))
                    .toList(),
                correct: null,
              ));
            }
          case 'multi_subquestion':
            if (block.subQuestions != null) {
              result.add(ExamQuestion(
                id: idx++,
                type: ExamQuestionType.reference,
                marks: block.marks ?? 2,
                verse: block.content,
                subs: block.subQuestions!
                    .map((s) => SubQuestion(q: s.content, modelAnswer: ''))
                    .toList(),
              ));
            }
          case 'or_question':
            final a = block.optionA?.content ?? '';
            final b = block.optionB?.content ?? '';
            final combined = b.isNotEmpty ? '$a\n\nOR\n\n$b' : a;
            if (combined.isNotEmpty) {
              result.add(ExamQuestion(
                id: idx++,
                type: ExamQuestionType.written,
                marks: block.marks ?? 5,
                html: combined,
                modelAnswer: '',
              ));
            }
          case 'question':
            if (block.content != null) {
              result.add(ExamQuestion(
                id: idx++,
                type: ExamQuestionType.written,
                marks: block.marks ?? 2,
                html: block.content,
                modelAnswer: '',
              ));
            }
        }
      }
    }

    return result;
  }
}
