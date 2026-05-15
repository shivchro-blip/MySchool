import 'package:flutter/material.dart';
import '../../../config/theme.dart';
import '../../../models/exam_paper_model.dart';

class MetadataRowBlock extends StatelessWidget {
  final ExamBlock block;
  const MetadataRowBlock({super.key, required this.block});

  @override
  Widget build(BuildContext context) {
    final items = block.items ?? [];
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 6),
      decoration: BoxDecoration(
        border: Border.symmetric(
          horizontal: BorderSide(color: AppTheme.borderOf(context)),
        ),
      ),
      margin: const EdgeInsets.symmetric(vertical: 4),
      child: Wrap(
        alignment: WrapAlignment.center,
        spacing: 16,
        runSpacing: 4,
        children: items.map((item) {
          return RichText(
            text: TextSpan(
              style: TextStyle(fontSize: 10, color: AppTheme.text2Of(context)),
              children: [
                TextSpan(
                  text: '${item.label}: ',
                  style: const TextStyle(fontWeight: FontWeight.w600),
                ),
                TextSpan(text: item.value),
              ],
            ),
          );
        }).toList(),
      ),
    );
  }
}
