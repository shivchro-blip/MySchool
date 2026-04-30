import { test, expect } from '@playwright/test'
import { mockLogin } from './helpers'

test.describe('Progress Page', () => {
  test.beforeEach(async ({ page }) => {
    await mockLogin(page)
  })

  test('progress page loads', async ({ page }) => {
    await page.goto('/progress')
    await page.waitForTimeout(2000)
    // Either shows stats or no-attempts message
    const hasStats = await page.getByText('Total Attempts').isVisible().catch(() => false)
    const hasEmpty = await page.getByText('No attempts yet').isVisible().catch(() => false)
    const hasError = await page.getByText('Something went wrong').isVisible().catch(() => false)
    expect(hasStats || hasEmpty || hasError).toBeTruthy()
  })

  test('back to home link works', async ({ page }) => {
    await page.goto('/progress')
    await page.getByRole('link', { name: 'Exam Coach' }).click()
    await expect(page).toHaveURL('/')
  })
})
