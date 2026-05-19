const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY

export async function loginWithEmail(email, password) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON },
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error_description || 'Login failed')
  localStorage.setItem('exam_coach_token', data.access_token)
  return data
}

export async function signupWithEmail(email, password) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON },
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error_description || 'Signup failed')
  return data
}

export function logout() {
  localStorage.removeItem('exam_coach_token')
  localStorage.removeItem('exam_coach_onboarded')
}

export function getToken() {
  return localStorage.getItem('exam_coach_token')
}

export function isLoggedIn() {
  return !!getToken()
}

export function signInWithGoogle() {
  const redirectTo = encodeURIComponent(`${window.location.origin}/`)
  window.location.href = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${redirectTo}`
}

export async function resendConfirmationEmail(email) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/resend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON },
    body: JSON.stringify({ type: 'signup', email }),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error_description || 'Failed to resend email')
  }
}
