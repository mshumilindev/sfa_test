import useSWR from 'swr';

import { getExamWindows } from '@/features/candidates/api/candidateApi';
import { examWindowsKey } from '@/features/candidates/constants/swrKeys';
import type { ExamWindowsResponse } from '@/features/candidates/types/candidate';

export const useExamWindows = (initialExamWindows?: ExamWindowsResponse) => {
  return useSWR<ExamWindowsResponse, Error>(examWindowsKey, getExamWindows, {
    fallbackData: initialExamWindows,
  });
};
