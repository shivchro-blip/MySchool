import 'package:flutter/material.dart';
import '../../../config/theme.dart';
import '../../../models/exam_paper_model.dart';

class InstructionsBlock extends StatelessWidget {
  final ExamBlock block;
  const InstructionsBlock({super.key, required this.block});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8),
      padding: const EdgeInsets.only(left: 10),
      decoration: BoxDecoration(
        border: Border(
          left: BorderSide(color: AppTheme.borderOf(context), width: 2),
        ),
      ),
      child: Text(
        block.content ?? '',
        style: TextStyle(
          fontSize: 10,
          fontStyle: FontStyle.italic,
          color: AppTheme.text2Of(context),
          height: 1.5,
        ),
      ),
    );
  }
}
