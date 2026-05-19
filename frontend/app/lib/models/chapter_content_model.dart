// Models for static chapter content (mirrors web content/chapters/*.js)

class ChapterContent {
  final String       eyebrow;
  final String       title;
  final String       author;
  final List<String> pills;
  final List<ContentTab> tabs;

  const ChapterContent({
    required this.eyebrow,
    required this.title,
    required this.author,
    required this.pills,
    required this.tabs,
  });

  factory ChapterContent.fromJson(Map<String, dynamic> j) => ChapterContent(
    eyebrow: j['eyebrow'] as String? ?? '',
    title:   j['title']   as String? ?? '',
    author:  j['author']  as String? ?? '',
    pills:   (j['pills']  as List<dynamic>? ?? []).cast<String>(),
    tabs:    (j['tabs']   as List<dynamic>? ?? [])
                .map((t) => ContentTab.fromJson(t as Map<String, dynamic>))
                .toList(),
  );

  List<ContentTab> get visibleTabs =>
      tabs.where((t) => !(t.hidden ?? false)).toList();
}

class ContentTab {
  final String      id;
  final String      label;
  final String?     type;   // 'practice' | 'askai' | null
  final bool?       hidden;
  final List<ContentBlock> blocks;

  const ContentTab({
    required this.id,
    required this.label,
    this.type,
    this.hidden,
    required this.blocks,
  });

  factory ContentTab.fromJson(Map<String, dynamic> j) => ContentTab(
    id:     j['id']    as String,
    label:  j['label'] as String,
    type:   j['type']  as String?,
    hidden: j['hidden'] as bool?,
    blocks: (j['blocks'] as List<dynamic>? ?? [])
                .map((b) => ContentBlock.fromJson(b as Map<String, dynamic>))
                .toList(),
  );

  String get displayLabel {
    // Strip leading emoji + space if present
    final s = label.trim();
    final rune = s.runes.first;
    if (rune > 127) {
      final rest = s.substring(String.fromCharCodes([rune]).length).trimLeft();
      return rest;
    }
    return s;
  }

  String get emoji {
    final s = label.trim();
    final rune = s.runes.first;
    if (rune > 127) return String.fromCharCodes([rune]);
    return '';
  }
}

// ── Block hierarchy ─────────────────────────────────────────────────────────

sealed class ContentBlock {
  const ContentBlock();

  factory ContentBlock.fromJson(Map<String, dynamic> j) {
    final type = j['type'] as String? ?? '';
    return switch (type) {
      'teacher-voice' => TeacherVoiceBlock(html: j['html'] as String? ?? ''),
      'section-head'  => SectionHeadBlock(text: j['text'] as String? ?? ''),
      'think-box'     => ThinkBoxBlock(
        label: j['label'] as String? ?? '',
        text:  j['text']  as String? ?? '',
      ),
      'quote-block'   => QuoteBlock(
        quote:   j['quote']   as String? ?? '',
        context: j['context'] as String? ?? '',
      ),
      'author-stat'   => AuthorStatBlock(
        label: j['label'] as String? ?? '',
        value: j['value'] as String? ?? '',
      ),
      'device-block'  => DeviceBlock(
        kind: j['kind'] as String? ?? '',
        line: j['line'] as String? ?? '',
        exp:  j['exp']  as String? ?? '',
      ),
      'gloss-row'     => GlossRowBlock(
        word: j['word'] as String? ?? '',
        def:  j['def']  as String? ?? '',
        eg:   j['eg']   as String?,
      ),
      'nav'           => NavBlock(
        back:      j['back']      as String?,
        next:      j['next']      as String?,
        nextLabel: j['nextLabel'] as String?,
        practice:  j['practice']  as bool? ?? false,
      ),
      _               => UnknownBlock(type: type),
    };
  }
}

class TeacherVoiceBlock extends ContentBlock {
  final String html;
  const TeacherVoiceBlock({required this.html});
}

class SectionHeadBlock extends ContentBlock {
  final String text;
  const SectionHeadBlock({required this.text});
}

class ThinkBoxBlock extends ContentBlock {
  final String label;
  final String text;
  const ThinkBoxBlock({required this.label, required this.text});
}

class QuoteBlock extends ContentBlock {
  final String quote;
  final String context;
  const QuoteBlock({required this.quote, required this.context});
}

class AuthorStatBlock extends ContentBlock {
  final String label;
  final String value;
  const AuthorStatBlock({required this.label, required this.value});
}

class DeviceBlock extends ContentBlock {
  final String kind;
  final String line;
  final String exp;
  const DeviceBlock({required this.kind, required this.line, required this.exp});
}

class GlossRowBlock extends ContentBlock {
  final String  word;
  final String  def;
  final String? eg;
  const GlossRowBlock({required this.word, required this.def, this.eg});
}

class NavBlock extends ContentBlock {
  final String? back;
  final String? next;
  final String? nextLabel;
  final bool    practice;
  const NavBlock({this.back, this.next, this.nextLabel, this.practice = false});
}

class UnknownBlock extends ContentBlock {
  final String type;
  const UnknownBlock({required this.type});
}
