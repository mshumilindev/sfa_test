# Test Mocks, Fixtures, And Builders

Tests should reuse typed data builders and mocks instead of copy-pasting payloads.

## Rules

- Do not duplicate large test payloads.
- Extract test data used 2 or more times.
- Prefer typed builder functions over static blobs.
- Builders should return valid defaults and accept typed overrides.
- Mock API responses must match explicit API response types.
- Mock at the smallest useful boundary.
- Do not mock away behavior the test should protect.
- Reset mocks between tests.

## Locations

- Cross-feature test utilities: `src/test-utils` or `__tests__/test-utils`.
- Feature-specific test utilities: `src/features/<feature>/test-utils`.
- Domain fixtures must use exported domain types.

## Goal

Reusable test builders should make tests shorter, stricter, and easier to update when domain contracts change.
