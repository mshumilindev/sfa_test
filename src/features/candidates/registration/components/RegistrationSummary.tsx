'use client';

import { useTranslations } from 'next-intl';

import { candidatesMessages } from '@/features/candidates/i18n/messages';
import type { RegistrationFormValues } from '@/features/candidates/schemas/registrationSchema';
import {
  degreeLabels,
  formatCandidateName,
  programLabels,
} from '@/features/candidates/utils/candidateDisplay';

import styles from './RegistrationSteps.module.scss';

type RegistrationSummaryProps = {
  values: RegistrationFormValues;
  examWindowLabel: string;
};

export const RegistrationSummary = ({ values, examWindowLabel }: RegistrationSummaryProps) => {
  const t = useTranslations('candidates.registration.summary');

  return (
    <section aria-labelledby="registration-summary-title" className={styles.summaryCard}>
      <h2 id="registration-summary-title">{t('title')}</h2>
      <dl className={styles.summaryList}>
        <div>
          <dt>{t('name')}</dt>
          <dd>{formatCandidateName(values)}</dd>
        </div>
        <div>
          <dt>{t('email')}</dt>
          <dd>{values.email}</dd>
        </div>
        {values.phone ? (
          <div>
            <dt>{t('phone')}</dt>
            <dd>{values.phone}</dd>
          </div>
        ) : null}
        <div>
          <dt>{t('country')}</dt>
          <dd>{values.country}</dd>
        </div>
        <div>
          <dt>{t('highestDegree')}</dt>
          <dd>{degreeLabels[values.highestDegree]}</dd>
        </div>
        <div>
          <dt>{t('university')}</dt>
          <dd>{values.universityName}</dd>
        </div>
        <div>
          <dt>{t('graduationYear')}</dt>
          <dd>{values.graduationYear}</dd>
        </div>
        <div>
          <dt>{t('experience')}</dt>
          <dd>
            {candidatesMessages.registration.experienceYears(values.yearsOfProfessionalExperience)}
          </dd>
        </div>
        {values.currentEmployer ? (
          <div>
            <dt>{t('employer')}</dt>
            <dd>{values.currentEmployer}</dd>
          </div>
        ) : null}
        <div>
          <dt>{t('program')}</dt>
          <dd>{programLabels[values.program]}</dd>
        </div>
        <div>
          <dt>{t('examWindow')}</dt>
          <dd>{examWindowLabel}</dd>
        </div>
      </dl>
    </section>
  );
};
