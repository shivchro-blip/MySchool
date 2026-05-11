import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../config/theme.dart';
import '../config/syllabus_config.dart';
import '../providers/syllabus_provider.dart';
import '../providers/user_provider.dart';
import '../providers/theme_provider.dart';
import '../services/auth_service.dart';

const _kTeal   = Color(0xFF2A7B6F);
const _kTealBg = Color(0xFFE6F4F2);

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
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<UserProvider>().loadIfNeeded();
      context.read<SyllabusProvider>().loadIfNeeded();
    });
  }

  @override
  Widget build(BuildContext context) {
    final user     = context.watch<UserProvider>();
    final syllabus = context.watch<SyllabusProvider>();
    final name     = user.profile?.displayName ?? 'Student';
    final isDark   = AppTheme.isDark(context);

    final subjectCounts = {
      '+1': syllabus.plus1Count,
      '+2': syllabus.plus2Count,
    };

    // Pill colors — neutral in both modes
    final pillBg     = isDark ? const Color(0xFF2D3748) : const Color(0xFFEDE9E2);
    final pillBorder = isDark ? const Color(0xFF4A5568) : const Color(0xFFD1CCC5);
    final pillText   = isDark ? Colors.white : const Color(0xFF374151);

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
                color:        _kTeal,
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
          Padding(
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
          ),
          // Logout
          IconButton(
            icon: Icon(Icons.logout, size: 18, color: AppTheme.text2Of(context)),
            tooltip: 'Log out',
            onPressed: () async {
              await AuthService().logout();
              if (context.mounted) context.go('/login');
            },
          ),
          // Avatar
          Padding(
            padding: const EdgeInsets.only(right: 14),
            child: CircleAvatar(
              radius: 15,
              backgroundColor: _kTeal,
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
        color: _kTeal,
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
            Text(
              'TAMIL NADU STATE BOARD',
              style: TextStyle(
                fontSize:      10,
                fontWeight:    FontWeight.w700,
                letterSpacing: 1.2,
                color: AppTheme.textMutedOf(context),
              ),
            ),
            const SizedBox(height: 10),
            Text(
              'Good morning, $name.',
              style: TextStyle(
                fontSize:      28,
                fontWeight:    FontWeight.w700,
                color:         AppTheme.textOf(context),
                letterSpacing: -0.5,
                height:        1.2,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              '${syllabus.subjects.length} subjects and '
              '${SyllabusConfig.totalLessonCount} lessons. '
              'Pick up where you left off.',
              style: TextStyle(
                fontSize: 14,
                color:    AppTheme.text2Of(context),
                height:   1.6,
              ),
            ),
            const SizedBox(height: 28),
            Divider(height: 1, thickness: 1, color: AppTheme.borderOf(context)),
            const SizedBox(height: 28),

            // ── My Courses ──────────────────────────────────────
            Text(
              'MY COURSES',
              style: TextStyle(
                fontSize:      10,
                fontWeight:    FontWeight.w700,
                letterSpacing: 1.2,
                color: AppTheme.textMutedOf(context),
              ),
            ),
            const SizedBox(height: 14),
            Container(
              clipBehavior: Clip.antiAlias,
              decoration: BoxDecoration(
                border:       Border.all(color: AppTheme.borderOf(context)),
                borderRadius: BorderRadius.circular(14),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  for (int i = 0; i < _kDashClasses.length; i++) ...[
                    _ClassRow(
                      info:         _kDashClasses[i],
                      subjectCount: subjectCounts[_kDashClasses[i].classLevel] ?? 0,
                      loading:      !syllabus.loaded,
                      onTap:        () => context.push('/courses/${_kDashClasses[i].classLevel}'),
                    ),
                    if (i < _kDashClasses.length - 1)
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

class _ClassRow extends StatefulWidget {
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
  State<_ClassRow> createState() => _ClassRowState();
}

class _ClassRowState extends State<_ClassRow> {
  bool _pressed = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown:   (_) => setState(() => _pressed = true),
      onTapUp:     (_) { setState(() => _pressed = false); widget.onTap(); },
      onTapCancel: ()  => setState(() => _pressed = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 80),
        color:   _pressed ? AppTheme.borderOf(context) : AppTheme.cardOf(context),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 18),
        child: Row(
          children: [
            // Year badge — teal for both classes
            Container(
              width:  46,
              height: 46,
              decoration: const BoxDecoration(
                color:        _kTealBg,
                borderRadius: BorderRadius.all(Radius.circular(10)),
              ),
              child: Center(
                child: Text(
                  widget.info.classLevel,
                  style: const TextStyle(
                    fontSize:   17,
                    fontWeight: FontWeight.w800,
                    color:      _kTeal,
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
                    widget.info.title,
                    style: TextStyle(
                      fontSize:   14,
                      fontWeight: FontWeight.w600,
                      color:      AppTheme.textOf(context),
                    ),
                  ),
                  const SizedBox(height: 3),
                  widget.loading
                      ? Container(
                          height: 11, width: 80,
                          decoration: BoxDecoration(
                            color:        AppTheme.borderOf(context),
                            borderRadius: BorderRadius.circular(6),
                          ),
                        )
                      : Text(
                          '${widget.subjectCount} subject${widget.subjectCount != 1 ? 's' : ''}'
                          ' · '
                          '${widget.info.lessonCount} lesson${widget.info.lessonCount != 1 ? 's' : ''}',
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
    );
  }
}
