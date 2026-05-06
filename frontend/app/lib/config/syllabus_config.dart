import 'package:flutter/material.dart';

class UnitLesson {
  final String slug;
  final String title;
  final String contentType;
  const UnitLesson({required this.slug, required this.title, required this.contentType});
}

class UnitConfig {
  final int    id;
  final String title;
  final Color  color;
  final Color  light;
  final List<UnitLesson> lessons;
  const UnitConfig({
    required this.id,
    required this.title,
    required this.color,
    required this.light,
    required this.lessons,
  });
}

class SyllabusConfig {
  static const _plus1English = [
    UnitConfig(
      id: 1, title: 'Unit 1',
      color: Color(0xFFe8824a), light: Color(0xFFfdf0e8),
      lessons: [
        UnitLesson(slug: 'the-portrait-of-a-lady',        title: 'The Portrait of a Lady',        contentType: 'prose'),
        UnitLesson(slug: 'once-upon-a-time',               title: 'Once Upon a Time',               contentType: 'poem'),
        UnitLesson(slug: 'after-twenty-years',             title: 'After Twenty Years',             contentType: 'supplementary'),
      ],
    ),
    UnitConfig(
      id: 2, title: 'Unit 2',
      color: Color(0xFF5c8fd6), light: Color(0xFFeaf2fd),
      lessons: [
        UnitLesson(slug: 'the-queen-of-boxing',            title: 'The Queen of Boxing',            contentType: 'prose'),
        UnitLesson(slug: 'confessions-of-a-born-spectator',title: 'Confessions of a Born Spectator',contentType: 'poem'),
        UnitLesson(slug: 'a-shot-in-the-dark',             title: 'A Shot in the Dark',             contentType: 'supplementary'),
      ],
    ),
    UnitConfig(
      id: 3, title: 'Unit 3',
      color: Color(0xFF59a87a), light: Color(0xFFe8f5ee),
      lessons: [
        UnitLesson(slug: 'forgetting',                     title: 'Forgetting',                     contentType: 'prose'),
        UnitLesson(slug: 'lines-written-in-early-spring',  title: 'Lines Written in Early Spring',  contentType: 'poem'),
        UnitLesson(slug: 'the-first-patient',              title: 'The First Patient',              contentType: 'supplementary'),
      ],
    ),
    UnitConfig(
      id: 4, title: 'Unit 4',
      color: Color(0xFFa06cd5), light: Color(0xFFf2ebfc),
      lessons: [
        UnitLesson(slug: 'tight-corners',                  title: 'Tight Corners',                  contentType: 'prose'),
        UnitLesson(slug: 'macavity-the-mystery-cat',       title: 'Macavity – The Mystery Cat',     contentType: 'poem'),
        UnitLesson(slug: 'with-the-photographer',          title: 'With the Photographer',          contentType: 'supplementary'),
      ],
    ),
    UnitConfig(
      id: 5, title: 'Unit 5',
      color: Color(0xFFd4873a), light: Color(0xFFfdf3e7),
      lessons: [
        UnitLesson(slug: 'the-convocation-address',        title: 'The Convocation Address',        contentType: 'prose'),
        UnitLesson(slug: 'everest-is-not-the-only-peak',   title: 'Everest is Not the Only Peak',   contentType: 'poem'),
        UnitLesson(slug: 'the-singing-lesson',             title: 'The Singing Lesson',             contentType: 'supplementary'),
      ],
    ),
    UnitConfig(
      id: 6, title: 'Unit 6',
      color: Color(0xFFd45c6a), light: Color(0xFFfdeaec),
      lessons: [
        UnitLesson(slug: 'the-accidental-tourist',         title: 'The Accidental Tourist',         contentType: 'prose'),
        UnitLesson(slug: 'the-hollow-crown',               title: 'The Hollow Crown',               contentType: 'poem'),
        UnitLesson(slug: 'the-never-never-nest',           title: 'The Never Never Nest',           contentType: 'supplementary'),
      ],
    ),
  ];

  static List<UnitConfig>? getUnits(String classLevel, String subjectSlug) {
    final key = '${classLevel.toLowerCase()}/${subjectSlug.toLowerCase()}';
    return switch (key) {
      '+1/english' => _plus1English,
      _            => null,
    };
  }
}
