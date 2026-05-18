# Candidates Feature

## Purpose

Browse mock candidate registrations on the dashboard and submit new candidates through a 3-step registration wizard.

## Main flows

1. Dashboard (`/candidates`) SSR-prefetches the mock candidate list on the server, hydrates SWR with `fallbackData`, then filters/sorts/paginates client-side and links to registration.
2. Registration (`/candidates/register`) SSR-prefetches exam windows the same way; the wizard, email check, and submit stay client-driven.
3. Successful `POST /api/candidates` appends to the in-memory mock store and revalidates the dashboard list.

## State ownership

- React Hook Form: full registration form values and submit pending state.
- Zod: validation rules per step and full registration payload.
- SWR: candidates list, email availability, exam windows.
- Zustand: dashboard filters/sort/page and wizard step index only.

## API contracts

- `GET /api/candidates` → `{ candidates, total }`
- `POST /api/candidates` → `{ candidate }` (201), `{ message }` (400), or `{ message }` (409 duplicate email)
  - 400 when the body is not valid JSON (`candidates.api.invalidJson`)
  - 400 when Zod validation fails (`candidates.api.invalidRegistrationPayload`)
  - 400 when `preferredExamWindow` is not one of the generated `seedExamWindows()` ids (`candidates.api.invalidExamWindow`)
- `GET /api/candidates/check-email?email=` → `{ available }` (no toast; inline field error)
- `GET /api/exam-windows` → `{ examWindows: [{ id, label, startDate }] }`

User-facing API error strings come from `messages/en.json` via `candidatesMessages` in `src/features/candidates/i18n/messages.ts`.

All client calls use `src/shared/api/httpClient.ts` via `candidateApi.ts`.

## Validation

- Step 1: name/email/phone/country rules; async email uniqueness. Continue/stepper forward navigation is blocked while the email check is in flight; server `POST /api/candidates` remains the duplicate-email source of truth (409).
- Dashboard load failures expose an inline **Try again** control that calls SWR `mutate` on the candidates list key.
- Step 2: degree selected ⇒ university required; graduation year within current year − 50 … current year; experience 0–50.
- Step 3: program, exam window, terms required.

## Loading, skeletons, concurrency

- Dashboard wraps layout-stable skeletons in shared `LoadingState` while SWR fetches.
- Empty results use shared `EmptyState`; unexpected render failures are handled by the app-level `ErrorBoundary`.
- Submit disables wizard step navigation, back/continue, and shows `aria-busy` on the active button.
- Server errors surface through Axios interceptors as bottom-right toasts.

## Accessibility

- Visible labels, `aria-describedby` for errors, step heading focus on navigation, first invalid field focus on step failure.
- Skeletons use `aria-hidden`; toasts use live regions without stealing focus.

## Localization

- Feature UI, validation copy, shared app text, toast text, and Axios feedback should live in English `next-intl` messages.
- Components should consume messages through `next-intl`; schemas, route handlers, and services may use typed message helpers derived from the same English messages.
- No inline user-facing UI strings should be added to JSX, schemas, interceptors, hooks, services, or route handlers.

## Tests

- Schemas, eligibility hint, filters (including sortable column helpers), wizard navigation with preserved step data, email-uniqueness blocking, dashboard render, toast store, API error normalization, API route handlers, and shared `ErrorBoundary` fallback behavior.
- Typed builders and mocks live in `src/features/candidates/test-utils/` (`buildCandidate`, `buildRegistrationFormValues`, `createWizardUiState`, etc.).
- Assertions reference centralized `next-intl` messages or typed message helpers where practical instead of duplicating literals.
