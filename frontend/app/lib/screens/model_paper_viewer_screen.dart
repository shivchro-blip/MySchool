import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../config/theme.dart';
import '../models/exam_paper_model.dart';
import '../services/model_paper_service.dart';
import '../widgets/exam_paper_viewer/page_surface.dart';

class ModelPaperViewerScreen extends StatelessWidget {
  final String classLevel;
  final String subjectSlug;
  final String setId;

  const ModelPaperViewerScreen({
    super.key,
    required this.classLevel,
    required this.subjectSlug,
    required this.setId,
  });

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<ExamPaperData>(
      future: ModelPaperService.loadPaper(classLevel, subjectSlug, setId),
      builder: (context, snapshot) {
        final paper = snapshot.data;
        return Scaffold(
          appBar: AppBar(
            title: Text(
              paper?.title ?? 'Model Exam Paper',
              overflow: TextOverflow.ellipsis,
            ),
            leading: IconButton(
              icon: const Icon(Icons.arrow_back),
              onPressed: () {
                if (context.canPop()) {
                  context.pop();
                } else {
                  context.go('/courses/$classLevel/$subjectSlug');
                }
              },
            ),
          ),
          body: _body(context, snapshot),
        );
      },
    );
  }

  Widget _body(
    BuildContext context,
    AsyncSnapshot<ExamPaperData> snapshot,
  ) {
    if (snapshot.connectionState != ConnectionState.done) {
      return const Center(child: CircularProgressIndicator());
    }
    if (snapshot.hasError || !snapshot.hasData) {
      return _PaperLoadError(
        onBack: () => context.go('/courses/$classLevel/$subjectSlug'),
      );
    }

    final paper = snapshot.data!;
    return Container(
      color: const Color(0xFF1C1C1C),
      child: ListView(
        padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
        children: [
          for (final page in paper.pages) ...[
            PageSurface(
              page: page,
              isLast: page.pageNumber == paper.totalPages,
              onStartPractice: () => context.push(
                '/model-paper/practice/$classLevel/$subjectSlug/${paper.paperId}',
              ),
            ),
            const SizedBox(height: 18),
          ],
        ],
      ),
    );
  }
}

class _PaperLoadError extends StatelessWidget {
  final VoidCallback onBack;

  const _PaperLoadError({required this.onBack});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.description_outlined,
              size: 48,
              color: AppTheme.textMutedOf(context),
            ),
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
              'The web source does not include this model paper.',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 13, color: AppTheme.text2Of(context)),
            ),
            const SizedBox(height: 16),
            OutlinedButton(onPressed: onBack, child: const Text('Back')),
          ],
        ),
      ),
    );
  }
}
