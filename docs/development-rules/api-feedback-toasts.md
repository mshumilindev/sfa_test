# API Feedback Toasts

Server-facing request feedback must be consistent without creating notification noise.

## Requirements

- All app API requests go through the shared Axios client.
- The Axios client defines response and error interceptors for server-facing requests.
- Error feedback should be centralized through interceptors where practical.
- Success toasts are only for user-triggered mutations such as submit, create, update, delete, withdraw, or retry actions that change server state.
- Background reads and ordinary GET requests are silent on success.
- Do not show success toasts for loading candidates, checking email availability, or loading exam windows.
- Toasts render in the bottom-right corner.
- Toasts stack vertically.
- New toasts appear at the bottom of the stack.
- Every toast has a real close button.
- Toasts auto-dismiss after 10 seconds.
- Toast text must be meaningful and user-actionable.
- Do not show raw messages like `Bad Request`, `Not Found`, `Internal Server Error`, or Axios internals.
- Field validation errors stay inline near fields.

## Ownership

- Toast store owns toast state and dismiss timers.
- Toast viewport owns rendering, stacking, close controls, and accessibility.
- API services own typed request/response behavior.
- Components should not duplicate interceptor-level feedback.

## Accessibility

Toasts must be keyboard-accessible, use appropriate live-region semantics, not rely on color alone, and never steal focus for passive feedback.
