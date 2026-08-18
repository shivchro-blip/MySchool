import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../config/syllabus_config.dart';
import '../config/theme.dart';
import '../models/syllabus_model.dart';
import '../widgets/final_exam_prep_entry_card.dart';

class ChapterListScreen extends StatefulWidget {
  final String classLevel;
  final String subjectSlug;
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
  List<Chapter> _chapters = [];
  List<UnitConfig>? _units;
  List<MathsChapter>? _mathsChapters;
  List<FlatChapter>? _flatChapters;
  Map<String, Chapter> _bySlug = {};

  @override
  void initState() {
    super.initState();
    _loadFromStaticSyllabus();
  }

  @override
  void didUpdateWidget(covariant ChapterListScreen oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.classLevel != widget.classLevel ||
        oldWidget.subjectSlug != widget.subjectSlug) {
      _loadFromStaticSyllabus();
    }
  }

  void _loadFromStaticSyllabus() {
    final mathsChapters =
        SyllabusConfig.getMathsChapters(widget.classLevel, widget.subjectSlug);
    final units =
        SyllabusConfig.getUnits(widget.classLevel, widget.subjectSlug);
    final flatChapters =
        SyllabusConfig.getFlatChapters(widget.classLevel, widget.subjectSlug);
    final chapters =
        units == null ? const <Chapter>[] : _chaptersFromUnits(units);

    setState(() {
      _mathsChapters = mathsChapters;
      _units = units;
      _flatChapters = flatChapters;
      _chapters = chapters;
      _bySlug = {for (final chapter in chapters) chapter.slug: chapter};
    });

    assert(() {
      debugPrint(
        'Subject detail loaded from static SYLLABUS: '
        'class=${widget.classLevel}, subject=${widget.subjectSlug}, '
        'units=${units?.length ?? 0}, lessons=${chapters.length}, '
        'mathsChapters=${mathsChapters?.length ?? 0}, '
        'flatChapters=${flatChapters?.length ?? 0}',
      );
      return true;
    }());
  }

  List<Chapter> _chaptersFromUnits(List<UnitConfig> units) {
    final chapters = <Chapter>[];
    for (final unit in units) {
      for (var index = 0; index < unit.lessons.length; index++) {
        chapters.add(_syntheticChapter(unit.id, index, unit.lessons[index]));
      }
    }
    return chapters;
  }

  Chapter _syntheticChapter(int unitId, int lessonIndex, UnitLesson lesson) {
    return Chapter(
      id: 'local/${widget.classLevel}/${widget.subjectSlug}/${lesson.slug}',
      slug: lesson.slug,
      subjectId: '${widget.classLevel}/${widget.subjectSlug}',
      number: ((unitId - 1) * 3) + lessonIndex + 1,
      title: lesson.title,
      contentType: lesson.contentType,
      isActive: true,
    );
  }

  String get _subjectName =>
      widget.subject?.name ?? _titleCase(widget.subjectSlug);

  Color get _color => AppTheme.subjectColor(_subjectName);

  String _titleCase(String value) {
    if (value.isEmpty) return value;
    return value[0].toUpperCase() + value.substring(1);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(_subjectName)),
      body: RefreshIndicator(
        color: _color,
        onRefresh: () async => _loadFromStaticSyllabus(),
        child: _mathsChapters != null
            ? _buildMathsList()
            : _units != null
                ? _buildUnitList()
                : _flatChapters != null
                    ? _buildFlatChapterList()
                    : _buildEmptyStaticList(),
      ),
    );
  }

  Widget _buildUnitList() {
    final units = _units!;
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
      children: [
        if (_isEnglishFinalExamSubject) ...[
          FinalExamPrepEntryCard(
            classLevel: widget.classLevel,
            subjectSlug: widget.subjectSlug,
          ),
          const SizedBox(height: 16),
        ],
        Text(
          '${units.length} Units - ${_chapters.length} Lessons',
          style: TextStyle(fontSize: 12, color: AppTheme.textMutedOf(context)),
        ),
        const SizedBox(height: 12),
        for (var index = 0; index < units.length; index++)
          Padding(
            padding: const EdgeInsets.only(bottom: 10),
            child: _UnitCard(
              unit: units[index],
              bySlug: _bySlug,
              classLevel: widget.classLevel,
              subjectSlug: widget.subjectSlug,
              initiallyOpen: index == 0,
            ),
          ),
      ],
    );
  }

  bool get _isEnglishFinalExamSubject =>
      widget.subjectSlug == 'english' &&
      (widget.classLevel == '+1' || widget.classLevel == '+2');

  Widget _buildEmptyStaticList() {
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
      children: [
        Container(
          padding: const EdgeInsets.all(18),
          decoration: BoxDecoration(
            color: AppTheme.cardOf(context),
            borderRadius: BorderRadius.circular(AppTheme.radiusCard),
            border: Border.all(color: AppTheme.borderOf(context)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                _subjectName,
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w700,
                  color: AppTheme.textOf(context),
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'No static lessons are configured for this subject yet.',
                style: TextStyle(
                  fontSize: 13,
                  color: AppTheme.text2Of(context),
                  height: 1.4,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildMathsList() {
    final mathsChapters = _mathsChapters!;
    final vol1 = mathsChapters.where((chapter) => chapter.volume == 1).toList();
    final vol2 = mathsChapters.where((chapter) => chapter.volume == 2).toList();

    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
      children: [
        _SectionHeader(label: 'Volume I', color: _color),
        const SizedBox(height: 8),
        for (final chapter in vol1)
          Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: _MathsChapterTile(chapter: chapter, accentColor: _color),
          ),
        const SizedBox(height: 16),
        _SectionHeader(label: 'Volume II', color: _color),
        const SizedBox(height: 8),
        for (final chapter in vol2)
          Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: _MathsChapterTile(chapter: chapter, accentColor: _color),
          ),
      ],
    );
  }

  Widget _buildFlatChapterList() {
    final chapters = _flatChapters!;
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
      children: [
        Text(
          '${chapters.length} Chapters',
          style: TextStyle(fontSize: 12, color: AppTheme.textMutedOf(context)),
        ),
        const SizedBox(height: 12),
        for (final chapter in chapters)
          Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: _FlatChapterTile(
              chapter: chapter,
              accentColor: _color,
              classLevel: widget.classLevel,
              subjectSlug: widget.subjectSlug,
            ),
          ),
      ],
    );
  }
}

