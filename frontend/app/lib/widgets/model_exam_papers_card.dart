import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../config/final_exam_prep_config.dart';
import '../config/theme.dart';

class ModelExamPapersCard extends StatelessWidget {
  final List<ModelPaper> papers;
  final String classLevel;
  final String subjectSlug;

  const ModelExamPapersCard({
    super.key,
    required this.papers,
    required this.classLevel,
    required this.subjectSlug,
  });

  @override
  Widget build(BuildContext context) {
    if (papers.isEmpty) return const SizedBox.shrink();

    return Stack(
      clipBehavior: Clip.none,
      children: [
        Container(
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
                padding: const EdgeInsets.fromLTRB(16, 16, 16, 12),
                child: Row(
                  children: [
                    Container(
                      width: 32,
                      height: 32,
                      decoration: BoxDecoration(
                        color: AppTheme.brandLightOf(context),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: const Icon(
                        Icons.menu_book_outlined,
                        color: AppTheme.brand,
                        size: 18,
                      ),
                    ),
                    const SizedBox(width: 10),
                    Text(
                      'Model Exam Papers',
                      style: TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.w800,
                        color: AppTheme.textOf(context),
                      ),
                    ),
                  ],
                ),
              ),
              Divider(height: 1, color: AppTheme.borderOf(context)),
              for (var index = 0; index < papers.length; index++) ...[
                _ModelPaperRow(
                  paper: papers[index],
                  classLevel: classLevel,
                  subjectSlug: subjectSlug,
                ),
                if (index != papers.length - 1)
                  Divider(height: 1, color: AppTheme.borderOf(context)),
              ],
              Divider(height: 1, color: AppTheme.borderOf(context)),
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                child: Center(
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 7,
                    ),
                    decoration: BoxDecoration(
                      color: AppTheme.brandLightOf(context),
                      borderRadius: BorderRadius.circular(AppTheme.radiusPill),
                      border: Border.all(color: AppTheme.brand.withAlpha(65)),
                    ),
                    child: const Text(
                      'AI-curated practice sets aligned with the latest exam pattern',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w600,
                        color: AppTheme.brand,
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
        Positioned(
          top: -9,
          left: 14,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
            decoration: BoxDecoration(
              color: AppTheme.brandLightOf(context),
              borderRadius: BorderRadius.circular(AppTheme.radiusPill),
              border: Border.all(color: AppTheme.brand),
            ),
            child: Text(
              'NEW',
              style: TextStyle(
                fontSize: 10,
                fontWeight: FontWeight.w800,
                color: AppTheme.textOf(context),
                letterSpacing: 0.4,
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class _ModelPaperRow extends StatelessWidget {
  final ModelPaper paper;
  final String classLevel;
  final String subjectSlug;

  const _ModelPaperRow({
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
                padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: AppTheme.brandOf(context),
                  borderRadius: BorderRadius.circular(999),
                ),
                child: Text(
                  paper.label,
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w800,
                    color: Colors.white,
                  ),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Text(
                  paper.title,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.textOf(context),
                  ),
                ),
              ),
              Icon(
                Icons.chevron_right,
                size: 18,
                color: AppTheme.textMutedOf(context),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              _ModelPaperActionButton(
                icon: Icons.description_outlined,
                label: 'View Paper',
                onTap: () => context.push(
                  '/model-paper/view/$classLevel/$subjectSlug/${paper.id}',
                ),
              ),
              _ModelPaperActionButton(
                icon: Icons.edit_outlined,
                label: 'Practice',
                onTap: () => context.push(
                  '/model-paper/practice/$classLevel/$subjectSlug/${paper.id}',
                ),
              ),
              _ModelPaperActionButton(
                icon: Icons.history,
                label: 'History',
                onTap: () => context.push(
                  '/model-paper/history/$classLevel/$subjectSlug/${paper.id}',
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _ModelPaperActionButton extends StatelessWidget {
  final IconData icon;
  final String label;
  final VoidCallback onTap;

  const _ModelPaperActionButton({
    required this.icon,
    required this.label,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: BorderRadius.circular(AppTheme.radiusButton),
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 7),
        decoration: BoxDecoration(
          color: AppTheme.surfaceOf(context),
          borderRadius: BorderRadius.circular(AppTheme.radiusButton),
          border: Border.all(color: AppTheme.brandOf(context)),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 13, color: AppTheme.brandOf(context)),
            const SizedBox(width: 5),
            Text(
              label,
              style: TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.w700,
                color: AppTheme.brandOf(context),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
