import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginWithEmail, signupWithEmail } from '../api/auth'
import { Button, Input } from '../components/ui'
import BrandLogo from '../components/ui/BrandLogo'

export default function LoginPage() {
  const navigate                 = useNavigate()
  const [mode,     setMode]      = useState('login')
  const [email,    setEmail]     = useState('')
  const [password, setPass]      = useState('')
  const [loading,  setLoading]   = useState(false)
  const [error,    setError]     = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await loginWithEmail(email, password)
      } else {
        await signupWithEmail(email, password)
        await loginWithEmail(email, password)
      }
      navigate('/', { replace: true })
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
                onClick={() => { setMode(m); setError('') }}
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

            {error && (
              <div className="text-sm text-danger bg-pos-soft border border-line-soft
                              rounded-xl px-3 py-2">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
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
