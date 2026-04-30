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
