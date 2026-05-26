import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../config/theme.dart';
import '../providers/user_provider.dart';
import '../services/user_preferences_service.dart';
import '../services/user_service.dart';
import '../widgets/app_button.dart';

// ── Data ──────────────────────────────────────────────────────────────────────

class _SubjectDef {
  final String   slug;
  final String   name;
  final String   description;
  final IconData icon;
  final Color    color;
  final Color    bg;
  const _SubjectDef({
    required this.slug,
    required this.name,
    required this.description,
    required this.icon,
    required this.color,
    required this.bg,
  });
}

const _kSubjects = [
  _SubjectDef(
    slug:        'english',
    name:        'English',
    description: 'Lessons, summaries, practice',
    icon:        Icons.menu_book_outlined,
    color:       AppTheme.english,
    bg:          AppTheme.englishBg,
  ),
  _SubjectDef(
    slug:        'maths',
    name:        'Mathematics',
    description: 'Concepts and problem practice',
    icon:        Icons.calculate_outlined,
    color:       AppTheme.maths,
    bg:          AppTheme.mathsBg,
  ),
  _SubjectDef(
    slug:        'science',
    name:        'Science',
    description: 'Structured subject support',
    icon:        Icons.science_outlined,
    color:       AppTheme.science,
    bg:          AppTheme.scienceBg,
  ),
];

class _ClassDef {
  final String value;
  final String label;
  final String sub;
  final Color  color;
  final Color  bg;
  const _ClassDef({
    required this.value,
    required this.label,
    required this.sub,
    required this.color,
    required this.bg,
  });
}

const _kClasses = [
  _ClassDef(
    value: '+1',
    label: 'Class 11',
    sub:   'First Year · +1',
    color: AppTheme.plus1,
    bg:    AppTheme.plus1Bg,
  ),
  _ClassDef(
    value: '+2',
    label: 'Class 12',
    sub:   'Second Year · +2',
    color: AppTheme.plus2,
    bg:    AppTheme.plus2Bg,
  ),
];

enum _Step { intro, classSelect, subjectSelect }

// ── Main screen ───────────────────────────────────────────────────────────────

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  _Step        _step       = _Step.intro;
  String?      _classLevel;
  List<String> _subjects   = [];
  bool         _loading    = false;
  String       _error      = '';

  @override
  void initState() {
    super.initState();
    _restorePartialState();
  }

  Future<void> _restorePartialState() async {
    final savedStep  = await UserPreferencesService.getOnboardingStep();
    final savedClass = await UserPreferencesService.getOnboardingClass();
    if (!mounted) return;
    if (savedStep == 2 && savedClass != null) {
      setState(() {
        _step       = _Step.subjectSelect;
        _classLevel = savedClass;
      });
    } else if (savedStep == 1) {
      setState(() {
        _step       = _Step.classSelect;
        _classLevel = savedClass;
      });
    }
  }

  Future<void> _goToClassSelect() async {
    await UserPreferencesService.setOnboardingStep(1);
    if (!mounted) return;
    setState(() => _step = _Step.classSelect);
  }

  Future<void> _selectClass(String classLevel) async {
    setState(() => _classLevel = classLevel);
    await UserPreferencesService.setOnboardingClass(classLevel);
  }

  Future<void> _goToSubjectSelect() async {
    await UserPreferencesService.setOnboardingStep(2);
    if (!mounted) return;
    setState(() => _step = _Step.subjectSelect);
  }

  void _toggleSubject(String slug) {
    setState(() {
      if (_subjects.contains(slug)) {
        _subjects = _subjects.where((s) => s != slug).toList();
      } else {
        _subjects = [..._subjects, slug];
      }
    });
  }

  Future<void> _finish() async {
    if (_classLevel == null || _subjects.isEmpty) return;
    setState(() { _loading = true; _error = ''; });
    try {
      await UserService().updateProfile(
        classLevel:          _classLevel,
        subjects:            _subjects,
        onboardingCompleted: true,
      );
      await UserPreferencesService.setOnboardingCompleted(true);
      if (!mounted) return;
      // Clear cached profile so dashboard loads fresh personalized data.
      context.read<UserProvider>().clear();
      context.go('/dashboard');
    } catch (e) {
      if (mounted) {
        setState(() => _error = e.toString().replaceFirst('Exception: ', ''));
      }
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.surfaceOf(context),
      body: SafeArea(
        child: AnimatedSwitcher(
          duration: const Duration(milliseconds: 200),
          transitionBuilder: (child, animation) => FadeTransition(
            opacity: CurvedAnimation(parent: animation, curve: Curves.easeOut),
            child: SlideTransition(
              position: Tween<Offset>(
                begin: const Offset(0, 0.03),
                end:   Offset.zero,
              ).animate(CurvedAnimation(parent: animation, curve: Curves.easeOutCubic)),
              child: child,
            ),
          ),
          child: switch (_step) {
            _Step.intro         => _IntroStep(key: const ValueKey('intro'), onStart: _goToClassSelect),
            _Step.classSelect   => _ClassStep(
                key:          const ValueKey('class'),
                classLevel:   _classLevel,
                onSelect:     _selectClass,
                onContinue:   _classLevel != null ? _goToSubjectSelect : null,
              ),
            _Step.subjectSelect => _SubjectStep(
                key:         const ValueKey('subject'),
                classLevel:  _classLevel ?? '+1',
                subjects:    _subjects,
                onToggle:    _toggleSubject,
                onBack:      () => setState(() => _step = _Step.classSelect),
                onFinish:    _subjects.isNotEmpty ? _finish : null,
                loading:     _loading,
                error:       _error,
              ),
          },
        ),
      ),
    );
  }
}

