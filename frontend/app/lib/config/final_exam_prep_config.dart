class ModelPaper {
  final String id;
  final String modelId;
  final String label;
  final String title;
  const ModelPaper({
    required this.id,
    required this.modelId,
    required this.label,
    required this.title,
  });
}

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
  ExamPaper(id: 'class12-english-2025-annual', year: '2025', title: '2025 Annual Exam Paper'),
  ExamPaper(id: 'class12-english-2024-annual', year: '2024', title: '2024 Annual Exam Paper'),
  ExamPaper(id: 'class12-english-2023-annual', year: '2023', title: '2023 Annual Exam Paper'),
  ExamPaper(id: 'class12-english-2022-annual', year: '2022', title: 'Annual Exam Paper'),
];

const kPlus1EnglishModelPapers = <ModelPaper>[
  ModelPaper(id: 'class11-english-model-qa-1', modelId: 'model-qa-1', label: 'Set 1', title: 'Full Syllabus Model Paper — Set 1'),
  ModelPaper(id: 'class11-english-model-qa-2', modelId: 'model-qa-2', label: 'Set 2', title: 'Full Syllabus Model Paper — Set 2'),
  ModelPaper(id: 'class11-english-model-qa-3', modelId: 'model-qa-3', label: 'Set 3', title: 'Full Syllabus Model Paper — Set 3'),
  ModelPaper(id: 'class11-english-model-qa-4', modelId: 'model-qa-4', label: 'Set 4', title: 'Full Syllabus Model Paper — Set 4'),
  ModelPaper(id: 'class11-english-model-qa-5', modelId: 'model-qa-5', label: 'Set 5', title: 'Full Syllabus Model Paper — Set 5'),
];

const kPlus2EnglishModelPapers = <ModelPaper>[
  ModelPaper(id: 'class12-english-model-qa-1', modelId: 'model-qa-1', label: 'Set 1', title: 'Full Syllabus Model Paper — Set 1'),
  ModelPaper(id: 'class12-english-model-qa-2', modelId: 'model-qa-2', label: 'Set 2', title: 'Full Syllabus Model Paper — Set 2'),
  ModelPaper(id: 'class12-english-model-qa-3', modelId: 'model-qa-3', label: 'Set 3', title: 'Full Syllabus Model Paper — Set 3'),
  ModelPaper(id: 'class12-english-model-qa-4', modelId: 'model-qa-4', label: 'Set 4', title: 'Full Syllabus Model Paper — Set 4'),
  ModelPaper(id: 'class12-english-model-qa-5', modelId: 'model-qa-5', label: 'Set 5', title: 'Full Syllabus Model Paper — Set 5'),
];

const kPlus1ComputerApplicationsModelPapers = <ModelPaper>[
  ModelPaper(id: 'class11-computer-applications-model-qa-1', modelId: 'model-qa-1', label: 'Set 1', title: 'Full Syllabus Model Paper — Set 1'),
  ModelPaper(id: 'class11-computer-applications-model-qa-2', modelId: 'model-qa-2', label: 'Set 2', title: 'Full Syllabus Model Paper — Set 2'),
  ModelPaper(id: 'class11-computer-applications-model-qa-3', modelId: 'model-qa-3', label: 'Set 3', title: 'Full Syllabus Model Paper — Set 3'),
  ModelPaper(id: 'class11-computer-applications-model-qa-4', modelId: 'model-qa-4', label: 'Set 4', title: 'Full Syllabus Model Paper — Set 4'),
  ModelPaper(id: 'class11-computer-applications-model-qa-5', modelId: 'model-qa-5', label: 'Set 5', title: 'Full Syllabus Model Paper — Set 5'),
];

const kPlus2ComputerApplicationsModelPapers = <ModelPaper>[
  ModelPaper(id: 'class12-computer-applications-model-qa-1', modelId: 'model-qa-1', label: 'Set 1', title: 'Full Syllabus Model Paper — Set 1'),
  ModelPaper(id: 'class12-computer-applications-model-qa-2', modelId: 'model-qa-2', label: 'Set 2', title: 'Full Syllabus Model Paper — Set 2'),
  ModelPaper(id: 'class12-computer-applications-model-qa-3', modelId: 'model-qa-3', label: 'Set 3', title: 'Full Syllabus Model Paper — Set 3'),
  ModelPaper(id: 'class12-computer-applications-model-qa-4', modelId: 'model-qa-4', label: 'Set 4', title: 'Full Syllabus Model Paper — Set 4'),
  ModelPaper(id: 'class12-computer-applications-model-qa-5', modelId: 'model-qa-5', label: 'Set 5', title: 'Full Syllabus Model Paper — Set 5'),
];

const kPlus1ComputerScienceModelPapers = <ModelPaper>[
  ModelPaper(id: 'class11-computer-science-model-qa-1', modelId: 'model-qa-1', label: 'Set 1', title: 'Full Syllabus Model Paper — Set 1'),
  ModelPaper(id: 'class11-computer-science-model-qa-2', modelId: 'model-qa-2', label: 'Set 2', title: 'Full Syllabus Model Paper — Set 2'),
  ModelPaper(id: 'class11-computer-science-model-qa-3', modelId: 'model-qa-3', label: 'Set 3', title: 'Full Syllabus Model Paper — Set 3'),
  ModelPaper(id: 'class11-computer-science-model-qa-4', modelId: 'model-qa-4', label: 'Set 4', title: 'Full Syllabus Model Paper — Set 4'),
  ModelPaper(id: 'class11-computer-science-model-qa-5', modelId: 'model-qa-5', label: 'Set 5', title: 'Full Syllabus Model Paper — Set 5'),
];

const kPlus2ComputerScienceModelPapers = <ModelPaper>[
  ModelPaper(id: 'class12-computer-science-model-qa-1', modelId: 'model-qa-1', label: 'Set 1', title: 'Full Syllabus Model Paper — Set 1'),
  ModelPaper(id: 'class12-computer-science-model-qa-2', modelId: 'model-qa-2', label: 'Set 2', title: 'Full Syllabus Model Paper — Set 2'),
  ModelPaper(id: 'class12-computer-science-model-qa-3', modelId: 'model-qa-3', label: 'Set 3', title: 'Full Syllabus Model Paper — Set 3'),
  ModelPaper(id: 'class12-computer-science-model-qa-4', modelId: 'model-qa-4', label: 'Set 4', title: 'Full Syllabus Model Paper — Set 4'),
  ModelPaper(id: 'class12-computer-science-model-qa-5', modelId: 'model-qa-5', label: 'Set 5', title: 'Full Syllabus Model Paper — Set 5'),
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
