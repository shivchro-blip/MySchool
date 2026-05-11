import 'dart:convert';
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../config/theme.dart';
import '../models/exam_practice_model.dart';
import '../models/syllabus_model.dart';
import '../services/exam_practice_service.dart';
import '../utils/answer_validation.dart';
import '../widgets/app_button.dart';

// ── HTML inline renderer (handles <u> tags) ───────────────────────────────

Widget _renderHtml(String html, TextStyle style) {
  final spans = <InlineSpan>[];
  final regex = RegExp(r'<u>(.*?)<\/u>', caseSensitive: false);
  int last = 0;
  for (final m in regex.allMatches(html)) {
    if (m.start > last) {
      spans.add(TextSpan(text: html.substring(last, m.start)));
    }
    spans.add(TextSpan(
      text:  m.group(1),
      style: style.copyWith(decoration: TextDecoration.underline),
    ));
    last = m.end;
  }
  if (last < html.length) {
    spans.add(TextSpan(text: html.substring(last)));
  }
  return RichText(text: TextSpan(style: style, children: spans));
}

// ── AnswerPair (results view) ─────────────────────────────────────────────

class _AnswerPair extends StatelessWidget {
  final String studentText;
  final String modelAnswer;
  const _AnswerPair({required this.studentText, required this.modelAnswer});

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(child: _col(context, 'YOUR ANSWER',
            studentText.trim().isEmpty ? '—' : studentText,
            AppTheme.surfaceOf(context), AppTheme.borderOf(context),
            AppTheme.text2Of(context))),
        const SizedBox(width: 8),
        Expanded(child: _col(context, 'EXPECTED ANSWER', modelAnswer,
            AppTheme.successBgOf(context), AppTheme.successBorderOf(context),
            AppTheme.successFgOf(context))),
      ],
    );
  }

  Widget _col(BuildContext ctx, String label, String text,
      Color bg, Color border, Color labelColor) =>
      Container(
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
          color:        bg,
          border:       Border.all(color: border),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(label,
                style: TextStyle(
                  fontSize: 9, fontWeight: FontWeight.w700,
                  color: labelColor, letterSpacing: 0.6,
                )),
            const SizedBox(height: 5),
            Text(text,
                style: const TextStyle(fontSize: 12, height: 1.5)),
          ],
        ),
      );
}

// ── Quick-nav dot groups ──────────────────────────────────────────────────

class _QuickNavDots extends StatelessWidget {
  final List<ExamQuestion> questions;
  final int                questionIdx;
  final Map<int, Object>   answers;
  final ValueChanged<int>  onGoto;

  const _QuickNavDots({
    required this.questions,
    required this.questionIdx,
    required this.answers,
    required this.onGoto,
  });

  @override
  Widget build(BuildContext context) {
    final groups = [
      ('MCQ · 1 mark',       questions.where((q) => q.type == ExamQuestionType.mcq).toList()),
      ('Reference · 2 marks',questions.where((q) => q.type == ExamQuestionType.reference).toList()),
      ('Short Answer · 3m',  questions.where((q) => q.type == ExamQuestionType.written && q.marks <= 3).toList()),
      ('Essay · 5 marks',    questions.where((q) => q.type == ExamQuestionType.written && q.marks > 3).toList()),
    ].where((g) => g.$2.isNotEmpty).toList();

    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color:        AppTheme.cardOf(context),
        border:       Border.all(color: AppTheme.borderOf(context)),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          for (final g in groups) ...[
            if (g != groups.first) const SizedBox(height: 10),
            Text(g.$1,
                style: TextStyle(
                  fontSize: 9, fontWeight: FontWeight.w700,
                  color: AppTheme.textMutedOf(context), letterSpacing: 0.6,
                )),
            const SizedBox(height: 5),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: g.$2.map((q) {
                  final gi      = questions.indexOf(q);
                  final current = gi == questionIdx;
                  final isMcq   = q.type == ExamQuestionType.mcq;
                  final done    = isMcq
                      ? answers[q.id] != null
                      : q.type == ExamQuestionType.reference
                          ? (answers[q.id] as Map<Object, Object>?)
                              ?.values.any((v) => v.toString().trim().isNotEmpty) ?? false
                          : (answers[q.id] as String?)?.trim().isNotEmpty ?? false;

                  Color bg; Color fg;
                  if (current) { bg = AppTheme.brand; fg = Colors.white; }
                  else if (isMcq && done)   {
                    bg = AppTheme.successBgOf(context);
                    fg = AppTheme.successFgOf(context);
                  }
                  else if (!isMcq && done)  {
                    bg = AppTheme.brandLightOf(context);
                    fg = AppTheme.brand;
                  }
                  else {
                    bg = AppTheme.surfaceOf(context);
                    fg = AppTheme.textMutedOf(context);
                  }

                  return GestureDetector(
                    onTap: () => onGoto(gi),
                    child: Container(
                      width: 26, height: 26,
                      margin: const EdgeInsets.only(right: 4),
                      decoration: BoxDecoration(
                        color:        bg,
                        borderRadius: BorderRadius.circular(6),
                        border: current ? null : Border.all(color: AppTheme.borderOf(context)),
                      ),
                      alignment: Alignment.center,
                      child: Text('${gi + 1}',
                          style: TextStyle(
                            fontSize: 9, fontWeight: FontWeight.w700, color: fg,
                          )),
                    ),
                  );
                }).toList(),
              ),
            ),
          ],
        ],
      ),
    );
  }
}

