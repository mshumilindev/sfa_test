# Hardcoding And Mocks

Hardcoding must be intentional. Mocks must stay inside the frontend-only boundary.

## Mock Rules

- Mock API behavior belongs in `src/app/api` route handlers and supporting typed feature API/mock modules.
- Mock data should live in clearly named mock or fixture files.
- Do not place mock candidates or fake API responses inside pages or UI components.
- Mock route handlers must return explicit typed responses.
- Mock route handlers that accept input must validate with Zod.
- Do not add real persistence, auth, databases, backend services, or Java code.
- Do not add backend persistence expectations; typed route handlers and in-memory mocks are enough for this assignment.

## Hardcoding Rules

- Do not scatter repeated domain values.
- Extract values used 2 or more times.
- Extract option lists, labels, page sizes, validation messages, route strings, status maps, and formatter logic.
- Do not hardcode user-facing copy in JSX, schemas, interceptors, hooks, or services.
- Keep user-facing copy in English `next-intl` messages, even while English is the only locale.
- Fixed fixture data is allowed when clearly marked as mock data.

## Review Question

If a value changes tomorrow, should there be exactly one place to update it? If yes, extract it now.
