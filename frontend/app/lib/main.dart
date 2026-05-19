import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'config/config.dart';
import 'providers/syllabus_provider.dart';
import 'providers/user_provider.dart';
import 'router.dart';

void main() {
  runApp(const ExamCoachApp());
}

class ExamCoachApp extends StatelessWidget {
  const ExamCoachApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => SyllabusProvider()),
        ChangeNotifierProvider(create: (_) => UserProvider()),
      ],
      child: MaterialApp.router(
        title:          'AI Exam Coach',
        theme:          AppTheme.light,
        routerConfig:   router,
        debugShowCheckedModeBanner: false,
      ),
    );
  }
}
