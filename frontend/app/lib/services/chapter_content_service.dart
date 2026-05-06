import 'dart:convert';
import 'package:flutter/services.dart';
import '../models/chapter_content_model.dart';

class ChapterContentService {
  static final ChapterContentService _instance = ChapterContentService._();
  factory ChapterContentService() => _instance;
  ChapterContentService._();

  final Map<String, ChapterContent?> _cache = {};

  Future<ChapterContent?> loadContent(String chapterSlug) async {
    if (_cache.containsKey(chapterSlug)) return _cache[chapterSlug];
    try {
      final raw = await rootBundle.loadString(
        'assets/content/chapters/$chapterSlug.json',
      );
      final data = jsonDecode(raw) as Map<String, dynamic>;
      final content = ChapterContent.fromJson(data);
      _cache[chapterSlug] = content;
      return content;
    } catch (_) {
      _cache[chapterSlug] = null;
      return null;
    }
  }

  bool hasContent(String chapterSlug) => _cache.containsKey(chapterSlug)
      ? _cache[chapterSlug] != null
      : false;
}