// ── Main screen ───────────────────────────────────────────────────────────

class ExamPracticeScreen extends StatefulWidget {
  final String   classLevel;
  final String   subjectSlug;
  final String   chapterSlug;
  final Chapter? chapter;
  const ExamPracticeScreen({
    super.key,
    required this.classLevel,
    required this.subjectSlug,
    required this.chapterSlug,
    this.chapter,
  });

  @override
  State<ExamPracticeScreen> createState() => _ExamPracticeScreenState();
}

class _ExamPracticeScreenState extends State<ExamPracticeScreen> {
  List<ExamQuestion> _questions = [];
  bool               _loading   = true;
  String?            _error;

  final List<ExamAttempt> _attempts = [ExamAttempt(id: 1)];
  int                _currentAttemptId   = 1;
  String             _view               = 'exam';
  int?               _viewingAttemptId;
  int                _questionIdx        = 0;

  final Map<String, TextEditingController> _ctrlMap          = {};
  final Map<String, FocusNode>             _focusMap         = {};
  final Map<String, String>                _validationErrors = {};

  ExamAttempt get _currentAttempt =>
      _attempts.firstWhere((a) => a.id == _currentAttemptId);

  ExamAttempt? get _resultsAttempt {
    if (_viewingAttemptId != null) {
      return _attempts.firstWhere((a) => a.id == _viewingAttemptId);
    }
    return _view == 'results' ? _currentAttempt : null;
  }

  List<ExamQuestion> get _mcqQuestions =>
      _questions.where((q) => q.type == ExamQuestionType.mcq).toList();

  int get _mcqDone =>
      _mcqQuestions.where((q) => _currentAttempt.answers[q.id] != null).length;

  TextEditingController _getCtrl(int qId, [int? subIdx]) {
    final key = subIdx != null ? '${qId}_$subIdx' : '$qId';
    return _ctrlMap.putIfAbsent(key, () {
      final ans = _currentAttempt.answers[qId];
      String init = '';
      if (subIdx != null) {
        init = (ans as Map<Object, Object>?)?[subIdx] as String? ?? '';
      } else {
        init = ans as String? ?? '';
      }
      return TextEditingController(text: init);
    });
  }

  FocusNode _getFocusNode(int qId, [int? subIdx]) {
    final key = subIdx != null ? '${qId}_$subIdx' : '$qId';
    return _focusMap.putIfAbsent(key, () {
      final node = FocusNode();
      node.addListener(() {
        if (!node.hasFocus) _validateField(qId, subIdx);
      });
      return node;
    });
  }

  void _validateField(int qId, [int? subIdx]) {
    final key  = subIdx != null ? '${qId}_$subIdx' : '$qId';
    final ctrl = _ctrlMap[key];
    if (ctrl == null) return;
    final result = validateStudentAnswer(ctrl.text);
    if (!mounted) return;
    setState(() {
      if (result.message != null) {
        _validationErrors[key] = result.message!;
      } else {
        _validationErrors.remove(key);
      }
    });
  }

