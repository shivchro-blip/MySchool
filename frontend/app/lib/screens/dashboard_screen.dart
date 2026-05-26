import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../config/theme.dart';
import '../config/syllabus_config.dart';
import '../providers/syllabus_provider.dart';
import '../providers/user_provider.dart';
import '../services/auth_service.dart';
import '../services/user_preferences_service.dart';
import '../utils/practice_draft_storage.dart';
import '../widgets/eyebrow.dart';
import '../widgets/page_header.dart';
import '../widgets/brand_logo.dart';
import '../widgets/theme_toggle.dart';

class _DashStats {
  final int totalSessions;
  final int totalQuestions;
  final double bestScorePct;
  final PracticeDraft? draft;
  final String? draftClassLevel;
  final String? draftSubjectSlug;

  const _DashStats({
    required this.totalSessions,
    required this.totalQuestions,
    required this.bestScorePct,
    this.draft,
    this.draftClassLevel,
    this.draftSubjectSlug,
  });

  bool get hasStats => totalSessions > 0;
  bool get hasDraft => draft != null && draftClassLevel != null;
}

class _ClassInfo {
  final String classLevel;
  final String title;
  final int lessonCount;
  const _ClassInfo({
    required this.classLevel,
    required this.title,
    required this.lessonCount,
  });
}

List<_ClassInfo> _dashboardClassesFromSyllabus() =>
    SyllabusConfig.courseClassLevels
        .map((classLevel) => _ClassInfo(
              classLevel: classLevel,
              title: SyllabusConfig.courseShortTitle(classLevel),
              lessonCount: SyllabusConfig.lessonCountForClass(classLevel),
            ))
        .toList(growable: false);

List<_ClassInfo> _filterDashboardClassesForProfile(
  List<_ClassInfo> courses,
  String? classLevel,
) {
  if (classLevel == null || classLevel.isEmpty) return courses;
  return courses.where((course) => course.classLevel == classLevel).toList();
}

