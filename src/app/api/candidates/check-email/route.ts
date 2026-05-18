import { NextResponse } from 'next/server';

import { getMockCandidates } from '@/features/candidates/api/mockCandidateStore';
import { emailCheckQuerySchema } from '@/features/candidates/schemas/emailCheckSchema';
import type { EmailCheckResponse } from '@/features/candidates/types/candidate';

export const GET = (request: Request): NextResponse<EmailCheckResponse> => {
  const { searchParams } = new URL(request.url);
  const result = emailCheckQuerySchema.safeParse({
    email: searchParams.get('email'),
  });

  if (!result.success) {
    return NextResponse.json({ available: false }, { status: 400 });
  }

  const email = result.data.email.toLowerCase();
  const available = !getMockCandidates().some(
    (candidate) => candidate.email.toLowerCase() === email,
  );

  return NextResponse.json({ available });
};
