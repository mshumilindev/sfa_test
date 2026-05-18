import type { ReactNode } from 'react';

type LoadingStateProps = {
  label: string;
  children: ReactNode;
};

export const LoadingState = ({ label, children }: LoadingStateProps) => (
  <div aria-busy="true" aria-label={label}>
    {children}
  </div>
);
