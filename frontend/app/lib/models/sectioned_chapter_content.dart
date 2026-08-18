// Models for CS/CA static chapter content (mirrors web content/chapters/*.js sections[] shape)

class SectionNav {
  final String? back;
  final String? next;
  final String? nextLabel;
  final bool    practice;

  const SectionNav({this.back, this.next, this.nextLabel, this.practice = false});

  factory SectionNav.fromJson(Map<String, dynamic> j) => SectionNav(
    back:      j['back']      as String?,
    next:      j['next']      as String?,
    nextLabel: j['nextLabel'] as String?,
    practice:  j['practice']  as bool? ?? false,
  );
}

class ContentSection {
  final String      id;
  final String      title;
  final String      content;
  final SectionNav? nav;

  const ContentSection({
    required this.id,
    required this.title,
    required this.content,
    this.nav,
  });

  factory ContentSection.fromJson(Map<String, dynamic> j) => ContentSection(
    id:      j['id']      as String? ?? '',
    title:   j['title']   as String? ?? '',
    content: j['content'] as String? ?? '',
    nav: j['nav'] != null
        ? SectionNav.fromJson(j['nav'] as Map<String, dynamic>)
        : null,
  );
}

class SectionedChapterContent {
  final int    chapterNumber;
  final String title;
  final String subject;
  final String classLabel;
  final String curriculum;
  final List<ContentSection> sections;

  const SectionedChapterContent({
    required this.chapterNumber,
    required this.title,
    required this.subject,
    required this.classLabel,
    required this.curriculum,
    required this.sections,
  });

  factory SectionedChapterContent.fromJson(Map<String, dynamic> j) =>
      SectionedChapterContent(
        chapterNumber: j['chapterNumber'] as int? ?? 0,
        title:         j['title']         as String? ?? '',
        subject:       j['subject']       as String? ?? '',
        classLabel:    j['classLabel']    as String? ?? '',
        curriculum:    j['curriculum']    as String? ?? '',
        sections: (j['sections'] as List<dynamic>? ?? [])
            .map((s) => ContentSection.fromJson(s as Map<String, dynamic>))
            .toList(),
      );

  ContentSection? sectionById(String id) {
    for (final s in sections) {
      if (s.id == id) return s;
    }
    return null;
  }
}
