import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../models/syllabus_model.dart';
import '../services/syllabus_service.dart';
import '../widgets/accordion_card.dart';
import '../widgets/error_view.dart';

// TN Board +1 English: unit colors (index = unitNumber - 1)
const _kStripeColors = [
  Color(0xFF6C63FF), Color(0xFF10B981), Color(0xFF8B5CF6),
  Color(0xFFEF4444), Color(0xFF0EA5E9), Color(0xFFF59E0B),
];
const _kBadgeBg = [
  Color(0xFFEEECFF), Color(0xFFD1FAE5), Color(0xFFF3E8FF),
  Color(0xFFFEE2E2), Color(0xFFE0F2FE), Color(0xFFFEF3E8),
];
const _kBadgeFg = [
  Color(0xFF4F46E5), Color(0xFF059669), Color(0xFF7C3AED),
  Color(0xFFDC2626), Color(0xFF0284C7), Color(0xFFD97706),
];

const _kUnitThemes = [
  'Memory · Relationships · Duty',
  'Courage · Sports · Human Nature',
  'Nature · Mind · Comedy',
  'Wisdom · Mischief · Vanity',
  'Duty · Aspiration · Emotion',
  'Travel · Mortality · Greed',
];

// Chapter-level metadata keyed by chapter number (1–18)
const _kChapterAuthors = <int, String>{
  1: 'Khushwant Singh',    2: 'Gabriel Okara',       3: 'O. Henry',
  4: 'Mary Kom M.C.',      5: 'Ogden Nash',           6: 'Saki',
  7: 'Robert Lynd',        8: 'William Wordsworth',   9: '—',
  10: 'E.V. Lucas',        11: 'T. S. Eliot',         12: 'Stephen Leacock',
  13: 'Aringnar Anna',     14: '—',                   15: 'Katherine Mansfield',
  16: 'Bill Bryson',       17: 'William Shakespeare', 18: '—',
};

// Chapters 3/6/12/15 are Supplementary; 9/18 are Play; rest follow content_type
const _kDisplayTypes = <int, String>{
  1: 'Prose',  2: 'Poem',  3: 'Supplementary',
  4: 'Prose',  5: 'Poem',  6: 'Supplementary',
  7: 'Prose',  8: 'Poem',  9: 'Play',
  10: 'Prose', 11: 'Poem', 12: 'Supplementary',
  13: 'Prose', 14: 'Poem', 15: 'Supplementary',
  16: 'Prose', 17: 'Poem', 18: 'Play',
};

