import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/app_config.dart';
import '../services/auth_service.dart';

class ApiException implements Exception {
  final String message;
  final int?   statusCode;
  // True only for the backend's single-session invalidation contract:
  // 401 with body {"detail": "SESSION_INVALIDATED", ...}. A generic 401
  // (expired or absent JWT) leaves this false.
  final bool   sessionInvalidated;
  ApiException(
    this.message, {
    this.statusCode,
    this.sessionInvalidated = false,
  });
  @override
  String toString() => message;
}

class ApiService {
  static final ApiService _instance = ApiService._();
  factory ApiService() => _instance;
  ApiService._();

  final _timeout = const Duration(seconds: AppConfig.requestTimeoutSeconds);

  Future<Map<String, String>> _headers({bool auth = true}) async {
    final headers = {'Content-Type': 'application/json'};
    if (auth) {
      final authService = AuthService();
      final token = await authService.getToken();
      if (token != null) {
        headers['Authorization'] = 'Bearer $token';
      }
      // Every protected backend route depends on verify_session, which 401s
      // when this header is missing. Mirrors web's api/client.js.
      final sessionToken = await authService.getSessionToken();
      if (sessionToken != null && sessionToken.isNotEmpty) {
        headers['X-Session-Token'] = sessionToken;
      }
    }
    return headers;
  }

  Uri _url(String path) => Uri.parse('${AppConfig.apiBaseUrl}$path');

  Future<dynamic> get(String path, {bool auth = true}) async {
    try {
      final res = await http
          .get(_url(path), headers: await _headers(auth: auth))
          .timeout(_timeout);
      return await _handle(res);
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
      return await _handle(res);
    } on ApiException {
      rethrow;
    } catch (e) {
      throw ApiException('Network error. Check your connection.');
    }
  }

  Future<dynamic> put(
    String path,
    Map<String, dynamic> body, {
    bool auth = true,
  }) async {
    try {
      final res = await http
          .put(
            _url(path),
            headers: await _headers(auth: auth),
            body: jsonEncode(body),
          )
          .timeout(_timeout);
      return await _handle(res);
    } on ApiException {
      rethrow;
    } catch (e) {
      throw ApiException('Network error. Check your connection.');
    }
  }

  Future<dynamic> _handle(http.Response res) async {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (res.body.isEmpty) {
        return null;
      }
      return jsonDecode(res.body);
    }
    if (res.statusCode == 401) {
      // Two distinct cases share this status code:
      //   {"detail": "SESSION_INVALIDATED"} — the server dropped our session
      //     row (signed in elsewhere). Local state is now worthless: clear it.
      //   anything else — expired/absent JWT, or a transient auth failure.
      //     Surface the error but keep local state; the router's exp check
      //     already redirects genuinely-expired tokens to /login.
      String? detail;
      if (res.body.isNotEmpty) {
        try {
          final err = jsonDecode(res.body);
          if (err is Map<String, dynamic>) detail = err['detail'] as String?;
        } on FormatException {
          // body is not JSON — treat as a generic 401
        }
      }
      final invalidated = detail == 'SESSION_INVALIDATED';
      if (invalidated) {
        // Awaited, not fire-and-forget: callers react to the throw below by
        // navigating, and the router's guard reads storage on the way.
        await AuthService().clearLocalSession();
      }
      throw ApiException(
        invalidated
            ? 'You were signed out because your account was accessed from another location.'
            : 'Session expired. Please log in again.',
        statusCode: 401,
        sessionInvalidated: invalidated,
      );
    }
    if (res.body.isNotEmpty) {
      try {
        final err = jsonDecode(res.body) as Map<String, dynamic>;
        throw ApiException(
          err['error'] as String? ?? err['detail'] as String? ?? 'Request failed',
          statusCode: res.statusCode,
        );
      } on FormatException {
        // body is not JSON — fall through to generic error
      }
    }
    throw ApiException('Server error (${res.statusCode})', statusCode: res.statusCode);
  }
}
