import { test, expect } from '@playwright/test'
import { mockLogin } from './helpers'

test.describe('Learn Page', () => {
  test.beforeEach(async ({ page }) => {
    await mockLogin(page)
  })

  test('learn page loads with back button', async ({ page }) => {
    // Use a fake UUID — page should load even without valid data
    await page.goto('/learn/00000000-0000-0000-0000-000000000001')
    await expect(
      page.getByRole('link', { name: /back/i })
    ).toBeVisible()
  })

  test('explain button is disabled without topic or question', async ({ page }) => {
    await page.goto('/learn/00000000-0000-0000-0000-000000000001')
    await page.waitForTimeout(1000)
    const explainBtn = page.getByRole('button', { name: /explain/i })
    await expect(explainBtn).toBeDisabled()
  })

  test('explain button enables when question is typed', async ({ page }) => {
    await page.goto('/learn/00000000-0000-0000-0000-000000000001')
    await page.waitForTimeout(1000)
    await page.getByPlaceholder(/e.g. What is the theme/i).fill('What is the theme?')
    const explainBtn = page.getByRole('button', { name: /explain/i })
    await expect(explainBtn).toBeEnabled()
  })

  test('language toggle shows English and Tamil options', async ({ page }) => {
    await page.goto('/learn/00000000-0000-0000-0000-000000000001')
    await expect(page.getByRole('button', { name: 'English' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Tamil' })).toBeVisible()
  })
})
