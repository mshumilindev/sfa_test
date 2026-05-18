import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import {
  checkEmailAvailability,
  getCandidates,
  submitCandidate,
} from '@/features/candidates/api/candidateApi';
import { candidatePageSize } from '@/features/candidates/constants/pagination';
import { candidatesListKey } from '@/features/candidates/constants/swrKeys';
import type { RegistrationFormValues } from '@/features/candidates/schemas/registrationSchema';
import type {
  Candidate,
  CandidateFilters,
  CandidateListResponse,
  CandidateSubmissionResponse,
  EmailCheckResponse,
} from '@/features/candidates/types/candidate';
import { formatCandidateName } from '@/features/candidates/utils/candidateDisplay';

type UseCandidatesResult = {
  candidates: Candidate[];
  total: number;
  isLoading: boolean;
  isError: boolean;
  hasListData: boolean;
  isRetrying: boolean;
  error?: Error;
  retryLoad: () => Promise<CandidateListResponse | undefined>;
};

const sortCandidates = (candidates: Candidate[], sort: CandidateFilters['sort']): Candidate[] => {
  return [...candidates].sort((left, right) => {
    if (sort === 'nameAsc' || sort === 'nameDesc') {
      const comparison = formatCandidateName(left).localeCompare(formatCandidateName(right));
      return sort === 'nameAsc' ? comparison : -comparison;
    }

    const leftTime = new Date(left.registrationDate).getTime();
    const rightTime = new Date(right.registrationDate).getTime();
    return sort === 'registrationDateAsc' ? leftTime - rightTime : rightTime - leftTime;
  });
};

const filterCandidates = (candidates: Candidate[], filters: CandidateFilters): Candidate[] => {
  const nameQuery = filters.name.trim().toLowerCase();

  return candidates.filter((candidate) => {
    const matchesStatus = filters.status === 'all' || candidate.status === filters.status;
    const matchesProgram = filters.program === 'all' || candidate.program === filters.program;
    const candidateName = formatCandidateName(candidate).toLowerCase();
    const matchesName =
      !nameQuery ||
      candidateName.includes(nameQuery) ||
      candidate.firstName.toLowerCase().includes(nameQuery) ||
      candidate.lastName.toLowerCase().includes(nameQuery);

    return matchesStatus && matchesProgram && matchesName;
  });
};

export const useCandidates = (
  filters: CandidateFilters,
  initialList?: CandidateListResponse,
): UseCandidatesResult => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<CandidateListResponse, Error>(
    candidatesListKey,
    getCandidates,
    {
      fallbackData: initialList,
    },
  );

  const filtered = filterCandidates(data?.candidates ?? [], filters);
  const sorted = sortCandidates(filtered, filters.sort);
  const start = (filters.page - 1) * candidatePageSize;

  return {
    candidates: sorted.slice(start, start + candidatePageSize),
    total: filtered.length,
    isLoading,
    isError: Boolean(error),
    hasListData: Boolean(data),
    isRetrying: isValidating && Boolean(error),
    error,
    retryLoad: () => mutate(),
  };
};

export const useSubmitCandidate = () => {
  return useSWRMutation<
    CandidateSubmissionResponse,
    Error,
    typeof candidatesListKey,
    RegistrationFormValues
  >(candidatesListKey, (_key, { arg }) => submitCandidate(arg));
};

export const useEmailAvailability = (email: string) => {
  const shouldCheck = email.trim().length > 5 && email.includes('@');

  return useSWR<EmailCheckResponse, Error>(
    shouldCheck ? ['/candidates/check-email', email] : null,
    () => checkEmailAvailability(email),
    {
      dedupingInterval: 800,
    },
  );
};

export { candidatePageSize };
