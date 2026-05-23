import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../config/theme.dart';
import '../theme/typography.dart';
import '../models/syllabus_model.dart';
import '../models/chapter_content_model.dart';
import '../models/learning_model.dart';
import '../services/chapter_content_service.dart';
import '../services/learning_service.dart';
import '../widgets/error_view.dart';
import '../widgets/info_card.dart';

class RichLearnScreen extends StatefulWidget {
  final String   classLevel;
  final String   subjectSlug;
  final String   chapterSlug;
  final Chapter? chapter;
  final String?  initialTabId;

  const RichLearnScreen({
    super.key,
    required this.classLevel,
    required this.subjectSlug,
    required this.chapterSlug,
    this.chapter,
    this.initialTabId,
  });

  @override
  State<RichLearnScreen> createState() => _RichLearnScreenState();
}

class _RichLearnScreenState extends State<RichLearnScreen> {
  ChapterContent? _content;
  bool            _loading = true;
  String?         _activeTabId;
  final _tabScrollCtrl = ScrollController();

  @override
  void initState() {
    super.initState();
    _loadContent();
  }

  @override
  void dispose() {
    _tabScrollCtrl.dispose();
    super.dispose();
  }

  Future<void> _loadContent() async {
    final c = await ChapterContentService().loadContent(widget.classLevel, widget.subjectSlug, widget.chapterSlug);
    if (!mounted) {
      return;
    }
    setState(() {
      _content = c;
      _loading = false;
      if (c != null) {
        final allTabs = _computeAllTabs(c);
        final tabs = allTabs.where((t) => !(t.hidden ?? false)).toList();
        final desired = widget.initialTabId;
        if (desired != null && allTabs.any((t) => t.id == desired)) {
          _activeTabId = desired;
        } else {
          _activeTabId = tabs.isNotEmpty ? tabs.first.id : null;
        }
      }
    });
  }

  List<ContentTab> _computeAllTabs(ChapterContent c) {
    final result = List<ContentTab>.from(c.tabs);

    if (!result.any((t) => t.type == 'practice')) {
      result.add(const ContentTab(
        id: 'practice', label: 'Practice', type: 'practice', blocks: [],
      ));
    }
    if (!result.any((t) => t.type == 'attempt-history')) {
      final practiceIdx = result.indexWhere((t) => t.type == 'practice');
      result.insert(practiceIdx + 1, const ContentTab(
        id: 'attempt-history', label: '🕐 Attempt History',
        type: 'attempt-history', blocks: [],
      ));
    }
    if (!result.any((t) => t.type == 'askai')) {
      result.add(const ContentTab(
        id: 'askai', label: '🤖 Ask AI', type: 'askai', blocks: [],
      ));
    }
    return result;
  }

  void _switchTab(String id) {
    setState(() => _activeTabId = id);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_tabScrollCtrl.hasClients) {
        // try to scroll active tab into view — best-effort
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final title = widget.chapter?.title ?? 'Learn';
    return Scaffold(
      appBar: AppBar(
        title: Text(title, overflow: TextOverflow.ellipsis),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            if (context.canPop()) {
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

  // No static content — show inline Ask AI + quick links
  Widget _buildNoContent() {
    final ch = widget.chapter;
    return Column(
      children: [
        // Mini header
        Container(
          color:   AppTheme.cardOf(context),
          padding: const EdgeInsets.fromLTRB(16, 14, 16, 14),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                ch?.title ?? widget.chapterSlug,
                style: const TextStyle(
                  fontSize: 20, fontWeight: FontWeight.w800,
                ),
              ),
              if (ch != null) ...[
                const SizedBox(height: 4),
                Text(ch.typeLabel,
                    style: TextStyle(
                      fontSize: 12, color: AppTheme.brandOf(context),
                      fontWeight: FontWeight.w600,
                    )),
              ],
            ],
          ),
        ),
        const Divider(height: 1),

        // Quick links
        Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            children: [
              _QuickLink(
                emoji: '🔥', title: 'Practice',
                sub: 'Answer exam questions and get AI evaluation',
                color: AppTheme.maths,
                onTap: () => context.push('/practice/${widget.classLevel}/${widget.subjectSlug}/${widget.chapterSlug}'),
              ),
              const SizedBox(height: 10),
              _QuickLink(
                emoji: '🎯', title: 'Exam Practice',
                sub: 'MCQ + written questions, exam-style',
                color: AppTheme.warning,
                onTap: () => context.push(
                  '/exam/${widget.classLevel}/${widget.subjectSlug}/${widget.chapterSlug}',
                  extra: widget.chapter,
                ),
              ),
              const SizedBox(height: 20),
              Row(children: [
                const Expanded(child: Divider()),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 12),
                  child: Text('or ask AI',
                      style: TextStyle(fontSize: 12,
                          color: AppTheme.textMutedOf(context))),
                ),
                const Expanded(child: Divider()),
              ]),
              const SizedBox(height: 12),
            ],
          ),
        ),

