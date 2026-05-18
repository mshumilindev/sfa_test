import {
  clearRenderErrorReports,
  getRenderErrorReports,
  reportRenderError,
} from '@/shared/errors/errorReporter';

describe('errorReporter', () => {
  beforeEach(() => {
    clearRenderErrorReports();
  });

  it('records render errors without exposing the original error object', () => {
    reportRenderError(new Error('render failed'), {
      componentStack: 'at CandidateDashboard',
    });

    expect(getRenderErrorReports()).toEqual([
      expect.objectContaining({
        message: 'render failed',
        componentStack: 'at CandidateDashboard',
      }),
    ]);
  });

  it('returns defensive copies of reports', () => {
    reportRenderError(new Error('render failed'), {
      componentStack: null,
    });

    const reports = getRenderErrorReports();
    reports[0].message = 'mutated';

    expect(getRenderErrorReports()[0].message).toBe('render failed');
  });
});
