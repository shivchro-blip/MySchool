import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginWithEmail, signupWithEmail, resendConfirmationEmail, signInWithGoogle } from '../api/auth'
import { recordSignupConsent } from '../api/users'
import { Button, Input } from '../components/ui'

export default function LoginPage() {
  const navigate                 = useNavigate()
  const [mode,            setMode]      = useState('login')
  const [email,           setEmail]     = useState('')
  const [password,        setPass]      = useState('')
  const [loading,         setLoading]   = useState(false)
  const [error,           setError]     = useState('')
  const [resendStatus,    setResendStatus] = useState('')
  const [ageConfirmation, setAge]       = useState('')
  const [consentChecked,  setConsent]   = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setResendStatus('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await loginWithEmail(email, password)
      } else {
        const signupData = await signupWithEmail(email, password)
        const sessionToken = signupData?.session?.access_token || signupData?.access_token
        if (!sessionToken) {
          setError('Account created. Check your email to confirm your account, then sign in.')
          return
        }
        await recordSignupConsent(ageConfirmation)
      }
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleResend() {
    if (!email) {
      setError('Enter your email first.')
      return
    }
    setLoading(true)
    setResendStatus('')
    try {
      await resendConfirmationEmail(email)
      setResendStatus('Confirmation email sent again. Check your inbox.')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-page-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Brand header */}
        <div className="text-center mb-8">
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', marginBottom:8 }}>
            <img
              src="/logo.png"
              alt="Yadhum — Tamil Nadu Board Exam Prep"
              style={{ width:140, height:'auto', objectFit:'contain' }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="bg-surface-alt rounded-2xl shadow-card border border-line-soft p-6">

          {/* Google sign-in */}
          <button
            type="button"
            onClick={signInWithGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 mb-4
                       py-2.5 px-4 rounded-full border border-line bg-surface-alt
                       text-sm font-semibold text-text-primary
                       hover:bg-surface-alt transition-colors
                       disabled:opacity-40 disabled:cursor-not-allowed
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
              <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-line-soft" />
            <span className="text-xs text-text-tertiary font-medium">or</span>
            <div className="flex-1 h-px bg-line-soft" />
          </div>

          {/* Tab switcher */}
          <div className="flex rounded-xl bg-surface-alt p-1 mb-5">
            {['login', 'signup'].map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); setAge(''); setConsent(false) }}
                className={`flex-1 py-1.5 rounded-lg text-sm font-medium
                            transition-all ${
                  mode === m
                    ? 'text-white shadow-sm'
                    : 'text-text-secondary hover:text-text-secondary'
                }`}
                style={mode === m ? { background: 'var(--brand)' } : undefined}
              >
                {m === 'login' ? 'Login' : 'Sign Up'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={e => setPass(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            {mode === 'signup' && (
              <>
                <div>
                  <p className="text-sm font-medium text-text-secondary mb-2">Age confirmation</p>
                  {[
                    { value: 'adult',              label: 'I am 18 years or older' },
                    { value: 'minor_with_consent', label: 'I am under 18, and my parent or guardian has agreed to my use of Yadhum' },
                  ].map(opt => (
                    <label key={opt.value} className="flex items-start gap-2 mb-2 cursor-pointer">
                      <input
                        type="radio"
                        name="ageConfirmation"
                        value={opt.value}
                        checked={ageConfirmation === opt.value}
                        onChange={() => setAge(opt.value)}
                        className="mt-0.5 flex-shrink-0"
                      />
                      <span className="text-sm text-text-secondary">{opt.label}</span>
                    </label>
                  ))}
                </div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentChecked}
                    onChange={e => setConsent(e.target.checked)}
                    className="mt-0.5 flex-shrink-0"
                  />
                  <span className="text-sm text-text-secondary">
                    I agree to the{' '}
                    <a href="/privacy" target="_blank" rel="noopener noreferrer"
                       className="text-brand underline">Privacy Policy</a>
                    {' '}and{' '}
                    <a href="/terms" target="_blank" rel="noopener noreferrer"
                       className="text-brand underline">Terms of Service</a>
                  </span>
                </label>
              </>
            )}

            {error && (
              <div className="text-sm text-danger bg-pos-soft border border-line-soft
                              rounded-xl px-3 py-2">
                {error}
              </div>
            )}
            {mode === 'login' && /not confirmed/i.test(error) && (
              <button
                type="button"
                onClick={handleResend}
                className="text-sm font-medium text-brand underline"
              >
                Resend confirmation email
              </button>
            )}
            {resendStatus && (
              <div className="text-sm text-good-ink bg-good-soft border border-good-soft
                              rounded-xl px-3 py-2">
                {resendStatus}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || (mode === 'signup' && (!ageConfirmation || !consentChecked))}
              className="w-full py-2.5"
            >
              {loading ? '…' : mode === 'login' ? 'Login' : 'Create Account'}
            </Button>
          </form>
        </div>

        <div className="text-center text-xs text-text-tertiary mt-6 space-y-1.5">
          <p>Higher Secondary · Samacheer Kalvi</p>
          <p>
            <Link to="/privacy" className="text-brand underline">Privacy Policy</Link>
            <span className="mx-1.5 opacity-40">·</span>
            <Link to="/terms" className="text-brand underline">Terms</Link>
            <span className="mx-1.5 opacity-40">·</span>
            <a href="mailto:yadhumedu@gmail.com" className="text-brand underline">Contact</a>
          </p>
        </div>
      </div>
    </div>
  )
}
