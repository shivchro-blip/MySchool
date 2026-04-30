class Subject {
  final String id;
  final String code;
  final String name;
  final String classLevel;
  final bool isActive;

  const Subject({
    required this.id,
    required this.code,
    required this.name,
    required this.classLevel,
    required this.isActive,
  });

  factory Subject.fromJson(Map<String, dynamic> json) => Subject(
    id:         json['id'] as String,
    code:       json['code'] as String,
    name:       json['name'] as String,
    classLevel: (json['class'] ?? json['class_level'] ?? '') as String,
    isActive:   json['is_active'] as bool? ?? true,
  );
}

class Chapter {
  final String id;
  final String subjectId;
  final int    number;
  final String title;
  final String contentType;
  final bool   isActive;

  const Chapter({
    required this.id,
    required this.subjectId,
    required this.number,
    required this.title,
    required this.contentType,
    required this.isActive,
  });

  factory Chapter.fromJson(Map<String, dynamic> json) => Chapter(
    id:          json['id'] as String,
    subjectId:   json['subject_id'] as String,
    number:      json['number'] as int,
    title:       json['title'] as String,
    contentType: json['content_type'] as String,
    isActive:    json['is_active'] as bool? ?? true,
  );

  String get typeIcon => switch (contentType) {
    'prose'      => '📖',
    'poem'       => '🎵',
    'grammar'    => '✏️',
    'vocabulary' => '🔤',
    _            => '📄',
  };
}

class Topic {
  final String id;
  final String chapterId;
  final String title;
  final int    orderIndex;

  const Topic({
    required this.id,
    required this.chapterId,
    required this.title,
    required this.orderIndex,
  });

  factory Topic.fromJson(Map<String, dynamic> json) => Topic(
    id:         json['id'] as String,
    chapterId:  json['chapter_id'] as String,
    title:      json['title'] as String,
    orderIndex: json['order_index'] as int? ?? 0,
  );
}

class Question {
  final String  id;
  final String  questionText;
  final int     marks;
  final String  questionType;
  final bool    isValidated;

  const Question({
    required this.id,
    required this.questionText,
    required this.marks,
    required this.questionType,
    required this.isValidated,
  });

  factory Question.fromJson(Map<String, dynamic> json) => Question(
    id:           json['id'] as String,
    questionText: json['question_text'] as String,
    marks:        json['marks'] as int,
    questionType: json['question_type'] as String,
    isValidated:  json['is_validated'] as bool? ?? false,
  );

  String get writingHint => switch (marks) {
    1      => 'Write one sentence with the key term.',
    2      => 'Write 2–3 sentences: key term + explanation.',
    5      => 'Write a paragraph with 3–4 clear points.',
    10     => 'Write an essay: intro + 4–5 points + conclusion.',
    _      => 'Write your answer clearly.',
  };
}
