import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class PracticeDraft {
  final String lessonSlug;
  final int currentQuestionIndex;
  final Map<String, dynamic> selectedAnswers;
  final Map<String, dynamic> writtenAnswers;
  final DateTime updatedAt;
  final int totalQuestions;
  final int version;

  PracticeDraft({
    required this.lessonSlug,
    required this.currentQuestionIndex,
    required this.selectedAnswers,
    required this.writtenAnswers,
    required this.updatedAt,
    required this.totalQuestions,
    this.version = 1,
  });

  Map<String, dynamic> toJson() => {
        'lessonSlug': lessonSlug,
        'currentQuestionIndex': currentQuestionIndex,
        'selectedAnswers': selectedAnswers,
        'writtenAnswers': writtenAnswers,
        'updatedAt': updatedAt.toIso8601String(),
        'totalQuestions': totalQuestions,
        'version': version,
      };

  static PracticeDraft? fromJson(Map<String, dynamic> json) {
    if (json['version'] != 1) return null;
    final lessonSlug = json['lessonSlug'];
    final currentQuestionIndex = json['currentQuestionIndex'];
    final totalQuestions = json['totalQuestions'];
    final updatedAt = json['updatedAt'];

    if (lessonSlug is! String || lessonSlug.trim().isEmpty) return null;
    if (currentQuestionIndex is! int || currentQuestionIndex < 0) return null;
    if (totalQuestions is! int || totalQuestions < 0) return null;
    if (updatedAt is! String) return null;

    return PracticeDraft(
      lessonSlug: lessonSlug,
      currentQuestionIndex: currentQuestionIndex,
      selectedAnswers: _stringMap(json['selectedAnswers']),
      writtenAnswers: _stringMap(json['writtenAnswers']),
      updatedAt: DateTime.tryParse(updatedAt) ?? DateTime.fromMillisecondsSinceEpoch(0),
      totalQuestions: totalQuestions,
    );
  }

  static Map<String, dynamic> _stringMap(dynamic value) {
    if (value is Map) {
      return Map<String, dynamic>.fromEntries(
        value.entries.map(
          (entry) => MapEntry(entry.key.toString(), entry.value),
        ),
      );
    }
    return <String, dynamic>{};
  }
}

class PracticeDraftStorage {
  static const int version = 1;

  static String buildKey({
    required String classLevel,
    required String subjectSlug,
    required String lessonSlug,
  }) {
    final scope = [_normalize(classLevel), _normalize(subjectSlug)]
        .where((part) => part.isNotEmpty)
        .join('_');
    return 'practice_draft_mobile_${scope}_$lessonSlug';
  }

  static Future<PracticeDraft?> load(String key) async {
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString(key);
    if (raw == null || raw.isEmpty) return null;

    try {
      final decoded = jsonDecode(raw);
      if (decoded is! Map<String, dynamic>) return null;
      return PracticeDraft.fromJson(decoded);
    } catch (_) {
      return null;
    }
  }

  static Future<void> save(String key, PracticeDraft draft) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(key, jsonEncode(draft.toJson()));
    } catch (_) {
      // Ignore storage failures.
    }
  }

  static Future<void> clear(String key) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove(key);
    } catch (_) {
      // Ignore storage failures.
    }
  }

  static String _normalize(String value) {
    final trimmed = value.trim();
    if (trimmed.isEmpty) return '';
    if (trimmed == '+1' || trimmed.toLowerCase() == 'plus1') return 'Class_11';
    if (trimmed == '+2' || trimmed.toLowerCase() == 'plus2') return 'Class_12';
    final compact = trimmed.replaceAll(RegExp(r'\s+'), '_');
    return compact[0].toUpperCase() + compact.substring(1);
  }
}
