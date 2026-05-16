class ExamPaper {
  final String id;
  final String year;
  final String title;
  const ExamPaper({required this.id, required this.year, required this.title});
}

class PriorityLesson {
  final String id;
  final String category;
  final String title;
  final String priority; // 'high' | 'medium'
  const PriorityLesson({
    required this.id,
    required this.category,
    required this.title,
    required this.priority,
  });
}

const kPlus1EnglishExamPapers = <ExamPaper>[
  ExamPaper(id: 'class11-english-2025-annual', year: '2025', title: 'Annual Exam Paper'),
  ExamPaper(id: 'class11-english-2024-annual', year: '2024', title: 'Annual Exam Paper'),
  ExamPaper(id: 'eng11-annual-2023', year: '2023', title: 'Annual Exam Paper'),
  ExamPaper(id: 'eng11-annual-2022', year: '2022', title: 'Annual Exam Paper'),
];

const kPlus2EnglishExamPapers = <ExamPaper>[
  ExamPaper(id: 'class12-english-2025-annual', year: '2025', title: 'Annual Exam Paper'),
  ExamPaper(id: 'class12-english-2024-annual', year: '2024', title: 'Annual Exam Paper'),
  ExamPaper(id: 'class12-english-2023-annual', year: '2023', title: 'Annual Exam Paper'),
  ExamPaper(id: 'class12-english-2022-annual', year: '2022', title: 'Annual Exam Paper'),
];

const kPlus1EnglishPriorityLessons = <PriorityLesson>[
  PriorityLesson(
    id: 'prose-notes-summary',
    category: 'Prose',
    title: 'Notes & Summary',
    priority: 'high',
  ),
  PriorityLesson(
    id: 'poems-themes-analysis',
    category: 'Poems',
    title: 'Themes & Analysis',
    priority: 'high',
  ),
  PriorityLesson(
    id: 'supplementary-characters',
    category: 'Supplementary',
    title: 'Characters',
    priority: 'medium',
  ),
  PriorityLesson(
    id: 'grammar-error-correction',
    category: 'Grammar',
    title: 'Error Correction',
    priority: 'medium',
  ),
  PriorityLesson(
    id: 'writing-skills-essays-letters',
    category: 'Writing Skills',
    title: 'Essays & Letters',
    priority: 'high',
  ),
];

const kPlus2EnglishPriorityLessons = <PriorityLesson>[
  PriorityLesson(
    id: 'prose-notes-summary',
    category: 'Prose',
    title: 'Notes & Summary',
    priority: 'high',
  ),
  PriorityLesson(
    id: 'poems-themes-analysis',
    category: 'Poems',
    title: 'Themes & Analysis',
    priority: 'high',
  ),
  PriorityLesson(
    id: 'supplementary-characters',
    category: 'Supplementary',
    title: 'Characters',
    priority: 'medium',
  ),
  PriorityLesson(
    id: 'grammar-error-correction',
    category: 'Grammar',
    title: 'Error Correction',
    priority: 'medium',
  ),
  PriorityLesson(
    id: 'writing-skills-essays-letters',
    category: 'Writing Skills',
    title: 'Essays & Letters',
    priority: 'high',
  ),
];
