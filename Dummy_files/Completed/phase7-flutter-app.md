# AI Exam Coach — Phase 7: Flutter Mobile App
> Open Claude Code inside C:\MyProjects\exam-coach and paste this entire file.

---

## Context

Read CLAUDE.md before doing anything.
This phase builds the Flutter mobile app for Android and iOS.
It connects to the same FastAPI backend as the web frontend.
Same core student flow: Login → Home → Learn OR Practice → Evaluate → Retry.

The app is mobile-first with bottom navigation, native feel, and
offline-aware error handling for Indian network conditions.

Do not change the backend — Flutter calls the same API endpoints.

---

## Step 1: Verify Flutter is installed

```bash
flutter --version
flutter doctor
```

Flutter 3.0+ is required. If not installed: https://flutter.dev/docs/get-started/install

---

## Step 2: Initialize the Flutter project properly

```bash
cd frontend/app
flutter create . --org com.examcoach --project-name exam_coach
```

This overwrites the stub pubspec.yaml with a proper Flutter project.

---

## Step 3: Replace pubspec.yaml with exact dependencies

### FILE: frontend/app/pubspec.yaml

```yaml
name: exam_coach
description: AI Exam Coach for Tamil Nadu +1 and +2 students
version: 1.0.0+1

environment:
  sdk: ">=3.0.0 <4.0.0"

dependencies:
  flutter:
    sdk: flutter

  # HTTP
  http: ^1.2.0

  # State management
  provider: ^6.1.2

  # Navigation
  go_router: ^13.2.0

  # Storage
  flutter_secure_storage: ^9.0.0
  shared_preferences: ^2.2.3

  # UI
  google_fonts: ^6.2.1
  flutter_markdown: ^0.6.22
  shimmer: ^3.0.0

  # Utils
  intl: ^0.19.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
  assets:
    - assets/
```

---

## Step 4: Create the assets folder

```bash
mkdir -p frontend/app/assets
```

---

## Step 5: Create all Dart files with exactly the content shown

---

### FILE: frontend/app/lib/config/app_config.dart

```dart
// App configuration
// Change API_BASE_URL to your server IP when testing on a real phone
// localhost will not work on a physical device — use your machine's LAN IP

class AppConfig {
  // For emulator: http://10.0.2.2:8000
  // For physical device on same WiFi: http://192.168.x.x:8000
  // For production: https://your-domain.com
  static const String apiBaseUrl = 'http://10.0.2.2:8000/api/v1';

  static const String appName = 'AI Exam Coach';
  static const int freeAiCallsPerDay = 20;
  static const int requestTimeoutSeconds = 90;
}
```

---

### FILE: frontend/app/lib/config/theme.dart

```dart
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  static const Color brand    = Color(0xFF16A34A);
  static const Color brandLight = Color(0xFFDCFCE7);
  static const Color brandDark  = Color(0xFF15803D);
  static const Color surface  = Color(0xFFF9FAFB);
  static const Color card     = Colors.white;
  static const Color textPrimary   = Color(0xFF111827);
  static const Color textSecondary = Color(0xFF6B7280);
  static const Color textMuted     = Color(0xFF9CA3AF);
  static const Color border   = Color(0xFFE5E7EB);
  static const Color error    = Color(0xFFDC2626);
  static const Color warning  = Color(0xFFD97706);
  static const Color success  = Color(0xFF16A34A);

  static ThemeData get light => ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(
      seedColor: brand,
      brightness: Brightness.light,
    ),
    textTheme: GoogleFonts.interTextTheme(),
    scaffoldBackgroundColor: surface,
    appBarTheme: AppBarTheme(
      backgroundColor: Colors.white,
      foregroundColor: textPrimary,
      elevation: 0,
      centerTitle: false,
      titleTextStyle: GoogleFonts.inter(
        fontSize: 18,
        fontWeight: FontWeight.w700,
        color: textPrimary,
      ),
    ),
    cardTheme: CardTheme(
      color: card,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: const BorderSide(color: border),
      ),
      margin: EdgeInsets.zero,
    ),
    inputDecorationTheme: InputDecorationTheme(
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: border),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: border),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: brand, width: 2),
      ),
      filled: true,
      fillColor: Colors.white,
      contentPadding: const EdgeInsets.symmetric(
        horizontal: 14, vertical: 12,
      ),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: brand,
        foregroundColor: Colors.white,
        minimumSize: const Size.fromHeight(48),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
        textStyle: GoogleFonts.inter(
          fontWeight: FontWeight.w600,
          fontSize: 15,
        ),
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: textPrimary,
        minimumSize: const Size.fromHeight(48),
        side: const BorderSide(color: border),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
        textStyle: GoogleFonts.inter(
          fontWeight: FontWeight.w500,
          fontSize: 15,
        ),
      ),
    ),
  );
}
```

---

### FILE: frontend/app/lib/models/syllabus_model.dart

