import 'package:flutter/material.dart';
import '../services/evaluation_service.dart';
import '../config/theme.dart';

class ProgressScreen extends StatefulWidget {
  const ProgressScreen({super.key});
  @override
  State<ProgressScreen> createState() => _ProgressScreenState();
}

class _ProgressScreenState extends State<ProgressScreen> {
  final _svc = EvaluationService();
  Map<String, dynamic>? _data;
  bool   _loading = true;
  String _error   = '';

  @override
  void initState() {
    super.initState();
    _svc.getProgress().then((d) {
      setState(() { _data = d; _loading = false; });
    }).catchError((e) {
      setState(() { _error = e.toString(); _loading = false; });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('My Progress')),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _error.isNotEmpty
              ? Center(child: Text(_error,
                    style: TextStyle(color: AppTheme.errorOf(context))))
              : ListView(
                  padding: const EdgeInsets.all(16),
                  children: [
                    // Stats
                    Row(children: [
                      Expanded(child: _statCard(
                        '${_data!['total_attempts']}',
                        'Total Attempts',
                      )),
                      const SizedBox(width: 12),
                      Expanded(child: _statCard(
                        '${_data!['average_score']}%',
                        'Avg Score',
                      )),
                    ]),
                    const SizedBox(height: 12),

                    // Progress bar
                    Card(
                      child: Padding(
                        padding: const EdgeInsets.all(14),
                        child: Column(children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              const Text('Overall Score',
                                  style: TextStyle(fontWeight: FontWeight.w600)),
                              Text('${_data!['average_score']}%',
                                  style: TextStyle(
                                    color: AppTheme.brandOf(context),
                                    fontWeight: FontWeight.w700,
                                  )),
                            ],
                          ),
                          const SizedBox(height: 8),
                          ClipRRect(
                            borderRadius: BorderRadius.circular(6),
                            child: LinearProgressIndicator(
                              value:           (_data!['average_score'] as num)
                                                   .toDouble() / 100,
                              minHeight:       10,
                              backgroundColor: AppTheme.borderOf(context),
                              color:           AppTheme.brandOf(context),
                            ),
                          ),
                        ]),
                      ),
                    ),

                    if (_data!['total_attempts'] == 0) ...[
                      const SizedBox(height: 40),
                      Center(
                        child: Column(children: [
                          const Text('📝', style: TextStyle(fontSize: 48)),
                          const SizedBox(height: 8),
                          Text('No attempts yet.',
                              style: TextStyle(color: AppTheme.text2Of(context))),
                        ]),
                      ),
                    ],
                  ],
                ),
    );
  }

  Widget _statCard(String value, String label) => Card(
    child: Padding(
      padding: const EdgeInsets.all(16),
      child: Column(children: [
        Text(value,
            style: TextStyle(
              fontSize:   28,
              fontWeight: FontWeight.w800,
              color:      AppTheme.brandOf(context),
            )),
        const SizedBox(height: 4),
        Text(label,
            style: TextStyle(
              fontSize: 12,
              color:    AppTheme.text2Of(context),
            )),
      ]),
    ),
  );
}
