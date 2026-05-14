import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../config/theme.dart';
import '../config/syllabus_config.dart';
import '../providers/syllabus_provider.dart';
import '../providers/user_provider.dart';
import '../services/auth_service.dart';
import '../services/user_preferences_service.dart';
import '../widgets/eyebrow.dart';
import '../widgets/page_header.dart';
import '../widgets/theme_toggle.dart';

class _ClassInfo {
  final String classLevel;
  final String title;
  final int    lessonCount;
  const _ClassInfo({
    required this.classLevel,
    required this.title,
    required this.lessonCount,
  });
}

final _kDashClasses = [
  _ClassInfo(
    classLevel:  '+1',
    title:       'Class XI — First Year',
    lessonCount: SyllabusConfig.plus1LessonCount,
  ),
  _ClassInfo(
    classLevel:  '+2',
    title:       'Class XII — Second Year',
    lessonCount: SyllabusConfig.plus2LessonCount,
  ),
];

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      if (!mounted) return;
      await context.read<UserProvider>().loadIfNeeded();
      if (!mounted) return;
      // Belt-and-suspenders: redirect if profile says onboarding not done
      // (catches cases where SharedPreferences was null/stale at router time).
      final user = context.read<UserProvider>();
      if (user.profile != null && !user.onboardingCompleted) {
        context.go('/onboarding');
        return;
      }
      context.read<SyllabusProvider>().loadIfNeeded();
    });
  }

  @override
  Widget build(BuildContext context) {
    final user     = context.watch<UserProvider>();
    final syllabus = context.watch<SyllabusProvider>();
    final name     = user.profile?.displayName ?? 'Student';

    final subjectCounts = {
      '+1': syllabus.plus1Count,
      '+2': syllabus.plus2Count,
    };

    // Show only the class the user selected during onboarding (if set).
    final allowedClass    = user.allowedClass;
    final visibleClasses  = allowedClass != null
        ? _kDashClasses.where((c) => c.classLevel == allowedClass).toList()
        : _kDashClasses;

    return Scaffold(
      backgroundColor: AppTheme.surfaceOf(context),

      // ── App bar ─────────────────────────────────────────────
      appBar: AppBar(
        automaticallyImplyLeading: false,
        backgroundColor: AppTheme.cardOf(context),
        surfaceTintColor: Colors.transparent,
        elevation: 0,
        scrolledUnderElevation: 1,
        shadowColor: AppTheme.borderOf(context),
        titleSpacing: 16,
        title: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Brand icon — teal rounded square
            Container(
              width: 34, height: 34,
              decoration: BoxDecoration(
                color:        AppTheme.brand,
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Icon(Icons.school_rounded, color: Colors.white, size: 19),
            ),
            const SizedBox(width: 9),
            const Text(
              'Exam Coach',
              style: TextStyle(
                fontSize:    15,
                fontWeight:  FontWeight.w700,
                letterSpacing: -0.3,
              ),
            ),
          ],
        ),
        actions: [
          // Theme toggle pill
          const ThemeToggle.pill(),
          // Logout
          IconButton(
            icon: Icon(Icons.logout, size: 18, color: AppTheme.text2Of(context)),
            tooltip: 'Log out',
            onPressed: () async {
              context.read<UserProvider>().clear();
              await UserPreferencesService.clearAll();
              await AuthService().logout();
              if (context.mounted) context.go('/login');
            },
          ),
          // Avatar
          Padding(
            padding: const EdgeInsets.only(right: 14),
            child: CircleAvatar(
              radius: 15,
              backgroundColor: AppTheme.brand,
              child: Text(
                name.isNotEmpty ? name[0].toUpperCase() : 'S',
                style: const TextStyle(
                  color:      Colors.white,
                  fontWeight: FontWeight.w700,
                  fontSize:   13,
                ),
              ),
            ),
          ),
        ],
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(1),
          child: Container(height: 1, color: AppTheme.borderOf(context)),
        ),
      ),

      // ── Body ────────────────────────────────────────────────
      body: RefreshIndicator(
        color: AppTheme.brand,
        backgroundColor: AppTheme.cardOf(context),
        onRefresh: () async {
          final userProvider = context.read<UserProvider>();
          final syllabusProvider = context.read<SyllabusProvider>();
          await Future.wait([
            userProvider.load(),
            syllabusProvider.load(),
          ]);
        },
        child: ListView(
          padding: const EdgeInsets.fromLTRB(16, 0, 16, 32),
          children: [

            // ── Hero ───────────────────────────────────────────
            const SizedBox(height: 28),
            PageHeader(
              eyebrow:  'Tamil Nadu State Board',
              title:    'Good morning, $name.',
              subtitle: '${syllabus.subjects.length} subjects and '
                  '${SyllabusConfig.totalLessonCount} lessons. '
                  'Pick up where you left off.',
              padding:  EdgeInsets.zero,
            ),
            const SizedBox(height: 28),
            Divider(height: 1, thickness: 1, color: AppTheme.borderOf(context)),
            const SizedBox(height: 28),

            // ── My Courses ──────────────────────────────────────
            const Eyebrow('My Courses'),
            const SizedBox(height: 14),
            Container(
              clipBehavior: Clip.antiAlias,
              decoration: BoxDecoration(
                border:       Border.all(color: AppTheme.borderOf(context)),
                borderRadius: BorderRadius.circular(AppTheme.radiusCard),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  for (int i = 0; i < visibleClasses.length; i++) ...[
                    _ClassRow(
                      info:         visibleClasses[i],
                      subjectCount: subjectCounts[visibleClasses[i].classLevel] ?? 0,
                      loading:      !syllabus.loaded,
                      onTap:        () => context.push('/courses/${visibleClasses[i].classLevel}'),
                    ),
                    if (i < visibleClasses.length - 1)
                      Divider(height: 1, thickness: 1, color: AppTheme.borderOf(context)),
                  ],
                ],
              ),
            ),

          ],
        ),
      ),
    );
  }
}