void _debugAssertDashboardCourseCount({
  required List<_ClassInfo> allCourses,
  required List<_ClassInfo> visibleCourses,
  required String? profileClassLevel,
  required bool profileLoaded,
}) {
  assert(() {
    final expected = SyllabusConfig.courseCount;
    debugPrint(
      'Dashboard courses: visible=${visibleCourses.length}, syllabus=$expected, '
      'profileLoaded=$profileLoaded, profileClass=$profileClassLevel, '
      'all=${allCourses.map((c) => c.classLevel).join(',')}, '
      'visibleClasses=${visibleCourses.map((c) => c.classLevel).join(',')}',
    );
    return allCourses.length == expected;
  }(),
      'Dashboard course list is not rendering every class from SyllabusConfig.');
}

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  _DashStats? _dashStats;

  @override
  void initState() {
    super.initState();
    _loadDashStats();
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

  Future<void> _loadDashStats() async {
    final prefs = await SharedPreferences.getInstance();
    final allKeys = prefs.getKeys();

    int totalSessions = 0;
    int totalQuestions = 0;
    double bestScorePct = 0;

    for (final key
        in allKeys.where((k) => k.startsWith('exam_coach_sessions_'))) {
      for (final item in prefs.getStringList(key) ?? []) {
        try {
          final j = jsonDecode(item) as Map<String, dynamic>;
          totalSessions++;
          totalQuestions += (j['total'] as int? ?? 0);
          final score = (j['score'] as num?)?.toDouble() ?? 0;
          final total = (j['total'] as num?)?.toDouble() ?? 1;
          final pct = score / total * 100;
          if (pct > bestScorePct) bestScorePct = pct;
        } catch (_) {}
      }
    }

    PracticeDraft? foundDraft;
    String? foundClassLevel;
    String? foundSubjectSlug;

    for (final key
        in allKeys.where((k) => k.startsWith('practice_draft_mobile_'))) {
      final raw = prefs.getString(key);
      if (raw == null || raw.isEmpty) continue;
      try {
        final decoded = jsonDecode(raw);
        if (decoded is! Map<String, dynamic>) continue;
        final draft = PracticeDraft.fromJson(decoded);
        if (draft == null || draft.currentQuestionIndex <= 0) continue;
        final suffix = key.substring('practice_draft_mobile_'.length);
        if (suffix.startsWith('Class_11_English_')) {
          foundDraft = draft;
          foundClassLevel = '+1';
          foundSubjectSlug = 'english';
          break;
        } else if (suffix.startsWith('Class_12_English_')) {
          foundDraft = draft;
          foundClassLevel = '+2';
          foundSubjectSlug = 'english';
          break;
        }
      } catch (_) {}
    }

    if (!mounted) return;
    setState(() {
      _dashStats = _DashStats(
        totalSessions: totalSessions,
        totalQuestions: totalQuestions,
        bestScorePct: bestScorePct,
        draft: foundDraft,
        draftClassLevel: foundClassLevel,
        draftSubjectSlug: foundSubjectSlug,
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    final user = context.watch<UserProvider>();
    final name = user.profile?.displayName ?? 'Student';

    final allClasses = _dashboardClassesFromSyllabus();
    final visibleClasses = user.loaded
        ? _filterDashboardClassesForProfile(allClasses, user.allowedClass)
        : const <_ClassInfo>[];
    final subjectCounts = {
      for (final course in visibleClasses)
        course.classLevel: SyllabusConfig.subjectCountForClass(
          course.classLevel,
        ),
    };
    _debugAssertDashboardCourseCount(
      allCourses: allClasses,
      visibleCourses: visibleClasses,
      profileClassLevel: user.allowedClass,
      profileLoaded: user.loaded,
    );

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
        title: const Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            BrandLogo(height: 34),
            SizedBox(width: 9),
            Text(
              'Exam Coach',
              style: TextStyle(
                fontSize: 15,
                fontWeight: FontWeight.w700,
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
            icon:
                Icon(Icons.logout, size: 18, color: AppTheme.text2Of(context)),
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
                  color: Colors.white,
                  fontWeight: FontWeight.w700,
                  fontSize: 13,
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
              eyebrow: 'Tamil Nadu State Board',
              title: 'Good morning, $name.',
              subtitle: '${SyllabusConfig.getSubjects().length} subjects and '
                  '${SyllabusConfig.totalLessonCount} lessons. '
                  'Pick up where you left off.',
              padding: EdgeInsets.zero,
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
                border: Border.all(color: AppTheme.borderOf(context)),
                borderRadius: BorderRadius.circular(AppTheme.radiusCard),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  for (int i = 0; i < visibleClasses.length; i++) ...[
                    _ClassRow(
                      info: visibleClasses[i],
                      subjectCount:
                          subjectCounts[visibleClasses[i].classLevel] ?? 0,
                      loading: false,
                      onTap: () => context
                          .push('/courses/${visibleClasses[i].classLevel}'),
                    ),
                    if (i < visibleClasses.length - 1)
                      Divider(
                          height: 1,
                          thickness: 1,
                          color: AppTheme.borderOf(context)),
                  ],
                ],
              ),
            ),

            if (_dashStats != null) ...[
              if (_dashStats!.hasDraft) ...[
                const SizedBox(height: 24),
                const Eyebrow('Continue'),
                const SizedBox(height: 14),
                _DashboardContinueCard(
                  draft: _dashStats!.draft!,
                  classLevel: _dashStats!.draftClassLevel!,
                  subjectSlug: _dashStats!.draftSubjectSlug!,
                ),
              ],
              if (_dashStats!.hasStats) ...[
                const SizedBox(height: 24),
                const Eyebrow('Your Progress'),
                const SizedBox(height: 14),
                _DashboardStats(stats: _dashStats!),
              ],
            ],
          ],
        ),
      ),
    );
  }
}

// ── Stats section ─────────────────────────────────────────────────────────────

