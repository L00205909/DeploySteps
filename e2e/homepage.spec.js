
import { test, expect } from '@playwright/test'

test.describe('DeploySteps website', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(
      'DeploySteps — Build. Test. Deploy. Repeat.'
    )

    await expect(page.locator('#app')).not.toBeEmpty()
  })

  test('navigation links work correctly', async ({ page }) => {
    await page.goto('/')

    const pipelineLink = page.locator('nav a[href="#pipeline"]')

    await expect(pipelineLink).toBeVisible()
    await pipelineLink.click()

    await expect(page).toHaveURL(/#pipeline$/)
  })
})
