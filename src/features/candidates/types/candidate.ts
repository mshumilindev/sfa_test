import { z } from 'zod';

export const programSchema = z.enum(['level_1', 'level_2', 'level_3']);
export const candidateStatusSchema = z.enum(['pending', 'eligible', 'ineligible', 'withdrawn']);
export const highestDegreeSchema = z.enum(['bachelor', 'master', 'phd', 'other']);

export type Program = z.infer<typeof programSchema>;
export type CandidateStatus = z.infer<typeof candidateStatusSchema>;
export type HighestDegree = z.infer<typeof highestDegreeSchema>;

export type Candidate = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country: string;
  highestDegree: HighestDegree;
  universityName: string;
  graduationYear: number;
  yearsOfProfessionalExperience: number;
  currentEmployer?: string;
  program: Program;
  preferredExamWindow: string;
  status: CandidateStatus;
  registrationDate: string;
};

export type CandidateListResponse = {
  candidates: Candidate[];
  total: number;
};

export type CandidateSubmissionResponse = {
  candidate: Candidate;
};

export type CandidateErrorResponse = {
  message: string;
};

export type EmailCheckResponse = {
  available: boolean;
};

export type ExamWindow = {
  id: string;
  label: string;
  startDate: string;
};

export type ExamWindowsResponse = {
  examWindows: ExamWindow[];
};

export type CandidateSort = 'nameAsc' | 'nameDesc' | 'registrationDateAsc' | 'registrationDateDesc';

export type CandidateFilters = {
  name: string;
  program: Program | 'all';
  status: CandidateStatus | 'all';
  sort: CandidateSort;
  page: number;
};
