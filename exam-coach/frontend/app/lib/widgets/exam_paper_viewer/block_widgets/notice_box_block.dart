import 'package:flutter/material.dart';
import '../../../config/theme.dart';
import '../../../models/exam_paper_model.dart';

class NoticeBoxBlock extends StatelessWidget {
  final ExamBlock block;
  const NoticeBoxBlock({super.key, required this.block});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 10),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        border: Border.all(color: AppTheme.borderOf(context)),
        borderRadius: BorderRadius.circular(4),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          if (block.heading != null)
            Padding(
              padding: const EdgeInsets.only(bottom: 4),
              child: Text(
                block.heading!,
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w700,
                  color: AppTheme.textOf(context),
                ),
              ),
            ),
          if (block.subheading != null)
            Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: Text(
                block.subheading!,
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.textOf(context),
                ),
              ),
            ),
          if (block.body != null)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 4),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  block.body!,
                  style: TextStyle(
                    fontSize: 11,
                    color: AppTheme.textOf(context),
                    height: 1.5,
                  ),
                ),
              ),
            ),
          if (block.address != null)
            Padding(
              padding: const EdgeInsets.only(top: 8),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  block.address!,
                  style: TextStyle(
                    fontSize: 10,
                    color: AppTheme.textMutedOf(context),
                    height: 1.6,
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}
