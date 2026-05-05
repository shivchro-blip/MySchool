import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../config/theme.dart';

class ShellScaffold extends StatelessWidget {
  final Widget child;
  const ShellScaffold({super.key, required this.child});

  static const _tabs = [
    _Tab(path: '/dashboard', icon: Icons.home_outlined,    activeIcon: Icons.home,         label: 'Home'),
    _Tab(path: '/courses',   icon: Icons.menu_book_outlined, activeIcon: Icons.menu_book,  label: 'Courses'),
    _Tab(path: '/progress',  icon: Icons.bar_chart_outlined, activeIcon: Icons.bar_chart,  label: 'Progress'),
  ];

  int _activeIndex(BuildContext context) {
    final loc = GoRouterState.of(context).uri.toString();
    if (loc.startsWith('/courses'))  return 1;
    if (loc.startsWith('/progress')) return 2;
    return 0;
  }

  @override
  Widget build(BuildContext context) {
    final idx = _activeIndex(context);
    return Scaffold(
      body: child,
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          border: Border(top: BorderSide(color: AppTheme.border)),
        ),
        child: BottomNavigationBar(
          currentIndex: idx,
          onTap: (i) {
            if (i != idx) context.go(_tabs[i].path);
          },
          items: _tabs.map((t) => BottomNavigationBarItem(
            icon:       Icon(t.icon),
            activeIcon: Icon(t.activeIcon),
            label:      t.label,
          )).toList(),
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
