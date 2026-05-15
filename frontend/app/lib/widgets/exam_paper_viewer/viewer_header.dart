import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../config/theme.dart';
import '../../models/exam_paper_model.dart';

class ViewerHeader extends StatelessWidget {
  final ExamPaperData paper;
  final String backPath;

  const ViewerHeader({super.key, required this.paper, required this.backPath});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Wrap(
          crossAxisAlignment: WrapCrossAlignment.center,
          spacing: 4,
          children: [
            _crumb(context, 'Courses'),
            _sep(context),
            _crumb(context, paper.classLabel),
            _sep(context),
            _crumb(context, paper.subject),
            _sep(context),
            GestureDetector(
              onTap: () => context.go(backPath),
              child: Text(
                'Final Exam Prep',
                style: TextStyle(
                  fontSize: 11,
                  color: AppTheme.brand,
                  decoration: TextDecoration.underline,
                ),
              ),
            ),
            _sep(context),
            _crumb(context, paper.title, bold: true),
          ],
        ),
        const SizedBox(height: 12),
        Text(
          paper.title,
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.w700,
            color: AppTheme.textOf(context),
          ),
        ),
        const SizedBox(height: 2),
        Text(
          '${paper.classLabel} ${paper.subject}',
          style: TextStyle(fontSize: 13, color: AppTheme.text2Of(context)),
        ),
        const SizedBox(height: 8),
        Wrap(
          spacing: 16,
          children: [
            _meta(context, 'Time Allowed', paper.duration),
            _meta(context, 'Maximum Marks', '${paper.maximumMarks}'),
            _meta(context, 'Total Pages', '${paper.totalPages}'),
          ],
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            OutlinedButton(
              onPressed: () => context.go(backPath),
              style: OutlinedButton.styleFrom(
                side: BorderSide(color: AppTheme.borderOf(context)),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(AppTheme.radiusButton),
                ),
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              ),
              child: Text(
                '← Back',
                style: TextStyle(fontSize: 12, color: AppTheme.text2Of(context)),
              ),
            ),
            const SizedBox(width: 8),
            ElevatedButton(
              onPressed: () => debugPrint('TODO: Start Practice'),
              style: ElevatedButton.styleFrom(
                backgroundColor: AppTheme.brand,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(AppTheme.radiusButton),
                ),
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              ),
              child: const Text('Start Practice', style: TextStyle(fontSize: 12)),
            ),
          ],
        ),
        const SizedBox(height: 16),
        Divider(color: AppTheme.borderOf(context), height: 1),
        const SizedBox(height: 8),
      ],
    );
  }

  Widget _crumb(BuildContext context, String text, {bool bold = false}) {
    return Text(
      text,
      style: TextStyle(
        fontSize: 11,
        color: bold ? AppTheme.textOf(context) : AppTheme.text2Of(context),
        fontWeight: bold ? FontWeight.w600 : FontWeight.normal,
      ),
    );
  }

  Widget _sep(BuildContext context) {
    return Text('›', style: TextStyle(fontSize: 11, color: AppTheme.textMutedOf(context)));
  }

  Widget _meta(BuildContext context, String label, String value) {
    return RichText(
      text: TextSpan(
        style: TextStyle(fontSize: 11, color: AppTheme.text2Of(context)),
        children: [
          TextSpan(text: '$label: ', style: const TextStyle(fontWeight: FontWeight.w500)),
          TextSpan(text: value),
        ],
      ),
    );
  }
}
