// API_BASE_URL targets:
//   Production / shared web backend : https://api.yadhum.net/api/v1 (default)
//   Local web / Windows desktop     : http://localhost:8000/api/v1
//   Android emulator      : http://10.0.2.2:8000/api/v1
//   Physical device (LAN) : http://192.168.x.x:8000/api/v1
// Override with --dart-define=API_BASE_URL=... for local development.

class AppConfig {
  static const String apiBaseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'https://api.yadhum.net/api/v1',
  );

  static const String supabaseUrl = String.fromEnvironment(
    'SUPABASE_URL',
    defaultValue: '',
  );

  static const String supabaseAnonKey = String.fromEnvironment(
    'SUPABASE_ANON_KEY',
    defaultValue: '',
  );

  static const int freeAiCallsPerDay = 20;
  static const int requestTimeoutSeconds = 90;

  static void assertConfigured() {
    assert(supabaseUrl.isNotEmpty,
        'SUPABASE_URL must be set via --dart-define=SUPABASE_URL=...');
    assert(supabaseAnonKey.isNotEmpty,
        'SUPABASE_ANON_KEY must be set via --dart-define=SUPABASE_ANON_KEY=...');
    // The web app's config uses the shorter '/api' convention; this app
    // expects the full versioned path. Throws (not assert) so it also
    // fires in release builds.
    if (!apiBaseUrl.endsWith('/v1')) {
      throw StateError('API_BASE_URL must include /v1 — got: $apiBaseUrl. '
          'Example: https://api.yadhum.net/api/v1');
    }
  }
}
