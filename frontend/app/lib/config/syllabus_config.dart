import 'package:flutter/material.dart';
import '../models/syllabus_model.dart';

// ── Static subject list — mirrors frontend/web/src/data/syllabus.js ──────────

class SubjectConfig {
  final String slug;
  final String name;
  final String classLevel;
  const SubjectConfig({
    required this.slug,
    required this.name,
    required this.classLevel,
  });

  Subject toSubject() => Subject(
        id: '$classLevel/$slug',
        slug: slug,
        code: slug.toUpperCase(),
        name: name,
        classLevel: classLevel,
        isActive: true,
      );
}

class UnitLesson {
  final String slug;
  final String title;
  final String contentType;
  const UnitLesson(
      {required this.slug, required this.title, required this.contentType});
}

class UnitConfig {
  final int id;
  final String title;
  final Color color;
  final Color light;
  final List<UnitLesson> lessons;
  const UnitConfig({
    required this.id,
    required this.title,
    required this.color,
    required this.light,
    required this.lessons,
  });
}

class MathsChapter {
  final int    number;
  final String title;
  final String slug;
  final int    volume;
  const MathsChapter({
    required this.number,
    required this.title,
    required this.slug,
    required this.volume,
  });
}

class SyllabusConfig {
  // Mirrors web/src/data/syllabus.js — single source of truth for subject list
  static const _subjects = [
    SubjectConfig(slug: 'english', name: 'English', classLevel: '+1'),
    SubjectConfig(slug: 'maths', name: 'Mathematics', classLevel: '+1'),
    SubjectConfig(slug: 'science', name: 'Science', classLevel: '+1'),
    SubjectConfig(slug: 'english', name: 'English', classLevel: '+2'),
    SubjectConfig(slug: 'maths', name: 'Mathematics', classLevel: '+2'),
  ];

  static List<Subject> getSubjects() =>
      _subjects.map((s) => s.toSubject()).toList();

  static List<Subject> getSubjectsForClass(String classLevel) => _subjects
      .where((s) => s.classLevel == classLevel)
      .map((s) => s.toSubject())
      .toList();

  static const _plus1English = [
    UnitConfig(
      id: 1,
      title: 'Unit 1',
      color: Color(0xFFe8824a),
      light: Color(0xFFfdf0e8),
      lessons: [
        UnitLesson(
            slug: 'the-portrait-of-a-lady',
            title: 'The Portrait of a Lady',
            contentType: 'prose'),
        UnitLesson(
            slug: 'once-upon-a-time',
            title: 'Once Upon a Time',
            contentType: 'poem'),
        UnitLesson(
            slug: 'after-twenty-years',
            title: 'After Twenty Years',
            contentType: 'supplementary'),
      ],
    ),
    UnitConfig(
      id: 2,
      title: 'Unit 2',
      color: Color(0xFF5c8fd6),
      light: Color(0xFFeaf2fd),
      lessons: [
        UnitLesson(
            slug: 'the-queen-of-boxing',
            title: 'The Queen of Boxing',
            contentType: 'prose'),
        UnitLesson(
            slug: 'confessions-of-a-born-spectator',
            title: 'Confessions of a Born Spectator',
            contentType: 'poem'),
        UnitLesson(
            slug: 'a-shot-in-the-dark',
            title: 'A Shot in the Dark',
            contentType: 'supplementary'),
      ],
    ),
    UnitConfig(
      id: 3,
      title: 'Unit 3',
      color: Color(0xFF59a87a),
      light: Color(0xFFe8f5ee),
      lessons: [
        UnitLesson(
            slug: 'forgetting', title: 'Forgetting', contentType: 'prose'),
        UnitLesson(
            slug: 'lines-written-in-early-spring',
            title: 'Lines Written in Early Spring',
            contentType: 'poem'),
        UnitLesson(
            slug: 'the-first-patient',
            title: 'The First Patient',
            contentType: 'supplementary'),
      ],
    ),
    UnitConfig(
      id: 4,
      title: 'Unit 4',
      color: Color(0xFFa06cd5),
      light: Color(0xFFf2ebfc),
      lessons: [
        UnitLesson(
            slug: 'tight-corners',
            title: 'Tight Corners',
            contentType: 'prose'),
        UnitLesson(
            slug: 'macavity-the-mystery-cat',
            title: 'Macavity – The Mystery Cat',
            contentType: 'poem'),
        UnitLesson(
            slug: 'with-the-photographer',
            title: 'With the Photographer',
            contentType: 'supplementary'),
      ],
    ),
    UnitConfig(
      id: 5,
      title: 'Unit 5',
      color: Color(0xFFd4873a),
      light: Color(0xFFfdf3e7),
      lessons: [
        UnitLesson(
            slug: 'the-convocation-address',
            title: 'The Convocation Address',
            contentType: 'prose'),
        UnitLesson(
            slug: 'everest-is-not-the-only-peak',
            title: 'Everest is Not the Only Peak',
            contentType: 'poem'),
        UnitLesson(
            slug: 'the-singing-lesson',
            title: 'The Singing Lesson',
            contentType: 'supplementary'),
      ],
    ),
    UnitConfig(
      id: 6,
      title: 'Unit 6',
      color: Color(0xFFd45c6a),
      light: Color(0xFFfdeaec),
      lessons: [
        UnitLesson(
            slug: 'the-accidental-tourist',
            title: 'The Accidental Tourist',
            contentType: 'prose'),
        UnitLesson(
            slug: 'the-hollow-crown',
            title: 'The Hollow Crown',
            contentType: 'poem'),
        UnitLesson(
            slug: 'the-never-never-nest',
            title: 'The Never Never Nest',
            contentType: 'supplementary'),
      ],
    ),
  ];

