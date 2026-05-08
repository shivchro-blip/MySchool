import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../config/theme.dart';
import '../providers/theme_provider.dart';

class ShellScaffold extends StatelessWidget {
  final Widget child;
  const ShellScaffold({super.key, required this.child});

  static const _navTabs = [
    _Tab(path: '/dashboard', icon: Icons.home_outlined,     activeIcon: Icons.home,        label: 'Home'),
    _Tab(path: '/courses',   icon: Icons.menu_book_outlined, activeIcon: Icons.menu_book,  label: 'Courses'),
    _Tab(path: '/progress',  icon: Icons.bar_chart_outlined, activeIcon: Icons.bar_chart,  label: 'Progress'),
  ];

  int _activeIndex(BuildContext context) {
    final loc = GoRouterState.of(context).uri.toString();
    if (loc.startsWith('/courses')) return 1;
    if (loc.startsWith('/progress')) return 2;
    if (loc.startsWith('/learn/')      ||
        loc.startsWith('/rich-learn/') ||
        loc.startsWith('/practice/')   ||
        loc.startsWith('/exam/')) {
      return 1;
    }
    return 0;
  }

  @override
  Widget build(BuildContext context) {
    final idx    = _activeIndex(context);
    final isDark = AppTheme.isDark(context);

    return Scaffold(
      body: child,
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          border: Border(top: BorderSide(color: AppTheme.borderOf(context))),
        ),
        child: BottomNavigationBar(
          currentIndex: idx,
          onTap: (i) {
            if (i == 3) {
              context.read<ThemeProvider>().toggle();
            } else if (i != idx) {
              context.go(_navTabs[i].path);
            }
          },
          items: [
            ..._navTabs.map((t) => BottomNavigationBarItem(
              icon:       Icon(t.icon),
              activeIcon: Icon(t.activeIcon),
              label:      t.label,
            )),
            BottomNavigationBarItem(
              icon:  Icon(isDark ? Icons.wb_sunny_outlined : Icons.nightlight_outlined),
              label: isDark ? 'Light' : 'Dark',
            ),
          ],
        ),
      ),
    );
  }
}

class _Tab {
  final String   path;
  final IconData icon;
  final IconData activeIcon;
  final String   label;
  const _Tab({
    required this.path,
    required this.icon,
    required this.activeIcon,
    required this.label,
  });
}
