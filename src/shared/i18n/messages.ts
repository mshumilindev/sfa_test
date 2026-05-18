import enMessages from '../../../messages/en.json';

import type { MessageKey } from '@/shared/i18n/messageKeys';

export const messages = enMessages;

export type AppMessages = typeof messages;

export const apiToastAutoDismissMs = 10_000;

const getMessageValue = (key: MessageKey): string => {
  const value = key.split('.').reduce<unknown>((current, segment) => {
    if (current && typeof current === 'object' && segment in current) {
      return (current as Record<string, unknown>)[segment];
    }

    return undefined;
  }, messages);

  if (typeof value !== 'string') {
    throw new Error(`Missing message for key: ${key}`);
  }

  return value;
};

export const formatMessage = (
  key: MessageKey,
  values?: Record<string, string | number>,
): string => {
  let message = getMessageValue(key);

  if (values) {
    for (const [name, value] of Object.entries(values)) {
      message = message.replaceAll(`{${name}}`, String(value));
    }
  }

  return message;
};
