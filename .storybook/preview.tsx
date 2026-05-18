import type { Preview } from '@storybook/nextjs';
import { NextIntlClientProvider } from 'next-intl';

import messages from '../messages/en.json';
import '../src/styles/globals.scss';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color theme',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'system', title: 'System' },
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
      },
    },
  },
  initialGlobals: {
    theme: 'system',
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;
      document.documentElement.dataset.theme = theme === 'light' || theme === 'dark' ? theme : '';

      return (
        <NextIntlClientProvider locale="en" messages={messages}>
          <div style={{ minHeight: '100vh', padding: '2rem', background: 'var(--color-bg)' }}>
            <Story />
          </div>
        </NextIntlClientProvider>
      );
    },
  ],
  parameters: {
    a11y: {
      test: 'todo',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
