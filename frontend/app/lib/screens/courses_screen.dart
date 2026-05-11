import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../config/theme.dart';
import '../providers/syllabus_provider.dart';
import '../widgets/error_view.dart';

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
    final syllabus = context.watch<SyllabusProvider>();

    return Scaffold(
      appBar: AppBar(title: const Text('My Courses')),
      body: RefreshIndicator(
        color: AppTheme.brand,
        onRefresh: () => context.read<SyllabusProvider>().load(),
        child: ListView(
          padding: const EdgeInsets.fromLTRB(16, 24, 16, 32),
          children: [
            // ── Editorial header ──────────────────────────────────
            Text(
              'TAMIL NADU STATE BOARD',
              style: TextStyle(
                fontSize:   10,
                fontWeight: FontWeight.w700,
                letterSpacing: 1.2,
                color: AppTheme.textMutedOf(context),
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'My Courses',
              style: TextStyle(
                fontSize:   26,
                fontWeight: FontWeight.w700,
                color:      AppTheme.textOf(context),
                letterSpacing: -0.5,
                height: 1.2,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              'Select a year group to browse subjects and lessons.',
              style: TextStyle(
                fontSize: 14,
                color:    AppTheme.text2Of(context),
                height:   1.6,
              ),
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
                  for (int i = 0; i < _kCourseClasses.length; i++) ...[
                    _ClassRow(
                      info:         _kCourseClasses[i],
                      subjectCount: i == 0 ? syllabus.plus1Count : syllabus.plus2Count,
                      loading:      !syllabus.loaded,
                      onTap:        () => context.push('/courses/${_kCourseClasses[i].classLevel}'),
                    ),
                    if (i < _kCourseClasses.length - 1)
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
