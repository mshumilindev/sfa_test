'use client';

import { useTranslations } from 'next-intl';

import { registrationSteps } from '@/features/candidates/components/fieldConfig';

import formStyles from '@/features/candidates/components/RegistrationForm.module.scss';

type WizardProgressProps = {
  currentStep: number;
  isPending: boolean;
  onStepSelect: (step: number) => void | Promise<void>;
};

export const WizardProgress = ({ currentStep, isPending, onStepSelect }: WizardProgressProps) => {
  const t = useTranslations('candidates.registration');

  return (
    <nav aria-label={t('stepsLabel')} className={formStyles.stepper}>
      {registrationSteps.map((step, index) => (
        <button
          aria-current={index === currentStep ? 'step' : undefined}
          className={formStyles.stepButton}
          disabled={isPending || index > currentStep}
          key={step.title}
          onClick={() => {
            void onStepSelect(index);
          }}
          type="button"
        >
          <span className={formStyles.stepNumber}>{index + 1}</span>
          {step.title}
        </button>
      ))}
    </nav>
  );
};
