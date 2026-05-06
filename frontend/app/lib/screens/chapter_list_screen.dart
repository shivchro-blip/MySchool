import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../config/theme.dart';
import '../config/syllabus_config.dart';
import '../models/syllabus_model.dart';
import '../services/syllabus_service.dart';
import '../widgets/error_view.dart';

class ChapterListScreen extends StatefulWidget {
  final String   classLevel;
  final String   subjectSlug;
  final Subject? subject;

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

  List<Chapter>              _chapters  = [];
  Map<String, List<Chapter>> _groups    = {};
  List<UnitConfig>?          _units;
  Map<String, Chapter>       _bySlug    = {};
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
      final units    = SyllabusConfig.getUnits(widget.classLevel, widget.subjectSlug);
      setState(() {
        _chapters = chapters;
        _units    = units;
        _bySlug   = { for (final c in chapters) c.slug: c };
        _groups   = _svc.groupByType(chapters);
        _loading  = false;
      });
    } catch (e) {
      setState(() { _error = e.toString(); _loading = false; });
    }
  }

  String get _subjectName => widget.subject?.name ?? widget.subjectSlug;
  Color  get _color       => AppTheme.subjectColor(_subjectName);

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
                : _units != null
                    ? _buildUnitList()
                    : _buildCategoryList(),
      ),
    );
  }

  // ── Unit accordion layout (e.g. +1 English) ──────────────────────────────

  Widget _buildUnitList() {
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
      children: [
        Text(
          '${_units!.length} Units · ${_chapters.length} Lessons',
          style: const TextStyle(fontSize: 12, color: AppTheme.textMuted),
        ),
        const SizedBox(height: 12),
        ..._units!.map((unit) => Padding(
          padding: const EdgeInsets.only(bottom: 10),
          child: _UnitCard(
            unit:       unit,
            bySlug:     _bySlug,
            classLevel: widget.classLevel,
            subjectSlug: widget.subjectSlug,
          ),
        )),
      ],
    );
  }

  // ── Category flat list layout (maths, science, +2 english…) ─────────────

  Widget _buildCategoryList() {
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
      children: [
        for (final entry in _orderedGroups) ...[
          _SectionHeader(label: entry.key, color: _color),
          const SizedBox(height: 8),
          ...entry.value.map((ch) => Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: _ChapterTile(
              chapter:     ch,
              classLevel:  widget.classLevel,
              subjectSlug: widget.subjectSlug,
              accentColor: _color,
            ),
          )),
          const SizedBox(height: 16),
        ],
      ],
    );
  }
}

// ── Unit accordion card ───────────────────────────────────────────────────

class _UnitCard extends StatefulWidget {
  final UnitConfig         unit;
  final Map<String, Chapter> bySlug;
  final String             classLevel;
  final String             subjectSlug;

  const _UnitCard({
    required this.unit,
    required this.bySlug,
    required this.classLevel,
    required this.subjectSlug,
  });

  @override
  State<_UnitCard> createState() => _UnitCardState();
}

class _UnitCardState extends State<_UnitCard> {
  bool _open = false;