  // Validate only the current question's written fields. Returns error map.
  Map<String, String> _validateCurrentQuestion(ExamQuestion q) {
    final errors = <String, String>{};
    if (q.type == ExamQuestionType.reference) {
      for (int j = 0; j < (q.subs?.length ?? 0); j++) {
        final key  = '${q.id}_$j';
        final ctrl = _ctrlMap[key];
        final text = ctrl?.text ??
            (_currentAttempt.answers[q.id] as Map<Object, Object>?)?[j] as String? ?? '';
        if (text.trim().isEmpty) continue;
        final res = validateStudentAnswer(text);
        if (res.message != null) errors[key] = res.message!;
      }
    } else if (q.type == ExamQuestionType.written) {
      final key  = '${q.id}';
      final ctrl = _ctrlMap[key];
      final text = ctrl?.text ?? _currentAttempt.answers[q.id] as String? ?? '';
      if (text.trim().isNotEmpty) {
        final res = validateStudentAnswer(text);
        if (res.message != null) errors[key] = res.message!;
      }
    }
    return errors;
  }

  void _handleNext() {
    final q      = _questions[_questionIdx];
    final errors = _validateCurrentQuestion(q);
    if (errors.isNotEmpty) {
      setState(() => _validationErrors.addAll(errors));
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Please correct the highlighted answers before continuing.'),
          duration: Duration(seconds: 3),
        ),
      );
      return;
    }
    setState(() => _questionIdx++);
  }

  void _clearCtrl() {
    for (final c in _ctrlMap.values) { c.dispose(); }
    _ctrlMap.clear();
    for (final n in _focusMap.values) { n.dispose(); }
    _focusMap.clear();
  }

  @override
  void initState() {
    super.initState();
    ExamPracticeService.getQuestions(widget.classLevel, widget.subjectSlug, widget.chapterSlug).then((qs) {
      if (mounted) setState(() { _questions = qs; _loading = false; });
    }).catchError((e) {
      if (mounted) setState(() { _error = e.toString(); _loading = false; });
    });
  }

  @override
  void dispose() {
    _clearCtrl();
    super.dispose();
  }

  void _selectOption(int qId, int optIdx) {
    setState(() => _currentAttempt.answers[qId] = optIdx);
  }

  void _updateText(int qId, int? subIdx, String val) {
    final ans = _currentAttempt.answers;
    if (subIdx != null) {
      final map = Map<Object, Object>.from(ans[qId] as Map<Object, Object>? ?? {});
      map[subIdx] = val;
      ans[qId] = map;
    } else {
      ans[qId] = val;
    }
    // Clear validation error when the field becomes valid or empty
    final key = subIdx != null ? '${qId}_$subIdx' : '$qId';
    if (_validationErrors.containsKey(key)) {
      final result = validateStudentAnswer(val);
      if (result.valid || val.trim().isEmpty) {
        setState(() => _validationErrors.remove(key));
      }
    }
  }

  void _openSubmitDialog() {
    final errors = <String, String>{};
    int firstInvalidIdx = -1;
    for (int i = 0; i < _questions.length; i++) {
      final q = _questions[i];
      if (q.type == ExamQuestionType.mcq) continue;
      if (q.type == ExamQuestionType.reference) {
        for (int j = 0; j < (q.subs?.length ?? 0); j++) {
          final key  = '${q.id}_$j';
          final ctrl = _ctrlMap[key];
          final text = ctrl?.text ??
              (_currentAttempt.answers[q.id] as Map<Object, Object>?)?[j] as String? ?? '';
          final res = validateStudentAnswer(text);
          if (res.message != null) {
            errors[key] = res.message!;
            if (firstInvalidIdx == -1) firstInvalidIdx = i;
          }
        }
      } else {
        final key  = '${q.id}';
        final ctrl = _ctrlMap[key];
        final text = ctrl?.text ?? _currentAttempt.answers[q.id] as String? ?? '';
        final res  = validateStudentAnswer(text);
        if (res.message != null) {
          errors[key] = res.message!;
          if (firstInvalidIdx == -1) firstInvalidIdx = i;
        }
      }
    }

    if (errors.isNotEmpty) {
      setState(() {
        _validationErrors.addAll(errors);
        _questionIdx = firstInvalidIdx;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Some answers need correction before submitting.'),
          duration: Duration(seconds: 3),
        ),
      );
      return;
    }

    showDialog<void>(
      context: context,
      builder: (dialogContext) => AlertDialog(
        title: const Text('Submit Exam?'),
        content: const Text(
            'Once submitted your answers will be locked. '
            'This chapter will be marked as practised.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(dialogContext),
            child: const Text('Cancel'),
          ),
          FilledButton(
            onPressed: () {
              Navigator.pop(dialogContext);
              _confirmSubmit();
            },
            child: const Text('Submit'),
          ),
        ],
      ),
    );
  }

  void _confirmSubmit() {
    final attempt = _currentAttempt;
    var score = 0;
    for (final q in _mcqQuestions) {
      if (attempt.answers[q.id] == q.correct) score++;
    }
    final submittedAt = DateTime.now();
    setState(() {
      attempt.status      = 'submitted';
      attempt.mcqScore    = score;
      attempt.submittedAt = submittedAt;
      _viewingAttemptId   = _currentAttemptId;
      _view               = 'results';
    });
    final slug  = widget.chapterSlug;
    final total = _mcqQuestions.length;
    SharedPreferences.getInstance().then((prefs) {
      final key     = 'exam_coach_sessions_$slug';
      final stored  = prefs.getStringList(key) ?? [];
      final session = jsonEncode({'score': score, 'total': total, 'date': submittedAt.toIso8601String()});
      prefs.setStringList(key, [...stored, session]);
    });
  }

  void _handleRetake() {
    final newId = _attempts.map((a) => a.id).reduce(max) + 1;
    _clearCtrl();
    setState(() {
      _validationErrors.clear();
      _attempts.add(ExamAttempt(id: newId));
      _currentAttemptId = newId;
      _viewingAttemptId = null;
      _questionIdx      = 0;
      _view             = 'exam';
    });
  }

  // ── Exam view ─────────────────────────────────────────────────────────
  Widget _buildExamView() {
    final q       = _questions[_questionIdx];
    final total   = _questions.length;
    final answers = _currentAttempt.answers;
    final mcqTotal = _mcqQuestions.length;

    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
      key: ValueKey(_questionIdx),
      children: [

        if (mcqTotal > 0) ...[
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color:        AppTheme.cardOf(context),
              border:       Border.all(color: AppTheme.borderOf(context)),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('Q${_questionIdx + 1} of $total',
                        style: TextStyle(
                          fontSize: 12, fontWeight: FontWeight.w600,
                          color: AppTheme.text2Of(context),
                        )),
                    Text('MCQ: $_mcqDone/$mcqTotal',
                        style: TextStyle(
                          fontSize: 11, color: AppTheme.textMutedOf(context),
                        )),
                  ],
                ),
                const SizedBox(height: 8),
                ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: LinearProgressIndicator(
                    value: mcqTotal > 0 ? _mcqDone / mcqTotal : 0,
                    backgroundColor: AppTheme.surfaceOf(context),
                    color: AppTheme.brand,
                    minHeight: 6,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),
        ],

        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color:        AppTheme.cardOf(context),
            border:       Border.all(color: AppTheme.borderOf(context)),
            borderRadius: BorderRadius.circular(14),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('Question ${_questionIdx + 1}',
                      style: TextStyle(
                        fontSize: 10, fontWeight: FontWeight.w700,
                        color: AppTheme.textMutedOf(context), letterSpacing: 0.8,
                      )),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                    decoration: BoxDecoration(
                      color:        AppTheme.surfaceOf(context),
                      borderRadius: BorderRadius.circular(10),
                      border:       Border.all(color: AppTheme.borderOf(context)),
                    ),
                    child: Text('${q.marks} mark${q.marks > 1 ? 's' : ''}',
                        style: TextStyle(
                          fontSize: 10, fontWeight: FontWeight.w600,
                          color: AppTheme.textMutedOf(context),
                        )),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              if (q.type == ExamQuestionType.mcq)
                _buildMcqQuestion(q, answers),
              if (q.type == ExamQuestionType.reference)
                _buildReferenceQuestion(q),
              if (q.type == ExamQuestionType.written)
                _buildWrittenQuestion(q),
            ],
          ),
        ),
        const SizedBox(height: 12),

        Row(
          children: [
            Expanded(
              child: OutlinedButton.icon(
                onPressed: _questionIdx > 0
                    ? () => setState(() => _questionIdx--)
                    : null,
                icon:  const Icon(Icons.chevron_left, size: 18),
                label: const Text('Previous'),
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: OutlinedButton.icon(
                onPressed: _questionIdx < total - 1 ? _handleNext : null,
                icon:  const Icon(Icons.chevron_right, size: 18),
                label: const Text('Next'),
                iconAlignment: IconAlignment.end,
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),

        _QuickNavDots(
          questions:   _questions,
          questionIdx: _questionIdx,
          answers:     _currentAttempt.answers,
          onGoto:      (i) => setState(() => _questionIdx = i),
        ),
        const SizedBox(height: 16),

        AppButton(
          label:     'Submit Practice Exam',
          onPressed: _openSubmitDialog,
        ),
      ],
    );
  }

  Widget _buildMcqQuestion(ExamQuestion q, Map<int, Object> answers) {
    final chosen = answers[q.id] as int?;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (q.section != null && q.section!.isNotEmpty) ...[
          Text(q.section!,
              style: TextStyle(
                fontSize: 11, fontStyle: FontStyle.italic,
                color: AppTheme.textMutedOf(context),
              )),
          const SizedBox(height: 6),
        ],
        _renderHtml(q.html!,
            TextStyle(
              fontSize: 15, fontWeight: FontWeight.w600,
              color: AppTheme.textOf(context), height: 1.5,
            )),
        const SizedBox(height: 14),
        ...List.generate(q.options!.length, (i) {
          final isChosen = chosen == i;
          return GestureDetector(
            onTap: () => _selectOption(q.id, i),
            child: Container(
              margin: const EdgeInsets.only(bottom: 8),
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
              decoration: BoxDecoration(
                color:        isChosen ? AppTheme.brandLightOf(context) : AppTheme.cardOf(context),
                border: Border.all(
                  color: isChosen ? AppTheme.brand : AppTheme.borderOf(context),
                  width: isChosen ? 1.5 : 1,
                ),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Row(
                children: [
                  Container(
                    width: 22, height: 22,
                    decoration: BoxDecoration(
                      color:  isChosen ? AppTheme.brand : AppTheme.surfaceOf(context),
                      shape:  BoxShape.circle,
                      border: isChosen ? null : Border.all(color: AppTheme.borderOf(context)),
                    ),
                    alignment: Alignment.center,
                    child: Text(
                      String.fromCharCode(65 + i),
                      style: TextStyle(
                        fontSize: 10, fontWeight: FontWeight.w700,
                        color: isChosen ? Colors.white : AppTheme.textMutedOf(context),
                      ),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Text(q.options![i],
                        style: TextStyle(
                          fontSize: 13,
                          fontWeight: isChosen ? FontWeight.w600 : FontWeight.normal,
                          color: isChosen ? AppTheme.brandDark : AppTheme.textOf(context),
                        )),
                  ),
                ],
              ),
            ),
          );
        }),
      ],
    );
  }

  Widget _buildReferenceQuestion(ExamQuestion q) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: AppTheme.brandLightOf(context),
            borderRadius: BorderRadius.circular(8),
            border: const Border(left: BorderSide(color: AppTheme.brand, width: 3)),
          ),
          child: Text(q.verse ?? '',
              style: TextStyle(
                fontSize: 13, fontStyle: FontStyle.italic,
                color: AppTheme.textOf(context), height: 1.6,
              )),
        ),
        const SizedBox(height: 14),
        ...List.generate(q.subs!.length, (i) {
          final sub   = q.subs![i];
          final key   = '${q.id}_$i';
          final error = _validationErrors[key];
          return Padding(
            padding: const EdgeInsets.only(bottom: 14),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(sub.q,
                    style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
                const SizedBox(height: 8),
                TextField(
                  controller: _getCtrl(q.id, i),
                  focusNode:  _getFocusNode(q.id, i),
                  minLines:   3,
                  maxLines:   6,
                  onChanged:  (v) => _updateText(q.id, i, v),
                  decoration: InputDecoration(
                    hintText:  'Write your answer here…',
                    errorText: error,
                  ),
                ),
              ],
            ),
          );
        }),
      ],
    );
  }

  Widget _buildWrittenQuestion(ExamQuestion q) {
    final error = _validationErrors['${q.id}'];
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(q.html ?? '',
            style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600, height: 1.5)),
        const SizedBox(height: 14),
        TextField(
          controller: _getCtrl(q.id),
          focusNode:  _getFocusNode(q.id),
          minLines:   q.marks >= 5 ? 8 : 5,
          maxLines:   q.marks >= 5 ? 14 : 10,
          onChanged:  (v) => _updateText(q.id, null, v),
          decoration: InputDecoration(
            hintText:  'Write your answer here…',
            errorText: error,
          ),
        ),
      ],
    );
  }

  // ── Results view ──────────────────────────────────────────────────────
  Widget _buildResultsView() {
    final attempt    = _resultsAttempt!;
    final mcqQs      = _mcqQuestions;
    final writtenQs  = _questions.where((q) => q.type != ExamQuestionType.mcq).toList();
    final total      = mcqQs.length;
    final score      = attempt.mcqScore ?? 0;
    final pct        = total > 0 ? (score / total * 100).round() : 0;
    final scoreColor = pct >= 70 ? AppTheme.success
        : pct >= 40 ? AppTheme.warning : AppTheme.error;
    final attemptNum = _attempts.indexOf(attempt) + 1;

    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
      children: [

        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color:        AppTheme.cardOf(context),
            border:       Border.all(color: AppTheme.borderOf(context)),
            borderRadius: BorderRadius.circular(14),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Exam Submitted',
                          style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
                      Text(widget.chapter?.title ?? widget.chapterSlug,
                          style: TextStyle(fontSize: 12, color: AppTheme.textMutedOf(context))),
                    ],
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: AppTheme.successBgOf(context),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text('Submitted',
                        style: TextStyle(
                          fontSize: 12, fontWeight: FontWeight.w600,
                          color: AppTheme.successFgOf(context),
                        )),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Text('MCQ SCORE',
                  style: TextStyle(
                    fontSize: 9, fontWeight: FontWeight.w700,
                    color: AppTheme.textMutedOf(context), letterSpacing: 0.6,
                  )),
              const SizedBox(height: 4),
              Row(
                crossAxisAlignment: CrossAxisAlignment.baseline,
                textBaseline: TextBaseline.alphabetic,
                children: [
                  Text('$score',
                      style: const TextStyle(fontSize: 32, fontWeight: FontWeight.w800)),
                  Text(' / $total',
                      style: TextStyle(fontSize: 18, color: AppTheme.text2Of(context))),
                  const SizedBox(width: 8),
                  Text('· $pct%',
                      style: TextStyle(
                        fontSize: 20, fontWeight: FontWeight.w700,
                        color: scoreColor,
                      )),
                ],
              ),
              const SizedBox(height: 4),
              Text(
                'Attempt $attemptNum'
                '${attempt.submittedAt != null ? " · ${_fmtDate(attempt.submittedAt!)}" : ""}',
                style: TextStyle(fontSize: 11, color: AppTheme.textMutedOf(context)),
              ),
              const SizedBox(height: 10),
              ClipRRect(
                borderRadius: BorderRadius.circular(4),
                child: LinearProgressIndicator(
                  value: total > 0 ? score / total : 0,
                  backgroundColor: AppTheme.surfaceOf(context),
                  color: scoreColor,
                  minHeight: 8,
                ),
              ),
              if (writtenQs.isNotEmpty) ...[
                const SizedBox(height: 8),
                Text('${writtenQs.length} written question${writtenQs.length != 1 ? 's' : ''} · review below',
                    style: TextStyle(fontSize: 11, color: AppTheme.textMutedOf(context))),
              ],
            ],
          ),
        ),
        const SizedBox(height: 16),

        if (mcqQs.isNotEmpty) ...[
          Text('MCQ REVIEW',
              style: TextStyle(
                fontSize: 9, fontWeight: FontWeight.w700,
                color: AppTheme.textMutedOf(context), letterSpacing: 0.6,
              )),
          const SizedBox(height: 8),
          ...mcqQs.asMap().entries.map((e) {
            final qi      = e.key;
            final q       = e.value;
            final chosen  = attempt.answers[q.id] as int?;
            final correct = chosen == q.correct;
            return Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color:  AppTheme.cardOf(context),
                  border: Border.all(
                      color: correct
                          ? AppTheme.successBorderOf(context)
                          : AppTheme.borderOf(context)),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Icon(
                          correct ? Icons.check_circle : Icons.cancel,
                          color: correct ? AppTheme.success : AppTheme.error,
                          size: 16,
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: _renderHtml(
                            'Q${qi + 1}. ${q.html!}',
                            TextStyle(
                              fontSize: 13, fontWeight: FontWeight.w600,
                              color: AppTheme.textOf(context), height: 1.4,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    ...List.generate(q.options!.length, (i) {
                      final isChosen = chosen == i;
                      final isAnswer = q.correct == i;
                      Color fg = AppTheme.textMutedOf(context);
                      if (isAnswer)              fg = AppTheme.successFgOf(context);
                      if (isChosen && !correct)  fg = AppTheme.error;
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 4),
                        child: Row(
                          children: [
                            Container(
                              width: 16, height: 16,
                              decoration: BoxDecoration(
                                color: isAnswer
                                    ? AppTheme.successBgOf(context)
                                    : isChosen ? AppTheme.errorBgOf(context) : AppTheme.surfaceOf(context),
                                shape:  BoxShape.circle,
                                border: Border.all(color: AppTheme.borderOf(context)),
                              ),
                              alignment: Alignment.center,
                              child: Text(String.fromCharCode(65 + i),
                                  style: TextStyle(fontSize: 8, color: fg, fontWeight: FontWeight.w700)),
                            ),
                            const SizedBox(width: 8),
                            Expanded(
                              child: Text(q.options![i],
                                  style: TextStyle(
                                    fontSize: 12,
                                    color: fg,
                                    fontWeight: isAnswer ? FontWeight.w600 : FontWeight.normal,
                                    decoration: isChosen && !correct ? TextDecoration.lineThrough : null,
                                  )),
                            ),
                            if (isAnswer)
                              const Icon(Icons.check_circle, size: 12, color: AppTheme.success),
                          ],
                        ),
                      );
                    }),
                    if (!correct && q.hint != null) ...[
                      const SizedBox(height: 8),
                      Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color:        AppTheme.brandLightOf(context),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text('Hint: ${q.hint}',
                            style: const TextStyle(
                              fontSize: 11, color: AppTheme.brandDark,
                            )),
                      ),
                    ],
                  ],
                ),
              ),
            );
          }),
          const SizedBox(height: 8),
        ],

        if (writtenQs.isNotEmpty) ...[
          Text('WRITTEN ANSWERS',
              style: TextStyle(
                fontSize: 9, fontWeight: FontWeight.w700,
                color: AppTheme.textMutedOf(context), letterSpacing: 0.6,
              )),
          const SizedBox(height: 8),
          ...writtenQs.asMap().entries.map((e) {
            final qi = e.key;
            final q  = e.value;
            return Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color:        AppTheme.cardOf(context),
                  border:       Border.all(color: AppTheme.borderOf(context)),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: q.type == ExamQuestionType.reference
                              ? Container(
                                  padding: const EdgeInsets.only(left: 8),
                                  decoration: BoxDecoration(
                                    border: Border(
                                        left: BorderSide(color: AppTheme.borderOf(context), width: 2)),
                                  ),
                                  child: Text(q.verse ?? '',
                                      style: TextStyle(
                                        fontSize: 12, fontStyle: FontStyle.italic,
                                        color: AppTheme.text2Of(context), height: 1.5,
                                      )),
                                )
                              : Text('Q${qi + 1}. ${q.html ?? ''}',
                                  style: const TextStyle(
                                    fontSize: 13, fontWeight: FontWeight.w600, height: 1.4,
                                  )),
                        ),
                        const SizedBox(width: 8),
                        Text('${q.marks}m',
                            style: TextStyle(
                              fontSize: 10, color: AppTheme.textMutedOf(context),
                            )),
                      ],
                    ),
                    const SizedBox(height: 12),
                    if (q.type == ExamQuestionType.reference)
                      ...q.subs!.asMap().entries.map((se) {
                        final sub    = se.value;
                        final subAns = (attempt.answers[q.id] as Map<Object, Object>?)?[se.key] as String? ?? '';
                        return Padding(
                          padding: const EdgeInsets.only(bottom: 12),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(sub.q,
                                  style: const TextStyle(
                                    fontSize: 12, fontWeight: FontWeight.w600,
                                  )),
                              const SizedBox(height: 6),
                              _AnswerPair(
                                  studentText: subAns,
                                  modelAnswer: sub.modelAnswer),
                            ],
                          ),
                        );
                      })
                    else
                      _AnswerPair(
                        studentText: attempt.answers[q.id] as String? ?? '',
                        modelAnswer: q.modelAnswer ?? '',
                      ),
                  ],
                ),
              ),
            );
          }),
          const SizedBox(height: 8),
        ],

        Row(
          children: [
            Expanded(
              child: OutlinedButton.icon(
                onPressed: () => context.go(
                  '/rich-learn/${widget.classLevel}/${widget.subjectSlug}/${widget.chapterSlug}',
                  extra: {'chapter': widget.chapter, 'tab': null},
                ),
                icon:  const Icon(Icons.chevron_left, size: 16),
                label: const Text('Back'),
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: OutlinedButton.icon(
                onPressed: () => context.go(
                  '/rich-learn/${widget.classLevel}/${widget.subjectSlug}/${widget.chapterSlug}',
                  extra: {'chapter': widget.chapter, 'tab': 'attempt-history'},
                ),
                icon:  const Icon(Icons.history, size: 16),
                label: const Text('History'),
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: ElevatedButton.icon(
                onPressed: _handleRetake,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF1E2A44),
                  foregroundColor: Colors.white,
                  overlayColor:    const Color(0xFF2E3A59),
                  elevation:       0,
                ),
                icon:  const Icon(Icons.replay, size: 16),
                label: const Text('Retake',
                    style: TextStyle(fontWeight: FontWeight.w600)),
              ),
            ),
          ],
        ),
      ],
    );
  }

  String _fmtDate(DateTime dt) {
    final months = ['Jan','Feb','Mar','Apr','May','Jun',
                    'Jul','Aug','Sep','Oct','Nov','Dec'];
    final h  = dt.hour.toString().padLeft(2, '0');
    final m  = dt.minute.toString().padLeft(2, '0');
    return '${dt.day} ${months[dt.month - 1]} ${dt.year}, $h:$m';
  }

  AppBar _buildAppBar() {
    final title    = _view == 'results' ? 'Results' : 'Practice Exam';
    final backView = _view == 'results' ? 'exam' : null;
    return AppBar(
      title: Text(title),
      leading: backView != null
          ? IconButton(
              icon: const Icon(Icons.arrow_back),
              onPressed: () => setState(() {
                _view = backView;
                _viewingAttemptId = null;
              }),
            )
          : null,
      actions: [
        if (_view == 'exam')
          IconButton(
            icon:    const Icon(Icons.history),
            tooltip: 'Attempt History',
            onPressed: () => context.go(
              '/rich-learn/${widget.classLevel}/${widget.subjectSlug}/${widget.chapterSlug}',
              extra: {'chapter': widget.chapter, 'tab': 'attempt-history'},
            ),
          ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_loading) {
      return Scaffold(
        appBar: AppBar(title: const Text('Practice Exam')),
        body: const Center(child: CircularProgressIndicator()),
      );
    }
    if (_error != null) {
      return Scaffold(
        appBar: AppBar(title: const Text('Practice Exam')),
        body: Center(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Text(_error!, style: const TextStyle(color: AppTheme.error)),
          ),
        ),
      );
    }
    if (_questions.isEmpty) {
      return Scaffold(
        appBar: AppBar(title: const Text('Practice Exam')),
        body: Center(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Text('No practice questions for this chapter yet.',
                style: TextStyle(color: AppTheme.textMutedOf(context))),
          ),
        ),
      );
    }

    return Scaffold(
      appBar: _buildAppBar(),
      body: AnimatedSwitcher(
        duration: const Duration(milliseconds: 180),
        child: switch (_view) {
          'results' => KeyedSubtree(
              key: ValueKey('results-${_viewingAttemptId ?? _currentAttemptId}'),
              child: _buildResultsView(),
            ),
          _ => KeyedSubtree(
              key: ValueKey('exam-$_questionIdx'),
              child: _buildExamView(),
            ),
        },
      ),
    );
  }
}
