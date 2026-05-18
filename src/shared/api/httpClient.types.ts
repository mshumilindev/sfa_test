export type ApiFeedbackContext = 'loadCandidates' | 'submitRegistration' | 'default';

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipToast?: boolean;
    feedbackContext?: ApiFeedbackContext;
  }
}
