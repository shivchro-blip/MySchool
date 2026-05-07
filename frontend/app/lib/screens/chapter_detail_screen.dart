import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../config/theme.dart';
import '../models/syllabus_model.dart';
import '../services/chapter_content_service.dart';

class ChapterDetailScreen extends StatefulWidget {
  final String   classLevel;
  final String   subjectSlug;
  final String   chapterSlug;
  final Chapter? chapter;

  const ChapterDetailScreen({
    super.key,
    required this.classLevel,
    required this.subjectSlug,
    required this.chapterSlug,
    this.chapter,
  });

  @override
  State<ChapterDetailScreen> createState() => _ChapterDetailScreenState();
}

class _ChapterDetailScreenState extends State<ChapterDetailScreen> {
  bool _hasContent = false;
  bool _checked    = false;

  @override
  void initState() {
    super.initState();
    _checkContent();
  }

  Future<void> _checkContent() async {
    final c = await ChapterContentService().loadContent(widget.classLevel, widget.subjectSlug, widget.chapterSlug);
    if (!mounted) {
      return;
    }
    setState(() {
      _hasContent = c != null;
      _checked = true;
    });
  }

  void _goRich(String tabId) => context.push(
    '/rich-learn/${widget.classLevel}/${widget.subjectSlug}/${widget.chapterSlug}',
    extra: {'chapter': widget.chapter, 'tab': tabId},
  );

  void _goLearn() => context.push(
    '/rich-learn/${widget.classLevel}/${widget.subjectSlug}/${widget.chapterSlug}',
    extra: {'chapter': widget.chapter, 'tab': null},
  );

  @override
  Widget build(BuildContext context) {
    final ch    = widget.chapter;
    final title = ch?.title ?? widget.chapterSlug;

    return Scaffold(
      backgroundColor: AppTheme.surface,
      appBar: AppBar(title: Text(title, overflow: TextOverflow.ellipsis)),
      body: !_checked
          ? const Center(child: CircularProgressIndicator())
          : ListView(
              padding: const EdgeInsets.all(16),
              children: [
                // Chapter info card
                _ChapterInfoCard(chapter: ch, slug: widget.chapterSlug),
                const SizedBox(height: 20),

                const Text('Choose a section to begin',
                    style: TextStyle(
                      fontSize: 12, fontWeight: FontWeight.w600,
                      color: AppTheme.textMuted, letterSpacing: 0.3,
                    )),
                const SizedBox(height: 12),

                if (_hasContent) ...[
                  // 6-card grid matching web
                  _SixCardGrid(
                    onAboutAuthor:   () => _goRich('author'),
                    onText:          () => _goRich('intro'),
                    onGlossary:      () => _goRich('glossary'),
                    onComprehension: () => _goRich('meaning'),
                    onPractice:      () => context.push('/practice/${widget.classLevel}/${widget.subjectSlug}/${widget.chapterSlug}'),
                    onAskAI:         () => _goRich('askai'),
                  ),
                ] else ...[
                  // Fallback for chapters without static content
                  _ActionCard(
                    icon:    Icons.auto_stories_outlined,
                    color:   AppTheme.brand,
                    emoji:   '📖',
                    title:   'Learn',
                    subtitle: 'AI explanation, key points, and exam tips',
                    onTap:   _goLearn,
                  ),
                  const SizedBox(height: 12),
                  _ActionCard(
                    icon:    Icons.edit_note,
                    color:   AppTheme.maths,
                    emoji:   '🔥',
                    title:   'Practice',
                    subtitle: 'Answer questions and get AI evaluation',
                    onTap:   () => context.push('/practice/${widget.classLevel}/${widget.subjectSlug}/${widget.chapterSlug}'),
                  ),
                  const SizedBox(height: 12),
                  _ActionCard(
                    icon:    Icons.quiz_outlined,
                    color:   AppTheme.warning,
                    emoji:   '🎯',
                    title:   'Exam Practice',
                    subtitle: 'MCQ + written questions, exam-style',
                    onTap:   () => context.push(
                      '/exam/${widget.classLevel}/${widget.subjectSlug}/${widget.chapterSlug}',
                      extra: widget.chapter,
                    ),
                  ),
                ],
              ],
            ),
    );
  }
}

// ── Chapter info card ────────────────────────────────────────────────────────

class _ChapterInfoCard extends StatelessWidget {
  final Chapter? chapter;
  final String   slug;
  const _ChapterInfoCard({required this.chapter, required this.slug});

  @override
  Widget build(BuildContext context) {
    final ch = chapter;
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color:        Colors.white,
        borderRadius: BorderRadius.circular(16),
        border:       Border.all(color: AppTheme.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (ch?.number != null)
            Container(
              margin: const EdgeInsets.only(bottom: 8),
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: AppTheme.brand.withAlpha(18),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(ch!.typeIcon, style: const TextStyle(fontSize: 13)),
                  const SizedBox(width: 5),
                  Text(
                    ch.typeLabel,
                    style: const TextStyle(
                      fontSize: 11, fontWeight: FontWeight.w700,
                      color: AppTheme.brand,
                    ),
                  ),
                ],
              ),
            ),
          Text(
            ch?.title ?? slug,
            style: const TextStyle(
              fontSize: 20, fontWeight: FontWeight.w800,
              color: AppTheme.textPrimary,
            ),
          ),
        ],
      ),
    );
  }
}

// ── 6-card grid ───────────────────────────────────────────────────────────────

class _SixCardGrid extends StatelessWidget {
  final VoidCallback onAboutAuthor;
  final VoidCallback onText;
  final VoidCallback onGlossary;
  final VoidCallback onComprehension;
  final VoidCallback onPractice;
  final VoidCallback onAskAI;