        // Embedded Ask AI
        Expanded(
          child: _AskAITab(
            chapterSlug: widget.chapterSlug,
            chapter:     widget.chapter,
          ),
        ),
      ],
    );
  }

  static const _actionTypes = {'practice', 'attempt-history', 'askai'};

  Widget _buildContent(ChapterContent content) {
    final allTabs     = _computeAllTabs(content);
    final visibleTabs = allTabs.where((t) => !(t.hidden ?? false)).toList();
    final contentTabs = visibleTabs.where((t) => !_actionTypes.contains(t.type)).toList();
    final actionTabs  = visibleTabs.where((t) =>  _actionTypes.contains(t.type)).toList();
    final activeTab   = allTabs.firstWhere(
      (t) => t.id == _activeTabId,
      orElse: () => visibleTabs.isNotEmpty ? visibleTabs.first : allTabs.first,
    );

    return Column(
      children: [
        // Chapter header card
        _ChapterHeader(content: content),

        // Three-zone progress-aware sub-nav
        _ThreeZoneNav(
          tabs:      contentTabs,
          activeTab: activeTab,
          onSelect:  _switchTab,
          onShowContents: () => showModalBottomSheet(
            context: context,
            shape: const RoundedRectangleBorder(
              borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
            ),
            builder: (_) => _ContentsSheet(
              tabs:      contentTabs,
              activeTab: activeTab,
              onSelect:  (id) { Navigator.pop(context); _switchTab(id); },
            ),
          ),
        ),

        // Action tab row (fixed — always visible: Practice, Attempt History, Ask AI)
        if (actionTabs.isNotEmpty)
          Container(
            color: AppTheme.cardOf(context),
            padding: const EdgeInsets.fromLTRB(12, 0, 12, 8),
            child: Row(
              children: [
                for (int i = 0; i < actionTabs.length; i++) ...[
                  if (i > 0) const SizedBox(width: 8),
                  Expanded(child: _ActionTabPill(
                    tab:      actionTabs[i],
                    isActive: actionTabs[i].id == activeTab.id,
                    onTap:    () => _switchTab(actionTabs[i].id),
                  )),
                ],
              ],
            ),
          ),

        const Divider(height: 1),

        // Tab content
        Expanded(
          child: activeTab.type == 'practice'
              ? _buildPracticeTab()
              : activeTab.type == 'attempt-history'
                  ? _AttemptHistoryTab(classLevel: widget.classLevel, subjectSlug: widget.subjectSlug, chapterSlug: widget.chapterSlug)
                  : activeTab.type == 'askai'
                      ? _AskAITab(
                          chapterSlug: widget.chapterSlug,
                          chapter:     widget.chapter,
                        )
                      : _buildBlocksTab(activeTab),
        ),
      ],
    );
  }

  Widget _buildPracticeTab() => Center(
    child: Padding(
      padding: const EdgeInsets.all(32),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Text('🔥', style: TextStyle(fontSize: 48)),
          const SizedBox(height: 12),
          const Text('Practice',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
          const SizedBox(height: 8),
          Text('Test your understanding with exam-style questions',
              style: TextStyle(fontSize: 13,
                  color: AppTheme.textMutedOf(context)),
              textAlign: TextAlign.center),
          const SizedBox(height: 24),
          ElevatedButton(
            onPressed: () => context.push('/practice/${widget.classLevel}/${widget.subjectSlug}/${widget.chapterSlug}'),
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.brandOf(context),
              foregroundColor: Colors.white,
              overlayColor:    AppTheme.brandOf(context),
              elevation:       0,
            ),
            child: const Text('🔥 Practice',
                style: TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
          ),
        ],
      ),
    ),
  );

  Widget _buildBlocksTab(ContentTab tab) => Center(
    child: ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 680),
      child: ListView.builder(
        padding: const EdgeInsets.fromLTRB(16, 16, 16, 40),
        itemCount: tab.blocks.length,
        itemBuilder: (_, i) => _BlockWidget(
          block:      tab.blocks[i],
          accentColor: AppTheme.brandOf(context),
          onSwitchTab: _switchTab,
          chapterSlug: widget.chapterSlug,
        ),
      ),
    ),
  );
}

// ── Chapter header ─────────────────────────────────────────────────────────

class _ChapterHeader extends StatelessWidget {
  final ChapterContent content;
  const _ChapterHeader({required this.content});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: AppTheme.cardOf(context),
      padding: const EdgeInsets.fromLTRB(16, 14, 16, 14),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (content.eyebrow.isNotEmpty)
            Text(
              content.eyebrow,
              style: TextStyle(
                fontSize: 11, fontWeight: FontWeight.w600,
                color: AppTheme.brandOf(context), letterSpacing: 0.3,
              ),
            ),
          const SizedBox(height: 4),
          Text(
            content.title,
            style: AppTheme.pageTitleStyle(context),
          ),
          if (content.author.isNotEmpty) ...[
            const SizedBox(height: 2),
            Text(
              content.author,
              style: TextStyle(
                fontSize: 14, fontWeight: FontWeight.w600,
                color: AppTheme.brandOf(context),
              ),
            ),
          ],
          if (content.pills.isNotEmpty) ...[
            const SizedBox(height: 8),
            Wrap(
              spacing: 6, runSpacing: 4,
              children: content.pills.map((p) => _Pill(label: p)).toList(),
            ),
          ],
        ],
      ),
    );
  }
}

class _Pill extends StatelessWidget {
  final String label;
  const _Pill({required this.label});

  @override
  Widget build(BuildContext context) {
    final dark  = AppTheme.isDark(context);
    final bg    = dark ? AppTheme.borderOf(context) : const Color(0xFFEAE5D8);
    final fg    = dark ? AppTheme.text2Of(context)  : const Color(0xFF5A5244);
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 3),
      decoration: BoxDecoration(
        color:        bg,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        label,
        style: TextStyle(
          fontSize: 11, fontWeight: FontWeight.w500, color: fg,
        ),
      ),
    );
  }
}

// ── Action tab pill (Practice / Attempt History / Ask AI fixed row) ──────────

