# BERT Candidate Registration Portal

Frontend-only Candidate Registration Portal for the BERT Modernization Test Assignment.

## Overview

The portal lets reviewers browse mock candidate registrations and submit new candidates through a 3-step accessible registration wizard. All server behavior is mocked with typed Next.js route handlers.

## Stack

- Next.js 15 App Router
- React 19
- TypeScript strict mode
- SCSS Modules
- React Hook Form + Zod
- SWR + Axios
- Zustand
- Jest + React Testing Library
- Playwright + axe-core (E2E smoke and accessibility checks)
- ESLint 9 + Prettier 3
- Husky + lint-staged

## Setup

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

## Scripts

| Script                  | Purpose                                        |
| ----------------------- | ---------------------------------------------- |
| `npm run dev`           | Start the development server                   |
| `npm run build`         | Production build                               |
| `npm run start`         | Start the production server                    |
| `npm run lint`          | Run ESLint (`eslint .`)                        |
| `npm run typecheck`     | Run TypeScript without emitting files          |
| `npm run test`          | Run Jest tests                                 |
| `npm run test:coverage` | Run Jest with enforced 90% coverage thresholds |
| `npm run test:watch`    | Run Jest in watch mode                         |
| `npm run test:e2e`      | Run Playwright E2E and axe smoke tests         |
| `npm run test:e2e:a11y` | Run axe accessibility specs only               |
| `npm run format`        | Format with Prettier                           |
| `npm run validate`      | Run typecheck, lint, coverage tests, and build |

## Features

- `/candidates` dashboard with search, program/status filters, sorting, pagination, and responsive table/cards
- `/candidates/register` 3-step wizard
  - Step 1: personal information with async email uniqueness check
  - Step 2: education and experience with conditional Zod validation
  - Step 3: program selection, dynamic eligibility hint, exam window, summary, and terms
- Toast feedback for server-facing API success and failure via shared Axios interceptors
- API errors use centralized meaningful toast feedback; successful background reads stay silent, while success toasts are limited to user-triggered mutations
- Button-level pending loaders, same-model concurrency blocking, and layout-stable skeletons are enforced by project rules
- Large feature areas must include concise markdown docs covering fragile behavior, contracts, and tests
- Typed mock API routes for candidates, email checks, and exam windows

## Architecture

```text
messages/
  en.json                  Single source of user-facing copy (next-intl)
src/
  app/                     App Router pages and API route handlers
  features/candidates/     Candidate domain, dashboard, registration wizard
  shared/api/              Centralized Axios client and interceptors
  shared/components/       Shared ErrorBoundary, EmptyState, LoadingState
  i18n/                    next-intl request config
  shared/i18n/             Locale config and typed message helpers
  shared/lib/              Shared pure utilities
  store/                   Zustand UI stores
  components/              App-level UI such as toast viewport
```

### Component tree

```text
App (layout)
└── AppProviders
    ├── ErrorBoundary
    │   ├── pages
    │   │   ├── CandidatesPage
    │   │   │   └── CandidateDashboard
    │   │   │       ├── filters (search / program / status / sort)
    │   │   │       ├── LoadingState → CandidateDashboardSkeleton
    │   │   │       ├── EmptyState (no results)
    │   │   │       ├── error alert (load failure)
    │   │   │       ├── CandidateResults
    │   │   │       │   ├── table (sortable name + registration date headers)
    │   │   │       │   └── mobile card list
    │   │   │       └── pagination controls
    │   │   └── RegisterPage
    │   │       └── RegistrationWizard
    │   │           ├── WizardProgress
    │   │           ├── PersonalInfoStep → FormField / TextInput / CountryCombobox
    │   │           ├── EducationExperienceStep
    │   │           ├── ProgramReviewStep
    │   │           │   ├── EligibilityHint
    │   │           │   └── RegistrationSummary
    │   │           └── success panel (post-submit)
    │   └── ToastViewport
    └── (route handlers under app/api)
```

### State ownership

- React Hook Form owns form values
- Zod owns validation rules
- SWR owns server state
- Zustand owns dashboard filters/sort/page and wizard step index

### SSR prefetch

- `/candidates` and `/candidates/register` use dynamic Server Components to read the in-memory mock store on the server and pass initial data into client islands as SWR `fallbackData`.
- Dashboard filters, wizard steps, email checks, and submit flows remain fully client-driven; SWR revalidates after mutations.

## Mock API

- `GET /api/candidates`
- `POST /api/candidates`
- `GET /api/candidates/check-email?email=`
- `GET /api/exam-windows`

`POST /api/candidates` appends the created candidate to the in-memory mock store so new submissions appear on the dashboard during the same dev session.

## Accessibility

- Visible labels and `aria-describedby` for field errors
- Focus management between wizard steps and invalid fields
- Status badges use text, not color alone
- Sortable table headers expose `aria-sort` and real sort buttons
- Toast viewport uses appropriate live-region semantics and dismiss controls
- Unexpected render failures surface through a top-level `ErrorBoundary` fallback

## Internationalization

