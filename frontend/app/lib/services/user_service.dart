import 'dart:async';
import '../models/user_model.dart';
import 'api_service.dart';

class UserService {
  final _api = ApiService();

  // Single path: the backend, authenticated with Bearer + X-Session-Token.
  // There is deliberately no direct-to-Supabase fallback — it bypassed
  // single-session enforcement and masked real auth failures as blank state.
  Future<UserProfile> getProfile() async {
    try {
      final data =
          await _api.get('/users/me').timeout(const Duration(seconds: 8));
      return UserProfile.fromJson(data as Map<String, dynamic>);
    } on TimeoutException {
      throw ApiException('Could not reach the server. Check your connection.');
    }
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
