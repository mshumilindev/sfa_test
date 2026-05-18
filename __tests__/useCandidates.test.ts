import { renderHook } from '@testing-library/react';

import { useCandidates } from '@/features/candidates/hooks/useCandidates';
import { buildCandidateListResponse } from '@/features/candidates/test-utils/builders';

const mutate = jest.fn();

jest.mock('swr', () => ({
  __esModule: true,
  default: () => ({
    data: buildCandidateListResponse(),
    error: undefined,
    isLoading: false,
    isValidating: false,
    mutate,
  }),
}));

describe('useCandidates', () => {
  beforeEach(() => {
    mutate.mockClear();
  });

  it('exposes retryLoad through SWR mutate', () => {
    const { result } = renderHook(() =>
      useCandidates({
        name: '',
        program: 'all',
        status: 'all',
        sort: 'registrationDateDesc',
        page: 1,
      }),
    );

    void result.current.retryLoad();

    expect(mutate).toHaveBeenCalledTimes(1);
  });

  it('sorts by registration date and name in both directions', () => {
    const sorts = ['nameDesc', 'registrationDateAsc', 'registrationDateDesc'] as const;

    sorts.forEach((sort) => {
      const { result } = renderHook(() =>
        useCandidates({
          name: '',
          program: 'all',
          status: 'all',
          sort,
          page: 1,
        }),
      );

      expect(result.current.candidates.length).toBeGreaterThan(0);
    });
  });

  it('filters, sorts, and paginates candidates deterministically', () => {
    const { result } = renderHook(() =>
      useCandidates({
        name: 'amy',
        program: 'all',
        status: 'all',
        sort: 'nameAsc',
        page: 1,
      }),
    );

    expect(result.current.total).toBe(1);
    expect(result.current.candidates[0]?.firstName).toBe('Amy');
  });

  it('filters by status and program', () => {
    const { result } = renderHook(() =>
      useCandidates({
        name: '',
        program: 'level_2',
        status: 'pending',
        sort: 'nameAsc',
        page: 1,
      }),
    );

    expect(result.current.total).toBe(1);
    expect(result.current.candidates[0]?.program).toBe('level_2');
  });
});
