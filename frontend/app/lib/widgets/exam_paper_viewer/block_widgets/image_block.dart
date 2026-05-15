import 'package:flutter/material.dart';
import '../../../config/theme.dart';
import '../../../models/exam_paper_model.dart';

class ImageBlock extends StatelessWidget {
  final ExamBlock block;
  const ImageBlock({super.key, required this.block});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Column(
        children: [
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: AppTheme.brandLightOf(context),
              border: Border.all(color: AppTheme.borderOf(context)),
              borderRadius: BorderRadius.circular(6),
            ),
            child: Column(
              children: [
                Icon(Icons.image_outlined, size: 28, color: AppTheme.textMutedOf(context)),
                const SizedBox(height: 6),
                Text(
                  '[Figure — replace with real image]',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 9,
                    fontWeight: FontWeight.w600,
                    letterSpacing: 0.5,
                    color: AppTheme.textMutedOf(context),
                  ),
                ),
                if (block.altText != null) ...[
                  const SizedBox(height: 4),
                  Text(
                    block.altText!,
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 10, color: AppTheme.text2Of(context)),
                  ),
                ],
              ],
            ),
          ),
          if (block.caption != null) ...[
            const SizedBox(height: 4),
            Text(
              block.caption!,
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 9,
                fontStyle: FontStyle.italic,
                color: AppTheme.text2Of(context),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
