import 'package:flutter/material.dart';
import '../../../config/theme.dart';
import '../../../models/exam_paper_model.dart';

class PaperHeaderBlock extends StatelessWidget {
  final ExamBlock block;
  const PaperHeaderBlock({super.key, required this.block});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 12),
      decoration: BoxDecoration(
        border: Border(bottom: BorderSide(color: AppTheme.borderOf(context))),
      ),
      child: Column(
        children: [
          Text(
            block.content ?? '',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w700,
              color: AppTheme.textOf(context),
              letterSpacing: 0.3,
            ),
          ),
          if (block.subContent != null) ...[
            const SizedBox(height: 3),
            Text(
              block.subContent!,
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 11, color: AppTheme.text2Of(context)),
            ),
          ],
        ],
      ),
    );
  }
}
