import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../config/legal_constants.dart';
import '../config/theme.dart';

class DeleteAccountScreen extends StatelessWidget {
  const DeleteAccountScreen({super.key});

  Uri get _mailtoUri => Uri(
    scheme: 'mailto',
    path: kContactEmail,
    query: 'subject=${Uri.encodeComponent('Delete My Account')}'
        '&body=${Uri.encodeComponent(
      'Hi,\n\nI would like to permanently delete my $kProductName account and all associated data.'
      '\n\nEmail address on my account: \n\nThank you.',
    )}',
  );

  Future<void> _sendDeletionRequest(BuildContext context) async {
    if (!await launchUrl(_mailtoUri, mode: LaunchMode.externalApplication)) {
      if (!context.mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Could not open mail app. Email $kContactEmail directly.')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Delete Your Account')),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Text(
            'You can permanently delete your $kProductName account at any time. This removes '
            'your name, email address, learning progress, and all other personal data from our '
            'systems.',
            style: TextStyle(fontSize: 14, color: AppTheme.text2Of(context), height: 1.6),
          ),
          const SizedBox(height: 24),

          Container(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
            decoration: BoxDecoration(
              color: AppTheme.cardOf(context),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppTheme.borderOf(context)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'How to delete your account',
                  style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: AppTheme.textOf(context)),
                ),
                const SizedBox(height: 14),
                _step(context, '1', 'Send an email to $kContactEmail with the subject "Delete My Account".'),
                const SizedBox(height: 10),
                _step(context, '2', 'Include the email address associated with your $kProductName account in the message body.'),
                const SizedBox(height: 10),
                _step(context, '3', 'We will permanently delete your account and all associated data within 30 days and send you a confirmation email.'),
              ],
            ),
          ),
          const SizedBox(height: 24),

          SizedBox(
            width: double.infinity,
            child: FilledButton.icon(
              onPressed: () => _sendDeletionRequest(context),
              style: FilledButton.styleFrom(
                backgroundColor: AppTheme.error,
                padding: const EdgeInsets.symmetric(vertical: 14),
              ),
              icon: const Icon(Icons.mail_outline, size: 18),
              label: const Text('Send deletion request'),
            ),
          ),
          const SizedBox(height: 24),

          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
            decoration: BoxDecoration(
              color: AppTheme.errorBgOf(context),
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: AppTheme.errorBorderOf(context)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'What gets deleted:',
                  style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: AppTheme.errorFgOf(context)),
                ),
                const SizedBox(height: 6),
                Text(
                  '• Your name and email address\n'
                  '• Your learning progress and completed lessons\n'
                  '• Your account preferences',
                  style: TextStyle(fontSize: 13, color: AppTheme.errorFgOf(context), height: 1.5),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),

          Text(
            'Questions? See our Privacy Policy or email $kContactEmail.',
            style: TextStyle(fontSize: 13, color: AppTheme.textMutedOf(context)),
          ),
        ],
      ),
    );
  }

  Widget _step(BuildContext context, String number, String text) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: 20, height: 20,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: AppTheme.brandLightOf(context),
          ),
          child: Text(number, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: AppTheme.brandOf(context))),
        ),
        const SizedBox(width: 10),
        Expanded(
          child: Text(text, style: TextStyle(fontSize: 14, color: AppTheme.text2Of(context), height: 1.5)),
        ),
      ],
    );
  }
}
