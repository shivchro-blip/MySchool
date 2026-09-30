// Login / sign-up stage timings for real-user monitoring.
//
// Sent to Google Analytics (already loaded in index.html) only when the user
// accepted analytics in CookieBanner. Payload is durations + a coarse outcome
// category — never emails, tokens, or raw error text.
//
// GA4 events: auth_login / auth_signup / auth_google_callback
//   params: outcome ('success' | 'failure' | 'pending_confirmation'),
//           error_category, <stage>_ms, total_ms

const CONSENT_KEY = 'tnec_cookie_consent'

function analyticsAllowed() {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'accepted' && typeof window.gtag === 'function'
  } catch {
    return false
  }
}

export function categorizeAuthError(err) {
  if (err?.category) return err.category
  const status = err?.status
  const msg = String(err?.message || '').toLowerCase()
  if (status === 429 || msg.includes('rate limit')) return 'rate_limited'
  if (msg.includes('not confirmed')) return 'email_not_confirmed'
  if (msg.includes('invalid login') || msg.includes('invalid credentials')) return 'invalid_credentials'
  if (msg.includes('already registered')) return 'already_registered'
  if (status >= 500) return 'server'
  if (status >= 400) return 'client'
  return 'other'
}

export function startAuthTimer(flow) {
  const t0 = performance.now()
  const stages = {}
  let last = t0
  let done = false

  return {
    stage(name) {
      const now = performance.now()
      stages[`${name}_ms`] = Math.round(now - last)
      last = now
    },
    finish(outcome, err) {
      if (done) return
      done = true
      const params = {
        outcome,
        total_ms: Math.round(performance.now() - t0),
        ...stages,
      }
      if (err) params.error_category = categorizeAuthError(err)
      if (import.meta.env.DEV) console.debug(`[auth_${flow}]`, params)
      if (analyticsAllowed()) window.gtag('event', `auth_${flow}`, params)
    },
  }
}
