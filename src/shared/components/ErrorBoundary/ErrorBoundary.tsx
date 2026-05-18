'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';

import { sharedMessages } from '@/shared/i18n/sharedMessages';

import styles from './ErrorBoundary.module.scss';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

const copy = sharedMessages.common.feedback;

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo): void {
    // Errors are surfaced through the fallback UI; avoid logging candidate data.
  }

  private handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <section className={styles.boundary} role="alert">
          <h1>{copy.unexpectedErrorTitle}</h1>
          <p>{copy.unexpectedErrorBody}</p>
          <button className={styles.reloadButton} onClick={this.handleReload} type="button">
            {sharedMessages.common.feedback.reloadPage}
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}
