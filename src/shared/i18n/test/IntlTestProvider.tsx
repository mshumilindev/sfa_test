import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';

import { messages } from '@/shared/i18n/messages';
import { defaultLocale } from '@/shared/i18n/locale';

type IntlTestProviderProps = {
  children: ReactNode;
};

export const IntlTestProvider = ({ children }: IntlTestProviderProps) => (
  <NextIntlClientProvider locale={defaultLocale} messages={messages}>
    {children}
  </NextIntlClientProvider>
);
