'use client';

import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { FormField, TextInput } from '@/features/candidates/components/FormField';
import { registrationFieldLabels } from '@/features/candidates/components/fieldConfig';
import { CountryCombobox } from '@/features/candidates/components/CountryCombobox';
import type { RegistrationFormValues } from '@/features/candidates/schemas/registrationSchema';

import styles from './RegistrationSteps.module.scss';

type PersonalInfoStepProps = {
  register: UseFormRegister<RegistrationFormValues>;
  control: Control<RegistrationFormValues>;
  errors: FieldErrors<RegistrationFormValues>;
  emailFieldError?: FieldErrors<RegistrationFormValues>['email'];
};

export const PersonalInfoStep = ({
  register,
  control,
  errors,
  emailFieldError,
}: PersonalInfoStepProps) => {
  const t = useTranslations('candidates.registration');

  return (
    <div className={styles.grid}>
      <FormField id="firstName" label={registrationFieldLabels.firstName} error={errors.firstName}>
        {(field) => <TextInput id="firstName" registration={register('firstName')} {...field} />}
      </FormField>
      <FormField id="lastName" label={registrationFieldLabels.lastName} error={errors.lastName}>
        {(field) => <TextInput id="lastName" registration={register('lastName')} {...field} />}
      </FormField>
      <FormField id="email" label={registrationFieldLabels.email} error={emailFieldError}>
        {(field) => (
          <TextInput id="email" type="email" registration={register('email')} {...field} />
        )}
      </FormField>
      <FormField
        id="phone"
        label={registrationFieldLabels.phone}
        error={errors.phone}
        hint={t('phoneHint')}
      >
        {(field) => <TextInput id="phone" type="tel" registration={register('phone')} {...field} />}
      </FormField>
      <div className={styles.fieldWide}>
        <FormField id="country" label={registrationFieldLabels.country} error={errors.country}>
          {(field) => (
            <Controller
              control={control}
              name="country"
              render={({ field: controllerField }) => (
                <CountryCombobox
                  describedBy={field.describedBy}
                  id="country"
                  invalid={field.invalid}
                  onBlur={controllerField.onBlur}
                  onChange={controllerField.onChange}
                  value={controllerField.value}
                />
              )}
            />
          )}
        </FormField>
      </div>
    </div>
  );
};
