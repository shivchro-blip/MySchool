import 'package:flutter/material.dart';
import '../../../config/theme.dart';
import '../../../models/exam_paper_model.dart';

class PartHeadingBlock extends StatelessWidget {
  final ExamBlock block;
  const PartHeadingBlock({super.key, required this.block});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 16, bottom: 8),
      child: Column(
        children: [
          Divider(color: AppTheme.borderOf(context), height: 1),
          const SizedBox(height: 8),
          Text(
            (block.content ?? '').toUpperCase(),
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w700,
              letterSpacing: 1.5,
              color: AppTheme.textOf(context),
            ),
          ),
          if (block.marks != null) ...[
            const SizedBox(height: 2),
            Text(
              '[${block.marks} marks]',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 9, color: AppTheme.text2Of(context)),
            ),
          ],
        ],
      ),
    );
  }
}
