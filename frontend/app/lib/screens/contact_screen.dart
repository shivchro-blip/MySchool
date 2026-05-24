import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../config/legal_constants.dart';
import '../config/theme.dart';

class ContactScreen extends StatefulWidget {
  const ContactScreen({super.key});

  @override
  State<ContactScreen> createState() => _ContactScreenState();
}

class _ContactScreenState extends State<ContactScreen> {
  bool _copied = false;

  Future<void> _copyEmail() async {
    await Clipboard.setData(const ClipboardData(text: kContactEmail));
    if (!mounted) return;
    setState(() => _copied = true);
    await Future.delayed(const Duration(seconds: 2));
    if (mounted) setState(() => _copied = false);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Contact')),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Text(
            '$kProductName is run by a single operator. For support, privacy requests, or data '
            'deletion requests, email:',
            style: TextStyle(fontSize: 14, color: AppTheme.text2Of(context), height: 1.6),
          ),
          const SizedBox(height: 20),

          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
            decoration: BoxDecoration(
              color: AppTheme.cardOf(context),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppTheme.borderOf(context)),
            ),
            child: Row(
              children: [
                const Expanded(
                  child: Text(
                    kContactEmail,
                    style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600),
                  ),
                ),
                TextButton(
                  onPressed: _copyEmail,
                  style: TextButton.styleFrom(
                    foregroundColor: _copied ? AppTheme.brandOf(context) : AppTheme.text2Of(context),
                  ),
                  child: Text(_copied ? 'Copied!' : 'Copy'),
                ),
              ],
            ),
          ),

          const SizedBox(height: 28),
          Text(
            'Data deletion requests',
            style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600, color: AppTheme.textOf(context)),
          ),
          const SizedBox(height: 8),
          Text(
            'To request deletion of your account and data, email the address above with the '
            'subject "Data deletion request" and include your account email address. '
            'We aim to respond within 30 days.',
            style: TextStyle(fontSize: 14, color: AppTheme.text2Of(context), height: 1.6),
          ),

          const SizedBox(height: 28),
          Text(
            'Response time',
            style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600, color: AppTheme.textOf(context)),
          ),
          const SizedBox(height: 8),
          Text(
            'We aim to respond to all emails within 5 business days.',
            style: TextStyle(fontSize: 14, color: AppTheme.text2Of(context), height: 1.6),
          ),
        ],
      ),
    );
  }
}
