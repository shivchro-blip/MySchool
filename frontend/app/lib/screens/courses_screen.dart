import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../config/theme.dart';
import '../providers/syllabus_provider.dart';
import '../widgets/error_view.dart';

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
      backgroundColor: AppTheme.surface,
      appBar: AppBar(title: const Text('My Courses')),
      body: RefreshIndicator(
        color: AppTheme.brand,
        onRefresh: () => context.read<SyllabusProvider>().load(),
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            const Text(
              'Select a year to browse subjects',
              style: TextStyle(fontSize: 13, color: AppTheme.textMuted),
            ),
            const SizedBox(height: 20),
            if (syllabus.error != null)
              ErrorView(
                  message: syllabus.error!,
                  onRetry: () => context.read<SyllabusProvider>().load()),
            _ClassCard(
              classLevel:  '+1',
              fullName:    'Class XI — Higher Secondary First Year',
              color:       AppTheme.plus1,
              bg:          AppTheme.plus1Bg,
              subjectCount: syllabus.plus1Count,
              loading:     !syllabus.loaded,
            ),
            const SizedBox(height: 14),
            _ClassCard(
              classLevel:  '+2',
              fullName:    'Class XII — Higher Secondary Second Year',
              color:       AppTheme.plus2,
              bg:          AppTheme.plus2Bg,
              subjectCount: syllabus.plus2Count,
              loading:     !syllabus.loaded,
            ),
          ],
        ),
      ),
    );
  }
}

class _ClassCard extends StatefulWidget {
  final String classLevel;
  final String fullName;
  final Color  color;
  final Color  bg;
  final int    subjectCount;
  final bool   loading;

  const _ClassCard({
    required this.classLevel,
    required this.fullName,
    required this.color,
    required this.bg,
    required this.subjectCount,
    required this.loading,
  });

  @override
  State<_ClassCard> createState() => _ClassCardState();
}

class _ClassCardState extends State<_ClassCard> {
  bool _pressed = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown:  (_) => setState(() => _pressed = true),
      onTapUp:    (_) { setState(() => _pressed = false); context.push('/courses/${widget.classLevel}'); },
      onTapCancel: () => setState(() => _pressed = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 100),
        transform: Matrix4.translationValues(0, _pressed ? 1 : 0, 0),
        padding: const EdgeInsets.fromLTRB(18, 18, 18, 18),
        decoration: BoxDecoration(
          color:        Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: _pressed
                ? widget.color
                : widget.color.withAlpha(60),
          ),
          boxShadow: [
            BoxShadow(
              color: _pressed
                  ? widget.color.withAlpha(40)
                  : widget.color.withAlpha(15),
              blurRadius: _pressed ? 16 : 6,
              offset: const Offset(0, 3),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              width: 58, height: 58,
              decoration: BoxDecoration(
                color:        widget.bg,
                borderRadius: BorderRadius.circular(14),
              ),
              child: Center(
                child: Text(
                  widget.classLevel,
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w800,
                    color: widget.color,
                  ),
                ),
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    widget.fullName,
                    style: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w700,
                      color: AppTheme.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 4),
                  widget.loading
                      ? const _LoadingPill()
                      : Text(
                          '${widget.subjectCount} subject${widget.subjectCount != 1 ? 's' : ''}',
                          style: TextStyle(
                            fontSize: 12,
                            color: widget.color.withAlpha(180),
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                ],
              ),
            ),
            Icon(Icons.chevron_right, color: widget.color, size: 22),
          ],
        ),
      ),
    );
  }
}

class _LoadingPill extends StatelessWidget {
  const _LoadingPill();

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 12, width: 80,
      decoration: BoxDecoration(
        color:        AppTheme.border,
        borderRadius: BorderRadius.circular(6),
      ),
    );
  }
}
