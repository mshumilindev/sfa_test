import { renderHook } from '@testing-library/react';
import useSWR from 'swr';

import {
  useEmailAvailability,
  useSubmitCandidate,
} from '@/features/candidates/hooks/useCandidates';
import type { EmailCheckResponse } from '@/features/candidates/types/candidate';
import {
  createSubmitCandidateMutationMock,
  stubUseSWR,
  useSWRMutationMock,
} from '@/features/candidates/test-utils/mocks';

jest.mock('swr', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('swr/mutation', () => {
  const { useSWRMutationMock: mutationMock } = jest.requireActual(
    '@/features/candidates/test-utils/mocks',
  );

  return {
    __esModule: true,
    default: mutationMock,
  };
});

describe('candidate SWR hooks', () => {
  beforeEach(() => {
    stubUseSWR<EmailCheckResponse>({
      data: { available: true },
      error: undefined,
      isLoading: false,
    });
    useSWRMutationMock.mockImplementation(() => createSubmitCandidateMutationMock());
  });

  it('checks email availability only for plausible addresses', () => {
    renderHook(() => useEmailAvailability('short'));
    expect(jest.mocked(useSWR).mock.calls[0]?.[0]).toBeNull();

    renderHook(() => useEmailAvailability('candidate@example.com'));
    expect(jest.mocked(useSWR).mock.calls[1]?.[0]).toEqual([
      '/candidates/check-email',
      'candidate@example.com',
    ]);
  });

  it('registers the submit mutation hook', () => {
    renderHook(() => useSubmitCandidate());

    expect(useSWRMutationMock).toHaveBeenCalledWith('/candidates', expect.any(Function));
  });
});
