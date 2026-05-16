import 'dart:ui';
import 'package:flutter/material.dart';

enum ArrowDirection { left, right }

class ViewerSideArrow extends StatelessWidget {
  final ArrowDirection direction;
  final VoidCallback onTap;
  final bool disabled;

  const ViewerSideArrow({
    super.key,
    required this.direction,
    required this.onTap,
    this.disabled = false,
  });

  @override
  Widget build(BuildContext context) {
    final isLeft = direction == ArrowDirection.left;
    final icon   = isLeft ? Icons.chevron_left_rounded : Icons.chevron_right_rounded;

    return Positioned(
      top: 0,
      bottom: 0,
      left:  isLeft  ? 16 : null,
      right: !isLeft ? 16 : null,
      child: Center(
        child: GestureDetector(
          onTap: disabled ? null : onTap,
          child: Opacity(
            opacity: disabled ? 0.20 : 0.80,
            child: ClipOval(
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
                child: Container(
                  width: 52,
                  height: 52,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: Colors.white.withValues(alpha: 0.12),
                    border: Border.all(color: Colors.white.withValues(alpha: 0.18)),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withValues(alpha: 0.30),
                        blurRadius: 12,
                        offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                  child: Icon(icon, size: 22, color: Colors.white),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
