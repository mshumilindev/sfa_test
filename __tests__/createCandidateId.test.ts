import {
  createCandidateId,
  resetCandidateIdCounter,
} from '@/features/candidates/api/createCandidateId';

describe('createCandidateId', () => {
  beforeEach(() => {
    resetCandidateIdCounter();
  });

  it('returns monotonic fallback ids when randomUUID is unavailable', () => {
    const originalCrypto = globalThis.crypto;

    Object.defineProperty(globalThis, 'crypto', {
      configurable: true,
      value: {},
    });

    try {
      expect(createCandidateId()).toBe('cand-1');
      expect(createCandidateId()).toBe('cand-2');
    } finally {
      Object.defineProperty(globalThis, 'crypto', {
        configurable: true,
        value: originalCrypto,
      });
    }
  });
});
