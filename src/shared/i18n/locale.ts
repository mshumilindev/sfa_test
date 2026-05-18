export const defaultLocale = 'en' as const;

export type AppLocale = typeof defaultLocale;

export const isAppLocale = (value: string): value is AppLocale => value === defaultLocale;
