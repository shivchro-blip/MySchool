import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import '../config/theme.dart';
import '../models/exam_paper_model.dart';
import '../models/static_model_paper_model.dart';
import '../services/model_paper_service.dart';

class ModelPaperAttemptHistoryScreen extends StatefulWidget {
  final String classLevel;
  final String subjectSlug;
  final String setId;

  const ModelPaperAttemptHistoryScreen({
    super.key,
    required this.classLevel,
    required this.subjectSlug,
    required this.setId,
  });

  @override
  State<ModelPaperAttemptHistoryScreen> createState() =>
      _ModelPaperAttemptHistoryScreenState();
}

class _ModelPaperAttemptHistoryScreenState
    extends State<ModelPaperAttemptHistoryScreen> {
  late Future<_HistoryPayload> _future;

  @override
  void initState() {
    super.initState();
    _future = _load();
  }

  Future<_HistoryPayload> _load() async {
    final paper = await ModelPaperService.loadPaper(
      widget.classLevel,
      widget.subjectSlug,
      widget.setId,
    );
    final attempts = await ModelPaperService.getAttempts(paper.paperId);
    return _HistoryPayload(paper: paper, attempts: attempts);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Attempt History'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            if (context.canPop()) {
              context.pop();
            } else {
              context.go('/courses/${widget.classLevel}/${widget.subjectSlug}');
            }
          },
        ),
      ),
      body: FutureBuilder<_HistoryPayload>(
        future: _future,
        builder: (context, snapshot) {
          if (snapshot.connectionState != ConnectionState.done) {
            return const Center(child: CircularProgressIndicator());
          }
          if (snapshot.hasError || !snapshot.hasData) {
            return const Center(
                child: Text('Attempt history is not available.'));
          }
          final payload = snapshot.data!;
          final attempts = payload.attempts;

          return ListView(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
            children: [
              _HistoryHeader(paper: payload.paper, count: attempts.length),
              const SizedBox(height: 14),
              if (attempts.isEmpty)
                _EmptyHistory(
                  onPractice: () => context.push(
                    '/model-paper/practice/${widget.classLevel}/${widget.subjectSlug}/${payload.paper.paperId}',
                  ),
                )
              else
                for (var index = 0; index < attempts.length; index++)
                  Padding(
                    padding: const EdgeInsets.only(bottom: 10),
                    child: _AttemptTile(
                      attempt: attempts[index],
                      attemptNumber: attempts.length - index,
                    ),
                  ),
            ],
          );
        },
      ),
    );
  }
}

class _HistoryPayload {
  final ExamPaperData paper;
  final List<ModelPaperAttemptSummary> attempts;

  const _HistoryPayload({required this.paper, required this.attempts});
}

class _HistoryHeader extends StatelessWidget {
  final ExamPaperData paper;
  final int count;

  const _HistoryHeader({required this.paper, required this.count});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.cardOf(context),
        borderRadius: BorderRadius.circular(AppTheme.radiusCard),
        border: Border.all(color: AppTheme.borderOf(context)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            paper.title,
            style: TextStyle(
              fontSize: 17,
              fontWeight: FontWeight.w800,
              color: AppTheme.textOf(context),
              height: 1.25,
            ),
          ),
          const SizedBox(height: 6),
          Text(
            '${paper.classLabel} - ${paper.subject}',
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w700,
              color: AppTheme.text2Of(context),
            ),
          ),
          const SizedBox(height: 10),
          Text(
            '$count attempt${count == 1 ? '' : 's'}',
            style: const TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w800,
              color: AppTheme.brand,
            ),
          ),
        ],
      ),
    );
  }
}

class _EmptyHistory extends StatelessWidget {
  final VoidCallback onPractice;

  const _EmptyHistory({required this.onPractice});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(22),
      decoration: BoxDecoration(
        color: AppTheme.cardOf(context),
        borderRadius: BorderRadius.circular(AppTheme.radiusCard),
        border: Border.all(color: AppTheme.borderOf(context)),
      ),
      child: Column(
        children: [
          Icon(Icons.history, size: 42, color: AppTheme.textMutedOf(context)),
          const SizedBox(height: 12),
          Text(
            'No attempts yet',
            style: TextStyle(
              fontSize: 17,
              fontWeight: FontWeight.w800,
              color: AppTheme.textOf(context),
            ),
          ),
          const SizedBox(height: 6),
          Text(
            'Start practice to save your score and review progress here.',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 13,
              color: AppTheme.text2Of(context),
              height: 1.35,
            ),
          ),
          const SizedBox(height: 16),
          ElevatedButton.icon(
            onPressed: onPractice,
            icon: const Icon(Icons.edit_outlined),
            label: const Text('Start Practice'),
          ),
        ],
      ),
    );
  }
}

class _AttemptTile extends StatelessWidget {
  final ModelPaperAttemptSummary attempt;
  final int attemptNumber;

  const _AttemptTile({required this.attempt, required this.attemptNumber});

  @override
  Widget build(BuildContext context) {
    final strong = attempt.percentage >= 70;
    final date = DateFormat('d MMM yyyy, h:mm a').format(attempt.date);

    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppTheme.cardOf(context),
        borderRadius: BorderRadius.circular(AppTheme.radiusCard),
        border: Border.all(color: AppTheme.borderOf(context)),
      ),
      child: Row(
        children: [
          Container(
            width: 40,
            height: 40,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: strong
                  ? AppTheme.successBgOf(context)
                  : AppTheme.warningBgOf(context),
              shape: BoxShape.circle,
            ),
            child: Text(
              '$attemptNumber',
              style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w900,
                color: strong
                    ? AppTheme.successFgOf(context)
                    : AppTheme.warningFgOf(context),
              ),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text(
                      'Attempt $attemptNumber',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w800,
                        color: AppTheme.textOf(context),
                      ),
                    ),
                    const SizedBox(width: 8),
                    _ScoreBadge(
                        label: '${attempt.percentage}%', strong: strong),
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  date,
                  style: TextStyle(
                    fontSize: 12,
                    color: AppTheme.textMutedOf(context),
                  ),
                ),
              ],
            ),
          ),
          Text(
            '${attempt.score}/${attempt.total} marks',
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w900,
              color: AppTheme.textOf(context),
            ),
          ),
        ],
      ),
    );
  }
}

class _ScoreBadge extends StatelessWidget {
  final String label;
  final bool strong;

  const _ScoreBadge({required this.label, required this.strong});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 3),
      decoration: BoxDecoration(
        color: strong
            ? AppTheme.successBgOf(context)
            : AppTheme.warningBgOf(context),
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        label,
        style: TextStyle(
          fontSize: 10,
          fontWeight: FontWeight.w900,
          color: strong
              ? AppTheme.successFgOf(context)
              : AppTheme.warningFgOf(context),
        ),
      ),
    );
  }
}