  @override
  Widget build(BuildContext context) {
    final unit    = widget.unit;
    final lessons = unit.lessons
        .map((l) => (config: l, chapter: widget.bySlug[l.slug]))
        .toList();
    final loaded  = lessons.where((l) => l.chapter != null).length;

    return Container(
      decoration: BoxDecoration(
        color:        Colors.white,
        borderRadius: BorderRadius.circular(14),
        border:       Border.all(color: unit.color.withAlpha(60)),
        boxShadow: [
          BoxShadow(
            color:     unit.color.withAlpha(18),
            blurRadius: 8,
            offset:    const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        children: [
          // ── Header ────────────────────────────────────────────────
          InkWell(
            borderRadius: BorderRadius.vertical(
              top:    const Radius.circular(14),
              bottom: Radius.circular(_open ? 0 : 14),
            ),
            onTap: () => setState(() => _open = !_open),
            child: Padding(
              padding: const EdgeInsets.all(14),
              child: Row(
                children: [
                  Container(
                    width: 44, height: 44,
                    decoration: BoxDecoration(
                      color:        unit.light,
                      borderRadius: BorderRadius.circular(11),
                    ),
                    child: Center(
                      child: Text(
                        '${unit.id}',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.w800,
                          color: unit.color,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          unit.title,
                          style: const TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w700,
                            color: AppTheme.textPrimary,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Wrap(
                          spacing: 6,
                          children: unit.lessons.map((l) => _TypePill(
                            label: _typeLabel(l.contentType),
                            color: unit.color,
                          )).toList(),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 8),
                  if (loaded < unit.lessons.length)
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 2),
                      decoration: BoxDecoration(
                        color:        AppTheme.surface,
                        borderRadius: BorderRadius.circular(10),
                        border:       Border.all(color: AppTheme.border),
                      ),
                      child: Text(
                        '$loaded/${unit.lessons.length}',
                        style: const TextStyle(fontSize: 10, color: AppTheme.textMuted),
                      ),
                    ),
                  const SizedBox(width: 6),
                  Icon(
                    _open ? Icons.keyboard_arrow_up : Icons.keyboard_arrow_down,
                    color: unit.color,
                    size: 22,
                  ),
                ],
              ),
            ),
          ),

          // ── Expanded lessons ──────────────────────────────────────
          if (_open) ...[
            Divider(height: 1, color: unit.color.withAlpha(40)),
            ...lessons.map((l) => _LessonRow(
              config:      l.config,
              chapter:     l.chapter,
              unitColor:   unit.color,
              unitLight:   unit.light,
              classLevel:  widget.classLevel,
              subjectSlug: widget.subjectSlug,
            )),
          ],
        ],
      ),
    );
  }

  String _typeLabel(String ct) => switch (ct) {
    'prose'         => 'Prose',
    'poem'          => 'Poetry',
    'supplementary' => 'Supp.',
    'grammar'       => 'Grammar',
    _               => ct,
  };
}

// ── Type pill badge ───────────────────────────────────────────────────────

class _TypePill extends StatelessWidget {
  final String label;
  final Color  color;
  const _TypePill({required this.label, required this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 2),
      decoration: BoxDecoration(
        color:        color.withAlpha(22),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Text(
        label,
        style: TextStyle(
          fontSize: 10,
          fontWeight: FontWeight.w600,
          color: color,
        ),
      ),
    );
  }
}

// ── Lesson row inside open unit ───────────────────────────────────────────

class _LessonRow extends StatelessWidget {
  final UnitLesson config;
  final Chapter?   chapter;
  final Color      unitColor;
  final Color      unitLight;
  final String     classLevel;
  final String     subjectSlug;

  const _LessonRow({
    required this.config,
    required this.chapter,
    required this.unitColor,
    required this.unitLight,
    required this.classLevel,
    required this.subjectSlug,
  });

  String get _typeIcon => switch (config.contentType) {
    'prose'         => '📖',
    'poem'          => '🎵',
    'supplementary' => '📝',
    _               => '📄',
  };

  @override
  Widget build(BuildContext context) {
    final ch = chapter;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      decoration: BoxDecoration(
        border: Border(bottom: BorderSide(color: unitColor.withAlpha(25))),
      ),
      child: Row(
        children: [
          Text(_typeIcon, style: const TextStyle(fontSize: 18)),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  config.title,
                  style: const TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.textPrimary,
                  ),
                ),
                if (ch != null)
                  Text(
                    'Chapter ${ch.number} · ${ch.typeLabel}',
                    style: const TextStyle(fontSize: 11, color: AppTheme.textMuted),
                  ),
              ],
            ),
          ),
          if (ch != null) ...[
            const SizedBox(width: 8),
            _ActionButton(
              label: 'Learn',
              color: unitColor,
              onTap: () => context.push(
                '/rich-learn/$classLevel/$subjectSlug/${ch.slug}',
                extra: {'chapter': ch, 'tab': null},
              ),
            ),
            const SizedBox(width: 6),
            _ActionButton(
              label: 'Practice',
              color: unitColor,
              outline: true,
              onTap: () => context.push('/practice/$classLevel/$subjectSlug/${ch.slug}'),
            ),
          ] else
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
              decoration: BoxDecoration(
                color:        AppTheme.surface,
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Text(
                'Coming soon',
                style: TextStyle(fontSize: 10, color: AppTheme.textMuted),
              ),
            ),
        ],
      ),
    );
  }
}

// ── Small action button ───────────────────────────────────────────────────

class _ActionButton extends StatelessWidget {
  final String   label;
  final Color    color;
  final bool     outline;
  final VoidCallback onTap;

  const _ActionButton({
    required this.label,
    required this.color,
    required this.onTap,
    this.outline = false,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
        decoration: BoxDecoration(
          color:        outline ? Colors.transparent : color,
          borderRadius: BorderRadius.circular(8),
          border:       Border.all(color: color),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 11,
            fontWeight: FontWeight.w600,
            color: outline ? color : Colors.white,
          ),
        ),
      ),
    );
  }
}

// ── Category section header ───────────────────────────────────────────────

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

// ── Category chapter tile ─────────────────────────────────────────────────

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
          '/rich-learn/$classLevel/$subjectSlug/${chapter.slug}',
          extra: {'chapter': chapter, 'tab': null},
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
                      style: const TextStyle(fontSize: 12, color: AppTheme.textMuted),
                    ),
                  ],
                ),
              ),
              Icon(Icons.chevron_right, color: AppTheme.textMuted, size: 18),
            ],
          ),
        ),
      ),
    );
  }
}
