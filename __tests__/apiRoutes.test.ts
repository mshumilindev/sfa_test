/**
 * @jest-environment node
 */

import { GET as getCandidates, POST as postCandidate } from '@/app/api/candidates/route';
import { GET as checkEmail } from '@/app/api/candidates/check-email/route';
import { GET as getExamWindowsRoute } from '@/app/api/exam-windows/route';
import {
  getMockCandidates,
  resetMockCandidates,
} from '@/features/candidates/api/mockCandidateStore';
import { seedMockCandidates } from '@/features/candidates/api/mockData';
import { candidatesMessages } from '@/features/candidates/i18n/messages';
import { seedExamWindows } from '@/features/candidates/constants/examWindows';
import { buildRegistrationFormValues } from '@/features/candidates/test-utils/builders';

describe('API route handlers', () => {
  beforeEach(() => {
    resetMockCandidates();
  });

  it('returns candidates from the mock store', async () => {
    const response = await getCandidates();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.total).toBeGreaterThan(0);
    expect(body.candidates.length).toBeGreaterThan(0);
  });

  it('rejects malformed JSON bodies', async () => {
    const response = await postCandidate(
      new Request('http://localhost/api/candidates', {
        method: 'POST',
        body: '{invalid-json',
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.message).toBe(candidatesMessages.api.invalidJson);
  });

  it('rejects invalid preferred exam windows without adding a candidate', async () => {
    const initialCount = getMockCandidates().length;
    const payload = buildRegistrationFormValues({
      email: 'invalid.window@example.com',
      preferredExamWindow: 'invalid-window',
    });

    const response = await postCandidate(
      new Request('http://localhost/api/candidates', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.message).toBe(candidatesMessages.api.invalidExamWindow);
    expect(getMockCandidates()).toHaveLength(initialCount);
  });

  it('rejects invalid registration payloads', async () => {
    const response = await postCandidate(
      new Request('http://localhost/api/candidates', {
        method: 'POST',
        body: JSON.stringify({ firstName: 'Only' }),
      }),
    );

    expect(response.status).toBe(400);
  });

  it('creates a candidate and reports email availability', async () => {
    const payload = buildRegistrationFormValues({
      firstName: 'Route',
      lastName: 'Tester',
      email: 'route.tester@example.com',
      preferredExamWindow: seedExamWindows()[0]?.id ?? '2026-06',
    });

    const createResponse = await postCandidate(
      new Request('http://localhost/api/candidates', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    );
    const created = await createResponse.json();

    expect(createResponse.status).toBe(201);
    expect(created.candidate.email).toBe('route.tester@example.com');

    const emailResponse = await checkEmail(
      new Request('http://localhost/api/candidates/check-email?email=route.tester@example.com'),
    );
    const emailBody = await emailResponse.json();

    expect(emailBody.available).toBe(false);
  });

  it('rejects duplicate emails without adding another candidate', async () => {
    const existingEmail = seedMockCandidates[0]?.email ?? 'ava.kowalski@example.com';
    const initialCount = getMockCandidates().length;

    const response = await postCandidate(
      new Request('http://localhost/api/candidates', {
        method: 'POST',
        body: JSON.stringify(
          buildRegistrationFormValues({
            email: existingEmail.toUpperCase(),
          }),
        ),
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(409);
    expect(body.message).toBe(candidatesMessages.api.duplicateEmail);
    expect(getMockCandidates()).toHaveLength(initialCount);
  });

  it('returns exam windows and rejects invalid email checks', async () => {
    const response = await getExamWindowsRoute();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.examWindows.length).toBeGreaterThan(0);

    const invalidEmailResponse = await checkEmail(
      new Request('http://localhost/api/candidates/check-email?email=not-an-email'),
    );

    expect(invalidEmailResponse.status).toBe(400);
  });
});
