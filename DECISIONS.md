# Architectural Decisions

## Mock API via Next.js route handlers

The assignment is frontend-only, so route handlers under `src/app/api` provide typed mock endpoints without introducing a real backend. This keeps API contracts explicit while staying inside the Next.js App Router boundary.

## Centralized Axios client

All app API calls go through `src/shared/api/httpClient.ts`. Components and hooks never call Axios directly. Response and error interceptors provide consistent toast feedback for server-facing requests.

## SWR for server state

Candidate lists, email availability, and exam windows use SWR for caching, loading, and error state. After successful registration, the wizard revalidates `/candidates` so the dashboard reflects the new mock submission.

## SSR prefetch (RSC + client islands)

`/candidates` and `/candidates/register` are dynamic Server Components (`force-dynamic`) that read the same in-memory mock store as the API routes via `getServerCandidateList()` and `getServerExamWindows()`. Initial data is passed into client components as SWR `fallbackData`, so the first paint includes the candidate table and exam-window options without an extra client-only loading pass. Filters, sorting, pagination, the wizard, and mutations stay client-side; SWR still revalidates in the background after hydration.

## Zustand limited to UI state

Zustand stores dashboard filters/sort/page and the wizard step index only. Form values stay in React Hook Form and server data stays in SWR. Dashboard filters are intentionally **not** mirrored to URL search params to avoid hydration complexity and scope creep; SSR covers first paint for list data, while filter state remains ephemeral client UI state.

## React Hook Form + Zod

React Hook Form owns the full registration form lifecycle. Zod schemas are split by step and composed into the final registration schema. Step 2 uses conditional validation for university name and graduation year bounds. Step 3 eligibility hints are derived from pure functions outside JSX.

## Accessibility approach

The wizard focuses step headings after navigation, focuses the first invalid field on step failure, and keeps validation errors inline near fields. Passive API feedback uses toasts that do not steal focus. The dashboard table exposes sortable name and registration date headers with `aria-sort` and button controls.

## Dark mode

Dark mode is implemented through global CSS custom properties in `src/styles/globals.scss`. The app follows `prefers-color-scheme` by default, while Storybook can force light, dark, or system mode via a `data-theme` toolbar override. This keeps the bonus theme support centralized in tokens rather than duplicating component styles.

## Storybook

Storybook covers the core reusable UI states requested as optional bonus scope: status badges, searchable country input, eligibility hints, registration summary, and empty state. The setup reuses `next-intl` messages and global SCSS tokens so component documentation exercises the same styling and copy boundaries as the app.

## Error tracking mock

The shared `ErrorBoundary` reports render failures through `src/shared/errors/errorReporter.ts`, a lightweight in-memory Sentry-like adapter. The mock stores sanitized render reports without logging candidate data and can be swapped for a real tracking client without changing boundary call sites.

## Localization

The BERT brief requires `next-intl` with at least an English locale. User-facing copy should be centralized in `next-intl` message files and exposed through typed message helpers where non-component code needs messages, such as Zod schemas, API routes, and Axios feedback. Components should use `next-intl` hooks/server helpers rather than importing raw English dictionaries. `src/shared/i18n/locale.ts` defines the default locale for the document language attribute. `MessageKey` and namespace-scoped aliases (`CandidatesMessageKey`, `CommonMessageKey`) are derived from `messages/en.json` for non-component `formatMessage` calls.

## Shared UI boundaries

`ErrorBoundary`, `EmptyState`, and `LoadingState` live in `src/shared/components` and wrap app-level or dashboard async surfaces. Feature-specific layout such as the candidate skeleton remains in the candidates feature to avoid speculative abstractions.

## Testing approach

Pure domain logic (schemas, eligibility, filters, API error normalization, toast timers) is tested without rendering full pages where possible. Component tests cover wizard navigation, email-uniqueness blocking, dashboard behavior, and the render error fallback. Repeated payloads use typed builders in `src/features/candidates/test-utils/`.

## Dependency security (accepted risks / mitigations)

**Last checked:** 2026-05-18 (`npm audit --audit-level=moderate`).

We do **not** use `npm audit fix --force` when it would break the mandated stack (Next 15, React 19, Jest 29 + RTL, `next-intl`).

| Advisory            | Package                       | Dependency path                                                               | Severity | Impact                                                                           | Why force-fix is unsafe                       | Mitigation                                                                          |
| ------------------- | ----------------------------- | ----------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------- |
| GHSA-qx2v-qp2m-jg93 | `postcss` &lt;8.5.10          | `next` → `postcss`                                                            | Moderate | Theoretical CSS stringify XSS in **build tooling**, not runtime HTML in this app | Audit fix downgrades `next` to 9.x            | `package.json` override `postcss@^8.5.10`; stay on supported Next 15 patch releases |
| GHSA-vpq2-c234-7xj6 | `@tootallnate/once` &lt;3.0.1 | `jest-environment-jsdom` → `jsdom` → `http-proxy-agent` → `@tootallnate/once` | Low      | Dev/test runner only; not shipped to production                                  | Audit fix requires Jest 30 / jsdom 28         | Override `@tootallnate/once@^3.0.1`; keep Jest 29 aligned with project rules        |
| GHSA-848j-6mx2-7j84 | `elliptic`                    | `@storybook/nextjs` → `node-polyfill-webpack-plugin` → `crypto-browserify`    | Low      | Storybook build tooling only; not part of the Next.js runtime bundle             | Audit fix downgrades `@storybook/nextjs` to 7 | Keep Storybook on the current compatible major and monitor upstream patches         |

After overrides, `npm audit --audit-level=moderate` exits successfully without changing application runtime dependencies. It may still print low-severity dev-only Storybook advisories. Re-run audit before submission; if npm’s advisory database changes, update this table rather than force-fixing.

## E2E, accessibility, and Lighthouse evidence

- **Playwright** (`e2e/`): dashboard SSR first paint, filter/sort/pagination, recoverable load retry, full registration success, duplicate-email block, required/invalid validation, responsive smoke (320/768/1200), axe scans on `/candidates` and `/candidates/register`. Commands: `npm run test:e2e`, `npm run test:e2e:a11y`.
- **axe** runs inside Playwright via `@axe-core/playwright`; serious/critical violations fail the build.
- **Lighthouse** is documented in README as a manual production-server check (`npm run build && npm run start`, then `npx lighthouse …`). Targets: Accessibility ≥95, Best Practices ≥95, SEO ≥90, Performance ≥85 on localhost (mock app; scores vary by machine).

## Trade-offs for a 6–8 hour scope

- Mock persistence is in-memory only
- Shared UI remains small and pragmatic instead of a full component library
- Level II/III hints intentionally show “additional verification required” because prior exam history is out of scope
- The folder structure follows the assignment’s feature-first guidance without over-abstracting every UI atom
