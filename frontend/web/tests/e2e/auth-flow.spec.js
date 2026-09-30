import { test, expect } from '@playwright/test'

// End-to-end login / sign-up flows with Supabase Auth and the backend mocked.
// Guards the regressions fixed in the auth performance work:
//   - sign-up consent PUT must succeed and lead to the app (was a 500)
//   - one GET /users/me per login (Guard + sidebar + dashboard share it)
//   - sign-up needs no GET /users/me at all (PUT response seeds the cache)
//   - a failed profile load shows Retry, not the onboarding flow

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

async function mockBackend(page, { profileStatus = 200 } = {}) {
  const calls = { token: 0, signup: 0, getMe: 0, putMe: 0, putBodies: [] }
  const session = { access_token: fakeJwt(), token_type: 'bearer', expires_in: 3600 }

  // Cookie banner overlays the form's submit button on small viewports.
  await page.addInitScript(() => {
    window.localStorage.setItem('tnec_cookie_consent', 'essential_only')
  })

  await page.route('**/auth/v1/token**', async route => {
    calls.token++
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(session) })
  })
  await page.route('**/auth/v1/signup', async route => {
    calls.signup++
    await route.fulfill({
      status: 200, contentType: 'application/json',
      body: JSON.stringify({ ...session, user: { id: USER_ID } }),
    })
  })
  await page.route('**/v1/users/me', async route => {
    const method = route.request().method()
    if (method === 'GET') {
      calls.getMe++
      if (profileStatus !== 200) {
        return route.fulfill({ status: profileStatus, contentType: 'application/json',
                               body: JSON.stringify({ error: 'boom' }) })
      }
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(PROFILE) })
    }
    if (method === 'PUT') {
      calls.putMe++
      const body = route.request().postDataJSON()
      calls.putBodies.push(body)
      return route.fulfill({ status: 200, contentType: 'application/json',
                             body: JSON.stringify({ ...PROFILE, ...body }) })
    }
    return route.continue()
  })
  return calls
}

async function fillCredentials(page) {
  await page.getByPlaceholder('your@email.com').fill('student@test.com')
  await page.getByPlaceholder('••••••••').fill('correct-horse')
}

test.describe('Auth flows', () => {
  test('login → dashboard with a single profile request', async ({ page }) => {
    const calls = await mockBackend(page)
    await page.goto('/login')
    await fillCredentials(page)
    await page.locator('form').getByRole('button', { name: 'Login' }).click()

    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByText('Loading…')).toHaveCount(0)
    await page.waitForLoadState('networkidle')

    expect(calls.token).toBe(1)
    expect(calls.getMe).toBe(1)
  })

  test('sign-up records consent and lands in the app without re-fetching the profile', async ({ page }) => {
    const calls = await mockBackend(page)
    await page.goto('/login')
    await page.getByRole('button', { name: 'Sign Up' }).click()
    await fillCredentials(page)
    await page.getByLabel('I am 18 years or older').check()
    await page.getByRole('checkbox').check()
    await page.getByRole('button', { name: 'Create Account' }).click()

    await expect(page).toHaveURL(/\/$/)
    await page.waitForLoadState('networkidle')

    expect(calls.signup).toBe(1)
    expect(calls.putMe).toBe(1)
    expect(calls.putBodies[0].age_confirmation).toBe('adult')
    expect(calls.putBodies[0].terms_accepted_at).toBeTruthy()
    expect(calls.getMe).toBe(0)
  })

  test('profile load failure offers retry instead of onboarding', async ({ page }) => {
    await mockBackend(page, { profileStatus: 503 })
    await page.goto('/login')
    await fillCredentials(page)
    await page.locator('form').getByRole('button', { name: 'Login' }).click()

    await expect(page.getByRole('button', { name: 'Retry' })).toBeVisible()
    await expect(page).not.toHaveURL(/onboarding/)
  })

  test('login surfaces a readable error when the auth server returns HTML', async ({ page }) => {
    await page.route('**/auth/v1/token**', route =>
      route.fulfill({ status: 502, contentType: 'text/html', body: '<html>Bad Gateway</html>' }))
    await page.goto('/login')
    await fillCredentials(page)
    await page.locator('form').getByRole('button', { name: 'Login' }).click()
    await expect(page.getByText('Login failed')).toBeVisible()
  })
})