const _kTypeIcons = <String, String>{
  'Prose': '📖', 'Poem': '🎭', 'Supplementary': '📝', 'Play': '🎭',
};

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});
  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final _svc              = SyllabusService();
  List<Subject>  _subjects = [];
  List<Chapter>  _chapters = [];
  Subject?       _selected;
  bool           _loading  = true;
  String         _error    = '';
  final _expandedUnits     = <int>{};

  @override
  void initState() {
    super.initState();
    _loadSubjects();
  }

  Future<void> _loadSubjects() async {
    try {
      final subjects = await _svc.getSubjects();
      setState(() { _subjects = subjects; _loading = false; });
      if (subjects.isNotEmpty) _loadChapters(subjects.first);
    } catch (e) {
      setState(() { _error = e.toString(); _loading = false; });
    }
  }

  Future<void> _loadChapters(Subject s) async {
    setState(() { _selected = s; _chapters = []; _loading = true; _expandedUnits.clear(); });
    try {
      final chapters = await _svc.getChapters(s.id);
      setState(() { _chapters = chapters; _loading = false; });
    } catch (e) {
      setState(() { _error = e.toString(); _loading = false; });
    }
  }

  // Group chapters into units of 3 by chapter number
  Map<int, List<Chapter>> get _units {
    final map = <int, List<Chapter>>{};
    for (final ch in _chapters) {
      final u = ((ch.number - 1) ~/ 3) + 1;
      (map[u] ??= []).add(ch);
    }
    return map;
  }

  void _toggleUnit(int u) {
    setState(() {
      _expandedUnits.contains(u) ? _expandedUnits.remove(u) : _expandedUnits.add(u);
    });
  }

  @override
  Widget build(BuildContext context) {
    final units = _units;
    return Scaffold(
      backgroundColor: const Color(0xFFF5F6FA),
      appBar: AppBar(
        title: const Text('AI Exam Coach'),
        backgroundColor: Colors.white,
        foregroundColor: const Color(0xFF1A1A2E),
        elevation: 0,
        surfaceTintColor: Colors.transparent,
      ),
      body: RefreshIndicator(
        onRefresh: _loadSubjects,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            // Hero banner
            _buildHero(units.length),
            const SizedBox(height: 20),

            if (_error.isNotEmpty)
              ErrorView(message: _error, onRetry: _loadSubjects),

            if (_loading)
              const Center(
                child: Padding(
                  padding: EdgeInsets.all(32),
                  child: CircularProgressIndicator(),
                ),
              ),

            // Subject tabs
            if (_subjects.length > 1) ...[
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: _subjects.map((s) => Padding(
                    padding: const EdgeInsets.only(right: 8),
                    child: ChoiceChip(
                      label: Text('${s.name} ${s.classLevel}'),
                      selected: _selected?.id == s.id,
                      onSelected: (_) => _loadChapters(s),
                      selectedColor: const Color(0xFF4F46E5),
                      labelStyle: TextStyle(
                        color: _selected?.id == s.id ? Colors.white : const Color(0xFF374151),
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  )).toList(),
                ),
              ),
              const SizedBox(height: 16),
            ],

            // Units label
            if (units.isNotEmpty) ...[
              const Text(
                'ALL UNITS',
                style: TextStyle(
                  fontSize: 11, fontWeight: FontWeight.w700,
                  color: Color(0xFF9CA3AF), letterSpacing: 1.2,
                ),
              ),
              const SizedBox(height: 12),

              // Unit cards
              ...units.entries.map((e) => _buildUnitCard(e.key, e.value)),
            ],

          ],
        ),
      ),
    );
  }

  Widget _buildHero(int unitCount) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFF4F46E5), Color(0xFF7C3AED)],
        ),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '${_selected?.classLevel == '+2' ? 'CLASS XII' : 'CLASS XI'} · TAMIL NADU STATE BOARD',
            style: TextStyle(
              color: Colors.white.withOpacity(0.6),
              fontSize: 10, fontWeight: FontWeight.w600, letterSpacing: 1.2,
            ),
          ),
          const SizedBox(height: 6),
          Text(
            _selected?.name ?? 'General English',
            style: const TextStyle(
              color: Colors.white, fontSize: 20, fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            '$unitCount Units · Prose, Poetry & Supplementary',
            style: TextStyle(color: Colors.white.withOpacity(0.65), fontSize: 12),
          ),
          const SizedBox(height: 14),
          Row(
            children: [
              _heroStat(unitCount.toString(), 'Units'),
              const SizedBox(width: 8),
              _heroStat(_chapters.length.toString(), 'Texts'),
              const SizedBox(width: 8),
              _heroStat('0%', 'Complete'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _heroStat(String num, String label) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.12),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: Colors.white.withOpacity(0.15)),
      ),
      child: Column(
        children: [
          Text(num, style: const TextStyle(
            color: Colors.white, fontSize: 18, fontWeight: FontWeight.w700,
          )),
          Text(label, style: TextStyle(
            color: Colors.white.withOpacity(0.6), fontSize: 10, fontWeight: FontWeight.w500,
          )),
        ],
      ),
    );
  }

  Widget _buildUnitCard(int unitNum, List<Chapter> chapters) {
    final ci      = (unitNum - 1) % 6;
    final stripe  = _kStripeColors[ci];
    final badgeBg = _kBadgeBg[ci];
    final badgeFg = _kBadgeFg[ci];
    final theme   = unitNum <= _kUnitThemes.length ? _kUnitThemes[unitNum - 1] : '';
    final heading = chapters.isNotEmpty ? '${chapters.first.title} & more' : 'Unit $unitNum';
    final isOpen  = _expandedUnits.contains(unitNum);

    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: AccordionCard(
        open: isOpen,
        onToggle: () => _toggleUnit(unitNum),
        stripeColor: stripe,
        semanticLabel: 'Unit $unitNum${theme.isNotEmpty ? ", $theme" : ""}, ${isOpen ? "collapse" : "expand"}',
        header: Row(
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
              decoration: BoxDecoration(
                color: badgeBg,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Text(
                'Unit $unitNum',
                style: TextStyle(
                  fontSize: 10, fontWeight: FontWeight.w700,
                  color: badgeFg, letterSpacing: 0.5,
                ),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  if (theme.isNotEmpty)
                    Text(
                      theme,
                      style: const TextStyle(
                        fontSize: 10, color: Color(0xFF9CA3AF),
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  Text(
                    heading,
                    style: const TextStyle(
                      fontSize: 14, fontWeight: FontWeight.w600,
                      color: Color(0xFF111827),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
        footer: Container(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
          decoration: const BoxDecoration(
            border: Border(top: BorderSide(color: Color(0xFFF0F0F8))),
          ),
          child: Row(
            children: [
              Expanded(
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: LinearProgressIndicator(
                    value: 0,
                    minHeight: 5,
                    backgroundColor: const Color(0xFFE5E7EB),
                    valueColor: AlwaysStoppedAnimation<Color>(stripe),
                  ),
                ),
              ),
              const SizedBox(width: 10),
              Text(
                '0 / ${chapters.length} completed',
                style: const TextStyle(fontSize: 11, color: Color(0xFF9CA3AF)),
              ),
            ],
          ),
        ),
        child: Column(
          children: chapters
              .map((ch) => _buildChapterRow(ch, badgeBg, badgeFg, stripe))
              .toList(),
        ),
      ),
    );
  }

  Widget _buildChapterRow(Chapter ch, Color badgeBg, Color badgeFg, Color stripe) {
    final displayType = _kDisplayTypes[ch.number] ?? ch.contentType;
    final author      = _kChapterAuthors[ch.number] ?? '';
    final icon        = _kTypeIcons[displayType] ?? '📄';

    return Container(
      decoration: const BoxDecoration(
        border: Border(top: BorderSide(color: Color(0xFFF7F7FB))),
      ),
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      child: Row(
        children: [
          Container(
            width: 36, height: 36,
            decoration: BoxDecoration(
              color: badgeBg,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Center(child: Text(icon, style: const TextStyle(fontSize: 16))),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  displayType.toUpperCase(),
                  style: TextStyle(
                    fontSize: 10, fontWeight: FontWeight.w600,
                    color: badgeFg, letterSpacing: 0.8,
                  ),
                ),
                Text(
                  ch.title,
                  style: const TextStyle(
                    fontSize: 13, fontWeight: FontWeight.w500, color: Color(0xFF1F2937),
                  ),
                ),
                if (author.isNotEmpty && author != '—')
                  Text(
                    author,
                    style: const TextStyle(fontSize: 11, color: Color(0xFF9CA3AF)),
                  ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          Column(
            children: [
              OutlinedButton(
                onPressed: () => context.push('/rich-learn/${_selected!.classLevel}/${_selected!.slug}/${ch.slug}'),
                style: OutlinedButton.styleFrom(
                  minimumSize: const Size(72, 30),
                  padding: const EdgeInsets.symmetric(horizontal: 8),
                  textStyle: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600),
                  side: BorderSide(color: badgeFg.withOpacity(0.5)),
                  foregroundColor: badgeFg,
                ),
                child: const Text('Learn'),
              ),
              const SizedBox(height: 4),
              ElevatedButton(
                onPressed: () => context.push('/practice/${_selected!.classLevel}/${_selected!.slug}/${ch.slug}'),
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size(72, 30),
                  padding: const EdgeInsets.symmetric(horizontal: 8),
                  textStyle: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600),
                  backgroundColor: stripe,
                  foregroundColor: Colors.white,
                ),
                child: const Text('Practice'),
              ),
            ],
          ),
        ],
      ),
    );
  }

}
