import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:go_router/go_router.dart';
import '../config/theme.dart';
import '../models/syllabus_model.dart';
import '../models/sectioned_chapter_content.dart';
import '../services/chapter_content_service.dart';

class SectionedLearnScreen extends StatefulWidget {
  final String   classLevel;
  final String   subjectSlug;
  final String   chapterSlug;
  final Chapter? chapter;
  final String?  initialSectionId;

  const SectionedLearnScreen({
    super.key,
    required this.classLevel,
    required this.subjectSlug,
    required this.chapterSlug,
    this.chapter,
    this.initialSectionId,
  });

  @override
  State<SectionedLearnScreen> createState() => _SectionedLearnScreenState();
}

class _SectionedLearnScreenState extends State<SectionedLearnScreen> {
  SectionedChapterContent? _content;
  bool    _loading = true;
  String? _activeSectionId;

  @override
  void initState() {
    super.initState();
    _loadContent();
  }

  Future<void> _loadContent() async {
    final c = await ChapterContentService()
        .loadSectionedContent(widget.classLevel, widget.subjectSlug, widget.chapterSlug);
    if (!mounted) return;
    setState(() {
      _content = c;
      _loading = false;
      _activeSectionId = widget.initialSectionId;
    });
  }

  void _selectSection(String id) => setState(() => _activeSectionId = id);
  void _clearSection() => setState(() => _activeSectionId = null);

  @override
  Widget build(BuildContext context) {
    final title = widget.chapter?.title ?? 'Learn';
    return Scaffold(
      appBar: AppBar(
        title: Text(title, overflow: TextOverflow.ellipsis),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            if (_activeSectionId != null && widget.initialSectionId == null) {
              _clearSection();
            } else if (context.canPop()) {
              context.pop();
            } else {
              context.go('/dashboard');
            }
          },
        ),
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _content == null
              ? _buildNoContent()
              : _buildContent(_content!),
    );
  }

  Widget _buildNoContent() => Center(
    child: Padding(
      padding: const EdgeInsets.all(32),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.menu_book_outlined, size: 40, color: AppTheme.textMutedOf(context)),
          const SizedBox(height: 16),
          Text(
            'No content available yet for this chapter.',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 14, color: AppTheme.text2Of(context)),
          ),
        ],
      ),
    ),
  );

  Widget _buildContent(SectionedChapterContent content) {
    final activeId = _activeSectionId;
    final active = activeId != null ? content.sectionById(activeId) : null;
    return Column(
      children: [
        _ChapterHeader(content: content),
        const Divider(height: 1),
        Expanded(
          child: active != null
              ? _SectionView(
                  section: active,
                  accentColor: AppTheme.subjectColor(content.subject),
                  onSelectSection: _selectSection,
                  onPractice: () => context.push(
                    '/practice/${widget.classLevel}/${widget.subjectSlug}/${widget.chapterSlug}',
                    extra: widget.chapter,
                  ),
                )
              : _SectionPicker(
                  sections: content.sections,
                  accentColor: AppTheme.subjectColor(content.subject),
                  onSelectSection: _selectSection,
                ),
        ),
      ],
    );
  }
}

class _ChapterHeader extends StatelessWidget {
  final SectionedChapterContent content;
  const _ChapterHeader({required this.content});

  @override
  Widget build(BuildContext context) => Container(
    color: AppTheme.cardOf(context),
    padding: const EdgeInsets.fromLTRB(16, 14, 16, 14),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '${content.classLabel} · ${content.curriculum}',
          style: TextStyle(
            fontSize: 11, fontWeight: FontWeight.w600,
            color: AppTheme.subjectColor(content.subject), letterSpacing: 0.3,
          ),
        ),
        const SizedBox(height: 4),
        Text(content.title, style: AppTheme.pageTitleStyle(context)),
      ],
    ),
  );
}

class _SectionPicker extends StatelessWidget {
  final List<ContentSection> sections;
  final Color accentColor;
  final void Function(String) onSelectSection;

  const _SectionPicker({
    required this.sections,
    required this.accentColor,
    required this.onSelectSection,
  });

