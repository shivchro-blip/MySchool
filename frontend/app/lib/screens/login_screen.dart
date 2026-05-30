import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../services/auth_service.dart';
import '../services/user_service.dart';
import '../config/theme.dart';
import '../widgets/app_button.dart';
import '../widgets/brand_logo.dart';
import '../widgets/google_sign_in_button.dart';
import '../widgets/theme_toggle.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});
  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailCtrl    = TextEditingController();
  final _passwordCtrl = TextEditingController();
  final _auth         = AuthService();

  bool    _loading          = false;
  bool    _isLogin          = true;
  String  _error            = '';
  String  _notice           = '';
  String? _ageConfirmation;  // 'adult' or 'minor_with_consent'
  bool    _consentChecked   = false;

  Future<void> _signInWithGoogle() async {
    setState(() { _loading = true; _error = ''; _notice = ''; });
    try {
      await AuthService().signInWithGoogle();
    } catch (e) {
      if (mounted) {
        setState(() => _error = 'Could not open Google sign-in. Please try again.');
      }
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _submit() async {
    final email    = _emailCtrl.text.trim();
    final password = _passwordCtrl.text.trim();

    if (email.isEmpty || password.isEmpty) {
      setState(() => _error = 'Please enter email and password.');
      return;
    }

    setState(() { _loading = true; _error = ''; _notice = ''; });

    try {
      if (!_isLogin) {
        final signupData = await _auth.signupWithEmail(email, password);
        final session = signupData['session'];
        final sessionToken = signupData['access_token'] as String? ??
            (session is Map ? session['access_token'] as String? : null);
        if (sessionToken == null || sessionToken.isEmpty) {
          setState(() {
            _error = 'Account created. Check your email to confirm your account, then sign in.';
            _loading = false;
          });
          return;
        }
        try {
          await UserService().updateProfile(ageConfirmation: _ageConfirmation ?? 'adult');
        } catch (_) {}
        if (mounted) context.go('/onboarding');
      } else {
        await _auth.loginWithEmail(email, password);
        if (mounted) context.go('/');
      }
    } catch (e) {
      setState(() => _error = e.toString().replaceFirst('Exception: ', ''));
    } finally {
      if (mounted) {
        setState(() => _loading = false);
      }
    }
  }

  Future<void> _resendConfirmation() async {
    final email = _emailCtrl.text.trim();
    if (email.isEmpty) {
      setState(() => _error = 'Enter your email first.');
      return;
    }
    setState(() { _loading = true; _error = ''; _notice = ''; });
    try {
      await _auth.resendConfirmationEmail(email);
      if (mounted) {
        setState(() {
          _notice = 'Confirmation email sent again. Check your inbox.';
        });
      }
    } catch (e) {
      setState(() => _error = e.toString().replaceFirst('Exception: ', ''));
    } finally {
      if (mounted) {
        setState(() => _loading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final cardBg   = AppTheme.cardOf(context);
    final surfaceBg = AppTheme.surfaceOf(context);
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Theme toggle (top-right)
              const Align(
                alignment: Alignment.centerRight,
                child: ThemeToggle(),
              ),
              const SizedBox(height: 16),
              const Center(child: BrandLogo(height: 140)),
              const SizedBox(height: 8),
              Text(
                'Tamil Nadu +1 & +2 Board Exam Preparation',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 13, color: AppTheme.text2Of(context)),
              ),
              const SizedBox(height: 32),

              // Mode-specific heading
              Text(
                _isLogin ? 'Welcome back' : 'Create your account',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize:   20,
                  fontWeight: FontWeight.w700,
                  color:      AppTheme.textOf(context),
                ),
              ),
              const SizedBox(height: 4),
              Text(
                _isLogin
                    ? 'Continue where you left off.'
                    : 'Set up your TN Exam Coach learning space.',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 13, color: AppTheme.text2Of(context)),
              ),
              const SizedBox(height: 24),

              // Google sign-in
              GoogleSignInButton(
                onPressed: _loading ? null : _signInWithGoogle,
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Expanded(child: Divider(color: AppTheme.text2Of(context).withValues(alpha: 0.2))),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 12),
                    child: Text(
                      'or',
                      style: TextStyle(fontSize: 12, color: AppTheme.text2Of(context)),
                    ),
                  ),
                  Expanded(child: Divider(color: AppTheme.text2Of(context).withValues(alpha: 0.2))),
                ],
              ),
              const SizedBox(height: 16),

              // Mode toggle
              Container(
                decoration: BoxDecoration(
                  color:        surfaceBg,
                  borderRadius: BorderRadius.circular(10),
                ),
                padding: const EdgeInsets.all(4),
                child: Row(
                  children: [
                    for (final (label, val) in [('Login', true), ('Sign Up', false)])
                      Expanded(
                        child: GestureDetector(
                          onTap: () => setState(() { _isLogin = val; _error = ''; _ageConfirmation = null; _consentChecked = false; }),
                          child: AnimatedContainer(
                            duration: const Duration(milliseconds: 150),
                            padding: const EdgeInsets.symmetric(vertical: 10),
                            decoration: BoxDecoration(
                              color:        _isLogin == val
                                                ? cardBg
                                                : Colors.transparent,
                              borderRadius: BorderRadius.circular(8),
                              boxShadow:    _isLogin == val
                                  ? [BoxShadow(
                                      color: Colors.black.withValues(alpha: 0.08),
                                      blurRadius: 4,
                                    )]
                                  : null,
                            ),
                            child: Text(
                              label,
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                fontSize:   14,
                                fontWeight: FontWeight.w600,
                                color:      _isLogin == val
                                    ? AppTheme.textOf(context)
                                    : AppTheme.text2Of(context),
                              ),
                            ),
                          ),
                        ),
                      ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              TextField(
                controller:  _emailCtrl,
                keyboardType: TextInputType.emailAddress,
                decoration: const InputDecoration(labelText: 'Email'),
              ),
              const SizedBox(height: 12),
              TextField(
                controller:  _passwordCtrl,
                obscureText: true,
                decoration: const InputDecoration(labelText: 'Password'),
                onSubmitted: (_) => _submit(),
              ),

              if (!_isLogin) ...[
                const SizedBox(height: 20),
                Text(
                  'Age confirmation',
                  style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: AppTheme.text2Of(context)),
                ),
                const SizedBox(height: 8),
                for (final (value, label) in [
                  ('adult', 'I am 18 years or older'),
                  ('minor_with_consent', 'I am under 18, and my parent or guardian has agreed to my use of Yadhum'),
                ])
                  InkWell(
                    onTap: () => setState(() => _ageConfirmation = value),
                    borderRadius: BorderRadius.circular(8),
                    child: Padding(
                      padding: const EdgeInsets.symmetric(vertical: 6),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Icon(
                            _ageConfirmation == value
                                ? Icons.radio_button_checked
                                : Icons.radio_button_unchecked,
                            size:  20,
                            color: _ageConfirmation == value ? AppTheme.brand : AppTheme.text2Of(context),
                          ),
                          const SizedBox(width: 8),
                          Expanded(
                            child: Text(label, style: TextStyle(fontSize: 13, color: AppTheme.text2Of(context))),
                          ),
                        ],
                      ),
                    ),
                  ),
                const SizedBox(height: 8),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Checkbox(
                      value: _consentChecked,
                      onChanged: (v) => setState(() => _consentChecked = v ?? false),
                    ),
                    Expanded(
                      child: Wrap(
                        children: [
                          Text('I agree to the ', style: TextStyle(fontSize: 13, color: AppTheme.text2Of(context))),
                          GestureDetector(
                            onTap: () => context.push('/privacy'),
                            child: const Text('Privacy Policy', style: TextStyle(fontSize: 13, color: AppTheme.brand, decoration: TextDecoration.underline)),
                          ),
                          Text(' and ', style: TextStyle(fontSize: 13, color: AppTheme.text2Of(context))),
                          GestureDetector(
                            onTap: () => context.push('/terms'),
                            child: const Text('Terms of Service', style: TextStyle(fontSize: 13, color: AppTheme.brand, decoration: TextDecoration.underline)),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ],

              if (_error.isNotEmpty) ...[
                const SizedBox(height: 12),
                Container(
                  padding: const EdgeInsets.all(10),
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

              if (_isLogin && _error.toLowerCase().contains('not confirmed')) ...[
                const SizedBox(height: 8),
                TextButton(
                  onPressed: _loading ? null : _resendConfirmation,
                  child: const Text('Resend confirmation email'),
                ),
              ],

              if (_notice.isNotEmpty) ...[
                const SizedBox(height: 8),
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: AppTheme.successBgOf(context),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    _notice,
                    style: TextStyle(fontSize: 13, color: AppTheme.successFgOf(context)),
                  ),
                ),
              ],

              const SizedBox(height: 24),
              if (!_isLogin) ...[
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                  decoration: BoxDecoration(
                    color:        AppTheme.brandLightOf(context),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Text(
                    "After signup, you'll choose your class and subjects.",
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 12, color: AppTheme.brand),
                  ),
                ),
                const SizedBox(height: 12),
              ],
              AppButton(
                label:     _isLogin ? 'Log in' : 'Create account',
                onPressed: (!_isLogin && (_ageConfirmation == null || !_consentChecked)) ? null : _submit,
                loading:   _loading,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
