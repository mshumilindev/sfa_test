import axios from 'axios';

const enqueueToast = jest.fn();
let onFulfilled: ((response: unknown) => unknown) | undefined;
let onRejected: ((error: unknown) => unknown) | undefined;

jest.mock('axios', () => ({
  ...jest.requireActual('axios'),
  create: jest.fn(() => ({
    interceptors: {
      response: {
        use: (fulfilled: (response: unknown) => unknown, rejected: (error: unknown) => unknown) => {
          onFulfilled = fulfilled;
          onRejected = rejected;
        },
      },
    },
  })),
}));

jest.mock('@/store/toastStore', () => ({
  useToastStore: {
    getState: () => ({ enqueueToast }),
  },
}));

describe('httpClient interceptors', () => {
  beforeAll(async () => {
    await import('@/shared/api/httpClient');
  });

  beforeEach(() => {
    enqueueToast.mockClear();
  });

  it('passes successful responses through without enqueueing toasts', () => {
    const response = {
      config: { skipToast: false, url: '/candidates', method: 'post' },
      status: 201,
      data: { candidate: { firstName: 'Ava', lastName: 'Kowalski' } },
    };

    expect(onFulfilled?.(response)).toBe(response);
    expect(enqueueToast).not.toHaveBeenCalled();
  });

  it('enqueues an error toast with normalized messaging', async () => {
    await expect(
      onRejected?.(
        Object.assign(new axios.AxiosError('fail', 'ERR', { headers: new axios.AxiosHeaders() }), {
          config: { skipToast: false, feedbackContext: 'submitRegistration' },
        }),
      ),
    ).rejects.toBeDefined();

    expect(enqueueToast).toHaveBeenCalledWith(
      expect.objectContaining({
        tone: 'error',
        message: expect.stringContaining('Registration could not be submitted'),
      }),
    );
  });

  it('skips toast feedback when skipToast is set', async () => {
    await expect(
      onRejected?.(
        Object.assign(new axios.AxiosError('fail', 'ERR', { headers: new axios.AxiosHeaders() }), {
          config: { skipToast: true },
        }),
      ),
    ).rejects.toBeDefined();

    expect(enqueueToast).not.toHaveBeenCalled();
  });
});
