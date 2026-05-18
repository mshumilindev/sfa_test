import { expect, test } from '@playwright/test';

import { e2eMessages } from './fixtures/messages';

const { candidates, common } = e2eMessages;

test.describe('Registration validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/candidates/register');
  });

  test('shows required field errors when continuing from an empty step 1', async ({ page }) => {
    await page.getByRole('button', { name: common.actions.continue }).click();

    await expect(page.getByText(candidates.registration.stepErrorSummary)).toBeVisible();
    await expect(page.getByLabel(candidates.fields.firstName, { exact: true })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    await expect(page.getByLabel(candidates.fields.email, { exact: true })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    await expect(
      page.getByRole('heading', { name: candidates.registration.steps[0]?.title ?? '' }),
    ).toBeVisible();
  });

  test('shows an invalid email error for malformed addresses', async ({ page }) => {
    await page.getByLabel(candidates.fields.firstName, { exact: true }).fill('Test');
    await page.getByLabel(candidates.fields.lastName, { exact: true }).fill('User');
    await page.getByLabel(candidates.fields.email, { exact: true }).fill('not-an-email');
    await page.getByRole('combobox', { name: candidates.fields.country }).fill('Germany');
    await page.getByRole('combobox', { name: candidates.fields.country }).press('Escape');

    await page.getByRole('button', { name: common.actions.continue }).click();

    await expect(page.getByText(candidates.validation.invalidEmail)).toBeVisible();
    await expect(page.getByLabel(candidates.fields.email, { exact: true })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });
});
