import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/exam_paper_model.dart';
import 'block_renderer.dart';

class PageSurface extends StatelessWidget {
  final ExamPage page;
  final bool isLast;
  final VoidCallback? onStartPractice;

  const PageSurface({
    super.key,
    required this.page,
    this.isLast = false,
    this.onStartPractice,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 2),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(4),
        border: Border.all(color: AppTheme.borderOf(context).withAlpha(80)),
        boxShadow: const [
          BoxShadow(
            color: Color(0x12000000),
            blurRadius: 8,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ...page.blocks.map((b) => BlockRenderer(block: b)),
            if (isLast) ...[
              const SizedBox(height: 20),
              Divider(color: AppTheme.borderOf(context)),
              const SizedBox(height: 12),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {
                    debugPrint('TODO: Start Practice for this paper');
                    onStartPractice?.call();
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.brand,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(AppTheme.radiusButton),
                    ),
                    padding: const EdgeInsets.symmetric(vertical: 12),
                  ),
                  child: const Text(
                    'Start Practice for this Paper →',
                    style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600),
                  ),
                ),
              ),
            ],
            const SizedBox(height: 12),
            Text(
              '— ${page.pageNumber} —',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 9, color: AppTheme.textMutedOf(context)),
            ),
          ],
        ),
      ),
    );
  }
}
