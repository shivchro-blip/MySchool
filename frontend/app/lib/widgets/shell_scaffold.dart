import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../config/theme.dart';

class ShellScaffold extends StatelessWidget {
  final Widget child;
  const ShellScaffold({super.key, required this.child});

  static const _navTabs = [
    _Tab(path: '/dashboard', icon: Icons.home_outlined,      activeIcon: Icons.home,       label: 'Home'),
    _Tab(path: '/courses',   icon: Icons.menu_book_outlined,  activeIcon: Icons.menu_book,  label: 'Courses'),
    _Tab(path: '/progress',  icon: Icons.bar_chart_outlined,  activeIcon: Icons.bar_chart,  label: 'Progress'),
  ];

  int _activeIndex(BuildContext context) {
    final loc = GoRouterState.of(context).uri.toString();
    if (loc.startsWith('/courses')) return 1;
    if (loc.startsWith('/progress')) return 2;
    if (loc.startsWith('/learn/') ||
        loc.startsWith('/rich-learn/') ||
        loc.startsWith('/practice/') ||
        loc.startsWith('/exam/')) {
      return 1;
    }
    return 0;
  }

  @override
  Widget build(BuildContext context) {
    final idx = _activeIndex(context);

    return Scaffold(
      body: child,
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color:  AppTheme.cardOf(context),
          border: Border(top: BorderSide(color: AppTheme.borderOf(context), width: 0.5)),
        ),
        child: SafeArea(
          top: false,
          child: SizedBox(
            height: 60,
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: _navTabs.asMap().entries.map((e) {
                final i      = e.key;
                final tab    = e.value;
                final active = i == idx;
                return Expanded(
                  child: InkWell(
                    onTap: i != idx ? () => context.go(tab.path) : null,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          active ? tab.activeIcon : tab.icon,
                          size:  22,
                          color: active ? AppTheme.brand : AppTheme.textMutedOf(context),
                        ),
                        const SizedBox(height: 3),
                        Text(
                          tab.label,
                          style: TextStyle(
                            fontSize:   10,
                            fontWeight: active ? FontWeight.w600 : FontWeight.w500,
                            color: active ? AppTheme.brand : AppTheme.textMutedOf(context),
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              }).toList(),
            ),
          ),
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
