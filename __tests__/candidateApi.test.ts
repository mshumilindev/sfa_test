import { buildCandidateSubmissionResponse } from '@/features/candidates/test-utils/builders';
import {
  checkEmailAvailability,
  getCandidates,
  getExamWindows,
  submitCandidate,
} from '@/features/candidates/api/candidateApi';
import { defaultRegistrationValues } from '@/features/candidates/schemas/registrationSchema';
import { sharedMessages } from '@/shared/i18n/sharedMessages';
import { httpClient } from '@/shared/api/httpClient';

const enqueueToast = jest.fn();

jest.mock('@/shared/api/httpClient', () => ({
  httpClient: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

jest.mock('@/store/toastStore', () => ({
  useToastStore: {
    getState: () => ({ enqueueToast }),
  },
}));

describe('candidateApi', () => {
  it('calls typed candidate endpoints through the shared client', async () => {
    (httpClient.get as jest.Mock)
      .mockResolvedValueOnce({ data: { candidates: [], total: 0 } })
      .mockResolvedValueOnce({ data: { available: true } })
      .mockResolvedValueOnce({ data: { examWindows: [] } });
    (httpClient.post as jest.Mock).mockResolvedValueOnce({
      data: { candidate: { id: 'cand-1', firstName: 'A', lastName: 'B' } },
    });

    await getCandidates();
    await checkEmailAvailability('user@example.com');
    await getExamWindows();
    await submitCandidate(defaultRegistrationValues);

    expect(httpClient.get).toHaveBeenCalledWith('/candidates', {
      feedbackContext: 'loadCandidates',
    });
    expect(httpClient.get).toHaveBeenCalledWith('/candidates/check-email', {
      params: { email: 'user@example.com' },
      skipToast: true,
    });
    expect(httpClient.get).toHaveBeenCalledWith('/exam-windows', { skipToast: true });
    expect(httpClient.post).toHaveBeenCalledWith('/candidates', defaultRegistrationValues, {
      feedbackContext: 'submitRegistration',
    });
  });

  it('enqueues a success toast after a successful registration submission', async () => {
    const submission = buildCandidateSubmissionResponse();
    (httpClient.post as jest.Mock).mockResolvedValueOnce({ data: submission });

    await submitCandidate(defaultRegistrationValues);

    expect(enqueueToast).toHaveBeenCalledWith({
      tone: 'success',
      message: sharedMessages.api.feedback.registrationSubmitSuccess('Ava Kowalski'),
    });
  });
});
