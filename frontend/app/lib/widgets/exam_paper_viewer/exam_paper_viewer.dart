import 'package:flutter/material.dart';
import '../../config/exam_papers/exam_paper_registry.dart';
import '../../models/exam_paper_model.dart';
import '../../config/theme.dart';
import 'viewer_header.dart';
import 'page_surface.dart';
import 'viewer_nav_controls.dart';

class ExamPaperViewer extends StatefulWidget {
  final String paperId;
  final String classLevel;
  final String subjectSlug;

  const ExamPaperViewer({
    super.key,
    required this.paperId,
    required this.classLevel,
    required this.subjectSlug,
  });

  @override
  State<ExamPaperViewer> createState() => _ExamPaperViewerState();
}

class _ExamPaperViewerState extends State<ExamPaperViewer> {
  late final ExamPaperData? _paper;
  int _currentPage = 1;

  @override
  void initState() {
    super.initState();
    _paper = getExamPaperById(widget.paperId);
  }

  String get _backPath =>
      '/courses/${widget.classLevel}/${widget.subjectSlug}/final-exam-prep';

  @override
  Widget build(BuildContext context) {
    if (_paper == null) return const _PaperNotFound();

    final paper = _paper!;
    final page = paper.pages[_currentPage - 1];
    final isLast = _currentPage == paper.totalPages;

    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 0),
          child: ViewerHeader(paper: paper, backPath: _backPath),
        ),
        Expanded(
          child: PageSurface(
            page: page,
            isLast: isLast,
            onStartPractice: () => debugPrint('TODO: Start Practice'),
          ),
        ),
        ViewerNavControls(
          currentPage: _currentPage,
          totalPages: paper.totalPages,
          onPrev: _currentPage > 1
              ? () => setState(() => _currentPage--)
              : null,
          onNext: _currentPage < paper.totalPages
              ? () => setState(() => _currentPage++)
              : null,
        ),
      ],
    );
  }
}

class _PaperNotFound extends StatelessWidget {
  const _PaperNotFound();

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.description_outlined, size: 48, color: AppTheme.textMutedOf(context)),
            const SizedBox(height: 16),
            Text(
              'Paper Not Available',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w700,
                color: AppTheme.textOf(context),
              ),
            ),
            const SizedBox(height: 8),
            Text(
              "This exam paper hasn't been added yet. Check back soon.",
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 13, color: AppTheme.text2Of(context)),
            ),
          ],
        ),
      ),
    );
  }
}
