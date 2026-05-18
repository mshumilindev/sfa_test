import type { Candidate } from '@/features/candidates/types/candidate';

import { resetCandidateIdCounter } from './createCandidateId';
import { seedMockCandidates } from './mockData';

let candidates: Candidate[] = [...seedMockCandidates];

export const getMockCandidates = (): Candidate[] =>
  candidates.map((candidate) => ({ ...candidate }));

export const addMockCandidate = (candidate: Candidate): Candidate => {
  candidates = [candidate, ...candidates];
  return candidate;
};

export const resetMockCandidates = (): void => {
  candidates = [...seedMockCandidates];
  resetCandidateIdCounter();
};

export const isEmailRegistered = (email: string): boolean =>
  candidates.some((candidate) => candidate.email.toLowerCase() === email.trim().toLowerCase());