- English-only (`en`) is implemented through `next-intl`.
- `messages/en.json` is the single source of user-facing copy.
- `src/i18n/request.ts` loads messages for the App Router via the `next-intl` plugin in `next.config.ts`.
- `src/shared/i18n/locale.ts` defines `defaultLocale` for `<html lang>` and future locale expansion.
- Components use `useTranslations` / server helpers from `next-intl`.
- Non-component code (Zod schemas, route handlers, Axios feedback, domain label maps) uses typed helpers in `src/shared/i18n/messages.ts`, `src/shared/i18n/sharedMessages.ts`, and `src/features/candidates/i18n/messages.ts` derived from the same JSON file.
- Tests assert visible text through those helpers or `renderWithIntl` rather than duplicating literals.

## Testing

Meaningful unit and component tests cover schema validation, eligibility logic, dashboard filtering helpers, wizard behavior, toast store behavior, and API error normalization.

## Development Rules

Strict development rules live in [`docs/development-rules`](./docs/development-rules) and Cursor-facing rules live in [`.cursor/rules`](./.cursor/rules). Do not change those rule files unless explicitly asked. Follow them for every change, including SOLID boundaries without overengineering, React runtime safety, pure rendering, leak-free effects, stable reconciliation keys, frontend safety, practical scalability, responsive markup requirements for 320px, 768px, and 1200px widths, centralized frontend mocks, root path aliases for root-folder imports, `next-intl` English messages for all user-facing text, feature markdown docs for large/fragile features, comments for non-obvious invariants and abstractions, no scattered hardcoded domain values, reusable typed abstractions for concepts used 2 or more times, reusable typed test mocks/fixtures/builders, no empty folders or orphaned functionality, explicit async/error states, button-level pending loaders, same-model concurrency blocking, layout-stable skeletons, Axios interceptor-driven meaningful bottom-right toasts, 90%+ coverage enforced by pre-commit/pre-push hooks, dependency/config/generated-file discipline, maintainability hygiene, and a strict separation between declarative UI and imperative/testable logic.

## Known trade-offs

- Mock candidate data resets when the dev server restarts
- Level II/III eligibility cannot be fully verified because prior exam history is not collected
- Shared UI primitives (`ErrorBoundary`, `EmptyState`, `LoadingState`) are intentionally lightweight rather than a full design system
- Exam windows are generated from the current date rather than stored as fixed fixtures

### Security note

**Last checked:** 2026-05-18. `npm audit --audit-level=moderate` is expected to pass after safe `package.json` overrides (`postcss@^8.5.10`, `@tootallnate/once@^3.0.1`). We do not run `npm audit fix --force` when it would break Next 15 / Jest 29 compatibility. See [DECISIONS.md](./DECISIONS.md) for advisory IDs, dependency paths, impact, and mitigations if npm’s database changes.

## E2E smoke tests

```bash
npx playwright install chromium
npm run test:e2e
```

Covers:

- SSR-prefetched dashboard first paint (no skeleton flash when data is present)
- Dashboard filter by name / program / status, sort, pagination, and recoverable load retry
- Full registration success, duplicate-email block, required/invalid field validation
- Responsive layouts at 320 / 768 / 1200
- axe scans on `/candidates` and `/candidates/register` (serious/critical fail the run)

Playwright starts its own dev server on port **4731** (see `playwright.config.ts`) so it does not collide with an existing `npm run dev` on port 3000.

## Lighthouse verification (manual)

Lighthouse is not wired into `npm run validate` because scores depend on local hardware and a production build. Use this repeatable path:

```bash
npm run build
npm run start
# separate terminal
npx lighthouse http://127.0.0.1:3000/candidates \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=html --output-path=./lighthouse-candidates.html \
  --chrome-flags="--headless"
npx lighthouse http://127.0.0.1:3000/candidates/register \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=html --output-path=./lighthouse-register.html \
  --chrome-flags="--headless"
```

Add `lighthouse-*.html` to your local ignore list (already covered by `*.log`; generated HTML is not part of the deliverable). **Target scores (localhost, production build):**

| Category       | Target                                                   |
| -------------- | -------------------------------------------------------- |
| Accessibility  | ≥ 95                                                     |
| Best Practices | ≥ 95                                                     |
| SEO            | ≥ 90                                                     |
| Performance    | ≥ 85 (mock APIs and dev-style assets; varies by machine) |

## Pre-submission verification

```bash
npm run validate
npm audit --audit-level=moderate
npm run test:e2e
npm run test:e2e:a11y   # optional subset; also included in test:e2e
```

## Submission Checklist

- `npm run validate` and `npm run test:e2e` pass locally.
- `npm audit --audit-level=moderate` passes (or documented in DECISIONS if upstream changes).
- No deployment config, backend service, auth, database, or external persistence was added.
- Mock API behavior is limited to typed Next.js route handlers and in-memory mocks.
- Modern evergreen browsers, keyboard, touch, and 320px/768px/1200px layouts are supported.
- Background reads do not show success toasts; user-triggered mutations show meaningful success/error feedback.
- README, feature docs, and development rules match the implementation.
- No secrets, fake credentials, generated build output, coverage artifacts, caches, or local machine paths are included.

## What would be improved next

- Persist mock submissions across server restarts for demos
- Extract additional shared form primitives into `src/shared/components`
- Add integration tests around submit + dashboard refresh
- Add retry actions for recoverable API failures
