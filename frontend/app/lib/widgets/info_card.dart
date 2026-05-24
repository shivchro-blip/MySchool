import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../theme/typography.dart';

class InfoCard extends StatelessWidget {
  final String label;
  final IconData icon;
  final String body;
  final bool isTip;

  const InfoCard({
    super.key,
    required this.label,
    required this.icon,
    required this.body,
    this.isTip = false,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = AppTheme.isDark(context);
    final Color bgColor, borderColor, accentColor;
    if (isTip) {
      bgColor     = isDark ? const Color(0xFF2E2412) : const Color(0xFFFBF1DD);
      borderColor = isDark ? const Color(0xFF6B5117) : const Color(0xFFE9C27A);
      accentColor = isDark ? const Color(0xFFE0B25C) : const Color(0xFF8A5A12);
    } else {
      bgColor     = AppTheme.cardOf(context);
      borderColor = AppTheme.borderOf(context);
      accentColor = AppTheme.brand;
    }
    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: isTip ? 16.0 : 15.0,
        vertical: 14.0,
      ),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: borderColor),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, size: 16, color: accentColor),
              const SizedBox(width: 7),
              Text(
                label,
                style: isTip
                    ? AppTypography.eyebrow.copyWith(color: accentColor)
                    : AppTypography.label.copyWith(color: AppTheme.textOf(context)),
              ),
            ],
          ),
          SizedBox(height: isTip ? 6.0 : 7.0),
          Text(
            body,
            style: isTip
                ? AppTypography.bodySm.copyWith(color: AppTheme.textOf(context))
                : AppTypography.caption.copyWith(color: AppTheme.text2Of(context)),
          ),
        ],
      ),
    );
  }
}
