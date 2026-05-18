'use client';

import type { ReactNode } from 'react';

import '@/shared/api/httpClient';
import { ToastViewport } from '@/components/ToastViewport/ToastViewport';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary/ErrorBoundary';

type AppProvidersProps = {
  children: ReactNode;
};

export const AppProviders = ({ children }: AppProvidersProps) => (
  <ErrorBoundary>
    {children}
    <ToastViewport />
  </ErrorBoundary>
);
