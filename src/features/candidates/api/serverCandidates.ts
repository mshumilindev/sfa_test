import { seedExamWindows } from '@/features/candidates/constants/examWindows';
import { getMockCandidates } from '@/features/candidates/api/mockCandidateStore';
import type {
  CandidateListResponse,
  ExamWindowsResponse,
} from '@/features/candidates/types/candidate';

export const getServerCandidateList = (): CandidateListResponse => {
  const candidates = getMockCandidates();

  return {
    candidates,
    total: candidates.length,
  };
};

export const getServerExamWindows = (): ExamWindowsResponse => ({
  examWindows: seedExamWindows(),
});
