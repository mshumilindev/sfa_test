# Development Rules

These rules are enforced for the Candidate Registration Portal. They are intentionally strict because this repository is a Senior Frontend Developer take-home submission.

## Rule Files

- [Architecture](./architecture.md)
- [Rules Markdown Governance](./rules-md-governance.md)
- [Hardcoding And Mocks](./hardcoding-and-mocks.md)
- [Localization And Copy](./localization-and-copy.md)
- [TypeScript](./typescript.md)
- [React And State](./react-and-state.md)
- [React Runtime Safety And Scalability](./react-runtime-safety-and-scalability.md)
- [Reuse And Abstractions](./reuse-and-abstractions.md)
- [SOLID And Boundaries](./solid-and-boundaries.md)
- [No Overengineering](./no-overengineering.md)
- [Imperative vs Declarative](./imperative-vs-declarative.md)
- [Feature Docs And Comments](./feature-docs-and-comments.md)
- [Async UX And Errors](./async-ux-and-errors.md)
- [API Feedback Toasts](./api-feedback-toasts.md)
- [Loaders, Skeletons, And Concurrency](./loaders-skeletons-and-concurrency.md)
- [Accessibility](./accessibility.md)
- [Styling](./styling.md)
- [Responsive Markup](./responsive-markup.md)
- [Testing](./testing.md)
- [Test Mocks, Fixtures, And Builders](./test-mocks-fixtures-and-builders.md)
- [Coverage And Git Hooks](./coverage-and-git-hooks.md)
- [Change Discipline](./change-discipline.md)
- [Maintainability Hygiene](./maintainability-hygiene.md)
- [Cleanup And Orphaned Code](./cleanup-and-orphaned-code.md)
- [Operational Delivery Guardrails](./operational-delivery-guardrails.md)
- [Final Review Checklist](./final-review-checklist.md)

Cursor-facing copies live in `.cursor/rules`.

## Non-Negotiables

- Keep the project frontend-only.
- Keep TypeScript strict.
- Do not use `any`.
- Do not add forbidden libraries.
- Do not modify rules markdown unless the user explicitly asks to change rules.
- Do not move business logic into page components.
- Keep modules aligned with SOLID principles without over-engineering.
- Do not add abstractions, providers, contexts, generic engines, or infrastructure for hypothetical needs.
- Keep React render pure, effects leak-free, list keys stable, and frontend safety boundaries explicit.
- Large features need concise markdown docs focused on fragile behavior and contracts.
- Keep imperative orchestration separate from declarative rendering.
- Do not scatter hardcoded domain values or mock data.
- Keep all user-facing copy in English `next-intl` messages, even while `en` is the only locale.
- Extract shared concepts used 2 or more times into reusable typed abstractions.
- Do not weaken accessibility to move faster.
- Do not leave TODOs, debug logs, commented-out code, vague helpers, or dead branches.
- Do not leave empty folders, placeholder files, orphaned code, stale docs, or obsolete tests.
- Do not add dependencies, config, generated files, or environment assumptions casually.
- Keep async states explicit and accessible.
- Route server-facing request feedback through Axios interceptors and meaningful bottom-right toast notifications.
- Use button-level pending states, concurrency blocking for same-model mutations, and layout-stable skeletons for server-read surfaces.
- Maintain 90%+ coverage through pre-commit and pre-push gates.
- Reuse typed test builders, fixtures, and mocks instead of duplicating payloads.
- Verify with lint, tests, and build before handoff.
