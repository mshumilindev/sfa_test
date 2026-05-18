# React Runtime Safety And Scalability

React code must be safe under concurrent rendering, reconciliation, and repeated mount/cleanup cycles.

## Concurrent Rendering

- Render must stay pure.
- Effects must be idempotent and cleanup correctly.
- Do not rely on render timing or single render execution.
- Do not use mutable module state for UI behavior unless it has a deliberate safe owner.

## Reconciliation

- Use stable domain IDs as list keys.
- Do not use array index keys for reorderable, sortable, filterable, insertable, or removable lists.
- Do not define components inside render.
- Avoid accidental remounts caused by unstable keys or changing tree shape.

## Memory Leaks

- Clean up timers, intervals, listeners, observers, and subscriptions.
- Abort or ignore stale async work where relevant.
- Do not suppress effect dependency issues to make warnings disappear.
- Avoid `useEffect` for derived values.

## Frontend Safety

- Do not render untrusted HTML.
- Avoid `dangerouslySetInnerHTML` unless explicitly required and reviewed.
- Do not store or log secrets, tokens, credentials, private identifiers, or sensitive payloads.
- Validate unknown data at boundaries.
- Do not expose raw implementation errors to users.

## Scalability

- Keep state at the smallest correct scope.
- Keep feature boundaries modular.
- Avoid global state for local concerns.
- Use pagination, filtering, or virtualization when lists can grow large.
- Do not add architecture for hypothetical scale.
