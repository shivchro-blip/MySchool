class UserProfile {
  final String       id;
  final String?      fullName;
  final String?      classLevel;
  final List<String> subjects;
  final bool         onboardingCompleted;
  final String?      school;
  final String       plan;
  final int          dailyAiCalls;

  const UserProfile({
    required this.id,
    this.fullName,
    this.classLevel,
    this.subjects = const [],
    this.onboardingCompleted = false,
    this.school,
    required this.plan,
    required this.dailyAiCalls,
  });

  factory UserProfile.fromJson(Map<String, dynamic> json) => UserProfile(
    id:                  json['id'] as String,
    fullName:            json['full_name'] as String?,
    classLevel:          json['class_level'] as String?,
    subjects:            (json['subjects'] as List<dynamic>?)
                             ?.map((e) => e.toString())
                             .toList()
                         ?? [],
    onboardingCompleted: json['onboarding_completed'] as bool? ?? false,
    school:              json['school'] as String?,
    plan:                json['plan'] as String? ?? 'free',
    dailyAiCalls:        json['daily_ai_calls'] as int? ?? 0,
  );

  String get displayName => fullName?.isNotEmpty == true ? fullName! : 'Student';
}

// POST /users/session/claim response. `profile` is the same payload GET
// /users/me returns — present on current backends, absent (null) on an
// older backend or any partial failure. Never throws: a malformed or
// missing `profile` sub-object degrades to null rather than blocking login.
class ClaimResponse {
  final String?      sessionToken;
  final UserProfile? profile;

  const ClaimResponse({this.sessionToken, this.profile});

  factory ClaimResponse.fromJson(Map<String, dynamic> json) {
    UserProfile? profile;
    final profileJson = json['profile'];
    if (profileJson is Map<String, dynamic>) {
      try {
        profile = UserProfile.fromJson(profileJson);
      } catch (_) {
        profile = null;
      }
    }
    return ClaimResponse(
      sessionToken: json['session_token'] as String?,
      profile: profile,
    );
  }
}

class UsageStats {
  final int    dailyAiCalls;
  final int    dailyLimit;
  final int    callsRemaining;
  final String plan;

  const UsageStats({
    required this.dailyAiCalls,
    required this.dailyLimit,
    required this.callsRemaining,
    required this.plan,
  });

  factory UsageStats.fromJson(Map<String, dynamic> json) => UsageStats(
    dailyAiCalls:   json['daily_ai_calls'] as int? ?? 0,
    dailyLimit:     json['daily_limit'] as int? ?? 20,
    callsRemaining: json['calls_remaining'] as int? ?? 20,
    plan:           json['plan'] as String? ?? 'free',
  );
}
