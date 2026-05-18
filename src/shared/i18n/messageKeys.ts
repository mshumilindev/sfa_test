import type enMessages from '../../../messages/en.json';

type AppMessages = typeof enMessages;

type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`;

type LeafMessageKey<T, Prefix extends string = ''> = T extends string
  ? Prefix extends ''
    ? never
    : Prefix
  : T extends readonly (infer Item)[]
    ? Item extends Record<string, unknown>
      ? LeafMessageKey<Item, `${Prefix}.${number}`>
      : Prefix extends ''
        ? never
        : Prefix
    : {
        [K in keyof T & string]: LeafMessageKey<
          T[K],
          Prefix extends '' ? K : `${Prefix}${DotPrefix<K>}`
        >;
      }[keyof T & string];

export type MessageKey = LeafMessageKey<AppMessages>;

export type CandidatesMessageKey = Extract<MessageKey, `candidates.${string}`>;

export type CommonMessageKey = Extract<MessageKey, `common.${string}`>;

export type ApiMessageKey = Extract<MessageKey, `api.${string}`>;
