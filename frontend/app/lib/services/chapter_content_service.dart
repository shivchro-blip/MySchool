import 'dart:convert';
import 'package:flutter/services.dart';
import '../models/chapter_content_model.dart';
import '../models/sectioned_chapter_content.dart';
import '../utils/asset_folder.dart';

class ChapterContentService {
  static final ChapterContentService _instance = ChapterContentService._();
  factory ChapterContentService() => _instance;
  ChapterContentService._();

  final Map<String, ChapterContent?> _cache = {};
  final Map<String, SectionedChapterContent?> _sectionedCache = {};

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
      final folder = AssetFolder.toFolder(classLevel, subjectSlug);
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

  Future<SectionedChapterContent?> loadSectionedContent(
    String classLevel,
    String subjectSlug,
    String chapterSlug,
  ) async {
    final cacheKey = '$classLevel/$subjectSlug/$chapterSlug';
    if (_sectionedCache.containsKey(cacheKey)) {
      return _sectionedCache[cacheKey];
    }
    try {
      final folder = AssetFolder.toFolder(classLevel, subjectSlug);
      final raw = await rootBundle.loadString(
        'assets/content/$folder/chapters/$chapterSlug.json',
      );
      final data = jsonDecode(raw) as Map<String, dynamic>;
      final content = SectionedChapterContent.fromJson(data);
      _sectionedCache[cacheKey] = content;
      return content;
    } catch (_) {
      _sectionedCache[cacheKey] = null;
      return null;
    }
  }

  bool hasContent(String classLevel, String subjectSlug, String chapterSlug) {
    final key = '$classLevel/$subjectSlug/$chapterSlug';
    return _cache.containsKey(key) ? _cache[key] != null : false;
  }
}
