import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../models/syllabus_model.dart';
import '../models/learning_model.dart';
import '../services/syllabus_service.dart';
import '../services/learning_service.dart';
import '../widgets/app_button.dart';
import '../widgets/error_view.dart';

class LearnScreen extends StatefulWidget {
  // chapterSlug — used for GET /chapters/{slug}/topics
  // chapterId   — UUID, used for POST /learning/explain (passed via GoRouter extra)
  final String   chapterSlug;
  final Chapter? chapter; // optional — provided when navigating from ChapterDetailScreen

  const LearnScreen({
    super.key,
    required this.chapterSlug,
    this.chapter,
  });

  @override
  State<LearnScreen> createState() => _LearnScreenState();
}

class _LearnScreenState extends State<LearnScreen> {
  final _syllSvc      = SyllabusService();
  final _learnSvc     = LearningService();
  final _questionCtrl = TextEditingController();

  List<Topic>      _topics   = [];
  Topic?           _topic;
  String           _language = 'en';
  ExplainResponse? _result;
  bool             _loading  = false;
  bool             _tLoading = true;
  String           _error    = '';

  // Use chapter.id (UUID) if available; fall back to slug (may fail on backend)
  String get _chapterId =>
      widget.chapter?.id ?? widget.chapterSlug;

  @override
  void initState() {
    super.initState();
    _syllSvc.getTopics(widget.chapterSlug).then((t) {
      if (mounted) setState(() { _topics = t; _tLoading = false; });
    }).catchError((e) {
      if (mounted) setState(() { _error = e.toString(); _tLoading = false; });
    });
  }

  @override
  void dispose() {
    _questionCtrl.dispose();
    super.dispose();
  }

  Future<void> _explain() async {
    if (_topic == null && _questionCtrl.text.trim().isEmpty) return;
    setState(() { _loading = true; _error = ''; _result = null; });
    try {
      final res = await _learnSvc.explain(
        chapterId: _chapterId,
        topicId:   _topic?.id,
        question:  _questionCtrl.text.trim(),
        language:  _language,
      );
      if (mounted) setState(() => _result = res);
    } catch (e) {
      if (mounted) setState(() => _error = e.toString());
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final title = widget.chapter?.title ?? 'Learn';
    return Scaffold(
      backgroundColor: AppTheme.surface,
      appBar: AppBar(
        title: Text(title, overflow: TextOverflow.ellipsis),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Topic chips
          if (_tLoading)
            const Center(child: Padding(
              padding: EdgeInsets.all(16),
              child: CircularProgressIndicator(),
            )),

          if (_topics.isNotEmpty) ...[
            const Text(
              'Select a topic',
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w600,
                color: AppTheme.textSecondary,
              ),
            ),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              runSpacing: 6,
              children: _topics.map((t) => ChoiceChip(
                label: Text(t.title, style: const TextStyle(fontSize: 13)),
                selected: _topic?.id == t.id,
                onSelected: (_) => setState(() =>
                    _topic = _topic?.id == t.id ? null : t),
                selectedColor: AppTheme.brand,
                labelStyle: TextStyle(
                  color: _topic?.id == t.id ? Colors.white : null,
                ),
              )).toList(),
            ),
            const SizedBox(height: 16),
          ],

          // Question input
          const Text(
            'Or ask a question',
            style: TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.w600,
              color: AppTheme.textSecondary,
            ),
          ),
          const SizedBox(height: 8),
          TextField(
            controller:  _questionCtrl,
            decoration:  const InputDecoration(
              hintText: 'e.g. What is the theme of this lesson?',
            ),
            onSubmitted: (_) => _explain(),
          ),
          const SizedBox(height: 16),

          // Language toggle
          Row(
            children: [
              const Text('Explain in: ', style: TextStyle(fontSize: 13)),
              const SizedBox(width: 8),
              SegmentedButton<String>(
                segments: const [
                  ButtonSegment(value: 'en', label: Text('English')),
                  ButtonSegment(value: 'ta', label: Text('Tamil')),
                ],
                selected:           {_language},
                onSelectionChanged: (v) => setState(() => _language = v.first),
                style: SegmentedButton.styleFrom(minimumSize: const Size(80, 36)),
              ),
            ],
          ),
          const SizedBox(height: 16),

          AppButton(
            label:     '✨ Explain',
            onPressed: _explain,
            loading:   _loading,
          ),
          const SizedBox(height: 16),

          if (_error.isNotEmpty) ErrorView(message: _error),

          if (_result != null) ...[
            Card(
              child: Padding(
                padding: const EdgeInsets.all(14),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Explanation',
                        style: TextStyle(
                          fontWeight: FontWeight.w700, fontSize: 15,
                        )),
                    const SizedBox(height: 8),
                    Text(_result!.explanation,
                        style: const TextStyle(fontSize: 14, height: 1.6)),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 10),

            if (_result!.keyPoints.isNotEmpty)
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(14),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Key Points for Exam',
                          style: TextStyle(
                            fontWeight: FontWeight.w700, fontSize: 15,
                          )),
                      const SizedBox(height: 8),
                      ..._result!.keyPoints.map((pt) => Padding(
                        padding: const EdgeInsets.only(bottom: 6),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text('✓ ', style: TextStyle(
                              color: AppTheme.success, fontWeight: FontWeight.w700,
                            )),
                            Expanded(child: Text(pt,
                                style: const TextStyle(fontSize: 13))),
                          ],
                        ),
                      )),
                    ],
                  ),
                ),
              ),

            if (_result!.examTip.isNotEmpty) ...[
              const SizedBox(height: 10),
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color:        const Color(0xFFFFFBEB),
                  border:       Border.all(color: const Color(0xFFFDE68A)),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('💡 Exam Tip',
                        style: TextStyle(
                          fontWeight: FontWeight.w700,
                          color: Color(0xFF92400E),
                        )),
                    const SizedBox(height: 4),
                    Text(_result!.examTip,
                        style: const TextStyle(
                          fontSize: 13, color: Color(0xFF78350F),
                        )),
                  ],
                ),
              ),
            ],
          ],
        ],
      ),
    );
  }
}
