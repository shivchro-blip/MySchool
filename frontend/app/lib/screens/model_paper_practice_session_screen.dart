import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../config/theme.dart';
import '../models/exam_paper_model.dart';
import '../models/static_model_paper_model.dart';
import '../services/model_paper_service.dart';
import '../utils/answer_validation.dart';

Widget _renderInlineHtml(String html, TextStyle style) {
  final spans = <InlineSpan>[];
  final regex = RegExp(r'<u>(.*?)<\/u>', caseSensitive: false);
  var last = 0;
  for (final match in regex.allMatches(html)) {
    if (match.start > last) {
      spans.add(TextSpan(text: html.substring(last, match.start)));
    }
    spans.add(TextSpan(
      text: match.group(1),
      style: style.copyWith(decoration: TextDecoration.underline),
    ));
    last = match.end;
  }
  if (last < html.length) spans.add(TextSpan(text: html.substring(last)));
  return RichText(text: TextSpan(style: style, children: spans));
}

Map<Object, Object>? _asAnswerMap(Object? value) {
  if (value is! Map) return null;
  final out = <Object, Object>{};
  for (final entry in value.entries) {
    final key = entry.key is int
        ? entry.key
        : int.tryParse('${entry.key}') ?? entry.key;
    if (entry.value is String) out[key] = entry.value as String;
  }
  return out;
}

String? _asAnswerString(Object? value) => value is String ? value : null;

int? _asAnswerInt(Object? value) {
  if (value is int) return value;
  if (value is num) return value.toInt();
  return null;
}

class ModelPaperPracticeSessionScreen extends StatefulWidget {
  final String classLevel;
  final String subjectSlug;
  final String setId;

  const ModelPaperPracticeSessionScreen({
    super.key,
    required this.classLevel,
    required this.subjectSlug,
    required this.setId,
  });

  @override
  State<ModelPaperPracticeSessionScreen> createState() =>
      _ModelPaperPracticeSessionScreenState();
}

