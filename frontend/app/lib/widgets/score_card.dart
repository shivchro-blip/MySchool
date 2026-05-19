import 'package:flutter/material.dart';
import '../models/evaluation_model.dart';

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
                color:      result.scoreColor,
              ),
            ),
            const SizedBox(height: 8),
            ClipRRect(
              borderRadius: BorderRadius.circular(8),
              child: LinearProgressIndicator(
                value:           result.percentage / 100,
                minHeight:       10,
                backgroundColor: const Color(0xFFE5E7EB),
                color:           result.scoreColor,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              result.encouragement,
              style: const TextStyle(fontSize: 14, color: Color(0xFF6B7280)),
            ),
          ],
        ),
      ),
    );
  }
}
