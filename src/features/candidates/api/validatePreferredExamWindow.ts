import { seedExamWindows } from '@/features/candidates/constants/examWindows';

export const getAllowedExamWindowIds = (): ReadonlySet<string> =>
  new Set(seedExamWindows().map((window) => window.id));

export const isAllowedExamWindow = (preferredExamWindow: string): boolean =>
  getAllowedExamWindowIds().has(preferredExamWindow);
