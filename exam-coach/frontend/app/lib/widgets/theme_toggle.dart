import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/theme_provider.dart';

class ThemeToggle extends StatelessWidget {
  const ThemeToggle({super.key}) : _isPill = false;
  const ThemeToggle.pill({super.key}) : _isPill = true;

  final bool _isPill;

  @override
  Widget build(BuildContext context) {
    return _isPill ? _buildPill(context) : _buildIcon(context);
  }

  Widget _buildIcon(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return IconButton(
      onPressed: () => context.read<ThemeProvider>().toggle(),
      tooltip: isDark ? 'Switch to light mode' : 'Switch to dark mode',
      icon: AnimatedSwitcher(
        duration: const Duration(milliseconds: 250),
        transitionBuilder: (child, anim) => RotationTransition(
          turns: anim,
          child: FadeTransition(opacity: anim, child: child),
        ),
        child: Icon(
          isDark ? Icons.wb_sunny_outlined : Icons.nightlight_outlined,
          key: ValueKey(isDark),
          size: 22,
        ),
      ),
    );
  }

  Widget _buildPill(BuildContext context) {
    final isDark     = Theme.of(context).brightness == Brightness.dark;
    final pillBg     = isDark ? const Color(0xFF2D3748) : const Color(0xFFEDE9E2);
    final pillBorder = isDark ? const Color(0xFF4A5568) : const Color(0xFFD1CCC5);
    final pillText   = isDark ? Colors.white            : const Color(0xFF374151);

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 13),
      child: GestureDetector(
        onTap: () => context.read<ThemeProvider>().toggle(),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
          decoration: BoxDecoration(
            color:        pillBg,
            border:       Border.all(color: pillBorder),
            borderRadius: BorderRadius.circular(100),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                isDark ? Icons.wb_sunny_outlined : Icons.nightlight_round,
                size:  13,
                color: pillText,
              ),
              const SizedBox(width: 5),
              Text(
                isDark ? 'Light' : 'Dark',
                style: TextStyle(
                  fontSize:   11,
                  fontWeight: FontWeight.w600,
                  color:      pillText,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
