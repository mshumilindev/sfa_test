import { expect, test } from '@playwright/test';

import { e2eMessages } from './fixtures/messages';

test.describe('SSR prefetch', () => {
  test('renders seeded candidates without a client-only loading skeleton', async ({ page }) => {
    await page.goto('/candidates');

    await expect(
      page.getByRole('heading', { name: e2eMessages.candidates.dashboard.title }),
    ).toBeVisible();
    await expect(page.getByTestId('candidate-dashboard-skeleton')).toHaveCount(0);
    await expect(page.getByRole('cell', { name: 'Ava Kowalski' })).toBeVisible();
    await expect(
      page.getByRole('table', { name: e2eMessages.candidates.dashboard.table.caption }),
    ).toBeVisible();
  });

  test('renders the registration wizard shell from the server', async ({ page }) => {
    await page.goto('/candidates/register');

    await expect(
      page.getByRole('heading', {
        name: e2eMessages.candidates.registration.steps[0]?.title ?? '',
      }),
    ).toBeVisible();
    await expect(
      page.getByRole('navigation', { name: e2eMessages.candidates.registration.stepsLabel }),
    ).toBeVisible();
    await expect(
      page.getByLabel(e2eMessages.candidates.fields.email, { exact: true }),
    ).toBeVisible();
  });
});
