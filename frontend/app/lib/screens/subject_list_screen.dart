import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../config/theme.dart';
import '../models/syllabus_model.dart';
import '../providers/syllabus_provider.dart';
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
      context.read<SyllabusProvider>().loadIfNeeded();
    });
  }

  String get _title => widget.classLevel == '+1'
      ? '+1 Courses'
      : '+2 Courses';

  @override
  Widget build(BuildContext context) {
    final syllabus  = context.watch<SyllabusProvider>();
    final subjects  = syllabus.byClass(widget.classLevel);

    return Scaffold(
      backgroundColor: AppTheme.surface,
      appBar: AppBar(title: Text(_title)),
      body: RefreshIndicator(
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
            if (!syllabus.loaded)
              const Center(
                child: Padding(
                  padding: EdgeInsets.all(32),
                  child: CircularProgressIndicator(),
                ),
              ),
            if (syllabus.loaded && subjects.isEmpty)
              const Center(
                child: Padding(
                  padding: EdgeInsets.all(32),
                  child: Text(
                    'No subjects found for this class.',
                    style: TextStyle(color: AppTheme.textMuted),
                  ),
                ),
              ),
            ...subjects.map((s) => Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: _SubjectCard(
                subject: s,
                classLevel: widget.classLevel,
              ),
            )),
          ],
        ),
      ),
    );
  }
}

class _SubjectCard extends StatefulWidget {
  final Subject subject;
  final String  classLevel;
  const _SubjectCard({required this.subject, required this.classLevel});

  @override
  State<_SubjectCard> createState() => _SubjectCardState();
}

class _SubjectCardState extends State<_SubjectCard> {
  bool _hovered = false;

  Color get _color  => AppTheme.subjectColor(widget.subject.name);
  Color get _bg     => AppTheme.subjectBg(widget.subject.name);
  IconData get _icon => _iconFor(widget.subject.name);

  static IconData _iconFor(String name) {
    final n = name.toLowerCase();
    if (n.contains('english'))  return Icons.menu_book_outlined;
    if (n.contains('math'))     return Icons.calculate_outlined;
    if (n.contains('science'))  return Icons.science_outlined;
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
        onExit:  (_) => setState(() => _hovered = false),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 120),
          transform: Matrix4.translationValues(0, _hovered ? -2 : 0, 0),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: _hovered
                ? _color.withAlpha(22)
                : _bg.withAlpha(120),
            borderRadius: BorderRadius.circular(14),
            border: Border.all(
              color: _hovered
                  ? _color.withAlpha(100)
                  : _color.withAlpha(50),
              width: 1.5,
            ),
            boxShadow: _hovered
                ? [BoxShadow(
                    color: _color.withAlpha(35),
                    blurRadius: 14,
                    offset: const Offset(0, 4),
                  )]
                : [const BoxShadow(
                    color: Color(0x0A000000),
                    blurRadius: 3,
                    offset: Offset(0, 1),
                  )],
          ),
          child: Row(
            children: [
              Container(
                width: 42, height: 42,
                decoration: BoxDecoration(
                  color:        _bg,
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
                      widget.subject.classLevel,
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