```dart
class Subject {
  final String id;
  final String code;
  final String name;
  final String classLevel;
  final bool isActive;

  const Subject({
    required this.id,
    required this.code,
    required this.name,
    required this.classLevel,
    required this.isActive,
  });

  factory Subject.fromJson(Map<String, dynamic> json) => Subject(
    id:         json['id'] as String,
    code:       json['code'] as String,
    name:       json['name'] as String,
    classLevel: (json['class'] ?? json['class_level'] ?? '') as String,
    isActive:   json['is_active'] as bool? ?? true,
  );
}

class Chapter {
  final String id;
  final String subjectId;
  final int    number;
  final String title;
  final String contentType;
  final bool   isActive;

  const Chapter({
    required this.id,
    required this.subjectId,
    required this.number,
    required this.title,
    required this.contentType,
    required this.isActive,
  });

  factory Chapter.fromJson(Map<String, dynamic> json) => Chapter(
    id:          json['id'] as String,
    subjectId:   json['subject_id'] as String,
    number:      json['number'] as int,
    title:       json['title'] as String,
    contentType: json['content_type'] as String,
    isActive:    json['is_active'] as bool? ?? true,
  );

  String get typeIcon => switch (contentType) {
    'prose'      => '📖',
    'poem'       => '🎵',
    'grammar'    => '✏️',
    'vocabulary' => '🔤',
    _            => '📄',
  };
}

class Topic {
  final String id;
  final String chapterId;
  final String title;
  final int    orderIndex;

  const Topic({
    required this.id,
    required this.chapterId,
    required this.title,
    required this.orderIndex,
  });

  factory Topic.fromJson(Map<String, dynamic> json) => Topic(
    id:         json['id'] as String,
    chapterId:  json['chapter_id'] as String,
    title:      json['title'] as String,
    orderIndex: json['order_index'] as int? ?? 0,
  );
}

class Question {
  final String  id;
  final String  questionText;
  final int     marks;
  final String  questionType;
  final bool    isValidated;

  const Question({
    required this.id,
    required this.questionText,
    required this.marks,
    required this.questionType,
    required this.isValidated,
  });

  factory Question.fromJson(Map<String, dynamic> json) => Question(
    id:           json['id'] as String,
    questionText: json['question_text'] as String,
    marks:        json['marks'] as int,
    questionType: json['question_type'] as String,
    isValidated:  json['is_validated'] as bool? ?? false,
  );

  String get writingHint => switch (marks) {
    1      => 'Write one sentence with the key term.',
    2      => 'Write 2–3 sentences: key term + explanation.',
    5      => 'Write a paragraph with 3–4 clear points.',
    10     => 'Write an essay: intro + 4–5 points + conclusion.',
    _      => 'Write your answer clearly.',
  };
}
```

---

### FILE: frontend/app/lib/models/learning_model.dart

```dart
class ExplainResponse {
  final String       chapterId;
  final String?      topicId;
  final String       language;
  final String       explanation;
  final List<String> keyPoints;
  final String       examTip;
  final int          sourceChunks;
  final String       modelUsed;
  final bool         cached;

  const ExplainResponse({
    required this.chapterId,
    this.topicId,
    required this.language,
    required this.explanation,
    required this.keyPoints,
    required this.examTip,
    required this.sourceChunks,
    required this.modelUsed,
    required this.cached,
  });

  factory ExplainResponse.fromJson(Map<String, dynamic> json) =>
      ExplainResponse(
        chapterId:    json['chapter_id'] as String,
        topicId:      json['topic_id'] as String?,
        language:     json['language'] as String,
        explanation:  json['explanation'] as String,
        keyPoints:    List<String>.from(json['key_points'] ?? []),
        examTip:      json['exam_tip'] as String? ?? '',
        sourceChunks: json['source_chunks'] as int? ?? 0,
        modelUsed:    json['model_used'] as String,
        cached:       json['cached'] as bool? ?? false,
      );
}
```

---

### FILE: frontend/app/lib/models/evaluation_model.dart

```dart
class FeedbackDetail {
  final List<String> strengths;
  final List<String> weaknesses;
  final List<String> missingPoints;
  final String       structureComment;
  final String       grammarComment;

  const FeedbackDetail({
    required this.strengths,
    required this.weaknesses,
    required this.missingPoints,
    required this.structureComment,
    required this.grammarComment,
  });

  factory FeedbackDetail.fromJson(Map<String, dynamic> json) =>
      FeedbackDetail(
        strengths:        List<String>.from(json['strengths'] ?? []),
        weaknesses:       List<String>.from(json['weaknesses'] ?? []),
        missingPoints:    List<String>.from(json['missing_points'] ?? []),
        structureComment: json['structure_comment'] as String? ?? '',
        grammarComment:   json['grammar_comment'] as String? ?? '',
      );
}

class EvaluationResponse {
  final String         responseId;
  final String         questionId;
  final double         marksAwarded;
  final int            marksTotal;
  final double         percentage;
  final FeedbackDetail feedback;
  final String         improvedAnswer;
  final String         modelUsed;
  final bool           cached;

  const EvaluationResponse({
    required this.responseId,
    required this.questionId,
    required this.marksAwarded,
    required this.marksTotal,
    required this.percentage,
    required this.feedback,
    required this.improvedAnswer,
    required this.modelUsed,
    required this.cached,
  });

  factory EvaluationResponse.fromJson(Map<String, dynamic> json) =>
      EvaluationResponse(
        responseId:    json['response_id'] as String,
        questionId:    json['question_id'] as String,
        marksAwarded:  (json['marks_awarded'] as num).toDouble(),
        marksTotal:    json['marks_total'] as int,
        percentage:    (json['percentage'] as num).toDouble(),
        feedback:      FeedbackDetail.fromJson(
                         json['feedback'] as Map<String, dynamic>,
                       ),
        improvedAnswer: json['improved_answer'] as String? ?? '',
        modelUsed:      json['model_used'] as String,
        cached:         json['cached'] as bool? ?? false,
      );

  String get scoreLabel =>
      '${marksAwarded % 1 == 0 ? marksAwarded.toInt() : marksAwarded}'
      '/$marksTotal marks';

  String get encouragement => percentage >= 80
      ? '🎉 Excellent work!'
      : percentage >= 50
          ? '👍 Good effort — keep going!'
          : '💪 Keep practising!';

  Color get scoreColor {
    if (percentage >= 80) return const Color(0xFF16A34A);
    if (percentage >= 50) return const Color(0xFFD97706);
    return const Color(0xFFDC2626);
  }
}
```

---

### FILE: frontend/app/lib/services/api_service.dart

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/app_config.dart';
import '../services/auth_service.dart';

