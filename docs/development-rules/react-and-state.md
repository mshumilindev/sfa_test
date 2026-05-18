# React And State

State ownership must stay clean.

## Owners

- React Hook Form owns form values and form lifecycle state.
- Zod owns validation rules.
- SWR owns server state, loading states, error states, and mutations.
- Zustand owns UI-only state such as wizard step and dashboard filters.

## Component Rules

- Use arrow function components.
- Keep components focused.
- Avoid giant files.
- Avoid nested ternaries and complex inline conditions.
- Avoid repeated JSX blocks; extract repeated UI used 2 or more times.
- Keep mock data and fake API responses out of components.
- Keep imperative workflows out of JSX.
- Move business decisions, payload building, formatting rules, error normalization, and focus orchestration into named hooks, utilities, schemas, or services.
- Use semantic elements.
- Use memoization only where it has a concrete purpose.
