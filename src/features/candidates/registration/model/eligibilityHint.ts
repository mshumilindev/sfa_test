import { candidatesMessages } from '@/features/candidates/i18n/messages';
import type { HighestDegree, Program } from '@/features/candidates/types/candidate';

export type EligibilityHintTone = 'eligible' | 'notEligible' | 'verificationRequired';

export type EligibilityHint = {
  title: string;
  message: string;
  tone: EligibilityHintTone;
};

type EligibilityInput = {
  program: Program;
  highestDegree: HighestDegree;
  yearsOfProfessionalExperience: number;
};

const degreeEligibleForLevel1 = new Set<HighestDegree>(['bachelor', 'master', 'phd']);

export const getEligibilityHint = ({
  program,
  highestDegree,
  yearsOfProfessionalExperience,
}: EligibilityInput): EligibilityHint => {
  const { eligibility } = candidatesMessages;

  if (program === 'level_2') {
    return {
      title: eligibility.level2.title,
      message: eligibility.level2.message,
      tone: 'verificationRequired',
    };
  }

  if (program === 'level_3') {
    return {
      title: eligibility.level3.title,
      message: eligibility.level3.message,
      tone: 'verificationRequired',
    };
  }

  const isEligible =
    degreeEligibleForLevel1.has(highestDegree) || yearsOfProfessionalExperience >= 4;

  if (isEligible) {
    return {
      title: eligibility.level1Eligible.title,
      message: eligibility.level1Eligible.message,
      tone: 'eligible',
    };
  }

  return {
    title: eligibility.level1NotEligible.title,
    message: eligibility.level1NotEligible.message,
    tone: 'notEligible',
  };
};
