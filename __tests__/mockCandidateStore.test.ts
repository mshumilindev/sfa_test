import {
  addMockCandidate,
  getMockCandidates,
  isEmailRegistered,
  resetMockCandidates,
} from '@/features/candidates/api/mockCandidateStore';
import { seedMockCandidates } from '@/features/candidates/api/mockData';

describe('mockCandidateStore', () => {
  beforeEach(() => {
    resetMockCandidates();
  });

  it('returns seeded candidates and appends new registrations', () => {
    expect(getMockCandidates()).toHaveLength(seedMockCandidates.length);

    addMockCandidate({
      id: 'cand-test',
      firstName: 'Test',
      lastName: 'User',
      email: 'test.user@example.com',
      country: 'Poland',
      highestDegree: 'bachelor',
      universityName: 'Test University',
      graduationYear: 2020,
      yearsOfProfessionalExperience: 2,
      program: 'level_1',
      preferredExamWindow: '2026-11',
      status: 'pending',
      registrationDate: new Date().toISOString(),
    });

    expect(getMockCandidates()[0]?.email).toBe('test.user@example.com');
    expect(getMockCandidates()).toHaveLength(seedMockCandidates.length + 1);
  });

  it('detects registered emails case-insensitively', () => {
    expect(isEmailRegistered('AVA.KOWALSKI@EXAMPLE.COM')).toBe(true);
    expect(isEmailRegistered('new.candidate@example.com')).toBe(false);
  });

  it('returns a defensive copy that cannot mutate the internal store', () => {
    const snapshot = getMockCandidates();
    const initialLength = snapshot.length;

    snapshot.push({
      id: 'external-mutation',
      firstName: 'External',
      lastName: 'Mutation',
      email: 'external.mutation@example.com',
      country: 'Poland',
      highestDegree: 'bachelor',
      universityName: 'External University',
      graduationYear: 2020,
      yearsOfProfessionalExperience: 1,
      program: 'level_1',
      preferredExamWindow: '2026-06',
      status: 'pending',
      registrationDate: new Date().toISOString(),
    });

    expect(getMockCandidates()).toHaveLength(initialLength);
    expect(getMockCandidates().some((candidate) => candidate.id === 'external-mutation')).toBe(
      false,
    );
  });
});
