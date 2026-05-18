import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';

import type { RegistrationFormValues } from '@/features/candidates/schemas/registrationSchema';
import { candidatesMessages } from '@/features/candidates/i18n/messages';
import { renderWithIntl } from '@/shared/i18n/test/renderWithIntl';
import { ProgramReviewStep } from '@/features/candidates/registration/components/ProgramReviewStep';
import {
  buildExamWindow,
  buildRegistrationFormValues,
} from '@/features/candidates/test-utils/builders';

const ProgramReviewStepHarness = () => {
  const { register, watch } = useForm<RegistrationFormValues>({
    defaultValues: buildRegistrationFormValues({
      program: 'level_1',
      universityName: 'Example University',
      yearsOfProfessionalExperience: 5,
    }),
  });

  return (
    <ProgramReviewStep
      errors={{}}
      examWindows={[buildExamWindow()]}
      register={register}
      values={watch()}
    />
  );
};

describe('ProgramReviewStep', () => {
  it('renders eligibility hint and summary content', () => {
    renderWithIntl(<ProgramReviewStepHarness />);

    expect(
      screen.getByText(candidatesMessages.eligibility.level1Eligible.title),
    ).toBeInTheDocument();
    expect(screen.getByText(candidatesMessages.registration.summary.title)).toBeInTheDocument();
    expect(screen.getByText(/example university/i)).toBeInTheDocument();
  });

  it('updates program level and shows verification messaging', async () => {
    const user = userEvent.setup();
    renderWithIntl(<ProgramReviewStepHarness />);

    await user.selectOptions(screen.getByLabelText(/program level/i), 'level_2');

    expect(screen.getByText(candidatesMessages.eligibility.level2.message)).toBeInTheDocument();
  });
});
