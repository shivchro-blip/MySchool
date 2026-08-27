import 'dart:convert';

import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../config/final_exam_prep_config.dart';
import '../models/exam_paper_model.dart';
import '../models/static_model_paper_model.dart';

class ModelPaperService {
  static const _assetRoot = 'assets/model_papers';

  static const _available = <_ModelPaperAsset>[
    _ModelPaperAsset(
      classLevel: '+1',
      subjectSlug: 'english',
      id: 'class11-english-model-qa-1',
      modelId: 'model-qa-1',
      label: 'Set 1',
      title: 'Full Syllabus Model Paper — Set 1',
      assetName: 'class11EnglishModelQA1.js',
    ),
    _ModelPaperAsset(
      classLevel: '+1',
      subjectSlug: 'english',
      id: 'class11-english-model-qa-2',
      modelId: 'model-qa-2',
      label: 'Set 2',
      title: 'Full Syllabus Model Paper — Set 2',
      assetName: 'class11EnglishModelQA2.js',
    ),
    _ModelPaperAsset(
      classLevel: '+1',
      subjectSlug: 'english',
      id: 'class11-english-model-qa-3',
      modelId: 'model-qa-3',
      label: 'Set 3',
      title: 'Full Syllabus Model Paper — Set 3',
      assetName: 'class11EnglishModelQA3.js',
    ),
    _ModelPaperAsset(
      classLevel: '+1',
      subjectSlug: 'english',
      id: 'class11-english-model-qa-4',
      modelId: 'model-qa-4',
      label: 'Set 4',
      title: 'Full Syllabus Model Paper — Set 4',
      assetName: 'class11EnglishModelQA4.js',
    ),
    _ModelPaperAsset(
      classLevel: '+1',
      subjectSlug: 'english',
      id: 'class11-english-model-qa-5',
      modelId: 'model-qa-5',
      label: 'Set 5',
      title: 'Full Syllabus Model Paper — Set 5',
      assetName: 'class11EnglishModelQA5.js',
    ),
    _ModelPaperAsset(
      classLevel: '+2',
      subjectSlug: 'english',
      id: 'class12-english-model-qa-1',
      modelId: 'model-qa-1',
      label: 'Set 1',
      title: 'Full Syllabus Model Paper — Set 1',
      assetName: 'class12EnglishModelQA1.js',
    ),
    _ModelPaperAsset(
      classLevel: '+2',
      subjectSlug: 'english',
      id: 'class12-english-model-qa-2',
      modelId: 'model-qa-2',
      label: 'Set 2',
      title: 'Full Syllabus Model Paper — Set 2',
      assetName: 'class12EnglishModelQA2.js',
    ),
    _ModelPaperAsset(
      classLevel: '+2',
      subjectSlug: 'english',
      id: 'class12-english-model-qa-3',
      modelId: 'model-qa-3',
      label: 'Set 3',
      title: 'Full Syllabus Model Paper — Set 3',
      assetName: 'class12EnglishModelQA3.js',
    ),
    _ModelPaperAsset(
      classLevel: '+2',
      subjectSlug: 'english',
      id: 'class12-english-model-qa-4',
      modelId: 'model-qa-4',
      label: 'Set 4',
      title: 'Full Syllabus Model Paper — Set 4',
      assetName: 'class12EnglishModelQA4.js',
    ),
    _ModelPaperAsset(
      classLevel: '+2',
      subjectSlug: 'english',
      id: 'class12-english-model-qa-5',
      modelId: 'model-qa-5',
      label: 'Set 5',
      title: 'Full Syllabus Model Paper — Set 5',
      assetName: 'class12EnglishModelQA5.js',
    ),
    _ModelPaperAsset(
      classLevel: '+1',
      subjectSlug: 'computer-applications',
      id: 'class11-computer-applications-model-qa-1',
      modelId: 'model-qa-1',
      label: 'Set 1',
      title: 'Full Syllabus Model Paper — Set 1',
      assetName: 'class11ComputerApplicationsModelQA1.js',
    ),
    _ModelPaperAsset(
      classLevel: '+1',
      subjectSlug: 'computer-applications',
      id: 'class11-computer-applications-model-qa-2',
      modelId: 'model-qa-2',
      label: 'Set 2',
      title: 'Full Syllabus Model Paper — Set 2',
      assetName: 'class11ComputerApplicationsModelQA2.js',
    ),
    _ModelPaperAsset(
      classLevel: '+1',
      subjectSlug: 'computer-applications',
      id: 'class11-computer-applications-model-qa-3',
      modelId: 'model-qa-3',
      label: 'Set 3',
      title: 'Full Syllabus Model Paper — Set 3',
      assetName: 'class11ComputerApplicationsModelQA3.js',
    ),
    _ModelPaperAsset(
      classLevel: '+1',
      subjectSlug: 'computer-applications',
      id: 'class11-computer-applications-model-qa-4',
      modelId: 'model-qa-4',
      label: 'Set 4',
      title: 'Full Syllabus Model Paper — Set 4',
      assetName: 'class11ComputerApplicationsModelQA4.js',
    ),
    _ModelPaperAsset(
      classLevel: '+1',
      subjectSlug: 'computer-applications',
      id: 'class11-computer-applications-model-qa-5',
      modelId: 'model-qa-5',
      label: 'Set 5',
      title: 'Full Syllabus Model Paper — Set 5',
      assetName: 'class11ComputerApplicationsModelQA5.js',
    ),
    _ModelPaperAsset(
      classLevel: '+1',
      subjectSlug: 'computer-science',
      id: 'class11-computer-science-model-qa-1',
      modelId: 'model-qa-1',
      label: 'Set 1',
      title: 'Full Syllabus Model Paper — Set 1',
      assetName: 'class11ComputerScienceModelQA1.js',
    ),
    _ModelPaperAsset(
      classLevel: '+1',
      subjectSlug: 'computer-science',
      id: 'class11-computer-science-model-qa-2',
      modelId: 'model-qa-2',
      label: 'Set 2',
      title: 'Full Syllabus Model Paper — Set 2',
      assetName: 'class11ComputerScienceModelQA2.js',
    ),
    _ModelPaperAsset(
      classLevel: '+1',
      subjectSlug: 'computer-science',
      id: 'class11-computer-science-model-qa-3',
      modelId: 'model-qa-3',
      label: 'Set 3',
      title: 'Full Syllabus Model Paper — Set 3',
      assetName: 'class11ComputerScienceModelQA3.js',
    ),
    _ModelPaperAsset(
      classLevel: '+1',
      subjectSlug: 'computer-science',
      id: 'class11-computer-science-model-qa-4',
      modelId: 'model-qa-4',
      label: 'Set 4',
      title: 'Full Syllabus Model Paper — Set 4',
      assetName: 'class11ComputerScienceModelQA4.js',
    ),
    _ModelPaperAsset(
      classLevel: '+1',
      subjectSlug: 'computer-science',
      id: 'class11-computer-science-model-qa-5',
      modelId: 'model-qa-5',
      label: 'Set 5',
      title: 'Full Syllabus Model Paper — Set 5',
      assetName: 'class11ComputerScienceModelQA5.js',
    ),
    _ModelPaperAsset(
      classLevel: '+2',
      subjectSlug: 'computer-applications',
      id: 'class12-computer-applications-model-qa-1',
      modelId: 'model-qa-1',
      label: 'Set 1',
      title: 'Full Syllabus Model Paper — Set 1',
      assetName: 'class12ComputerApplicationsModelQA1.js',
    ),
    _ModelPaperAsset(
      classLevel: '+2',
      subjectSlug: 'computer-applications',
      id: 'class12-computer-applications-model-qa-2',
      modelId: 'model-qa-2',
      label: 'Set 2',
      title: 'Full Syllabus Model Paper — Set 2',
      assetName: 'class12ComputerApplicationsModelQA2.js',
    ),
    _ModelPaperAsset(
      classLevel: '+2',
      subjectSlug: 'computer-applications',
      id: 'class12-computer-applications-model-qa-3',
      modelId: 'model-qa-3',
      label: 'Set 3',
      title: 'Full Syllabus Model Paper — Set 3',
      assetName: 'class12ComputerApplicationsModelQA3.js',
    ),
    _ModelPaperAsset(
      classLevel: '+2',
      subjectSlug: 'computer-applications',
      id: 'class12-computer-applications-model-qa-4',
      modelId: 'model-qa-4',
      label: 'Set 4',
      title: 'Full Syllabus Model Paper — Set 4',
      assetName: 'class12ComputerApplicationsModelQA4.js',
    ),
    _ModelPaperAsset(
      classLevel: '+2',
      subjectSlug: 'computer-applications',
      id: 'class12-computer-applications-model-qa-5',
      modelId: 'model-qa-5',
      label: 'Set 5',
      title: 'Full Syllabus Model Paper — Set 5',
      assetName: 'class12ComputerApplicationsModelQA5.js',
    ),
    _ModelPaperAsset(
      classLevel: '+2',
      subjectSlug: 'computer-science',
      id: 'class12-computer-science-model-qa-1',
      modelId: 'model-qa-1',
      label: 'Set 1',
      title: 'Full Syllabus Model Paper — Set 1',
      assetName: 'class12ComputerScienceModelQA1.js',
    ),
    _ModelPaperAsset(
      classLevel: '+2',
      subjectSlug: 'computer-science',
      id: 'class12-computer-science-model-qa-2',
      modelId: 'model-qa-2',
      label: 'Set 2',
      title: 'Full Syllabus Model Paper — Set 2',
      assetName: 'class12ComputerScienceModelQA2.js',
    ),
    _ModelPaperAsset(
      classLevel: '+2',
      subjectSlug: 'computer-science',
      id: 'class12-computer-science-model-qa-3',
      modelId: 'model-qa-3',
      label: 'Set 3',
      title: 'Full Syllabus Model Paper — Set 3',
      assetName: 'class12ComputerScienceModelQA3.js',
    ),
    _ModelPaperAsset(
      classLevel: '+2',
      subjectSlug: 'computer-science',
      id: 'class12-computer-science-model-qa-4',
      modelId: 'model-qa-4',
      label: 'Set 4',
      title: 'Full Syllabus Model Paper — Set 4',
      assetName: 'class12ComputerScienceModelQA4.js',
    ),
    _ModelPaperAsset(
      classLevel: '+2',
      subjectSlug: 'computer-science',
      id: 'class12-computer-science-model-qa-5',
      modelId: 'model-qa-5',
      label: 'Set 5',
      title: 'Full Syllabus Model Paper — Set 5',
      assetName: 'class12ComputerScienceModelQA5.js',
    ),
    // TODO: Tamil model paper assets pending — Batch 1 conversion.
    // Uncomment once assets/model_papers/class12ComputerApplicationsTamilModelQA*.js
    // and assets/model_papers/class12ComputerScienceTamilModelQA*.js exist, matching
    // the naming convention used by the English entries above.
    // _ModelPaperAsset(
    //   classLevel: '+2',
    //   subjectSlug: 'computer-applications-tamil',
    //   id: 'class12-computer-applications-tamil-model-qa-1',
    //   modelId: 'model-qa-1',
    //   label: 'Set 1',
    //   title: 'Full Syllabus Model Paper — Set 1',
    //   assetName: 'class12ComputerApplicationsTamilModelQA1.js',
    // ),
    // _ModelPaperAsset(
    //   classLevel: '+2',
    //   subjectSlug: 'computer-science-tamil',
    //   id: 'class12-computer-science-tamil-model-qa-1',
    //   modelId: 'model-qa-1',
    //   label: 'Set 1',
    //   title: 'Full Syllabus Model Paper — Set 1',
    //   assetName: 'class12ComputerScienceTamilModelQA1.js',
    // ),
  ];

