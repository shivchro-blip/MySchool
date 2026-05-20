import { api } from './client'

let _cachedProfile = null
let _cacheToken    = null

export function invalidateProfileCache() {
  _cachedProfile = null
  _cacheToken    = null
}

export async function getCachedProfile() {
  const token = localStorage.getItem('exam_coach_token')
  if (!token) return null
  if (_cachedProfile && _cacheToken === token) return _cachedProfile
  try {
    const profile = await fetchMyProfile()
    _cachedProfile = profile
    _cacheToken    = token
    return profile
  } catch {
    return null
  }
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
