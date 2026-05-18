let candidateIdCounter = 0;

export const createCandidateId = (): string => {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return `cand-${globalThis.crypto.randomUUID()}`;
  }

  candidateIdCounter += 1;
  return `cand-${candidateIdCounter}`;
};

export const resetCandidateIdCounter = (): void => {
  candidateIdCounter = 0;
};
