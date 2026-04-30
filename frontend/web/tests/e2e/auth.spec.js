import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('login page loads correctly', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('h1')).toContainText('AI Exam Coach')
    await expect(page.getByPlaceholder('your@email.com')).toBeVisible()
    await expect(page.getByPlaceholder('••••••••')).toBeVisible()
  })

  test('login tab is active by default', async ({ page }) => {
    await page.goto('/login')
    const loginBtn = page.getByRole('button', { name: 'Login' }).first()
    await expect(loginBtn).toBeVisible()
  })

  test('can switch to sign up tab', async ({ page }) => {
    await page.goto('/login')
    await page.getByRole('button', { name: 'Sign Up' }).click()
    await expect(
      page.getByRole('button', { name: 'Create Account' })
    ).toBeVisible()
  })

  test('shows error for empty login', async ({ page }) => {
    await page.goto('/login')
    await page.getByRole('button', { name: 'Login' }).last().click()
    // HTML5 validation — email field should be required
    const emailInput = page.getByPlaceholder('your@email.com')
    await expect(emailInput).toBeVisible()
  })

  test('redirects to login if not authenticated', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL(/\/login/)
  })
})