  static final Map<String, Map<String, dynamic>> _rawCache = {};
  static final Map<String, ExamPaperData> _paperCache = {};

  static List<ModelPaper> getPapers(String classLevel, String subjectSlug) {
    return _available
        .where((paper) =>
            paper.classLevel == classLevel && paper.subjectSlug == subjectSlug)
        .map((paper) => ModelPaper(
              id: paper.id,
              modelId: paper.modelId,
              label: paper.label,
              title: paper.title,
            ))
        .toList(growable: false);
  }

  static ModelPaper? getPaper(
    String classLevel,
    String subjectSlug,
    String setId,
  ) {
    for (final paper in getPapers(classLevel, subjectSlug)) {
      if (paper.id == setId || paper.modelId == setId) return paper;
    }
    return null;
  }

  static Future<ExamPaperData> loadPaper(
    String classLevel,
    String subjectSlug,
    String setId,
  ) async {
    final asset = _findAsset(classLevel, subjectSlug, setId);
    if (asset == null) {
      throw StateError(
          'Model paper not found: $classLevel/$subjectSlug/$setId');
    }
    if (_paperCache.containsKey(asset.id)) return _paperCache[asset.id]!;

    final raw = await _loadRaw(asset);
    final paper = _paperFromRaw(raw);
    _paperCache[asset.id] = paper;
    return paper;
  }