  @override
  Widget build(BuildContext context) => ListView.builder(
    padding: const EdgeInsets.fromLTRB(16, 16, 16, 40),
    itemCount: sections.length,
    itemBuilder: (_, i) {
      final section = sections[i];
      return Padding(
        padding: const EdgeInsets.only(bottom: 10),
        child: InkWell(
          borderRadius: BorderRadius.circular(12),
          onTap: () => onSelectSection(section.id),
          child: Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: AppTheme.cardOf(context),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppTheme.borderOf(context)),
            ),
            child: Row(
              children: [
                Container(
                  width: 32, height: 32,
                  decoration: BoxDecoration(
                    color: accentColor.withAlpha(22),
                    borderRadius: BorderRadius.circular(9),
                  ),
                  child: Center(
                    child: Text(
                      '${i + 1}',
                      style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: accentColor),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    section.title,
                    style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: AppTheme.textOf(context)),
                  ),
                ),
                Icon(Icons.arrow_forward_ios, size: 14, color: AppTheme.textMutedOf(context)),
              ],
            ),
          ),
        ),
      );
    },
  );
}

class _SectionView extends StatelessWidget {
  final ContentSection section;
  final Color accentColor;
  final void Function(String) onSelectSection;
  final VoidCallback onPractice;

  const _SectionView({
    required this.section,
    required this.accentColor,
    required this.onSelectSection,
    required this.onPractice,
  });

  @override
  Widget build(BuildContext context) => ListView(
    padding: const EdgeInsets.fromLTRB(16, 16, 16, 40),
    children: [
      Text(
        section.title,
        style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: AppTheme.textOf(context)),
      ),
      const SizedBox(height: 4),
      Container(
        width: 32, height: 2.5,
        decoration: BoxDecoration(color: accentColor, borderRadius: BorderRadius.circular(2)),
      ),
      const SizedBox(height: 16),
      MarkdownBody(
        data: section.content,
        styleSheet: MarkdownStyleSheet.fromTheme(Theme.of(context)).copyWith(
          p: TextStyle(fontSize: 15, height: 1.6, color: AppTheme.text2Of(context)),
          strong: TextStyle(fontWeight: FontWeight.w700, color: AppTheme.textOf(context)),
        ),
      ),
      const SizedBox(height: 24),
      _NavRow(nav: section.nav, accentColor: accentColor, onSelectSection: onSelectSection, onPractice: onPractice),
    ],
  );
}

class _NavRow extends StatelessWidget {
  final SectionNav? nav;
  final Color accentColor;
  final void Function(String) onSelectSection;
  final VoidCallback onPractice;

  const _NavRow({
    required this.nav,
    required this.accentColor,
    required this.onSelectSection,
    required this.onPractice,
  });

  @override
  Widget build(BuildContext context) {
    final n = nav;
    if (n == null) return const SizedBox.shrink();
    return Wrap(
      spacing: 8, runSpacing: 8,
      children: [
        if (n.back != null)
          OutlinedButton(
            onPressed: () => onSelectSection(n.back!),
            style: OutlinedButton.styleFrom(
              minimumSize: const Size(0, 38),
              padding: const EdgeInsets.symmetric(horizontal: 16),
              side: BorderSide(color: AppTheme.borderOf(context)),
            ),
            child: Text('← Back', style: TextStyle(color: AppTheme.text2Of(context))),
          ),
        if (n.practice)
          ElevatedButton(
            onPressed: onPractice,
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.brand,
              foregroundColor: Colors.white,
              overlayColor: AppTheme.brandDark,
              minimumSize: const Size(0, 38),
              padding: const EdgeInsets.symmetric(horizontal: 16),
              elevation: 0,
            ),
            child: const Text('🔥 Practice', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
          ),
        if (n.next != null)
          ElevatedButton(
            onPressed: () => onSelectSection(n.next!),
            style: ElevatedButton.styleFrom(
              backgroundColor: accentColor,
              minimumSize: const Size(0, 38),
              padding: const EdgeInsets.symmetric(horizontal: 16),
            ),
            child: Text(
              n.nextLabel ?? 'Next →',
              style: const TextStyle(color: Colors.white, fontSize: 13),
            ),
          ),
      ],
    );
  }
}
