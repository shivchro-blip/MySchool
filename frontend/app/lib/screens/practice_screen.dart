import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../models/syllabus_model.dart';
import '../models/evaluation_model.dart';
import '../models/exam_practice_model.dart';
import '../services/syllabus_service.dart';
import '../services/evaluation_service.dart';
import '../services/exam_practice_service.dart';
import '../widgets/app_button.dart';
import '../widgets/marks_chip.dart';
import '../widgets/score_card.dart';
import '../widgets/error_view.dart';

class PracticeScreen extends StatefulWidget {
  // chapterSlug — matches the backend /chapters/{slug}/questions endpoint
  final String chapterSlug;
  const PracticeScreen({super.key, required this.chapterSlug});

  @override
  State<PracticeScreen> createState() => _PracticeScreenState();
}

class _PracticeScreenState extends State<PracticeScreen> {
  final _syllSvc    = SyllabusService();
  final _evalSvc    = EvaluationService();
  final _answerCtrl = TextEditingController();

  List<Question>      _questions = [];
  Question?           _current;
  EvaluationResponse? _result;
  bool                _loading  = false;
  bool                _qLoading = true;
  String              _error    = '';
  String              _view     = 'list'; // list | write | result | local_result

  // Local fallback: synthetic question id → model answer
  final Map<String, String> _localAnswers = {};

  // Group questions by marks: 1 → 2 → 5 → 10
  static const _markOrder = [1, 2, 5, 10];

