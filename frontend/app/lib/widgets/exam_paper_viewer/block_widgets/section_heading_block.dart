import 'package:flutter/material.dart';
import '../../../config/theme.dart';
import '../../../models/exam_paper_model.dart';

class SectionHeadingBlock extends StatelessWidget {
  final ExamBlock block;
  const SectionHeadingBlock({super.key, required this.block});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 12, bottom: 6),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            block.content ?? '',
            style: TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w700,
              color: AppTheme.textOf(context),
            ),
          ),
          const SizedBox(height: 4),
          Divider(color: AppTheme.borderOf(context), height: 1),
        ],
      ),
    );
  }
}
