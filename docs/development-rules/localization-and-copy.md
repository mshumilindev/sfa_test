# Localization And Copy

The project currently supports only English (`en`), but user-facing copy must still be centralized through `next-intl`.

## Rules

- Do not hardcode visible UI text in JSX.
- Do not hardcode validation messages in schemas.
- Do not hardcode toast messages in interceptors, hooks, or components.
- Field labels, button labels, table labels, aria labels, placeholders, hints, empty states, skeleton labels, and error messages belong in English `next-intl` message files.
- Shared app copy and feature copy must be available through `next-intl` messages with typed access where possible.
- Non-component code such as Zod schemas, route handlers, Axios feedback, and pure utilities may consume typed message helpers derived from the same English `next-intl` messages.
- Domain labels and options should use typed maps keyed by domain unions.

## Allowed Inline Text

Inline text is acceptable for test names, comments, non-user-facing ids/enum values/routes, and static mock fixture values.

## Quality

Copy must be meaningful and user-actionable. Do not show vague messages or raw HTTP/status text.
