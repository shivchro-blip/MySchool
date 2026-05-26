import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../models/evaluation_model.dart';
import '../utils/evaluation_ui_extensions.dart';

class ScoreCard extends StatelessWidget {
  final EvaluationResponse result;
  const ScoreCard({super.key, required this.result});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Text(
              result.scoreLabel,
              style: TextStyle(
                fontSize:   28,
                fontWeight: FontWeight.w800,
                color:      result.scoreColor(context),
              ),
            ),
            const SizedBox(height: 8),
            ClipRRect(
              borderRadius: BorderRadius.circular(8),
              child: LinearProgressIndicator(
                value:           result.percentage / 100,
                minHeight:       10,
                backgroundColor: AppTheme.borderOf(context),
                color:           result.scoreColor(context),
              ),
            ),
            const SizedBox(height: 8),
            Text(
              result.encouragement,
              style: TextStyle(fontSize: 14, color: AppTheme.text2Of(context)),
            ),
          ],
        ),
      ),
    );
  }
}
