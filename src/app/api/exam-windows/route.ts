import { NextResponse } from 'next/server';

import { seedExamWindows } from '@/features/candidates/constants/examWindows';
import type { ExamWindowsResponse } from '@/features/candidates/types/candidate';

export const GET = (): NextResponse<ExamWindowsResponse> => {
  return NextResponse.json({
    examWindows: seedExamWindows(),
  });
};
