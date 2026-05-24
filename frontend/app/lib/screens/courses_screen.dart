import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../config/theme.dart';
import '../providers/syllabus_provider.dart';
import '../providers/user_provider.dart';
import '../widgets/error_view.dart';
import '../widgets/page_header.dart';

class _ClassInfo {
  final String classLevel;
  final String fullName;
  final Color  color;
  final Color  bg;
  const _ClassInfo({
    required this.classLevel,
    required this.fullName,
    required this.color,
    required this.bg,
  });
}

const _kCourseClasses = [
  _ClassInfo(
    classLevel: '+1',
    fullName:   'Class XI — Higher Secondary First Year',
    color:      AppTheme.plus1,
    bg:         AppTheme.plus1Bg,
  ),
  _ClassInfo(
    classLevel: '+2',
    fullName:   'Class XII — Higher Secondary Second Year',
    color:      AppTheme.plus2,
    bg:         AppTheme.plus2Bg,
  ),
];

class CoursesScreen extends StatefulWidget {
  const CoursesScreen({super.key});

  @override
  State<CoursesScreen> createState() => _CoursesScreenState();
}

class _CoursesScreenState extends State<CoursesScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<SyllabusProvider>().loadIfNeeded();
    });
  }

  @override
  Widget build(BuildContext context) {
    final syllabus     = context.watch<SyllabusProvider>();
    final allowedClass = context.watch<UserProvider>().allowedClass;

    final subjectCounts = {
      '+1': syllabus.plus1Count,
      '+2': syllabus.plus2Count,
    };

    // Show only the class the user selected during onboarding (if set).
    final visibleClasses = allowedClass != null
        ? _kCourseClasses.where((c) => c.classLevel == allowedClass).toList()
        : _kCourseClasses;

    return Scaffold(
      appBar: AppBar(title: const Text('My Courses')),
      body: RefreshIndicator(
        color: AppTheme.brand,
        onRefresh: () => context.read<SyllabusProvider>().load(),
        child: ListView(
          padding: const EdgeInsets.fromLTRB(16, 24, 16, 32),
          children: [
            // ── Editorial header ──────────────────────────────────
            const PageHeader(
              eyebrow:  'Tamil Nadu State Board',
              title:    'My Courses',
              subtitle: 'Select a year group to browse subjects and lessons.',
              padding:  EdgeInsets.zero,
            ),
            const SizedBox(height: 32),

            // ── Error ─────────────────────────────────────────────
            if (syllabus.error != null)
              Padding(
                padding: const EdgeInsets.only(bottom: 16),
                child: ErrorView(
                  message: syllabus.error!,
                  onRetry: () => context.read<SyllabusProvider>().load(),
                ),
              ),

            // ── Grouped course list ───────────────────────────────
            Container(
              clipBehavior: Clip.antiAlias,
              decoration: BoxDecoration(
                border:       Border.all(color: AppTheme.borderOf(context)),
                borderRadius: BorderRadius.circular(12),
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
                      Divider(
                        height:    1,
                        thickness: 1,
                        color:     AppTheme.borderOf(context),
                      ),
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

// ── Row widget for the grouped course list ────────────────────────────────────

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
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
        child: Row(
          children: [
            Container(
              width:  48,
              height: 48,
              decoration: BoxDecoration(
                color:        widget.info.bg,
                borderRadius: BorderRadius.circular(10),
              ),
              child: Center(
                child: Text(
                  widget.info.classLevel,
                  style: TextStyle(
                    fontSize:   18,
                    fontWeight: FontWeight.w800,
                    color:      widget.info.color,
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
                    widget.info.fullName,
                    style: TextStyle(
                      fontSize:   14,
                      fontWeight: FontWeight.w600,
                      color:      AppTheme.textOf(context),
                    ),
                  ),
                  const SizedBox(height: 3),
                  widget.loading
                      ? Container(
                          height: 11,
                          width:  72,
                          decoration: BoxDecoration(
                            color:        AppTheme.borderOf(context),
                            borderRadius: BorderRadius.circular(6),
                          ),
                        )
                      : Text(
                          '${widget.subjectCount} subject${widget.subjectCount != 1 ? 's' : ''}',
                          style: TextStyle(
                            fontSize: 12,
                            color:    AppTheme.textMutedOf(context),
                          ),
                        ),
                ],
              ),
            ),
            Icon(
              Icons.chevron_right,
              color: AppTheme.textMutedOf(context),
              size:  20,
            ),
          ],
        ),
      ),
    );
  }
}