  static const _plus2English = [
    UnitConfig(
      id: 1,
      title: 'Unit 1',
      color: Color(0xFFe8824a),
      light: Color(0xFFfdf0e8),
      lessons: [
        UnitLesson(
            slug: 'two-gentlemen-of-verona',
            title: 'Two Gentlemen of Verona',
            contentType: 'prose'),
        UnitLesson(
            slug: 'the-castle', title: 'The Castle', contentType: 'poem'),
        UnitLesson(
            slug: 'god-sees-the-truth-but-waits',
            title: 'God Sees the Truth but Waits',
            contentType: 'supplementary'),
      ],
    ),
    UnitConfig(
      id: 2,
      title: 'Unit 2',
      color: Color(0xFF5c8fd6),
      light: Color(0xFFeaf2fd),
      lessons: [
        UnitLesson(
            slug: 'a-nice-cup-of-tea',
            title: 'A Nice Cup of Tea',
            contentType: 'prose'),
        UnitLesson(
            slug: 'our-casuarina-tree',
            title: 'Our Casuarina Tree',
            contentType: 'poem'),
        UnitLesson(
            slug: 'life-of-pi',
            title: 'Life of Pi',
            contentType: 'supplementary'),
      ],
    ),
    UnitConfig(
      id: 3,
      title: 'Unit 3',
      color: Color(0xFF7c6fe8),
      light: Color(0xFFf0efff),
      lessons: [
        UnitLesson(
            slug: 'in-celebration-of-being-alive',
            title: 'In Celebration of Being Alive',
            contentType: 'prose'),
        UnitLesson(
            slug: 'all-the-worlds-a-stage',
            title: 'All the World\'s a Stage',
            contentType: 'poem'),
        UnitLesson(
            slug: 'the-hour-of-truth',
            title: 'The Hour of Truth',
            contentType: 'supplementary'),
      ],
    ),
    UnitConfig(
      id: 4,
      title: 'Unit 4',
      color: Color(0xFFa06cd5),
      light: Color(0xFFf2ebfc),
      lessons: [
        UnitLesson(
            slug: 'the-summit',
            title: 'The Summit',
            contentType: 'prose'),
        UnitLesson(
            slug: 'ulysses',
            title: 'Ulysses',
            contentType: 'poem'),
        UnitLesson(
            slug: 'the-midnight-visitor',
            title: 'The Midnight Visitor',
            contentType: 'supplementary'),
      ],
    ),
    UnitConfig(
      id: 5,
      title: 'Unit 5',
      color: Color(0xFFd4873a),
      light: Color(0xFFfdf3e7),
      lessons: [
        UnitLesson(
            slug: 'the-chair',
            title: 'The Chair',
            contentType: 'prose'),
        UnitLesson(
            slug: 'a-father-to-his-son',
            title: 'A Father to his Son',
            contentType: 'poem'),
        UnitLesson(
            slug: 'all-summer-in-a-day',
            title: 'All Summer in a Day',
            contentType: 'supplementary'),
      ],
    ),
    UnitConfig(
      id: 6,
      title: 'Unit 6',
      color: Color(0xFFd45c6a),
      light: Color(0xFFfdeaec),
      lessons: [
        UnitLesson(
            slug: 'on-the-rule-of-the-road',
            title: 'On the Rule of the Road',
            contentType: 'prose'),
        UnitLesson(
            slug: 'incident-of-the-french-camp',
            title: 'Incident of the French Camp',
            contentType: 'poem'),
        UnitLesson(
            slug: 'remember-caesar',
            title: 'Remember Caesar',
            contentType: 'supplementary'),
      ],
    ),
  ];