// ── Step 0: Intro ─────────────────────────────────────────────────────────────

class _IntroStep extends StatelessWidget {
  final VoidCallback onStart;
  const _IntroStep({super.key, required this.onStart});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: 24),
          Center(
            child: Container(
              width: 72, height: 72,
              decoration: BoxDecoration(
                color:        AppTheme.brandLightOf(context),
                borderRadius: BorderRadius.circular(20),
              ),
              child: const Icon(Icons.school_rounded, color: AppTheme.brand, size: 36),
            ),
          ),
          const SizedBox(height: 32),
          Text(
            'Personalise your study space',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize:   22,
              fontWeight: FontWeight.w700,
              color:      AppTheme.textOf(context),
              height:     1.3,
            ),
          ),
          const SizedBox(height: 12),
          Text(
            'Choose your class and subjects. TN Exam Coach will show only the courses that match your selection.',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 14,
              color:    AppTheme.text2Of(context),
              height:   1.55,
            ),
          ),
          const SizedBox(height: 20),
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color:        AppTheme.brandLightOf(context),
              borderRadius: BorderRadius.circular(10),
              border:       Border.all(color: AppTheme.brand.withAlpha(50)),
            ),
            child: const Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Icon(Icons.info_outline_rounded, color: AppTheme.brand, size: 15),
                SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Your dashboard will include only the class and subjects you choose here.',
                    style: TextStyle(
                      fontSize: 13,
                      color:    AppTheme.brand,
                      height:   1.5,
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 48),
          AppButton(label: 'Get started', onPressed: onStart),
        ],
      ),
    );
  }
}

// ── Step 1: Class selection ───────────────────────────────────────────────────

class _ClassStep extends StatelessWidget {
  final String?          classLevel;
  final void Function(String) onSelect;
  final VoidCallback?    onContinue;
  const _ClassStep({
    super.key,
    required this.classLevel,
    required this.onSelect,
    required this.onContinue,
  });

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const _ProgressBar(step: 1, total: 2),
          const SizedBox(height: 24),
          Text(
            'Which class are you studying?',
            style: TextStyle(
              fontSize:   22,
              fontWeight: FontWeight.w700,
              color:      AppTheme.textOf(context),
              height:     1.3,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'This will shape the courses shown in your account.',
            style: TextStyle(
              fontSize: 14,
              color:    AppTheme.text2Of(context),
              height:   1.5,
            ),
          ),
          const SizedBox(height: 28),
          for (final cls in _kClasses) ...[
            _ClassCard(
              info:     cls,
              selected: classLevel == cls.value,
              onTap:    () => onSelect(cls.value),
            ),
            const SizedBox(height: 12),
          ],
          const SizedBox(height: 28),
          AppButton(
            label:     'Continue to subjects',
            onPressed: onContinue,
          ),
        ],
      ),
    );
  }
}

