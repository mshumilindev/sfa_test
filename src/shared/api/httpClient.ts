import axios from 'axios';

import { useToastStore } from '@/store/toastStore';

import { normalizeApiErrorMessage } from './normalizeApiErrorMessage';
import './httpClient.types';

export const httpClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && !error.config?.skipToast) {
      useToastStore.getState().enqueueToast({
        tone: 'error',
        message: normalizeApiErrorMessage(error, error.config?.feedbackContext ?? 'default'),
      });
    }

    return Promise.reject(error);
  },
);
