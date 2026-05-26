import 'dart:async';
import 'dart:convert';
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../config/theme.dart';
import '../models/exam_practice_model.dart';
import '../models/syllabus_model.dart';
import '../services/exam_practice_service.dart';
import '../utils/practice_draft_storage.dart';
import '../utils/answer_validation.dart';
import '../widgets/mcq_option.dart';

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

Map<Object, Object>? _asAnswerMap(Object? value) {
  if (value is! Map) return null;
  final out = <Object, Object>{};
  for (final entry in value.entries) {
    final key = entry.key is int ? entry.key : int.tryParse('${entry.key}') ?? entry.key;
    final item = entry.value;
    if (item is String) {
      out[key] = item;
    }
  }
  return out;
}

String? _asAnswerString(Object? value) => value is String ? value : null;

int? _asAnswerInt(Object? value) {
  if (value is int) return value;
  if (value is num) return value.toInt();
  return null;
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
  final List<ExamQuestion>   questions;
  final int                  questionIdx;
  final Map<int, Object>     answers;
  final ValueChanged<int>    onGoto;
  final Map<String, String>  validationErrors;

  const _QuickNavDots({
    required this.questions,
    required this.questionIdx,
    required this.answers,
    required this.onGoto,
    this.validationErrors = const {},
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
                  final isInvalid = !isMcq && (
                    q.type == ExamQuestionType.reference
                        ? List.generate(q.subs?.length ?? 0, (i) => '${q.id}_$i')
                            .any((k) => validationErrors.containsKey(k))
                        : validationErrors.containsKey('${q.id}')
                  );
                  final done    = isMcq
                      ? answers[q.id] != null
                      : q.type == ExamQuestionType.reference
                          ? _asAnswerMap(answers[q.id])
                              ?.values.any((v) => v.toString().trim().isNotEmpty) ?? false
                          : _asAnswerString(answers[q.id])?.trim().isNotEmpty ?? false;

                  Color bg; Color fg;
                  if (current) { bg = Colors.transparent; fg = AppTheme.brand; }
                  else if (isInvalid) {
                    bg = AppTheme.errorBgOf(context);
                    fg = AppTheme.error;
                  }
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
                        border: current ? Border.all(color: AppTheme.brand, width: 2) : Border.all(color: AppTheme.borderOf(context)),
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

class _ExamPracticeScreenState extends State<ExamPracticeScreen> with WidgetsBindingObserver {
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
  Timer?              _draftSaveTimer;
  bool                _isHydratingDraft   = false;
  bool                _resumeNoticeQueued = false;
  bool                _resumeNoticeShown  = false;
  PracticeDraft?      _pendingDraft;

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

  String get _lessonSlug => widget.chapterSlug;

  String get _draftKey => PracticeDraftStorage.buildKey(
    classLevel:  widget.classLevel,
    subjectSlug: widget.subjectSlug,
    lessonSlug:  _lessonSlug,
  );

  TextEditingController _getCtrl(int qId, [int? subIdx]) {
    final key = subIdx != null ? '${qId}_$subIdx' : '$qId';
    return _ctrlMap.putIfAbsent(key, () {
      final ans = _currentAttempt.answers[qId];
      String init = '';
      if (subIdx != null) {
        init = _asAnswerString(_asAnswerMap(ans)?[subIdx]) ?? '';
      } else {
        init = _asAnswerString(ans) ?? '';
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
            _asAnswerString(_asAnswerMap(_currentAttempt.answers[q.id])?[j]) ?? '';
        if (text.trim().isEmpty) continue;
        final res = validateStudentAnswer(text);
        if (res.message != null) errors[key] = res.message!;
      }
    } else if (q.type == ExamQuestionType.written) {
      final key  = '${q.id}';
      final ctrl = _ctrlMap[key];
      final text = ctrl?.text ?? _asAnswerString(_currentAttempt.answers[q.id]) ?? '';
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
    _saveDraft();
  }

  void _handlePrevious() {
    setState(() => _questionIdx = (_questionIdx - 1).clamp(0, _questions.length - 1).toInt());
    _saveDraft();
  }

  void _gotoQuestion(int index) {
    setState(() => _questionIdx = index.clamp(0, _questions.length - 1).toInt());
    _saveDraft();
  }

  void _clearCtrl() {
    for (final c in _ctrlMap.values) { c.dispose(); }
    _ctrlMap.clear();
    for (final n in _focusMap.values) { n.dispose(); }
    _focusMap.clear();
  }

  Map<int, Object> _answersFromDraft(PracticeDraft draft) {
    final answers = <int, Object>{};

    draft.selectedAnswers.forEach((key, value) {
      final qId = int.tryParse(key);
      if (qId == null) return;
      if (value is int) {
        answers[qId] = value;
      } else if (value is num) {
        answers[qId] = value.toInt();
      }
    });

    draft.writtenAnswers.forEach((key, value) {
      final qId = int.tryParse(key);
      if (qId == null) return;
      if (value is String) {
        answers[qId] = value;
      } else if (value is Map) {
        final row = <Object, Object>{};
        for (final entry in value.entries) {
          final subKey = entry.key;
          final subIdx = subKey is int ? subKey : int.tryParse('$subKey');
          if (subIdx == null) continue;
          if (entry.value is String) {
            row[subIdx] = entry.value as String;
          }
        }
        answers[qId] = row;
      }
    });

    return answers;
  }

  PracticeDraft _buildDraft() {
    final selectedAnswers = <String, dynamic>{};
    final writtenAnswers = <String, dynamic>{};

    for (final entry in _currentAttempt.answers.entries) {
      final key = entry.key.toString();
      final value = entry.value;
      if (value is int) {
        selectedAnswers[key] = value;
      } else if (value is String) {
        writtenAnswers[key] = value;
      } else if (value is Map) {
        final row = <String, dynamic>{};
        for (final subEntry in value.entries) {
          row[subEntry.key.toString()] = subEntry.value.toString();
        }
        writtenAnswers[key] = row;
      }
    }

    return PracticeDraft(
      lessonSlug: _lessonSlug,
      currentQuestionIndex: _questionIdx,
      selectedAnswers: selectedAnswers,
      writtenAnswers: writtenAnswers,
      updatedAt: DateTime.now(),
      totalQuestions: _questions.length,
    );
  }

  bool _hasMeaningfulDraft(PracticeDraft draft) {
    return draft.currentQuestionIndex > 0 ||
        draft.selectedAnswers.isNotEmpty ||
        draft.writtenAnswers.isNotEmpty;
  }

  Future<void> _restoreDraftIfAny() async {
    try {
      final draft = await PracticeDraftStorage.load(_draftKey);
      if (!mounted || draft == null || draft.lessonSlug != _lessonSlug) return;

      final restoredAnswers = _answersFromDraft(draft);
      final maxIdx = _questions.isEmpty ? 0 : _questions.length - 1;
      final restoredIdx = draft.currentQuestionIndex.clamp(0, maxIdx).toInt();
      final hadMeaningfulDraft = _hasMeaningfulDraft(draft);

      _isHydratingDraft = true;
      setState(() {
        _currentAttempt.answers = restoredAnswers;
        _questionIdx = restoredIdx;
        _view = 'exam';
        _viewingAttemptId = null;
        _validationErrors.clear();
        _error = null;
      });

      if (hadMeaningfulDraft && !_resumeNoticeShown) {
        _resumeNoticeShown = true;
        _resumeNoticeQueued = true;
        WidgetsBinding.instance.addPostFrameCallback((_) {
          if (!mounted || !_resumeNoticeQueued) return;
          _resumeNoticeQueued = false;
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Resumed your previous practice attempt.'),
              duration: Duration(seconds: 2),
            ),
          );
        });
      }
    } catch (_) {
      if (mounted) {
        await PracticeDraftStorage.clear(_draftKey);
        setState(() {
          _currentAttempt.answers = {};
          _questionIdx = 0;
          _view = 'exam';
          _viewingAttemptId = null;
          _validationErrors.clear();
          _error = null;
          _loading = false;
        });
      }
    } finally {
      if (mounted) {
        Future.delayed(Duration.zero, () {
          if (mounted) {
            _isHydratingDraft = false;
          }
        });
      }
    }
  }

  Future<void> _saveDraft({bool force = false}) async {
    if (_isHydratingDraft) return;

    final draft = _buildDraft();
    _pendingDraft = draft;

    if (!force && !_hasMeaningfulDraft(draft)) {
      await PracticeDraftStorage.clear(_draftKey);
      return;
    }

    if (force) {
      if (!_hasMeaningfulDraft(draft)) {
        await PracticeDraftStorage.clear(_draftKey);
        return;
      }
      await PracticeDraftStorage.save(_draftKey, draft);
      return;
    }

    if (_draftSaveTimer?.isActive ?? false) {
      _draftSaveTimer!.cancel();
    }
    _draftSaveTimer = Timer(const Duration(milliseconds: 250), () async {
      final snapshot = _pendingDraft;
      if (snapshot == null) return;
      if (!_hasMeaningfulDraft(snapshot)) {
        await PracticeDraftStorage.clear(_draftKey);
        return;
      }
      await PracticeDraftStorage.save(_draftKey, snapshot);
    });
  }

  Future<void> _clearDraft() async {
    if (_draftSaveTimer?.isActive ?? false) {
      _draftSaveTimer!.cancel();
    }
    _pendingDraft = null;
    await PracticeDraftStorage.clear(_draftKey);
  }

  Future<void> _loadQuestions() async {
    try {
      final qs = await ExamPracticeService.getQuestions(widget.classLevel, widget.subjectSlug, widget.chapterSlug);
      if (!mounted) return;
      setState(() {
        _questions = qs;
        _loading = false;
      });
      if (_questions.isNotEmpty) {
        await _restoreDraftIfAny();
      }
    } catch (e) {
      if (mounted) setState(() { _error = e.toString(); _loading = false; });
    }
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _loadQuestions();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.inactive || state == AppLifecycleState.paused) {
      _saveDraft(force: true);
    }
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    if (_draftSaveTimer?.isActive ?? false) {
      _draftSaveTimer!.cancel();
    }
    _saveDraft(force: true);
    _clearCtrl();
    super.dispose();
  }

  void _selectOption(int qId, int optIdx) {
    setState(() => _currentAttempt.answers[qId] = optIdx);
    _saveDraft();
  }

  void _updateText(int qId, int? subIdx, String val) {
    final ans = _currentAttempt.answers;
    if (subIdx != null) {
      final map = Map<Object, Object>.from(_asAnswerMap(ans[qId]) ?? {});
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
    _saveDraft();
  }

  void _openReviewSubmitSheet() {
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
              _asAnswerString(_asAnswerMap(_currentAttempt.answers[q.id])?[j]) ?? '';
          if (text.trim().isEmpty) continue;
          final res = validateStudentAnswer(text);
          if (res.message != null) {
            errors[key] = res.message!;
            if (firstInvalidIdx == -1) firstInvalidIdx = i;
          }
        }
      } else {
        final key  = '${q.id}';
        final ctrl = _ctrlMap[key];
        final text = ctrl?.text ?? _asAnswerString(_currentAttempt.answers[q.id]) ?? '';
        if (text.trim().isEmpty) continue;
        final res  = validateStudentAnswer(text);
        if (res.message != null) {
          errors[key] = res.message!;
          if (firstInvalidIdx == -1) firstInvalidIdx = i;
        }
      }
    }

    if (errors.isNotEmpty) {
      setState(() => _validationErrors.addAll(errors));
    }

    if (!mounted) return;
    final mergedErrors = {..._validationErrors, ...errors};
    showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (ctx) => _ReviewSheet(
        questions:        _questions,
        questionIdx:      _questionIdx,
        answers:          Map.of(_currentAttempt.answers),
        validationErrors: mergedErrors,
        mode:             'submit',
        firstInvalidIdx:  firstInvalidIdx,
        onGoto: (idx) {
          Navigator.pop(ctx);
          _gotoQuestion(idx);
        },
        onCancel:  () => Navigator.pop(ctx),
        onConfirm: () {
          Navigator.pop(ctx);
          _confirmSubmit();
        },
      ),
    );
  }

  void _confirmSubmit() {
    final attempt = _currentAttempt;
    var score = 0;
    for (final q in _mcqQuestions) {
      if (q.correct != null && attempt.answers[q.id] == q.correct) score++;
    }
    final submittedAt = DateTime.now();
    setState(() {
      attempt.status      = 'submitted';
      attempt.mcqScore    = score;
      attempt.submittedAt = submittedAt;
      _viewingAttemptId   = _currentAttemptId;
      _view               = 'results';
    });
    _clearDraft();
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
    _clearDraft();
    setState(() {
      _validationErrors.clear();
      _attempts.add(ExamAttempt(id: newId));
      _currentAttemptId = newId;
      _viewingAttemptId = null;
      _questionIdx      = 0;
      _view             = 'exam';
    });
    _resumeNoticeShown  = false;
    _resumeNoticeQueued = false;
  }

  // ── Exam view ─────────────────────────────────────────────────────────
  Widget _buildExamView() {
    if (_questions.isEmpty) {
      return const SizedBox.shrink();
    }
    final safeIdx = _questionIdx.clamp(0, _questions.length - 1).toInt();
    if (safeIdx != _questionIdx) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted) setState(() => _questionIdx = safeIdx);
      });
    }
    final q       = _questions[safeIdx];
    final total   = _questions.length;
    final answers = _currentAttempt.answers;
    final mcqTotal = _mcqQuestions.length;

    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
      key: ValueKey(safeIdx),
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
                    Text('Q${safeIdx + 1} of $total',
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
              Text('Question ${safeIdx + 1}',
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
                onPressed: _questionIdx > 0 ? _handlePrevious : null,
                icon:  const Icon(Icons.chevron_left, size: 18),
                label: const Text('Previous'),
              ),
            ),
            const SizedBox(width: 6),
            OutlinedButton(
              onPressed: _openReviewSubmitSheet,
              style: OutlinedButton.styleFrom(
                backgroundColor: AppTheme.brandLightOf(context),
                foregroundColor: AppTheme.brand,
                side: BorderSide(
                  color: AppTheme.brand.withValues(alpha: 0.4),
                  width: 1.5,
                ),
                overlayColor: AppTheme.brandLightHoverOf(context),
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                minimumSize: Size.zero,
                tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(AppTheme.radiusButton),
                ),
                textStyle: const TextStyle(
                  fontSize: 14, fontWeight: FontWeight.w600,
                ),
              ),
              child: const Text('Review & Submit'),
            ),
            const SizedBox(width: 6),
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
      ],
    );
  }

  Widget _buildMcqQuestion(ExamQuestion q, Map<int, Object> answers) {
    final chosen = _asAnswerInt(answers[q.id]);
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
        _renderHtml(q.html ?? '',
            TextStyle(
              fontSize: 15, fontWeight: FontWeight.w600,
              color: AppTheme.textOf(context), height: 1.5,
            )),
        const SizedBox(height: 14),
        ...List.generate(q.options?.length ?? 0, (i) => McqOption(
          letter: String.fromCharCode(65 + i),
          text:   q.options![i],
          state:  chosen == i ? OptionState.selected : OptionState.resting,
          onTap:  () => _selectOption(q.id, i),
        )),
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
        ...List.generate(q.subs?.length ?? 0, (i) {
          final subs = q.subs ?? const <SubQuestion>[];
          final sub   = subs[i];
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
            final chosen  = _asAnswerInt(attempt.answers[q.id]);
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
                            'Q${qi + 1}. ${q.html ?? ''}',
                            TextStyle(
                              fontSize: 13, fontWeight: FontWeight.w600,
                              color: AppTheme.textOf(context), height: 1.4,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    ...List.generate(q.options?.length ?? 0, (i) {
                      final isAnswer = q.correct == i;
                      final isWrongPick = chosen == i && !correct;
                      final OptionState state;
                      if (isAnswer) {
                        state = OptionState.correct;
                      } else if (isWrongPick) {
                        state = OptionState.incorrect;
                      } else {
                        state = OptionState.resting;
                      }
                      return McqOption(
                        letter: String.fromCharCode(65 + i),
                        text:   q.options![i],
                        state:  state,
                        onTap:  null,
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
                      ...(q.subs ?? const <SubQuestion>[]).asMap().entries.map((se) {
                        final sub    = se.value;
                        final subAns = _asAnswerString(_asAnswerMap(attempt.answers[q.id])?[se.key]) ?? '';
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
                        studentText: _asAnswerString(attempt.answers[q.id]) ?? '',
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
            if (!widget.chapterSlug.contains('model-qa') && !widget.chapterSlug.contains('annual')) ...[
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
            ],
            Expanded(
              child: OutlinedButton.icon(
                onPressed: () {
                  if (widget.chapterSlug.contains('model-qa') || widget.chapterSlug.contains('annual')) {
                    context.go('/courses/${widget.classLevel}/${widget.subjectSlug}/final-exam-prep');
                  } else {
                    context.go(
                      '/rich-learn/${widget.classLevel}/${widget.subjectSlug}/${widget.chapterSlug}',
                      extra: {'chapter': widget.chapter, 'tab': 'attempt-history'},
                    );
                  }
                },
                icon:  const Icon(Icons.history, size: 16),
                label: const Text('History'),
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: ElevatedButton.icon(
                onPressed: _handleRetake,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.brand,
                  foregroundColor: Colors.white,
                  overlayColor:    AppTheme.brandDark,
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
            onPressed: () {
              if (widget.chapterSlug.contains('model-qa') || widget.chapterSlug.contains('annual')) {
                context.go('/courses/${widget.classLevel}/${widget.subjectSlug}/final-exam-prep');
              } else {
                context.go(
                  '/rich-learn/${widget.classLevel}/${widget.subjectSlug}/${widget.chapterSlug}',
                  extra: {'chapter': widget.chapter, 'tab': 'attempt-history'},
                );
              }
            },
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

// ── Review bottom sheet ───────────────────────────────────────────────────

class _ReviewSheet extends StatelessWidget {
  final List<ExamQuestion>  questions;
  final int                 questionIdx;
  final Map<int, Object>    answers;
  final Map<String, String> validationErrors;
  final String              mode; // 'review' | 'submit'
  final int                 firstInvalidIdx;
  final void Function(int)  onGoto;
  final VoidCallback        onCancel;
  final VoidCallback?       onConfirm;

  const _ReviewSheet({
    required this.questions,
    required this.questionIdx,
    required this.answers,
    required this.validationErrors,
    required this.mode,
    required this.firstInvalidIdx,
    required this.onGoto,
    required this.onCancel,
    this.onConfirm,
  });

  @override
  Widget build(BuildContext context) {
    int answered = 0, unanswered = 0, invalid = 0;
    for (final q in questions) {
      if (q.type == ExamQuestionType.mcq) {
        if (answers[q.id] != null) { answered++; } else { unanswered++; }
      } else if (q.type == ExamQuestionType.reference) {
        final hasInvalid = List.generate(q.subs?.length ?? 0, (i) => '${q.id}_$i')
            .any((k) => validationErrors.containsKey(k));
        final hasAny = _asAnswerMap(answers[q.id])
            ?.values.any((v) => v.toString().trim().isNotEmpty) ?? false;
        if (hasInvalid) { invalid++; }
        else if (hasAny) { answered++; }
        else { unanswered++; }
      } else {
        final val = _asAnswerString(answers[q.id]) ?? '';
        if (validationErrors.containsKey('${q.id}')) { invalid++; }
        else if (val.trim().isNotEmpty) { answered++; }
        else { unanswered++; }
      }
    }
    final total = questions.length;

    return DraggableScrollableSheet(
      initialChildSize: 0.85,
      minChildSize:     0.5,
      maxChildSize:     0.95,
      expand:           false,
      builder: (ctx, scrollCtrl) => Column(
        children: [
          Container(
            width: 36, height: 4,
            margin: const EdgeInsets.only(top: 10, bottom: 4),
            decoration: BoxDecoration(
              color:        AppTheme.borderOf(context),
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Row(
              children: [
                const Text('Review Your Answers',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
                const Spacer(),
                IconButton(
                  icon: const Icon(Icons.close, size: 18),
                  onPressed: onCancel,
                  padding: EdgeInsets.zero,
                  constraints: const BoxConstraints(),
                ),
              ],
            ),
          ),
          const Divider(height: 1),
          Flexible(
            child: ListView(
              controller: scrollCtrl,
              padding: const EdgeInsets.all(16),
              children: [
                if (mode == 'submit') ...[
                  Row(
                    children: [
                      _StatChip(label: 'Total',     value: '$total',     bg: AppTheme.surfaceOf(context),     fg: AppTheme.textOf(context)),
                      const SizedBox(width: 6),
                      _StatChip(label: 'Answered',  value: '$answered',  bg: AppTheme.successBgOf(context),   fg: AppTheme.successFgOf(context)),
                      const SizedBox(width: 6),
                      _StatChip(label: 'Unanswered',value: '$unanswered',bg: AppTheme.surfaceOf(context),     fg: AppTheme.textMutedOf(context)),
                      const SizedBox(width: 6),
                      _StatChip(
                        label: 'Needs Fix',
                        value: '$invalid',
                        bg: invalid > 0 ? AppTheme.errorBgOf(context) : AppTheme.surfaceOf(context),
                        fg: invalid > 0 ? AppTheme.error : AppTheme.textMutedOf(context),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                ],
                _QuickNavDots(
                  questions:        questions,
                  questionIdx:      questionIdx,
                  answers:          answers,
                  onGoto:           onGoto,
                  validationErrors: validationErrors,
                ),
                const SizedBox(height: 14),
                Wrap(
                  spacing: 12,
                  runSpacing: 6,
                  children: [
                    const _LegendChip(color: AppTheme.brand,    label: 'Current'),
                    const _LegendChip(color: AppTheme.success,  label: 'Answered'),
                    _LegendChip(color: AppTheme.borderOf(context), label: 'Unanswered'),
                    if (mode == 'submit')
                      const _LegendChip(color: AppTheme.error, label: 'Needs correction'),
                  ],
                ),
              ],
            ),
          ),
          const Divider(height: 1),
          Padding(
            padding: EdgeInsets.fromLTRB(
                16, 12, 16, 16 + MediaQuery.of(context).viewPadding.bottom),
            child: Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    onPressed: onCancel,
                    child: const Text('Cancel'),
                  ),
                ),
                if (mode == 'submit' && invalid > 0) ...[
                  const SizedBox(width: 8),
                  Expanded(
                    child: OutlinedButton(
                      onPressed: () => onGoto(firstInvalidIdx),
                      style: OutlinedButton.styleFrom(foregroundColor: AppTheme.error),
                      child: const Text('Review Corrections'),
                    ),
                  ),
                ],
                if (mode == 'submit' && invalid == 0 && onConfirm != null) ...[
                  const SizedBox(width: 8),
                  Expanded(
                    child: FilledButton(
                      onPressed: onConfirm,
                      child: const Text('Submit'),
                    ),
                  ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _StatChip extends StatelessWidget {
  final String label, value;
  final Color  bg, fg;
  const _StatChip({required this.label, required this.value, required this.bg, required this.fg});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 10),
        decoration: BoxDecoration(
          color:        bg,
          borderRadius: BorderRadius.circular(10),
          border:       Border.all(color: AppTheme.borderOf(context)),
        ),
        child: Column(
          children: [
            Text(value,
                style: TextStyle(fontSize: 17, fontWeight: FontWeight.w700, color: fg)),
            const SizedBox(height: 2),
            Text(label,
                style: TextStyle(
                  fontSize: 8, fontWeight: FontWeight.w600,
                  color: fg.withValues(alpha: 0.7), letterSpacing: 0.4,
                )),
          ],
        ),
      ),
    );
  }
}

class _LegendChip extends StatelessWidget {
  final Color  color;
  final String label;
  const _LegendChip({required this.color, required this.label});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 10, height: 10,
          decoration: BoxDecoration(color: color, borderRadius: BorderRadius.circular(2)),
        ),
        const SizedBox(width: 4),
        Text(label,
            style: TextStyle(fontSize: 10, color: AppTheme.text2Of(context))),
      ],
    );
  }
}
