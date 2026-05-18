# Maintainability Hygiene

The codebase should stay easy to scan, review, and change.

## Naming

- Use precise domain names.
- Avoid vague names like `helper`, `manager`, `wrapper`, `thing`, or broad `utils`.
- Boolean names should read as booleans.
- Handler names should describe the user action.

## Size And Shape

- Split files before they become hard to scan.
- Components should have one primary responsibility.
- Long render bodies should be split.
- Long imperative functions should be decomposed into named helpers.
- Avoid broad props and invalid prop combinations.

## Imports And Comments

- Use `type` imports for types.
- Use root path aliases for root folders and cross-boundary imports.
- Keep path aliases aligned with `tsconfig.json`.
- Avoid long `../../..` imports across feature or app boundaries.
- Avoid circular dependencies.
- Avoid unnecessary barrel files.
- Comments explain why, not what.
- No TODO, FIXME, commented-out code, debug logs, or dead branches in finished work.
- No empty folders, placeholder files, orphaned code, stale docs, obsolete tests, or unused CSS classes.

## Review Question

If the code does not map to a requirement, improve clarity, or reduce real duplication, remove it.