  static Future<List<ModelPracticeQuestion>> loadPracticeQuestions(
    String classLevel,
    String subjectSlug,
    String setId,
  ) async {
    final asset = _findAsset(classLevel, subjectSlug, setId);
    if (asset == null) return const <ModelPracticeQuestion>[];

    final raw = await _loadRaw(asset);
    final practice = raw['practice'];
    if (practice is! Map) return const <ModelPracticeQuestion>[];
    final parts = practice['parts'];
    if (parts is! List) return const <ModelPracticeQuestion>[];

    final questions = <ModelPracticeQuestion>[];
    for (final part in parts) {
      if (part is! Map) continue;
      final type = _asString(part['type']);
      final marks = _asInt(part['marksPer'], fallback: 1);
      final partId = _asString(part['id']);
      final partTitle = _asString(part['title'] ?? part['navLabel']);
      final instruction = _asString(part['instruction']);
      final scoreMax =
          part['scoreMax'] is num ? (part['scoreMax'] as num).toInt() : null;
      final groupLabel = _practiceGroupLabel(type, marks);

      if (type == 'mcq') {
        final sections = part['sections'];
        if (sections is! List) continue;
        for (final section in sections) {
          if (section is! Map || section['questions'] is! List) continue;
          final sectionName = _asString(section['label']);
          for (final rawQuestion in section['questions'] as List) {
            if (rawQuestion is! Map) continue;
            final options = rawQuestion['options'];
            final answer = rawQuestion['answer'];
            if (options is! List) continue;
            questions.add(ModelPracticeQuestion(
              number: questions.length + 1,
              sourceId: _asString(rawQuestion['id']),
              type: ModelPracticeQuestionType.mcq,
              partId: partId,
              partTitle: partTitle,
              sectionName: sectionName,
              sectionInstructions: instruction,
              groupLabel: groupLabel,
              marks: marks,
              partScoreMax: scoreMax,
              prompt: _asString(rawQuestion['html'] ?? rawQuestion['q']),
              options:
                  options.map((option) => _cleanOption('$option')).toList(),
              correctIndex: answer is num ? answer.toInt() : null,
              officialKey: _asString(rawQuestion['officialKey']),
              modelAnswer: _nullableString(rawQuestion['ans']),
            ));
          }
        }
      } else if (type == 'reference') {
        final rawQuestions = part['questions'];
        if (rawQuestions is! List) continue;
        for (final rawQuestion in rawQuestions) {
          if (rawQuestion is! Map) continue;
          final subs = rawQuestion['subs'];
          questions.add(ModelPracticeQuestion(
            number: questions.length + 1,
            sourceId: _asString(rawQuestion['id']),
            type: ModelPracticeQuestionType.reference,
            partId: partId,
            partTitle: partTitle,
            sectionName: partTitle,
            sectionInstructions: instruction,
            groupLabel: groupLabel,
            marks: marks,
            partScoreMax: scoreMax,
            prompt: _asString(rawQuestion['q']),
            referenceText: _nullableString(rawQuestion['verse']),
            subQuestions: subs is List
                ? subs.whereType<Map>().map((sub) {
                    return ModelPracticeSubQuestion(
                      prompt: _asString(sub['q']),
                      modelAnswer: _asString(sub['a']),
                      officialKey: _asString(sub['officialKey']),
                    );
                  }).toList(growable: false)
                : const <ModelPracticeSubQuestion>[],
            officialKey: _asString(rawQuestion['officialKey']),
            modelAnswer: _nullableString(rawQuestion['ans']),
          ));
        }
      } else if (type == 'short-essay' || type == 'long-essay') {
        final rawQuestions = part['questions'];
        if (rawQuestions is! List) continue;
        for (final rawQuestion in rawQuestions) {
          if (rawQuestion is! Map) continue;
          questions.add(ModelPracticeQuestion(
            number: questions.length + 1,
            sourceId: _asString(rawQuestion['id']),
            type: ModelPracticeQuestionType.written,
            partId: partId,
            partTitle: partTitle,
            sectionName: partTitle,
            sectionInstructions: instruction,
            groupLabel: groupLabel,
            marks: marks,
            partScoreMax: scoreMax,
            prompt: _asString(rawQuestion['q']),
            officialKey: _asString(rawQuestion['officialKey']),
            modelAnswer: _nullableString(rawQuestion['ans']),
          ));
        }
      }
    }
    return questions;
  }

