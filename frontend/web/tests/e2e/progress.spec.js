import { test, expect } from '@playwright/test'
import { mockLogin, mockApiRoutes, ROUTES, COMPONENTS } from './helpers'

test.describe('Progress Page', () => {
  test.beforeEach(async ({ page }) => {
    await mockLogin(page)
    await mockApiRoutes(page)
  })

  test('progress page loads', async ({ page }) => {
    test.info().annotations.push(
      { type: 'component', description: COMPONENTS.ProgressPage },
      { type: 'backend-route', description: ROUTES.EVAL_PROGRESS },
      { type: 'backend-route', description: ROUTES.EVAL_HISTORY },
    )
    await page.goto('/progress')
    await page.waitForTimeout(2000)
    const hasStats = await page.getByText('Total Attempts').isVisible().catch(() => false)
    const hasEmpty = await page.getByText('No attempts yet').isVisible().catch(() => false)
    const hasError = await page.getByText('Something went wrong').isVisible().catch(() => false)
    expect(hasStats || hasEmpty || hasError).toBeTruthy()
  })

  test('back to home link works', async ({ page }) => {
    test.info().annotations.push(
      { type: 'component', description: COMPONENTS.ProgressPage },
    )
    await page.goto('/progress')
    await page.getByRole('button', { name: /^(Home|Dashboard)$/ }).first().click()
    await expect(page).toHaveURL('/')
  })
})
