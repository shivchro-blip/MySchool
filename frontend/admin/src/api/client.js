const BASE = '/api/v1/admin'

function getToken() {
  return localStorage.getItem('admin_token') || ''
}

async function request(method, path, body = null) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  }
  const config = { method, headers }
  if (body) config.body = JSON.stringify(body)
  const res = await fetch(`${BASE}${path}`, config)
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(err.detail || err.error || 'Request failed')
  }
  return res.json()
}

export const adminApi = {
  get:    path        => request('GET',    path),
  post:   (path, b)   => request('POST',   path, b),
  put:    (path, b)   => request('PUT',    path, b),
  delete: path        => request('DELETE', path),
}
