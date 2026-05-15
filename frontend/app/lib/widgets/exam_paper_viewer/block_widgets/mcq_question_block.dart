import 'package:flutter/material.dart';
import '../../../config/theme.dart';
import '../../../models/exam_paper_model.dart';

class McqQuestionBlock extends StatelessWidget {
  final ExamBlock block;
  const McqQuestionBlock({super.key, required this.block});

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
                  '[${block.marks} ${block.marks == 1 ? 'mark' : 'marks'}]',
                  style: TextStyle(fontSize: 9, color: AppTheme.textMutedOf(context)),
                ),
            ],
          ),
          const SizedBox(height: 4),
          Text(
            block.content ?? '',
            style: TextStyle(fontSize: 11, color: AppTheme.textOf(context), height: 1.5),
          ),
          const SizedBox(height: 6),
          ...(block.options ?? []).map((opt) => Padding(
            padding: const EdgeInsets.only(left: 12, bottom: 3),
            child: Text(
              opt,
              style: TextStyle(fontSize: 11, color: AppTheme.textOf(context)),
            ),
          )),
        ],
      ),
    );
  }
}
