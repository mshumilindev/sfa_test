import { candidatesMessages } from '@/features/candidates/i18n/messages';
import type { Candidate, HighestDegree, Program } from '@/features/candidates/types/candidate';

export const formatCandidateName = (candidate: Pick<Candidate, 'firstName' | 'lastName'>): string =>
  `${candidate.firstName} ${candidate.lastName}`.trim();

export const formatRegistrationDate = (value: string): string =>
  new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(value));

export const programLabels: Record<Program, string> = candidatesMessages.labels.program;

export const degreeLabels: Record<HighestDegree, string> = candidatesMessages.labels.degree;

export const statusLabels: Record<Candidate['status'], string> = candidatesMessages.labels.status;
