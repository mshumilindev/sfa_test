import { candidatesMessages } from '@/features/candidates/i18n/messages';
import type { RegistrationFieldName } from '@/features/candidates/types/registration';

export type RegistrationStep = {
  title: string;
  description: string;
  fields: RegistrationFieldName[];
};

export const registrationFieldLabels: Record<RegistrationFieldName, string> =
  candidatesMessages.fields;

export const registrationSteps: RegistrationStep[] = candidatesMessages.registration.steps.map(
  (step) => ({
    title: step.title,
    description: step.description,
    fields: [...step.fields] as RegistrationFieldName[],
  }),
);
