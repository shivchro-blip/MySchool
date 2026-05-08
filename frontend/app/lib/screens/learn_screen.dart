import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../config/theme.dart';
import '../models/syllabus_model.dart';
import '../models/learning_model.dart';
import '../services/syllabus_service.dart';
import '../services/learning_service.dart';
import '../widgets/error_view.dart';

// ── Local chat message model ───────────────────────────────────────────────

class _ChatMsg {
  final String          question;
  final ExplainResponse response;
  const _ChatMsg({required this.question, required this.response});
}

// ── Screen ─────────────────────────────────────────────────────────────────

class LearnScreen extends StatefulWidget {
  final String   classLevel;
  final String   subjectSlug;
  final String   chapterSlug;
  final Chapter? chapter;

  const LearnScreen({
    super.key,
    required this.classLevel,
    required this.subjectSlug,
    required this.chapterSlug,
    this.chapter,
  });

  @override
  State<LearnScreen> createState() => _LearnScreenState();
}

class _LearnScreenState extends State<LearnScreen>
    with SingleTickerProviderStateMixin {
  late final TabController _tabs;
  final _learnSvc  = LearningService();
  final _syllSvc   = SyllabusService();
  final _inputCtrl = TextEditingController();
  final _scrollCtrl= ScrollController();

  List<Topic>   _topics   = [];
  bool          _tLoading = true;

  final List<_ChatMsg> _messages = [];
  bool           _chatLoading = false;
  String         _chatError   = '';
  String         _language    = 'en';

  String get _chapterId => widget.chapter?.id ?? widget.chapterSlug;

  List<String> get _quickQuestions {
    final ct = widget.chapter?.contentType ?? 'prose';
    return switch (ct) {
      'poem' => [
        'What is the central idea of this poem?',
        'Explain the rhyme scheme and poetic devices',
        'What is the mood and tone?',
        'Who is the speaker in this poem?',
        'Give me exam tips for this poem',
      ],
      'supplementary' => [
        'Summarise the story',
        'Who are the main characters?',
        'What is the theme of this story?',
        'List the key events in order',
        'Give me 5-mark exam tips',
      ],
      _ => [
        'What is the theme of this lesson?',
        'Who is the main character and describe them',
        'Summarise this chapter for exam',
        'List the literary devices used',
        'Give me 10-mark essay tips',
      ],
    };
  }

  @override
  void initState() {
    super.initState();
    _tabs = TabController(length: 2, vsync: this);
    _syllSvc.getTopics(widget.chapterSlug).then((t) {
      if (mounted) {
        setState(() {
          _topics = t;
          _tLoading = false;
        });
      }
    }).catchError((_) {
      if (mounted) {
        setState(() => _tLoading = false);
      }
    });
  }

  @override
  void dispose() {
    _tabs.dispose();
    _inputCtrl.dispose();
    _scrollCtrl.dispose();
    super.dispose();
  }

  Future<void> _ask(String question) async {
    final q = question.trim();
    if (q.isEmpty) {
      return;
    }
    _inputCtrl.clear();
    FocusScope.of(context).unfocus();
    setState(() { _chatLoading = true; _chatError = ''; });
    try {
      final res = await _learnSvc.explain(
        chapterId: _chapterId,
        question:  q,
        language:  _language,
      );
      if (mounted) {
        setState(() {
          _messages.add(_ChatMsg(question: q, response: res));
          _chatLoading = false;
        });
        WidgetsBinding.instance.addPostFrameCallback((_) {
          if (_scrollCtrl.hasClients) {
            _scrollCtrl.animateTo(
              _scrollCtrl.position.maxScrollExtent,
              duration: const Duration(milliseconds: 350),
              curve: Curves.easeOut,
            );
          }
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _chatError = e.toString();
          _chatLoading = false;
        });
      }
    }
  }

  // ── AppBar ─────────────────────────────────────────────────────────────

  @override
  Widget build(BuildContext context) {
    final ch    = widget.chapter;
    final title = ch?.title ?? 'Learn';

    return Scaffold(
      appBar: AppBar(
        title: Text(title, overflow: TextOverflow.ellipsis),
        bottom: TabBar(
          controller: _tabs,
          indicatorColor: AppTheme.brand,
          labelColor:     AppTheme.brand,
          unselectedLabelColor: AppTheme.textMutedOf(context),
          tabs: const [
            Tab(text: 'Overview'),
            Tab(text: 'Ask AI'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabs,
        children: [
          _buildOverview(),
          _buildAskAI(),
        ],
      ),
    );
  }

  // ── Overview tab ───────────────────────────────────────────────────────

  Widget _buildOverview() {
    final ch   = widget.chapter;
    final color = AppTheme.subjectColor(ch?.typeLabel ?? 'Prose');

    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
      children: [

        // Chapter info card
        Container(
          padding: const EdgeInsets.all(18),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end:   Alignment.bottomRight,
              colors: [color, color.withAlpha(200)],
            ),
            borderRadius: BorderRadius.circular(16),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (ch?.number != null)
              Text(
                'Chapter ${ch!.number}',
                style: TextStyle(
                    color: Colors.white.withValues(alpha: 0.75),
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                    letterSpacing: 0.8,
                  ),
                ),
              const SizedBox(height: 4),
              Text(
                ch?.title ?? widget.chapterSlug,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: FontWeight.w700,
                ),
              ),
              if (ch != null) ...[
                const SizedBox(height: 10),
                Row(
                  children: [
                    Text(ch.typeIcon, style: const TextStyle(fontSize: 16)),
                    const SizedBox(width: 6),
                    _Pill(label: ch.typeLabel, fg: Colors.white, bg: Colors.white.withAlpha(40)),
                  ],
                ),
              ],
            ],
          ),
        ),
        const SizedBox(height: 20),

        // Topics from backend
        if (_tLoading)
          const Center(child: Padding(
            padding: EdgeInsets.all(16),
            child: CircularProgressIndicator(),
          ))
        else if (_topics.isNotEmpty) ...[
          const _SectionLabel('Topics in this Chapter'),
          const SizedBox(height: 10),
          ..._topics.asMap().entries.map((e) => Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: _TopicCard(
              index: e.key + 1,
              title: e.value.title,
              color: color,
              onAsk: () {
                _tabs.animateTo(1);
                Future.delayed(const Duration(milliseconds: 300), () {
                  _ask('Explain the topic: ${e.value.title}');
                });
              },
            ),
          )),
          const SizedBox(height: 8),
        ],

        // Study guide
        const _SectionLabel('Study Guide'),
        const SizedBox(height: 10),
        _StudyGuideCard(contentType: widget.chapter?.contentType ?? 'prose'),
        const SizedBox(height: 20),

        // Ask AI prompt
        GestureDetector(
          onTap: () => _tabs.animateTo(1),
          child: Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppTheme.brand.withAlpha(15),
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: AppTheme.brand.withAlpha(60)),
            ),
            child: Row(
              children: [
                const Text('🤖', style: TextStyle(fontSize: 22)),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Ask AI about this chapter',
                          style: TextStyle(
                            fontSize: 14, fontWeight: FontWeight.w700,
                            color: AppTheme.brand,
                          )),
                      const SizedBox(height: 2),
                      Text('Get explanations, key points, and exam tips',
                          style: TextStyle(fontSize: 12,
                              color: AppTheme.textMutedOf(context))),
                    ],
                  ),
                ),
                const Icon(Icons.arrow_forward_ios, size: 14, color: AppTheme.brand),
              ],
            ),
          ),
        ),
        const SizedBox(height: 12),

        // Navigate to Practice
        _QuickNavCard(
          icon:    Icons.edit_note,
          color:   AppTheme.maths,
          title:   'Practice',
          subtitle: 'Write answers + get AI evaluation',
          onTap:   () => context.push('/practice/${widget.classLevel}/${widget.subjectSlug}/${widget.chapterSlug}'),
        ),
        const SizedBox(height: 10),
        _QuickNavCard(
          icon:    Icons.quiz_outlined,
          color:   AppTheme.warning,
          title:   'Exam Practice',
          subtitle: 'MCQ + full paper, exam-style',
          onTap:   () => context.push('/exam/${widget.classLevel}/${widget.subjectSlug}/${widget.chapterSlug}', extra: widget.chapter),
        ),
      ],
    );
  }

  // ── Ask AI tab ─────────────────────────────────────────────────────────

  Widget _buildAskAI() {
    return Column(
      children: [

        // Language toggle bar
        Container(
          color:   AppTheme.cardOf(context),
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
                  minimumSize:     const Size(72, 30),
                  textStyle: const TextStyle(fontSize: 12),
                ),
              ),
            ],
          ),
        ),
        const Divider(height: 1),

        // Messages + quick chips
        Expanded(
          child: _messages.isEmpty && !_chatLoading
              ? _buildEmptyChat()
              : ListView.builder(
                  controller: _scrollCtrl,
                  padding: const EdgeInsets.fromLTRB(16, 12, 16, 12),
                itemCount: _messages.length + (_chatLoading ? 1 : 0),
                itemBuilder: (ctx, i) {
                    if (i == _messages.length) {
                      return _buildThinking();
                    }
                    return _ChatBubble(msg: _messages[i]);
                  },
                ),
        ),

        // Error
        if (_chatError.isNotEmpty)
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
            child: ErrorView(message: _chatError),
          ),

        // Input area
        _buildInput(),
      ],
    );
  }

  Widget _buildEmptyChat() {
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 20, 16, 12),
      children: [
        Center(
          child: Column(
            children: [
              const Text('🤖', style: TextStyle(fontSize: 40)),
              const SizedBox(height: 8),
              const Text('Ask AI about this chapter',
                  style: TextStyle(
                    fontSize: 16, fontWeight: FontWeight.w700,
                  )),
              const SizedBox(height: 4),
              Text('Tap a question below or type your own',
                  style: TextStyle(fontSize: 12,
                      color: AppTheme.textMutedOf(context))),
            ],
          ),
        ),
        const SizedBox(height: 20),
        ..._quickQuestions.map((q) => Padding(
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
                  Expanded(
                    child: Text(q,
                        style: const TextStyle(fontSize: 13)),
                  ),
                  Icon(Icons.arrow_forward_ios,
                      size: 12, color: AppTheme.textMutedOf(context)),
                ],
              ),
            ),
          ),
        )),
      ],
    );
  }

  Widget _buildThinking() {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          Container(
            width: 32, height: 32,
            decoration: BoxDecoration(
              color:        AppTheme.brand.withAlpha(22),
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Center(child: Text('🤖', style: TextStyle(fontSize: 15))),
          ),
          const SizedBox(width: 10),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            decoration: BoxDecoration(
              color:        AppTheme.brand.withAlpha(15),
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Row(
              children: [
                SizedBox(
                  width: 40, height: 8,
                  child: LinearProgressIndicator(
                    backgroundColor: Colors.transparent,
                    color: AppTheme.brand,
                  ),
                ),
                SizedBox(width: 8),
                Text('Thinking…',
                    style: TextStyle(
                      fontSize: 12, color: AppTheme.brand,
                      fontStyle: FontStyle.italic,
                    )),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildInput() {
    return Container(
      color: AppTheme.cardOf(context),
      padding: EdgeInsets.only(
        left: 16, right: 16, top: 8,
        bottom: MediaQuery.of(context).viewInsets.bottom + 12,
      ),
      child: Row(
        children: [
          Expanded(
            child: TextField(
              controller: _inputCtrl,
              decoration: const InputDecoration(
                hintText: 'Ask about this chapter…',
                contentPadding: EdgeInsets.symmetric(horizontal: 14, vertical: 10),
              ),
              onSubmitted: _ask,
              textInputAction: TextInputAction.send,
              style: const TextStyle(fontSize: 14),
            ),
          ),
          const SizedBox(width: 8),
          Material(
            color:        AppTheme.brand,
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
}

// ── Chat bubble ────────────────────────────────────────────────────────────

class _ChatBubble extends StatelessWidget {
  final _ChatMsg msg;
  const _ChatBubble({required this.msg});

  @override
  Widget build(BuildContext context) {
    final r = msg.response;
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
                  decoration: const BoxDecoration(
                    color:        AppTheme.brand,
                    borderRadius: BorderRadius.only(
                      topLeft:     Radius.circular(14),
                      topRight:    Radius.circular(4),
                      bottomLeft:  Radius.circular(14),
                      bottomRight: Radius.circular(14),
                    ),
                  ),
                  child: Text(
                    msg.question,
                    style: const TextStyle(
                      color: Colors.white, fontSize: 13, height: 1.4,
                    ),
                  ),
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
                  color:        AppTheme.brand.withAlpha(22),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: const Center(child: Text('🤖', style: TextStyle(fontSize: 15))),
              ),
              const SizedBox(width: 8),
              Flexible(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [

                    // Explanation
                    Container(
                      padding: const EdgeInsets.all(14),
                      decoration: BoxDecoration(
                        color:        AppTheme.cardOf(context),
                        borderRadius: const BorderRadius.only(
                          topLeft:     Radius.circular(4),
                          topRight:    Radius.circular(14),
                          bottomLeft:  Radius.circular(14),
                          bottomRight: Radius.circular(14),
                        ),
                        border: Border.all(color: AppTheme.borderOf(context)),
                      ),
                      child: Text(
                        r.explanation,
                        style: const TextStyle(fontSize: 13, height: 1.6),
                      ),
                    ),

                    // Key points
                    if (r.keyPoints.isNotEmpty) ...[
                      const SizedBox(height: 6),
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color:        AppTheme.successBgOf(context),
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(color: AppTheme.successBorderOf(context)),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Key Points',
                                style: TextStyle(
                                  fontSize: 11, fontWeight: FontWeight.w700,
                                  color: AppTheme.successFgOf(context),
                                  letterSpacing: 0.5,
                                )),
                            const SizedBox(height: 6),
                            ...r.keyPoints.map((pt) => Padding(
                              padding: const EdgeInsets.only(bottom: 4),
                              child: Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text('✓ ',
                                      style: TextStyle(
                                        color: AppTheme.successFgOf(context),
                                        fontWeight: FontWeight.w700,
                                        fontSize: 12,
                                      )),
                                  Expanded(
                                    child: Text(pt,
                                        style: TextStyle(
                                          fontSize: 12,
                                          color: AppTheme.successFgOf(context),
                                        )),
                                  ),
                                ],
                              ),
                            )),
                          ],
                        ),
                      ),
                    ],

                    // Exam tip
                    if (r.examTip.isNotEmpty) ...[
                      const SizedBox(height: 6),
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: AppTheme.warningBgOf(context),
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(color: AppTheme.warningBorderOf(context)),
                        ),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text('💡 ',
                                style: TextStyle(fontSize: 13)),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text('Exam Tip',
                                      style: TextStyle(
                                        fontSize: 11, fontWeight: FontWeight.w700,
                                        color: AppTheme.warningFgOf(context),
                                      )),
                                  const SizedBox(height: 3),
                                  Text(r.examTip,
                                      style: TextStyle(
                                        fontSize: 12,
                                        color: AppTheme.warningFgOf(context),
                                        fontStyle: FontStyle.italic,
                                      )),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],

                    // Badges
                    const SizedBox(height: 6),
                    Row(
                      children: [
                        _Badge(label: r.modelUsed, color: AppTheme.brand),
                        if (r.cached) ...[
                          const SizedBox(width: 6),
                          const _Badge(label: 'cached', color: AppTheme.success),
                        ],
                        if (r.sourceChunks > 0) ...[
                          const SizedBox(width: 6),
                          _Badge(
                            label: '${r.sourceChunks} chunks',
                            color: AppTheme.textMuted,
                          ),
                        ],
                      ],
                    ),
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

// ── Helper widgets ─────────────────────────────────────────────────────────

class _Badge extends StatelessWidget {
  final String label;
  final Color  color;
  const _Badge({required this.label, required this.color});

  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 2),
    decoration: BoxDecoration(
      color:        color.withAlpha(22),
      borderRadius: BorderRadius.circular(8),
      border:       Border.all(color: color.withAlpha(60)),
    ),
    child: Text(label,
        style: TextStyle(
          fontSize: 10, fontWeight: FontWeight.w600, color: color,
        )),
  );
}

class _Pill extends StatelessWidget {
  final String label;
  final Color  fg;
  final Color  bg;
  const _Pill({required this.label, required this.fg, required this.bg});

  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 3),
    decoration: BoxDecoration(
      color: bg, borderRadius: BorderRadius.circular(12),
    ),
    child: Text(label,
        style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: fg)),
  );
}

