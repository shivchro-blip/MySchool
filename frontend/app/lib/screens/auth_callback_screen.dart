import 'package:app_links/app_links.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../config/theme.dart';
import '../services/auth_service.dart';
import '../services/user_service.dart';
import '../services/api_service.dart';
import '../widgets/app_button.dart';
import '../widgets/brand_logo.dart';

class AuthCallbackScreen extends StatefulWidget {
  const AuthCallbackScreen({super.key});

  @override
  State<AuthCallbackScreen> createState() => _AuthCallbackScreenState();
}

class _AuthCallbackScreenState extends State<AuthCallbackScreen> {
  String  _phase          = 'loading';
  String  _error          = '';
  String? _userId;
  String? _ageConfirmation;
  bool    _consentChecked = false;
  bool    _consentLoading = false;

  @override
  void initState() {
    super.initState();
    _handleCallback();
  }

  Future<void> _handleCallback() async {
    try {
      final appLinks = AppLinks();
      final uri = await appLinks.getInitialLink();

      if (uri == null) {
        _setError('Invalid authentication response. Please try again.');
        return;
      }

      final fragment = uri.fragment;
      if (fragment.isEmpty) {
        _setError('Invalid authentication response. Please try again.');
        return;
      }

      Map<String, String> params;
      try {
        params = Uri.splitQueryString(fragment);
      } catch (_) {
        _setError('Invalid authentication response. Please try again.');
        return;
      }

      final errorCode = params['error'];
      final errorDesc = params['error_description'];
      if (errorCode != null) {
        _setError(errorDesc ?? 'Google sign-in failed. Please try again.');
        return;
      }

      final accessToken = params['access_token'];
      final tokenType   = params['token_type'];

      if (accessToken == null || (tokenType?.toLowerCase() ?? '') != 'bearer') {
        _setError('Invalid authentication response. Please try again.');
        return;
      }

      await AuthService().storeToken(accessToken);

      // Claim the single-session slot before the first authenticated call —
      // /users/me requires X-Session-Token and 401s without it.
      try {
        await AuthService().claimSession();
      } catch (_) {
        _setError('Could not start your session. Please try again.');
        return;
      }

      try {
        final profile = await UserService().getProfile();
        if (!mounted) return;
        if (profile.onboardingCompleted == true) {
          context.go('/dashboard');
        } else {
          context.go('/onboarding');
        }
      } catch (e) {
        if (!mounted) return;
        final isNotFound = e is ApiException && e.statusCode == 404;
        if (isNotFound) {
          final uid = AuthService().extractUserIdFromToken(accessToken);
          setState(() { _phase = 'consent'; _userId = uid; });
        } else {
          _setError('Failed to load your profile. Please try again.');
        }
      }
    } catch (e) {
      _setError('Something went wrong. Please try again.');
    }
  }

  void _setError(String msg) {
    if (mounted) setState(() { _phase = 'error'; _error = msg; });
  }

  Future<void> _submitConsent() async {
    final uid = _userId;
    final age = _ageConfirmation;
    if (uid == null || age == null) return;

    setState(() { _consentLoading = true; _error = ''; });
    try {
      await AuthService().createUserProfile(uid, age);
      if (mounted) context.go('/onboarding');
    } catch (e) {
      if (mounted) {
        setState(() {
          _error          = 'Failed to create your account. Please try again.';
          _consentLoading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_phase == 'loading') return _buildLoading(context);
    if (_phase == 'error')   return _buildError(context);
    return _buildConsent(context);
  }

  Widget _buildLoading(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Signing in…',
          style: TextStyle(fontSize: 14, color: AppTheme.text2Of(context)),
        ),
      ),
    );
  }

