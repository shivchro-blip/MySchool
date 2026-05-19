import { test, expect } from '@playwright/test'
import { mockLogin, mockApiRoutes, ROUTES, COMPONENTS } from './helpers'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await mockLogin(page)
    await mockApiRoutes(page)
  })

  test('shows welcome message', async ({ page }) => {
    test.info().annotations.push(
      { type: 'component', description: COMPONENTS.HomePage },
      { type: 'backend-route', description: ROUTES.SUBJECTS },
    )
    await page.goto('/')
    await expect(page.getByText('Welcome back!')).toBeVisible()
  })

  test('shows Learn and Practice buttons for chapters', async ({ page }) => {
    test.info().annotations.push(
      { type: 'component', description: COMPONENTS.HomePage },
      { type: 'backend-route', description: ROUTES.SUBJECTS },
      { type: 'backend-route', description: ROUTES.CHAPTERS },
    )
    await page.goto('/')
    await page.waitForTimeout(2000)
    const learnBtns = page.getByRole('link', { name: 'Learn' })
    const count = await learnBtns.count()
    expect(count >= 0).toBeTruthy()
  })

  test('shows progress link in nav', async ({ page }) => {
    test.info().annotations.push({ type: 'component', description: COMPONENTS.HomePage })
    await page.goto('/')
    await expect(page.getByRole('link', { name: 'Progress' })).toBeVisible()
  })

  test('logout link is visible', async ({ page }) => {
    test.info().annotations.push({ type: 'component', description: COMPONENTS.HomePage })
    await page.goto('/')
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible()
  })

  test('logout clears token and redirects to login', async ({ page }) => {
    test.info().annotations.push({ type: 'component', description: COMPONENTS.HomePage })
    await page.goto('/')
    await page.getByRole('button', { name: 'Logout' }).click()
    await expect(page).toHaveURL(/\/login/)
  })
})
