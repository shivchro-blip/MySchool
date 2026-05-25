import 'package:flutter/material.dart';
import 'package:flutter_web_plugins/url_strategy.dart';
import 'package:provider/provider.dart';
import 'config/config.dart';
import 'providers/syllabus_provider.dart';
import 'providers/user_provider.dart';
import 'providers/theme_provider.dart';
import 'router.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  AppConfig.assertConfigured();
  // Use path-based URLs (/dashboard instead of /#/dashboard) so the
  // /auth/callback route can coexist with the Supabase OAuth hash fragment.
  usePathUrlStrategy();
  final initialThemeMode = await ThemeProvider.loadInitial();
  runApp(ExamCoachApp(initialThemeMode: initialThemeMode));
}

class ExamCoachApp extends StatelessWidget {
  final ThemeMode initialThemeMode;
  const ExamCoachApp({super.key, required this.initialThemeMode});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ThemeProvider(initialThemeMode)),
        ChangeNotifierProvider(create: (_) => SyllabusProvider()),
        ChangeNotifierProvider(create: (_) => UserProvider()),
      ],
      child: Consumer<ThemeProvider>(
        builder: (_, themeProvider, __) => MaterialApp.router(
          title:          'AI Exam Coach',
          theme:          AppTheme.light,
          darkTheme:      AppTheme.dark,
          themeMode:      themeProvider.mode,
          routerConfig:   router,
          debugShowCheckedModeBanner: false,
        ),
      ),
    );
  }
}
