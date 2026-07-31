import 'package:flutter/material.dart';
import '../config/theme.dart';

class ErrorView extends StatelessWidget {
  final String   message;
  final VoidCallback? onRetry;
  final String   retryLabel;

  const ErrorView({
    super.key,
    required this.message,
    this.onRetry,
    this.retryLabel = 'Try again',
  });

  @override
  Widget build(BuildContext context) {
    final bg     = AppTheme.errorBgOf(context);
    final border = AppTheme.errorBorderOf(context);
    final fg     = AppTheme.errorFgOf(context);

    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color:        bg,
        borderRadius: BorderRadius.circular(10),
        border:       Border.all(color: border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            message,
            style: TextStyle(fontSize: 13, color: fg),
          ),
          if (onRetry != null) ...[
            const SizedBox(height: 6),
            GestureDetector(
              onTap: onRetry,
              child: Text(
                retryLabel,
                style: TextStyle(
                  fontSize:   13,
                  color:      fg,
                  decoration: TextDecoration.underline,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
