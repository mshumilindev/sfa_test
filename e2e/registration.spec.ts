import { expect, test } from '@playwright/test';

import { e2eMessages } from './fixtures/messages';
import {
  buildUniqueRegistrationDetails,
  completeRegistration,
  fillEmailAndWaitForAvailabilityCheck,
  selectCountry,
} from './helpers/registration';

const { candidates } = e2eMessages;

test.describe('Candidate registration', () => {
  test('completes the full registration flow', async ({ page }) => {
    const details = buildUniqueRegistrationDetails();

    await page.goto('/candidates/register');
    await completeRegistration(page, details);

    const successPanel = page.locator('section[aria-labelledby="registration-success-title"]');
    await expect(
      successPanel.getByRole('heading', { name: candidates.registration.successTitle }),
    ).toBeVisible();
    await expect(successPanel).toContainText(
      candidates.registration.successBody.replace(
        '{candidateName}',
        `${details.firstName} ${details.lastName}`,
      ),
    );

    await page.getByRole('link', { name: candidates.registration.returnToDashboard }).click();
    await expect(
      page.getByRole('cell', { name: `${details.firstName} ${details.lastName}` }),
    ).toBeVisible();
  });

  test('blocks duplicate email registration before submit', async ({ page }) => {
    await page.goto('/candidates/register');

    await page.getByLabel(candidates.fields.firstName, { exact: true }).fill('Ava');
    await page.getByLabel(candidates.fields.lastName, { exact: true }).fill('Kowalski');
    await fillEmailAndWaitForAvailabilityCheck(page, 'ava.kowalski@example.com');
    await selectCountry(page, 'Poland');

    await expect(page.getByText(candidates.registration.emailAlreadyRegistered)).toBeVisible();
    await expect(
      page.getByRole('button', { name: e2eMessages.common.actions.continue }),
    ).toBeEnabled();

    await page.getByRole('button', { name: e2eMessages.common.actions.continue }).click();
    await expect(
      page.getByRole('heading', { name: candidates.registration.steps[0]?.title ?? '' }),
    ).toBeVisible();
  });
});
