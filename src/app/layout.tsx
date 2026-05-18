import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';

import { AppProviders } from '@/app/providers';
import { defaultLocale } from '@/shared/i18n/locale';
import '@/styles/globals.scss';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('app');

  return {
    title: t('title'),
    description: t('description'),
  };
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = async ({ children }: RootLayoutProps) => {
  const messages = await getMessages();

  return (
    <html lang={defaultLocale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AppProviders>{children}</AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
