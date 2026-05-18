import type { RegistrationFormValues } from '@/features/candidates/schemas/registrationSchema';
import type {
  Candidate,
  CandidateListResponse,
  CandidateSubmissionResponse,
  ExamWindow,
  ExamWindowsResponse,
} from '@/features/candidates/types/candidate';
import { getGraduationYearBounds } from '@/shared/lib/date';

export const buildExamWindow = (overrides: Partial<ExamWindow> = {}): ExamWindow => ({
  id: '2026-11',
  label: 'November 2026',
  startDate: '2026-11-01T00:00:00.000Z',
  ...overrides,
});

export const buildCandidate = (overrides: Partial<Candidate> = {}): Candidate => {
  const { maxYear } = getGraduationYearBounds();

  return {
    id: 'cand-test-1',
    firstName: 'Ava',
    lastName: 'Kowalski',
    email: 'ava.kowalski@example.com',
    country: 'Poland',
    highestDegree: 'master',
    universityName: 'University of Warsaw',
    graduationYear: maxYear - 8,
    yearsOfProfessionalExperience: 6,
    program: 'level_2',
    preferredExamWindow: '2026-11',
    status: 'eligible',
    registrationDate: '2026-05-14T10:30:00.000Z',
    ...overrides,
  };
};

export const buildAmyCandidate = (): Candidate =>
  buildCandidate({
    id: '1',
    firstName: 'Amy',
    lastName: 'Baker',
    email: 'amy@example.com',
    country: 'Canada',
    universityName: 'Toronto Tech',
    graduationYear: 2018,
    program: 'level_2',
    preferredExamWindow: '2026-10',
    status: 'pending',
    registrationDate: '2026-05-12T00:00:00.000Z',
  });

export const buildZoeCandidate = (): Candidate =>
  buildCandidate({
    id: '2',
    firstName: 'Zoe',
    lastName: 'Adams',
    email: 'zoe@example.com',
    country: 'United States',
    highestDegree: 'bachelor',
    universityName: 'State University',
    graduationYear: 2020,
    yearsOfProfessionalExperience: 4,
    program: 'level_1',
    preferredExamWindow: '2026-09',
    status: 'eligible',
    registrationDate: '2026-05-10T00:00:00.000Z',
  });

export const buildRegistrationFormValues = (
  overrides: Partial<RegistrationFormValues> = {},
): RegistrationFormValues => {
  const { maxYear } = getGraduationYearBounds();

  return {
    firstName: 'Elena',
    lastName: 'Meyer',
    email: 'elena.meyer@example.com',
    phone: '+49151444555',
    country: 'Germany',
    highestDegree: 'master',
    universityName: 'Technical University of Munich',
    graduationYear: maxYear - 4,
    yearsOfProfessionalExperience: 6,
    currentEmployer: 'Alpine Analytics',
    program: 'level_2',
    preferredExamWindow: '2026-11',
    acceptsTerms: true,
    ...overrides,
  };
};

export const buildCandidateListResponse = (
  candidates: Candidate[] = [buildAmyCandidate(), buildZoeCandidate()],
): CandidateListResponse => ({
  candidates,
  total: candidates.length,
});

export const buildCandidateSubmissionResponse = (
  overrides: Partial<Candidate> = {},
): CandidateSubmissionResponse => ({
  candidate: buildCandidate(overrides),
});

export const buildExamWindowsResponse = (
  examWindows: ExamWindow[] = [buildExamWindow()],
): ExamWindowsResponse => ({
  examWindows,
});
