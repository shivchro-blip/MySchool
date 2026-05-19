class ExplainResponse {
  final String       chapterId;
  final String?      topicId;
  final String       language;
  final String       explanation;
  final List<String> keyPoints;
  final String       examTip;
  final int          sourceChunks;
  final String       modelUsed;
  final bool         cached;

  const ExplainResponse({
    required this.chapterId,
    this.topicId,
    required this.language,
    required this.explanation,
    required this.keyPoints,
    required this.examTip,
    required this.sourceChunks,
    required this.modelUsed,
    required this.cached,
  });

  factory ExplainResponse.fromJson(Map<String, dynamic> json) =>
      ExplainResponse(
        chapterId:    json['chapter_id'] as String,
        topicId:      json['topic_id'] as String?,
        language:     json['language'] as String,
        explanation:  json['explanation'] as String,
        keyPoints:    List<String>.from(json['key_points'] ?? []),
        examTip:      json['exam_tip'] as String? ?? '',
        sourceChunks: json['source_chunks'] as int? ?? 0,
        modelUsed:    json['model_used'] as String,
        cached:       json['cached'] as bool? ?? false,
      );
}
