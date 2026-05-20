import 'package:flutter/material.dart';
import '../../../config/theme.dart';
import '../../../models/exam_paper_model.dart';

class ParagraphTextBlock extends StatelessWidget {
  final ExamBlock block;
  const ParagraphTextBlock({super.key, required this.block});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Text(
        block.content ?? '',
        style: TextStyle(
          fontSize: 11,
          color: AppTheme.textOf(context),
          height: 1.6,
        ),
      ),
    );
  }
}
