'use client';

import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { programOptions } from '@/features/candidates/constants/domainOptions';
import { FormField } from '@/features/candidates/components/FormField';
import { registrationFieldLabels } from '@/features/candidates/components/fieldConfig';
import { getEligibilityHint } from '@/features/candidates/registration/model/eligibilityHint';
import type { RegistrationFormValues } from '@/features/candidates/schemas/registrationSchema';
import type { ExamWindow } from '@/features/candidates/types/candidate';

import { EligibilityHint } from './EligibilityHint';
import { RegistrationSummary } from './RegistrationSummary';
import styles from './RegistrationSteps.module.scss';
import formStyles from '@/features/candidates/components/RegistrationForm.module.scss';

type ProgramReviewStepProps = {
  register: UseFormRegister<RegistrationFormValues>;
  errors: FieldErrors<RegistrationFormValues>;
  values: RegistrationFormValues;
  examWindows: ExamWindow[];
};

export const ProgramReviewStep = ({
  register,
  errors,
  values,
  examWindows,
}: ProgramReviewStepProps) => {
  const t = useTranslations('candidates.registration');
  const eligibilityHint = getEligibilityHint({
    program: values.program,
    highestDegree: values.highestDegree,
    yearsOfProfessionalExperience: values.yearsOfProfessionalExperience,
  });

  const examWindowLabel =
    examWindows.find((window) => window.id === values.preferredExamWindow)?.label ??
    t('examWindowNotSelected');

  return (
    <div className={styles.grid}>
      <FormField id="program" label={registrationFieldLabels.program} error={errors.program}>
        {(field) => (
          <select
            id="program"
            className={styles.select}
            aria-describedby={field.describedBy}
            aria-invalid={field.invalid}
            {...register('program')}
          >
            {programOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </FormField>
      <FormField
        id="preferredExamWindow"
        label={registrationFieldLabels.preferredExamWindow}
        error={errors.preferredExamWindow}
      >
        {(field) => (
          <select
            id="preferredExamWindow"
            className={styles.select}
            aria-describedby={field.describedBy}
            aria-invalid={field.invalid}
            {...register('preferredExamWindow')}
          >
            <option value="">{t('examWindowPlaceholder')}</option>
            {examWindows.map((window) => (
              <option key={window.id} value={window.id}>
                {window.label}
              </option>
            ))}
          </select>
        )}
      </FormField>
      <div className={styles.fieldWide}>
        <EligibilityHint hint={eligibilityHint} />
      </div>
      <div className={styles.fieldWide}>
        <RegistrationSummary examWindowLabel={examWindowLabel} values={values} />
      </div>
      <div className={`${styles.fieldWide} ${styles.termsField}`}>
        <div className={formStyles.checkboxRow}>
          <input
            id="acceptsTerms"
            type="checkbox"
            aria-describedby={errors.acceptsTerms ? 'acceptsTerms-error' : undefined}
            aria-invalid={Boolean(errors.acceptsTerms)}
            {...register('acceptsTerms')}
          />
          <label htmlFor="acceptsTerms">{t('termsLabel')}</label>
        </div>
        <p
          className={formStyles.error}
          id={errors.acceptsTerms ? 'acceptsTerms-error' : undefined}
          role={errors.acceptsTerms ? 'alert' : undefined}
          aria-hidden={errors.acceptsTerms ? undefined : true}
        >
          {errors.acceptsTerms?.message}
        </p>
      </div>
    </div>
  );
};
