import {
  getServerCandidateList,
  getServerExamWindows,
} from '@/features/candidates/api/serverCandidates';
import { resetMockCandidates } from '@/features/candidates/api/mockCandidateStore';

describe('serverCandidates', () => {
  beforeEach(() => {
    resetMockCandidates();
  });

  it('returns the in-memory candidate list for SSR prefetch', () => {
    const list = getServerCandidateList();

    expect(list.total).toBe(list.candidates.length);
    expect(list.candidates.length).toBeGreaterThan(0);
  });

  it('returns future exam windows for SSR prefetch', () => {
    const { examWindows } = getServerExamWindows();

    expect(examWindows.length).toBeGreaterThan(0);
    expect(examWindows[0]?.id).toMatch(/^\d{4}-\d{2}$/);
  });
});
