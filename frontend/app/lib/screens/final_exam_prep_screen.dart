import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../config/theme.dart';
import '../config/final_exam_prep_config.dart';

class FinalExamPrepScreen extends StatelessWidget {
  final String classLevel;
  final String subjectSlug;

  const FinalExamPrepScreen({
    super.key,
    required this.classLevel,
    required this.subjectSlug,
  });

  List<ExamPaper> get _papers =>
      classLevel == 'plus2' ? kPlus2EnglishExamPapers : kPlus1EnglishExamPapers;

  List<PriorityLesson> get _lessons =>
      classLevel == 'plus2' ? kPlus2EnglishPriorityLessons : kPlus1EnglishPriorityLessons;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Final Exam Prep')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Final Exam Prep',
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.w700,
                color: AppTheme.textOf(context),
                height: 1.2,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              'Prepare for the year-end English exam with past annual exam papers '
              'and high-priority lesson guidance.',
              style: TextStyle(
                fontSize: 13,
                color: AppTheme.text2Of(context),
                height: 1.5,
              ),
            ),
            const SizedBox(height: 20),
            _ExamPapersCard(
              papers: _papers,
              classLevel: classLevel,
              subjectSlug: subjectSlug,
            ),
            const SizedBox(height: 16),
            _PriorityLessonsCard(
              lessons: _lessons,
              classLevel: classLevel,
              subjectSlug: subjectSlug,
            ),
          ],
        ),
      ),
    );
  }
}

// ── Past Annual Exam Papers ───────────────────────────────────────────────────

class _ExamPapersCard extends StatelessWidget {
  final List<ExamPaper> papers;
  final String classLevel;
  final String subjectSlug;
  const _ExamPapersCard({
    required this.papers,
    required this.classLevel,
    required this.subjectSlug,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: AppTheme.cardOf(context),
        borderRadius: BorderRadius.circular(AppTheme.radiusCard),
        border: Border.all(color: AppTheme.borderOf(context)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withAlpha(10),
            blurRadius: 6,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 14, 16, 12),
            child: Row(
              children: [
                const Icon(Icons.description_outlined,
                    color: AppTheme.brand, size: 20),
                const SizedBox(width: 8),
                Text(
                  'Past Annual Exam Papers',
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w700,
                    color: AppTheme.textOf(context),
                  ),
                ),
              ],
            ),
          ),
          Divider(height: 1, color: AppTheme.borderOf(context)),
          ...papers.asMap().entries.map((e) {
            final isLast = e.key == papers.length - 1;
            return Column(
              children: [
                _PaperRow(
                  paper: e.value,
                  classLevel: classLevel,
                  subjectSlug: subjectSlug,
                ),
                if (!isLast) Divider(height: 1, color: AppTheme.borderOf(context)),
              ],
            );
          }),
        ],
      ),
    );
  }
}

class _PaperRow extends StatelessWidget {
  final ExamPaper paper;
  final String classLevel;
  final String subjectSlug;
  const _PaperRow({
    required this.paper,
    required this.classLevel,
    required this.subjectSlug,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: AppTheme.brandDark,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  paper.year,
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w700,
                    color: Colors.white,
                  ),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Text(
                  paper.title,
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w500,
                    color: AppTheme.textOf(context),
                  ),
                ),
              ),
              Icon(Icons.chevron_right,
                  size: 18, color: AppTheme.textMutedOf(context)),
            ],
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              _OutlineActionButton(
                icon: Icons.description_outlined,
                label: 'View Paper',
                onTap: () => context.push(
                  '/courses/$classLevel/$subjectSlug/final-exam-prep/paper/${paper.id}',
                ),
              ),
              const SizedBox(width: 8),
              _OutlineActionButton(
                icon: Icons.edit_outlined,
                label: 'Practice',
                onTap: () => context.push('/exam/$classLevel/$subjectSlug/${paper.id}'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _OutlineActionButton extends StatelessWidget {
  final IconData icon;
  final String label;
  final VoidCallback onTap;
  const _OutlineActionButton({
    required this.icon,
    required this.label,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: AppTheme.borderOf(context)),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 13, color: AppTheme.text2Of(context)),
            const SizedBox(width: 5),
            Text(
              label,
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w500,
                color: AppTheme.text2Of(context),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ── High-Priority Lessons ─────────────────────────────────────────────────────

class _PriorityLessonsCard extends StatelessWidget {
  final List<PriorityLesson> lessons;
  final String classLevel;
  final String subjectSlug;
  const _PriorityLessonsCard({
    required this.lessons,
    required this.classLevel,
    required this.subjectSlug,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: AppTheme.cardOf(context),
        borderRadius: BorderRadius.circular(AppTheme.radiusCard),
        border: Border.all(color: AppTheme.borderOf(context)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withAlpha(10),
            blurRadius: 6,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 14, 16, 12),
            child: Row(
              children: [
                const Icon(Icons.local_fire_department,
                    color: AppTheme.brand, size: 20),
                const SizedBox(width: 8),
                Text(
                  'High-Priority Lessons',
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w700,
                    color: AppTheme.textOf(context),
                  ),
                ),
              ],
            ),
          ),
          Divider(height: 1, color: AppTheme.borderOf(context)),
          ...lessons.asMap().entries.map((e) {
            final isLast = e.key == lessons.length - 1;
            return Column(
              children: [
                _LessonRow(
                  lesson: e.value,
                  classLevel: classLevel,
                  subjectSlug: subjectSlug,
                ),
                if (!isLast)
                  Divider(height: 1, color: AppTheme.borderOf(context)),
              ],
            );
          }),
        ],
      ),
    );
  }
}

class _LessonRow extends StatelessWidget {
  final PriorityLesson lesson;
  final String classLevel;
  final String subjectSlug;
  const _LessonRow({
    required this.lesson,
    required this.classLevel,
    required this.subjectSlug,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => context.push('/rich-learn/$classLevel/$subjectSlug/${lesson.id}'),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
        child: Row(
          children: [
            Icon(Icons.menu_book_outlined,
                size: 20, color: AppTheme.text2Of(context)),
            const SizedBox(width: 10),
            Expanded(
              child: Text(
                '${lesson.category} — ${lesson.title}',
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w500,
                  color: AppTheme.textOf(context),
                ),
              ),
            ),
            const SizedBox(width: 8),
            _PriorityBadge(priority: lesson.priority),
            const SizedBox(width: 6),
            Icon(Icons.chevron_right,
                color: AppTheme.textMutedOf(context), size: 18),
          ],
        ),
      ),
    );
  }
}

class _PriorityBadge extends StatelessWidget {
  final String priority;
  const _PriorityBadge({required this.priority});

  @override
  Widget build(BuildContext context) {
    final isHigh = priority == 'high';
    final bg     = isHigh ? const Color(0xFFDC2626) : const Color(0xFFD97706);
    final label  = isHigh ? 'High' : 'Medium';
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(
        label,
        style: const TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.w600,
          color: Colors.white,
        ),
      ),
    );
  }
}