class _ActionTabPill extends StatelessWidget {
  final ContentTab tab;
  final bool       isActive;
  final VoidCallback onTap;
  const _ActionTabPill({required this.tab, required this.isActive, required this.onTap});

  @override
  Widget build(BuildContext context) {
    final activeBg = AppTheme.brandOf(context);
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 120),
        padding: const EdgeInsets.symmetric(vertical: 7),
        decoration: BoxDecoration(
          color: isActive ? activeBg : AppTheme.cardOf(context),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: isActive ? activeBg : AppTheme.borderOf(context),
            width: 1.5,
          ),
        ),
        child: Center(
          child: Text(
            tab.label,
            style: TextStyle(
              fontSize:   12,
              fontWeight: isActive ? FontWeight.w600 : FontWeight.w500,
              color: isActive ? Colors.white : AppTheme.text2Of(context),
            ),
            overflow: TextOverflow.ellipsis,
          ),
        ),
      ),
    );
  }
}

// ── Block renderer ──────────────────────────────────────────────────────────

class _BlockWidget extends StatelessWidget {
  final ContentBlock block;
  final Color        accentColor;
  final void Function(String tabId) onSwitchTab;
  final String       chapterSlug;

  const _BlockWidget({
    required this.block,
    required this.accentColor,
    required this.onSwitchTab,
    required this.chapterSlug,
  });

  @override
  Widget build(BuildContext context) => switch (block) {
    TeacherVoiceBlock(:final html)               => _TeacherVoice(html: html),
    SectionHeadBlock(:final text)                => _SectionHead(text: text, accent: accentColor),
    ThinkBoxBlock(:final label, :final text)     => _ThinkBox(label: label, text: text, accent: accentColor),
    QuoteBlock(:final quote, :final context)     => _Quote(quote: quote, context: context, accent: accentColor),
    AuthorStatBlock(:final label, :final value)  => _AuthorStat(label: label, value: value),
    DeviceBlock(:final kind, :final line, :final exp) =>
        _Device(kind: kind, line: line, exp: exp, accent: accentColor),
    GlossRowBlock(:final word, :final def, :final eg) =>
        _GlossRow(word: word, def: def, eg: eg, accent: accentColor),
    NavBlock()                                   => _NavButtons(
        nav:         block as NavBlock,
        accent:      accentColor,
        onSwitchTab: onSwitchTab,
        chapterSlug: chapterSlug,
        context:     context,
      ),
    UnknownBlock()                               => const SizedBox.shrink(),
  };
}

// ── Block implementations ───────────────────────────────────────────────────

class _TeacherVoice extends StatelessWidget {
  final String html;
  const _TeacherVoice({required this.html});

  @override
  Widget build(BuildContext context) {
    final baseColor   = AppTheme.textPrimaryOf(context);
    final strongColor = AppTheme.textOf(context);
    final paragraphs  = _extractParagraphs(html, baseColor, strongColor, context);
    return Padding(
      padding: const EdgeInsets.only(bottom: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: paragraphs.map((spans) => Padding(
          padding: const EdgeInsets.only(bottom: 20),
          child: RichText(
            text: TextSpan(children: spans),
          ),
        )).toList(),
      ),
    );
  }

  static List<List<InlineSpan>> _extractParagraphs(
      String html, Color baseColor, Color strongColor, BuildContext ctx) {
    final cleaned  = html.trim();
    final pPattern = RegExp(r'<p[^>]*>([\s\S]*?)<\/p>', multiLine: true);
    final matches  = pPattern.allMatches(cleaned);

    if (matches.isEmpty) {
      return [_parseInline(cleaned, baseColor, strongColor, ctx)];
    }
    return matches
        .map((m) => _parseInline(m.group(1) ?? '', baseColor, strongColor, ctx))
        .toList();
  }

  static List<InlineSpan> _parseInline(
      String html, Color baseColor, Color strongColor, BuildContext ctx) {
    final spans      = <InlineSpan>[];
    final tagPattern = RegExp(
      r'<strong>([\s\S]*?)<\/strong>|<span[^>]*rich-highlight[^>]*>([\s\S]*?)<\/span>|([^<]+)',
    );
    final base = AppTypography.body.copyWith(color: baseColor);
    for (final m in tagPattern.allMatches(html)) {
      if (m.group(1) != null) {
        spans.add(TextSpan(
          text:  _decode(m.group(1)!),
          style: base.copyWith(fontWeight: FontWeight.w700, color: strongColor),
        ));
      } else if (m.group(2) != null) {
        spans.add(TextSpan(
          text:  _decode(m.group(2)!),
          style: base.copyWith(color: AppTheme.brandOf(ctx)),
        ));
      } else if (m.group(3) != null) {
        spans.add(TextSpan(text: _decode(m.group(3)!), style: base));
      }
    }
    return spans.isEmpty ? [TextSpan(text: html, style: base)] : spans;
  }

  static String _decode(String s) => s
      .replaceAll('&amp;',  '&')
      .replaceAll('&lt;',   '<')
      .replaceAll('&gt;',   '>')
      .replaceAll('&quot;', '"')
      .replaceAll('&#39;',  "'");
}

class _SectionHead extends StatelessWidget {
  final String text;
  final Color  accent;
  const _SectionHead({required this.text, required this.accent});

  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.fromLTRB(0, 48, 0, 12),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          text,
          style: AppTypography.headingLg.copyWith(color: AppTheme.textPrimaryOf(context)),
        ),
        const SizedBox(height: 5),
        Container(
          width: 32, height: 2.5,
          decoration: BoxDecoration(
            color:        accent,
            borderRadius: BorderRadius.circular(2),
          ),
        ),
      ],
    ),
  );
}

