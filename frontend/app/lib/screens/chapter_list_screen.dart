import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../config/theme.dart';
import '../models/syllabus_model.dart';
import '../services/syllabus_service.dart';
import '../widgets/error_view.dart';

class ChapterListScreen extends StatefulWidget {
  final String  classLevel;
  final String  subjectSlug;
  final Subject? subject; // passed via GoRouter extra

  const ChapterListScreen({
    super.key,
    required this.classLevel,
    required this.subjectSlug,
    this.subject,
  });

  @override
  State<ChapterListScreen> createState() => _ChapterListScreenState();
}

class _ChapterListScreenState extends State<ChapterListScreen> {
  final _svc = SyllabusService();

  Map<String, List<Chapter>> _groups  = {};
  bool   _loading = true;
  String _error   = '';

  static const _typeOrder = ['Prose', 'Poetry', 'Supplementary', 'Grammar', 'Vocabulary'];

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() { _loading = true; _error = ''; });
    try {
      final chapters = await _svc.getChapters(widget.subjectSlug);
      setState(() {
        _groups  = _svc.groupByType(chapters);
        _loading = false;
      });
    } catch (e) {
      setState(() { _error = e.toString(); _loading = false; });
    }
  }

  String get _subjectName =>
      widget.subject?.name ?? widget.subjectSlug;

  Color get _color => AppTheme.subjectColor(_subjectName);

  List<MapEntry<String, List<Chapter>>> get _orderedGroups {
    final entries = _groups.entries.toList();
    entries.sort((a, b) {
      final ai = _typeOrder.indexOf(a.key);
      final bi = _typeOrder.indexOf(b.key);
      return (ai == -1 ? 99 : ai).compareTo(bi == -1 ? 99 : bi);
    });
    return entries;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.surface,
      appBar: AppBar(title: Text(_subjectName)),
      body: RefreshIndicator(
        color: _color,
        onRefresh: _load,
        child: _loading
            ? const Center(child: CircularProgressIndicator())
            : _error.isNotEmpty
                ? ListView(
                    padding: const EdgeInsets.all(16),
                    children: [ErrorView(message: _error, onRetry: _load)],
                  )
                : ListView(
                    padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
                    children: [
                      for (final entry in _orderedGroups) ...[
                        _SectionHeader(label: entry.key, color: _color),
                        const SizedBox(height: 8),
                        ...entry.value.map((ch) => Padding(
                          padding: const EdgeInsets.only(bottom: 8),
                          child: _ChapterTile(
                            chapter:    ch,
                            classLevel: widget.classLevel,
                            subjectSlug: widget.subjectSlug,
                            accentColor: _color,
                          ),
                        )),
                        const SizedBox(height: 16),
                      ],
                    ],
                  ),
      ),
    );
  }
}

class _SectionHeader extends StatelessWidget {
  final String label;
  final Color  color;
  const _SectionHeader({required this.label, required this.color});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          width: 3, height: 16,
          decoration: BoxDecoration(
            color:        color,
            borderRadius: BorderRadius.circular(2),
          ),
        ),
        const SizedBox(width: 8),
        Text(
          label.toUpperCase(),
          style: TextStyle(
            fontSize: 11,
            fontWeight: FontWeight.w700,
            color: color,
            letterSpacing: 1.2,
          ),
        ),
      ],
    );
  }
}

class _ChapterTile extends StatelessWidget {
  final Chapter chapter;
  final String  classLevel;
  final String  subjectSlug;
  final Color   accentColor;

  const _ChapterTile({
    required this.chapter,
    required this.classLevel,
    required this.subjectSlug,
    required this.accentColor,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color:        Colors.white,
        borderRadius: BorderRadius.circular(12),
        border:       Border.all(color: AppTheme.border),
      ),
      child: InkWell(
        borderRadius: BorderRadius.circular(12),
        onTap: () => context.push(
          '/courses/$classLevel/$subjectSlug/${chapter.slug}',
          extra: chapter,
        ),
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Row(
            children: [
              Container(
                width: 38, height: 38,
                decoration: BoxDecoration(
                  color:        accentColor.withAlpha(22),
                  borderRadius: BorderRadius.circular(9),
                ),
                child: Center(
                  child: Text(chapter.typeIcon, style: const TextStyle(fontSize: 17)),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      chapter.title,
                      style: const TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                        color: AppTheme.textPrimary,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      'Chapter ${chapter.number} · ${chapter.typeLabel}',
                      style: const TextStyle(
                        fontSize: 12,
                        color: AppTheme.textMuted,
                      ),
                    ),
                  ],
                ),
              ),
              Icon(Icons.chevron_right,
                  color: AppTheme.textMuted, size: 18),
            ],
          ),
        ),
      ),
    );
  }
}