class _SectionLabel extends StatelessWidget {
  final String text;
  const _SectionLabel(this.text);

  @override
  Widget build(BuildContext context) => Text(
    text,
    style: TextStyle(
      fontSize: 13, fontWeight: FontWeight.w700,
      color: AppTheme.text2Of(context),
    ),
  );
}

class _TopicCard extends StatelessWidget {
  final int    index;
  final String title;
  final Color  color;
  final VoidCallback onAsk;
  const _TopicCard({
    required this.index,
    required this.title,
    required this.color,
    required this.onAsk,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color:        AppTheme.cardOf(context),
        borderRadius: BorderRadius.circular(10),
        border:       Border.all(color: AppTheme.borderOf(context)),
      ),
      child: Row(
        children: [
          Container(
            width: 28, height: 28,
            decoration: BoxDecoration(
              color: color.withAlpha(22), shape: BoxShape.circle,
            ),
            child: Center(
              child: Text('$index',
                  style: TextStyle(
                    fontSize: 12, fontWeight: FontWeight.w700, color: color,
                  )),
            ),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Text(title,
                style: const TextStyle(
                  fontSize: 13, fontWeight: FontWeight.w500,
                )),
          ),
          GestureDetector(
            onTap: onAsk,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 4),
              decoration: BoxDecoration(
                color:        color.withAlpha(18),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text('Ask AI',
                  style: TextStyle(
                    fontSize: 11, fontWeight: FontWeight.w600, color: color,
                  )),
            ),
          ),
        ],
      ),
    );
  }
}

