import 'dart:ui';
import 'package:flutter/material.dart';
import '../../config/theme.dart';

class ViewerNavControls extends StatelessWidget {
  final String pageLabel;
  final bool isFirst;
  final bool isLast;
  final VoidCallback onFirst;
  final VoidCallback onPrev;
  final VoidCallback onNext;
  final VoidCallback onLast;
  final double zoomLevel;
  final VoidCallback onZoomIn;
  final VoidCallback onZoomOut;
  final VoidCallback onOpenThumbnails;

  const ViewerNavControls({
    super.key,
    required this.pageLabel,
    required this.isFirst,
    required this.isLast,
    required this.onFirst,
    required this.onPrev,
    required this.onNext,
    required this.onLast,
    required this.zoomLevel,
    required this.onZoomIn,
    required this.onZoomOut,
    required this.onOpenThumbnails,
  });

  @override
  Widget build(BuildContext context) {
    final zoomPct = '${(zoomLevel * 100).round()}%';

    return ClipRRect(
      borderRadius: BorderRadius.circular(AppTheme.radiusPill),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 16, sigmaY: 16),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
          decoration: BoxDecoration(
            color: const Color(0xFF1C1C1C).withValues(alpha: 0.72),
            borderRadius: BorderRadius.circular(AppTheme.radiusPill),
            border: Border.all(color: Colors.white.withValues(alpha: 0.12)),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.5),
                blurRadius: 24,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              _PillBtn(icon: Icons.grid_view_rounded, onTap: onOpenThumbnails),
              _Divider(),

              _PillBtn(icon: Icons.first_page_rounded,    onTap: onFirst, disabled: isFirst),
              _PillBtn(icon: Icons.chevron_left_rounded,  onTap: onPrev,  disabled: isFirst),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 6),
                child: Text(
                  pageLabel,
                  style: const TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w500,
                    color: Colors.white70,
                  ),
                ),
              ),
              _PillBtn(icon: Icons.chevron_right_rounded, onTap: onNext, disabled: isLast),
              _PillBtn(icon: Icons.last_page_rounded,     onTap: onLast, disabled: isLast),
              _Divider(),

              _PillBtn(
                icon: Icons.remove_rounded,
                onTap: onZoomOut,
                disabled: zoomLevel <= 0.5,
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 4),
                child: Text(
                  zoomPct,
                  style: const TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.w500,
                    color: Colors.white54,
                  ),
                ),
              ),
              _PillBtn(
                icon: Icons.add_rounded,
                onTap: onZoomIn,
                disabled: zoomLevel >= 2.0,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _PillBtn extends StatelessWidget {
  final IconData icon;
  final VoidCallback onTap;
  final bool disabled;

  const _PillBtn({required this.icon, required this.onTap, this.disabled = false});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: disabled ? null : onTap,
      child: SizedBox(
        width: 32,
        height: 32,
        child: Icon(
          icon,
          size: 18,
          color: disabled
              ? Colors.white.withValues(alpha: 0.25)
              : Colors.white.withValues(alpha: 0.80),
        ),
      ),
    );
  }
}

class _Divider extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 1,
      height: 16,
      margin: const EdgeInsets.symmetric(horizontal: 4),
      color: Colors.white.withValues(alpha: 0.20),
    );
  }
}
