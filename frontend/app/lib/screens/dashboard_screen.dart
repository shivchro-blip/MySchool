import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../config/theme.dart';
import '../providers/syllabus_provider.dart';
import '../providers/user_provider.dart';
import '../services/evaluation_service.dart';
import '../widgets/error_view.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  final _evalSvc = EvaluationService();
  Map<String, dynamic>? _progress;
  bool  _progressLoading = true;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<UserProvider>().loadIfNeeded();
      context.read<SyllabusProvider>().loadIfNeeded();
      _loadProgress();
    });
  }

  Future<void> _loadProgress() async {
    try {
      final p = await _evalSvc.getProgress();
      if (mounted) setState(() { _progress = p; _progressLoading = false; });
    } catch (_) {
      if (mounted) setState(() => _progressLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final user     = context.watch<UserProvider>();
    final syllabus = context.watch<SyllabusProvider>();

    return Scaffold(
      backgroundColor: AppTheme.surface,
      body: RefreshIndicator(
        color: AppTheme.brand,
        onRefresh: () async {
          await context.read<UserProvider>().load();
          await context.read<SyllabusProvider>().load();
          await _loadProgress();
        },
        child: ListView(
          padding: const EdgeInsets.fromLTRB(16, 0, 16, 24),
          children: [
            _buildHeader(user),
            const SizedBox(height: 20),
            if (syllabus.error != null)
              ErrorView(message: syllabus.error!,
                  onRetry: () => context.read<SyllabusProvider>().load()),
            _buildStatsRow(syllabus),
            const SizedBox(height: 24),
            _buildSectionLabel('My Courses'),
            const SizedBox(height: 12),
            _buildClassCard(
              classLevel: '+1',
              fullName:   'Class XI — Higher Secondary First Year',
              color:      AppTheme.plus1,
              bg:         AppTheme.plus1Bg,
              subjectCount: syllabus.plus1Count,
              loading:    !syllabus.loaded,
            ),
            const SizedBox(height: 10),
            _buildClassCard(
              classLevel: '+2',
              fullName:   'Class XII — Higher Secondary Second Year',
              color:      AppTheme.plus2,
              bg:         AppTheme.plus2Bg,
              subjectCount: syllabus.plus2Count,
              loading:    !syllabus.loaded,
            ),
            const SizedBox(height: 24),
            _buildSectionLabel('Your Progress'),
            const SizedBox(height: 12),
            _buildProgressCard(),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(UserProvider user) {
    final name = user.profile?.displayName ?? 'Student';
    final cls  = user.profile?.classLevel;
    return Container(
      margin: const EdgeInsets.only(top: 16),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end:   Alignment.bottomRight,
          colors: [Color(0xFF2A7B6F), Color(0xFF1d5c53)],
        ),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Welcome back,',
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.7),
                    fontSize: 13,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  name,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 22,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                if (cls != null) ...[
                  const SizedBox(height: 6),
                  Container(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 10, vertical: 3),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.15),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text(
                      'Class $cls · Tamil Nadu State Board',
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 11,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ],
              ],
            ),
          ),
          Container(
            width: 48, height: 48,
            decoration: BoxDecoration(
              color:  Colors.white.withOpacity(0.15),
              shape:  BoxShape.circle,
            ),
            child: const Icon(Icons.person_outline,
                color: Colors.white, size: 24),
          ),
        ],
      ),
    );
  }

  Widget _buildStatsRow(SyllabusProvider syllabus) {
    final totalSubjects = syllabus.subjects.length;
    return Row(
      children: [
        Expanded(child: _statCard(
          icon:  Icons.menu_book_outlined,
          value: syllabus.loaded ? '$totalSubjects' : '—',
          label: 'Subjects',
          color: AppTheme.brand,
        )),
        const SizedBox(width: 12),
        Expanded(child: _statCard(
          icon:  Icons.check_circle_outline,
          value: _progress != null
              ? '${_progress!['total_attempts'] ?? 0}'
              : '—',
          label: 'Attempts',
          color: AppTheme.maths,
        )),
        const SizedBox(width: 12),
        Expanded(child: _statCard(
          icon:  Icons.trending_up,
          value: _progress != null
              ? '${(_progress!['average_score'] as num?)?.toStringAsFixed(0) ?? 0}%'
              : '—',
          label: 'Avg Score',
          color: AppTheme.science,
        )),
      ],
    );
  }

  Widget _statCard({
    required IconData icon,
    required String value,
    required String label,
    required Color color,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 12),
      decoration: BoxDecoration(
        color:        Colors.white,
        borderRadius: BorderRadius.circular(12),
        border:       Border.all(color: AppTheme.border),
      ),
      child: Column(
        children: [
          Icon(icon, color: color, size: 22),
          const SizedBox(height: 6),
          Text(value, style: TextStyle(
            fontSize: 18, fontWeight: FontWeight.w700, color: color,
          )),
          Text(label, style: const TextStyle(
            fontSize: 11, color: AppTheme.textMuted,
          )),
        ],
      ),
    );
  }

  Widget _buildSectionLabel(String text) => Text(
    text,
    style: const TextStyle(
      fontSize: 16,
      fontWeight: FontWeight.w700,
      color: AppTheme.textPrimary,
    ),
  );

  Widget _buildClassCard({
    required String classLevel,
    required String fullName,
    required Color  color,
    required Color  bg,
    required int    subjectCount,
    required bool   loading,
  }) {
    return GestureDetector(
      onTap: () => context.push('/courses/$classLevel'),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color:        Colors.white,
          borderRadius: BorderRadius.circular(14),
          border:       Border.all(color: color.withAlpha(60)),
          boxShadow: [
            BoxShadow(
              color: color.withAlpha(20),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              width: 52, height: 52,
              decoration: BoxDecoration(
                color:        bg,
                borderRadius: BorderRadius.circular(13),
              ),
              child: Center(
                child: Text(
                  classLevel,
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w800,
                    color: color,
                  ),
                ),
              ),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    fullName,
                    style: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w700,
                      color: AppTheme.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 3),
                  Text(
                    loading
                        ? 'Loading...'
                        : '$subjectCount subject${subjectCount != 1 ? 's' : ''}',
                    style: TextStyle(
                      fontSize: 12,
                      color: color.withAlpha(180),
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
            ),
            Icon(Icons.chevron_right, color: color, size: 22),
          ],
        ),
      ),
    );
  }

  Widget _buildProgressCard() {
    if (_progressLoading) {
      return Container(
        height: 80,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: AppTheme.border),
        ),
        child: const Center(child: CircularProgressIndicator()),
      );
    }

    final attempts = _progress?['total_attempts'] as int? ?? 0;
    final avgScore  = (_progress?['average_score'] as num?)?.toDouble() ?? 0.0;

    if (attempts == 0) {
      return Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: AppTheme.border),
        ),
        child: const Center(
          child: Text(
            'No practice attempts yet. Start practising!',
            style: TextStyle(color: AppTheme.textMuted, fontSize: 13),
          ),
        ),
      );
    }

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppTheme.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('Average Score',
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.textSecondary,
                  )),
              Text(
                '${avgScore.toStringAsFixed(0)}%',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w700,
                  color: avgScore >= 80
                      ? AppTheme.success
                      : avgScore >= 50
                          ? AppTheme.warning
                          : AppTheme.error,
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: LinearProgressIndicator(
              value: avgScore / 100,
              minHeight: 6,
              backgroundColor: AppTheme.border,
              valueColor: AlwaysStoppedAnimation<Color>(
                avgScore >= 80
                    ? AppTheme.success
                    : avgScore >= 50
                        ? AppTheme.warning
                        : AppTheme.error,
              ),
            ),
          ),
          const SizedBox(height: 8),
          Text(
            '$attempts practice attempt${attempts != 1 ? 's' : ''} completed',
            style: const TextStyle(fontSize: 12, color: AppTheme.textMuted),
          ),
        ],
      ),
    );
  }
}
