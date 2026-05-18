# BERT Candidate Registration Portal

Frontend-only Candidate Registration Portal for the BERT Modernization Test Assignment (CFA Institute).

Reviewers can browse mock certification candidates and register new ones through a guided, accessible three-step wizard. All server behavior is mocked with typed Next.js route handlers and an in-memory store shared by API routes and SSR prefetch.

## Stack

- Next.js 15 App Router · React 19 · TypeScript strict
- SCSS Modules · React Hook Form + Zod · SWR + Axios · Zustand
- Jest + React Testing Library · Playwright + axe-core
- ESLint 9 + Prettier 3 · Husky + lint-staged · next-intl (English)

## Setup

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`. Route `/` redirects into the candidate portal.

## Scripts

| Script                  | Purpose                                               |
| ----------------------- | ----------------------------------------------------- |
| `npm run dev`           | Start the development server                          |
| `npm run build`         | Production build                                      |
| `npm run start`         | Start the production server                           |
| `npm run lint`          | Run ESLint (`eslint .`)                               |
| `npm run typecheck`     | Run TypeScript without emitting files                 |
| `npm run test`          | Run Jest tests                                        |
| `npm run test:coverage` | Run Jest with enforced 90% coverage thresholds        |
| `npm run test:watch`    | Run Jest in watch mode                                |
| `npm run test:e2e`      | Run Playwright E2E and axe smoke tests                |
| `npm run test:e2e:a11y` | Run axe accessibility specs only                      |
| `npm run format`        | Format with Prettier                                  |
| `npm run validate`      | Typecheck, lint, coverage tests, and production build |

## Routes

| Route                                    | Purpose                                                 |
| ---------------------------------------- | ------------------------------------------------------- |
| `/candidates`                            | Candidate dashboard (search, filters, sort, pagination) |
| `/candidates/register`                   | Three-step registration wizard                          |
| `GET /api/candidates`                    | List mock candidates                                    |
| `POST /api/candidates`                   | Create candidate (409 on duplicate email)               |
| `GET /api/candidates/check-email?email=` | Async email availability check                          |
| `GET /api/exam-windows`                  | Future exam-window options                              |

New submissions are appended to the in-memory mock store and appear on the dashboard for the current dev session. **Edit and delete are out of scope.**

## Candidate dashboard (`/candidates`)

- Paginated list: name, email, program, status, registration date
- Client-side search by name; program and status filters; sort by name or registration date
- Status badges (pending, eligible, ineligible, withdrawn) with text, not color alone
- Responsive desktop table (sortable headers with `aria-sort`) and mobile card list
- Loading skeleton, empty state, recoverable load error with inline **Try again** (SWR `mutate`)
- Link to the registration wizard

## Registration wizard (`/candidates/register`)

Three steps with React Hook Form + Zod. Step field errors appear only after **Continue** or **Submit**, except duplicate email (below).

**Step 1 — Personal information**

- First and last name required (2–50 characters)
- Email required; async uniqueness check against the mock API
- Duplicate email: inline feedback after the check returns unavailable; **Continue** disabled while the check is pending; if the user reaches Continue with a duplicate, they remain on step 1 with focus on email
- Server `POST` duplicate validation remains the source of truth on submit
- Phone optional with international format when provided
- Country via searchable, keyboard-accessible combobox

**Step 2 — Education and experience**

- Degree (Bachelor, Master, PhD, Other), university, graduation year, years of experience (0–50)
- Optional current employer; conditional Zod rules

**Step 3 — Program and review**

- Program level (I / II / III) with dynamic eligibility hint from education and experience
- Preferred exam window from mock API; registration summary; terms required
- No validation errors on step 3 until submit is attempted

**Submit**

- Pending state and duplicate-submit blocking
- Success panel with link back to dashboard; SWR revalidates the candidate list
- API errors via shared Axios toast interceptors (messages from `messages/en.json`)

## Architecture

```text
messages/en.json           Single source of user-facing copy (next-intl)
src/app/                   App Router pages and API route handlers
src/features/candidates/   Domain, dashboard, registration wizard
src/shared/api/            Axios client and interceptors
src/shared/components/     ErrorBoundary, EmptyState, LoadingState
src/store/                 Zustand (UI filters, wizard step, toasts)
```

**State:** React Hook Form (form values) · Zod (validation) · SWR (server state) · Zustand (dashboard filters/sort/page, wizard step) · Server Components (SSR prefetch as SWR `fallbackData`).

`/candidates` and `/candidates/register` read the mock store on the server for first paint without a client-only loading flash. Filters, wizard navigation, email checks, and submit stay client-driven.

Further detail: [`src/features/candidates/README.md`](./src/features/candidates/README.md) (feature behavior), [`DECISIONS.md`](./DECISIONS.md) (engineering choices), [`docs/development-rules`](./docs/development-rules) (project conventions).

## Mock API and data

- In-memory store for the current dev-server session; restarts reset to seed data
- Case-insensitive email uniqueness; preferred exam window validated server-side
- Typed errors for invalid JSON, payloads, duplicate email, and invalid exam-window IDs
- Exam windows generated from the current date (not fixed fixtures)

## Accessibility and responsive layout

- Visible labels, `aria-describedby` / `aria-invalid`, wizard heading focus on step change
- Error summary only when validation was attempted
- Toast live regions; top-level `ErrorBoundary` for render failures
- Layouts exercised at **320px**, **768px**, and **1200px** (Playwright)
- axe on `/candidates` and `/candidates/register` (serious/critical fail the run)

## Internationalization

English-only via `next-intl`. All user-facing copy is in `messages/en.json`. Components use `useTranslations`; schemas, routes, and Axios feedback use typed helpers under `src/shared/i18n/` and `src/features/candidates/i18n/`.

## Testing and verification

**Jest** covers schemas, eligibility, filters/sort, API routes, hooks, wizard step gating, duplicate-email UX, dashboard load/empty/error/retry, and error normalization.

**Playwright** (dev server on port **4731**, see `playwright.config.ts`):

```bash
npx playwright install chromium
npm run test:e2e
```

E2E covers SSR first paint, dashboard filter/sort/pagination/retry, full registration, duplicate-email block before submit, field validation, responsive layouts, and axe. `test:e2e:a11y` is a subset of `test:e2e`.

**Full gate before release or review:**

```bash
npm run validate
npm audit --audit-level=moderate
npm run test:e2e
```

`npm audit --audit-level=moderate` passes with safe overrides in `package.json` (`postcss@^8.5.10`, `@tootallnate/once@^3.0.1`); see [DECISIONS.md](./DECISIONS.md) if advisories change.

## Known trade-offs

- Mock data does not persist across dev-server restarts
- Level II/III eligibility is indicative only (prior exam history is not collected)
- Shared UI primitives are lightweight, not a full design system
- Lighthouse is optional manual verification (not in `npm run validate`):

```bash
npm run build && npm run start
npx lighthouse http://127.0.0.1:3000/candidates --only-categories=performance,accessibility,best-practices,seo --output=html --output-path=./lighthouse-candidates.html --chrome-flags="--headless"
npx lighthouse http://127.0.0.1:3000/candidates/register --only-categories=performance,accessibility,best-practices,seo --output=html --output-path=./lighthouse-register.html --chrome-flags="--headless"
```

Typical localhost targets on a production build: Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 90, Performance ≥ 85 (machine-dependent).
