import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { candidatesMessages } from '@/features/candidates/i18n/messages';
import { RegistrationWizard } from '@/features/candidates/registration/components/RegistrationWizard';
import { buildRegistrationFormValues } from '@/features/candidates/test-utils/builders';
import { renderWithIntl } from '@/shared/i18n/test/renderWithIntl';
import { useCandidateUiStore } from '@/store/candidateUiStore';

const triggerSubmit = jest.fn();
const emailAvailability = { available: true, isLoading: false };

jest.mock('swr', () => ({
  mutate: jest.fn(),
}));

jest.mock('@/features/candidates/hooks/useCandidates', () => ({
  useEmailAvailability: () => ({ data: emailAvailability, isLoading: emailAvailability.isLoading }),
  useSubmitCandidate: () => ({ trigger: triggerSubmit, isMutating: false }),
}));

jest.mock('@/features/candidates/hooks/useExamWindows', () => {
  const { buildExamWindowsResponse } = jest.requireActual(
    '@/features/candidates/test-utils/builders',
  );

  return {
    useExamWindows: () => ({
      data: buildExamWindowsResponse(),
      isLoading: false,
    }),
  };
});

const fillEducationStep = async (user: ReturnType<typeof userEvent.setup>) => {
  const values = buildRegistrationFormValues();

  await user.clear(screen.getByLabelText(/university name/i));
  await user.type(screen.getByLabelText(/university name/i), values.universityName);
  await user.clear(screen.getByLabelText(/graduation year/i));
  await user.type(screen.getByLabelText(/graduation year/i), String(values.graduationYear));
  await user.clear(screen.getByLabelText(/years of professional experience/i));
  await user.type(
    screen.getByLabelText(/years of professional experience/i),
    String(values.yearsOfProfessionalExperience),
  );
};

const fillPersonalInformationStep = async (
  user: ReturnType<typeof userEvent.setup>,
  values = buildRegistrationFormValues({
    email: 'candidate.new@example.com',
  }),
) => {
  await user.clear(screen.getByLabelText(/first name/i));
  await user.type(screen.getByLabelText(/first name/i), values.firstName);
  await user.clear(screen.getByLabelText(/last name/i));
  await user.type(screen.getByLabelText(/last name/i), values.lastName);
  await user.clear(screen.getByLabelText(/email address/i));
  await user.type(screen.getByLabelText(/email address/i), values.email);

  const countryInput = screen.getByLabelText(/country of residence/i);
  await user.clear(countryInput);
  await user.type(countryInput, values.country);
  await user.click(screen.getByRole('option', { name: values.country }));
};

describe('RegistrationWizard', () => {
  beforeEach(() => {
    useCandidateUiStore.setState({ currentStep: 0 });
    emailAvailability.available = true;
    emailAvailability.isLoading = false;
    triggerSubmit.mockReset();
  });

  it('focuses the first invalid field when continuing from an empty step', async () => {
    const user = userEvent.setup();
    renderWithIntl(<RegistrationWizard />);

    await user.click(screen.getByRole('button', { name: /continue/i }));

    expect(screen.getByLabelText(/first name/i)).toHaveFocus();
    expect(screen.getByText(candidatesMessages.registration.stepErrorSummary)).toBeInTheDocument();
  });

  it('does not allow jumping to step 3 from empty step 1 through the stepper', () => {
    renderWithIntl(<RegistrationWizard />);

    expect(
      screen.getByRole('button', {
        name: new RegExp(candidatesMessages.registration.steps[2]?.title ?? '', 'i'),
      }),
    ).toBeDisabled();
  });

  it('preserves entered values when navigating back from the next step', async () => {
    const user = userEvent.setup();
    const values = buildRegistrationFormValues({ email: 'preserve.data@example.com' });
    renderWithIntl(<RegistrationWizard />);

    await fillPersonalInformationStep(user, values);
    await user.click(screen.getByRole('button', { name: /continue/i }));

    expect(
      screen.getByRole('heading', { name: candidatesMessages.registration.steps[1]?.title }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /back/i }));

    expect(screen.getByLabelText(/first name/i)).toHaveValue(values.firstName);
    expect(screen.getByLabelText(/last name/i)).toHaveValue(values.lastName);
    expect(screen.getByLabelText(/email address/i)).toHaveValue(values.email);
    expect(screen.getByLabelText(/country of residence/i)).toHaveValue(values.country);
  });

  it('blocks continue while email availability is still pending', async () => {
    const user = userEvent.setup();
    emailAvailability.isLoading = true;
    emailAvailability.available = true;
    renderWithIntl(<RegistrationWizard />);

    await fillPersonalInformationStep(
      user,
      buildRegistrationFormValues({ email: 'pending.check@example.com' }),
    );

    expect(screen.getByRole('button', { name: /continue/i })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: /continue/i }));

    expect(
      screen.getByRole('heading', { name: candidatesMessages.registration.steps[0]?.title }),
    ).toBeInTheDocument();
  });

  it('does not show step 3 validation errors before continue or submit is attempted', async () => {
    const user = userEvent.setup();
    renderWithIntl(<RegistrationWizard />);

    await fillPersonalInformationStep(user);
    await user.click(screen.getByRole('button', { name: /continue/i }));
    await fillEducationStep(user);
    await user.click(screen.getByRole('button', { name: /continue/i }));

    expect(
      screen.getByRole('heading', { name: candidatesMessages.registration.steps[2]?.title }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(candidatesMessages.registration.stepErrorSummary),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(candidatesMessages.validation.examWindowRequired),
    ).not.toBeInTheDocument();
  });

  it('shows step 3 validation errors after submit is attempted with missing fields', async () => {
    const user = userEvent.setup();
    renderWithIntl(<RegistrationWizard />);

    await fillPersonalInformationStep(user);
    await user.click(screen.getByRole('button', { name: /continue/i }));
    await fillEducationStep(user);
    await user.click(screen.getByRole('button', { name: /continue/i }));

    await user.click(screen.getByRole('button', { name: /submit registration/i }));

    expect(screen.getByText(candidatesMessages.registration.stepErrorSummary)).toBeInTheDocument();
    expect(screen.getByText(candidatesMessages.validation.examWindowRequired)).toBeInTheDocument();
  });

  it('shows duplicate email feedback after availability check without clicking continue', async () => {
    const user = userEvent.setup();
    emailAvailability.available = false;
    renderWithIntl(<RegistrationWizard />);

    await fillPersonalInformationStep(
      user,
      buildRegistrationFormValues({ email: 'ava.kowalski@example.com' }),
    );

    expect(
      screen.getByText(candidatesMessages.registration.emailAlreadyRegistered),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(candidatesMessages.registration.stepErrorSummary),
    ).not.toBeInTheDocument();
  });

  it('blocks continue and shows an inline email error when the address is unavailable', async () => {
    const user = userEvent.setup();
    emailAvailability.available = false;
    renderWithIntl(<RegistrationWizard />);

    await fillPersonalInformationStep(
      user,
      buildRegistrationFormValues({ email: 'ava.kowalski@example.com' }),
    );
    await user.click(screen.getByRole('button', { name: /continue/i }));

    expect(
      screen.getByText(candidatesMessages.registration.emailAlreadyRegistered),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: candidatesMessages.registration.steps[0]?.title }),
    ).toBeInTheDocument();
  });
});
