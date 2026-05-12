import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginWithEmail, signupWithEmail, createUserProfile, resendConfirmationEmail } from '../api/auth'
import { Button, Input } from '../components/ui'
import BrandLogo from '../components/ui/BrandLogo'

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
        await createUserProfile(signupData.user?.id, ageConfirmation)
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
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Brand header */}
        <div className="text-center mb-8">
          <BrandLogo height={120} className="mx-auto mb-2" />
          <p className="text-ink-3 text-sm mt-1">
            Tamil Nadu +1 &amp; +2 Board Exam Prep
          </p>
        </div>

        {/* Card */}
        <div className="bg-bg-2 rounded-2xl shadow-card border border-line-soft p-6">

          {/* Tab switcher */}
          <div className="flex rounded-xl bg-bg-sunk p-1 mb-5">
            {['login', 'signup'].map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); setAge(''); setConsent(false) }}
                className={`flex-1 py-1.5 rounded-lg text-sm font-medium
                            transition-all ${
                  mode === m
                    ? 'bg-bg-2 text-ink shadow-sm'
                    : 'text-ink-3 hover:text-ink-2'
                }`}
              >
                {m === 'login' ? 'Login' : 'Sign Up'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink-2 mb-1.5">
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
              <label className="block text-sm font-medium text-ink-2 mb-1.5">
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
                  <p className="text-sm font-medium text-ink-2 mb-2">Age confirmation</p>
                  {[
                    { value: 'adult',              label: 'I am 18 years or older' },
                    { value: 'minor_with_consent', label: 'I am under 18, and my parent or guardian has agreed to my use of TN Exam Coach' },
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
                      <span className="text-sm text-ink-2">{opt.label}</span>
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
                  <span className="text-sm text-ink-2">
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

        <p className="text-center text-xs text-ink-4 mt-6">
          Higher Secondary · Tamil Nadu State Board
        </p>
      </div>
    </div>
  )
}
