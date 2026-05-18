# Change Discipline

Changes must stay requirement-driven and easy to review.

## Rules

- Keep scope small.
- Do not refactor unrelated code.
- Do not introduce new dependencies casually.
- Do not invent product features.
- Do not hide behavior changes inside cleanup.
- Do not store derived state unless there is a concrete reason.
- Do not add `useEffect` for data that can be derived during render.
- Do not optimize without evidence.

## Contracts

- API request and response shapes stay explicit.
- Route handlers and client services must stay aligned.
- Unknown input must be validated before use.
- User-facing errors must be accessible and actionable.

## Review

Every new abstraction should have a reason. Every repeated concept should have a home. Every behavior change should be traceable to a requirement.
