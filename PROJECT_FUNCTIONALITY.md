# Project Functionality

## Purpose

The BERT Candidate Registration Portal is a frontend-only Next.js application for reviewing mock certification candidates and registering a new candidate through a guided multi-step form. It is built to satisfy the Senior React Frontend Developer assignment from the CFA Institute BERT Modernization test task.

## Main Routes

- `/` redirects users into the candidate portal.
- `/candidates` renders the candidate dashboard.
- `/candidates/register` renders the registration wizard.
- `/api/candidates` provides the mock candidate list and accepts new candidate submissions.
- `/api/candidates/check-email` validates email uniqueness against the in-memory mock store.
- `/api/exam-windows` returns future exam-window options.

## Candidate Dashboard

The dashboard displays seeded and newly submitted candidates.

Core capabilities:

- Paginated candidate list.
- Candidate columns: name, email, program, status, and registration date.
- Client-side search by candidate name.
- Program and status filters.
- Sort by candidate name and registration date.
- Color-coded status badges for pending, eligible, ineligible, and withdrawn candidates.
- Responsive desktop table and smaller-screen card layout.
- Loading skeletons, empty state, recoverable error state, and retry action.
- Register button linking to the registration wizard.

Layout and accessibility behavior:

- The table stays inside a bordered scroll container.
- Long emails and names wrap safely inside their cells.
- Smaller screens use card-style results instead of forcing a wide table.
- Sortable headers use real buttons and expose `aria-sort`.

## Registration Wizard

The registration form is a three-step wizard using React Hook Form and Zod.

Step 1: Personal Information

- First name and last name are required and must be 2-50 characters.
- Email is required, must be a valid email address, and is checked asynchronously against the mock API.
- Duplicate email is shown as a field validation error.
- Available email does not show success text.
- Email checking does not shift the field layout.
- Phone is optional and must match an international format when provided.
- Country uses a searchable keyboard-accessible combobox.

Step 2: Education And Experience

- Highest degree selection supports Bachelor, Master, PhD, and Other.
- University name is required.
- Graduation year must be within the allowed current-year range.
- Years of professional experience must be a whole number from 0 to 50.
- Current employer is optional.

Step 3: Program Selection And Review

- Program level supports Level I, Level II, and Level III.
- Eligibility hint updates from education and experience values.
- Preferred exam window must be selected from future windows returned by the mock API.
- Registration summary shows the entered candidate data.
- Terms and conditions must be accepted.
- Step 3 initially renders without validation errors.
- Step 3 errors appear only after the user attempts to submit.

Submission behavior:

- Submit button exposes pending state and blocks duplicate submissions.
- Server-side validation remains the source of truth.
- Successful submission prepends the candidate to the in-memory store.
- SWR revalidates the dashboard candidate list after submission.
- Success panel confirms the candidate and links back to the dashboard.
- API errors are normalized and surfaced through the shared toast layer.

## Mock API And Data Model

The app uses typed Next.js route handlers instead of a real backend.

- Candidate data is stored in memory for the current dev-server session.
- Restarting the dev server resets mock data to the seed list.
- Candidate submissions are mapped to a candidate record with derived eligibility status.
- Email uniqueness is checked case-insensitively against active mock candidates.
- Preferred exam windows are validated server-side against generated future windows.
- Invalid JSON, invalid payloads, duplicate emails, and invalid exam-window IDs return meaningful typed responses.

## State Ownership

- React Hook Form owns form values and field state.
- Zod owns validation rules and form-value inference.
- SWR owns server state, revalidation, and mutation calls.
- Zustand owns UI-only state such as dashboard filters and the active wizard step.
- Next.js Server Components prefetch initial dashboard and exam-window data.

## Internationalization

- The app is English-only for now.
- User-facing copy lives in `messages/en.json`.
- Components use `next-intl` hooks and server helpers.
- Non-component code uses typed message helpers derived from the same message file.

## Accessibility

The portal is designed for keyboard and screen-reader users.

- Form inputs have visible labels.
- Field errors are connected with `aria-describedby`.
- Invalid controls expose `aria-invalid`.
- Wizard headings receive focus on step changes.
- Error summaries are announced only when validation has actually been attempted.
- The country combobox supports keyboard navigation.
- Toasts use live-region semantics and can be dismissed.
- Status badges include text, not color alone.
- Dashboard table remains semantic on desktop.
- Playwright axe checks cover the dashboard and registration page.

## Responsive Behavior

- The main page uses a consistent constrained width.
- Form fields use a two-column grid only when there is enough viewport width.
- Mobile layouts collapse to one column.
- Buttons align predictably and stack on narrow screens.
- Dashboard filters and pagination avoid horizontal overflow.
- E2E responsive smoke tests cover 320px, 768px, and 1200px widths.

## Verification Coverage

Automated coverage includes:

- Zod schema validation.
- Candidate filtering, sorting, and display utilities.
- API route behavior and error handling.
- SWR hooks and mutation wiring.
- Registration wizard step behavior.
- Duplicate email handling.
- Dashboard loading, empty, error, retry, filter, sort, and pagination states.
- SSR prefetch expectations.
- Playwright E2E registration flow.
- Playwright responsive checks.
- Playwright axe accessibility checks.

Primary verification commands:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npm run test:e2e
npm audit --audit-level=moderate
```

## Known Trade-Offs

- Data persistence is intentionally in-memory because the task asks for a frontend mock API, not a backend/database.
- Level II and Level III eligibility are represented as requiring verification because prior exam pass history is not collected by the frontend task.
- Lighthouse is documented as a manual verification path because local scores depend on machine and browser conditions.
- Edit/delete candidate functionality is intentionally out of scope for this assignment.
