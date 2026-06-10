const BASE = '/api/v1/admin'

function getToken() {
  return localStorage.getItem('admin_token') || ''
}

function getSessionToken() {
  return localStorage.getItem('admin_session') || ''
}

function authHeaders(extra = {}) {
  const headers = { Authorization: `Bearer ${getToken()}`, ...extra }
  const sessionToken = getSessionToken()
  if (sessionToken) headers['X-Session-Token'] = sessionToken
  return headers
}

function handleUnauthorized(err) {
  localStorage.removeItem('admin_token')
  localStorage.removeItem('admin_session')
  if (err && err.detail === 'SESSION_INVALIDATED') {
    sessionStorage.setItem('logout_reason', 'session_invalidated')
  }
  window.location.replace('/login')
}

async function handleResponse(res) {
  if (res.status === 401) {
    const err = await res.json().catch(() => ({}))
    handleUnauthorized(err)
    throw new Error('Signed out. Please log in again.')
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(err.detail || err.error || 'Request failed')
  }
  return res.json()
}

async function request(method, path, body = null) {
  const config = {
    method,
    headers: authHeaders({ 'Content-Type': 'application/json' }),
  }
  if (body) config.body = JSON.stringify(body)
  const res = await fetch(`${BASE}${path}`, config)
  return handleResponse(res)
}

async function postForm(path, formData) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  })
  return handleResponse(res)
}

export const adminApi = {
  get:      path        => request('GET',    path),
  post:     (path, b)   => request('POST',   path, b),
  put:      (path, b)   => request('PUT',    path, b),
  delete:   path        => request('DELETE', path),
  postForm: (path, fd)  => postForm(path, fd),
}
