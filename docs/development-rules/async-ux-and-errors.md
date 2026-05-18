# Async UX And Errors

Async behavior must be visible, accessible, and recoverable.

## Rules

- SWR owns server loading, error, data, and mutation states.
- User-triggered async actions need visible pending states.
- Submit buttons should prevent duplicate submissions while pending.
- The activated mutation control should show its own pending indicator.
- Controls that could trigger conflicting requests for the same data model should be disabled while pending.
- Primary server-read surfaces should use skeletons that preserve layout dimensions.
- Do not swallow errors silently.
- Do not show raw implementation errors to users.
- Server-facing request failures should surface through the shared meaningful toast system unless the requirement calls for inline handling.
- Server-facing request success toasts are only for user-triggered mutations; background reads should stay silent on success.
- Do not show raw HTTP/status text such as `Bad Request` or `Not Found`.
- Field errors must be connected to fields.
- Non-field errors should use semantic alert or status regions.
- Retry behavior, if added, must use real buttons and named handlers.

## Tests

Important async actions should have tests for pending, disabled, success, and error behavior when those states are part of the requirement.
