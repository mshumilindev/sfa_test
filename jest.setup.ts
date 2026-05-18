import { createElement, type ReactNode } from 'react';

import '@testing-library/jest-dom';

import { formatMessage } from '@/shared/i18n/messages';
import type { MessageKey } from '@/shared/i18n/messageKeys';

jest.mock('next-intl', () => ({
  useTranslations:
    (namespace?: string) => (key: string, values?: Record<string, string | number>) => {
      const messageKey = (namespace ? `${namespace}.${key}` : key) as MessageKey;
      return formatMessage(messageKey, values);
    },
  NextIntlClientProvider: ({ children }: { children: ReactNode }) => children,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: { children: ReactNode; href: string }) =>
    createElement('a', { href, ...props }, children),
}));
