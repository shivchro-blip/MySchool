import 'package:flutter_test/flutter_test.dart';
import 'package:yadhum/services/chapter_content_service.dart';
import 'package:yadhum/services/exam_practice_service.dart';
import 'package:yadhum/services/model_paper_service.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  group('Class 11 Computer Applications (Tamil) assets load', () {
    // CA-Tamil chapters use the tabs-shaped ChapterContent format (matches
    // Class 12 CA-Tamil on disk), not the sections-shaped SectionedChapterContent.
    test('chapter 1 loads with non-empty tabs', () async {
      final content = await ChapterContentService().loadContent(
        '+1',
        'computer-applications-tamil',
        'ta-chapter-01-introduction-to-computers',
      );
      expect(content, isNotNull);
      expect(content!.tabs, isNotEmpty);
      print('CA-Tamil ch1 title: ${content.title}');
      print('CA-Tamil ch1 first tab label: ${content.tabs.first.label}');
    });

    test('chapter 7 loads with non-empty tabs', () async {
      final content = await ChapterContentService().loadContent(
        '+1',
        'computer-applications-tamil',
        'ta-chapter-07-openoffice-calc-basics',
      );
      expect(content, isNotNull);
      expect(content!.tabs, isNotEmpty);
      print('CA-Tamil ch7 title: ${content.title}');
    });

    test('practice 1 loads with non-empty questions', () async {
      final questions = await ExamPracticeService.getQuestions(
        '+1',
        'computer-applications-tamil',
        'ta-chapter-01-introduction-to-computers',
      );
      expect(questions, isNotEmpty);
      print('CA-Tamil practice1 count: ${questions.length}');
      print('CA-Tamil practice1 first: ${questions.first.html}');
    });

    test('practice 7 loads with non-empty questions', () async {
      final questions = await ExamPracticeService.getQuestions(
        '+1',
        'computer-applications-tamil',
        'ta-chapter-07-openoffice-calc-basics',
      );
      expect(questions, isNotEmpty);
      print('CA-Tamil practice7 count: ${questions.length}');
    });

    test('model paper set 1 loads with non-empty pages', () async {
      final paper = await ModelPaperService.loadPaper(
        '+1',
        'computer-applications-tamil',
        'class11-computer-applications-tamil-model-qa-1',
      );
      expect(paper.pages, isNotEmpty);
      print('CA-Tamil model paper title: ${paper.title}');
      print('CA-Tamil model paper pages: ${paper.pages.length}');
    });
  });

  group('Class 11 Computer Science (Tamil) assets load', () {
    test('chapter 1 loads with non-empty sections', () async {
      final content = await ChapterContentService().loadSectionedContent(
        '+1',
        'computer-science-tamil',
        'ta-chapter-01-computer-science-basics',
      );
      expect(content, isNotNull);
      expect(content!.sections, isNotEmpty);
      print('CS-Tamil ch1 title: ${content.title}');
      print('CS-Tamil ch1 first section: ${content.sections.first.title}');
    });

    test('chapter 9 loads with non-empty sections', () async {
      final content = await ChapterContentService().loadSectionedContent(
        '+1',
        'computer-science-tamil',
        'ta-chapter-09-cpp-introduction',
      );
      expect(content, isNotNull);
      expect(content!.sections, isNotEmpty);
      print('CS-Tamil ch9 title: ${content.title}');
    });

    test('practice 1 loads with non-empty questions', () async {
      final questions = await ExamPracticeService.getQuestions(
        '+1',
        'computer-science-tamil',
        'ta-chapter-01-computer-science-basics',
      );
      expect(questions, isNotEmpty);
      print('CS-Tamil practice1 count: ${questions.length}');
      print('CS-Tamil practice1 first: ${questions.first.html}');
    });

    test('practice 16 loads with non-empty questions', () async {
      final questions = await ExamPracticeService.getQuestions(
        '+1',
        'computer-science-tamil',
        'ta-chapter-16-inheritance',
      );
      expect(questions, isNotEmpty);
      print('CS-Tamil practice16 count: ${questions.length}');
    });

    test('model paper set 1 loads with non-empty pages', () async {
      final paper = await ModelPaperService.loadPaper(
        '+1',
        'computer-science-tamil',
        'class11-computer-science-tamil-model-qa-1',
      );
      expect(paper.pages, isNotEmpty);
      print('CS-Tamil model paper title: ${paper.title}');
      print('CS-Tamil model paper pages: ${paper.pages.length}');
    });
  });
}