  static Future<List<ModelPaperAttemptSummary>> getAttempts(
      String setId) async {
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString('exam_coach_sessions_$setId');
    if (raw == null || raw.isEmpty) return const <ModelPaperAttemptSummary>[];

    final decoded = jsonDecode(raw);
    if (decoded is! List) return const <ModelPaperAttemptSummary>[];

    final attempts = <ModelPaperAttemptSummary>[];
    for (final item in decoded) {
      if (item is! Map) continue;
      final score = item['score'];
      final total = item['total'];
      final date = DateTime.tryParse('${item['date']}');
      if (score is num && total is num && date != null) {
        attempts.add(ModelPaperAttemptSummary(
          score: score.toInt(),
          total: total.toInt(),
          date: date,
        ));
      }
    }
    return attempts.reversed.toList(growable: false);
  }

  static Future<void> saveAttempt({
    required String setId,
    required int score,
    required int total,
  }) async {
    final prefs = await SharedPreferences.getInstance();
    final key = 'exam_coach_sessions_$setId';
    final raw = prefs.getString(key);
    final sessions = raw == null || raw.isEmpty
        ? <dynamic>[]
        : (jsonDecode(raw) as List<dynamic>);
    sessions.add({
      'score': score,
      'total': total,
      'date': DateTime.now().toIso8601String(),
    });
    await prefs.setString(key, jsonEncode(sessions));
  }

