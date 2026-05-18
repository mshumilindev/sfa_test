# Cleanup And Orphaned Code

Do not leave unused structure behind.

## Rules

- No empty folders.
- No placeholder files.
- No files that only contain comments or TODOs.
- No directories created “for later”.
- Remove functionality that is no longer reachable or used.
- Remove unused components, hooks, utilities, schemas, stores, types, styles, tests, fixtures, and docs.
- Remove obsolete CSS classes and stale mock data.
- Remove orphaned routes and API handlers unless they are explicitly required.

## After Refactors

- Update imports.
- Delete old files.
- Delete or update obsolete tests.
- Delete or update obsolete docs.
- Remove now-empty folders.

## Safety

Before deleting, confirm usage with repo search. Do not delete user work blindly. Do not delete rule files unless the user explicitly asks to change rules.
