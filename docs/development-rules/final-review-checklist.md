# Final Review Checklist

Before finishing a change, verify the following.

## Architecture

- Pages are thin.
- Mock data is not inside pages or UI components.
- API contracts are typed.
- Business logic is not hidden in JSX.

## Type Safety

- No `any`.
- No unjustified unsafe casts.
- No duplicated form types.
- Finite states are typed.

## State Ownership

- React Hook Form owns form state.
- Zod owns validation.
- SWR owns server state.
- Zustand owns UI-only state.

## React Runtime Safety

- Render is pure and side-effect free.
- Effects clean up timers, listeners, observers, subscriptions, and stale async work.
- List keys are stable domain IDs, not indexes for reorderable/filterable lists.
- No unsafe HTML rendering or sensitive data logging.

## Hardcoding And Reuse

- No scattered hardcoded domain values.
- Concepts used 2 or more times are extracted.
- Constants exist for shared labels, options, routes, and page sizes.

## Localization And Copy

- User-facing copy lives in English `next-intl` messages.
- JSX, schemas, interceptors, hooks, and services do not hardcode visible labels, messages, placeholders, hints, aria labels, or toast text.
- Domain labels and options use typed copy maps.
- Copy is meaningful and user-actionable.

## SOLID And Boundaries

- Modules have one primary reason to change.
- Props and hook returns are narrow.
- UI depends on typed hooks/services rather than low-level IO.
- No god components, god hooks, or broad config objects.
- No speculative abstractions, provider layers, contexts, factories, registries, or generic engines.
- Shared abstractions are backed by real reuse or real invariants.

## Imperative vs Declarative

- JSX is declarative and easy to scan.
- Business logic is extracted into testable boundaries.
- Side effects and imperative workflows are named and traceable.
- Formatting, payload building, sorting, filtering, and error normalization are not hidden in render code.

## API Feedback

- All app API requests use the shared Axios client.
- Error feedback is centralized through response/error interceptors where practical.
- Success toasts are used only for user-triggered mutations.
- Background reads and ordinary GET requests are silent on success.
- Toasts render bottom-right, stack vertically, add new items at the bottom, include close buttons, and auto-dismiss after 10 seconds.
- Toast text is meaningful and user-actionable, not raw HTTP/status text.

## Loaders And Concurrency

- Mutation buttons show pending indicators on the activated control.
- Duplicate submissions are blocked.
- Conflicting same-model controls are disabled during pending mutations.
- Server-read surfaces use skeletons that reserve final layout dimensions.
- Loading states do not create layout shift.

## UI Quality

- Responsive behavior works at 320px, 768px, and 1200px.
- No unintended horizontal page scroll.
- No inaccessible controls.
- No color-only status communication.

## Tests

- Tests are not weakened to hide bugs.
- New functionality has requirement-aligned tests.
- Coverage stays at or above the configured 90% threshold.
- Repeated test payloads, mocks, fixtures, and setup are extracted into typed reusable builders.
- Mock API responses match explicit API response types.
- Mocks do not hide the behavior being tested.
- Failing tests are treated as possible product defects first.

## Git Hooks

- Pre-commit runs staged checks and coverage.
- Pre-push runs typecheck, lint, coverage, and build.
- Hooks and thresholds were not bypassed or weakened.

## Operational Delivery

- No unnecessary dependencies were added.
- Lockfile changes match real package manager changes.
- No secrets, local paths, generated build output, caches, logs, or coverage artifacts were added.
- No new environment assumptions were introduced without explicit requirement.
- README and feature docs still match implementation.

## Maintainability

- Names are precise and domain-specific.
- Files and functions are still easy to scan.
- No vague helpers, broad utils, generic wrappers, TODOs, debug logs, commented-out code, or dead branches.
- Large or fragile features have concise markdown docs describing contracts and breakable behavior.
- Comments explain non-obvious invariants and boundaries, not obvious code.
- Root path aliases are used for root-folder and cross-boundary imports.
- No fragile long relative imports across features or app boundaries.
- No empty folders, placeholder files, orphaned functionality, stale docs, obsolete tests, or unused CSS classes.
- Async loading and error states are explicit when the user flow needs them.

## Verification

- `npm run lint`
- `npm run test:coverage`
- `npm run build` for meaningful app changes
