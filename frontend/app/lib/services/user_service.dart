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
}
