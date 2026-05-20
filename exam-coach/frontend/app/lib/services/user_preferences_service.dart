import 'package:shared_preferences/shared_preferences.dart';

class UserPreferencesService {
  static const _kCompleted = 'onboarding_completed';
  static const _kStep      = 'onboarding_step';
  static const _kClass     = 'onboarding_class_level';

  // Returns null if key was never written (unknown state — don't block routing).
  static Future<bool?> getOnboardingCompleted() async {
    final prefs = await SharedPreferences.getInstance();
    if (!prefs.containsKey(_kCompleted)) return null;
    return prefs.getBool(_kCompleted);
  }

  static Future<void> setOnboardingCompleted(bool value) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(_kCompleted, value);
    if (value) {
      await prefs.remove(_kStep);
      await prefs.remove(_kClass);
    }
  }

  // 0 = not started (show intro), 1 = at class selection, 2 = at subject selection
  static Future<int> getOnboardingStep() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getInt(_kStep) ?? 0;
  }

  static Future<void> setOnboardingStep(int step) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt(_kStep, step);
  }

  static Future<String?> getOnboardingClass() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_kClass);
  }

  static Future<void> setOnboardingClass(String classLevel) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_kClass, classLevel);
  }

  // Full reset — called on logout so next login starts from a clean slate.
  static Future<void> clearAll() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_kCompleted);
    await prefs.remove(_kStep);
    await prefs.remove(_kClass);
  }
}
