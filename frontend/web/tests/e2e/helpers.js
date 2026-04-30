// Sets a mock JWT token so tests can skip real Supabase login

export const MOCK_TOKEN = 'mock-test-token-for-playwright'

export async function mockLogin(page) {
  await page.addInitScript(() => {
    window.localStorage.setItem('exam_coach_token', 'mock-test-token-for-playwright')
  })
}

export async function clearLogin(page) {
  await page.addInitScript(() => {
    window.localStorage.removeItem('exam_coach_token')
  })
}