class _ThinkBox extends StatelessWidget {
  final String label;
  final String text;
  final Color  accent;
  const _ThinkBox({required this.label, required this.text, required this.accent});

  @override
  Widget build(BuildContext context) => Container(
    margin: const EdgeInsets.only(bottom: 16),
    padding: const EdgeInsets.fromLTRB(16, 14, 16, 14),
    decoration: BoxDecoration(
      color:        accent.withAlpha(18),
      borderRadius: const BorderRadius.only(
        topRight: Radius.circular(12), bottomRight: Radius.circular(12),
      ),
      border: Border(left: BorderSide(color: accent, width: 3)),
    ),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label.toUpperCase(),
          style: TextStyle(
            fontSize: 10, fontWeight: FontWeight.w800,
            color: accent, letterSpacing: 0.8,
          ),
        ),
        const SizedBox(height: 6),
        Text(
          text,
          style: TextStyle(
            fontSize: 13, height: 1.8,
            color: AppTheme.text2Of(context),
          ),
        ),
      ],
    ),
  );
}

class _Quote extends StatelessWidget {
  final String quote;
  final String context;
  final Color  accent;
  const _Quote({required this.quote, required this.context, required this.accent});

  @override
  Widget build(BuildContext ctx) => Container(
    margin: const EdgeInsets.only(bottom: 16),
    padding: const EdgeInsets.all(16),
    decoration: BoxDecoration(
      color:        AppTheme.cardOf(ctx),
      borderRadius: BorderRadius.circular(14),
      border:       Border.all(color: AppTheme.borderOf(ctx)),
    ),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          padding: const EdgeInsets.only(left: 12),
          decoration: BoxDecoration(
            border: Border(left: BorderSide(color: accent, width: 2.5)),
          ),
          child: Text(
            quote,
            style: const TextStyle(
              fontSize: 14, fontStyle: FontStyle.italic, height: 1.65,
            ),
          ),
        ),
        const SizedBox(height: 10),
        Text(
          context,
          style: TextStyle(
            fontSize: 13, height: 1.7, color: AppTheme.text2Of(ctx),
          ),
        ),
      ],
    ),
  );
}

const _statColors = {
  'Education':       Color(0xFF0ea5e9),
  'Career':          Color(0xFFd97706),
  'Awards':          Color(0xFF7c3aed),
  'Notable works':   Color(0xFF059669),
};

class _AuthorStat extends StatelessWidget {
  final String label;
  final String value;
  const _AuthorStat({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    final color = _statColors[label] ?? AppTheme.brandOf(context);
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.fromLTRB(14, 10, 14, 10),
      decoration: BoxDecoration(
        color:        color.withAlpha(18),
        borderRadius: const BorderRadius.only(
          topRight: Radius.circular(10), bottomRight: Radius.circular(10),
        ),
        border: Border(left: BorderSide(color: color, width: 3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label.toUpperCase(),
            style: TextStyle(
              fontSize: 10, fontWeight: FontWeight.w800,
              color: color, letterSpacing: 0.7,
            ),
          ),
          const SizedBox(height: 5),
          Text(
            value,
            style: TextStyle(
              fontSize: 13, height: 1.65,
              color: AppTheme.text2Of(context),
            ),
          ),
        ],
      ),
    );
  }
}

class _Device extends StatelessWidget {
  final String kind;
  final String line;
  final String exp;
  final Color  accent;
  const _Device({
    required this.kind, required this.line,
    required this.exp,  required this.accent,
  });

  @override
  Widget build(BuildContext context) => Container(
    margin: const EdgeInsets.only(bottom: 12),
    padding: const EdgeInsets.all(14),
    decoration: BoxDecoration(
      color:        AppTheme.cardOf(context),
      borderRadius: BorderRadius.circular(12),
      border:       Border.all(color: AppTheme.borderOf(context)),
    ),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          kind.toUpperCase(),
          style: TextStyle(
            fontSize: 10, fontWeight: FontWeight.w800,
            color: AppTheme.textMutedOf(context), letterSpacing: 0.9,
          ),
        ),
        const SizedBox(height: 6),
        Text(
          line,
          style: TextStyle(
            fontSize: 13, fontStyle: FontStyle.italic,
            color: accent, height: 1.5,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          exp,
          style: TextStyle(
            fontSize: 13, height: 1.7,
            color: AppTheme.text2Of(context),
          ),
        ),
      ],
    ),
  );
}

class _GlossRow extends StatelessWidget {
  final String  word;
  final String  def;
  final String? eg;
  final Color   accent;
  const _GlossRow({required this.word, required this.def, this.eg, required this.accent});

  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.symmetric(vertical: 12),
    decoration: BoxDecoration(
      border: Border(bottom: BorderSide(color: AppTheme.borderOf(context))),
    ),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          word,
          style: TextStyle(
            fontSize: 14, fontWeight: FontWeight.w700, color: accent,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          def,
          style: TextStyle(
            fontSize: 13, height: 1.5, color: AppTheme.text2Of(context),
          ),
        ),
        if (eg != null) ...[
          const SizedBox(height: 3),
          Text(
            eg!,
            style: TextStyle(
              fontSize: 11, height: 1.4,
              color: AppTheme.textMutedOf(context),
            ),
          ),
        ],
      ],
    ),
  );
}

class _NavButtons extends StatelessWidget {
  final NavBlock nav;
  final Color    accent;
  final void Function(String) onSwitchTab;
  final String   chapterSlug;
  final BuildContext context;

