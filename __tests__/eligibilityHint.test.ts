import { getEligibilityHint } from '@/features/candidates/registration/model/eligibilityHint';

describe('getEligibilityHint', () => {
  it('marks Level I as likely eligible with a qualifying degree', () => {
    const hint = getEligibilityHint({
      program: 'level_1',
      highestDegree: 'bachelor',
      yearsOfProfessionalExperience: 1,
    });

    expect(hint.tone).toBe('eligible');
  });

  it('marks Level I as not likely eligible without degree or experience', () => {
    const hint = getEligibilityHint({
      program: 'level_1',
      highestDegree: 'other',
      yearsOfProfessionalExperience: 1,
    });

    expect(hint.tone).toBe('notEligible');
  });

  it('requires additional verification for Level II and III', () => {
    expect(
      getEligibilityHint({
        program: 'level_2',
        highestDegree: 'master',
        yearsOfProfessionalExperience: 10,
      }).tone,
    ).toBe('verificationRequired');

    expect(
      getEligibilityHint({
        program: 'level_3',
        highestDegree: 'phd',
        yearsOfProfessionalExperience: 10,
      }).tone,
    ).toBe('verificationRequired');
  });
});
