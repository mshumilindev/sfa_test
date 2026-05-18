# Reuse And Abstractions

Use reusable abstractions for repeated concepts, not for imagined future needs.

## 2+ Rule

If the same concept appears 2 or more times, extract it.

This includes:

- JSX structures.
- Option arrays.
- Label maps.
- Route strings.
- Page sizes.
- Validation messages.
- Date formatting.
- Filtering, sorting, and pagination logic.
- Test fixtures.

## Good Abstractions

- Typed constants.
- Typed maps.
- Pure utility functions.
- Small components.
- Feature hooks.
- Zod schemas or schema fragments.
- Field config.

## Bad Abstractions

- Vague `helpers.ts` files.
- Unrelated `utils.ts` dumping grounds.
- Overly generic components.
- Broad config objects with weak typing.
- Hooks that mix form state, server state, and UI state.

## Rule Of Thumb

Extract when it reduces duplication and clarifies ownership. Keep inline when the code is truly one-off and clearer in place.