  const _NavButtons({
    required this.nav,
    required this.accent,
    required this.onSwitchTab,
    required this.chapterSlug,
    required this.context,
  });

  @override
  Widget build(BuildContext _) => Padding(
    padding: const EdgeInsets.only(top: 16, bottom: 8),
    child: Wrap(
      spacing: 8, runSpacing: 8,
      children: [
        if (nav.back != null)
          OutlinedButton(
            onPressed: () => onSwitchTab(nav.back!),
            style: OutlinedButton.styleFrom(
              minimumSize: const Size(0, 38),
              padding: const EdgeInsets.symmetric(horizontal: 16),
              side: BorderSide(color: AppTheme.borderOf(context)),
            ),
            child: Text('← Back',
                style: TextStyle(color: AppTheme.text2Of(context))),
          ),
        if (nav.practice)
          ElevatedButton(
            onPressed: () => onSwitchTab('practice'),
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.brandOf(context),
              foregroundColor: Colors.white,
              overlayColor:    AppTheme.brandOf(context),
              minimumSize:     const Size(0, 38),
              padding:         const EdgeInsets.symmetric(horizontal: 16),
              elevation:       0,
            ),
            child: const Text('🔥 Practice',
                style: TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
          ),
        if (nav.next != null)
          ElevatedButton(
            onPressed: () => onSwitchTab(nav.next!),
            style: ElevatedButton.styleFrom(
              backgroundColor: accent,
              minimumSize: const Size(0, 38),
              padding: const EdgeInsets.symmetric(horizontal: 16),
            ),
            child: Text(
              nav.nextLabel ?? 'Next →',
              style: const TextStyle(color: Colors.white, fontSize: 13),
            ),
          ),
      ],
    ),
  );
}

// ── Ask AI tab ──────────────────────────────────────────────────────────────

// ── Quick link card (used in no-content fallback) ──────────────────────────

class _QuickLink extends StatelessWidget {
  final String       emoji;
  final String       title;
  final String       sub;
  final Color        color;
  final VoidCallback onTap;
  const _QuickLink({
    required this.emoji, required this.title,
    required this.sub,   required this.color,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) => GestureDetector(
    onTap: onTap,
    child: Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color:        AppTheme.cardOf(context),
        borderRadius: BorderRadius.circular(12),
        border:       Border.all(color: color.withAlpha(60)),
      ),
      child: Row(
        children: [
          Container(
            width: 42, height: 42,
            decoration: BoxDecoration(
              color: color.withAlpha(20),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Center(child: Text(emoji, style: const TextStyle(fontSize: 20))),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: TextStyle(
                  fontSize: 14, fontWeight: FontWeight.w700,
                  color: color.withAlpha(220),
                )),
                Text(sub, style: TextStyle(
                  fontSize: 11, color: AppTheme.textMutedOf(context),
                )),
              ],
            ),
          ),
          Icon(Icons.arrow_forward_ios, size: 14, color: color.withAlpha(140)),
        ],
      ),
    ),
  );
}

class _AskAITab extends StatefulWidget {
  final String   chapterSlug;
  final Chapter? chapter;
  const _AskAITab({required this.chapterSlug, this.chapter});

  @override
  State<_AskAITab> createState() => _AskAITabState();
}

class _AskAITabState extends State<_AskAITab> {
  final _learnSvc  = LearningService();
  final _inputCtrl = TextEditingController();
  final _scrollCtrl = ScrollController();

  final List<_Msg> _messages = [];
  bool       _loading     = false;
  String     _error       = '';
  String     _language    = 'en';

  String get _chapterId =>
      widget.chapter?.id ?? widget.chapterSlug;

  @override
  void dispose() {
    _inputCtrl.dispose();
    _scrollCtrl.dispose();
    super.dispose();
  }

