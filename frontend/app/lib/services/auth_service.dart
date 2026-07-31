import 'dart:convert';
import 'package:url_launcher/url_launcher.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import '../config/app_config.dart';

String get _supabaseUrl  => AppConfig.supabaseUrl;
String get _supabaseAnon => AppConfig.supabaseAnonKey;

String _authError(Map<String, dynamic> data, String fallback) {
  final candidates = [
    data['error_description'],
    data['msg'],
    data['message'],
    data['error'],
    data['detail'],
  ];
  for (final value in candidates) {
    if (value is String && value.trim().isNotEmpty) return value;
  }
  return fallback;
}

class AuthService {
  static final AuthService _instance = AuthService._();
  factory AuthService() => _instance;
  AuthService._();

  static const _storage = FlutterSecureStorage();
  static const _tokenKey = 'exam_coach_token';
  // Single-session slot token. Separate key — never overwrites _tokenKey.
  // Mirrors the web app's 'exam_coach_session' localStorage key.
  static const _sessionKey = 'exam_coach_session';

  // ── Single-session enforcement ─────────────────────────────────────────────
  //
  // After every successful Supabase login the client must claim the single
  // active session slot. The backend deletes any previous session row (kicking
  // other devices) and returns a one-time raw token, sent on every API call as
  // X-Session-Token (attached in ApiService._headers).
  //
  // Mirrors frontend/web/src/api/auth.js claimSession/releaseSession.

  Future<void> claimSession() async {
    final token = await getToken();
    if (token == null || token.isEmpty) return;
    final res = await http.post(
      Uri.parse('${AppConfig.apiBaseUrl}/users/session/claim'),
      headers: {'Authorization': 'Bearer $token'},
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw Exception('Could not start session');
    }
    final data = res.body.isNotEmpty
        ? jsonDecode(res.body) as Map<String, dynamic>
        : <String, dynamic>{};
    final sessionToken = data['session_token'] as String?;
    if (sessionToken != null && sessionToken.isNotEmpty) {
      await _storage.write(key: _sessionKey, value: sessionToken);
    }
  }

  // Server-side row delete. Local state is cleared by the caller regardless of
  // whether this request lands.
  Future<void> _releaseSession() async {
    final token = await getToken();
    final sessionToken = await getSessionToken();
    if (token == null || token.isEmpty) return;
    if (sessionToken == null || sessionToken.isEmpty) return;
    try {
      await http.delete(
        Uri.parse('${AppConfig.apiBaseUrl}/users/session'),
        headers: {'Authorization': 'Bearer $token'},
      );
    } catch (_) {
      // Best effort — logout must not block on an unreachable backend.
    }
  }

  Future<String?> getSessionToken() async {
    return _storage.read(key: _sessionKey);
  }

  Future<Map<String, dynamic>> loginWithEmail(String email, String password) async {
    final res = await http.post(
      Uri.parse('$_supabaseUrl/auth/v1/token?grant_type=password'),
      headers: {
        'Content-Type': 'application/json',
        'apikey': _supabaseAnon,
      },
      body: jsonEncode({'email': email, 'password': password}),
    );
    if (res.statusCode != 200) {
      final data = res.body.isNotEmpty
          ? jsonDecode(res.body) as Map<String, dynamic>
          : <String, dynamic>{};
      throw Exception(_authError(data, 'Login failed'));
    }
    final data = jsonDecode(res.body) as Map<String, dynamic>;
    final token = data['access_token'] as String?;
    if (token != null && token.isNotEmpty) {
      await _storage.write(key: _tokenKey, value: token);
      // Must complete before any authenticated call — every protected backend
      // route requires X-Session-Token and 401s without it.
      await claimSession();
    }
    return data;
  }

  Future<Map<String, dynamic>> signupWithEmail(String email, String password) async {
    final res = await http.post(
      Uri.parse('$_supabaseUrl/auth/v1/signup'),
      headers: {
        'Content-Type': 'application/json',
        'apikey': _supabaseAnon,
      },
      body: jsonEncode({'email': email, 'password': password}),
    );
    if (res.statusCode != 200 && res.statusCode != 201) {
      final data = res.body.isNotEmpty
          ? jsonDecode(res.body) as Map<String, dynamic>
          : <String, dynamic>{};
      throw Exception(_authError(data, 'Signup failed'));
    }
    final data = jsonDecode(res.body) as Map<String, dynamic>;
    final token = data['access_token'] as String?;
    final session = data['session'];
    final sessionToken = session is Map ? session['access_token'] as String? : null;
    final effectiveToken = token ?? sessionToken;
    if (effectiveToken != null && effectiveToken.isNotEmpty) {
      await _storage.write(key: _tokenKey, value: effectiveToken);
      await claimSession();
    }
    return data;
  }

