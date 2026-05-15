class ExamPaperData {
  final String paperId;
  final String title;
  final String classLabel;
  final String subject;
  final String duration;
  final int maximumMarks;
  final int totalPages;
  final List<ExamPage> pages;

  const ExamPaperData({
    required this.paperId,
    required this.title,
    required this.classLabel,
    required this.subject,
    required this.duration,
    required this.maximumMarks,
    required this.totalPages,
    required this.pages,
  });
}

class ExamPage {
  final int pageNumber;
  final List<ExamBlock> blocks;
  const ExamPage({required this.pageNumber, required this.blocks});
}

class ExamBlock {
  final String type;

  // paper_header
  final String? content;
  final String? subContent;

  // metadata_row
  final List<MetadataItem>? items;

  // question types
  final String? questionId;
  final int? marks;

  // mcq_question
  final List<String>? options;

  // multi_subquestion
  final List<ExamSubQuestion>? subQuestions;

  // or_question
  final ExamBlockOption? optionA;
  final ExamBlockOption? optionB;

  // table
  final List<String>? headers;
  final List<List<String>>? rows;

  // image / chart_image
  final String? src;
  final String? altText;
  final String? caption;
  final String? renderHint;

  const ExamBlock({
    required this.type,
    this.content,
    this.subContent,
    this.items,
    this.questionId,
    this.marks,
    this.options,
    this.subQuestions,
    this.optionA,
    this.optionB,
    this.headers,
    this.rows,
    this.src,
    this.altText,
    this.caption,
    this.renderHint,
  });
}

class MetadataItem {
  final String label;
  final String value;
  const MetadataItem({required this.label, required this.value});
}

class ExamSubQuestion {
  final String id;
  final String label;
  final String content;
  final int marks;
  const ExamSubQuestion({
    required this.id,
    required this.label,
    required this.content,
    required this.marks,
  });
}

class ExamBlockOption {
  final String content;
  const ExamBlockOption({required this.content});
}
