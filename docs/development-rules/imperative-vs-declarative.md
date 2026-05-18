# Imperative vs Declarative Separation

Declarative UI and imperative orchestration must stay separate.

## Goal

Components should render prepared state. Hooks, services, schemas, route handlers, and pure utilities should own behavior.

## Extract From Components

- Business decisions.
- Sorting and filtering.
- Payload building.
- Status and label mapping.
- Date formatting.
- Error normalization.
- Validation conditions.
- Focus orchestration.
- Complex event workflows.

## Testability

Domain logic should usually be testable without rendering a page. Component tests should focus on user interactions, accessibility, focus behavior, and visible output.

## JSX Rule

JSX should stay boring. If JSX starts explaining the business process, move that process into a named function, hook, schema, or utility.