class _DashboardStats extends StatelessWidget {
  final _DashStats stats;
  const _DashboardStats({required this.stats});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
            child:
                _StatCard(label: 'Sessions', value: '${stats.totalSessions}')),
        const SizedBox(width: 12),
        Expanded(
            child: _StatCard(
                label: 'Questions', value: '${stats.totalQuestions}')),
        const SizedBox(width: 12),
        Expanded(
            child: _StatCard(
                label: 'Best Score', value: '${stats.bestScorePct.round()}%')),
      ],
    );
  }
}

class _StatCard extends StatelessWidget {
  final String label;
  final String value;
  const _StatCard({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 12),
      decoration: BoxDecoration(
        color: AppTheme.cardOf(context),
        borderRadius: BorderRadius.circular(AppTheme.radiusCard),
        border: Border.all(color: AppTheme.borderOf(context)),
      ),
      child: Column(
        children: [
          Text(value,
              style: const TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w700,
                  color: AppTheme.brand)),
          const SizedBox(height: 2),
          Text(label,
              style: TextStyle(
                  fontSize: 11, color: AppTheme.textMutedOf(context))),
        ],
      ),
    );
  }
}

// ── Continue card ─────────────────────────────────────────────────────────────

class _DashboardContinueCard extends StatelessWidget {
  final PracticeDraft draft;
  final String classLevel;
  final String subjectSlug;
  const _DashboardContinueCard({
    required this.draft,
    required this.classLevel,
    required this.subjectSlug,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.cardOf(context),
        borderRadius: BorderRadius.circular(AppTheme.radiusCard),
        border: Border.all(color: AppTheme.borderOf(context)),
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Continue where you left off',
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w600,
                      color: AppTheme.textOf(context),
                    )),
                const SizedBox(height: 4),
                Text('${draft.lessonSlug} · Q${draft.currentQuestionIndex + 1}',
                    style: TextStyle(
                        fontSize: 12, color: AppTheme.textMutedOf(context)),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis),
              ],
            ),
          ),
          const SizedBox(width: 12),
          GestureDetector(
            onTap: () => context.push(
              '/exam/$classLevel/$subjectSlug/${draft.lessonSlug}',
            ),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
              decoration: BoxDecoration(
                color: AppTheme.brand,
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Text('Continue',
                  style: TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w600,
                      color: Colors.white)),
            ),
          ),
        ],
      ),
    );
  }
}

// ── Course row ────────────────────────────────────────────────────────────────

class _ClassRow extends StatelessWidget {
  final _ClassInfo info;
  final int subjectCount;
  final bool loading;
  final VoidCallback onTap;

  const _ClassRow({
    required this.info,
    required this.subjectCount,
    required this.loading,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final isPlus1 = info.classLevel == '+1';
    final badgeBg = isPlus1 ? AppTheme.plus1Bg : AppTheme.plus2Bg;
    final badgeText = isPlus1 ? AppTheme.plus1 : AppTheme.plus2;

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
                width: 46,
                height: 46,
                decoration: BoxDecoration(
                  color: badgeBg,
                  borderRadius: const BorderRadius.all(Radius.circular(10)),
                ),
                child: Center(
                  child: Text(
                    info.classLevel,
                    style: TextStyle(
                      fontSize: 17,
                      fontWeight: FontWeight.w800,
                      color: badgeText,
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
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                        color: AppTheme.textOf(context),
                      ),
                    ),
                    const SizedBox(height: 3),
                    loading
                        ? Container(
                            height: 11,
                            width: 80,
                            decoration: BoxDecoration(
                              color: AppTheme.borderOf(context),
                              borderRadius: BorderRadius.circular(6),
                            ),
                          )
                        : Text(
                            '$subjectCount subject${subjectCount != 1 ? 's' : ''}'
                            ' · '
                            '${info.lessonCount} lesson${info.lessonCount != 1 ? 's' : ''}',
                            style: TextStyle(
                              fontSize: 12,
                              color: AppTheme.textMutedOf(context),
                            ),
                          ),
                  ],
                ),
              ),
              Icon(Icons.chevron_right,
                  color: AppTheme.textMutedOf(context), size: 20),
            ],
          ),
        ),
      ),
    );
  }
}
