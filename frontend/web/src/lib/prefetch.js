// Warm the post-login chunks while the user is still typing on /login, so the
// redirect after a successful login doesn't wait on a chunk download.
// Same specifiers as the lazy() routes in App.jsx → Vite resolves to the same chunks.

let started = false

export function prefetchPostLoginRoutes() {
  if (started) return
  started = true
  const run = () => {
    import('../components/layout/DashboardShell').catch(() => {})
    import('../pages/DashboardPage').catch(() => {})
    import('../pages/OnboardingPage').catch(() => {})
  }
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(run, { timeout: 3000 })
  } else {
    setTimeout(run, 1500)
  }
}
