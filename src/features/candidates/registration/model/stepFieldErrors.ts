import type { FieldErrors } from 'react-hook-form';

import type { RegistrationFormValues } from '@/features/candidates/schemas/registrationSchema';
import type { RegistrationFieldName } from '@/features/candidates/types/registration';

export const pickStepFieldErrors = (
  fields: readonly RegistrationFieldName[],
  allErrors: FieldErrors<RegistrationFormValues>,
): FieldErrors<RegistrationFormValues> => {
  const stepErrors: FieldErrors<RegistrationFormValues> = {};

  for (const field of fields) {
    const error = allErrors[field];
    if (error) {
      stepErrors[field] = error;
    }
  }

  return stepErrors;
};