  Future<void> _ask(String q) async {
    q = q.trim();
    if (q.isEmpty) {
      return;
    }
    _inputCtrl.clear();
    FocusScope.of(context).unfocus();
    setState(() { _loading = true; _error = ''; });
    try {
      final res = await _learnSvc.explain(
        chapterId: _chapterId, question: q, language: _language,
      );
      if (!mounted) {
        return;
      }
      setState(() {
        _messages.add(_Msg(question: q, response: res));
        _loading = false;
      });
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (_scrollCtrl.hasClients) {
          _scrollCtrl.animateTo(
            _scrollCtrl.position.maxScrollExtent,
            duration: const Duration(milliseconds: 300),
            curve: Curves.easeOut,
          );
        }
      });
    } catch (e) {
      if (!mounted) {
        return;
      }
      setState(() { _error = e.toString(); _loading = false; });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Language toggle
        Container(
          color: AppTheme.cardOf(context),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          child: Row(
            children: [
              Text('Explain in:',
                  style: TextStyle(fontSize: 12,
                      color: AppTheme.textMutedOf(context))),
              const SizedBox(width: 10),
              SegmentedButton<String>(
                segments: const [
                  ButtonSegment(value: 'en', label: Text('English')),
                  ButtonSegment(value: 'ta', label: Text('Tamil')),
                ],
                selected:           {_language},
                onSelectionChanged: (v) => setState(() => _language = v.first),
                style: SegmentedButton.styleFrom(
                  minimumSize: const Size(60, 28),
                  textStyle:   const TextStyle(fontSize: 12),
                ),
              ),
            ],
          ),
        ),
        const Divider(height: 1),

        Expanded(
          child: _messages.isEmpty && !_loading
              ? _buildEmpty()
              : ListView.builder(
                  controller: _scrollCtrl,
                  padding: const EdgeInsets.fromLTRB(16, 12, 16, 12),
                  itemCount: _messages.length + (_loading ? 1 : 0),
                  itemBuilder: (_, i) {
                    if (i == _messages.length) {
                      return _buildThinking();
                    }
                    return _MsgBubble(msg: _messages[i]);
                  },
                ),
        ),

        if (_error.isNotEmpty)
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
            child: ErrorView(message: _error),
          ),

        _buildInput(),
      ],
    );
  }

  static const _quickQs = [
    'What is the central theme of this chapter?',
    'Describe the main character',
    'Summarise for exam',
    'List the literary devices used',
    'Give me 10-mark essay tips',
  ];

  Widget _buildEmpty() => ListView(
    padding: const EdgeInsets.fromLTRB(16, 20, 16, 12),
    children: [
      Center(
        child: Column(
          children: [
            const Text('🤖', style: TextStyle(fontSize: 40)),
            const SizedBox(height: 8),
            const Text('Ask AI about this chapter',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
            const SizedBox(height: 4),
            Text('Tap a question or type your own',
                style: TextStyle(fontSize: 12,
                    color: AppTheme.textMutedOf(context))),
          ],
        ),
      ),
      const SizedBox(height: 20),
      ..._quickQs.map((q) => Padding(
        padding: const EdgeInsets.only(bottom: 8),
        child: GestureDetector(
          onTap: () => _ask(q),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
            decoration: BoxDecoration(
              color:        AppTheme.cardOf(context),
              borderRadius: BorderRadius.circular(12),
              border:       Border.all(color: AppTheme.borderOf(context)),
            ),
            child: Row(
              children: [
                const Text('💬', style: TextStyle(fontSize: 14)),
                const SizedBox(width: 10),
                Expanded(child: Text(q,
                    style: const TextStyle(fontSize: 13))),
                Icon(Icons.arrow_forward_ios,
                    size: 12, color: AppTheme.textMutedOf(context)),
              ],
            ),
          ),
        ),
      )),
    ],
  );

  Widget _buildThinking() => Padding(
    padding: const EdgeInsets.symmetric(vertical: 8),
    child: Row(
      children: [
        Container(
          width: 32, height: 32,
          decoration: BoxDecoration(
            color: AppTheme.brandOf(context).withAlpha(22),
            borderRadius: BorderRadius.circular(8),
          ),
          child: const Center(child: Text('🤖', style: TextStyle(fontSize: 15))),
        ),
        const SizedBox(width: 10),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
          decoration: BoxDecoration(
            color: AppTheme.brandOf(context).withAlpha(15),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Row(
            children: [
              SizedBox(
                width: 40, height: 8,
                child: LinearProgressIndicator(
                  backgroundColor: Colors.transparent,
                  color: AppTheme.brandOf(context),
                ),
              ),
              SizedBox(width: 8),
              Text('Thinking…',
                  style: TextStyle(fontSize: 12, color: AppTheme.brandOf(context),
                      fontStyle: FontStyle.italic)),
            ],
          ),
        ),
      ],
    ),
  );

  Widget _buildInput() => Container(
    color: AppTheme.cardOf(context),
    padding: EdgeInsets.only(
      left: 16, right: 16, top: 8,
      bottom: MediaQuery.of(context).viewInsets.bottom + 12,
    ),
    child: Row(
      children: [
        Expanded(
          child: TextField(
            controller:      _inputCtrl,
            onSubmitted:     _ask,
            textInputAction: TextInputAction.send,
            style: const TextStyle(fontSize: 14),
            decoration: const InputDecoration(
              hintText:       'Ask about this chapter…',
              contentPadding: EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            ),
          ),
        ),
        const SizedBox(width: 8),
        Material(
          color:        AppTheme.brandOf(context),
          borderRadius: BorderRadius.circular(10),
          child: InkWell(
            borderRadius: BorderRadius.circular(10),
            onTap: () => _ask(_inputCtrl.text),
            child: const Padding(
              padding: EdgeInsets.all(10),
              child: Icon(Icons.send, color: Colors.white, size: 20),
            ),
          ),
        ),
      ],
    ),
  );
}

class _Msg {
  final String          question;
  final ExplainResponse response;
  const _Msg({required this.question, required this.response});
}

class _MsgBubble extends StatelessWidget {
  final _Msg msg;
  const _MsgBubble({required this.msg});

