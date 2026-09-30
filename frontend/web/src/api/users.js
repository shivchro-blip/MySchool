import { api } from './client'

let _cachedProfile = null
let _cacheToken    = null
let _inflight      = null   // { token, promise } — one /users/me request at a time

export function invalidateProfileCache() {
  _cachedProfile = null
  _cacheToken    = null
  _inflight      = null
}

function cacheProfile(profile) {
  const token = localStorage.getItem('exam_coach_token')
  if (profile && token) {
    _cachedProfile = profile
    _cacheToken    = token
  }
  return profile
}

// Synchronous cache read — lets route guards render immediately on navigation.
export function peekCachedProfile() {
  const token = localStorage.getItem('exam_coach_token')
  return token && _cacheToken === token ? _cachedProfile : null
}

// Returns the profile, sharing one in-flight request between concurrent callers
// (Guard, sidebar, dashboard all ask at mount). Throws on failure so callers
// can tell "no profile" (err.status === 404) from "request failed".
export function loadProfile() {
  const token = localStorage.getItem('exam_coach_token')
  if (!token) return Promise.resolve(null)
  if (_cachedProfile && _cacheToken === token) return Promise.resolve(_cachedProfile)
  if (_inflight && _inflight.token === token) return _inflight.promise

  const promise = fetchMyProfile()
    .then(profile => {
      if (localStorage.getItem('exam_coach_token') === token) cacheProfile(profile)
      return profile
    })
    .finally(() => {
      if (_inflight?.promise === promise) _inflight = null
    })
  _inflight = { token, promise }
  return promise
}

export async function getCachedProfile() {
  try {
    return await loadProfile()
  } catch {
    return null
  }
}

export async function fetchMyProfile() {
  return api.get('/users/me')
}

// PUT returns the full updated profile — seed the cache with it so the next
// screen doesn't need another GET /users/me round trip.
export async function updateMyProfile(fields) {
  return cacheProfile(await api.put('/users/me', fields))
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
