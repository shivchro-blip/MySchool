import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../config/syllabus_config.dart';
import '../config/theme.dart';
import '../models/syllabus_model.dart';
import '../providers/syllabus_provider.dart';
import '../providers/user_provider.dart';
import '../widgets/error_view.dart';

class SubjectListScreen extends StatefulWidget {
  final String classLevel;
  const SubjectListScreen({super.key, required this.classLevel});

  @override
  State<SubjectListScreen> createState() => _SubjectListScreenState();
}

class _SubjectListScreenState extends State<SubjectListScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<UserProvider>().loadIfNeeded();
      context.read<SyllabusProvider>().loadIfNeeded();
    });
  }

  String get _title => SyllabusConfig.courseShortTitle(widget.classLevel);

  // Returns true when the subject's slug or name exactly matches an allowed
  // entry. Handles 'maths' ↔ 'mathematics' equivalence gracefully.
  // Exact matching only — substring matching previously let 'computer-science'
  // leak into a 'science'-only filter, since 'computer-science'.contains('science').
  bool _isAllowed(Subject subject, List<String> allowed) {
    if (allowed.isEmpty) return true;
    final slug = subject.slug.toLowerCase();
    final name = subject.name.toLowerCase();
    for (final a in allowed) {
      final al = a.toLowerCase();
      if (slug == al) return true;
      final norm = al == 'maths' ? 'mathematics' : al;
      if (name == norm) return true;
    }
    return false;
  }

  @override
  Widget build(BuildContext context) {
    final syllabus = context.watch<SyllabusProvider>();
    final user = context.watch<UserProvider>();
    final allowedClass = user.allowedClass;
    final allowedSubjects = user.allowedSubjects;

    final classBlocked = user.loaded &&
        allowedClass != null &&
        allowedClass != widget.classLevel;
    final allSubjects = syllabus.byClass(widget.classLevel);
    final subjects = classBlocked
        ? const <Subject>[]
        : allowedSubjects.isEmpty
            ? allSubjects
            : allSubjects.where((s) => _isAllowed(s, allowedSubjects)).toList();

    return Scaffold(
      appBar: AppBar(title: Text(_title)),
      body: classBlocked
          ? Center(
              child: Padding(
                padding: const EdgeInsets.all(32),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(
                      Icons.lock_outline_rounded,
                      size: 40,
                      color: AppTheme.textMutedOf(context),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'This course is not enabled for your account.',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.w600,
                        color: AppTheme.textOf(context),
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Your account is set up for ${allowedClass == '+1' ? 'Class 11' : 'Class 12'}.',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 13,
                        color: AppTheme.text2Of(context),
                      ),
                    ),
                    const SizedBox(height: 24),
                    TextButton(
                      onPressed: () => context.go('/courses'),
                      child: const Text('Go to my courses'),
                    ),
                  ],
                ),
              ),
            )
          : RefreshIndicator(
              color: AppTheme.brand,
              onRefresh: () => context.read<SyllabusProvider>().load(),
              child: ListView(
                padding: const EdgeInsets.all(16),
                children: [
                  if (syllabus.error != null)
                    ErrorView(
                      message: syllabus.error!,
                      onRetry: () => context.read<SyllabusProvider>().load(),
                    ),
                  // Profile load failures were previously swallowed, leaving an
                  // unexplained blank/unfiltered list. Surface them.
                  if (user.error != null)
                    Padding(
                      padding: const EdgeInsets.only(bottom: 16),
                      child: ErrorView(
                        message: user.error!,
                        retryLabel: user.sessionInvalidated
                            ? 'Log in again'
                            : 'Try again',
                        onRetry: user.sessionInvalidated
                            ? () => context.go('/login')
                            : () => context.read<UserProvider>().load(),
                      ),
                    ),
                  if (!syllabus.loaded)
                    const Center(
                      child: Padding(
                        padding: EdgeInsets.all(32),
                        child: CircularProgressIndicator(),
                      ),
                    ),
                  if (syllabus.loaded && subjects.isEmpty)
                    Center(
                      child: Padding(
                        padding: const EdgeInsets.all(32),
                        child: Text(
                          'No subjects found for this class.',
                          style:
                              TextStyle(color: AppTheme.textMutedOf(context)),
                        ),
                      ),
                    ),
                  ...subjects.map(
                    (s) => Padding(
                      padding: const EdgeInsets.only(bottom: 12),
                      child: _SubjectCard(
                        subject: s,
                        classLevel: widget.classLevel,
                      ),
                    ),
                  ),
                ],
              ),
            ),
    );
  }
}

class _SubjectCard extends StatefulWidget {
  final Subject subject;
  final String classLevel;
  const _SubjectCard({required this.subject, required this.classLevel});

  @override
  State<_SubjectCard> createState() => _SubjectCardState();
}

class _SubjectCardState extends State<_SubjectCard> {
  bool _hovered = false;

  Color get _color => AppTheme.subjectColor(widget.subject.name);
  Color get _bg => AppTheme.subjectBg(widget.subject.name);
  IconData get _icon => _iconFor(widget.subject.name);

  static IconData _iconFor(String name) {
    final n = name.toLowerCase();
    if (n.contains('english')) {
      return Icons.menu_book_outlined;
    }
    if (n.contains('math')) {
      return Icons.calculate_outlined;
    }
    if (n.contains('computer application')) {
      return Icons.desktop_windows_outlined;
    }
    if (n.contains('computer science')) {
      return Icons.code_rounded;
    }
    if (n.contains('science')) {
      return Icons.science_outlined;
    }
    return Icons.book_outlined;
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => context.push(
        '/courses/${widget.classLevel}/${widget.subject.slug}',
        extra: widget.subject,
      ),
      child: MouseRegion(
        onEnter: (_) => setState(() => _hovered = true),
        onExit: (_) => setState(() => _hovered = false),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 120),
          transform: Matrix4.translationValues(0, _hovered ? -2 : 0, 0),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: _hovered
                ? _color.withAlpha(22)
                : AppTheme.isDark(context)
                    ? AppTheme.cardOf(context)
                    : _bg.withAlpha(120),
            borderRadius: BorderRadius.circular(14),
            border: Border.all(
              color: _hovered ? _color.withAlpha(100) : _color.withAlpha(50),
              width: 1.5,
            ),
            boxShadow: _hovered
                ? [
                    BoxShadow(
                      color: _color.withAlpha(35),
                      blurRadius: 14,
                      offset: const Offset(0, 4),
                    )
                  ]
                : [
                    const BoxShadow(
                      color: Color(0x0A000000),
                      blurRadius: 3,
                      offset: Offset(0, 1),
                    )
                  ],
          ),
          child: Row(
            children: [
              Container(
                width: 42,
                height: 42,
                decoration: BoxDecoration(
                  color: _bg,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Icon(_icon, color: _color, size: 22),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      widget.subject.name,
                      style: TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.w700,
                        color: _color.withAlpha(220),
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      widget.subject.classLevel == '+1' ? 'Class 11' : 'Class 12',
                      style: TextStyle(
                        fontSize: 12,
                        color: _color.withAlpha(160),
                      ),
                    ),
                  ],
                ),
              ),
              Icon(
                Icons.chevron_right,
                color: _color.withAlpha(_hovered ? 255 : 180),
                size: 20,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
