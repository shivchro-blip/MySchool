import 'package:flutter/material.dart';
import '../../config/theme.dart';

class ViewerNavControls extends StatelessWidget {
  final int currentPage;
  final int totalPages;
  final VoidCallback? onPrev;
  final VoidCallback? onNext;

  const ViewerNavControls({
    super.key,
    required this.currentPage,
    required this.totalPages,
    this.onPrev,
    this.onNext,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: AppTheme.cardOf(context),
        border: Border(top: BorderSide(color: AppTheme.borderOf(context))),
      ),
      child: Row(
        children: [
          _NavButton(
            label: '← Previous',
            enabled: currentPage > 1,
            onTap: onPrev,
          ),
          Expanded(
            child: Text(
              'Page $currentPage of $totalPages',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w500,
                color: AppTheme.text2Of(context),
              ),
            ),
          ),
          _NavButton(
            label: 'Next →',
            enabled: currentPage < totalPages,
            onTap: onNext,
          ),
        ],
      ),
    );
  }
}

class _NavButton extends StatelessWidget {
  final String label;
  final bool enabled;
  final VoidCallback? onTap;

  const _NavButton({required this.label, required this.enabled, this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 7),
        decoration: BoxDecoration(
          border: Border.all(color: AppTheme.borderOf(context)),
          borderRadius: BorderRadius.circular(AppTheme.radiusButton),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w500,
            color: enabled ? AppTheme.text2Of(context) : AppTheme.textMutedOf(context),
          ),
        ),
      ),
    );
  }
}