  const _SixCardGrid({
    required this.onAboutAuthor,
    required this.onText,
    required this.onGlossary,
    required this.onComprehension,
    required this.onPractice,
    required this.onAskAI,
  });

  @override
  Widget build(BuildContext context) {
    final cards = [
      _CardData(
        emoji:   '👤',
        title:   'About Author',
        sub:     'Learn about the writer',
        color:   const Color(0xFF5C6BC0),
        onTap:   onAboutAuthor,
      ),
      _CardData(
        emoji:   '📄',
        title:   'Text',
        sub:     'Read the full lesson',
        color:   AppTheme.brand,
        onTap:   onText,
      ),
      _CardData(
        emoji:   '🔤',
        title:   'Glossary',
        sub:     'Key words and meanings',
        color:   const Color(0xFF0ea5e9),
        onTap:   onGlossary,
      ),
      _CardData(
        emoji:   '📋',
        title:   'Comprehension',
        sub:     'Check your understanding',
        color:   const Color(0xFF059669),
        onTap:   onComprehension,
      ),
      _CardData(
        emoji:   '🔥',
        title:   'Practice',
        sub:     'Answer exam questions',
        color:   AppTheme.warning,
        onTap:   onPractice,
      ),
      _CardData(
        emoji:   '🤖',
        title:   'Ask AI',
        sub:     'Get instant explanations',
        color:   const Color(0xFF7c3aed),
        onTap:   onAskAI,
      ),
    ];

    return GridView.count(
      crossAxisCount:     2,
      shrinkWrap:         true,
      physics:            const NeverScrollableScrollPhysics(),
      crossAxisSpacing:   12,
      mainAxisSpacing:    12,
      childAspectRatio:   1.35,
      children: cards.map((c) => _SectionCard(data: c)).toList(),
    );
  }
}

class _CardData {
  final String       emoji;
  final String       title;
  final String       sub;
  final Color        color;
  final VoidCallback onTap;
  const _CardData({
    required this.emoji, required this.title,
    required this.sub,   required this.color,
    required this.onTap,
  });
}

class _SectionCard extends StatefulWidget {
  final _CardData data;
  const _SectionCard({required this.data});

  @override
  State<_SectionCard> createState() => _SectionCardState();
}

class _SectionCardState extends State<_SectionCard> {
  bool _pressed = false;

  @override
  Widget build(BuildContext context) {
    final d = widget.data;
    return GestureDetector(
      onTapDown:   (_) => setState(() => _pressed = true),
      onTapUp:     (_) { setState(() => _pressed = false); d.onTap(); },
      onTapCancel: () => setState(() => _pressed = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 100),
        transform: Matrix4.translationValues(0, _pressed ? 1.5 : 0, 0),
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color:        Colors.white,
          borderRadius: BorderRadius.circular(14),
          border:       Border.all(
            color: _pressed
                ? d.color.withAlpha(100)
                : d.color.withAlpha(40),
            width: 1.5,
          ),
          boxShadow: [
            BoxShadow(
              color:     d.color.withAlpha(_pressed ? 35 : 12),
              blurRadius: _pressed ? 10 : 4,
              offset:    const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: 40, height: 40,
              decoration: BoxDecoration(
                color:        d.color.withAlpha(22),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Center(
                child: Text(d.emoji, style: const TextStyle(fontSize: 20)),
              ),
            ),
            const Spacer(),
            Text(
              d.title,
              style: TextStyle(
                fontSize:   13,
                fontWeight: FontWeight.w700,
                color:      d.color.withAlpha(230),
              ),
            ),
            const SizedBox(height: 2),
            Text(
              d.sub,
              style: const TextStyle(fontSize: 10, color: AppTheme.textMuted),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
          ],
        ),
      ),
    );
  }
}

// ── Fallback action card ────────────────────────────────────────────────────

class _ActionCard extends StatefulWidget {
  final IconData     icon;
  final Color        color;
  final String       emoji;
  final String       title;
  final String       subtitle;
  final VoidCallback onTap;

  const _ActionCard({
    required this.icon,    required this.color,
    required this.emoji,   required this.title,
    required this.subtitle, required this.onTap,
  });

  @override
  State<_ActionCard> createState() => _ActionCardState();
}

class _ActionCardState extends State<_ActionCard> {
  bool _pressed = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown:   (_) => setState(() => _pressed = true),
      onTapUp:     (_) { setState(() => _pressed = false); widget.onTap(); },
      onTapCancel: () => setState(() => _pressed = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 100),
        transform: Matrix4.translationValues(0, _pressed ? 1 : 0, 0),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(
            color: _pressed
                ? widget.color.withAlpha(120)
                : widget.color.withAlpha(50),
            width: 1.5,
          ),
          boxShadow: [
            BoxShadow(
              color:     widget.color.withAlpha(_pressed ? 40 : 15),
              blurRadius: _pressed ? 12 : 4,
              offset:    const Offset(0, 2),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              width: 46, height: 46,
              decoration: BoxDecoration(
                color:        widget.color.withAlpha(22),
                borderRadius: BorderRadius.circular(11),
              ),
              child: Center(
                child: Text(widget.emoji, style: const TextStyle(fontSize: 22)),
              ),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(widget.title,
                      style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700,
                          color: widget.color.withAlpha(230))),
                  const SizedBox(height: 2),
                  Text(widget.subtitle,
                      style: const TextStyle(fontSize: 12, color: AppTheme.textMuted)),
                ],
              ),
            ),
            Icon(Icons.arrow_forward_ios,
                color: widget.color.withAlpha(160), size: 16),
          ],
        ),
      ),
    );
  }
}
