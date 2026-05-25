import '../models/user_model.dart';
import 'api_service.dart';

class UserService {
  final _api = ApiService();

  Future<UserProfile> getProfile() async {
    final data = await _api.get('/users/me');
    return UserProfile.fromJson(data as Map<String, dynamic>);
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
    if (classLevel          != null) body['class_level']         = classLevel;
    if (subjects            != null) body['subjects']             = subjects;
    if (onboardingCompleted != null) body['onboarding_completed'] = onboardingCompleted;
    if (ageConfirmation     != null) body['age_confirmation']     = ageConfirmation;
    final data = await _api.put('/users/me', body);
    return UserProfile.fromJson(data as Map<String, dynamic>);
  }
}
