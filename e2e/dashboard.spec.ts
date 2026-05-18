import { expect, test } from '@playwright/test';

import { e2eMessages } from './fixtures/messages';

const { candidates, common } = e2eMessages;

test.describe('Candidate dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/candidates');
  });

  test('renders seeded candidates', async ({ page }) => {
    await expect(page.getByRole('heading', { name: candidates.dashboard.title })).toBeVisible();
    await expect(
      page.getByRole('table', { name: candidates.dashboard.table.caption }),
    ).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Ava Kowalski' })).toBeVisible();
  });

  test('filters, sorts, and paginates results', async ({ page }) => {
    const searchInput = page.getByRole('searchbox', { name: candidates.dashboard.nameLabel });
    await searchInput.click();
    await page.keyboard.insertText('Kowalski');
    await expect(page.locator('tbody tr')).toHaveCount(1);
    await expect(page.getByRole('cell', { name: 'Ava Kowalski' })).toBeVisible();

    await searchInput.fill('');
    await page.getByLabel(candidates.dashboard.programLabel).selectOption({ label: 'Level I' });
    await expect(page.getByRole('cell', { name: 'Marek Nowak' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Ava Kowalski' })).toHaveCount(0);

    await page.getByLabel(candidates.dashboard.programLabel).selectOption({
      label: candidates.filters.allPrograms,
    });
    await page.getByLabel(candidates.dashboard.statusLabel).selectOption({ label: 'Eligible' });
    await expect(page.getByRole('cell', { name: 'Ava Kowalski' })).toBeVisible();
    await page.getByLabel(candidates.dashboard.statusLabel).selectOption({
      label: candidates.filters.allStatuses,
    });
    await page.getByLabel(candidates.dashboard.sortLabel).selectOption({
      label: candidates.filters.sort.nameAsc,
    });

    const nameCells = page.locator('tbody tr td:first-child');
    const names = await nameCells.allTextContents();
    expect(names).toEqual([...names].sort((left, right) => left.localeCompare(right)));

    await page.getByLabel(candidates.dashboard.sortLabel).selectOption({
      label: candidates.filters.sort.registrationDateDesc,
    });
    await expect(page.getByLabel(candidates.dashboard.paginationLabel)).toContainText(
      'Page 1 of 2',
    );
    await page
      .getByLabel(candidates.dashboard.paginationLabel)
      .getByRole('button', { name: common.actions.next })
      .click();
    await expect(page.getByLabel(candidates.dashboard.paginationLabel)).toContainText(
      'Page 2 of 2',
    );
    await page
      .getByLabel(candidates.dashboard.paginationLabel)
      .getByRole('button', { name: common.actions.previous })
      .click();
    await expect(page.getByLabel(candidates.dashboard.paginationLabel)).toContainText(
      'Page 1 of 2',
    );
  });
});
