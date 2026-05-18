import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { candidatesMessages } from '@/features/candidates/i18n/messages';
import { renderWithIntl } from '@/shared/i18n/test/renderWithIntl';
import { RegistrationWizard } from '@/features/candidates/registration/components/RegistrationWizard';
import {
  buildCandidateSubmissionResponse,
  buildExamWindowsResponse,
  buildRegistrationFormValues,
} from '@/features/candidates/test-utils/builders';
import { createWizardUiState } from '@/features/candidates/test-utils/mocks';
const triggerSubmit = jest.fn();
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
  useSubmitCandidate: () => ({ trigger: triggerSubmit, isMutating: false }),
}));

jest.mock('@/features/candidates/schemas/registrationSchema', () => {
  const actual = jest.requireActual('@/features/candidates/schemas/registrationSchema');
  const { buildRegistrationFormValues: buildValues } = jest.requireActual(
    '@/features/candidates/test-utils/builders',
  );

  return {
    ...actual,
    defaultRegistrationValues: buildValues(),
  };
});

describe('RegistrationWizard submit flow', () => {
  it('shows a success screen after a valid submission', async () => {
    triggerSubmit.mockResolvedValue(
      buildCandidateSubmissionResponse({
        firstName: buildRegistrationFormValues().firstName,
        lastName: buildRegistrationFormValues().lastName,
      }),
    );

    const user = userEvent.setup();
    renderWithIntl(<RegistrationWizard />);

    await user.click(screen.getByRole('button', { name: /submit registration/i }));

    expect(
      await screen.findByRole('heading', { name: candidatesMessages.registration.successTitle }),
    ).toBeInTheDocument();
    const values = buildRegistrationFormValues();
    expect(
      screen.getByText(
        candidatesMessages.registration.successBody(`${values.firstName} ${values.lastName}`),
      ),
    ).toBeInTheDocument();
  });
});
