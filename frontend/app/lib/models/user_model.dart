class UserProfile {
  final String  id;
  final String? fullName;
  final String? classLevel;
  final String? school;
  final String  plan;
  final int     dailyAiCalls;

  const UserProfile({
    required this.id,
    this.fullName,
    this.classLevel,
    this.school,
    required this.plan,
    required this.dailyAiCalls,
  });

  factory UserProfile.fromJson(Map<String, dynamic> json) => UserProfile(
    id:           json['id'] as String,
    fullName:     json['full_name'] as String?,
    classLevel:   json['class_level'] as String?,
    school:       json['school'] as String?,
    plan:         json['plan'] as String? ?? 'free',
    dailyAiCalls: json['daily_ai_calls'] as int? ?? 0,
  );

  String get displayName => fullName?.isNotEmpty == true ? fullName! : 'Student';
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