// ── Step 2: Subject selection ─────────────────────────────────────────────────

class _SubjectStep extends StatelessWidget {
  final String         classLevel;
  final List<String>   subjects;
  final void Function(String) onToggle;
  final VoidCallback   onBack;
  final VoidCallback?  onFinish;
  final bool           loading;
  final String         error;
  const _SubjectStep({
    super.key,
    required this.classLevel,
    required this.subjects,
    required this.onToggle,
    required this.onBack,
    required this.onFinish,
    required this.loading,
    required this.error,
  });

  String get _classLabel => classLevel == '+1' ? 'Class 11' : 'Class 12';

  String get _summary {
    if (subjects.isEmpty) return 'Selected: $_classLabel';
    final names = _kSubjects
        .where((s) => subjects.contains(s.slug))
        .map((s) => s.name)
        .join(', ');
    return 'Selected: $_classLabel · $names';
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const _ProgressBar(step: 2, total: 2),
          const SizedBox(height: 24),
          Text(
            'Which subjects do you want to study?',
            style: TextStyle(
              fontSize:   22,
              fontWeight: FontWeight.w700,
              color:      AppTheme.textOf(context),
              height:     1.3,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Select one or more. These are the only subjects that will appear in your account after login.',
            style: TextStyle(
              fontSize: 14,
              color:    AppTheme.text2Of(context),
              height:   1.5,
            ),
          ),
          const SizedBox(height: 24),
          for (final subj in _kSubjects) ...[
            _SubjectTile(
              info:     subj,
              selected: subjects.contains(subj.slug),
              onTap:    () => onToggle(subj.slug),
            ),
            const SizedBox(height: 10),
          ],
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
            decoration: BoxDecoration(
              color:        AppTheme.borderSoftOf(context),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              _summary,
              style: TextStyle(
                fontSize:   13,
                fontWeight: FontWeight.w500,
                color:      AppTheme.text2Of(context),
              ),
            ),
          ),
          if (error.isNotEmpty) ...[
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color:        AppTheme.errorBgOf(context),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                error,
                style: TextStyle(fontSize: 13, color: AppTheme.errorFgOf(context)),
              ),
            ),
          ],
          const SizedBox(height: 24),
          AppButton(
            label:     'Start learning',
            onPressed: onFinish,
            loading:   loading,
          ),
          const SizedBox(height: 12),
          TextButton(
            onPressed: onBack,
            child: Text(
              'Back',
              style: TextStyle(
                fontSize:   14,
                fontWeight: FontWeight.w500,
                color:      AppTheme.text2Of(context),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// ── Shared widgets ────────────────────────────────────────────────────────────

class _ProgressBar extends StatelessWidget {
  final int step;
  final int total;
  const _ProgressBar({required this.step, required this.total});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        ClipRRect(
          borderRadius: BorderRadius.circular(2),
          child: LinearProgressIndicator(
            value:            step / total,
            minHeight:        3,
            backgroundColor:  AppTheme.borderOf(context),
            valueColor:       const AlwaysStoppedAnimation<Color>(AppTheme.brand),
          ),
        ),
        const SizedBox(height: 12),
        Text(
          'Step $step of $total',
          style: TextStyle(
            fontSize:      11,
            fontWeight:    FontWeight.w600,
            letterSpacing: 0.5,
            color:         AppTheme.textMutedOf(context),
          ),
        ),
      ],
    );
  }
}