  static _ModelPaperAsset? _findAsset(
    String classLevel,
    String subjectSlug,
    String setId,
  ) {
    for (final asset in _available) {
      if (asset.classLevel == classLevel &&
          asset.subjectSlug == subjectSlug &&
          (asset.id == setId || asset.modelId == setId)) {
        return asset;
      }
    }
    return null;
  }

  static Future<Map<String, dynamic>> _loadRaw(_ModelPaperAsset asset) async {
    if (_rawCache.containsKey(asset.id)) return _rawCache[asset.id]!;

    final source =
        await rootBundle.loadString('$_assetRoot/${asset.assetName}');
    final start = source.indexOf('{');
    final end = source.lastIndexOf('};');
    if (start < 0 || end < start) {
      throw FormatException(
          'Invalid web model paper asset: ${asset.assetName}');
    }
    final jsonSource = source.substring(start, end + 1);
    final raw = jsonDecode(jsonSource) as Map<String, dynamic>;
    _rawCache[asset.id] = raw;
    return raw;
  }

  static ExamPaperData _paperFromRaw(Map<String, dynamic> raw) {
    final pages = (raw['pages'] as List? ?? const <dynamic>[])
        .whereType<Map>()
        .map((page) => ExamPage(
              pageNumber: _asInt(page['pageNumber']),
              blocks: (page['blocks'] as List? ?? const <dynamic>[])
                  .whereType<Map>()
                  .map(_blockFromRaw)
                  .toList(growable: false),
            ))
        .toList(growable: false);

    return ExamPaperData(
      paperId: _asString(raw['paperId']),
      title: _asString(raw['title']),
      classLabel: _asString(raw['classLabel']),
      subject: _asString(raw['subject']),
      duration: _asString(raw['duration']),
      maximumMarks: _asInt(raw['maximumMarks']),
      totalPages: _asInt(raw['totalPages'], fallback: pages.length),
      pages: pages,
    );
  }

