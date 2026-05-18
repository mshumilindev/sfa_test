import { expect, test } from '@playwright/test';

import { e2eMessages } from './fixtures/messages';

const viewports = [
  { width: 320, height: 800 },
  { width: 768, height: 1024 },
  { width: 1200, height: 900 },
] as const;

test.describe('Responsive layouts', () => {
  for (const viewport of viewports) {
    test(`dashboard remains usable at ${viewport.width}px`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto('/candidates');

      await expect(
        page.getByRole('heading', { name: e2eMessages.candidates.dashboard.title }),
      ).toBeVisible();
      await expect(
        page.getByRole('link', { name: e2eMessages.candidates.dashboard.registerLink }),
      ).toBeVisible();
      if (viewport.width < 768) {
        await expect(
          page.getByRole('list', { name: e2eMessages.candidates.dashboard.cardListLabel }),
        ).toBeVisible();
      } else {
        await expect(
          page.getByRole('table', { name: e2eMessages.candidates.dashboard.table.caption }),
        ).toBeVisible();
      }
    });

    test(`registration wizard remains usable at ${viewport.width}px`, async ({ page }) => {
      await page.setViewportSize(viewport);
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
  }
});