class ApiException implements Exception {
  final String message;
  final int?   statusCode;
  ApiException(this.message, {this.statusCode});
  @override
  String toString() => message;
}

class ApiService {
  static final ApiService _instance = ApiService._();
  factory ApiService() => _instance;
  ApiService._();

  final _timeout = Duration(seconds: AppConfig.requestTimeoutSeconds);

  Future<Map<String, String>> _headers({bool auth = true}) async {
    final headers = {'Content-Type': 'application/json'};
    if (auth) {
      final token = await AuthService().getToken();
      if (token != null) headers['Authorization'] = 'Bearer $token';
    }
    return headers;
  }

  Uri _url(String path) => Uri.parse('${AppConfig.apiBaseUrl}$path');

  Future<dynamic> get(String path, {bool auth = true}) async {
    try {
      final res = await http
          .get(_url(path), headers: await _headers(auth: auth))
          .timeout(_timeout);
      return _handle(res);
    } on ApiException {
      rethrow;
    } catch (e) {
      throw ApiException('Network error. Check your connection.');
    }
  }

  Future<dynamic> post(
    String path,
    Map<String, dynamic> body, {
    bool auth = true,
  }) async {
    try {
      final res = await http
          .post(
            _url(path),
            headers: await _headers(auth: auth),
            body: jsonEncode(body),
          )
          .timeout(_timeout);
      return _handle(res);
    } on ApiException {
      rethrow;
    } catch (e) {
      throw ApiException('Network error. Check your connection.');
    }
  }

  dynamic _handle(http.Response res) {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (res.body.isEmpty) return null;
      return jsonDecode(res.body);
    }
    try {
      final err = jsonDecode(res.body);
      throw ApiException(
        err['error'] ?? err['detail'] ?? 'Request failed',
        statusCode: res.statusCode,
      );
    } catch (_) {
      throw ApiException(
        'Server error (${res.statusCode})',
        statusCode: res.statusCode,
      );
    }
  }
}
```

---

### FILE: frontend/app/lib/services/auth_service.dart

```dart
import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

// Replace with your Supabase project values
const _supabaseUrl  = 'YOUR_SUPABASE_URL';
const _supabaseAnon = 'YOUR_SUPABASE_ANON_KEY';

class AuthService {
  static final AuthService _instance = AuthService._();
  factory AuthService() => _instance;
  AuthService._();

  static const _storage = FlutterSecureStorage();
  static const _tokenKey = 'exam_coach_token';

  Future<void> loginWithEmail(String email, String password) async {
    final res = await http.post(
      Uri.parse('$_supabaseUrl/auth/v1/token?grant_type=password'),
      headers: {
        'Content-Type': 'application/json',
        'apikey': _supabaseAnon,
      },
      body: jsonEncode({'email': email, 'password': password}),
    );
    final data = jsonDecode(res.body) as Map<String, dynamic>;
    if (res.statusCode != 200) {
      throw Exception(data['error_description'] ?? 'Login failed');
    }
    await _storage.write(key: _tokenKey, value: data['access_token'] as String);
  }

  Future<void> signupWithEmail(String email, String password) async {
    final res = await http.post(
      Uri.parse('$_supabaseUrl/auth/v1/signup'),
      headers: {
        'Content-Type': 'application/json',
        'apikey': _supabaseAnon,
      },
      body: jsonEncode({'email': email, 'password': password}),
    );
    if (res.statusCode != 200 && res.statusCode != 201) {
      final data = jsonDecode(res.body) as Map<String, dynamic>;
      throw Exception(data['error_description'] ?? 'Signup failed');
    }
  }

  Future<void> logout() async {
    await _storage.delete(key: _tokenKey);
  }

  Future<String?> getToken() async {
    return _storage.read(key: _tokenKey);
  }

  Future<bool> isLoggedIn() async {
    final token = await getToken();
    return token != null && token.isNotEmpty;
  }
}
```

---

### FILE: frontend/app/lib/services/syllabus_service.dart

```dart
import '../models/syllabus_model.dart';
import 'api_service.dart';

class SyllabusService {
  final _api = ApiService();

  Future<List<Subject>> getSubjects() async {
    final data = await _api.get('/syllabus/subjects', auth: false);
    return (data as List).map((j) => Subject.fromJson(j)).toList();
  }

  Future<List<Chapter>> getChapters(String subjectId) async {
    final data = await _api.get(
      '/syllabus/subjects/$subjectId/chapters',
      auth: false,
    );
    return (data as List).map((j) => Chapter.fromJson(j)).toList();
  }

  Future<List<Topic>> getTopics(String chapterId) async {
    final data = await _api.get(
      '/syllabus/chapters/$chapterId/topics',
      auth: false,
    );
    return (data as List).map((j) => Topic.fromJson(j)).toList();
  }

  Future<List<Question>> getQuestions(String chapterId, {int? marks}) async {
    final query = marks != null ? '?marks=$marks' : '';
    final data  = await _api.get(
      '/syllabus/chapters/$chapterId/questions$query',
      auth: false,
    );
    return (data as List).map((j) => Question.fromJson(j)).toList();
  }
}
```

---

### FILE: frontend/app/lib/services/learning_service.dart

```dart
import '../models/learning_model.dart';
import 'api_service.dart';

class LearningService {
  final _api = ApiService();

  Future<ExplainResponse> explain({
    required String chapterId,
    String?         topicId,
    String          question = '',
    String          language = 'en',
  }) async {
    final data = await _api.post('/learning/explain', {
      'chapter_id': chapterId,
      if (topicId != null) 'topic_id': topicId,
      'question':   question,
      'language':   language,
    });
    return ExplainResponse.fromJson(data as Map<String, dynamic>);
  }
}
```

---

### FILE: frontend/app/lib/services/evaluation_service.dart

```dart
import '../models/evaluation_model.dart';
import 'api_service.dart';