  Widget _buildError(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const BrandLogo(height: 80),
                const SizedBox(height: 24),
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color:        AppTheme.errorBgOf(context),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Text(
                    _error,
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 13, color: AppTheme.errorFgOf(context)),
                  ),
                ),
                const SizedBox(height: 16),
                TextButton(
                  onPressed: () => context.go('/login'),
                  child: const Text('Back to login'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildConsent(BuildContext context) {
    final cardBg    = AppTheme.cardOf(context);
    final surfaceBg = AppTheme.surfaceOf(context);
    final canSubmit = _ageConfirmation != null && _consentChecked && !_consentLoading;

    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 16),
              const Center(child: BrandLogo(height: 100)),
              const SizedBox(height: 32),
              Text(
                'One last step',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize:   20,
                  fontWeight: FontWeight.w700,
                  color:      AppTheme.textOf(context),
                ),
              ),
              const SizedBox(height: 4),
              Text(
                'Before we set up your account, please confirm the following.',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 13, color: AppTheme.text2Of(context)),
              ),
              const SizedBox(height: 24),
              Container(
                padding:    const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color:        cardBg,
                  borderRadius: BorderRadius.circular(12),
                  border:       Border.all(color: surfaceBg),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Age confirmation',
                      style: TextStyle(
                        fontSize:   13,
                        fontWeight: FontWeight.w600,
                        color:      AppTheme.text2Of(context),
                      ),
                    ),
                    const SizedBox(height: 8),
                    for (final (value, label) in [
                      ('adult',              'I am 18 years or older'),
                      ('minor_with_consent', 'I am under 18, and my parent or guardian has agreed to my use of Yadhum'),
                    ])
                      InkWell(
                        onTap: () => setState(() => _ageConfirmation = value),
                        borderRadius: BorderRadius.circular(8),
                        child: Padding(
                          padding: const EdgeInsets.symmetric(vertical: 6),
                          child: Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Icon(
                                _ageConfirmation == value
                                    ? Icons.radio_button_checked
                                    : Icons.radio_button_unchecked,
                                size:  20,
                                color: _ageConfirmation == value
                                    ? AppTheme.brand
                                    : AppTheme.text2Of(context),
                              ),
                              const SizedBox(width: 8),
                              Expanded(
                                child: Text(
                                  label,
                                  style: TextStyle(
                                    fontSize: 13,
                                    color:    AppTheme.text2Of(context),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    const SizedBox(height: 12),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Checkbox(
                          value:     _consentChecked,
                          onChanged: (v) => setState(() => _consentChecked = v ?? false),
                        ),
                        Expanded(
                          child: Padding(
                            padding: const EdgeInsets.only(top: 12),
                            child: Wrap(
                              children: [
                                Text(
                                  'I agree to the ',
                                  style: TextStyle(fontSize: 13, color: AppTheme.text2Of(context)),
                                ),
                                GestureDetector(
                                  onTap: () => context.push('/privacy'),
                                  child: const Text(
                                    'Privacy Policy',
                                    style: TextStyle(
                                      fontSize:   13,
                                      color:      AppTheme.brand,
                                      decoration: TextDecoration.underline,
                                    ),
                                  ),
                                ),
                                Text(
                                  ' and ',
                                  style: TextStyle(fontSize: 13, color: AppTheme.text2Of(context)),
                                ),
                                GestureDetector(
                                  onTap: () => context.push('/terms'),
                                  child: const Text(
                                    'Terms of Service',
                                    style: TextStyle(
                                      fontSize:   13,
                                      color:      AppTheme.brand,
                                      decoration: TextDecoration.underline,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              if (_error.isNotEmpty) ...[
                const SizedBox(height: 12),
                Container(
                  padding:    const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color:        AppTheme.errorBgOf(context),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    _error,
                    style: TextStyle(fontSize: 13, color: AppTheme.errorFgOf(context)),
                  ),
                ),
              ],
              const SizedBox(height: 24),
              AppButton(
                label:     'Continue',
                onPressed: canSubmit ? _submitConsent : null,
                loading:   _consentLoading,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
