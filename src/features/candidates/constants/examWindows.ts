import type { ExamWindow } from '@/features/candidates/types/candidate';

const buildExamWindow = (year: number, month: number): ExamWindow => {
  const startDate = new Date(Date.UTC(year, month - 1, 1)).toISOString();
  const label = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(
    new Date(year, month - 1, 1),
  );

  return {
    id: `${year}-${String(month).padStart(2, '0')}`,
    label,
    startDate,
  };
};

export const seedExamWindows = (): ExamWindow[] => {
  const now = new Date();
  const windows: ExamWindow[] = [];

  for (let offset = 1; offset <= 8; offset += 1) {
    const date = new Date(now.getFullYear(), now.getMonth() + offset, 1);
    windows.push(buildExamWindow(date.getFullYear(), date.getMonth() + 1));
  }

  return windows;
};
