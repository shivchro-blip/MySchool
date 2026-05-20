import 'dart:convert';
import 'package:flutter/services.dart';
import '../models/chapter_content_model.dart';

class ChapterContentService {
  static final ChapterContentService _instance = ChapterContentService._();
  factory ChapterContentService() => _instance;
  ChapterContentService._();

  final Map<String, ChapterContent?> _cache = {};

  Future<ChapterContent?> loadContent(
    String classLevel,
    String subjectSlug,
    String chapterSlug,
  ) async {
    final cacheKey = '$classLevel/$subjectSlug/$chapterSlug';
    if (_cache.containsKey(cacheKey)) {
      return _cache[cacheKey];
    }
    try {
      final folder = _toAssetFolder(classLevel, subjectSlug);
      final raw = await rootBundle.loadString(
        'assets/content/$folder/chapters/$chapterSlug.json',
      );
      final data = jsonDecode(raw) as Map<String, dynamic>;
      final content = ChapterContent.fromJson(data);
      _cache[cacheKey] = content;
      return content;
    } catch (_) {
      _cache[cacheKey] = null;
      return null;
    }
  }

  bool hasContent(String classLevel, String subjectSlug, String chapterSlug) {
    final key = '$classLevel/$subjectSlug/$chapterSlug';
    return _cache.containsKey(key) ? _cache[key] != null : false;
  }

  static String _toAssetFolder(String classLevel, String subjectSlug) {
    final cl = switch (classLevel.toLowerCase()) {
      '+1' => 'Class_11',
      '+2' => 'Class_12',
      _ => classLevel,
    };
    final sub = subjectSlug.isEmpty
        ? subjectSlug
        : subjectSlug[0].toUpperCase() + subjectSlug.substring(1);
    return '$cl/$sub';
  }
}
