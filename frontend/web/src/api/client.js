const BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '') + '/v1'

function getToken() {
  return localStorage.getItem('exam_coach_token') || ''
}

function getSessionToken() {
  return localStorage.getItem('exam_coach_session') || ''
}

function clearAuthAndRedirect(sessionInvalidated) {
  localStorage.removeItem('exam_coach_token')
  localStorage.removeItem('exam_coach_session')
  if (sessionInvalidated) {
    // Read by LoginPage to show the "signed in elsewhere" banner.
    sessionStorage.setItem('logout_reason', 'session_invalidated')
  }
  window.location.replace('/login')
}

async function request(method, path, body = null) {
  const headers = { 'Content-Type': 'application/json' }
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`
  const sessionToken = getSessionToken()
  if (sessionToken) headers['X-Session-Token'] = sessionToken

  const config = { method, headers }
  if (body) config.body = JSON.stringify(body)

  const res = await fetch(`${BASE_URL}${path}`, config)

  if (res.status === 401) {
    const err = await res.json().catch(() => ({}))
    const invalidated = err.detail === 'SESSION_INVALIDATED'
    clearAuthAndRedirect(invalidated)
    throw new Error(
      invalidated
        ? 'You were signed out because your account was accessed from another location.'
        : 'Session expired. Please log in again.'
    )
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }))
    const error = new Error(err.error || err.detail || 'Request failed')
    error.status = res.status
    throw error
  }

  return res.json()
}

export const api = {
  get:    (path)       => request('GET',    path),
  post:   (path, body) => request('POST',   path, body),
  put:    (path, body) => request('PUT',    path, body),
  delete: (path)       => request('DELETE', path),
}
