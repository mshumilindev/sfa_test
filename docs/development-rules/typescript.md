# TypeScript

Use TypeScript to model the domain clearly and reject bad states early.

## Required

- `strict: true`.
- No `any`.
- Explicit API response types.
- Typed component props.
- Typed hook returns when inference is unclear.
- Zod-inferred form types.
- Zod enums or discriminated unions for finite states.
- Root path aliases for root folders and cross-boundary imports.

## Avoid

- Unsafe casts.
- Duplicated schema and form types.
- Unclear `null | undefined | ''` mixtures.
- Broad `object` or `Record<string, unknown>` where a domain type is known.
- Suppressed compiler errors.
- Long fragile `../../..` imports across feature or app boundaries.
