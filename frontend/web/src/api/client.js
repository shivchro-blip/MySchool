const BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '') + '/v1'

function getToken() {
  return localStorage.getItem('exam_coach_token') || ''
}

async function request(method, path, body = null) {
  const headers = { 'Content-Type': 'application/json' }
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`

  const config = { method, headers }
  if (body) config.body = JSON.stringify(body)

  const res = await fetch(`${BASE_URL}${path}`, config)

  if (res.status === 401) {
    localStorage.removeItem('exam_coach_token')
    window.location.replace('/login')
    throw new Error('Session expired. Please log in again.')
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
