import { buildCandidate } from '@/features/candidates/test-utils/builders';
import {
  formatCandidateName,
  formatRegistrationDate,
} from '@/features/candidates/utils/candidateDisplay';

describe('candidateDisplay', () => {
  it('formats candidate name and registration date', () => {
    const candidate = buildCandidate();
    expect(formatCandidateName(candidate)).toBe('Ava Kowalski');
    expect(formatRegistrationDate(candidate.registrationDate)).toMatch(/May 14, 2026/);
  });
});
