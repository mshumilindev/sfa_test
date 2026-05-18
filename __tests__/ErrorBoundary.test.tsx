import { render, screen } from '@testing-library/react';
import { sharedMessages } from '@/shared/i18n/sharedMessages';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary/ErrorBoundary';

const ThrowingChild = () => {
  throw new Error('render failure');
};

describe('ErrorBoundary', () => {
  it('renders children when no error is thrown', () => {
    render(
      <ErrorBoundary>
        <p>Dashboard content</p>
      </ErrorBoundary>,
    );

    expect(screen.getByText('Dashboard content')).toBeInTheDocument();
  });

  it('renders an accessible fallback when a child throws', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);

    render(
      <ErrorBoundary>
        <ThrowingChild />
      </ErrorBoundary>,
    );

    expect(screen.getByRole('alert')).toHaveTextContent(
      sharedMessages.common.feedback.unexpectedErrorTitle,
    );
    expect(screen.getByRole('alert')).toHaveTextContent(
      sharedMessages.common.feedback.unexpectedErrorBody,
    );
    expect(
      screen.getByRole('button', { name: sharedMessages.common.feedback.reloadPage }),
    ).toBeInTheDocument();

    consoleError.mockRestore();
  });
});