  static const _plus1Maths = [
    MathsChapter(number: 1,  title: 'Sets, Relations and Functions',                           slug: 'sets-relations-functions',              volume: 1),
    MathsChapter(number: 2,  title: 'Basic Algebra',                                           slug: 'basic-algebra',                         volume: 1),
    MathsChapter(number: 3,  title: 'Trigonometry',                                            slug: 'trigonometry',                          volume: 1),
    MathsChapter(number: 4,  title: 'Combinatorics and Mathematical Induction',                slug: 'combinatorics-mathematical-induction',   volume: 1),
    MathsChapter(number: 5,  title: 'Binomial Theorem, Sequences and Series',                  slug: 'binomial-theorem-sequences-series',      volume: 1),
    MathsChapter(number: 6,  title: 'Two Dimensional Analytical Geometry',                     slug: 'two-dimensional-analytical-geometry',    volume: 1),
    MathsChapter(number: 7,  title: 'Matrices and Determinants',                               slug: 'matrices-and-determinants',              volume: 2),
    MathsChapter(number: 8,  title: 'Vector Algebra',                                          slug: 'vector-algebra',                        volume: 2),
    MathsChapter(number: 9,  title: 'Differential Calculus – Limits and Continuity',           slug: 'differential-calculus-limits-continuity', volume: 2),
    MathsChapter(number: 10, title: 'Differential Calculus – Differentiability and Methods',   slug: 'differential-calculus-differentiability', volume: 2),
    MathsChapter(number: 11, title: 'Integral Calculus',                                       slug: 'integral-calculus',                     volume: 2),
  ];

  static List<UnitConfig>? getUnits(String classLevel, String subjectSlug) {
    final key = '${classLevel.toLowerCase()}/${subjectSlug.toLowerCase()}';
    return switch (key) {
      '+1/english' => _plus1English,
      '+2/english' => _plus2English,
      _ => null,
    };
  }

  static List<MathsChapter>? getMathsChapters(String classLevel, String subjectSlug) {
    final key = '${classLevel.toLowerCase()}/${subjectSlug.toLowerCase()}';
    return switch (key) {
      '+1/maths' => _plus1Maths,
      _ => null,
    };
  }

  // Counts only subjects with full chapter content (English +1 and +2).
  static int get totalLessonCount {
    int n = 0;
    for (final u in _plus1English) { n += u.lessons.length; }
    for (final u in _plus2English) { n += u.lessons.length; }
    return n;
  }

  static int get plus1LessonCount {
    int n = 0;
    for (final u in _plus1English) { n += u.lessons.length; }
    return n;
  }

  static int get plus2LessonCount {
    int n = 0;
    for (final u in _plus2English) { n += u.lessons.length; }
    return n;
  }
}