class EvaluationService {
  final _api = ApiService();

  Future<EvaluationResponse> submit({
    required String questionId,
    required String studentAnswer,
    int             attemptNumber = 1,
  }) async {
    final data = await _api.post('/evaluation/submit', {
      'question_id':    questionId,
      'student_answer': studentAnswer,
      'attempt_number': attemptNumber,
    });
    return EvaluationResponse.fromJson(data as Map<String, dynamic>);
  }

  Future<EvaluationResponse> retry({
    required String responseId,
    required String newAnswer,
  }) async {
    final data = await _api.post('/evaluation/retry', {
      'response_id': responseId,
      'new_answer':  newAnswer,
    });
    return EvaluationResponse.fromJson(data as Map<String, dynamic>);
  }

  Future<Map<String, dynamic>> getProgress() async {
    return (await _api.get('/evaluation/progress')) as Map<String, dynamic>;
  }
}
```

---

### FILE: frontend/app/lib/widgets/app_button.dart

```dart
import 'package:flutter/material.dart';
import '../config/theme.dart';

class AppButton extends StatelessWidget {
  final String   label;
  final VoidCallback? onPressed;
  final bool     loading;
  final bool     outlined;
  final IconData? icon;

  const AppButton({
    super.key,
    required this.label,
    this.onPressed,
    this.loading   = false,
    this.outlined  = false,
    this.icon,
  });

  @override
  Widget build(BuildContext context) {
    final child = loading
        ? const SizedBox(
            height: 20,
            width:  20,
            child:  CircularProgressIndicator(
              strokeWidth: 2.5,
              color: Colors.white,
            ),
          )
        : Row(
            mainAxisAlignment: MainAxisAlignment.center,
            mainAxisSize: MainAxisSize.min,
            children: [
              if (icon != null) ...[
                Icon(icon, size: 18),
                const SizedBox(width: 6),
              ],
              Text(label),
            ],
          );

    if (outlined) {
      return OutlinedButton(onPressed: loading ? null : onPressed, child: child);
    }
    return ElevatedButton(onPressed: loading ? null : onPressed, child: child);
  }
}
```

---

### FILE: frontend/app/lib/widgets/marks_chip.dart

```dart
import 'package:flutter/material.dart';

class MarksChip extends StatelessWidget {
  final int marks;
  const MarksChip({super.key, required this.marks});

  @override
  Widget build(BuildContext context) {
    final (bg, fg) = switch (marks) {
      1  => (const Color(0xFFF3F4F6), const Color(0xFF374151)),
      2  => (const Color(0xFFDBEAFE), const Color(0xFF1D4ED8)),
      5  => (const Color(0xFFF3E8FF), const Color(0xFF7C3AED)),
      10 => (const Color(0xFFFEF3C7), const Color(0xFFB45309)),
      _  => (const Color(0xFFF3F4F6), const Color(0xFF374151)),
    };
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color:        bg,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        '$marks ${marks == 1 ? 'mark' : 'marks'}',
        style: TextStyle(
          fontSize:   12,
          fontWeight: FontWeight.w600,
          color:      fg,
        ),
      ),
    );
  }
}
```

---

### FILE: frontend/app/lib/widgets/score_card.dart

```dart
import 'package:flutter/material.dart';
import '../models/evaluation_model.dart';

class ScoreCard extends StatelessWidget {
  final EvaluationResponse result;
  const ScoreCard({super.key, required this.result});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Text(
              result.scoreLabel,
              style: TextStyle(
                fontSize:   28,
                fontWeight: FontWeight.w800,
                color:      result.scoreColor,
              ),
            ),
            const SizedBox(height: 8),
            ClipRRect(
              borderRadius: BorderRadius.circular(8),
              child: LinearProgressIndicator(
                value:           result.percentage / 100,
                minHeight:       10,
                backgroundColor: const Color(0xFFE5E7EB),
                color:           result.scoreColor,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              result.encouragement,
              style: const TextStyle(fontSize: 14, color: Color(0xFF6B7280)),
            ),
          ],
        ),
      ),
    );
  }
}
```

---

### FILE: frontend/app/lib/widgets/error_view.dart

```dart
import 'package:flutter/material.dart';
import '../config/theme.dart';

class ErrorView extends StatelessWidget {
  final String   message;
  final VoidCallback? onRetry;

