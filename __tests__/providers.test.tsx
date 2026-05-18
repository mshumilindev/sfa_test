import { screen } from '@testing-library/react';

import { AppProviders } from '@/app/providers';
import { renderWithIntl } from '@/shared/i18n/test/renderWithIntl';
import { useToastStore } from '@/store/toastStore';

jest.mock('@/shared/api/httpClient', () => ({}));

describe('AppProviders', () => {
  it('renders children and mounts the toast viewport', () => {
    useToastStore.getState().enqueueToast({ tone: 'success', message: 'Saved' });

    renderWithIntl(
      <AppProviders>
        <p>Portal content</p>
      </AppProviders>,
    );

    expect(screen.getByText('Portal content')).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /notifications/i })).toBeInTheDocument();
  });
});
