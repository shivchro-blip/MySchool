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