  Map<int, List<Question>> get _byMarks {
    final map = <int, List<Question>>{};
    for (final q in _questions) {
      (map[q.marks] ??= []).add(q);
    }
    return map;
  }

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    try {
      final qs = await _syllSvc.getQuestions(widget.chapterSlug);
      if (qs.isNotEmpty) {
        if (mounted) setState(() { _questions = qs; _qLoading = false; });
        return;
      }
    } catch (_) {}
    // Fallback: load written questions from local practice_data.json
    await _loadLocal();
  }

  Future<void> _loadLocal() async {
    try {
      final examQs = await ExamPracticeService.getQuestions(widget.chapterSlug);
      final written = examQs.where((q) => q.type == ExamQuestionType.written).toList();
      int idx = 0;
      final synths = written.map((q) {
        final id = 'local_${idx++}';
        _localAnswers[id] = q.modelAnswer ?? '';
        return Question(
          id:           id,
          questionText: _stripHtml(q.html ?? ''),
          marks:        q.marks,
          questionType: 'written',
          isValidated:  false,
        );
      }).toList();
      if (mounted) setState(() { _questions = synths; _qLoading = false; });
    } catch (e) {
      if (mounted) setState(() { _error = e.toString(); _qLoading = false; });
    }
  }

  static String _stripHtml(String html) =>
      html.replaceAll(RegExp(r'<[^>]*>'), '').trim();

  @override
  void dispose() {
    _answerCtrl.dispose();
    super.dispose();
  }

  void _startQuestion(Question q) {
    setState(() {
      _current = q;
      _answerCtrl.clear();
      _result = null;
      _error  = '';
      _view   = 'write';
    });
  }

  Future<void> _submit() async {
    final text = _answerCtrl.text.trim();
    if (text.length < 10) {
      setState(() => _error = 'Please write at least 10 characters.');
      return;
    }

    // Local question: show model answer comparison (no backend call)
    if (_current!.id.startsWith('local_')) {
      setState(() { _view = 'local_result'; _error = ''; });
      return;
    }

    setState(() { _loading = true; _error = ''; });
    try {
      final res = await _evalSvc.submit(
        questionId:    _current!.id,
        studentAnswer: text,
      );
      setState(() { _result = res; _view = 'result'; });
    } catch (e) {
      setState(() => _error = e.toString());
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _retry() async {
    final text = _answerCtrl.text.trim();
    if (text.length < 10) {
      setState(() => _error = 'Please write at least 10 characters.');
      return;
    }
    setState(() { _loading = true; _error = ''; });
    try {
      final res = await _evalSvc.retry(
        responseId: _result!.responseId,
        newAnswer:  text,
      );
      setState(() => _result = res);
    } catch (e) {
      setState(() => _error = e.toString());
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  // ── List view ──────────────────────────────────────────────────────────
  Widget _buildList() {
    if (_qLoading) {
      return const Center(
        child: Padding(padding: EdgeInsets.all(32), child: CircularProgressIndicator()),
      );
    }
    if (_error.isNotEmpty) {
      return ListView(
        padding: const EdgeInsets.all(16),
        children: [ErrorView(message: _error)],
      );
    }
    if (_questions.isEmpty) {
      return const Center(
        child: Padding(
          padding: EdgeInsets.all(32),
          child: Text('No questions yet for this chapter.',
              style: TextStyle(color: AppTheme.textMuted)),
        ),
      );
    }

    final groups  = _byMarks;
    final ordered = _markOrder.where(groups.containsKey).toList();

    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
      children: [
        for (final marks in ordered) ...[
          _PartHeader(
            label: _questions.firstWhere((q) => q.marks == marks).partLabel,
            marks: marks,
          ),
          const SizedBox(height: 8),
          ...groups[marks]!.map((q) => Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: _QuestionCard(question: q, onAnswer: _startQuestion),
          )),
          const SizedBox(height: 16),
        ],
      ],
    );
  }

  // ── Write view ─────────────────────────────────────────────────────────
  Widget _buildWrite() => ListView(
    padding: const EdgeInsets.all(16),
    children: [
      // Section callout — teal left border style matching web
      Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: AppTheme.brand.withAlpha(15),
          borderRadius: BorderRadius.circular(10),
          border: Border(
            left: BorderSide(color: AppTheme.brand, width: 3),
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            MarksChip(marks: _current!.marks),
            const SizedBox(height: 8),
            Text(
              _current!.questionText,
              style: const TextStyle(
                fontSize: 15,
                fontWeight: FontWeight.w600,
                color: AppTheme.textPrimary,
              ),
            ),
          ],
        ),
      ),
      const SizedBox(height: 16),
      const Text('Your Answer',
          style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600,
              color: AppTheme.textSecondary)),
      const SizedBox(height: 8),
      TextField(
        controller:  _answerCtrl,
        maxLines:    _current!.marks >= 5 ? 12 : 6,
        decoration:  InputDecoration(
          hintText: _current!.writingHint,
          hintStyle: const TextStyle(color: AppTheme.textMuted, fontSize: 13),
        ),
      ),
      const SizedBox(height: 12),
      if (_error.isNotEmpty) ...[
        ErrorView(message: _error),
        const SizedBox(height: 12),
      ],
      AppButton(
        label:     '🤖 Evaluate My Answer',
        onPressed: _submit,
        loading:   _loading,
      ),
    ],
  );

  // ── Result view ─────────────────────────────────────────────────────────
  Widget _buildResult() => ListView(
    padding: const EdgeInsets.all(16),
    children: [
      ScoreCard(result: _result!),
      const SizedBox(height: 12),

      if (_result!.feedback.strengths.isNotEmpty)
        _feedbackCard('✅ Strengths', _result!.feedback.strengths,
            const Color(0xFFF0FDF4), const Color(0xFF15803D)),

      if (_result!.feedback.weaknesses.isNotEmpty)
        _feedbackCard('⚠️ Needs Improvement', _result!.feedback.weaknesses,
            const Color(0xFFFEF2F2), const Color(0xFFB91C1C)),

      if (_result!.feedback.missingPoints.isNotEmpty)
        _feedbackCard('📌 Missing Points', _result!.feedback.missingPoints,
            const Color(0xFFFFFBEB), const Color(0xFF92400E)),

      if (_result!.feedback.structureComment.isNotEmpty ||
          _result!.feedback.grammarComment.isNotEmpty)
        Card(
          child: Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (_result!.feedback.structureComment.isNotEmpty)
                  Text('📐 ${_result!.feedback.structureComment}',
                      style: const TextStyle(fontSize: 13)),
                if (_result!.feedback.grammarComment.isNotEmpty) ...[
                  const SizedBox(height: 4),
                  Text('✏️ ${_result!.feedback.grammarComment}',
                      style: const TextStyle(fontSize: 13)),
                ],
              ],
            ),
          ),
        ),

      if (_result!.improvedAnswer.isNotEmpty) ...[
        const SizedBox(height: 8),
        Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color:        const Color(0xFFF0FDF4),
            border:       Border.all(color: const Color(0xFFBBF7D0)),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('⭐ Model Answer (Full Marks)',
                  style: TextStyle(
                    fontWeight: FontWeight.w700,
                    color: Color(0xFF15803D),
                  )),
              const SizedBox(height: 8),
              Text(_result!.improvedAnswer,
                  style: const TextStyle(fontSize: 13, height: 1.6)),
            ],
          ),
        ),
      ],

      const SizedBox(height: 16),
      const Text('Rewrite your answer:',
          style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600,
              color: AppTheme.textSecondary)),
      const SizedBox(height: 8),
      TextField(
        controller: _answerCtrl,
        maxLines:   _current!.marks >= 5 ? 12 : 6,
        decoration: const InputDecoration(
          hintText: 'Improve your answer using the feedback above...',
        ),
      ),
      const SizedBox(height: 12),
      if (_error.isNotEmpty) ...[
        ErrorView(message: _error),
        const SizedBox(height: 12),
      ],
      Row(
        children: [
          Expanded(
            child: AppButton(
              label:     '🔁 Re-evaluate',
              onPressed: _retry,
              loading:   _loading,
            ),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: AppButton(
              label:     'Try Another',
              outlined:  true,
              onPressed: () => setState(() {
                _view    = 'list';
                _result  = null;
                _current = null;
                _error   = '';
              }),
            ),
          ),
        ],
      ),
    ],
  );

  Widget _feedbackCard(String title, List<String> items, Color bg, Color fg) =>
      Padding(
        padding: const EdgeInsets.only(bottom: 8),
        child: Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: bg, borderRadius: BorderRadius.circular(12),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title,
                  style: TextStyle(
                    fontWeight: FontWeight.w700, color: fg, fontSize: 13,
                  )),
              const SizedBox(height: 6),
              ...items.map((i) => Padding(
                padding: const EdgeInsets.only(bottom: 3),
                child: Text('• $i',
                    style: TextStyle(fontSize: 13, color: fg)),
              )),
            ],
          ),
        ),
      );

  // ── Local result view (model answer comparison) ────────────────────────
  Widget _buildLocalResult() {
    final modelAnswer = _localAnswers[_current!.id] ?? '';
    final userAnswer  = _answerCtrl.text.trim();
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        // Question recap
        Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: AppTheme.brand.withAlpha(15),
            borderRadius: BorderRadius.circular(10),
            border: Border(left: BorderSide(color: AppTheme.brand, width: 3)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              MarksChip(marks: _current!.marks),
              const SizedBox(height: 8),
              Text(_current!.questionText,
                  style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600,
                      color: AppTheme.textPrimary)),
            ],
          ),
        ),
        const SizedBox(height: 16),

        // Your answer
        _answerBlock('YOUR ANSWER', userAnswer.isEmpty ? '—' : userAnswer,
            AppTheme.surface, AppTheme.border, AppTheme.textSecondary),
        const SizedBox(height: 10),

        // Model answer
        _answerBlock('MODEL ANSWER', modelAnswer,
            const Color(0xFFF0FDF4), const Color(0xFFBBF7D0), const Color(0xFF15803D)),
        const SizedBox(height: 24),

        // Rewrite
        const Text('Rewrite your answer:',
            style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600,
                color: AppTheme.textSecondary)),
        const SizedBox(height: 8),
        TextField(
          controller: _answerCtrl,
          maxLines:   _current!.marks >= 5 ? 10 : 5,
          decoration: const InputDecoration(
            hintText: 'Improve your answer using the model answer above...',
          ),
        ),
        const SizedBox(height: 12),
        AppButton(
          label:     'Try Another Question',
          onPressed: () => setState(() { _view = 'list'; _error = ''; }),
        ),
      ],
    );
  }

  Widget _answerBlock(String label, String text, Color bg, Color border, Color labelColor) =>
      Container(
        width:   double.infinity,
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color:        bg,
          border:       Border.all(color: border),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(label,
                style: TextStyle(fontSize: 9, fontWeight: FontWeight.w700,
                    color: labelColor, letterSpacing: 0.6)),
            const SizedBox(height: 6),
            Text(text,
                style: const TextStyle(fontSize: 13, height: 1.6,
                    color: AppTheme.textPrimary)),
          ],
        ),
      );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.surface,
      appBar: AppBar(
        title: Text(_view == 'list'
            ? 'Practice'
            : _view == 'write'
                ? 'Write Answer'
                : 'Your Results'),
        leading: _view != 'list'
            ? IconButton(
                icon:     const Icon(Icons.arrow_back),
                onPressed: () => setState(() {
                  _view  = (_view == 'result' || _view == 'local_result') ? 'write' : 'list';
                  _error = '';
                }),
              )
            : null,
      ),
      body: switch (_view) {
        'write'        => _buildWrite(),
        'result'       => _buildResult(),
        'local_result' => _buildLocalResult(),
        _              => _buildList(),
      },
    );
  }
}

