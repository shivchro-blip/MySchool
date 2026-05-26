import '../../models/exam_paper_model.dart';
import 'class11_english_2025_annual.dart';
import 'class11_english_2024_annual.dart';
import 'class11_english_2023_annual.dart';
import 'class11_english_2022_annual.dart';
import 'class12_english_2025_annual.dart';
import 'class12_english_2024_annual.dart';
import 'class12_english_2023_annual.dart';
import 'class12_english_2022_annual.dart';

const _papers = <ExamPaperData>[
  class11English2025Annual,
  class11English2024Annual,
  class11English2023Annual,
  class11English2022Annual,
  class12English2025Annual,
  class12English2024Annual,
  class12English2023Annual,
  class12English2022Annual,
];

ExamPaperData? getExamPaperById(String paperId) {
  for (final paper in _papers) {
    if (paper.paperId == paperId) return paper;
  }
  return null;
}
