import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../models/evaluation_model.dart';

extension EvaluationColorExtension on EvaluationResponse {
  Color scoreColor(BuildContext context) {
    if (percentage >= 80) return AppTheme.success;
    if (percentage >= 50) return AppTheme.warning;
    return AppTheme.error;
  }
}
