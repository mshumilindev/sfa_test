# Testing

Tests should protect user-facing behavior and domain rules.

## Required For Changes

- Schema changes: schema tests.
- Wizard changes: React Testing Library tests.
- Accessibility behavior changes: role, label, focus, or error tests.
- Data transformation changes: focused unit tests.
- Extracted imperative/domain logic: pure unit tests where practical.
- New functionality must keep coverage above the configured threshold.
- Target 90%+ coverage; 100% is preferred where meaningful.
- Repeated test payloads, fixtures, mock API responses, and setup must be extracted into typed reusable builders or test utilities.

## Test Integrity

- Do not “fix” tests just to make them green when a failure may point to a real bug.
- Treat failing tests as possible evidence of a broken requirement.
- Fix production code before changing tests.
- Change existing tests only when the required behavior changed.
- Add or extend tests to strictly cover new functionality from the task requirements.
- Never weaken assertions, delete meaningful edge cases, or mock away real behavior to hide a defect.
- If a test itself is incorrect, replace it with a stricter requirement-aligned test.
- Do not test everything through a full-page render when a pure function, hook, or smaller component boundary is clearer.
- Do not mock away the behavior the test is supposed to protect.
- Mock responses must match explicit API response types.

## Commands

```bash
npm run lint
npm run test:coverage
npm run build
```
