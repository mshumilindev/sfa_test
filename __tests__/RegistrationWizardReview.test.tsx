import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { candidatesMessages } from '@/features/candidates/i18n/messages';
import { RegistrationWizard } from '@/features/candidates/registration/components/RegistrationWizard';
import { renderWithIntl } from '@/shared/i18n/test/renderWithIntl';
import { buildExamWindowsResponse } from '@/features/candidates/test-utils/builders';
import { createWizardUiState } from '@/features/candidates/test-utils/mocks';

const uiState = createWizardUiState(2);

jest.mock('@/store/candidateUiStore', () => ({
  useCandidateUiStore: (selector: (state: typeof uiState) => unknown) => selector(uiState),
}));

jest.mock('swr', () => ({
  mutate: jest.fn(),
}));

jest.mock('@/features/candidates/hooks/useExamWindows', () => ({
  useExamWindows: () => ({
    data: buildExamWindowsResponse(),
    isLoading: false,
  }),
}));

jest.mock('@/features/candidates/hooks/useCandidates', () => ({
  useEmailAvailability: () => ({ data: { available: true }, isLoading: false }),
  useSubmitCandidate: () => ({ trigger: jest.fn(), isMutating: false }),
}));

describe('RegistrationWizard review step', () => {
  it('does not show validation errors before the user attempts to submit or continue', () => {
    renderWithIntl(<RegistrationWizard />);

    expect(
      screen.queryByText(candidatesMessages.registration.stepErrorSummary),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(candidatesMessages.validation.examWindowRequired),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(candidatesMessages.validation.termsRequired)).not.toBeInTheDocument();
  });

  it('updates eligibility hint when program changes on the review step', async () => {
    const user = userEvent.setup();
    renderWithIntl(<RegistrationWizard />);

    expect(
      screen.getByText(candidatesMessages.eligibility.level1Eligible.title),
    ).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText(/program level/i), 'level_2');

    expect(screen.getByText(candidatesMessages.eligibility.level2.message)).toBeInTheDocument();
  });
});
