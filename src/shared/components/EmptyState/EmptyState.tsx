import type { ReactNode } from 'react';

import styles from './EmptyState.module.scss';

type EmptyStateProps = {
  message: string;
  className?: string;
  children?: ReactNode;
};

export const EmptyState = ({ message, className, children }: EmptyStateProps) => (
  <p className={className ? `${styles.emptyState} ${className}` : styles.emptyState} role="status">
    {message}
    {children}
  </p>
);
