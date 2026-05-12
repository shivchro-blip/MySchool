import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

const _supabaseUrl  = 'https://txszimvmoigkvhqermow.supabase.co';
const _supabaseAnon = 'sb_publishable_RpGIQ7y547VGbYODMPUUpQ_yLA8LaY4';

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
