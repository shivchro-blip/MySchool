import { invalidateProfileCache } from './users'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY

// ── Google OAuth ───────────────────────────────────────────────────────────────
//
// SETUP REQUIRED (one-time, in Supabase Dashboard):
//   1. Authentication → Providers → Google
//      Enter the Client ID and Client Secret from Google Cloud Console.
//      The authorized redirect URI for Supabase is:
//        https://<your-project>.supabase.co/auth/v1/callback
//
//   2. Authentication → URL Configuration → Redirect URLs
//      Add the following to the allow-list:
//        http://localhost:5173/auth/callback    (dev)
//        https://<your-domain>/auth/callback    (production)
//
//   3. Google Cloud Console → OAuth consent screen
//      Add the Supabase callback URI as an authorized redirect URI.
//
// NOTE: Supabase creates a separate auth.users row per provider by default.
// If a user already has an email/password account with the same email, signing
// in with Google creates a second auth identity rather than linking accounts.
// To enable automatic linking, turn on "Link accounts with the same email" in
// Supabase Dashboard → Authentication → Settings.

export function signInWithGoogle() {
  const redirectTo = `${window.location.origin}/auth/callback`
  window.location.href =
    `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectTo)}`
}

export function getUserIdFromToken(token) {
  try {
    const payload = JSON.parse(
      atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))
    )
    return payload?.sub ?? null
  } catch {
    return null
  }
}

// Supabase puts Google's displayName in user_metadata.full_name (or .name).
// Returns null if no token or no name present.
export function getNameFromJwt() {
  const token = getToken()
  if (!token) return null
  try {
    const payload = JSON.parse(
      atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))
    )
    return payload?.user_metadata?.full_name
      || payload?.user_metadata?.name
      || null
  } catch {
    return null
  }
}

function authError(data, fallback) {
  return (
    data?.error_description ||
    data?.msg ||
    data?.message ||
    data?.error ||
    data?.detail ||
    fallback
  )
}

export async function loginWithEmail(email, password) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON },
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(authError(data, 'Login failed'))
  if (data.access_token) localStorage.setItem('exam_coach_token', data.access_token)
  return data
}

export async function signupWithEmail(email, password) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON },
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(authError(data, 'Signup failed'))
  if (data.access_token) localStorage.setItem('exam_coach_token', data.access_token)
  if (data.session?.access_token) localStorage.setItem('exam_coach_token', data.session.access_token)
  return data
}

export async function resendConfirmationEmail(email) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/resend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON },
    body: JSON.stringify({ email, type: 'signup' }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(authError(data, 'Could not resend confirmation email'))
  return data
}

export function logout() {
  localStorage.removeItem('exam_coach_token')
  invalidateProfileCache()
}

export function getToken() {
  return localStorage.getItem('exam_coach_token')
}

function decodeJwtExp(token) {
  try {
    const parts = token.split('.')
    if (parts.length < 2) return 0
    const payload = JSON.parse(
      atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))
    )
    return typeof payload.exp === 'number' ? payload.exp : 0
  } catch {
    return 0
  }
}

// TODO: implement refresh token flow using Supabase's
// /auth/v1/token?grant_type=refresh_token to extend sessions
// past the 1-hour JWT lifetime without forcing re-login.
export function isLoggedIn() {
  const token = getToken()
  if (!token) return false
  const exp = decodeJwtExp(token)
  if (!exp) return false
  if (Date.now() >= exp * 1000) {
    logout()
    return false
  }
  return true
}

/**
 * @deprecated Use recordSignupConsent from api/users.js instead.
 *             This direct-PostgREST call will be removed once
 *             all callers migrate to the FastAPI route.
 */
export async function createUserProfile(userId, ageConfirmation) {
  if (!userId) return
  const token = getToken()
  const now = new Date().toISOString()
  const res = await fetch(`${SUPABASE_URL}/rest/v1/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON,
      'Authorization': `Bearer ${token}`,
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify({
      id: userId,
      age_confirmation: ageConfirmation,
      terms_accepted_at: now,
      privacy_accepted_at: now,
    }),
  })
  if (!res.ok && res.status !== 409) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.message || 'Profile creation failed')
  }
}
