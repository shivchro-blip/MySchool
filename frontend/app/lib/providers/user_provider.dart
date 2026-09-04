import 'package:flutter/material.dart';
import '../config/app_config.dart';
import '../models/user_model.dart';
import '../services/api_service.dart';
import '../services/auth_service.dart';
import '../services/user_preferences_service.dart';
import '../services/user_service.dart';

class UserProvider extends ChangeNotifier {
  final UserService _svc;
  UserProvider([UserService? svc]) : _svc = svc ?? UserService() {
    AuthService.sessionGeneration.addListener(_onSessionGenerationChanged);
  }

  // Fires on every clearLocalSession() — explicit logout OR a 401
  // SESSION_INVALIDATED eviction. Without this, a stale in-memory profile
  // from a previous sign-in on this device would survive an eviction that
  // didn't happen to go through UserProvider.load() itself, and the next
  // sibling to log in would see it via loadIfNeeded()'s _loaded guard.
  void _onSessionGenerationChanged() {
    _profile = null;
    _loaded = false;
    _error = null;
    _sessionInvalidated = false;
    notifyListeners();
  }

  @override
  void dispose() {
    AuthService.sessionGeneration.removeListener(_onSessionGenerationChanged);
    super.dispose();
  }

  UserProfile? _profile;
  bool _loading = false;
  bool _loaded = false;
  String? _error;
  bool _sessionInvalidated = false;

  UserProfile? get profile => _profile;
  bool get loading => _loading;
  bool get loaded => _loaded;
  String? get error => _error;

  // True when the last load failed with 401 SESSION_INVALIDATED — the account
  // was signed in from another device. Screens use this to send the user back
  // to /login rather than offering a retry that cannot succeed.
  bool get sessionInvalidated => _sessionInvalidated;

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
    _sessionInvalidated = false;
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
      // Kept as a rendered message, not just a debugPrint — subject_list_screen
      // and courses_screen surface this instead of showing a blank list.
      _sessionInvalidated = e is ApiException && e.sessionInvalidated;
      _error = e.toString().replaceFirst('Exception: ', '');
      _profile = null;
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
    _sessionInvalidated = false;
    notifyListeners();
  }

  // Seeds the profile from POST /users/session/claim's response, skipping
  // the follow-up GET /users/me on the login critical path. Callers must
  // only invoke this with a non-null profile — a null claim.profile means
  // fall back to load()/loadIfNeeded() instead.
  void seed(UserProfile profile) {
    _profile = profile;
    _loaded = true;
    _loading = false;
    _error = null;
    _sessionInvalidated = false;
    notifyListeners();
  }
}
