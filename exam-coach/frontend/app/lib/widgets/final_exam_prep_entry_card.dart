import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../config/theme.dart';

class FinalExamPrepEntryCard extends StatelessWidget {
  final String classLevel;
  final String subjectSlug;

  const FinalExamPrepEntryCard({
    super.key,
    required this.classLevel,
    required this.subjectSlug,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: AppTheme.brandLightOf(context),
        borderRadius: BorderRadius.circular(AppTheme.radiusCard),
        border: Border.all(color: AppTheme.brandOf(context).withAlpha(60)),
        boxShadow: [
          BoxShadow(
            color: AppTheme.brandOf(context).withAlpha(18),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Pill badge
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(AppTheme.radiusPill),
              border: Border.all(color: AppTheme.brandOf(context)),
            ),
            child: Text(
              'Final Exam Prep',
              style: TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.w600,
                color: AppTheme.brandOf(context),
              ),
            ),
          ),
          const SizedBox(height: 10),
          // Headline
          Text(
            'Prepare for your Final Exams',
            style: TextStyle(
              fontSize: 17,
              fontWeight: FontWeight.w700,
              color: AppTheme.brandOf(context),
              height: 1.3,
            ),
          ),
          const SizedBox(height: 6),
          // Body
          Text(
            'Access past annual exam papers, important question patterns, '
            'high-priority topics and smart revision plans for Class 11 English.',
            style: TextStyle(
              fontSize: 13,
              color: AppTheme.text2Of(context),
              height: 1.5,
            ),
          ),
          const SizedBox(height: 14),
          // CTA button
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: AppTheme.brandOf(context),
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(vertical: 12),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(AppTheme.radiusButton),
                ),
                textStyle: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                ),
              ),
              onPressed: () => context.push(
                '/courses/$classLevel/$subjectSlug/final-exam-prep',
              ),
              child: const Text('Open Final Exam Prep →'),
            ),
          ),
        ],
      ),
    );
  }
}
