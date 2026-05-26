import 'dart:async';
import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import '../config/app_config.dart';
import '../models/user_model.dart';
import 'api_service.dart';
import 'auth_service.dart';

class UserService {
  final _api = ApiService();

  Future<UserProfile> getProfile() async {
    try {
      final data =
          await _api.get('/users/me').timeout(const Duration(seconds: 8));
      return UserProfile.fromJson(data as Map<String, dynamic>);
    } catch (backendError) {
      assert(() {
        // Mirrors web's tolerant getCachedProfile behavior while still trying
        // Supabase directly so mobile can resolve the same account profile.
        debugPrint(
            'Backend profile load failed, trying Supabase REST: $backendError');
        return true;
      }());
      return _getProfileFromSupabase();
    }
  }

  Future<UserProfile> _getProfileFromSupabase() async {
    final auth = AuthService();
    final token = await auth.getToken();
    if (token == null || token.isEmpty) {
      throw ApiException('No auth token found for profile lookup');
    }

    final userId = auth.extractUserIdFromToken(token);
    if (userId == null || userId.isEmpty) {
      throw ApiException('Could not identify current user');
    }
    if (AppConfig.supabaseUrl.isEmpty || AppConfig.supabaseAnonKey.isEmpty) {
      throw ApiException('Supabase is not configured');
    }

    final uri = Uri.parse('${AppConfig.supabaseUrl}/rest/v1/users').replace(
      queryParameters: {
        'select': '*',
        'id': 'eq.$userId',
      },
    );
    final res = await http.get(
      uri,
      headers: {
        'apikey': AppConfig.supabaseAnonKey,
        'Authorization': 'Bearer $token',
        'Accept': 'application/json',
      },
    ).timeout(const Duration(seconds: 8));

    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw ApiException(
        'Supabase profile lookup failed (${res.statusCode})',
        statusCode: res.statusCode,
      );
    }

    final rows = jsonDecode(res.body);
    if (rows is! List || rows.isEmpty || rows.first is! Map<String, dynamic>) {
      throw ApiException('User profile not found');
    }
    return UserProfile.fromJson(rows.first as Map<String, dynamic>);
  }

  Future<UsageStats> getUsageStats() async {
    final data = await _api.get('/users/me/usage');
    return UsageStats.fromJson(data as Map<String, dynamic>);
  }

  Future<UserProfile> updateProfile({
    String? classLevel,
    List<String>? subjects,
    bool? onboardingCompleted,
    String? ageConfirmation,
  }) async {
    final body = <String, dynamic>{};
    if (classLevel != null) body['class_level'] = classLevel;
    if (subjects != null) body['subjects'] = subjects;
    if (onboardingCompleted != null) {
      body['onboarding_completed'] = onboardingCompleted;
    }
    if (ageConfirmation != null) body['age_confirmation'] = ageConfirmation;
    final data = await _api.put('/users/me', body);
    return UserProfile.fromJson(data as Map<String, dynamic>);
  }
}
