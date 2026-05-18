import type { FieldErrors } from 'react-hook-form';

import type {
  RegistrationFieldName,
  RegistrationFormValues,
} from '@/features/candidates/schemas/registrationSchema';

export const focusFieldById = (fieldId: string): void => {
  document.getElementById(fieldId)?.focus();
};

export const focusFirstInvalidField = (
  fields: RegistrationFieldName[],
  errors: FieldErrors<RegistrationFormValues>,
  summaryElement: HTMLElement | null,
): void => {
  const firstInvalidField = fields.find((field) => errors[field]);

  if (firstInvalidField) {
    focusFieldById(String(firstInvalidField));
    return;
  }

  summaryElement?.focus();
};
