import 'package:flutter/material.dart';
import '../../../config/theme.dart';
import '../../../models/exam_paper_model.dart';

class MultiSubquestionBlock extends StatelessWidget {
  final ExamBlock block;
  const MultiSubquestionBlock({super.key, required this.block});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                (block.questionId ?? '').toUpperCase(),
                style: TextStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.text2Of(context),
                  letterSpacing: 0.5,
                ),
              ),
              if (block.marks != null)
                Text(
                  '[${block.marks} marks]',
                  style: TextStyle(fontSize: 9, color: AppTheme.textMutedOf(context)),
                ),
            ],
          ),
          if (block.content != null) ...[
            const SizedBox(height: 4),
            Text(
              block.content!,
              style: TextStyle(fontSize: 11, color: AppTheme.textOf(context), height: 1.5),
            ),
          ],
          const SizedBox(height: 6),
          ...(block.subQuestions ?? []).map((sq) => Padding(
            padding: const EdgeInsets.only(left: 12, bottom: 6),
            child: RichText(
              text: TextSpan(
                style: TextStyle(fontSize: 11, color: AppTheme.textOf(context), height: 1.5),
                children: [
                  TextSpan(
                    text: '${sq.label} ',
                    style: const TextStyle(fontWeight: FontWeight.w600),
                  ),
                  TextSpan(text: sq.content),
                ],
              ),
            ),
          )),
        ],
      ),
    );
  }
}
