'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { FieldErrors } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';

import { registrationSteps } from '@/features/candidates/components/fieldConfig';
import { candidateRoutes } from '@/features/candidates/constants/routes';
import { candidatesListKey } from '@/features/candidates/constants/swrKeys';
import {
  useEmailAvailability,
  useSubmitCandidate,
} from '@/features/candidates/hooks/useCandidates';
import { useExamWindows } from '@/features/candidates/hooks/useExamWindows';
import type { ExamWindowsResponse } from '@/features/candidates/types/candidate';
import {
  defaultRegistrationValues,
  registrationSchema,
  type RegistrationFormValues,
} from '@/features/candidates/schemas/registrationSchema';
import { formatCandidateName } from '@/features/candidates/utils/candidateDisplay';
import { pickStepFieldErrors } from '@/features/candidates/registration/model/stepFieldErrors';
import {
  focusFieldById,
  focusFirstInvalidField,
} from '@/features/candidates/utils/registrationWizardFocus';
import type { RegistrationFieldName } from '@/features/candidates/types/registration';
import { useCandidateUiStore } from '@/store/candidateUiStore';

import { EducationExperienceStep } from './EducationExperienceStep';
import { PersonalInfoStep } from './PersonalInfoStep';
import { ProgramReviewStep } from './ProgramReviewStep';
import { WizardProgress } from './WizardProgress';
import formStyles from '@/features/candidates/components/RegistrationForm.module.scss';
import styles from './RegistrationSteps.module.scss';

type RegistrationWizardProps = {
  initialExamWindows?: ExamWindowsResponse;
};