class _ModelPaperPracticeSessionScreenState
    extends State<ModelPaperPracticeSessionScreen> {
  late final Future<_PracticePayload> _future;
  final Map<int, Object> _answers = {};
  final Map<String, TextEditingController> _controllers = {};
  final Map<String, FocusNode> _focusNodes = {};
  final Map<String, String> _validationErrors = {};
  int _index = 0;
  String _view = 'exam';
  DateTime? _submittedAt;
  int? _submittedScore;
  bool _historySaved = false;

  @override
  void initState() {
    super.initState();
    _future = _load();
  }

  @override
  void dispose() {
    for (final controller in _controllers.values) {
      controller.dispose();
    }
    for (final node in _focusNodes.values) {
      node.dispose();
    }
    super.dispose();
  }

  Future<_PracticePayload> _load() async {
    final paper = await ModelPaperService.loadPaper(
      widget.classLevel,
      widget.subjectSlug,
      widget.setId,
    );
    final questions = await ModelPaperService.loadPracticeQuestions(
      widget.classLevel,
      widget.subjectSlug,
      widget.setId,
    );
    return _PracticePayload(paper: paper, questions: questions);
  }

  int _score(List<ModelPracticeQuestion> questions, int maxMarks) {
    final partScores = <String, int>{};
    final partMax = <String, int?>{};
    for (final question in questions) {
      final earned = _earnedMarks(question);
      partScores[question.partId] = (partScores[question.partId] ?? 0) + earned;
      partMax[question.partId] = question.partScoreMax;
    }

    var total = 0;
    for (final entry in partScores.entries) {
      final cap = partMax[entry.key];
      total += cap == null ? entry.value : entry.value.clamp(0, cap).toInt();
    }
    return maxMarks > 0 ? total.clamp(0, maxMarks).toInt() : total;
  }

  int _unanswered(List<ModelPracticeQuestion> questions) =>
      questions.where((q) => !_hasAnswer(q)).length;

  int _incorrect(List<ModelPracticeQuestion> questions) => questions.where((q) {
        if (q.type != ModelPracticeQuestionType.mcq) return false;
        final selected = _asAnswerInt(_answers[q.number]);
        return selected != null && selected != q.correctIndex;
      }).length;

  void _select(ModelPracticeQuestion question, int optionIndex) {
    if (_view != 'exam') return;
    setState(() => _answers[question.number] = optionIndex);
  }

  bool _hasAnswer(ModelPracticeQuestion question) {
    final answer = _answers[question.number];
    if (question.type == ModelPracticeQuestionType.mcq) {
      return _asAnswerInt(answer) != null;
    }
    if (question.type == ModelPracticeQuestionType.reference) {
      return _asAnswerMap(answer)
              ?.values
              .any((value) => value.toString().trim().isNotEmpty) ??
          false;
    }
    return _asAnswerString(answer)?.trim().isNotEmpty ?? false;
  }

  int _earnedMarks(ModelPracticeQuestion question) {
    if (!_hasAnswer(question)) return 0;
    if (_hasValidationError(question)) return 0;
    if (question.type == ModelPracticeQuestionType.mcq) {
      return _asAnswerInt(_answers[question.number]) == question.correctIndex
          ? question.marks
          : 0;
    }
    return question.marks;
  }

  bool _hasValidationError(ModelPracticeQuestion question) {
    if (question.type == ModelPracticeQuestionType.reference) {
      for (var i = 0; i < question.subQuestions.length; i++) {
        if (_validationErrors.containsKey('${question.number}_$i')) {
          return true;
        }
      }
      return false;
    }
    return _validationErrors.containsKey('${question.number}');
  }

  TextEditingController _controllerFor(ModelPracticeQuestion q, [int? subIdx]) {
    final key = subIdx == null ? '${q.number}' : '${q.number}_$subIdx';
    return _controllers.putIfAbsent(key, () {
      var initial = '';
      final answer = _answers[q.number];
      if (subIdx == null) {
        initial = _asAnswerString(answer) ?? '';
      } else {
        initial = _asAnswerString(_asAnswerMap(answer)?[subIdx]) ?? '';
      }
      return TextEditingController(text: initial);
    });
  }

  FocusNode _focusNodeFor(ModelPracticeQuestion q, [int? subIdx]) {
    final key = subIdx == null ? '${q.number}' : '${q.number}_$subIdx';
    return _focusNodes.putIfAbsent(key, () {
      final node = FocusNode();
      node.addListener(() {
        if (!node.hasFocus) _validateField(q, subIdx);
      });
      return node;
    });
  }

  void _updateText(ModelPracticeQuestion question, int? subIdx, String value) {
    if (question.type == ModelPracticeQuestionType.reference &&
        subIdx != null) {
      final map = Map<Object, Object>.from(
        _asAnswerMap(_answers[question.number]) ?? const <Object, Object>{},
      );
      map[subIdx] = value;
      _answers[question.number] = map;
    } else {
      _answers[question.number] = value;
    }

    final key =
        subIdx == null ? '${question.number}' : '${question.number}_$subIdx';
    if (_validationErrors.containsKey(key)) {
      final result = validateStudentAnswer(value);
      if (result.valid || value.trim().isEmpty) {
        setState(() => _validationErrors.remove(key));
        return;
      }
    }
    setState(() {});
  }

  void _validateField(ModelPracticeQuestion question, [int? subIdx]) {
    if (question.type == ModelPracticeQuestionType.mcq) return;
    final key =
        subIdx == null ? '${question.number}' : '${question.number}_$subIdx';
    final text = _controllers[key]?.text ?? '';
    final result = validateStudentAnswer(text);
    if (!mounted) return;
    setState(() {
      if (result.message != null) {
        _validationErrors[key] = result.message!;
      } else {
        _validationErrors.remove(key);
      }
    });
  }

  Map<String, String> _validateWrittenAnswers(
      List<ModelPracticeQuestion> questions) {
    final errors = <String, String>{};
    for (final question in questions) {
      if (question.type == ModelPracticeQuestionType.mcq) continue;
      if (question.type == ModelPracticeQuestionType.reference) {
        for (var i = 0; i < question.subQuestions.length; i++) {
          final key = '${question.number}_$i';
          final text = _controllers[key]?.text ??
              _asAnswerString(_asAnswerMap(_answers[question.number])?[i]) ??
              '';
          if (text.trim().isEmpty) continue;
          final result = validateStudentAnswer(text);
          if (result.message != null) errors[key] = result.message!;
        }
      } else {
        final key = '${question.number}';
        final text = _controllers[key]?.text ??
            _asAnswerString(_answers[question.number]) ??
            '';
        if (text.trim().isEmpty) continue;
        final result = validateStudentAnswer(text);
        if (result.message != null) errors[key] = result.message!;
      }
    }
    return errors;
  }

  void _gotoQuestion(int index) {
    setState(() {
      _view = 'exam';
      _index = index.clamp(0, 999999).toInt();
    });
  }

  void _openReviewSubmitSheet(_PracticePayload payload) {
    final errors = _validateWrittenAnswers(payload.questions);
    if (errors.isNotEmpty) {
      setState(() => _validationErrors.addAll(errors));
    }
    final mergedErrors = {..._validationErrors, ...errors};

    showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (ctx) => _ReviewSheet(
        questions: payload.questions,
        questionIdx: _index,
        answers: Map.of(_answers),
        validationErrors: mergedErrors,
        onGoto: (idx) {
          Navigator.pop(ctx);
          _gotoQuestion(idx);
        },
        onCancel: () => Navigator.pop(ctx),
        onConfirm: () {
          Navigator.pop(ctx);
          _confirmSubmit(payload);
        },
      ),
    );
  }

  Future<void> _confirmSubmit(_PracticePayload payload) async {
    final errors = _validateWrittenAnswers(payload.questions);
    if (errors.isNotEmpty) {
      setState(() => _validationErrors.addAll(errors));
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content:
              Text('Please correct the highlighted answers before submitting.'),
          duration: Duration(seconds: 3),
        ),
      );
      return;
    }
    final score = _score(payload.questions, payload.totalMarks);
    final submittedAt = DateTime.now();
    setState(() {
      _submittedScore = score;
      _submittedAt = submittedAt;
      _view = 'results';
    });

    if (_historySaved) return;
    _historySaved = true;
    await ModelPaperService.saveAttempt(
      setId: payload.paper.paperId,
      score: score,
      total: payload.totalMarks,
    );
  }

  void _retake() {
    setState(() {
      _answers.clear();
      _validationErrors.clear();
      for (final controller in _controllers.values) {
        controller.dispose();
      }
      _controllers.clear();
      for (final node in _focusNodes.values) {
        node.dispose();
      }
      _focusNodes.clear();
      _index = 0;
      _view = 'exam';
      _submittedAt = null;
      _submittedScore = null;
      _historySaved = false;
    });
  }

  String _fmtDate(DateTime dt) {
    final months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    final h = dt.hour.toString().padLeft(2, '0');
    final m = dt.minute.toString().padLeft(2, '0');
    return '${dt.day} ${months[dt.month - 1]} ${dt.year}, $h:$m';
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<_PracticePayload>(
      future: _future,
      builder: (context, snapshot) {
        final payload = snapshot.data;
        return Scaffold(
          appBar: AppBar(
            title: Text(
              _view == 'results'
                  ? 'Results'
                  : payload?.paper.title ?? 'Model Paper Practice',
              overflow: TextOverflow.ellipsis,
            ),
            leading: _view == 'results'
                ? IconButton(
                    icon: const Icon(Icons.arrow_back),
                    onPressed: () => setState(() => _view = 'exam'),
                  )
                : IconButton(
                    icon: const Icon(Icons.arrow_back),
                    onPressed: () {
                      if (context.canPop()) {
                        context.pop();
                      } else {
                        context.go(
                          '/courses/${widget.classLevel}/${widget.subjectSlug}',
                        );
                      }
                    },
                  ),
            actions: [
              if (_view == 'exam' && payload != null)
                IconButton(
                  icon: const Icon(Icons.history),
                  tooltip: 'Attempt History',
                  onPressed: () => context.push(
                    '/model-paper/history/${widget.classLevel}/${widget.subjectSlug}/${payload.paper.paperId}',
                  ),
                ),
            ],
          ),
          body: _body(snapshot),
        );
      },
    );
  }

  Widget _body(AsyncSnapshot<_PracticePayload> snapshot) {
    if (snapshot.connectionState != ConnectionState.done) {
      return const Center(child: CircularProgressIndicator());
    }
    if (snapshot.hasError || !snapshot.hasData) {
      return const Center(
        child: Text('Model paper practice is not available.'),
      );
    }
    final payload = snapshot.data!;
    if (payload.questions.isEmpty) {
      return const Center(child: Text('This paper has no practice questions.'));
    }
    return AnimatedSwitcher(
      duration: const Duration(milliseconds: 180),
      child: _view == 'results'
          ? KeyedSubtree(
              key: const ValueKey('results'),
              child: _buildResults(payload),
            )
          : KeyedSubtree(
              key: ValueKey('exam-$_index'),
              child: _buildQuestion(payload),
            ),
    );
  }

  Widget _buildQuestion(_PracticePayload payload) {
    final safeIdx = _index.clamp(0, payload.questions.length - 1).toInt();
    if (safeIdx != _index) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted) setState(() => _index = safeIdx);
      });
    }

    final question = payload.questions[safeIdx];
    final selected = _asAnswerInt(_answers[question.number]);
    final answered = payload.questions.where(_hasAnswer).length;
    final total = payload.questions.length;

    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
      children: [
        Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: AppTheme.cardOf(context),
            border: Border.all(color: AppTheme.borderOf(context)),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Q${safeIdx + 1} of $total',
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                      color: AppTheme.text2Of(context),
                    ),
                  ),
                  Text(
                    'Answered: $answered/$total',
                    style: TextStyle(
                      fontSize: 11,
                      color: AppTheme.textMutedOf(context),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              ClipRRect(
                borderRadius: BorderRadius.circular(4),
                child: LinearProgressIndicator(
                  value: total > 0 ? answered / total : 0,
                  backgroundColor: AppTheme.surfaceOf(context),
                  color: AppTheme.brand,
                  minHeight: 6,
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: AppTheme.cardOf(context),
            border: Border.all(color: AppTheme.borderOf(context)),
            borderRadius: BorderRadius.circular(14),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Question ${safeIdx + 1}',
                    style: TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.w700,
                      color: AppTheme.textMutedOf(context),
                      letterSpacing: 0.8,
                    ),
                  ),
                  Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                    decoration: BoxDecoration(
                      color: AppTheme.surfaceOf(context),
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: AppTheme.borderOf(context)),
                    ),
                    child: Text(
                      '${question.marks} mark${question.marks == 1 ? '' : 's'}',
                      style: TextStyle(
                        fontSize: 10,
                        fontWeight: FontWeight.w600,
                        color: AppTheme.textMutedOf(context),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              _buildQuestionInput(question, selected),
            ],
          ),
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              child: OutlinedButton.icon(
                onPressed: _index > 0 ? () => setState(() => _index--) : null,
                icon: const Icon(Icons.chevron_left, size: 18),
                label: const Text('Previous'),
              ),
            ),
            const SizedBox(width: 6),
            OutlinedButton(
              onPressed: () => _openReviewSubmitSheet(payload),
              style: OutlinedButton.styleFrom(
                backgroundColor: AppTheme.brandLightOf(context),
                foregroundColor: AppTheme.brand,
                side: BorderSide(
                  color: AppTheme.brand.withValues(alpha: 0.4),
                  width: 1.5,
                ),
                overlayColor: AppTheme.brandLightHoverOf(context),
                padding:
                    const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                minimumSize: Size.zero,
                tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(AppTheme.radiusButton),
                ),
                textStyle: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                ),
              ),
              child: const Text('Review & Submit'),
            ),
            const SizedBox(width: 6),
            Expanded(
              child: OutlinedButton.icon(
                onPressed:
                    _index < total - 1 ? () => setState(() => _index++) : null,
                icon: const Icon(Icons.chevron_right, size: 18),
                label: const Text('Next'),
                iconAlignment: IconAlignment.end,
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildQuestionInput(ModelPracticeQuestion question, int? selected) {
    if (question.type == ModelPracticeQuestionType.mcq) {
      final promptStyle = TextStyle(
        fontSize: 15,
        fontWeight: FontWeight.w600,
        color: AppTheme.textOf(context),
        height: 1.5,
      );
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (question.sectionName.isNotEmpty) ...[
            Text(
              question.sectionName,
              style: TextStyle(
                fontSize: 11,
                fontStyle: FontStyle.italic,
                color: AppTheme.textMutedOf(context),
              ),
            ),
            const SizedBox(height: 6),
          ],
          _renderInlineHtml(question.prompt, promptStyle),
          const SizedBox(height: 14),
          for (var optionIndex = 0;
              optionIndex < question.options.length;
              optionIndex++)
            _OptionTile(
              label: String.fromCharCode(65 + optionIndex),
              text: question.options[optionIndex],
              state: selected == optionIndex
                  ? _OptionState.selected
                  : _OptionState.resting,
              onTap: () => _select(question, optionIndex),
            ),
        ],
      );
    }

    if (question.type == ModelPracticeQuestionType.reference) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if ((question.referenceText ?? '').isNotEmpty) ...[
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppTheme.brandLightOf(context),
                borderRadius: BorderRadius.circular(8),
                border: const Border(
                  left: BorderSide(color: AppTheme.brand, width: 3),
                ),
              ),
              child: Text(
                question.referenceText!,
                style: TextStyle(
                  fontSize: 13,
                  fontStyle: FontStyle.italic,
                  color: AppTheme.textOf(context),
                  height: 1.6,
                ),
              ),
            ),
            const SizedBox(height: 14),
          ],
          for (var i = 0; i < question.subQuestions.length; i++)
            Padding(
              padding: const EdgeInsets.only(bottom: 14),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    question.subQuestions[i].prompt,
                    style: const TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    controller: _controllerFor(question, i),
                    focusNode: _focusNodeFor(question, i),
                    minLines: 3,
                    maxLines: 6,
                    onChanged: (value) => _updateText(question, i, value),
                    decoration: InputDecoration(
                      hintText: 'Write your answer here...',
                      errorText: _validationErrors['${question.number}_$i'],
                    ),
                  ),
                ],
              ),
            ),
        ],
      );
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          question.prompt,
          style: TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.w600,
            color: AppTheme.textOf(context),
            height: 1.5,
          ),
        ),
        const SizedBox(height: 14),
        TextField(
          controller: _controllerFor(question),
          focusNode: _focusNodeFor(question),
          minLines: question.marks >= 5 ? 8 : 5,
          maxLines: question.marks >= 5 ? 14 : 10,
          onChanged: (value) => _updateText(question, null, value),
          decoration: InputDecoration(
            hintText: 'Write your answer here...',
            errorText: _validationErrors['${question.number}'],
          ),
        ),
      ],
    );
  }

  List<_SectionScore> _sectionBreakdown(List<ModelPracticeQuestion> questions) {
    final sections = <String, _MutableSectionScore>{};
    for (final question in questions) {
      final key =
          question.partId.isEmpty ? question.groupLabel : question.partId;
      final row = sections.putIfAbsent(
        key,
        () => _MutableSectionScore(
          label: question.groupLabel,
          maxMarks: question.partScoreMax ?? 0,
        ),
      );
      row.earned += _earnedMarks(question);
      if (question.partScoreMax == null) row.maxMarks += question.marks;
      row.questionCount++;
    }
    return sections.values.map((section) {
      final cappedEarned = section.maxMarks > 0
          ? section.earned.clamp(0, section.maxMarks).toInt()
          : section.earned;
      return _SectionScore(
        label: section.label,
        earned: cappedEarned,
        maxMarks: section.maxMarks,
        questionCount: section.questionCount,
      );
    }).toList(growable: false);
  }

  Widget _buildResults(_PracticePayload payload) {
    final totalMarks = payload.totalMarks;
    final score = _submittedScore ?? _score(payload.questions, totalMarks);
    final unanswered = _unanswered(payload.questions);
    final incorrect = _incorrect(payload.questions);
    final pct = totalMarks > 0 ? (score / totalMarks * 100).round() : 0;
    final scoreColor = pct >= 70
        ? AppTheme.success
        : pct >= 40
            ? AppTheme.warning
            : AppTheme.error;

    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
      children: [
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: AppTheme.cardOf(context),
            border: Border.all(color: AppTheme.borderOf(context)),
            borderRadius: BorderRadius.circular(14),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Exam Submitted',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                        Text(
                          payload.paper.title,
                          style: TextStyle(
                            fontSize: 12,
                            color: AppTheme.textMutedOf(context),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: AppTheme.successBgOf(context),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text(
                      'Submitted',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                        color: AppTheme.successFgOf(context),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Text(
                'SCORE',
                style: TextStyle(
                  fontSize: 9,
                  fontWeight: FontWeight.w700,
                  color: AppTheme.textMutedOf(context),
                  letterSpacing: 0.6,
                ),
              ),
              const SizedBox(height: 4),
              Row(
                crossAxisAlignment: CrossAxisAlignment.baseline,
                textBaseline: TextBaseline.alphabetic,
                children: [
                  Text(
                    '$score',
                    style: const TextStyle(
                      fontSize: 32,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                  Text(
                    ' / $totalMarks',
                    style: TextStyle(
                      fontSize: 18,
                      color: AppTheme.text2Of(context),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    '- $pct%',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w700,
                      color: scoreColor,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 4),
              Text(
                'Incorrect MCQ $incorrect - Unanswered $unanswered'
                '${_submittedAt != null ? " - ${_fmtDate(_submittedAt!)}" : ""}',
                style: TextStyle(
                  fontSize: 11,
                  color: AppTheme.textMutedOf(context),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),
        Text(
          'SECTION BREAKDOWN',
          style: TextStyle(
            fontSize: 9,
            fontWeight: FontWeight.w700,
            color: AppTheme.textMutedOf(context),
            letterSpacing: 0.6,
          ),
        ),
        const SizedBox(height: 8),
        ..._sectionBreakdown(payload.questions).map(
          (section) => Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: _SectionScoreRow(section: section),
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'QUESTION REVIEW',
          style: TextStyle(
            fontSize: 9,
            fontWeight: FontWeight.w700,
            color: AppTheme.textMutedOf(context),
            letterSpacing: 0.6,
          ),
        ),
        const SizedBox(height: 8),
        for (var index = 0; index < payload.questions.length; index++)
          Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: _ResultQuestionCard(
              index: index,
              question: payload.questions[index],
              answer: _answers[payload.questions[index].number],
            ),
          ),
        const SizedBox(height: 8),
        Row(
          children: [
            Expanded(
              child: OutlinedButton.icon(
                onPressed: () => context.go(
                  '/courses/${widget.classLevel}/${widget.subjectSlug}',
                ),
                icon: const Icon(Icons.chevron_left, size: 16),
                label: const Text('Back to Papers'),
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: OutlinedButton.icon(
                onPressed: () => context.push(
                  '/model-paper/history/${widget.classLevel}/${widget.subjectSlug}/${payload.paper.paperId}',
                ),
                icon: const Icon(Icons.history, size: 16),
                label: const Text('History'),
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: ElevatedButton.icon(
                onPressed: _retake,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.brand,
                  foregroundColor: Colors.white,
                  overlayColor: AppTheme.brandDark,
                  elevation: 0,
                ),
                icon: const Icon(Icons.replay, size: 16),
                label: const Text(
                  'Retake',
                  style: TextStyle(fontWeight: FontWeight.w600),
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class _PracticePayload {
  final ExamPaperData paper;
  final List<ModelPracticeQuestion> questions;

  const _PracticePayload({required this.paper, required this.questions});

  int get totalMarks => paper.maximumMarks > 0
      ? paper.maximumMarks
      : questions.fold<int>(0, (sum, question) => sum + question.marks);
}

class _MutableSectionScore {
  final String label;
  int earned = 0;
  int maxMarks;
  int questionCount = 0;

  _MutableSectionScore({required this.label, required this.maxMarks});
}

class _SectionScore {
  final String label;
  final int earned;
  final int maxMarks;
  final int questionCount;

  const _SectionScore({
    required this.label,
    required this.earned,
    required this.maxMarks,
    required this.questionCount,
  });
}

class _SectionScoreRow extends StatelessWidget {
  final _SectionScore section;

  const _SectionScoreRow({required this.section});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: AppTheme.cardOf(context),
        border: Border.all(color: AppTheme.borderOf(context)),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        children: [
          Expanded(
            child: Text(
              '${section.label} (${section.questionCount} Qs)',
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w700,
                color: AppTheme.textOf(context),
              ),
            ),
          ),
          Text(
            '${section.earned}/${section.maxMarks}',
            style: const TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.w900,
              color: AppTheme.brand,
            ),
          ),
        ],
      ),
    );
  }
}

enum _OptionState { resting, selected, correct, incorrect }

class _OptionTile extends StatelessWidget {
  final String label;
  final String text;
  final _OptionState state;
  final VoidCallback? onTap;

  const _OptionTile({
    required this.label,
    required this.text,
    required this.state,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final selected = state == _OptionState.selected;
    final correct = state == _OptionState.correct;
    final incorrect = state == _OptionState.incorrect;
    final borderColor = correct
        ? AppTheme.success
        : incorrect
            ? AppTheme.error
            : selected
                ? AppTheme.brand
                : AppTheme.borderOf(context);
    final bg = correct
        ? AppTheme.successBgOf(context)
        : incorrect
            ? AppTheme.errorBgOf(context)
            : selected
                ? AppTheme.brandLightOf(context)
                : AppTheme.surfaceOf(context);

    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: InkWell(
        borderRadius: BorderRadius.circular(AppTheme.radiusButton),
        onTap: onTap,
        child: Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: bg,
            borderRadius: BorderRadius.circular(AppTheme.radiusButton),
            border: Border.all(color: borderColor, width: selected ? 2 : 1),
          ),
          child: Row(
            children: [
              Container(
                width: 26,
                height: 26,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: borderColor.withAlpha(30),
                  shape: BoxShape.circle,
                ),
                child: Text(
                  label,
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w900,
                    color: borderColor,
                  ),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Text(
                  text,
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.textOf(context),
                    height: 1.3,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _ResultQuestionCard extends StatelessWidget {
  final int index;
  final ModelPracticeQuestion question;
  final Object? answer;

  const _ResultQuestionCard({
    required this.index,
    required this.question,
    required this.answer,
  });

  @override
  Widget build(BuildContext context) {
    final selected = _asAnswerInt(answer);
    final correct = question.type == ModelPracticeQuestionType.mcq &&
        selected == question.correctIndex;
    final unanswered = !_answered;
    final borderColor = unanswered
        ? AppTheme.warningBorderOf(context)
        : question.type == ModelPracticeQuestionType.mcq && correct
            ? AppTheme.successBorderOf(context)
            : AppTheme.borderOf(context);

    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppTheme.cardOf(context),
        border: Border.all(color: borderColor),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Icon(
                _statusIcon(unanswered, correct),
                color: unanswered
                    ? AppTheme.warning
                    : question.type == ModelPracticeQuestionType.mcq && correct
                        ? AppTheme.success
                        : question.type == ModelPracticeQuestionType.mcq
                            ? AppTheme.error
                            : AppTheme.brand,
                size: 16,
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  'Q${index + 1}. ${question.type == ModelPracticeQuestionType.reference ? question.referenceText ?? question.prompt : question.prompt}',
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.textOf(context),
                    height: 1.4,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          if (question.type == ModelPracticeQuestionType.mcq)
            for (var optionIndex = 0;
                optionIndex < question.options.length;
                optionIndex++)
              _OptionTile(
                label: String.fromCharCode(65 + optionIndex),
                text: question.options[optionIndex],
                state: optionIndex == question.correctIndex
                    ? _OptionState.correct
                    : selected == optionIndex && !correct
                        ? _OptionState.incorrect
                        : _OptionState.resting,
                onTap: null,
              ),
          if (question.type == ModelPracticeQuestionType.reference)
            ...question.subQuestions.asMap().entries.map((entry) {
              final studentAnswer =
                  _asAnswerString(_asAnswerMap(answer)?[entry.key]) ?? '';
              return Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: _AnswerPair(
                  label: entry.value.prompt,
                  studentText: studentAnswer,
                  modelAnswer: entry.value.modelAnswer,
                ),
              );
            }),
          if (question.type == ModelPracticeQuestionType.written)
            _AnswerPair(
              label: 'Answer',
              studentText: _asAnswerString(answer) ?? '',
              modelAnswer: question.modelAnswer ?? question.officialKey,
            ),
          if (question.officialKey.isNotEmpty) ...[
            const SizedBox(height: 4),
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: AppTheme.brandLightOf(context),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                'Answer: ${question.officialKey}',
                style: const TextStyle(
                  fontSize: 11,
                  color: AppTheme.brandDark,
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }

  bool get _answered {
    if (question.type == ModelPracticeQuestionType.mcq) {
      return _asAnswerInt(answer) != null;
    }
    if (question.type == ModelPracticeQuestionType.reference) {
      return _asAnswerMap(answer)
              ?.values
              .any((value) => value.toString().trim().isNotEmpty) ??
          false;
    }
    return _asAnswerString(answer)?.trim().isNotEmpty ?? false;
  }

  IconData _statusIcon(bool unanswered, bool correct) {
    if (unanswered) return Icons.help_outline;
    if (question.type == ModelPracticeQuestionType.mcq) {
      return correct ? Icons.check_circle : Icons.cancel;
    }
    return Icons.notes;
  }
}

class _AnswerPair extends StatelessWidget {
  final String label;
  final String studentText;
  final String modelAnswer;

  const _AnswerPair({
    required this.label,
    required this.studentText,
    required this.modelAnswer,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700),
        ),
        const SizedBox(height: 6),
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: _AnswerBox(
                label: 'YOUR ANSWER',
                text: studentText.trim().isEmpty ? '-' : studentText,
                bg: AppTheme.surfaceOf(context),
                border: AppTheme.borderOf(context),
                fg: AppTheme.text2Of(context),
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: _AnswerBox(
                label: 'EXPECTED ANSWER',
                text: modelAnswer,
                bg: AppTheme.successBgOf(context),
                border: AppTheme.successBorderOf(context),
                fg: AppTheme.successFgOf(context),
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class _AnswerBox extends StatelessWidget {
  final String label;
  final String text;
  final Color bg;
  final Color border;
  final Color fg;

  const _AnswerBox({
    required this.label,
    required this.text,
    required this.bg,
    required this.border,
    required this.fg,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: bg,
        border: Border.all(color: border),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: TextStyle(
              fontSize: 9,
              fontWeight: FontWeight.w800,
              color: fg,
            ),
          ),
          const SizedBox(height: 5),
          Text(
            text,
            style: const TextStyle(fontSize: 12, height: 1.45),
          ),
        ],
      ),
    );
  }
}

class _ReviewSheet extends StatelessWidget {
  final List<ModelPracticeQuestion> questions;
  final int questionIdx;
  final Map<int, Object> answers;
  final Map<String, String> validationErrors;
  final void Function(int) onGoto;
  final VoidCallback onCancel;
  final VoidCallback onConfirm;

  const _ReviewSheet({
    required this.questions,
    required this.questionIdx,
    required this.answers,
    required this.validationErrors,
    required this.onGoto,
    required this.onCancel,
    required this.onConfirm,
  });

  @override
  Widget build(BuildContext context) {
    final total = questions.length;
    final answered = questions.where(_isAnswered).length;
    final unanswered = total - answered;
    final needsFix = questions.where(_isInvalid).length;
    final groups = _groups();

    return DraggableScrollableSheet(
      expand: false,
      initialChildSize: 0.78,
      minChildSize: 0.45,
      maxChildSize: 0.95,
      builder: (ctx, scrollCtrl) => Column(
        children: [
          Container(
            width: 36,
            height: 4,
            margin: const EdgeInsets.only(top: 10, bottom: 8),
            decoration: BoxDecoration(
              color: AppTheme.borderOf(context),
              borderRadius: BorderRadius.circular(999),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Row(
              children: [
                const Text(
                  'Review Your Answers',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
                ),
                const Spacer(),
                IconButton(
                  icon: const Icon(Icons.close, size: 18),
                  onPressed: onCancel,
                ),
              ],
            ),
          ),
          Expanded(
            child: ListView(
              controller: scrollCtrl,
              padding: const EdgeInsets.all(16),
              children: [
                Row(
                  children: [
                    _StatChip(
                      label: 'Total',
                      value: '$total',
                      bg: AppTheme.surfaceOf(context),
                      fg: AppTheme.textOf(context),
                    ),
                    const SizedBox(width: 6),
                    _StatChip(
                      label: 'Answered',
                      value: '$answered',
                      bg: AppTheme.successBgOf(context),
                      fg: AppTheme.successFgOf(context),
                    ),
                    const SizedBox(width: 6),
                    _StatChip(
                      label: 'Unanswered',
                      value: '$unanswered',
                      bg: unanswered > 0
                          ? AppTheme.warningBgOf(context)
                          : AppTheme.surfaceOf(context),
                      fg: unanswered > 0
                          ? AppTheme.warningFgOf(context)
                          : AppTheme.text2Of(context),
                    ),
                    const SizedBox(width: 6),
                    _StatChip(
                      label: 'Needs Fix',
                      value: '$needsFix',
                      bg: needsFix > 0
                          ? AppTheme.warningBgOf(context)
                          : AppTheme.surfaceOf(context),
                      fg: needsFix > 0
                          ? AppTheme.warningFgOf(context)
                          : AppTheme.text2Of(context),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                for (final group in groups) ...[
                  if (group != groups.first) const SizedBox(height: 12),
                  Text(
                    group.label,
                    style: TextStyle(
                      fontSize: 9,
                      fontWeight: FontWeight.w800,
                      color: AppTheme.textMutedOf(context),
                      letterSpacing: 0.6,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Wrap(
                    spacing: 6,
                    runSpacing: 6,
                    children: group.questions.map((q) {
                      final i = questions.indexOf(q);
                      final current = i == questionIdx;
                      final done = _isAnswered(q);
                      final invalid = _isInvalid(q);
                      Color bg;
                      Color fg;
                      Border? border;
                      if (current) {
                        bg = Colors.transparent;
                        fg = AppTheme.brand;
                        border = Border.all(color: AppTheme.brand, width: 2);
                      } else if (invalid) {
                        bg = AppTheme.warningBgOf(context);
                        fg = AppTheme.warningFgOf(context);
                      } else if (done) {
                        bg = AppTheme.successBgOf(context);
                        fg = AppTheme.successFgOf(context);
                      } else {
                        bg = AppTheme.surfaceOf(context);
                        fg = AppTheme.textMutedOf(context);
                      }
                      return GestureDetector(
                        onTap: () => onGoto(i),
                        child: Container(
                          width: 34,
                          height: 34,
                          alignment: Alignment.center,
                          decoration: BoxDecoration(
                            color: bg,
                            borderRadius: BorderRadius.circular(8),
                            border: border ??
                                Border.all(color: AppTheme.borderOf(context)),
                          ),
                          child: Text(
                            '${i + 1}',
                            style: TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.w700,
                              color: fg,
                            ),
                          ),
                        ),
                      );
                    }).toList(),
                  ),
                ],
                const SizedBox(height: 14),
                Row(
                  children: [
                    const _LegendChip(
                      color: AppTheme.brand,
                      label: 'Current',
                    ),
                    const _LegendChip(
                      color: AppTheme.success,
                      label: 'Answered',
                    ),
                    _LegendChip(
                      color: AppTheme.borderOf(context),
                      label: 'Unanswered',
                    ),
                    const _LegendChip(
                      color: AppTheme.warning,
                      label: 'Needs correction',
                    ),
                  ],
                ),
              ],
            ),
          ),
          SafeArea(
            top: false,
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 10, 16, 16),
              child: Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      onPressed: onCancel,
                      child: const Text('Cancel'),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: FilledButton(
                      onPressed: onConfirm,
                      child: const Text('Submit'),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  bool _isAnswered(ModelPracticeQuestion question) {
    final answer = answers[question.number];
    if (question.type == ModelPracticeQuestionType.mcq) {
      return _asAnswerInt(answer) != null;
    }
    if (question.type == ModelPracticeQuestionType.reference) {
      return _asAnswerMap(answer)
              ?.values
              .any((value) => value.toString().trim().isNotEmpty) ??
          false;
    }
    return _asAnswerString(answer)?.trim().isNotEmpty ?? false;
  }

  bool _isInvalid(ModelPracticeQuestion question) {
    if (question.type == ModelPracticeQuestionType.reference) {
      for (var i = 0; i < question.subQuestions.length; i++) {
        if (validationErrors.containsKey('${question.number}_$i')) {
          return true;
        }
      }
      return false;
    }
    return validationErrors.containsKey('${question.number}');
  }

  List<_ReviewQuestionGroup> _groups() {
    final groups = <_ReviewQuestionGroup>[];
    for (final question in questions) {
      final existing = groups.where((g) => g.label == question.groupLabel);
      if (existing.isNotEmpty) {
        existing.first.questions.add(question);
      } else {
        groups.add(_ReviewQuestionGroup(question.groupLabel, [question]));
      }
    }
    return groups;
  }
}

class _ReviewQuestionGroup {
  final String label;
  final List<ModelPracticeQuestion> questions;

  _ReviewQuestionGroup(this.label, this.questions);
}

class _StatChip extends StatelessWidget {
  final String label;
  final String value;
  final Color bg;
  final Color fg;

  const _StatChip({
    required this.label,
    required this.value,
    required this.bg,
    required this.fg,
  });

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
        decoration: BoxDecoration(
          color: bg,
          borderRadius: BorderRadius.circular(10),
          border: Border.all(color: AppTheme.borderOf(context)),
        ),
        child: Column(
          children: [
            Text(
              value,
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w800,
                color: fg,
              ),
            ),
            Text(
              label,
              style: TextStyle(
                fontSize: 10,
                color: AppTheme.textMutedOf(context),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _LegendChip extends StatelessWidget {
  final Color color;
  final String label;

  const _LegendChip({required this.color, required this.label});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(right: 12, bottom: 6),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 8,
            height: 8,
            decoration: BoxDecoration(color: color, shape: BoxShape.circle),
          ),
          const SizedBox(width: 5),
          Text(
            label,
            style: TextStyle(
              fontSize: 11,
              color: AppTheme.textMutedOf(context),
            ),
          ),
        ],
      ),
    );
  }
}
