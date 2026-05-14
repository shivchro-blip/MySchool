import 'package:flutter/material.dart';
import '../config/theme.dart';
import 'eyebrow.dart';
import 'page_title.dart';

class PageHeader extends StatelessWidget {
  final String?  eyebrow;
  final Color?   eyebrowColor;
  final String   title;
  final String?  subtitle;
  final EdgeInsetsGeometry padding;

  const PageHeader({
    super.key,
    this.eyebrow,
    this.eyebrowColor,
    required this.title,
    this.subtitle,
    this.padding = const EdgeInsets.fromLTRB(16, 16, 16, 20),
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: padding,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (eyebrow != null) ...[
            Eyebrow(eyebrow!, color: eyebrowColor),
            const SizedBox(height: 8),
          ],
          PageTitle(title),
          if (subtitle != null) ...[
            const SizedBox(height: 4),
            Text(
              subtitle!,
              style: TextStyle(
                fontSize: 14,
                color: AppTheme.text2Of(context),
                height: 1.4,
              ),
            ),
          ],
        ],
      ),
    );
  }
}
