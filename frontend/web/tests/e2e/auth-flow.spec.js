import { test, expect } from '@playwright/test'

// Login flow with Supabase Auth and the backend mocked. Guards:
//   - /login wakes the backend (Render free tier cold start) before submit
//   - a slow backend shows a "waking up" hint instead of a silent spinner
//   - login → claim → dashboard, with the profile taken from the claim response
//   - an HTML error page from Supabase shows a readable error

const USER_ID = '11111111-1111-1111-1111-111111111111'

function fakeJwt() {
  const b64 = obj => Buffer.from(JSON.stringify(obj)).toString('base64url')
  const exp = Math.floor(Date.now() / 1000) + 3600
  return `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64({ sub: USER_ID, exp, aud: 'authenticated' })}.sig`
}

const PROFILE = {
  id: USER_ID, full_name: null, class_level: '+1', school: null, plan: 'free',
  daily_ai_calls: 0, created_at: '2026-01-01T00:00:00Z', subjects: ['english'],
  onboarding_completed: true,
}

const json = body => ({ status: 200, contentType: 'application/json', body: JSON.stringify(body) })

async function mockBackend(page, { claimDelayMs = 0 } = {}) {
  const calls = { ping: 0, token: 0, claim: 0, getMe: 0 }

  // Cookie banner overlays the form's submit button on small viewports.
  await page.addInitScript(() => {
    window.localStorage.setItem('tnec_cookie_consent', 'essential_only')
  })
  await page.route('**/v1/ping', async route => {
    calls.ping++
    await route.fulfill(json({ status: 'ok' }))
  })
  await page.route('**/auth/v1/token**', async route => {
    calls.token++
    await route.fulfill(json({ access_token: fakeJwt(), token_type: 'bearer', expires_in: 3600 }))
  })
  await page.route('**/v1/users/session/claim', async route => {
    calls.claim++
    if (claimDelayMs) await new Promise(r => setTimeout(r, claimDelayMs))
    await route.fulfill(json({ session_token: 'session-token', profile: PROFILE }))
  })
  await page.route('**/v1/users/me', async route => {
    calls.getMe++
    await route.fulfill(json(PROFILE))
  })
  await page.route('**/v1/users/me/usage', route =>
    route.fulfill(json({ daily_ai_calls: 0, daily_limit: 20, calls_remaining: 20, plan: 'free' })))
  return calls
}

async function fillCredentials(page) {
  await page.getByPlaceholder('your@email.com').fill('student@test.com')
  await page.getByPlaceholder('••••••••').fill('correct-horse')
}

test.describe('Auth flow', () => {
  test('/login wakes the backend before the user submits', async ({ page }) => {
    const calls = await mockBackend(page)
    await page.goto('/login')
    await expect.poll(() => calls.ping).toBe(1)
    expect(calls.token).toBe(0)
  })

  test('login → claim → dashboard', async ({ page }) => {
    const calls = await mockBackend(page)
    await page.goto('/login')
    await fillCredentials(page)
    await page.locator('form button[type=submit]').click()

    await expect(page).toHaveURL(/\/$/)
    expect(calls.token).toBe(1)
    expect(calls.claim).toBe(1)
  })

  test('slow backend shows a waking-up hint, then completes', async ({ page }) => {
    test.setTimeout(45_000)
    await mockBackend(page, { claimDelayMs: 8000 })
    await page.goto('/login')
    await fillCredentials(page)
    await page.locator('form button[type=submit]').click()

    await expect(page.getByText(/Waking up the server/)).toBeVisible({ timeout: 10_000 })
    await expect(page).toHaveURL(/\/$/, { timeout: 20_000 })
  })

  test('HTML error page from the auth server shows a readable error', async ({ page }) => {
    await mockBackend(page)
    await page.route('**/auth/v1/token**', route =>
      route.fulfill({ status: 502, contentType: 'text/html', body: '<html>Bad Gateway</html>' }))
    await page.goto('/login')
    await fillCredentials(page)
    await page.locator('form button[type=submit]').click()
    await expect(page.getByText('Login failed')).toBeVisible()
  })
})
