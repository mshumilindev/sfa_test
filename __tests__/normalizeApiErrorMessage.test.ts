import { AxiosError, AxiosHeaders } from 'axios';

import { sharedMessages } from '@/shared/i18n/sharedMessages';
import { normalizeApiErrorMessage } from '@/shared/api/normalizeApiErrorMessage';

describe('normalizeApiErrorMessage', () => {
  it('returns context-specific messages instead of raw HTTP text', () => {
    const error = new AxiosError(
      'Bad Request',
      'ERR_BAD_REQUEST',
      { headers: new AxiosHeaders(), url: '/candidates', method: 'get' },
      undefined,
      {
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        config: { headers: new AxiosHeaders() },
        data: {},
      },
    );

    expect(normalizeApiErrorMessage(error, 'loadCandidates')).toBe(
      sharedMessages.api.feedback.candidatesLoadError,
    );
    expect(normalizeApiErrorMessage(error, 'submitRegistration')).toBe(
      sharedMessages.api.feedback.registrationSubmitError,
    );
    expect(normalizeApiErrorMessage(error, 'loadCandidates')).not.toContain('Bad Request');
  });

  it('returns the unexpected error message for non-axios failures', () => {
    expect(normalizeApiErrorMessage(new Error('boom'), 'default')).toBe(
      sharedMessages.api.feedback.unexpectedError,
    );
  });

  it('returns the default unexpected error for axios failures without a mapped context', () => {
    const error = new AxiosError('Server error', 'ERR_BAD_RESPONSE');

    expect(normalizeApiErrorMessage(error, 'default')).toBe(
      sharedMessages.api.feedback.unexpectedError,
    );
  });

  it('returns a timeout message for aborted requests', () => {
    const error = new AxiosError('timeout', 'ECONNABORTED');

    expect(normalizeApiErrorMessage(error, 'default')).toBe(
      sharedMessages.api.feedback.networkTimeout,
    );
  });
});
