import { expect, type Page } from '@playwright/test';

import { e2eMessages } from '../fixtures/messages';
import { setReactInputValue } from './reactInput';

type RegistrationDetails = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  universityName: string;
  graduationYear: string;
  yearsOfExperience: string;
};

let uniqueRegistrationCounter = 0;

export const buildUniqueRegistrationDetails = (): RegistrationDetails => {
  uniqueRegistrationCounter += 1;

  return {
    firstName: 'Elena',
    lastName: 'Meyer',
    email: `e2e.candidate.${uniqueRegistrationCounter}@example.com`,
    country: 'Germany',
    universityName: 'Technical University of Munich',
    graduationYear: String(new Date().getFullYear() - 4),
    yearsOfExperience: '6',
  };
};

export const selectCountry = async (page: Page, country: string): Promise<void> => {
  const countryInput = page.getByRole('combobox', {
    name: e2eMessages.candidates.fields.country,
  });
  await setReactInputValue(countryInput, country);
  await expect(countryInput).toHaveValue(country);
  await countryInput.press('Escape');
  await expect(page.getByRole('listbox')).toHaveCount(0);
};

export const fillEmailAndWaitForAvailabilityCheck = async (
  page: Page,
  email: string,
): Promise<void> => {
  const emailInput = page.getByLabel(e2eMessages.candidates.fields.email, { exact: true });
  const emailCheckResponse = page.waitForResponse(
    (response) =>
      response.url().includes('/api/candidates/check-email') && response.status() === 200,
  );

  await emailInput.click();
  await page.keyboard.insertText(email);
  const response = await emailCheckResponse;
  const availability = (await response.json()) as { available: boolean };

  if (!availability.available) {
    await expect(
      page.getByText(e2eMessages.candidates.registration.emailAlreadyRegistered),
    ).toBeVisible();
  }
};

export const completeRegistration = async (
  page: Page,
  details: RegistrationDetails,
): Promise<void> => {
  const { candidates, common } = e2eMessages;

  await page.getByLabel(candidates.fields.firstName, { exact: true }).fill(details.firstName);
  await page.getByLabel(candidates.fields.lastName, { exact: true }).fill(details.lastName);
  await fillEmailAndWaitForAvailabilityCheck(page, details.email);
  await selectCountry(page, details.country);
  await page.getByRole('button', { name: common.actions.continue }).click();

  await page
    .getByLabel(candidates.fields.universityName, { exact: true })
    .fill(details.universityName);
  await page
    .getByLabel(candidates.fields.graduationYear, { exact: true })
    .fill(details.graduationYear);
  await page
    .getByLabel(candidates.fields.yearsOfProfessionalExperience, { exact: true })
    .fill(details.yearsOfExperience);
  await page.getByRole('button', { name: common.actions.continue }).click();

  await page.locator('#preferredExamWindow').selectOption({ index: 1 });
  await page.getByLabel(candidates.registration.termsLabel).check();
  await page.getByRole('button', { name: candidates.registration.submitRegistration }).click();
};
