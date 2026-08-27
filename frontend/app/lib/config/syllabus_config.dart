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
  final int number;
  final String title;
  final String slug;
  final int volume;
  const MathsChapter({
    required this.number,
    required this.title,
    required this.slug,
    required this.volume,
  });
}

class FlatChapter {
  final int    number;
  final String title;
  final String slug;
  const FlatChapter({
    required this.number,
    required this.title,
    required this.slug,
  });
}

class SyllabusConfig {
  // Mirrors web/src/data/syllabus.js — single source of truth for subject list
  static const _subjects = [
    SubjectConfig(slug: 'english', name: 'English', classLevel: '+1'),
    SubjectConfig(slug: 'maths', name: 'Mathematics', classLevel: '+1'),
    SubjectConfig(slug: 'science', name: 'Science', classLevel: '+1'),
    SubjectConfig(slug: 'computer-applications', name: 'Computer Applications', classLevel: '+1'),
    SubjectConfig(slug: 'computer-science', name: 'Computer Science', classLevel: '+1'),
    SubjectConfig(slug: 'english', name: 'English', classLevel: '+2'),
    SubjectConfig(slug: 'maths', name: 'Mathematics', classLevel: '+2'),
    SubjectConfig(slug: 'computer-applications', name: 'Computer Applications', classLevel: '+2'),
    SubjectConfig(slug: 'computer-science', name: 'Computer Science', classLevel: '+2'),
    SubjectConfig(slug: 'computer-applications-tamil', name: 'Computer Applications (தமிழ்)', classLevel: '+2'),
    SubjectConfig(slug: 'computer-science-tamil', name: 'Computer Science (தமிழ்)', classLevel: '+2'),
  ];

  static List<Subject> getSubjects() =>
      _subjects.map((s) => s.toSubject()).toList();

  static List<String> get courseClassLevels {
    final levels = <String>[];
    for (final subject in _subjects) {
      if (!levels.contains(subject.classLevel)) {
        levels.add(subject.classLevel);
      }
    }
    return List.unmodifiable(levels);
  }

  static int get courseCount => courseClassLevels.length;

  static int subjectCountForClass(String classLevel) =>
      _subjects.where((s) => s.classLevel == classLevel).length;

  static bool hasSubject(String classLevel, String subjectSlug) =>
      _subjects.any((s) =>
          s.classLevel == classLevel &&
          s.slug.toLowerCase() == subjectSlug.toLowerCase());

  static String subjectName(String classLevel, String subjectSlug) {
    for (final subject in _subjects) {
      if (subject.classLevel == classLevel &&
          subject.slug.toLowerCase() == subjectSlug.toLowerCase()) {
        return subject.name;
      }
    }
    if (subjectSlug.isEmpty) return subjectSlug;
    return subjectSlug[0].toUpperCase() + subjectSlug.substring(1);
  }

  static String courseShortTitle(String classLevel) => switch (classLevel) {
        '+1' => 'Class XI — First Year',
        '+2' => 'Class XII — Second Year',
        _ => classLevel,
      };

