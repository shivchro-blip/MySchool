// Single source of truth for subject-slug → assets/content folder-name mapping.
// Shared by ChapterContentService and ExamPracticeService so both stay in sync.
class AssetFolder {
  static const _explicitSubjectFolders = {
    'computer-applications':       'ComputerApplications',
    'computer-science':            'ComputerScience',
    'computer-applications-tamil': 'ComputerApplicationsTamil',
    'computer-science-tamil':      'ComputerScienceTamil',
  };

  static String toFolder(String classLevel, String subjectSlug) {
    final cl = switch (classLevel.toLowerCase()) {
      '+1' => 'Class_11',
      '+2' => 'Class_12',
      _ => classLevel,
    };
    final sub = _explicitSubjectFolders[subjectSlug.toLowerCase()] ??
        (subjectSlug.isEmpty
            ? subjectSlug
            : subjectSlug[0].toUpperCase() + subjectSlug.substring(1));
    return '$cl/$sub';
  }
}
