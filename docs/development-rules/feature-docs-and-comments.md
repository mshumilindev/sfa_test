# Feature Docs And Comments

Large features need concise docs that describe fragile behavior and contracts.

## Feature Docs

Large feature areas should have a markdown file near the feature, such as `src/features/<feature>/README.md`.

Feature docs should cover:

- User-facing purpose.
- Main flows.
- State ownership.
- API contracts and mock boundaries.
- Validation rules.
- Accessibility requirements.
- Responsive behavior.
- Loading, skeleton, concurrency, and toast behavior.
- Edge cases that are easy to break.
- Tests that protect the feature.

## Comments

Comments should explain why, not what.

Use comments for:

- Non-obvious invariants.
- Accessibility focus management.
- Concurrency guards.
- Error normalization boundaries.
- Skeleton layout constraints.
- Intentional mock/API limitations.

Do not leave TODOs, commented-out code, stale comments, or prose that restates obvious code.
