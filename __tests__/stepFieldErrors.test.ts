import { pickStepFieldErrors } from '@/features/candidates/registration/model/stepFieldErrors';

describe('pickStepFieldErrors', () => {
  it('returns only errors for the requested step fields', () => {
    const picked = pickStepFieldErrors(['preferredExamWindow', 'acceptsTerms'], {
      firstName: { type: 'required', message: 'First name is required.' },
      preferredExamWindow: { type: 'custom', message: 'Select a preferred exam window.' },
      acceptsTerms: { type: 'custom', message: 'You must accept the terms and conditions.' },
    });

    expect(picked).toEqual({
      preferredExamWindow: { type: 'custom', message: 'Select a preferred exam window.' },
      acceptsTerms: { type: 'custom', message: 'You must accept the terms and conditions.' },
    });
  });
});
