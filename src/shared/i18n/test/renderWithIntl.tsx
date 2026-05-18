import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';

import { IntlTestProvider } from '@/shared/i18n/test/IntlTestProvider';

export const renderWithIntl = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: IntlTestProvider, ...options });
