const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY

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
}

export function getToken() {
  return localStorage.getItem('exam_coach_token')
}

export function isLoggedIn() {
  return !!getToken()
}

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
