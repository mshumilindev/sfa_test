import { getRequestConfig } from 'next-intl/server';

import { defaultLocale } from '@/shared/i18n/locale';

export default getRequestConfig(async () => ({
  locale: defaultLocale,
  messages: (await import('../../messages/en.json')).default,
}));