class _PartHeader extends StatelessWidget {
  final String label;
  final int    marks;
  const _PartHeader({required this.label, required this.marks});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(14, 10, 14, 10),
      decoration: BoxDecoration(
        color: AppTheme.brand.withAlpha(15),
        borderRadius: BorderRadius.circular(8),
        border: Border(
          left: BorderSide(color: AppTheme.brand, width: 3),
        ),
      ),
      child: Row(
        children: [
          Expanded(
            child: Text(
              label,
              style: const TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w700,
                color: AppTheme.brand,
              ),
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
            decoration: BoxDecoration(
              color:        AppTheme.brand.withAlpha(22),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Text(
              '$marks mark${marks != 1 ? 's' : ''}',
              style: const TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.w600,
                color: AppTheme.brand,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _QuestionCard extends StatelessWidget {
  final Question           question;
  final void Function(Question) onAnswer;
  const _QuestionCard({required this.question, required this.onAnswer});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color:        Colors.white,
        borderRadius: BorderRadius.circular(12),
        border:       Border.all(color: AppTheme.border),
      ),
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  MarksChip(marks: question.marks),
                  const SizedBox(height: 8),
                  Text(
                    question.questionText,
                    style: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w500,
                      color: AppTheme.textPrimary,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(width: 12),
            ElevatedButton(
              onPressed: () => onAnswer(question),
              style: ElevatedButton.styleFrom(
                minimumSize: const Size(64, 36),
                padding: const EdgeInsets.symmetric(horizontal: 12),
                textStyle: const TextStyle(fontSize: 13),
              ),
              child: const Text('Answer'),
            ),
          ],
        ),
      ),
    );
  }
}
