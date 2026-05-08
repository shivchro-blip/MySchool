import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/theme_provider.dart';

class ThemeToggle extends StatelessWidget {
  const ThemeToggle({super.key});

  @override
  Widget build(BuildContext context) {
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
}
