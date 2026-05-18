import { renderHook } from '@testing-library/react';

import { useExamWindows } from '@/features/candidates/hooks/useExamWindows';

jest.mock('swr', () => ({
  __esModule: true,
  default: () => ({
    data: { examWindows: [{ id: '2026-11', label: 'November 2026', startDate: '2026-11-01' }] },
    error: undefined,
    isLoading: false,
  }),
}));

describe('useExamWindows', () => {
  it('loads exam windows through SWR', () => {
    const { result } = renderHook(() => useExamWindows());

    expect(result.current.data?.examWindows).toHaveLength(1);
  });
});
