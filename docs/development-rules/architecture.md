# Architecture

Pages assemble the product. Features own behavior.

## Boundaries

- `src/app`: App Router pages, layouts, and route handlers.
- `src/features/candidates/types`: Candidate domain types and finite-state definitions.
- `src/features/candidates/schemas`: Zod validation schemas and inferred form types.
- `src/features/candidates/api`: Axios client, typed API services, and mock data.
- `src/features/candidates/hooks`: SWR hooks and feature orchestration.
- `src/features/candidates/components`: Candidate feature UI.
- `src/store`: Zustand UI state only.
- `src/styles`: global tokens and base styles.

## Rules

- Keep page files thin.
- Keep route handlers typed.
- Keep mock API behavior in route handlers.
- Keep mock data out of pages and UI components.
- Keep domain rules out of JSX.
- Keep data transformations in hooks or utilities.
- Keep repeated UI as components.
- Extract repeated domain concepts used 2 or more times into named typed constants, maps, utilities, hooks, or components.
- Avoid scattered hardcoded values for labels, statuses, routes, page sizes, validation messages, and option lists.
- Do not introduce app-wide abstractions for one local use case.