class _ClassCard extends StatelessWidget {
  final _ClassDef    info;
  final bool         selected;
  final VoidCallback onTap;
  const _ClassCard({required this.info, required this.selected, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        padding: const EdgeInsets.all(18),
        decoration: BoxDecoration(
          color: selected ? info.bg : AppTheme.cardOf(context),
          border: Border.all(
            color: selected ? info.color : AppTheme.borderOf(context),
            width: selected ? 2.0 : 1.5,
          ),
          borderRadius: BorderRadius.circular(AppTheme.radiusCard),
        ),
        child: Row(
          children: [
            Container(
              width: 46, height: 46,
              decoration: BoxDecoration(
                color:        selected
                                  ? info.color.withAlpha(30)
                                  : AppTheme.borderOf(context).withAlpha(100),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Center(
                child: Icon(
                  Icons.school_rounded,
                  color: selected ? info.color : AppTheme.textMutedOf(context),
                  size:  22,
                ),
              ),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    info.label,
                    style: TextStyle(
                      fontSize:   15,
                      fontWeight: FontWeight.w700,
                      color:      selected ? info.color : AppTheme.textOf(context),
                    ),
                  ),
                  const SizedBox(height: 3),
                  Text(
                    info.sub,
                    style: TextStyle(
                      fontSize: 12,
                      color:    selected
                                    ? info.color.withAlpha(180)
                                    : AppTheme.textMutedOf(context),
                    ),
                  ),
                ],
              ),
            ),
            AnimatedSwitcher(
              duration: const Duration(milliseconds: 150),
              child: selected
                  ? Container(
                      key: const ValueKey('checked'),
                      width: 22, height: 22,
                      decoration: BoxDecoration(
                        color: info.color,
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.check_rounded, color: Colors.white, size: 13),
                    )
                  : Container(
                      key: const ValueKey('unchecked'),
                      width: 22, height: 22,
                      decoration: BoxDecoration(
                        border: Border.all(
                          color: AppTheme.borderOf(context),
                          width: 1.5,
                        ),
                        shape: BoxShape.circle,
                      ),
                    ),
            ),
          ],
        ),
      ),
    );
  }
}

class _SubjectTile extends StatelessWidget {
  final _SubjectDef  info;
  final bool         selected;
  final VoidCallback onTap;
  const _SubjectTile({required this.info, required this.selected, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        decoration: BoxDecoration(
          color: selected ? info.bg : AppTheme.cardOf(context),
          border: Border.all(
            color: selected ? info.color : AppTheme.borderOf(context),
            width: selected ? 2.0 : 1.5,
          ),
          borderRadius: BorderRadius.circular(AppTheme.radiusCard),
        ),
        child: Row(
          children: [
            Container(
              width: 40, height: 40,
              decoration: BoxDecoration(
                color:        info.bg,
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(info.icon, color: info.color, size: 20),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    info.name,
                    style: TextStyle(
                      fontSize:   14,
                      fontWeight: selected ? FontWeight.w700 : FontWeight.w500,
                      color:      selected
                                      ? info.color.withAlpha(220)
                                      : AppTheme.textOf(context),
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    info.description,
                    style: TextStyle(
                      fontSize: 12,
                      color:    selected
                                    ? info.color.withAlpha(160)
                                    : AppTheme.textMutedOf(context),
                    ),
                  ),
                ],
              ),
            ),
            AnimatedSwitcher(
              duration: const Duration(milliseconds: 150),
              child: selected
                  ? Icon(
                      key: const ValueKey('checked'),
                      Icons.check_circle_rounded,
                      color: info.color,
                      size:  22,
                    )
                  : Container(
                      key: const ValueKey('unchecked'),
                      width: 22, height: 22,
                      decoration: BoxDecoration(
                        border: Border.all(
                          color: AppTheme.borderOf(context),
                          width: 1.5,
                        ),
                        shape: BoxShape.circle,
                      ),
                    ),
            ),
          ],
        ),
      ),
    );
  }
}
