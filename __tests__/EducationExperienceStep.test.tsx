import { screen } from '@testing-library/react';
import { renderWithIntl } from '@/shared/i18n/test/renderWithIntl';
import { useForm } from 'react-hook-form';

import { EducationExperienceStep } from '@/features/candidates/registration/components/EducationExperienceStep';
import { defaultRegistrationValues } from '@/features/candidates/schemas/registrationSchema';
import type { RegistrationFormValues } from '@/features/candidates/schemas/registrationSchema';

const EducationExperienceStepHarness = () => {
  const {
    register,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    defaultValues: defaultRegistrationValues,
  });

  return <EducationExperienceStep errors={errors} register={register} />;
};

describe('EducationExperienceStep', () => {
  it('renders education and experience inputs', () => {
    renderWithIntl(<EducationExperienceStepHarness />);

    expect(screen.getByLabelText(/highest degree/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/university name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/years of professional experience/i)).toBeInTheDocument();
  });
});
