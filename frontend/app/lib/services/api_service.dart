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

  final _timeout = const Duration(seconds: AppConfig.requestTimeoutSeconds);

  Future<Map<String, String>> _headers({bool auth = true}) async {
    final headers = {'Content-Type': 'application/json'};
    if (auth) {
      final token = await AuthService().getToken();
      if (token != null) {
        headers['Authorization'] = 'Bearer $token';
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
      if (res.body.isEmpty) {
        return null;
      }
      return jsonDecode(res.body);
    }
    if (res.statusCode == 401) {
      AuthService().logout();
      throw ApiException('Session expired. Please log in again.', statusCode: 401);
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