  @override
  Widget build(BuildContext context) {
    final r        = msg.response;
    final userBg   = AppTheme.isDark(context) ? AppTheme.brandOf(context) : AppTheme.textPrimary;
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // User question
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              Flexible(
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                  decoration: BoxDecoration(
                    color: userBg,
                    borderRadius: const BorderRadius.only(
                      topLeft:     Radius.circular(14),
                      topRight:    Radius.circular(4),
                      bottomLeft:  Radius.circular(14),
                      bottomRight: Radius.circular(14),
                    ),
                  ),
                  child: Text(msg.question,
                      style: const TextStyle(color: Colors.white,
                          fontSize: 13, height: 1.4)),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),

          // AI response
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: 32, height: 32,
                decoration: BoxDecoration(
                  color: AppTheme.brandOf(context).withAlpha(22),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: const Center(child: Text('🤖', style: TextStyle(fontSize: 15))),
              ),
              const SizedBox(width: 8),
              Flexible(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      padding: const EdgeInsets.all(14),
                      decoration: BoxDecoration(
                        color: AppTheme.cardOf(context),
                        borderRadius: const BorderRadius.only(
                          topLeft:     Radius.circular(4),
                          topRight:    Radius.circular(14),
                          bottomLeft:  Radius.circular(14),
                          bottomRight: Radius.circular(14),
                        ),
                        border: Border.all(color: AppTheme.borderOf(context)),
                      ),
                      child: Text(r.explanation,
                          style: const TextStyle(fontSize: 13, height: 1.6)),
                    ),
                    if (r.keyPoints.isNotEmpty) ...[
                      const SizedBox(height: 6),
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: AppTheme.successBgOf(context),
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(
                              color: AppTheme.successBorderOf(context)),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('KEY POINTS',
                                style: TextStyle(
                                    fontSize: 10, fontWeight: FontWeight.w800,
                                    color: AppTheme.successFgOf(context),
                                    letterSpacing: 0.5)),
                            const SizedBox(height: 6),
                            ...r.keyPoints.map((p) => Padding(
                              padding: const EdgeInsets.only(bottom: 4),
                              child: Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text('✓ ',
                                      style: TextStyle(
                                          color: AppTheme.successFgOf(context),
                                          fontWeight: FontWeight.w700,
                                          fontSize: 12)),
                                  Expanded(child: Text(p,
                                      style: TextStyle(fontSize: 12,
                                          color: AppTheme.successFgOf(context)))),
                                ],
                              ),
                            )),
                          ],
                        ),
                      ),
                    ],
                    if (r.examTip.isNotEmpty) ...[
                      const SizedBox(height: 6),
                      InfoCard(
                        label: 'Exam tip',
                        icon: Icons.lightbulb_outline,
                        body: r.examTip,
                        isTip: true,
                      ),
                    ],
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

// ── Attempt History Tab ────────────────────────────────────────────────────

class _AttemptHistoryTab extends StatefulWidget {
  final String classLevel;
  final String subjectSlug;
  final String chapterSlug;
  const _AttemptHistoryTab({
    required this.classLevel,
    required this.subjectSlug,
    required this.chapterSlug,
  });

  @override
  State<_AttemptHistoryTab> createState() => _AttemptHistoryTabState();
}

class _AttemptHistoryTabState extends State<_AttemptHistoryTab> {
  List<Map<String, dynamic>> _sessions = [];
  bool _loaded = false;

  @override
  void initState() {
    super.initState();
    _loadSessions();
  }

  Future<void> _loadSessions() async {
    final prefs   = await SharedPreferences.getInstance();
    final key     = 'exam_coach_sessions_${widget.chapterSlug}';
    final stored  = prefs.getStringList(key) ?? [];
    final parsed  = stored
        .map((s) => jsonDecode(s) as Map<String, dynamic>)
        .toList()
        .reversed
        .toList();
    if (mounted) {
      setState(() {
        _sessions = parsed;
        _loaded = true;
      });
    }
  }

  String _fmtDate(String iso) {
    final dt = DateTime.parse(iso).toLocal();
    const months = ['Jan','Feb','Mar','Apr','May','Jun',
                    'Jul','Aug','Sep','Oct','Nov','Dec'];
    final h = dt.hour.toString().padLeft(2, '0');
    final m = dt.minute.toString().padLeft(2, '0');
    return '${dt.day} ${months[dt.month - 1]} ${dt.year}, $h:$m';
  }

  @override
  Widget build(BuildContext context) {
    if (!_loaded) {
      return const Center(child: CircularProgressIndicator());
    }

    if (_sessions.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text('🕐', style: TextStyle(fontSize: 40)),
              const SizedBox(height: 12),
              const Text('No attempts yet',
                  style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700)),
              const SizedBox(height: 6),
              Text('Complete a practice exam to see your history here.',
                  style: TextStyle(fontSize: 13,
                      color: AppTheme.textMutedOf(context)),
                  textAlign: TextAlign.center),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () => context.push('/exam/${widget.classLevel}/${widget.subjectSlug}/${widget.chapterSlug}'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.brandOf(context),
                  foregroundColor: Colors.white,
                  overlayColor:    AppTheme.brandOf(context),
                  elevation:       0,
                ),
                child: const Text('🔥 Practice',
                    style: TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
              ),
            ],
          ),
        ),
      );
    }

    return ListView.builder(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 40),
      itemCount: _sessions.length + 1,
      itemBuilder: (_, i) {
        if (i == 0) {
          return Padding(
            padding: const EdgeInsets.only(bottom: 10),
            child: Text(
              '${_sessions.length} session${_sessions.length != 1 ? 's' : ''} completed',
              style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700,
                  color: AppTheme.textMutedOf(context), letterSpacing: 0.6),
            ),
          );
        }
        final s          = _sessions[i - 1];
        final sessionNum = _sessions.length - (i - 1);
        final score      = (s['score'] as num).toInt();
        final total      = (s['total'] as num).toInt();
        final pct        = total > 0 ? (score / total * 100).round() : 0;
        final good       = pct >= 70;
        final badgeBg    = good ? AppTheme.successBgOf(context) : AppTheme.warningBgOf(context);
        final badgeFg    = good ? AppTheme.successFgOf(context) : AppTheme.warningFgOf(context);
        return Container(
          margin: const EdgeInsets.only(bottom: 8),
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color:        AppTheme.cardOf(context),
            border:       Border.all(color: AppTheme.borderOf(context)),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Row(
            children: [
              Container(
                width: 38, height: 38,
                decoration: BoxDecoration(
                  color: badgeBg,
                  shape: BoxShape.circle,
                ),
                alignment: Alignment.center,
                child: Text('$sessionNum',
                    style: TextStyle(
                      fontSize: 13, fontWeight: FontWeight.w700,
                      color: badgeFg,
                    )),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Text('Session $sessionNum',
                            style: const TextStyle(
                              fontSize: 13, fontWeight: FontWeight.w600,
                            )),
                        const SizedBox(width: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 7, vertical: 2),
                          decoration: BoxDecoration(
                            color: badgeBg,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Text('$pct%',
                              style: TextStyle(
                                fontSize: 10, fontWeight: FontWeight.w700,
                                color: badgeFg,
                              )),
                        ),
                      ],
                    ),
                    const SizedBox(height: 2),
                    Text(_fmtDate(s['date'] as String),
                        style: TextStyle(fontSize: 11,
                            color: AppTheme.textMutedOf(context))),
                  ],
                ),
              ),
              Text('$score/$total MCQ',
                  style: const TextStyle(
                    fontSize: 15, fontWeight: FontWeight.w700,
                  )),
            ],
          ),
        );
      },
    );
  }
}

