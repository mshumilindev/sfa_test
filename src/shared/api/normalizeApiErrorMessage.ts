import axios from 'axios';

import { sharedMessages } from '@/shared/i18n/sharedMessages';

import type { ApiFeedbackContext } from './httpClient.types';

export const normalizeApiErrorMessage = (
  error: unknown,
  context: ApiFeedbackContext = 'default',
): string => {
  if (!axios.isAxiosError(error)) {
    return sharedMessages.api.feedback.unexpectedError;
  }

  if (error.code === 'ECONNABORTED') {
    return sharedMessages.api.feedback.networkTimeout;
  }

  if (context === 'loadCandidates') {
    return sharedMessages.api.feedback.candidatesLoadError;
  }

  if (context === 'submitRegistration') {
    return sharedMessages.api.feedback.registrationSubmitError;
  }

  return sharedMessages.api.feedback.unexpectedError;
};
