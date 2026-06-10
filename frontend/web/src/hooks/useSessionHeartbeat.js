import { useEffect } from 'react'
import { api } from '../api/client'

// Single-session active eviction.
//
// SPA navigation is client-side and reads cached profile, so an idle browser
// makes no API calls and would never notice it was signed out elsewhere. This
// hook polls a cheap authed endpoint on an interval and whenever the tab
// regains focus. The endpoint is verify_session-protected, so once another
// device claims the session this call returns 401 SESSION_INVALIDATED and the
// api/client.js handler clears auth, redirects to /login, and shows the banner.

const POLL_MS = 20000

export function useSessionHeartbeat() {
  useEffect(() => {
    if (!localStorage.getItem('exam_coach_session')) return

    let cancelled = false
    const ping = () => {
      if (cancelled) return
      if (!localStorage.getItem('exam_coach_token')) return
      // 401 handling lives in api/client.js; swallow everything else.
      api.get('/users/me/usage').catch(() => {})
    }

    const id = setInterval(ping, POLL_MS)
    const onVisible = () => {
      if (document.visibilityState === 'visible') ping()
    }
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('focus', ping)

    // Check immediately on mount too.
    ping()

    return () => {
      cancelled = true
      clearInterval(id)
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('focus', ping)
    }
  }, [])
}
