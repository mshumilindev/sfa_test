import {
  deriveCandidateStatus,
  mapRegistrationToCandidate,
} from '@/features/candidates/api/candidateStatus';
import { defaultRegistrationValues } from '@/features/candidates/schemas/registrationSchema';
import { buildRegistrationFormValues } from '@/features/candidates/test-utils/builders';

describe('candidateStatus', () => {
  it('derives ineligible status when eligibility hint is negative', () => {
    const status = deriveCandidateStatus({
      ...defaultRegistrationValues,
      highestDegree: 'other',
      yearsOfProfessionalExperience: 0,
      program: 'level_1',
    });

    expect(status).toBe('ineligible');
  });

  it('derives eligible status for likely Level I candidates', () => {
    const status = deriveCandidateStatus({
      ...defaultRegistrationValues,
      highestDegree: 'master',
      yearsOfProfessionalExperience: 1,
      program: 'level_1',
    });

    expect(status).toBe('eligible');
  });

  it('maps registration values into a candidate record', () => {
    const candidate = mapRegistrationToCandidate(
      buildRegistrationFormValues({
        email: 'elena@example.com',
        highestDegree: 'bachelor',
        universityName: 'Example University',
        graduationYear: 2020,
        yearsOfProfessionalExperience: 5,
      }),
      'cand-1',
      '2026-05-18T00:00:00.000Z',
    );

    expect(candidate.id).toBe('cand-1');
    expect(candidate.program).toBe('level_2');
    expect(candidate.status).toBe('pending');
  });
});
