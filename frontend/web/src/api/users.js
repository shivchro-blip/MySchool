import { api } from './client'

let _cachedProfile = null
let _cacheToken    = null
let _inflight      = null

// Stale-while-revalidate: the last good profile is persisted per token so a
// returning session paints the dashboard without waiting for /users/me. The
// store is keyed on the exact JWT — a rotated/re-issued token misses cleanly
// and falls back to the network fetch.
const PROFILE_STORE_KEY = 'exam_coach_profile_cache'

export function getStoredProfile() {
  const token = localStorage.getItem('exam_coach_token')
  if (!token) return null
  if (_cachedProfile && _cacheToken === token) return _cachedProfile
  try {
    const stored = JSON.parse(localStorage.getItem(PROFILE_STORE_KEY))
    return stored?.token === token ? stored.profile : null
  } catch {
    return null
  }
}

export function invalidateProfileCache() {
  _cachedProfile = null
  _cacheToken    = null
  _inflight      = null
  localStorage.removeItem(PROFILE_STORE_KEY)
}

// Seeds the cache directly from a payload the backend already sent (e.g. the
// /session/claim response), so the next getCachedProfile() call resolves
// from memory instead of issuing a GET /users/me.
export function seedProfileCache(profile) {
  if (!profile) return
  const token = localStorage.getItem('exam_coach_token')
  if (!token) return
  _cachedProfile = profile
  _cacheToken    = token
  try {
    localStorage.setItem(PROFILE_STORE_KEY, JSON.stringify({ token, profile }))
  } catch {}
}

export async function getCachedProfile() {
  const token = localStorage.getItem('exam_coach_token')
  if (!token) return null
  if (_cachedProfile && _cacheToken === token) return _cachedProfile
  if (_inflight) return _inflight
  _inflight = fetchMyProfile()
    .then(profile => {
      _cachedProfile = profile
      _cacheToken    = token
      _inflight      = null
      try {
        localStorage.setItem(PROFILE_STORE_KEY, JSON.stringify({ token, profile }))
      } catch {}
      return profile
    })
    .catch(() => {
      _inflight = null
      return null
    })
  return _inflight
}

export async function fetchMyProfile() {
  return api.get('/users/me')
}

export async function updateMyProfile(fields) {
  return api.put('/users/me', fields)
}

export async function completeOnboarding({ classLevel, subjects }) {
  return updateMyProfile({
    class_level:          classLevel,
    subjects:             subjects,
    onboarding_completed: true,
  })
}

export async function recordSignupConsent(ageConfirmation) {
  const now = new Date().toISOString()
  try {
    return await updateMyProfile({
      age_confirmation:    ageConfirmation,
      terms_accepted_at:   now,
      privacy_accepted_at: now,
    })
  } catch (err) {
    if (err.message?.includes('409') ||
        err.message?.toLowerCase().includes('conflict')) {
      return null
    }
    throw err
  }
}
