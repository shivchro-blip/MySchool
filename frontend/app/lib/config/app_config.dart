// API_BASE_URL targets:
//   Web / Windows desktop : http://localhost:8000/api/v1  (default)
//   Android emulator      : http://10.0.2.2:8000/api/v1
//   Physical device (LAN) : http://192.168.x.x:8000/api/v1
//   Production            : https://your-domain.com/api/v1

class AppConfig {
  static const String apiBaseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'http://localhost:8000/api/v1',
  );

  static const String supabaseUrl = String.fromEnvironment(
    'SUPABASE_URL',
    defaultValue: '',
  );

  static const String supabaseAnonKey = String.fromEnvironment(
    'SUPABASE_ANON_KEY',
    defaultValue: '',
  );

  static const String appName = 'AI Exam Coach';
  static const int freeAiCallsPerDay = 20;
  static const int requestTimeoutSeconds = 90;

  static void assertConfigured() {
    assert(supabaseUrl.isNotEmpty,
        'SUPABASE_URL must be set via --dart-define=SUPABASE_URL=...');
    assert(supabaseAnonKey.isNotEmpty,
        'SUPABASE_ANON_KEY must be set via --dart-define=SUPABASE_ANON_KEY=...');
  }
}
