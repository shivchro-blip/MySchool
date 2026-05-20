import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../config/legal_constants.dart';
import '../config/theme.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Settings')),
      body: ListView(
        children: [
          const SizedBox(height: 8),
          _sectionHeader('Legal'),
          _legalTile(context, Icons.privacy_tip_outlined, 'Privacy Policy',    '/privacy'),
          _legalTile(context, Icons.description_outlined,  'Terms of Service',  '/terms'),
          _legalTile(context, Icons.mail_outline,          'Contact & Support', '/contact'),

          const SizedBox(height: 32),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Text(
              '$kProductName is a free, independent educational app. It is not affiliated with '
              'the Government of Tamil Nadu, the Tamil Nadu State Board, SCERT, DGE, or any school.',
              style: TextStyle(
                fontSize: 12,
                fontStyle: FontStyle.italic,
                color: AppTheme.textMutedOf(context),
                height: 1.5,
              ),
            ),
          ),
          const SizedBox(height: 20),
        ],
      ),
    );
  }

  Widget _sectionHeader(String label) => Padding(
    padding: const EdgeInsets.fromLTRB(20, 16, 20, 4),
    child: Text(
      label.toUpperCase(),
      style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600, letterSpacing: 0.8),
    ),
  );

  Widget _legalTile(BuildContext context, IconData icon, String title, String route) {
    return ListTile(
      leading: Icon(icon, size: 20, color: AppTheme.text2Of(context)),
      title: Text(title, style: const TextStyle(fontSize: 14)),
      trailing: const Icon(Icons.chevron_right, size: 18),
      onTap: () => context.push(route),
    );
  }
}
