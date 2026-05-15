import '../../models/exam_paper_model.dart';
import 'class11_english_2025_annual.dart';

const _papers = <ExamPaperData>[
  class11English2025Annual,
];

ExamPaperData? getExamPaperById(String paperId) {
  for (final paper in _papers) {
    if (paper.paperId == paperId) return paper;
  }
  return null;
}