class _UnitCard extends StatefulWidget {
  final UnitConfig unit;
  final Map<String, Chapter> bySlug;
  final String classLevel;
  final String subjectSlug;
  final bool initiallyOpen;

  const _UnitCard({
    required this.unit,
    required this.bySlug,
    required this.classLevel,
    required this.subjectSlug,
    required this.initiallyOpen,
  });

  @override
  State<_UnitCard> createState() => _UnitCardState();
}

class _UnitCardState extends State<_UnitCard> {
  late bool _open;

  @override
  void initState() {
    super.initState();
    _open = widget.initiallyOpen;
  }

  @override
  void didUpdateWidget(covariant _UnitCard oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.unit.id != widget.unit.id) {
      _open = widget.initiallyOpen;
    }
  }

  @override
  Widget build(BuildContext context) {
    final unit = widget.unit;

    return Container(
      decoration: BoxDecoration(
        color: AppTheme.cardOf(context),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: unit.color.withAlpha(60)),
        boxShadow: [
          BoxShadow(
            color: unit.color.withAlpha(18),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        children: [
          InkWell(
            borderRadius: BorderRadius.vertical(
              top: const Radius.circular(14),
              bottom: Radius.circular(_open ? 0 : 14),
            ),
            onTap: () => setState(() => _open = !_open),
            child: Padding(
              padding: const EdgeInsets.all(14),
              child: Row(
                children: [
                  Container(
                    width: 44,
                    height: 44,
                    decoration: BoxDecoration(
                      color: unit.light,
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
                          style: TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w700,
                            color: AppTheme.textOf(context),
                          ),
                        ),
                        const SizedBox(height: 4),
                        Wrap(
                          spacing: 6,
                          runSpacing: 4,
                          children: [
                            for (final lesson in unit.lessons)
                              _TypePill(
                                label: _typeLabel(lesson.contentType),
                                color: unit.color,
                              ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 8),
                  Icon(
                    _open ? Icons.keyboard_arrow_up : Icons.keyboard_arrow_down,
                    color: unit.color,
                    size: 22,
                  ),
                ],
              ),
            ),
          ),
          if (_open) ...[
            Divider(height: 1, color: unit.color.withAlpha(40)),
            for (var index = 0; index < unit.lessons.length; index++)
              _LessonRow(
                config: unit.lessons[index],
                chapter: widget.bySlug[unit.lessons[index].slug] ??
                    _syntheticChapter(unit.id, index, unit.lessons[index]),
                unitColor: unit.color,
                unitLight: unit.light,
                classLevel: widget.classLevel,
                subjectSlug: widget.subjectSlug,
              ),
          ],
        ],
      ),
    );
  }

  Chapter _syntheticChapter(int unitId, int lessonIndex, UnitLesson lesson) {
    return Chapter(
      id: 'local/${widget.classLevel}/${widget.subjectSlug}/${lesson.slug}',
      slug: lesson.slug,
      subjectId: '${widget.classLevel}/${widget.subjectSlug}',
      number: ((unitId - 1) * 3) + lessonIndex + 1,
      title: lesson.title,
      contentType: lesson.contentType,
      isActive: true,
    );
  }

  String _typeLabel(String contentType) => switch (contentType) {
        'prose' => 'Prose',
        'poem' => 'Poetry',
        'supplementary' => 'Supp.',
        'grammar' => 'Grammar',
        _ => contentType,
      };
}

class _TypePill extends StatelessWidget {
  final String label;
  final Color color;

  const _TypePill({required this.label, required this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 2),
      decoration: BoxDecoration(
        color: color.withAlpha(22),
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

class _LessonRow extends StatelessWidget {
  final UnitLesson config;
  final Chapter chapter;
  final Color unitColor;
  final Color unitLight;
  final String classLevel;
  final String subjectSlug;

  const _LessonRow({
    required this.config,
    required this.chapter,
    required this.unitColor,
    required this.unitLight,
    required this.classLevel,
    required this.subjectSlug,
  });

  IconData get _typeIcon => switch (config.contentType) {
        'prose' => Icons.menu_book_outlined,
        'poem' => Icons.music_note_outlined,
        'supplementary' => Icons.description_outlined,
        _ => Icons.article_outlined,
      };

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      decoration: BoxDecoration(
        border: Border(bottom: BorderSide(color: unitColor.withAlpha(25))),
      ),
      child: Row(
        children: [
          Container(
            width: 32,
            height: 32,
            decoration: BoxDecoration(
              color: unitLight,
              borderRadius: BorderRadius.circular(9),
            ),
            child: Icon(_typeIcon, color: unitColor, size: 18),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  config.title,
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.textOf(context),
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  'Chapter ${chapter.number} - ${chapter.typeLabel}',
                  style: TextStyle(
                    fontSize: 11,
                    color: AppTheme.textMutedOf(context),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          _ActionButton(
            label: 'Learn',
            color: unitColor,
            onTap: () => context.push(
              '/rich-learn/$classLevel/$subjectSlug/${chapter.slug}',
              extra: {'chapter': chapter, 'tab': null},
            ),
          ),
          const SizedBox(width: 6),
          _ActionButton(
            label: 'Practice',
            color: unitColor,
            outline: true,
            onTap: () => context.push(
              '/practice/$classLevel/$subjectSlug/${chapter.slug}',
            ),
          ),
        ],
      ),
    );
  }
}

class _ActionButton extends StatelessWidget {
  final String label;
  final Color color;
  final bool outline;
  final VoidCallback onTap;

  const _ActionButton({
    required this.label,
    required this.color,
    required this.onTap,
    this.outline = false,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: BorderRadius.circular(8),
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
        decoration: BoxDecoration(
          color: outline ? Colors.transparent : color,
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: color),
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

class _SectionHeader extends StatelessWidget {
  final String label;
  final Color color;

  const _SectionHeader({required this.label, required this.color});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          width: 3,
          height: 16,
          decoration: BoxDecoration(
            color: color,
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

class _MathsChapterTile extends StatelessWidget {
  final MathsChapter chapter;
  final Color accentColor;

  const _MathsChapterTile({required this.chapter, required this.accentColor});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: AppTheme.cardOf(context),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppTheme.borderOf(context)),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
        child: Row(
          children: [
            Container(
              width: 38,
              height: 38,
              decoration: BoxDecoration(
                color: accentColor.withAlpha(22),
                borderRadius: BorderRadius.circular(9),
              ),
              child: Center(
                child: Text(
                  '${chapter.number}',
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w700,
                    color: accentColor,
                  ),
                ),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                chapter.title,
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.textOf(context),
                ),
              ),
            ),
            const SizedBox(width: 8),
            const _DisabledActionButton(label: 'Learn'),
            const SizedBox(width: 6),
            const _DisabledActionButton(label: 'Practice', outline: true),
          ],
        ),
      ),
    );
  }
}

class _FlatChapterTile extends StatelessWidget {
  final FlatChapter chapter;
  final Color accentColor;
  final String classLevel;
  final String subjectSlug;

  const _FlatChapterTile({
    required this.chapter,
    required this.accentColor,
    required this.classLevel,
    required this.subjectSlug,
  });

  Chapter get _asChapter => Chapter(
        id: 'local/$classLevel/$subjectSlug/${chapter.slug}',
        slug: chapter.slug,
        subjectId: '$classLevel/$subjectSlug',
        number: chapter.number,
        title: chapter.title,
        contentType: 'lesson',
        isActive: true,
      );

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: AppTheme.cardOf(context),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppTheme.borderOf(context)),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
        child: Row(
          children: [
            Container(
              width: 38,
              height: 38,
              decoration: BoxDecoration(
                color: accentColor.withAlpha(22),
                borderRadius: BorderRadius.circular(9),
              ),
              child: Center(
                child: Text(
                  '${chapter.number}',
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w700,
                    color: accentColor,
                  ),
                ),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                chapter.title,
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.textOf(context),
                ),
              ),
            ),
            const SizedBox(width: 8),
            _ActionButton(
              label: 'Learn',
              color: accentColor,
              onTap: () => context.push(
                '/sectioned-learn/$classLevel/$subjectSlug/${chapter.slug}',
                extra: {'chapter': _asChapter, 'section': null},
              ),
            ),
            const SizedBox(width: 6),
            _ActionButton(
              label: 'Practice',
              color: accentColor,
              outline: true,
              onTap: () => context.push(
                '/practice/$classLevel/$subjectSlug/${chapter.slug}',
                extra: _asChapter,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _DisabledActionButton extends StatelessWidget {
  final String label;
  final bool outline;

  const _DisabledActionButton({required this.label, this.outline = false});

  @override
  Widget build(BuildContext context) {
    final muted = AppTheme.textMutedOf(context);
    return InkWell(
      borderRadius: BorderRadius.circular(8),
      onTap: () => ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Coming soon'),
          duration: Duration(seconds: 2),
        ),
      ),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
        decoration: BoxDecoration(
          color: outline ? Colors.transparent : muted.withAlpha(30),
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: muted.withAlpha(80)),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 11,
            fontWeight: FontWeight.w600,
            color: muted,
          ),
        ),
      ),
    );
  }
}
