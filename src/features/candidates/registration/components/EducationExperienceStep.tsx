'use client';

import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { degreeOptions } from '@/features/candidates/constants/domainOptions';
import { FormField, TextInput } from '@/features/candidates/components/FormField';
import { registrationFieldLabels } from '@/features/candidates/components/fieldConfig';
import { candidatesMessages } from '@/features/candidates/i18n/messages';
import type { RegistrationFormValues } from '@/features/candidates/schemas/registrationSchema';
import { getGraduationYearBounds } from '@/shared/lib/date';

import styles from './RegistrationSteps.module.scss';

type EducationExperienceStepProps = {
  register: UseFormRegister<RegistrationFormValues>;
  errors: FieldErrors<RegistrationFormValues>;
};

export const EducationExperienceStep = ({ register, errors }: EducationExperienceStepProps) => {
  const t = useTranslations('candidates.registration');
  const { minYear, maxYear } = getGraduationYearBounds();

  return (
    <div className={styles.grid}>
      <FormField
        id="highestDegree"
        label={registrationFieldLabels.highestDegree}
        error={errors.highestDegree}
      >
        {(field) => (
          <select
            id="highestDegree"
            className={styles.select}
            aria-describedby={field.describedBy}
            aria-invalid={field.invalid}
            {...register('highestDegree')}
          >
            {degreeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </FormField>
      <FormField
        id="universityName"
        label={registrationFieldLabels.universityName}
        error={errors.universityName}
      >
        {(field) => (
          <TextInput id="universityName" registration={register('universityName')} {...field} />
        )}
      </FormField>
      <FormField
        id="graduationYear"
        label={registrationFieldLabels.graduationYear}
        error={errors.graduationYear}
        hint={candidatesMessages.validation.graduationYearHint(minYear, maxYear)}
      >
        {(field) => (
          <TextInput
            id="graduationYear"
            type="number"
            registration={register('graduationYear')}
            {...field}
          />
        )}
      </FormField>
      <FormField
        id="yearsOfProfessionalExperience"
        label={registrationFieldLabels.yearsOfProfessionalExperience}
        error={errors.yearsOfProfessionalExperience}
      >
        {(field) => (
          <TextInput
            id="yearsOfProfessionalExperience"
            type="number"
            registration={register('yearsOfProfessionalExperience')}
            {...field}
          />
        )}
      </FormField>
      <FormField
        id="currentEmployer"
        label={registrationFieldLabels.currentEmployer}
        error={errors.currentEmployer}
        hint={t('optionalHint')}
      >
        {(field) => (
          <TextInput id="currentEmployer" registration={register('currentEmployer')} {...field} />
        )}
      </FormField>
    </div>
  );
};
