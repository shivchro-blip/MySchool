import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../models/syllabus_model.dart';
import '../services/syllabus_service.dart';
import '../widgets/error_view.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});
  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final _svc = SyllabusService();
  List<Subject>  _subjects  = [];
  List<Chapter>  _chapters  = [];
  Subject?       _selected;
  bool           _loading   = true;
  String         _error     = '';

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
    setState(() { _selected = s; _chapters = []; _loading = true; });
    try {
      final chapters = await _svc.getChapters(s.id);
      setState(() { _chapters = chapters; _loading = false; });
    } catch (e) {
      setState(() { _error = e.toString(); _loading = false; });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('AI Exam Coach')),
      body: RefreshIndicator(
        onRefresh: _loadSubjects,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            // Hero banner
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color:        const Color(0xFF16A34A),
                borderRadius: BorderRadius.circular(14),
              ),
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Welcome back! 👋',
                      style: TextStyle(
                        color:      Colors.white,
                        fontSize:   17,
                        fontWeight: FontWeight.w700,
                      )),
                  SizedBox(height: 4),
                  Text('What do you want to study today?',
                      style: TextStyle(color: Color(0xFFD1FAE5), fontSize: 13)),
                ],
              ),
            ),
            const SizedBox(height: 20),

            if (_error.isNotEmpty)
              ErrorView(message: _error, onRetry: _loadSubjects),

            if (_loading)
              const Center(
                child: Padding(
                  padding: EdgeInsets.all(32),
                  child:   CircularProgressIndicator(),
                ),
              ),

            // Subject tabs
            if (_subjects.length > 1) ...[
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: _subjects.map((s) => Padding(
                    padding: const EdgeInsets.only(right: 8),
                    child:   ChoiceChip(
                      label:    Text('${s.name} ${s.classLevel}'),
                      selected: _selected?.id == s.id,
                      onSelected: (_) => _loadChapters(s),
                      selectedColor: const Color(0xFF16A34A),
                      labelStyle: TextStyle(
                        color: _selected?.id == s.id
                            ? Colors.white
                            : const Color(0xFF374151),
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  )).toList(),
                ),
              ),
              const SizedBox(height: 16),
            ],

            // Chapter list
            if (_chapters.isNotEmpty) ...[
              const Text(
                'CHAPTERS',
                style: TextStyle(
                  fontSize:      11,
                  fontWeight:    FontWeight.w700,
                  color:         Color(0xFF9CA3AF),
                  letterSpacing: 1.2,
                ),
              ),
              const SizedBox(height: 10),
              ..._chapters.map((ch) => Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: Card(
                  child: Padding(
                    padding: const EdgeInsets.all(12),
                    child: Row(
                      children: [
                        Text(ch.typeIcon, style: const TextStyle(fontSize: 28)),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Ch ${ch.number}. ${ch.title}',
                                style: const TextStyle(
                                  fontWeight: FontWeight.w600,
                                  fontSize:   14,
                                ),
                              ),
                              Text(
                                ch.contentType,
                                style: const TextStyle(
                                  fontSize: 12, color: Color(0xFF9CA3AF),
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(width: 8),
                        Column(
                          children: [
                            OutlinedButton(
                              onPressed: () => context.push('/learn/${ch.id}'),
                              style: OutlinedButton.styleFrom(
                                minimumSize: const Size(70, 32),
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 10,
                                ),
                                textStyle: const TextStyle(fontSize: 12),
                              ),
                              child: const Text('Learn'),
                            ),
                            const SizedBox(height: 4),
                            ElevatedButton(
                              onPressed: () => context.push('/practice/${ch.id}'),
                              style: ElevatedButton.styleFrom(
                                minimumSize: const Size(70, 32),
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 10,
                                ),
                                textStyle: const TextStyle(fontSize: 12),
                              ),
                              child: const Text('Practice'),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              )),
            ],
          ],
        ),
      ),
    );
  }
}