  static ExamBlock _blockFromRaw(Map<dynamic, dynamic> raw) {
    return ExamBlock(
      type: _asString(raw['type']),
      content: _nullableString(raw['content']),
      subContent: _nullableString(raw['subContent']),
      items: _metadataItems(raw),
      questionId: _nullableString(raw['questionId']),
      marks: raw['marks'] is num ? (raw['marks'] as num).toInt() : null,
      options: _stringList(raw['options']),
      subQuestions: _subQuestions(raw['subQuestions']),
      optionA: _blockOption(raw['optionA']),
      optionB: _blockOption(raw['optionB']),
      headers: _stringList(raw['headers']),
      rows: _rows(raw['rows']),
      src: _nullableString(raw['src']),
      altText: _nullableString(raw['altText']),
      caption: _nullableString(raw['caption']),
      renderHint: _nullableString(raw['renderHint']),
      heading: _nullableString(raw['heading']),
      subheading: _nullableString(raw['subheading']),
      body: _nullableString(raw['body']),
      address: _nullableString(raw['address']),
    );
  }

  static List<MetadataItem>? _metadataItems(Map<dynamic, dynamic> raw) {
    final items = raw['items'];
    if (items is List) {
      return items
          .whereType<Map>()
          .map((item) => MetadataItem(
                label: _asString(item['label']),
                value: _asString(item['value']),
              ))
          .toList(growable: false);
    }
    if (raw['type'] != 'metadata_row') return null;
    return [
      MetadataItem(label: 'Time', value: _asString(raw['duration'])),
      MetadataItem(
          label: 'Maximum Marks', value: '${_asInt(raw['maximumMarks'])}'),
      MetadataItem(label: 'Total Pages', value: '${_asInt(raw['totalPages'])}'),
    ];
  }

  static List<ExamSubQuestion>? _subQuestions(Object? raw) {
    if (raw is! List) return null;
    return raw
        .whereType<Map>()
        .map((item) => ExamSubQuestion(
              id: _asString(item['id']),
              label: _asString(item['label']),
              content: _asString(item['content']),
              marks: _asInt(item['marks']),
            ))
        .toList(growable: false);
  }

  static ExamBlockOption? _blockOption(Object? raw) {
    if (raw is! Map) return null;
    return ExamBlockOption(content: _asString(raw['content']));
  }

  static List<String>? _stringList(Object? raw) {
    if (raw is! List) return null;
    return raw.map((item) => '$item').toList(growable: false);
  }

  static List<List<String>>? _rows(Object? raw) {
    if (raw is! List) return null;
    return raw
        .whereType<List>()
        .map((row) => row.map((item) => '$item').toList(growable: false))
        .toList(growable: false);
  }

  static String _asString(Object? value) => value == null ? '' : '$value';

  static String? _nullableString(Object? value) =>
      value == null ? null : '$value';

  static int _asInt(Object? value, {int fallback = 0}) {
    if (value is int) return value;
    if (value is num) return value.toInt();
    return int.tryParse('$value') ?? fallback;
  }

  static String _cleanOption(String value) {
    return value.replaceFirst(RegExp(r'^[a-d]\)\s*', caseSensitive: false), '');
  }

  static String _practiceGroupLabel(String type, int marks) {
    final suffix = marks == 1 ? '1 MARK' : '$marks MARKS';
    return switch (type) {
      'mcq' => 'MCQ · $suffix',
      'reference' => 'REFERENCE · $suffix',
      'long-essay' => 'ESSAY · $suffix',
      'short-essay' => 'SHORT ANSWER · ${marks == 3 ? '3M' : suffix}',
      _ => '${type.toUpperCase()} · $suffix',
    };
  }
}

class _ModelPaperAsset {
  final String classLevel;
  final String subjectSlug;
  final String id;
  final String modelId;
  final String label;
  final String title;
  final String assetName;

  const _ModelPaperAsset({
    required this.classLevel,
    required this.subjectSlug,
    required this.id,
    required this.modelId,
    required this.label,
    required this.title,
    required this.assetName,
  });
}