class _StudyGuideCard extends StatelessWidget {
  final String contentType;
  const _StudyGuideCard({required this.contentType});

  List<(String, String)> get _tips => switch (contentType) {
    'poem' => [
      ('📌 Theme', 'Identify the central idea or message the poet conveys.'),
      ('🎭 Mood & Tone', 'Note the emotional atmosphere and the poet\'s attitude.'),
      ('🔤 Poetic Devices', 'Mark alliteration, metaphor, simile, personification, rhyme.'),
      ('📝 Exam Tip', '2-mark: name + one fact. 5-mark: paraphrase + devices.'),
    ],
    'supplementary' => [
      ('📌 Plot', 'Know the beginning, conflict, climax, and resolution.'),
      ('👤 Characters', 'Main + supporting characters and their roles.'),
      ('💡 Theme', 'The moral or central message of the story.'),
      ('📝 Exam Tip', '5-mark: character sketch. 10-mark: summary + theme.'),
    ],
    _ => [
      ('📌 Theme', 'Understand the central idea and author\'s message.'),
      ('👤 Characters', 'Main character traits, relationships, conflicts.'),
      ('🔤 Literary Devices', 'Metaphor, irony, flashback, imagery used by author.'),
      ('📝 Exam Tip', '2-mark: define. 5-mark: explain with example. 10-mark: essay.'),
    ],
  };

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color:        AppTheme.cardOf(context),
        borderRadius: BorderRadius.circular(12),
        border:       Border.all(color: AppTheme.borderOf(context)),
      ),
      child: Column(
        children: _tips.map((t) => Padding(
          padding: const EdgeInsets.only(bottom: 10),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(
                width: 100,
                child: Text(t.$1,
                    style: TextStyle(
                      fontSize: 12, fontWeight: FontWeight.w700,
                      color: AppTheme.text2Of(context),
                    )),
              ),
              Expanded(
                child: Text(t.$2,
                    style: TextStyle(
                      fontSize: 12,
                      color: AppTheme.textMutedOf(context),
                      height: 1.4,
                    )),
              ),
            ],
          ),
        )).toList(),
      ),
    );
  }
}

class _QuickNavCard extends StatelessWidget {
  final IconData icon;
  final Color    color;
  final String   title;
  final String   subtitle;
  final VoidCallback onTap;
  const _QuickNavCard({
    required this.icon,
    required this.color,
    required this.title,
    required this.subtitle,
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
            width: 40, height: 40,
            decoration: BoxDecoration(
              color:        color.withAlpha(22),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(icon, color: color, size: 20),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title,
                    style: TextStyle(
                      fontSize: 14, fontWeight: FontWeight.w700,
                      color: color.withAlpha(220),
                    )),
                Text(subtitle,
                    style: TextStyle(
                      fontSize: 11, color: AppTheme.textMutedOf(context),
                    )),
              ],
            ),
          ),
          Icon(Icons.arrow_forward_ios, color: color.withAlpha(140), size: 14),
        ],
      ),
    ),
  );
}
