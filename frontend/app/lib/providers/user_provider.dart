import 'package:flutter/material.dart';
import '../models/user_model.dart';
import '../services/user_preferences_service.dart';
import '../services/user_service.dart';

class UserProvider extends ChangeNotifier {
  final UserService _svc;
  UserProvider([UserService? svc]) : _svc = svc ?? UserService();

  UserProfile? _profile;
  bool         _loading = false;
  String?      _error;

  UserProfile? get profile  => _profile;
  bool         get loading  => _loading;
  String?      get error    => _error;

  bool         get onboardingCompleted => _profile?.onboardingCompleted ?? false;
  String?      get allowedClass        => _profile?.classLevel;
  List<String> get allowedSubjects     => _profile?.subjects ?? const [];

  Future<void> loadIfNeeded() async {
    if (_profile != null) return;
    await load();
  }

  Future<void> load() async {
    _loading = true;
    _error   = null;
    notifyListeners();
    try {
      _profile = await _svc.getProfile();
      // Sync onboarding status to SharedPreferences for fast router redirect checks.
      await UserPreferencesService.setOnboardingCompleted(_profile!.onboardingCompleted);
    } catch (e) {
      _error = e.toString();
    }
    _loading = false;
    notifyListeners();
  }

  void clear() {
    _profile = null;
    _error   = null;
    notifyListeners();
  }
}
