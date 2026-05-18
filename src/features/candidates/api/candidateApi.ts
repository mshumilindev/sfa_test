import type {
  CandidateListResponse,
  CandidateSubmissionResponse,
  EmailCheckResponse,
  ExamWindowsResponse,
} from '@/features/candidates/types/candidate';
import type { RegistrationFormValues } from '@/features/candidates/schemas/registrationSchema';
import { formatCandidateName } from '@/features/candidates/utils/candidateDisplay';
import { sharedMessages } from '@/shared/i18n/sharedMessages';
import { httpClient } from '@/shared/api/httpClient';
import { useToastStore } from '@/store/toastStore';

export const getCandidates = async (): Promise<CandidateListResponse> => {
  const response = await httpClient.get<CandidateListResponse>('/candidates', {
    feedbackContext: 'loadCandidates',
  });
  return response.data;
};

export const submitCandidate = async (
  values: RegistrationFormValues,
): Promise<CandidateSubmissionResponse> => {
  const response = await httpClient.post<CandidateSubmissionResponse>('/candidates', values, {
    feedbackContext: 'submitRegistration',
  });

  useToastStore.getState().enqueueToast({
    tone: 'success',
    message: sharedMessages.api.feedback.registrationSubmitSuccess(
      formatCandidateName(response.data.candidate),
    ),
  });

  return response.data;
};

export const checkEmailAvailability = async (email: string): Promise<EmailCheckResponse> => {
  const response = await httpClient.get<EmailCheckResponse>('/candidates/check-email', {
    params: { email },
    skipToast: true,
  });
  return response.data;
};

export const getExamWindows = async (): Promise<ExamWindowsResponse> => {
  const response = await httpClient.get<ExamWindowsResponse>('/exam-windows', {
    skipToast: true,
  });
  return response.data;
};
