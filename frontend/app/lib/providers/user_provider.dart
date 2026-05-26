import 'package:flutter/material.dart';
import '../config/app_config.dart';
import '../models/user_model.dart';
import '../services/user_preferences_service.dart';
import '../services/user_service.dart';

class UserProvider extends ChangeNotifier {
  final UserService _svc;
  UserProvider([UserService? svc]) : _svc = svc ?? UserService();

  UserProfile? _profile;
  bool _loading = false;
  bool _loaded = false;
  String? _error;

  UserProfile? get profile => _profile;
  bool get loading => _loading;
  bool get loaded => _loaded;
  String? get error => _error;

  bool get onboardingCompleted => _profile?.onboardingCompleted ?? false;
  String? get allowedClass => _profile?.classLevel;
  List<String> get allowedSubjects => _profile?.subjects ?? const [];

  Future<void> loadIfNeeded() async {
    if (_loaded) return;
    await load();
  }

  Future<void> load() async {
    _loading = true;
    _error = null;
    notifyListeners();
    try {
      assert(() {
        debugPrint(
            'Loading user profile from API_BASE_URL=${AppConfig.apiBaseUrl}');
        return true;
      }());
      _profile = await _svc.getProfile();
      assert(() {
        debugPrint(
          'Loaded user profile: classLevel=${_profile?.classLevel}, '
          'subjects=${_profile?.subjects.join(',')}',
        );
        return true;
      }());
      // Sync onboarding status to SharedPreferences for fast router redirect checks.
      await UserPreferencesService.setOnboardingCompleted(
          _profile!.onboardingCompleted);
    } catch (e) {
      _error = e.toString();
      assert(() {
        debugPrint('User profile load failed: $_error');
        return true;
      }());
    }
    _loaded = true;
    _loading = false;
    notifyListeners();
  }

  void clear() {
    _profile = null;
    _loaded = false;
    _error = null;
    notifyListeners();
  }
}
