import 'package:flutter/material.dart';
import '../widgets/exam_paper_viewer/exam_paper_viewer.dart';

class ExamPaperViewerScreen extends StatelessWidget {
  final String paperId;
  final String classLevel;
  final String subjectSlug;

  const ExamPaperViewerScreen({
    super.key,
    required this.paperId,
    required this.classLevel,
    required this.subjectSlug,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF1C1C1C),
      body: ExamPaperViewer(
        paperId: paperId,
        classLevel: classLevel,
        subjectSlug: subjectSlug,
      ),
    );
  }
}
