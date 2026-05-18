import { getEligibilityHint } from '@/features/candidates/registration/model/eligibilityHint';
import type { Candidate, CandidateStatus } from '@/features/candidates/types/candidate';
import type { RegistrationFormValues } from '@/features/candidates/schemas/registrationSchema';

export const deriveCandidateStatus = (values: RegistrationFormValues): CandidateStatus => {
  const hint = getEligibilityHint({
    program: values.program,
    highestDegree: values.highestDegree,
    yearsOfProfessionalExperience: values.yearsOfProfessionalExperience,
  });

  if (hint.tone === 'eligible') {
    return 'eligible';
  }

  if (hint.tone === 'notEligible') {
    return 'ineligible';
  }

  return 'pending';
};

export const mapRegistrationToCandidate = (
  values: RegistrationFormValues,
  id: string,
  registrationDate: string,
): Candidate => ({
  id,
  firstName: values.firstName,
  lastName: values.lastName,
  email: values.email,
  phone: values.phone || undefined,
  country: values.country,
  highestDegree: values.highestDegree,
  universityName: values.universityName,
  graduationYear: values.graduationYear,
  yearsOfProfessionalExperience: values.yearsOfProfessionalExperience,
  currentEmployer: values.currentEmployer || undefined,
  program: values.program,
  preferredExamWindow: values.preferredExamWindow,
  status: deriveCandidateStatus(values),
  registrationDate,
});
