import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ToastViewport } from '@/components/ToastViewport/ToastViewport';
import { renderWithIntl } from '@/shared/i18n/test/renderWithIntl';
import { useToastStore } from '@/store/toastStore';

describe('ToastViewport', () => {
  beforeEach(() => {
    useToastStore.setState({ toasts: [] });
  });

  it('renders stacked toasts with accessible close buttons', async () => {
    const user = userEvent.setup();

    useToastStore.getState().enqueueToast({
      tone: 'success',
      message: 'Candidate registered successfully.',
    });
    useToastStore.getState().enqueueToast({
      tone: 'error',
      message: 'Registration could not be submitted. Review your entries and try again.',
    });

    renderWithIntl(<ToastViewport />);

    expect(screen.getByRole('region', { name: /notifications/i })).toBeInTheDocument();
    expect(screen.getByText('Candidate registered successfully.')).toBeInTheDocument();
    expect(
      screen.getByText('Registration could not be submitted. Review your entries and try again.'),
    ).toBeInTheDocument();

    const closeButtons = screen.getAllByRole('button', { name: /dismiss notification/i });
    expect(closeButtons).toHaveLength(2);

    await user.click(closeButtons[0]);

    expect(screen.queryByText('Candidate registered successfully.')).not.toBeInTheDocument();
    expect(
      screen.getByText('Registration could not be submitted. Review your entries and try again.'),
    ).toBeInTheDocument();
  });
});