  static String courseFullTitle(String classLevel) => switch (classLevel) {
        '+1' => 'Class XI — Higher Secondary First Year',
        '+2' => 'Class XII — Higher Secondary Second Year',
        _ => classLevel,
      };

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
            slug: 'the-summit', title: 'The Summit', contentType: 'prose'),
        UnitLesson(slug: 'ulysses', title: 'Ulysses', contentType: 'poem'),
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
        UnitLesson(slug: 'the-chair', title: 'The Chair', contentType: 'prose'),
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
    MathsChapter(
        number: 1,
        title: 'Sets, Relations and Functions',
        slug: 'sets-relations-functions',
        volume: 1),
    MathsChapter(
        number: 2, title: 'Basic Algebra', slug: 'basic-algebra', volume: 1),
    MathsChapter(
        number: 3, title: 'Trigonometry', slug: 'trigonometry', volume: 1),
    MathsChapter(
        number: 4,
        title: 'Combinatorics and Mathematical Induction',
        slug: 'combinatorics-mathematical-induction',
        volume: 1),
    MathsChapter(
        number: 5,
        title: 'Binomial Theorem, Sequences and Series',
        slug: 'binomial-theorem-sequences-series',
        volume: 1),
    MathsChapter(
        number: 6,
        title: 'Two Dimensional Analytical Geometry',
        slug: 'two-dimensional-analytical-geometry',
        volume: 1),
    MathsChapter(
        number: 7,
        title: 'Matrices and Determinants',
        slug: 'matrices-and-determinants',
        volume: 2),
    MathsChapter(
        number: 8, title: 'Vector Algebra', slug: 'vector-algebra', volume: 2),
    MathsChapter(
        number: 9,
        title: 'Differential Calculus – Limits and Continuity',
        slug: 'differential-calculus-limits-continuity',
        volume: 2),
    MathsChapter(
        number: 10,
        title: 'Differential Calculus – Differentiability and Methods',
        slug: 'differential-calculus-differentiability',
        volume: 2),
    MathsChapter(
        number: 11,
        title: 'Integral Calculus',
        slug: 'integral-calculus',
        volume: 2),
  ];

  static const _plus1ComputerApplications = [
    FlatChapter(number: 1, title: 'Introduction to Computers', slug: 'chapter-01-introduction-to-computers'),
    FlatChapter(number: 2, title: 'Number Systems', slug: 'chapter-02-number-systems'),
    FlatChapter(number: 3, title: 'Computer Organisation', slug: 'chapter-03-computer-organisation'),
    FlatChapter(number: 4, title: 'Theoretical Concepts of Operating System', slug: 'chapter-04-theoretical-concepts-of-operating-system'),
    FlatChapter(number: 5, title: 'Working with Windows Operating System', slug: 'chapter-05-working-with-windows-operating-system'),
    FlatChapter(number: 6, title: 'Introduction to Word Processor', slug: 'chapter-06-introduction-to-word-processor'),
    FlatChapter(number: 7, title: 'Working with OpenOffice Calc', slug: 'chapter-07-working-with-openoffice-calc'),
    FlatChapter(number: 8, title: 'Presentation Basics', slug: 'chapter-08-presentation-basics'),
    FlatChapter(number: 9, title: 'Introduction to Internet and Email', slug: 'chapter-09-introduction-to-internet-and-email'),
    FlatChapter(number: 10, title: 'HTML — Structural Tags', slug: 'chapter-10-html-structural-tags'),
    FlatChapter(number: 11, title: 'HTML — Formatting Text, Tables, Lists and Links', slug: 'chapter-11-html-formatting-tables-lists-links'),
    FlatChapter(number: 12, title: 'HTML — Multimedia Elements and Forms', slug: 'chapter-12-html-multimedia-elements-and-forms'),
    FlatChapter(number: 13, title: 'CSS — Cascading Style Sheets', slug: 'chapter-13-css-cascading-style-sheets'),
    FlatChapter(number: 14, title: 'Introduction to JavaScript', slug: 'chapter-14-introduction-to-javascript'),
    FlatChapter(number: 15, title: 'Control Structure in JavaScript', slug: 'chapter-15-control-structure-in-javascript'),
    FlatChapter(number: 16, title: 'JavaScript Functions', slug: 'chapter-16-javascript-functions'),
    FlatChapter(number: 17, title: 'Computer Ethics and Cyber Security', slug: 'chapter-17-computer-ethics-and-cyber-security'),
    FlatChapter(number: 18, title: 'Tamil Computing', slug: 'chapter-18-tamil-computing'),
  ];

  static const _plus1ComputerScience = [
    FlatChapter(number: 1, title: 'Introduction to Computers', slug: 'cs-chapter-01-introduction-to-computers'),
    FlatChapter(number: 2, title: 'Number Systems', slug: 'cs-chapter-02-number-systems'),
    FlatChapter(number: 3, title: 'Computer Organization', slug: 'cs-chapter-03-computer-organization'),
    FlatChapter(number: 4, title: 'Theoretical Concepts of Operating System', slug: 'cs-chapter-04-theoretical-concepts-of-operating-system'),
    FlatChapter(number: 5, title: 'Working with Windows Operating System', slug: 'cs-chapter-05-working-with-windows-operating-system'),
    FlatChapter(number: 6, title: 'Specification and Abstraction', slug: 'cs-chapter-06-specification-and-abstraction'),
    FlatChapter(number: 7, title: 'Composition and Decomposition', slug: 'cs-chapter-07-composition-and-decomposition'),
    FlatChapter(number: 8, title: 'Iteration and Recursion', slug: 'cs-chapter-08-iteration-and-recursion'),
    FlatChapter(number: 9, title: 'Introduction to C++', slug: 'cs-chapter-09-introduction-to-cpp'),
    FlatChapter(number: 10, title: 'Flow of Control', slug: 'cs-chapter-10-flow-of-control'),
    FlatChapter(number: 11, title: 'Functions', slug: 'cs-chapter-11-functions'),
    FlatChapter(number: 12, title: 'Arrays and Structures', slug: 'cs-chapter-12-arrays-and-structures'),
    FlatChapter(number: 13, title: 'Introduction to Object Oriented Programming Techniques', slug: 'cs-chapter-13-introduction-to-oop-techniques'),
    FlatChapter(number: 14, title: 'Classes and Objects', slug: 'cs-chapter-14-classes-and-objects'),
    FlatChapter(number: 15, title: 'Polymorphism', slug: 'cs-chapter-15-polymorphism'),
    FlatChapter(number: 16, title: 'Inheritance', slug: 'cs-chapter-16-inheritance'),
    FlatChapter(number: 17, title: 'Computer Ethics and Cyber Security', slug: 'cs-chapter-17-computer-ethics-and-cyber-security'),
    FlatChapter(number: 18, title: 'Tamil Computing', slug: 'cs-chapter-18-tamil-computing'),
  ];

  static const _plus2ComputerApplications = [
    FlatChapter(number: 1, title: 'Multimedia', slug: 'chapter-01-multimedia'),
    FlatChapter(number: 2, title: 'An Introduction to Adobe PageMaker', slug: 'chapter-02-pagemaker'),
    FlatChapter(number: 3, title: 'Introduction to Database Management System', slug: 'chapter-03-dbms'),
    FlatChapter(number: 4, title: 'PHP: Hypertext Preprocessor', slug: 'chapter-04-php-intro'),
    FlatChapter(number: 5, title: 'Functions and Arrays in PHP', slug: 'chapter-05-php-functions-arrays'),
    FlatChapter(number: 6, title: 'Conditional Statements in PHP', slug: 'chapter-06-php-conditionals'),
    FlatChapter(number: 7, title: 'Loops in PHP', slug: 'chapter-07-php-loops'),
    FlatChapter(number: 8, title: 'Forms and Files', slug: 'chapter-08-forms-files'),
    FlatChapter(number: 9, title: 'Connecting PHP and MySQL', slug: 'chapter-09-php-mysql'),
    FlatChapter(number: 10, title: 'Introduction to Computer Networks', slug: 'chapter-10-networks-intro'),
    FlatChapter(number: 11, title: 'Network Examples and Protocols', slug: 'chapter-11-network-protocols'),
    FlatChapter(number: 12, title: 'Domain Name System (DNS)', slug: 'chapter-12-dns'),
    FlatChapter(number: 13, title: 'Network Cabling', slug: 'chapter-13-network-cabling'),
    FlatChapter(number: 14, title: 'Open Source Concepts', slug: 'chapter-14-open-source'),
    FlatChapter(number: 15, title: 'E-Commerce', slug: 'chapter-15-ecommerce'),
    FlatChapter(number: 16, title: 'Electronic Payment Systems', slug: 'chapter-16-payment-systems'),
    FlatChapter(number: 17, title: 'E-Commerce Security Systems', slug: 'chapter-17-ecommerce-security'),
    FlatChapter(number: 18, title: 'Electronic Data Interchange (EDI)', slug: 'chapter-18-edi'),
  ];

  static const _plus2ComputerApplicationsTamil = [
    FlatChapter(number: 1, title: 'பல்லூடகம்', slug: 'ta-chapter-01-multimedia'),
    FlatChapter(number: 2, title: 'அடோப் பேஜ்மேக்கர் – ஓர் அறிமுகம்', slug: 'ta-chapter-02-pagemaker'),
    FlatChapter(number: 3, title: 'தரவுதள மேலாண்மை அமைப்பு – ஓர் அறிமுகம்', slug: 'ta-chapter-03-dbms'),
    FlatChapter(number: 4, title: 'மீவுரை முன்செயலி (PHP) – ஓர் அறிமுகம்', slug: 'ta-chapter-04-php-intro'),
    FlatChapter(number: 5, title: 'PHP செயற்கூறுகள் மற்றும் அணிகள்', slug: 'ta-chapter-05-php-functions-arrays'),
    FlatChapter(number: 6, title: 'PHPஇல் உள்ள நிபந்தனைக் கூற்றுகள்', slug: 'ta-chapter-06-php-conditionals'),
    FlatChapter(number: 7, title: 'PHPஇல் மடக்குகள்', slug: 'ta-chapter-07-php-loops'),
    FlatChapter(number: 8, title: 'படிவங்கள் மற்றும் கோப்புகள்', slug: 'ta-chapter-08-forms-files'),
    FlatChapter(number: 9, title: 'PHP-உடன் MySQL-ஐ இணைத்தல்', slug: 'ta-chapter-09-php-mysql'),
    FlatChapter(number: 10, title: 'கணினி வலையமைப்பு ஓர் அறிமுகம்', slug: 'ta-chapter-10-networks-intro'),
    FlatChapter(number: 11, title: 'வலையமைப்பு எடுத்துக்காட்டுகள் மற்றும் நெறிமுறைகள்', slug: 'ta-chapter-11-network-protocols'),
    FlatChapter(number: 12, title: 'களப்பெயர் முறைமை (DNS)', slug: 'ta-chapter-12-dns'),
    FlatChapter(number: 13, title: 'வலையமைப்பு வடமிடல்', slug: 'ta-chapter-13-network-cabling'),
    FlatChapter(number: 14, title: 'திறந்த மூல கருத்துருக்கள்', slug: 'ta-chapter-14-open-source'),
    FlatChapter(number: 15, title: 'மின்-வணிகம்', slug: 'ta-chapter-15-ecommerce'),
    FlatChapter(number: 16, title: 'மின்னணு செலுத்தல் முறைகள்', slug: 'ta-chapter-16-payment-systems'),
    FlatChapter(number: 17, title: 'மின்-வணிக பாதுகாப்பு அமைப்புகள்', slug: 'ta-chapter-17-ecommerce-security'),
    FlatChapter(number: 18, title: 'மின்னணு தரவு பரிமாற்றம்', slug: 'ta-chapter-18-edi'),
  ];

  static const _plus2ComputerScience = [
    FlatChapter(number: 1, title: 'Function', slug: 'chapter-01-functions'),
    FlatChapter(number: 2, title: 'Data Abstraction', slug: 'chapter-02-data-abstraction'),
    FlatChapter(number: 3, title: 'Scoping', slug: 'chapter-03-scoping'),
    FlatChapter(number: 4, title: 'Algorithmic Strategies', slug: 'chapter-04-algorithmic-strategies'),
    FlatChapter(number: 5, title: 'Python - Variables and Operators', slug: 'chapter-05-python-variables-operators'),
    FlatChapter(number: 6, title: 'Control Structures', slug: 'chapter-06-control-structures'),
    FlatChapter(number: 7, title: 'Python Functions', slug: 'chapter-07-python-functions'),
    FlatChapter(number: 8, title: 'Strings and String Manipulation', slug: 'chapter-08-strings-manipulation'),
    FlatChapter(number: 9, title: 'Lists, Tuples, Sets and Dictionary', slug: 'chapter-09-lists-tuples-sets-dictionary'),
    FlatChapter(number: 10, title: 'Python Classes and Objects', slug: 'chapter-10-python-classes-objects'),
    FlatChapter(number: 11, title: 'Database Concepts', slug: 'chapter-11-database-concepts'),
    FlatChapter(number: 12, title: 'Structured Query Language (SQL)', slug: 'chapter-12-sql'),
    FlatChapter(number: 13, title: 'Python and CSV Files', slug: 'chapter-13-python-csv-files'),
    FlatChapter(number: 14, title: 'Importing C++ Programs in Python', slug: 'chapter-14-importing-cpp-in-python'),
    FlatChapter(number: 15, title: 'Data Manipulation through SQL', slug: 'chapter-15-data-manipulation-sql'),
    FlatChapter(number: 16, title: 'Data Visualization using pyplot', slug: 'chapter-16-data-visualization-pyplot'),
  ];

  static const _plus2ComputerScienceTamil = [
    FlatChapter(number: 1, title: 'செயற்கூறு', slug: 'ta-chapter-01-functions'),
    FlatChapter(number: 2, title: 'தரவு அருவமாக்கம்', slug: 'ta-chapter-02-data-abstraction'),
    FlatChapter(number: 3, title: 'வரையெல்லை', slug: 'ta-chapter-03-scoping'),
    FlatChapter(number: 4, title: 'நெறிமுறையின் யுக்திகள்', slug: 'ta-chapter-04-algorithmic-strategies'),
    FlatChapter(number: 5, title: 'பைத்தான் அறிமுகம் – மாறிகள் மற்றும் செயற்குறிகள்', slug: 'ta-chapter-05-python-variables-operators'),
    FlatChapter(number: 6, title: 'கட்டுப்பாட்டு கட்டமைப்புகள்', slug: 'ta-chapter-06-control-structures'),
    FlatChapter(number: 7, title: 'பைத்தான் செயற்கூறுகள்', slug: 'ta-chapter-07-python-functions'),
    FlatChapter(number: 8, title: 'சரங்கள் மற்றும் சரங்களைக் கையாளுதல்', slug: 'ta-chapter-08-strings-manipulation'),
    FlatChapter(number: 9, title: 'தொகுப்பு தரவினங்கள் (List, Tuples, Set மற்றும் Dictionary)', slug: 'ta-chapter-09-lists-tuples-sets-dictionary'),
    FlatChapter(number: 10, title: 'பைத்தான் இனக்குழுக்கள் மற்றும் பொருள்கள்', slug: 'ta-chapter-10-python-classes-objects'),
    FlatChapter(number: 11, title: 'தரவுதள கருத்துருக்கள்', slug: 'ta-chapter-11-database-concepts'),
    FlatChapter(number: 12, title: 'வினவல் அமைப்பு மொழி (SQL)', slug: 'ta-chapter-12-sql'),
    FlatChapter(number: 13, title: 'பைத்தான் மற்றும் CSV கோப்புகள்', slug: 'ta-chapter-13-python-csv-files'),
    FlatChapter(number: 14, title: 'பைத்தானில் C++ நிரல்களை தருவித்தல்', slug: 'ta-chapter-14-importing-cpp-in-python'),
    FlatChapter(number: 15, title: 'SQL மூலம் தரவுகளைக் கையாளுதல்', slug: 'ta-chapter-15-data-manipulation-sql'),
    FlatChapter(number: 16, title: 'தரவு காட்சிப்படுத்துதல் – PYPLOT (கோட்டு, வட்ட, பட்டை வரைபடங்கள்)', slug: 'ta-chapter-16-data-visualization-pyplot'),
  ];

  static List<UnitConfig>? getUnits(String classLevel, String subjectSlug) {
    final key = '${classLevel.toLowerCase()}/${subjectSlug.toLowerCase()}';
    return switch (key) {
      '+1/english' => _plus1English,
      '+2/english' => _plus2English,
      _ => null,
    };
  }

  static List<MathsChapter>? getMathsChapters(
      String classLevel, String subjectSlug) {
    final key = '${classLevel.toLowerCase()}/${subjectSlug.toLowerCase()}';
    return switch (key) {
      '+1/maths' => _plus1Maths,
      _ => null,
    };
  }

  static List<FlatChapter>? getFlatChapters(
      String classLevel, String subjectSlug) {
    final key = '${classLevel.toLowerCase()}/${subjectSlug.toLowerCase()}';
    return switch (key) {
      '+1/computer-applications' => _plus1ComputerApplications,
      '+1/computer-science' => _plus1ComputerScience,
      '+2/computer-applications' => _plus2ComputerApplications,
      '+2/computer-science' => _plus2ComputerScience,
      '+2/computer-applications-tamil' => _plus2ComputerApplicationsTamil,
      '+2/computer-science-tamil' => _plus2ComputerScienceTamil,
      _ => null,
    };
  }

  // Counts only subjects with full chapter content (English +1 and +2).
  static int get totalLessonCount {
    int n = 0;
    for (final u in _plus1English) {
      n += u.lessons.length;
    }
    for (final u in _plus2English) {
      n += u.lessons.length;
    }
    return n;
  }

  static int get plus1LessonCount {
    int n = 0;
    for (final u in _plus1English) {
      n += u.lessons.length;
    }
    return n;
  }

  static int get plus2LessonCount {
    int n = 0;
    for (final u in _plus2English) {
      n += u.lessons.length;
    }
    return n;
  }

  static int lessonCountForClass(String classLevel) => switch (classLevel) {
        '+1' => plus1LessonCount,
        '+2' => plus2LessonCount,
        _ => 0,
      };
}
