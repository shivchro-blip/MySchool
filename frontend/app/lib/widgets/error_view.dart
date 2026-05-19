import 'package:flutter/material.dart';

class ErrorView extends StatelessWidget {
  final String   message;
  final VoidCallback? onRetry;

  const ErrorView({super.key, required this.message, this.onRetry});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color:        const Color(0xFFFEF2F2),
        borderRadius: BorderRadius.circular(10),
        border:       Border.all(color: const Color(0xFFFECACA)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            message,
            style: const TextStyle(
              fontSize: 13, color: Color(0xFFB91C1C),
            ),
          ),
          if (onRetry != null) ...[
            const SizedBox(height: 6),
            GestureDetector(
              onTap: onRetry,
              child: const Text(
                'Try again',
                style: TextStyle(
                  fontSize:      13,
                  color:         Color(0xFFB91C1C),
                  decoration:    TextDecoration.underline,
                  fontWeight:    FontWeight.w600,
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
