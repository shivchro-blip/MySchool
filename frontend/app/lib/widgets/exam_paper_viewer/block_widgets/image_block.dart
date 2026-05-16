import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../../../config/theme.dart';
import '../../../models/exam_paper_model.dart';

class ImageBlock extends StatelessWidget {
  final ExamBlock block;
  const ImageBlock({super.key, required this.block});

  @override
  Widget build(BuildContext context) {
    final src = block.src;
    final hasImage = src != null && src.isNotEmpty;

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          if (hasImage) _buildImage(src) else _buildPlaceholder(context),
          if (block.caption != null && block.caption!.isNotEmpty) ...[
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

  Widget _buildImage(String src) {
    if (src.startsWith('data:')) {
      final commaIndex = src.indexOf(',');
      if (commaIndex != -1) {
        final header = src.substring(0, commaIndex);
        final encoded = src.substring(commaIndex + 1);
        final bytes = base64.decode(encoded);
        if (header.contains('svg')) {
          // LayoutBuilder provides a concrete maxWidth so SvgPicture can
          // compute a proportional height — avoids SizedBox.expand crash
          // when height constraint is unbounded inside a scroll view.
          return LayoutBuilder(
            builder: (context, constraints) => SvgPicture.memory(
              bytes,
              width: constraints.maxWidth,
              fit: BoxFit.contain,
              semanticsLabel: block.altText,
            ),
          );
        }
        return Image.memory(
          bytes,
          width: double.infinity,
          fit: BoxFit.contain,
          semanticLabel: block.altText,
        );
      }
    }
    return Image.network(
      src,
      width: double.infinity,
      fit: BoxFit.contain,
      semanticLabel: block.altText,
    );
  }

  Widget _buildPlaceholder(BuildContext context) {
    return Container(
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
    );
  }
}
