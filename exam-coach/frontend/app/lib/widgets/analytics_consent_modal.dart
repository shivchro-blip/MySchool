import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../config/legal_constants.dart';

const _kConsentKey = 'tnec_analytics_consent';

class AnalyticsConsentModal extends StatelessWidget {
  const AnalyticsConsentModal({super.key});

  static Future<void> showIfNeeded(BuildContext context) async {
    final prefs = await SharedPreferences.getInstance();
    if (prefs.getString(_kConsentKey) != null) return;
    if (!context.mounted) return;
    await showDialog<void>(
      context: context,
      barrierDismissible: false,
      builder: (_) => const AnalyticsConsentModal(),
    );
  }

  Future<void> _save(BuildContext context, String value) async {
    // TODO: wire up analytics SDK here based on value ('accepted' vs 'essential_only')
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_kConsentKey, value);
    if (context.mounted) Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('A note on analytics'),
      content: const Text(
        '$kProductName uses basic analytics to understand which lessons are most helpful, '
        'so we can improve them. We do not show ads or share your data with advertisers.',
      ),
      actions: [
        TextButton(
          onPressed: () => _save(context, 'essential_only'),
          child: const Text('Use only essential features'),
        ),
        FilledButton(
          onPressed: () => _save(context, 'accepted'),
          child: const Text('Accept'),
        ),
      ],
    );
  }
}
