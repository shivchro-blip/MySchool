import 'package:flutter/material.dart';
import '../../config/exam_papers/exam_paper_registry.dart';
import '../../models/exam_paper_model.dart';
import '../../config/theme.dart';
import 'viewer_header.dart';
import 'page_surface.dart';
import 'viewer_nav_controls.dart';
import 'viewer_side_arrow.dart';
import 'viewer_thumbnail_overlay.dart';

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
  double _zoomLevel = 1.0;
  bool _showThumbnails = false;

  static const double _zoomMin  = 0.5;
  static const double _zoomMax  = 2.0;
  static const double _zoomStep = 0.1;

  @override
  void initState() {
    super.initState();
    _paper = getExamPaperById(widget.paperId);
  }

  String get _backPath =>
      '/courses/${widget.classLevel}/${widget.subjectSlug}/final-exam-prep';

  bool get _isFirst => _currentPage == 1;
  bool get _isLast  => _paper != null && _currentPage == _paper!.totalPages;

  void _navigate(int targetPage) {
    if (_paper == null) return;
    if (targetPage < 1 || targetPage > _paper!.totalPages) return;
    setState(() => _currentPage = targetPage);
  }

  void _goNext() { if (!_isLast)  _navigate(_currentPage + 1); }
  void _goPrev() { if (!_isFirst) _navigate(_currentPage - 1); }

  @override
  Widget build(BuildContext context) {
    if (_paper == null) return const _PaperNotFound();

    final paper      = _paper!;
    final page       = paper.pages[_currentPage - 1];
    final isPageLast = _currentPage == paper.totalPages;
    final safeBottom = MediaQuery.of(context).padding.bottom;
    final pageLabel  = '$_currentPage / ${paper.totalPages}';

    return Column(
      children: [
        // White header — adapts to light/dark theme
        Container(
          color: AppTheme.cardOf(context),
          padding: EdgeInsets.fromLTRB(
            16,
            MediaQuery.of(context).padding.top + 8,
            16,
            0,
          ),
          child: ViewerHeader(paper: paper, backPath: _backPath),
        ),

        // Dark flipbook area
        Expanded(
          child: GestureDetector(
            onHorizontalDragEnd: (details) {
              final v = details.primaryVelocity ?? 0;
              if (v < -200) _goNext();
              if (v >  200) _goPrev();
            },
            child: Container(
              color: const Color(0xFF1C1C1C),
              child: Stack(
                children: [
                  // Scrollable page content with fade transition
                  Positioned.fill(
                    child: SingleChildScrollView(
                      padding: EdgeInsets.fromLTRB(16, 16, 16, safeBottom + 120),
                      child: AnimatedSwitcher(
                        duration: const Duration(milliseconds: 150),
                        transitionBuilder: (child, animation) =>
                            FadeTransition(opacity: animation, child: child),
                        child: Transform.scale(
                          key: ValueKey(_currentPage),
                          scale: _zoomLevel,
                          alignment: Alignment.topCenter,
                          child: PageSurface(
                            page: page,
                            isLast: isPageLast,
                            onStartPractice: () => debugPrint('TODO: Start Practice'),
                          ),
                        ),
                      ),
                    ),
                  ),

                  // Side arrows
                  ViewerSideArrow(
                    direction: ArrowDirection.left,
                    onTap: _goPrev,
                    disabled: _isFirst,
                  ),
                  ViewerSideArrow(
                    direction: ArrowDirection.right,
                    onTap: _goNext,
                    disabled: _isLast,
                  ),

                  // Bottom pill toolbar
                  Positioned(
                    bottom: safeBottom + 24,
                    left: 0,
                    right: 0,
                    child: Center(
                      child: ViewerNavControls(
                        pageLabel: pageLabel,
                        isFirst: _isFirst,
                        isLast: _isLast,
                        onFirst: () => _navigate(1),
                        onPrev: _goPrev,
                        onNext: _goNext,
                        onLast: () => _navigate(paper.totalPages),
                        zoomLevel: _zoomLevel,
                        onZoomIn: () => setState(() =>
                            _zoomLevel = (_zoomLevel + _zoomStep).clamp(_zoomMin, _zoomMax)),
                        onZoomOut: () => setState(() =>
                            _zoomLevel = (_zoomLevel - _zoomStep).clamp(_zoomMin, _zoomMax)),
                        onOpenThumbnails: () =>
                            setState(() => _showThumbnails = !_showThumbnails),
                      ),
                    ),
                  ),

                  // Thumbnail overlay
                  if (_showThumbnails)
                    ViewerThumbnailOverlay(
                      paper: paper,
                      currentPageIndex: _currentPage - 1,
                      onSelect: (idx) {
                        _navigate(idx + 1);
                        setState(() => _showThumbnails = false);
                      },
                      onClose: () => setState(() => _showThumbnails = false),
                    ),
                ],
              ),
            ),
          ),
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