// ── Three-zone progress-aware sub-nav ─────────────────────────────────────────

class _ThreeZoneNav extends StatelessWidget {
  final List<ContentTab>      tabs;
  final ContentTab            activeTab;
  final void Function(String) onSelect;
  final VoidCallback          onShowContents;

  const _ThreeZoneNav({
    required this.tabs,
    required this.activeTab,
    required this.onSelect,
    required this.onShowContents,
  });

  static String _trunc(String s, int max) =>
      s.length > max ? '${s.substring(0, max)}…' : s;

  @override
  Widget build(BuildContext context) {
    final activeIdx = tabs.indexWhere((t) => t.id == activeTab.id);
    final total     = tabs.length;
    final progress  = total > 0 ? (activeIdx + 1) / total : 0.0;
    final hasNext   = activeIdx >= 0 && activeIdx < total - 1;
    final nextTab   = hasNext ? tabs[activeIdx + 1] : null;

    return Container(
      color:   AppTheme.cardOf(context),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      child: Row(
        children: [
          // Left — Contents button
          GestureDetector(
            onTap: onShowContents,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(Icons.menu, size: 18, color: AppTheme.text2Of(context)),
                const SizedBox(width: 4),
                Text(
                  'Contents',
                  style: TextStyle(
                    fontSize: 13, fontWeight: FontWeight.w500,
                    color: AppTheme.text2Of(context),
                  ),
                ),
              ],
            ),
          ),

          // Divider
          Container(
            width: 1, height: 20,
            margin: const EdgeInsets.symmetric(horizontal: 10),
            color: AppTheme.borderOf(context),
          ),

          // Center — tab name + N/M + progress bar
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        activeTab.label,
                        style: TextStyle(
                          fontSize: 13, fontWeight: FontWeight.w600,
                          color: AppTheme.textOf(context),
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    const SizedBox(width: 6),
                    Text(
                      '${activeIdx + 1} / $total',
                      style: TextStyle(
                        fontSize: 11,
                        color: AppTheme.textMutedOf(context),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 5),
                ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: LinearProgressIndicator(
                    value:           progress,
                    backgroundColor: AppTheme.borderOf(context),
                    valueColor:      AlwaysStoppedAnimation<Color>(
                      AppTheme.brandOf(context),
                    ),
                    minHeight: 4,
                  ),
                ),
              ],
            ),
          ),

          // Divider
          Container(
            width: 1, height: 20,
            margin: const EdgeInsets.symmetric(horizontal: 10),
            color: AppTheme.borderOf(context),
          ),

          // Right — Next or Complete
          if (!hasNext)
            Text(
              'Complete ✓',
              style: TextStyle(
                fontSize: 13, fontWeight: FontWeight.w500,
                color: AppTheme.textMutedOf(context),
              ),
            )
          else
            GestureDetector(
              onTap: () { if (nextTab != null) onSelect(nextTab.id); },
              child: Text(
                '${_trunc(nextTab?.label ?? '', 12)} →',
                style: TextStyle(
                  fontSize: 13, fontWeight: FontWeight.w600,
                  color: AppTheme.brandOf(context),
                ),
              ),
            ),
        ],
      ),
    );
  }
}

// ── Contents bottom-sheet ──────────────────────────────────────────────────────

class _ContentsSheet extends StatelessWidget {
  final List<ContentTab>      tabs;
  final ContentTab            activeTab;
  final void Function(String) onSelect;

  const _ContentsSheet({
    required this.tabs,
    required this.activeTab,
    required this.onSelect,
  });

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
            child: Text(
              'Contents',
              style: TextStyle(
                fontSize: 16, fontWeight: FontWeight.w700,
                color: AppTheme.textOf(context),
              ),
            ),
          ),
          const Divider(height: 1),
          ...tabs.asMap().entries.map((entry) {
            final i      = entry.key;
            final tab    = entry.value;
            final active = tab.id == activeTab.id;
            return ListTile(
              onTap:     () => onSelect(tab.id),
              tileColor: active ? AppTheme.brandOf(context).withAlpha(15) : null,
              title: Text(
                tab.label,
                style: TextStyle(
                  fontSize:   14,
                  fontWeight: active ? FontWeight.w600 : FontWeight.w400,
                  color: active
                      ? AppTheme.brandOf(context)
                      : AppTheme.textOf(context),
                ),
              ),
              trailing: Text(
                '${i + 1}',
                style: TextStyle(
                  fontSize: 12,
                  color: AppTheme.textMutedOf(context),
                ),
              ),
            );
          }),
          const SizedBox(height: 8),
        ],
      ),
    );
  }
}