export const RegistrationWizard = ({ initialExamWindows }: RegistrationWizardProps) => {
  const tRegistration = useTranslations('candidates.registration');
  const tCommon = useTranslations('common.actions');
  const currentStep = useCandidateUiStore((state) => state.currentStep);
  const setCurrentStep = useCandidateUiStore((state) => state.setCurrentStep);
  const nextStep = useCandidateUiStore((state) => state.nextStep);
  const previousStep = useCandidateUiStore((state) => state.previousStep);
  const [submittedCandidateName, setSubmittedCandidateName] = useState<string | null>(null);
  const [validatedStepIndexes, setValidatedStepIndexes] = useState<ReadonlySet<number>>(
    () => new Set(),
  );
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const submitMutation = useSubmitCandidate();
  const examWindowsQuery = useExamWindows(initialExamWindows);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: defaultRegistrationValues,
    mode: 'onBlur',
  });

  const {
    register,
    control,
    handleSubmit,
    trigger,
    watch,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = form;

  const formValues = watch();
  const watchedEmail = watch('email');
  const emailCheck = useEmailAvailability(watchedEmail);
  const shouldCheckEmail = watchedEmail.trim().length > 5 && watchedEmail.includes('@');
  const isEmailCheckPending =
    shouldCheckEmail &&
    (emailCheck.isLoading || emailCheck.isValidating || emailCheck.data === undefined);
  const activeStep = registrationSteps[currentStep];
  const isReviewStep = currentStep === registrationSteps.length - 1;
  const hasAttemptedCurrentStep =
    validatedStepIndexes.has(currentStep) || (isReviewStep && hasAttemptedSubmit);
  const visibleStepErrors = hasAttemptedCurrentStep
    ? pickStepFieldErrors(activeStep.fields, errors)
    : ({} as FieldErrors<RegistrationFormValues>);
  const hasStepErrors = activeStep.fields.some((field) => visibleStepErrors[field]);

  const isDuplicateEmail = emailCheck.data?.available === false;

  const emailFieldError = isDuplicateEmail
    ? { type: 'validate' as const, message: tRegistration('emailAlreadyRegistered') }
    : hasAttemptedCurrentStep
      ? visibleStepErrors.email
      : undefined;

  const markStepValidated = useCallback((stepIndex: number) => {
    setValidatedStepIndexes((previous) => new Set(previous).add(stepIndex));
  }, []);

  const clearValidatedStepsAfter = useCallback((stepIndex: number) => {
    setValidatedStepIndexes((previous) => {
      const next = new Set(previous);
      for (const index of next) {
        if (index > stepIndex) {
          next.delete(index);
        }
      }
      return next;
    });
  }, []);

  useEffect(() => {
    headingRef.current?.focus();
  }, [currentStep]);

  useEffect(() => {
    if (!validatedStepIndexes.has(currentStep)) {
      clearErrors(registrationSteps[currentStep].fields as RegistrationFieldName[]);
    }
  }, [clearErrors, currentStep, validatedStepIndexes]);

  const validateStep = async (stepIndex: number): Promise<boolean> => {
    const stepFields = registrationSteps[stepIndex].fields;
    markStepValidated(stepIndex);
    const isValid = await trigger(stepFields, { shouldFocus: true });

    if (!isValid) {
      const latestErrors = pickStepFieldErrors(stepFields, form.formState.errors);
      focusFirstInvalidField(stepFields, latestErrors, summaryRef.current);
      return false;
    }

    if (stepIndex === 0 && isEmailCheckPending) {
      focusFieldById('email');
      return false;
    }

    if (stepIndex === 0 && emailCheck.data?.available === false) {
      focusFieldById('email');
      return false;
    }

    return true;
  };

  const handleStepSelect = async (targetStep: number) => {
    if (targetStep === currentStep || isSubmitting) {
      return;
    }

    if (targetStep < currentStep) {
      clearValidatedStepsAfter(targetStep);
      setCurrentStep(targetStep);
      return;
    }

    for (let step = currentStep; step < targetStep; step += 1) {
      const isValid = await validateStep(step);

      if (!isValid) {
        setCurrentStep(step);
        return;
      }
    }

    setCurrentStep(targetStep);
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);

    if (!isValid) {
      return;
    }

    nextStep();
  };

  const handleInvalidSubmit = () => {
    setHasAttemptedSubmit(true);
    markStepValidated(currentStep);
    const latestErrors = pickStepFieldErrors(activeStep.fields, form.formState.errors);
    focusFirstInvalidField(activeStep.fields, latestErrors, summaryRef.current);
  };

  const onSubmit = async (values: RegistrationFormValues) => {
    if (isEmailCheckPending || emailCheck.data?.available === false) {
      markStepValidated(0);
      focusFieldById('email');
      return;
    }

    try {
      const response = await submitMutation.trigger(values);
      await mutate(candidatesListKey);
      reset(defaultRegistrationValues);
      setCurrentStep(0);
      setValidatedStepIndexes(new Set());
      setHasAttemptedSubmit(false);
      setSubmittedCandidateName(formatCandidateName(response.candidate));
    } catch {
      // Errors are surfaced through the shared Axios toast layer.
    }
  };

  if (submittedCandidateName) {
    return (
      <section className={styles.successPanel} aria-labelledby="registration-success-title">
        <h1 id="registration-success-title">{tRegistration('successTitle')}</h1>
        <p>{tRegistration('successBody', { candidateName: submittedCandidateName })}</p>
        <Link className={styles.successLink} href={candidateRoutes.dashboard}>
          {tRegistration('returnToDashboard')}
        </Link>
      </section>
    );
  }

  return (
    <form
      className={formStyles.form}
      noValidate
      onSubmit={handleSubmit(onSubmit, handleInvalidSubmit)}
    >
      <WizardProgress
        currentStep={currentStep}
        isPending={isSubmitting}
        onStepSelect={handleStepSelect}
      />

      <div className={formStyles.stepHeader}>
        <h1 className={formStyles.stepTitle} ref={headingRef} tabIndex={-1}>
          {activeStep.title}
        </h1>
        <p className={formStyles.stepDescription}>{activeStep.description}</p>
      </div>

      {hasStepErrors ? (
        <div className={formStyles.summary} ref={summaryRef} role="alert" tabIndex={-1}>
          {tRegistration('stepErrorSummary')}
        </div>
      ) : null}

      {currentStep === 0 ? (
        <PersonalInfoStep
          control={control}
          emailFieldError={emailFieldError}
          errors={visibleStepErrors}
          register={register}
        />
      ) : null}

      {currentStep === 1 ? (
        <EducationExperienceStep errors={visibleStepErrors} register={register} />
      ) : null}

      {currentStep === 2 ? (
        <ProgramReviewStep
          errors={visibleStepErrors}
          examWindows={examWindowsQuery.data?.examWindows ?? []}
          register={register}
          values={formValues}
        />
      ) : null}

      <div className={formStyles.actions}>
        {currentStep === 0 ? (
          isSubmitting ? (
            <span aria-disabled="true" className={formStyles.secondaryButton}>
              {tRegistration('backToDashboard')}
            </span>
          ) : (
            <Link className={formStyles.secondaryButton} href={candidateRoutes.dashboard}>
              {tRegistration('backToDashboard')}
            </Link>
          )
        ) : (
          <button
            className={formStyles.secondaryButton}
            disabled={currentStep === 0 || isSubmitting}
            onClick={previousStep}
            type="button"
          >
            {tCommon('back')}
          </button>
        )}
        {currentStep < registrationSteps.length - 1 ? (
          <button
            aria-busy={isSubmitting || isEmailCheckPending}
            className={formStyles.primaryButton}
            disabled={isSubmitting || (currentStep === 0 && isEmailCheckPending)}
            onClick={handleNext}
            type="button"
          >
            {isSubmitting ? tCommon('processing') : tCommon('continue')}
          </button>
        ) : (
          <button
            aria-busy={isSubmitting}
            className={formStyles.primaryButton}
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? tCommon('submitting') : tRegistration('submitRegistration')}
          </button>
        )}
      </div>
    </form>
  );
};