  const ErrorView({super.key, required this.message, this.onRetry});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color:        const Color(0xFFFEF2F2),
        borderRadius: BorderRadius.circular(10),
        border:       Border.all(color: const Color(0xFFFECACA)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            message,
            style: const TextStyle(
              fontSize: 13, color: Color(0xFFB91C1C),
            ),
          ),
          if (onRetry != null) ...[
            const SizedBox(height: 6),
            GestureDetector(
              onTap: onRetry,
              child: const Text(
                'Try again',
                style: TextStyle(
                  fontSize:      13,
                  color:         Color(0xFFB91C1C),
                  decoration:    TextDecoration.underline,
                  fontWeight:    FontWeight.w600,
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
```

---

### FILE: frontend/app/lib/screens/login_screen.dart

```dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../services/auth_service.dart';
import '../config/theme.dart';
import '../widgets/app_button.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});
  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailCtrl    = TextEditingController();
  final _passwordCtrl = TextEditingController();
  final _auth         = AuthService();

  bool   _loading = false;
  bool   _isLogin = true;
  String _error   = '';

  Future<void> _submit() async {
    final email    = _emailCtrl.text.trim();
    final password = _passwordCtrl.text.trim();

    if (email.isEmpty || password.isEmpty) {
      setState(() => _error = 'Please enter email and password.');
      return;
    }

    setState(() { _loading = true; _error = ''; });

    try {
      if (!_isLogin) await _auth.signupWithEmail(email, password);
      await _auth.loginWithEmail(email, password);
      if (mounted) context.go('/');
    } catch (e) {
      setState(() => _error = e.toString().replaceFirst('Exception: ', ''));
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 48),
              const Text('📚', textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 56)),
              const SizedBox(height: 12),
              const Text(
                'AI Exam Coach',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 26, fontWeight: FontWeight.w800),
              ),
              const SizedBox(height: 4),
              const Text(
                'Tamil Nadu +1 & +2 Board Exam Preparation',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 13, color: Color(0xFF6B7280)),
              ),
              const SizedBox(height: 40),

              // Mode toggle
              Container(
                decoration: BoxDecoration(
                  color:        const Color(0xFFF3F4F6),
                  borderRadius: BorderRadius.circular(10),
                ),
                padding: const EdgeInsets.all(4),
                child: Row(
                  children: [
                    for (final (label, val) in [('Login', true), ('Sign Up', false)])
                      Expanded(
                        child: GestureDetector(
                          onTap: () => setState(() { _isLogin = val; _error = ''; }),
                          child: AnimatedContainer(
                            duration: const Duration(milliseconds: 150),
                            padding: const EdgeInsets.symmetric(vertical: 10),
                            decoration: BoxDecoration(
                              color:        _isLogin == val
                                                ? Colors.white
                                                : Colors.transparent,
                              borderRadius: BorderRadius.circular(8),
                              boxShadow:    _isLogin == val
                                  ? [const BoxShadow(
                                      color: Color(0x15000000),
                                      blurRadius: 4,
                                    )]
                                  : null,
                            ),
                            child: Text(
                              label,
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                fontSize:   14,
                                fontWeight: FontWeight.w600,
                                color:      _isLogin == val
                                    ? AppTheme.textPrimary
                                    : AppTheme.textSecondary,
                              ),
                            ),
                          ),
                        ),
                      ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              TextField(
                controller:  _emailCtrl,
                keyboardType: TextInputType.emailAddress,
                decoration: const InputDecoration(labelText: 'Email'),
              ),
              const SizedBox(height: 12),
              TextField(
                controller:  _passwordCtrl,
                obscureText: true,
                decoration: const InputDecoration(labelText: 'Password'),
                onSubmitted: (_) => _submit(),
              ),

              if (_error.isNotEmpty) ...[
                const SizedBox(height: 12),
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color:        const Color(0xFFFEF2F2),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    _error,
                    style: const TextStyle(fontSize: 13, color: Color(0xFFB91C1C)),
                  ),
                ),
              ],

              const SizedBox(height: 24),
              AppButton(
                label:     _isLogin ? 'Login' : 'Create Account',
                onPressed: _submit,
                loading:   _loading,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

---

### FILE: frontend/app/lib/screens/home_screen.dart

```dart
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
```

---

### FILE: frontend/app/lib/screens/learn_screen.dart

```dart
import 'package:flutter/material.dart';
import '../models/syllabus_model.dart';
import '../models/learning_model.dart';
import '../services/syllabus_service.dart';
import '../services/learning_service.dart';
import '../widgets/app_button.dart';
import '../widgets/error_view.dart';

class LearnScreen extends StatefulWidget {
  final String chapterId;
  const LearnScreen({super.key, required this.chapterId});
  @override
  State<LearnScreen> createState() => _LearnScreenState();
}

class _LearnScreenState extends State<LearnScreen> {
  final _syllSvc = SyllabusService();
  final _learnSvc = LearningService();
  final _questionCtrl = TextEditingController();

  List<Topic>      _topics    = [];
  Topic?           _topic;
  String           _language  = 'en';
  ExplainResponse? _result;
  bool             _loading   = false;
  bool             _tLoading  = true;
  String           _error     = '';

  @override
  void initState() {
    super.initState();
    _syllSvc.getTopics(widget.chapterId).then((t) {
      setState(() { _topics = t; _tLoading = false; });
    }).catchError((e) {
      setState(() { _error = e.toString(); _tLoading = false; });
    });
  }

  Future<void> _explain() async {
    if (_topic == null && _questionCtrl.text.trim().isEmpty) return;
    setState(() { _loading = true; _error = ''; _result = null; });
    try {
      final res = await _learnSvc.explain(
        chapterId: widget.chapterId,
        topicId:   _topic?.id,
        question:  _questionCtrl.text.trim(),
        language:  _language,
      );
      setState(() => _result = res);
    } catch (e) {
      setState(() => _error = e.toString());
    } finally {
      setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Learn')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Topic chips
          if (_tLoading)
            const Center(child: CircularProgressIndicator()),
          if (_topics.isNotEmpty) ...[
            const Text('Select a topic',
                style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              runSpacing: 6,
              children: _topics.map((t) => ChoiceChip(
                label:      Text(t.title, style: const TextStyle(fontSize: 13)),
                selected:   _topic?.id == t.id,
                onSelected: (_) => setState(() =>
                    _topic = _topic?.id == t.id ? null : t),
                selectedColor: const Color(0xFF16A34A),
                labelStyle: TextStyle(
                  color: _topic?.id == t.id ? Colors.white : null,
                ),
              )).toList(),
            ),
            const SizedBox(height: 16),
          ],

          // Question
          const Text('Or ask a question',
              style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
          const SizedBox(height: 8),
          TextField(
            controller:  _questionCtrl,
            decoration:  const InputDecoration(
              hintText: 'e.g. What is the theme of this lesson?',
            ),
            onSubmitted: (_) => _explain(),
          ),
          const SizedBox(height: 16),

          // Language toggle
          Row(
            children: [
              const Text('Explain in: ',
                  style: TextStyle(fontSize: 13)),
              const SizedBox(width: 8),
              SegmentedButton<String>(
                segments: const [
                  ButtonSegment(value: 'en', label: Text('English')),
                  ButtonSegment(value: 'ta', label: Text('Tamil')),
                ],
                selected:         {_language},
                onSelectionChanged: (v) => setState(() => _language = v.first),
                style: SegmentedButton.styleFrom(
                  minimumSize: const Size(80, 36),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),

          AppButton(
            label:     '✨ Explain',
            onPressed: _explain,
            loading:   _loading,
          ),
          const SizedBox(height: 16),

          if (_error.isNotEmpty) ErrorView(message: _error),

          // Result
          if (_result != null) ...[
            Card(
              child: Padding(
                padding: const EdgeInsets.all(14),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Explanation',
                        style: TextStyle(
                          fontWeight: FontWeight.w700, fontSize: 15,
                        )),
                    const SizedBox(height: 8),
                    Text(_result!.explanation,
                        style: const TextStyle(fontSize: 14, height: 1.6)),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 10),

            if (_result!.keyPoints.isNotEmpty)
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(14),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Key Points for Exam',
                          style: TextStyle(
                            fontWeight: FontWeight.w700, fontSize: 15,
                          )),
                      const SizedBox(height: 8),
                      ..._result!.keyPoints.map((pt) => Padding(
                        padding: const EdgeInsets.only(bottom: 6),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text('✓ ',
                                style: TextStyle(
                                  color:      Color(0xFF16A34A),
                                  fontWeight: FontWeight.w700,
                                )),
                            Expanded(
                              child: Text(pt,
                                  style: const TextStyle(fontSize: 13)),
                            ),
                          ],
                        ),
                      )),
                    ],
                  ),
                ),
              ),

            if (_result!.examTip.isNotEmpty) ...[
              const SizedBox(height: 10),
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color:        const Color(0xFFFFFBEB),
                  border:       Border.all(color: const Color(0xFFFDE68A)),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('💡 Exam Tip',
                        style: TextStyle(
                          fontWeight: FontWeight.w700,
                          color:      Color(0xFF92400E),
                        )),
                    const SizedBox(height: 4),
                    Text(_result!.examTip,
                        style: const TextStyle(
                          fontSize: 13, color: Color(0xFF78350F),
                        )),
                  ],
                ),
              ),
            ],
          ],
        ],
      ),
    );
  }
}
```

---

### FILE: frontend/app/lib/screens/practice_screen.dart

```dart
import 'package:flutter/material.dart';
import '../models/syllabus_model.dart';
import '../models/evaluation_model.dart';
import '../services/syllabus_service.dart';
import '../services/evaluation_service.dart';
import '../widgets/app_button.dart';
import '../widgets/marks_chip.dart';
import '../widgets/score_card.dart';
import '../widgets/error_view.dart';

class PracticeScreen extends StatefulWidget {
  final String chapterId;
  const PracticeScreen({super.key, required this.chapterId});
  @override
  State<PracticeScreen> createState() => _PracticeScreenState();
}

class _PracticeScreenState extends State<PracticeScreen> {
  final _syllSvc  = SyllabusService();
  final _evalSvc  = EvaluationService();
  final _answerCtrl = TextEditingController();

  List<Question>     _questions = [];
  Question?          _current;
  EvaluationResponse? _result;
  bool               _loading  = false;
  bool               _qLoading = true;
  String             _error    = '';
  String             _view     = 'list'; // list | write | result

  @override
  void initState() {
    super.initState();
    _syllSvc.getQuestions(widget.chapterId).then((q) {
      setState(() { _questions = q; _qLoading = false; });
    }).catchError((e) {
      setState(() { _error = e.toString(); _qLoading = false; });
    });
  }

  void _startQuestion(Question q) {
    setState(() {
      _current = q;
      _answerCtrl.clear();
      _result = null;
      _error  = '';
      _view   = 'write';
    });
  }

  Future<void> _submit() async {
    final text = _answerCtrl.text.trim();
    if (text.length < 10) {
      setState(() => _error = 'Please write at least 10 characters.');
      return;
    }
    setState(() { _loading = true; _error = ''; });
    try {
      final res = await _evalSvc.submit(
        questionId:    _current!.id,
        studentAnswer: text,
      );
      setState(() { _result = res; _view = 'result'; });
    } catch (e) {
      setState(() => _error = e.toString());
    } finally {
      setState(() => _loading = false);
    }
  }

  Future<void> _retry() async {
    final text = _answerCtrl.text.trim();
    if (text.length < 10) {
      setState(() => _error = 'Please write at least 10 characters.');
      return;
    }
    setState(() { _loading = true; _error = ''; });
    try {
      final res = await _evalSvc.retry(
        responseId: _result!.responseId,
        newAnswer:  text,
      );
      setState(() => _result = res);
    } catch (e) {
      setState(() => _error = e.toString());
    } finally {
      setState(() => _loading = false);
    }
  }

  // ── List view ───────────────────────────────────────────────────────────
  Widget _buildList() => ListView(
    padding: const EdgeInsets.all(16),
    children: [
      if (_qLoading)
        const Center(child: CircularProgressIndicator()),
      if (_error.isNotEmpty) ErrorView(message: _error),
      ..._questions.map((q) => Padding(
        padding: const EdgeInsets.only(bottom: 8),
        child: Card(
          child: Padding(
            padding: const EdgeInsets.all(12),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      MarksChip(marks: q.marks),
                      const SizedBox(height: 8),
                      Text(q.questionText,
                          style: const TextStyle(
                            fontSize: 14, fontWeight: FontWeight.w500,
                          )),
                    ],
                  ),
                ),
                const SizedBox(width: 12),
                ElevatedButton(
                  onPressed: () => _startQuestion(q),
                  style: ElevatedButton.styleFrom(
                    minimumSize: const Size(64, 36),
                    padding: const EdgeInsets.symmetric(horizontal: 12),
                    textStyle: const TextStyle(fontSize: 13),
                  ),
                  child: const Text('Answer'),
                ),
              ],
            ),
          ),
        ),
      )),
    ],
  );

  // ── Write view ──────────────────────────────────────────────────────────
  Widget _buildWrite() => ListView(
    padding: const EdgeInsets.all(16),
    children: [
      Card(
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              MarksChip(marks: _current!.marks),
              const SizedBox(height: 10),
              Text(_current!.questionText,
                  style: const TextStyle(
                    fontSize: 15, fontWeight: FontWeight.w600,
                  )),
            ],
          ),
        ),
      ),
      const SizedBox(height: 16),
      const Text('Your Answer',
          style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
      const SizedBox(height: 8),
      TextField(
        controller:  _answerCtrl,
        maxLines:    10,
        decoration:  InputDecoration(hintText: _current!.writingHint),
      ),
      const SizedBox(height: 12),
      if (_error.isNotEmpty) ...[
        ErrorView(message: _error),
        const SizedBox(height: 12),
      ],
      AppButton(
        label:     '🤖 Evaluate My Answer',
        onPressed: _submit,
        loading:   _loading,
      ),
    ],
  );

  // ── Result view ─────────────────────────────────────────────────────────
  Widget _buildResult() => ListView(
    padding: const EdgeInsets.all(16),
    children: [
      ScoreCard(result: _result!),
      const SizedBox(height: 12),

      // Strengths
      if (_result!.feedback.strengths.isNotEmpty)
        _feedbackCard('✅ Strengths', _result!.feedback.strengths,
            const Color(0xFFF0FDF4), const Color(0xFF15803D)),

      // Weaknesses
      if (_result!.feedback.weaknesses.isNotEmpty)
        _feedbackCard('⚠️ Needs Improvement', _result!.feedback.weaknesses,
            const Color(0xFFFEF2F2), const Color(0xFFB91C1C)),

      // Missing points
      if (_result!.feedback.missingPoints.isNotEmpty)
        _feedbackCard('📌 Missing Points', _result!.feedback.missingPoints,
            const Color(0xFFFFFBEB), const Color(0xFF92400E)),

      // Comments
      if (_result!.feedback.structureComment.isNotEmpty ||
          _result!.feedback.grammarComment.isNotEmpty)
        Card(
          child: Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (_result!.feedback.structureComment.isNotEmpty)
                  Text('📐 ${_result!.feedback.structureComment}',
                      style: const TextStyle(fontSize: 13)),
                if (_result!.feedback.grammarComment.isNotEmpty) ...[
                  const SizedBox(height: 4),
                  Text('✏️ ${_result!.feedback.grammarComment}',
                      style: const TextStyle(fontSize: 13)),
                ],
              ],
            ),
          ),
        ),

      // Model answer
      if (_result!.improvedAnswer.isNotEmpty) ...[
        const SizedBox(height: 8),
        Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color:        const Color(0xFFF0FDF4),
            border:       Border.all(color: const Color(0xFFBBF7D0)),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('⭐ Model Answer (Full Marks)',
                  style: TextStyle(
                    fontWeight: FontWeight.w700,
                    color:      Color(0xFF15803D),
                  )),
              const SizedBox(height: 8),
              Text(_result!.improvedAnswer,
                  style: const TextStyle(fontSize: 13, height: 1.6)),
            ],
          ),
        ),
      ],

      // Retry
      const SizedBox(height: 16),
      const Text('Rewrite your answer:',
          style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
      const SizedBox(height: 8),
      TextField(
        controller: _answerCtrl,
        maxLines:   8,
        decoration: const InputDecoration(
          hintText: 'Improve your answer using the feedback above...',
        ),
      ),
      const SizedBox(height: 12),
      if (_error.isNotEmpty) ...[
        ErrorView(message: _error),
        const SizedBox(height: 12),
      ],
      Row(
        children: [
          Expanded(
            child: AppButton(
              label:     '🔁 Re-evaluate',
              onPressed: _retry,
              loading:   _loading,
            ),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: AppButton(
              label:    'Try Another',
              outlined: true,
              onPressed: () => setState(() {
                _view    = 'list';
                _result  = null;
                _current = null;
                _error   = '';
              }),
            ),
          ),
        ],
      ),
    ],
  );

  Widget _feedbackCard(String title, List<String> items, Color bg, Color fg) =>
      Padding(
        padding: const EdgeInsets.only(bottom: 8),
        child: Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color:        bg,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title,
                  style: TextStyle(
                    fontWeight: FontWeight.w700,
                    color:      fg,
                    fontSize:   13,
                  )),
              const SizedBox(height: 6),
              ...items.map((i) => Padding(
                padding: const EdgeInsets.only(bottom: 3),
                child: Text('• $i',
                    style: TextStyle(fontSize: 13, color: fg)),
              )),
            ],
          ),
        ),
      );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(_view == 'list'
            ? 'Practice'
            : _view == 'write'
                ? 'Write Answer'
                : 'Your Results'),
        leading: _view != 'list'
            ? IconButton(
                icon:      const Icon(Icons.arrow_back),
                onPressed: () => setState(() {
                  _view   = _view == 'result' ? 'write' : 'list';
                  _error  = '';
                }),
              )
            : null,
      ),
      body: switch (_view) {
        'write'  => _buildWrite(),
        'result' => _buildResult(),
        _        => _buildList(),
      },
    );
  }
}
```

---

### FILE: frontend/app/lib/screens/progress_screen.dart

```dart
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
                    style: const TextStyle(color: AppTheme.error)))
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
                                  style: const TextStyle(
                                    color: AppTheme.brand,
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
                              backgroundColor: const Color(0xFFE5E7EB),
                              color:           AppTheme.brand,
                            ),
                          ),
                        ]),
                      ),
                    ),

                    if (_data!['total_attempts'] == 0) ...[
                      const SizedBox(height: 40),
                      const Center(
                        child: Column(children: [
                          Text('📝', style: TextStyle(fontSize: 48)),
                          SizedBox(height: 8),
                          Text('No attempts yet.',
                              style: TextStyle(color: AppTheme.textSecondary)),
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
            style: const TextStyle(
              fontSize:   28,
              fontWeight: FontWeight.w800,
              color:      AppTheme.brand,
            )),
        const SizedBox(height: 4),
        Text(label,
            style: const TextStyle(
              fontSize: 12,
              color:    AppTheme.textSecondary,
            )),
      ]),
    ),
  );
}
```

---

### FILE: frontend/app/lib/router.dart

```dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'services/auth_service.dart';
import 'screens/login_screen.dart';
import 'screens/home_screen.dart';
import 'screens/learn_screen.dart';
import 'screens/practice_screen.dart';
import 'screens/progress_screen.dart';

final router = GoRouter(
  initialLocation: '/',
  redirect: (context, state) async {
    final loggedIn = await AuthService().isLoggedIn();
    final onLogin  = state.matchedLocation == '/login';
    if (!loggedIn && !onLogin) return '/login';
    if (loggedIn && onLogin)  return '/';
    return null;
  },
  routes: [
    GoRoute(path: '/login',    builder: (_, __) => const LoginScreen()),
    GoRoute(path: '/',         builder: (_, __) => const HomeScreen()),
    GoRoute(
      path:    '/learn/:chapterId',
      builder: (_, state) => LearnScreen(
        chapterId: state.pathParameters['chapterId']!,
      ),
    ),
    GoRoute(
      path:    '/practice/:chapterId',
      builder: (_, state) => PracticeScreen(
        chapterId: state.pathParameters['chapterId']!,
      ),
    ),
    GoRoute(path: '/progress', builder: (_, __) => const ProgressScreen()),
  ],
  errorBuilder: (_, state) => Scaffold(
    body: Center(child: Text('Page not found: ${state.error}')),
  ),
);
```

---

### FILE: frontend/app/lib/main.dart

```dart
import 'package:flutter/material.dart';
import 'config/theme.dart';
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
```

---

## Step 6: Update CLAUDE.md phase log

Open CLAUDE.md and replace the Phase Log section with:

```markdown
## Phase Log (Update This at the Start of Every Phase)
- Phase 0: Project scaffold ✓
- Phase 1: Database schema, RLS, seed data ✓
- Phase 2: Content pipeline — PDF → JSON → ChromaDB ✓
- Phase 3: Backend API skeleton — routes, models, auth, rate limiting ✓
- Phase 4: Learning module — Ollama, ChromaDB retrieval, explain endpoint ✓
- Phase 5: Evaluation module — rubric scoring, feedback, improved answer ✓
- Phase 6: React web frontend — learn, practice, evaluate, progress UI ✓
- Phase 7: Flutter mobile app — Android/iOS, same API ← current
```

---

## Step 7: Update auth_service.dart with your credentials

Open frontend/app/lib/services/auth_service.dart and replace:
```
const _supabaseUrl  = 'YOUR_SUPABASE_URL';
const _supabaseAnon = 'YOUR_SUPABASE_ANON_KEY';
```
With your real values from Supabase dashboard → Project Settings → API.

---

## Step 8: Commit to git

```bash
git add .
git commit -m "Phase 7: Flutter mobile app — Android/iOS, login, learn, practice, evaluate"
```

---

## Step 9: Run on Android emulator

```bash
cd frontend/app

# Get dependencies
flutter pub get

# Check connected devices
flutter devices

# Run on emulator (API URL is already set to 10.0.2.2 for Android emulator)
flutter run
```

For a physical device on the same WiFi:
1. Open lib/config/app_config.dart
2. Change apiBaseUrl to your machine's LAN IP: http://192.168.x.x:8000
3. Enable USB debugging on your phone
4. Run: flutter run

---

## Step 10: Print completion summary

```
✓ frontend/app/pubspec.yaml                          — dependencies
✓ frontend/app/lib/main.dart                         — app entry point
✓ frontend/app/lib/router.dart                       — go_router navigation
✓ frontend/app/lib/config/app_config.dart            — API URL config
✓ frontend/app/lib/config/theme.dart                 — app theme
✓ frontend/app/lib/models/syllabus_model.dart        — Subject, Chapter, Topic, Question
✓ frontend/app/lib/models/learning_model.dart        — ExplainResponse
✓ frontend/app/lib/models/evaluation_model.dart      — EvaluationResponse, FeedbackDetail
✓ frontend/app/lib/services/api_service.dart         — HTTP client
✓ frontend/app/lib/services/auth_service.dart        — Supabase auth
✓ frontend/app/lib/services/syllabus_service.dart    — syllabus API
✓ frontend/app/lib/services/learning_service.dart    — learning API
✓ frontend/app/lib/services/evaluation_service.dart  — evaluation API
✓ frontend/app/lib/widgets/app_button.dart
✓ frontend/app/lib/widgets/marks_chip.dart
✓ frontend/app/lib/widgets/score_card.dart
✓ frontend/app/lib/widgets/error_view.dart
✓ frontend/app/lib/screens/login_screen.dart
✓ frontend/app/lib/screens/home_screen.dart
✓ frontend/app/lib/screens/learn_screen.dart
✓ frontend/app/lib/screens/practice_screen.dart
✓ frontend/app/lib/screens/progress_screen.dart
✓ CLAUDE.md updated
✓ Git committed

ACTION REQUIRED:
1. Replace Supabase credentials in auth_service.dart
2. Run: flutter pub get
3. Run: flutter run
4. Test full flow: login → learn → practice → evaluate → retry

Phase 7 complete.
Next: Phase 8 — Admin Panel (content validation, question management, human review)
```
