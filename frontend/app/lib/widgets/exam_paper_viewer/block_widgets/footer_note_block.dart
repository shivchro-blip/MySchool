import 'package:flutter/material.dart';
import '../../../config/theme.dart';
import '../../../models/exam_paper_model.dart';

class FooterNoteBlock extends StatelessWidget {
  final ExamBlock block;
  const FooterNoteBlock({super.key, required this.block});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 16),
      child: Column(
        children: [
          Divider(color: AppTheme.borderOf(context), height: 1),
          const SizedBox(height: 6),
          Text(
            block.content ?? '',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 9,
              fontStyle: FontStyle.italic,
              color: AppTheme.textMutedOf(context),
            ),
          ),
        ],
      ),
    );
  }
}
