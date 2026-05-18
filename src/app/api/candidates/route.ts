import { NextResponse } from 'next/server';

import { createCandidateId } from '@/features/candidates/api/createCandidateId';
import {
  addMockCandidate,
  getMockCandidates,
  isEmailRegistered,
} from '@/features/candidates/api/mockCandidateStore';
import { mapRegistrationToCandidate } from '@/features/candidates/api/candidateStatus';
import { isAllowedExamWindow } from '@/features/candidates/api/validatePreferredExamWindow';
import { candidatesMessages } from '@/features/candidates/i18n/messages';
import { registrationSchema } from '@/features/candidates/schemas/registrationSchema';
import type {
  CandidateErrorResponse,
  CandidateListResponse,
  CandidateSubmissionResponse,
} from '@/features/candidates/types/candidate';

export const GET = (): NextResponse<CandidateListResponse> => {
  const candidates = getMockCandidates();

  return NextResponse.json({
    candidates,
    total: candidates.length,
  });
};

export const POST = async (
  request: Request,
): Promise<NextResponse<CandidateSubmissionResponse | CandidateErrorResponse>> => {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: candidatesMessages.api.invalidJson }, { status: 400 });
  }

  const result = registrationSchema.safeParse(payload);

  if (!result.success) {
    return NextResponse.json(
      { message: candidatesMessages.api.invalidRegistrationPayload },
      { status: 400 },
    );
  }

  if (!isAllowedExamWindow(result.data.preferredExamWindow)) {
    return NextResponse.json(
      { message: candidatesMessages.api.invalidExamWindow },
      { status: 400 },
    );
  }

  if (isEmailRegistered(result.data.email)) {
    return NextResponse.json({ message: candidatesMessages.api.duplicateEmail }, { status: 409 });
  }

  const candidate = mapRegistrationToCandidate(
    result.data,
    createCandidateId(),
    new Date().toISOString(),
  );

  addMockCandidate(candidate);

  return NextResponse.json({ candidate }, { status: 201 });
};
