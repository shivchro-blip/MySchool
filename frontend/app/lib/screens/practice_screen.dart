import 'package:flutter/material.dart';
import '../models/syllabus_model.dart';
import '../models/evaluation_model.dart';
import '../services/syllabus_service.dart';
import '../services/evaluation_service.dart';
import '../widgets/app_button.dart';
import '../widgets/marks_chip.dart';
import '../widgets/score_card.dart';
import '../widgets/error_view.dart';

class PracticeScreen extends StatefulWidget {
  final String chapterId;
  const PracticeScreen({super.key, required this.chapterId});
  @override
  State<PracticeScreen> createState() => _PracticeScreenState();
}

class _PracticeScreenState extends State<PracticeScreen> {
  final _syllSvc  = SyllabusService();
  final _evalSvc  = EvaluationService();
  final _answerCtrl = TextEditingController();

  List<Question>     _questions = [];
  Question?          _current;
  EvaluationResponse? _result;
  bool               _loading  = false;
  bool               _qLoading = true;
  String             _error    = '';
  String             _view     = 'list'; // list | write | result

  @override
  void initState() {
    super.initState();
    _syllSvc.getQuestions(widget.chapterId).then((q) {
      setState(() { _questions = q; _qLoading = false; });
    }).catchError((e) {
      setState(() { _error = e.toString(); _qLoading = false; });
    });
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
      setState(() => _loading = false);
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
      setState(() => _loading = false);
    }
  }

  // ── List view ───────────────────────────────────────────────────────────
  Widget _buildList() => ListView(
    padding: const EdgeInsets.all(16),
    children: [
      if (_qLoading)
        const Center(child: CircularProgressIndicator()),
      if (_error.isNotEmpty) ErrorView(message: _error),
      ..._questions.map((q) => Padding(
        padding: const EdgeInsets.only(bottom: 8),
        child: Card(
          child: Padding(
            padding: const EdgeInsets.all(12),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      MarksChip(marks: q.marks),
                      const SizedBox(height: 8),
                      Text(q.questionText,
                          style: const TextStyle(
                            fontSize: 14, fontWeight: FontWeight.w500,
                          )),
                    ],
                  ),
                ),
                const SizedBox(width: 12),
                ElevatedButton(
                  onPressed: () => _startQuestion(q),
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
        ),
      )),
    ],
  );

  // ── Write view ──────────────────────────────────────────────────────────
  Widget _buildWrite() => ListView(
    padding: const EdgeInsets.all(16),
    children: [
      Card(
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              MarksChip(marks: _current!.marks),
              const SizedBox(height: 10),
              Text(_current!.questionText,
                  style: const TextStyle(
                    fontSize: 15, fontWeight: FontWeight.w600,
                  )),
            ],
          ),
        ),
      ),
      const SizedBox(height: 16),
      const Text('Your Answer',
          style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
      const SizedBox(height: 8),
      TextField(
        controller:  _answerCtrl,
        maxLines:    10,
        decoration:  InputDecoration(hintText: _current!.writingHint),
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

      // Strengths
      if (_result!.feedback.strengths.isNotEmpty)
        _feedbackCard('✅ Strengths', _result!.feedback.strengths,
            const Color(0xFFF0FDF4), const Color(0xFF15803D)),

      // Weaknesses
      if (_result!.feedback.weaknesses.isNotEmpty)
        _feedbackCard('⚠️ Needs Improvement', _result!.feedback.weaknesses,
            const Color(0xFFFEF2F2), const Color(0xFFB91C1C)),

      // Missing points
      if (_result!.feedback.missingPoints.isNotEmpty)
        _feedbackCard('📌 Missing Points', _result!.feedback.missingPoints,
            const Color(0xFFFFFBEB), const Color(0xFF92400E)),

      // Comments
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

      // Model answer
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
                    color:      Color(0xFF15803D),
                  )),
              const SizedBox(height: 8),
              Text(_result!.improvedAnswer,
                  style: const TextStyle(fontSize: 13, height: 1.6)),
            ],
          ),
        ),
      ],

      // Retry
      const SizedBox(height: 16),
      const Text('Rewrite your answer:',
          style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
      const SizedBox(height: 8),
      TextField(
        controller: _answerCtrl,
        maxLines:   8,
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
              label:    'Try Another',
              outlined: true,
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
            color:        bg,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title,
                  style: TextStyle(
                    fontWeight: FontWeight.w700,
                    color:      fg,
                    fontSize:   13,
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(_view == 'list'
            ? 'Practice'
            : _view == 'write'
                ? 'Write Answer'
                : 'Your Results'),
        leading: _view != 'list'
            ? IconButton(
                icon:      const Icon(Icons.arrow_back),
                onPressed: () => setState(() {
                  _view   = _view == 'result' ? 'write' : 'list';
                  _error  = '';
                }),
              )
            : null,
      ),
      body: switch (_view) {
        'write'  => _buildWrite(),
        'result' => _buildResult(),
        _        => _buildList(),
      },
    );
  }
}