  Future<void> resendConfirmationEmail(String email) async {
    final res = await http.post(
      Uri.parse('$_supabaseUrl/auth/v1/resend'),
      headers: {
        'Content-Type': 'application/json',
        'apikey': _supabaseAnon,
      },
      body: jsonEncode({'email': email, 'type': 'signup'}),
    );
    if (res.statusCode != 200 && res.statusCode != 201) {
      final data = res.body.isNotEmpty
          ? jsonDecode(res.body) as Map<String, dynamic>
          : <String, dynamic>{};
      throw Exception(_authError(data, 'Could not resend confirmation email'));
    }
  }

  @Deprecated('Use UserService.updateProfile(ageConfirmation: ...) instead')
  Future<void> createUserProfile(String? userId, String ageConfirmation) async {
    if (userId == null) return;
    final token = await getToken();
    final now   = DateTime.now().toUtc().toIso8601String();
    final res   = await http.post(
      Uri.parse('$_supabaseUrl/rest/v1/users'),
      headers: {
        'Content-Type': 'application/json',
        'apikey': _supabaseAnon,
        'Authorization': 'Bearer $token',
        'Prefer': 'return=minimal',
      },
      body: jsonEncode({
        'id':                  userId,
        'age_confirmation':    ageConfirmation,
        'terms_accepted_at':   now,
        'privacy_accepted_at': now,
      }),
    );
    if (res.statusCode != 200 && res.statusCode != 201 &&
        res.statusCode != 204 && res.statusCode != 409) {
      throw Exception('Profile creation failed');
    }
  }

  Future<void> logout() async {
    await _releaseSession();
    await clearLocalSession();
  }

  // Drops local auth state without calling the backend. Used when the server
  // has already invalidated the session (401 SESSION_INVALIDATED) — releasing
  // it again would be a no-op against a row that no longer belongs to us.
  Future<void> clearLocalSession() async {
    await _storage.delete(key: _tokenKey);
    await _storage.delete(key: _sessionKey);
  }

  Future<String?> getToken() async {
    return _storage.read(key: _tokenKey);
  }

  Future<bool> isLoggedIn() async {
    final token = await getToken();
    if (token == null || token.isEmpty) return false;
    try {
      final parts  = token.split('.');
      if (parts.length < 2) return false;
      final padded  = parts[1].padRight((parts[1].length + 3) ~/ 4 * 4, '=');
      final payload = jsonDecode(
        utf8.decode(base64Decode(padded.replaceAll('-', '+').replaceAll('_', '/'))),
      ) as Map<String, dynamic>;
      final exp = payload['exp'];
      if (exp is! num) return false;
      return exp > DateTime.now().millisecondsSinceEpoch / 1000;
    } catch (_) {
      return false;
    }
  }

  // ── Google OAuth ─────────────────────────────────────────────────────────────
  //
  // SETUP REQUIRED (one-time, in Supabase Dashboard):
  //   1. Authentication → Providers → Google
  //      Enter Client ID and Client Secret from Google Cloud Console.
  //      Supabase's authorized redirect URI:
  //        https://<your-project>.supabase.co/auth/v1/callback
  //
  //   2. Authentication → URL Configuration → Redirect URLs
  //      Add your Flutter web app's callback URL:
  //        http://localhost:<port>/auth/callback    (dev)
  //        https://<your-domain>/auth/callback      (production)
  //
  // NOTE: Supabase creates a separate auth.users row per provider by default.
  // If the same email exists for email/password, signing in with Google creates
  // a second identity rather than linking. Enable "Link accounts with the same
  // email" in Supabase Dashboard → Authentication → Settings to auto-link.
  //
  // This method redirects the browser to Supabase Google OAuth. After auth,
  // Supabase redirects to /auth/callback with tokens in the URL hash.
  // AuthCallbackScreen parses those tokens.
  Future<void> signInWithGoogle() async {
    const redirectTo = 'net.yadhum.app://auth/callback';
    final oauthUrl =
        '$_supabaseUrl/auth/v1/authorize'
        '?provider=google'
        '&redirect_to=${Uri.encodeComponent(redirectTo)}';
    final uri = Uri.parse(oauthUrl);
    if (!await launchUrl(uri, mode: LaunchMode.externalApplication)) {
      throw Exception('Could not open sign-in page');
    }
  }

  // Store a token received from an external source (e.g. OAuth callback).
  Future<void> storeToken(String token) async {
    await _storage.write(key: _tokenKey, value: token);
  }

  // Decode the `sub` (user ID) from a Supabase JWT.
  String? extractUserIdFromToken(String token) {
    try {
      final parts   = token.split('.');
      if (parts.length < 2) return null;
      final padded  = parts[1].padRight(
        (parts[1].length + 3) ~/ 4 * 4, '=',
      );
      final payload = jsonDecode(
        utf8.decode(base64Decode(padded.replaceAll('-', '+').replaceAll('_', '/'))),
      ) as Map<String, dynamic>;
      return payload['sub'] as String?;
    } catch (_) {
      return null;
    }
  }
}
