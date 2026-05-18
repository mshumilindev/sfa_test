import type { ErrorInfo } from 'react';

export type RenderErrorReport = {
  message: string;
  componentStack?: string;
  reportedAt: string;
};

let renderErrorReports: RenderErrorReport[] = [];

export const reportRenderError = (error: Error, errorInfo: ErrorInfo): void => {
  renderErrorReports = [
    ...renderErrorReports,
    {
      message: error.message,
      componentStack: errorInfo.componentStack ?? undefined,
      reportedAt: new Date().toISOString(),
    },
  ];
};

export const getRenderErrorReports = (): RenderErrorReport[] =>
  renderErrorReports.map((report) => ({ ...report }));

export const clearRenderErrorReports = (): void => {
  renderErrorReports = [];
};
