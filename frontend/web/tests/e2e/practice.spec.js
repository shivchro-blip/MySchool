import { test, expect } from '@playwright/test'
import { mockLogin, mockApiRoutes, ROUTES, COMPONENTS } from './helpers'

test.describe('Practice Page', () => {
  test.beforeEach(async ({ page }) => {
    await mockLogin(page)
    await mockApiRoutes(page)
  })

  test('practice page loads with mark filters', async ({ page }) => {
    test.info().annotations.push(
      { type: 'component', description: COMPONENTS.PracticePage },
      { type: 'backend-route', description: ROUTES.QUESTIONS },
    )
    await page.goto('/practice/00000000-0000-0000-0000-000000000001')
    await expect(page.getByRole('button', { name: 'All' })).toBeVisible()
    await expect(page.getByRole('button', { name: '2 Marks' })).toBeVisible()
    await expect(page.getByRole('button', { name: '5 Marks' })).toBeVisible()
    await expect(page.getByRole('button', { name: '10 Marks' })).toBeVisible()
  })

  test('submit button is disabled for short answers', async ({ page }) => {
    test.info().annotations.push(
      { type: 'component', description: COMPONENTS.PracticePage },
      { type: 'backend-route', description: ROUTES.EVAL_SUBMIT },
    )
    await page.goto('/practice/00000000-0000-0000-0000-000000000001')
    const answerBtns = page.getByRole('button', { name: 'Answer' })
    if (await answerBtns.count() > 0) {
      await answerBtns.first().click()
      const submitBtn = page.getByRole('button', { name: /Evaluate/i })
      await expect(submitBtn).toBeDisabled()
    }
  })
})
