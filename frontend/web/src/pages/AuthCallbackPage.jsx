import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserIdFromToken, createUserProfile } from '../api/auth'
import { fetchMyProfile } from '../api/users'
import { Button } from '../components/ui'
import BrandLogo from '../components/ui/BrandLogo'

// Google OAuth callback page.
//
// Supabase redirects here after Google sign-in with tokens in the URL hash:
//   /auth/callback#access_token=...&token_type=bearer&...
//
// Flow:
//   1. Parse hash → store token
//   2. Fetch profile
//      - Profile found + onboarding done  → dashboard
//      - Profile found + not onboarded    → onboarding
//      - 404 (new Google user)            → show consent form → create profile → onboarding
//      - Other error                      → error state

export default function AuthCallbackPage() {
  const navigate = useNavigate()

  const [phase,          setPhase]   = useState('loading') // 'loading' | 'consent' | 'error'
  const [error,          setError]   = useState('')
  const [userId,         setUserId]  = useState(null)
  const [ageConfirmation, setAge]    = useState('')
  const [consentChecked, setConsent] = useState(false)
  const [consentLoading, setConsentLoading] = useState(false)

  useEffect(() => {
    async function handleCallback() {
      const hash   = window.location.hash.slice(1)        // strip leading '#'
      const params = new URLSearchParams(hash)

      const errorCode   = params.get('error')
      const errorDesc   = params.get('error_description')
      if (errorCode) {
        setError(errorDesc || 'Google sign-in failed. Please try again.')
        setPhase('error')
        return
      }

      const accessToken = params.get('access_token')
      const tokenType   = params.get('token_type')
      if (!accessToken || tokenType?.toLowerCase() !== 'bearer') {
        setError('Invalid authentication response. Please try again.')
        setPhase('error')
        return
      }

      localStorage.setItem('exam_coach_token', accessToken)

      try {
        const profile = await fetchMyProfile()
        if (profile?.onboarding_completed) {
          navigate('/', { replace: true })
        } else {
          navigate('/onboarding', { replace: true })
        }
      } catch (err) {
        if (err.status === 404) {
          setUserId(getUserIdFromToken(accessToken))
          setPhase('consent')
        } else {
          setError('Failed to load your profile. Please try again.')
          setPhase('error')
        }
      }
    }

    handleCallback()
  }, [navigate])

  async function handleConsent(e) {
    e.preventDefault()
    setConsentLoading(true)
    setError('')
    try {
      await createUserProfile(userId, ageConfirmation)
      navigate('/onboarding', { replace: true })
    } catch (err) {
      setError(err.message || 'Failed to create your account. Please try again.')
      setConsentLoading(false)
    }
  }

  if (phase === 'loading') {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-ink-3 text-sm">Signing in…</div>
      </div>
    )
  }

  if (phase === 'error') {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <BrandLogo height={80} className="mx-auto mb-6" />
          <div className="text-sm text-danger bg-pos-soft border border-line-soft
                          rounded-xl px-4 py-3 mb-4">
            {error}
          </div>
          <button
            onClick={() => navigate('/login', { replace: true })}
            className="text-sm text-accent underline hover:text-accent-ink"
          >
            Back to login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        <div className="text-center mb-8">
          <BrandLogo height={80} className="mx-auto mb-2" />
        </div>

        <div className="bg-bg-2 rounded-2xl shadow-card border border-line-soft p-6">
          <h2 className="text-base font-semibold text-ink mb-1">One last step</h2>
          <p className="text-sm text-ink-3 mb-5">
            Before we set up your account, please confirm the following.
          </p>

          <form onSubmit={handleConsent} className="space-y-4">

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

            {error && (
              <div className="text-sm text-danger bg-pos-soft border border-line-soft
                              rounded-xl px-3 py-2">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={consentLoading || !ageConfirmation || !consentChecked}
              className="w-full py-2.5"
            >
              {consentLoading ? '…' : 'Continue'}
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