// ── Course row ────────────────────────────────────────────────────────────────

class _ClassRow extends StatelessWidget {
  final _ClassInfo   info;
  final int          subjectCount;
  final bool         loading;
  final VoidCallback onTap;

  const _ClassRow({
    required this.info,
    required this.subjectCount,
    required this.loading,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final isPlus1   = info.classLevel == '+1';
    final badgeBg   = isPlus1 ? AppTheme.plus1Bg : AppTheme.plus2Bg;
    final badgeText = isPlus1 ? AppTheme.plus1   : AppTheme.plus2;

    return Material(
      color: AppTheme.cardOf(context),
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 18),
          child: Row(
            children: [
              // Year badge — +1 teal, +2 purple
              Container(
                width:  46,
                height: 46,
                decoration: BoxDecoration(
                  color:        badgeBg,
                  borderRadius: const BorderRadius.all(Radius.circular(10)),
                ),
                child: Center(
                  child: Text(
                    info.classLevel,
                    style: TextStyle(
                      fontSize:   17,
                      fontWeight: FontWeight.w800,
                      color:      badgeText,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      info.title,
                      style: TextStyle(
                        fontSize:   14,
                        fontWeight: FontWeight.w600,
                        color:      AppTheme.textOf(context),
                      ),
                    ),
                    const SizedBox(height: 3),
                    loading
                        ? Container(
                            height: 11, width: 80,
                            decoration: BoxDecoration(
                              color:        AppTheme.borderOf(context),
                              borderRadius: BorderRadius.circular(6),
                            ),
                          )
                        : Text(
                            '$subjectCount subject${subjectCount != 1 ? 's' : ''}'
                            ' · '
                            '${info.lessonCount} lesson${info.lessonCount != 1 ? 's' : ''}',
                            style: TextStyle(
                              fontSize: 12,
                              color:    AppTheme.textMutedOf(context),
                            ),
                          ),
                  ],
                ),
              ),
              Icon(Icons.chevron_right, color: AppTheme.textMutedOf(context), size: 20),
            ],
          ),
        ),
      ),
    );
  }
}
