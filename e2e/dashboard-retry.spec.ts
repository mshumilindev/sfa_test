import { expect, test } from '@playwright/test';

import { e2eMessages } from './fixtures/messages';

test.describe('Dashboard recoverable errors', () => {
  test('retries loading candidates after a failed refresh', async ({ page }) => {
    let shouldFailNextGet = true;

    await page.route('**/api/candidates', async (route) => {
      if (route.request().method() !== 'GET') {
        await route.continue();
        return;
      }

      if (shouldFailNextGet) {
        shouldFailNextGet = false;
        await route.abort('failed');
        return;
      }

      await route.continue();
    });

    await page.goto('/candidates');
    const dashboardAlert = page
      .locator('section')
      .filter({ has: page.getByRole('heading', { name: e2eMessages.candidates.dashboard.title }) })
      .getByRole('alert');
    await expect(dashboardAlert).toContainText(e2eMessages.candidates.dashboard.loadError);
    await dashboardAlert.getByRole('button', { name: e2eMessages.common.actions.retry }).click();
    await expect(page.getByRole('cell', { name: 'Ava Kowalski' })).toBeVisible();
  });
});
