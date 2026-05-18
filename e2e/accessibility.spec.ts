import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import { e2eMessages } from './fixtures/messages';

const seriousOrCritical = (impact: string | null | undefined): boolean =>
  impact === 'critical' || impact === 'serious';

test.describe('Accessibility', () => {
  test('candidate dashboard has no serious or critical axe violations', async ({ page }) => {
    await page.goto('/candidates');
    await expect(
      page.getByRole('heading', { name: e2eMessages.candidates.dashboard.title }),
    ).toBeVisible();

    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations.filter((violation) => seriousOrCritical(violation.impact))).toEqual(
      [],
    );
  });

  test('registration page has no serious or critical axe violations', async ({ page }) => {
    await page.goto('/candidates/register');
    await expect(
      page.getByRole('heading', {
        name: e2eMessages.candidates.registration.steps[0]?.title ?? '',
      }),
    ).toBeVisible();

    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations.filter((violation) => seriousOrCritical(violation.impact))).toEqual(
      [],
    );
  });
});
