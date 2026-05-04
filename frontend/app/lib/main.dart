import 'package:flutter/material.dart';
import 'config/config.dart';
import 'router.dart';

void main() {
  runApp(const ExamCoachApp());
}

class ExamCoachApp extends StatelessWidget {
  const ExamCoachApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title:          'AI Exam Coach',
      theme:          AppTheme.light,
      routerConfig:   router,
      debugShowCheckedModeBanner: false,
    );
  }
}
