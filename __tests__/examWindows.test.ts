import { seedExamWindows } from '@/features/candidates/constants/examWindows';

describe('seedExamWindows', () => {
  it('returns future exam windows with stable ids', () => {
    const windows = seedExamWindows();

    expect(windows.length).toBeGreaterThan(0);
    expect(windows[0]?.id).toMatch(/^\d{4}-\d{2}$/);
    expect(new Date(windows[0]?.startDate ?? '').getTime()).toBeGreaterThan(Date.now());
  });
});
