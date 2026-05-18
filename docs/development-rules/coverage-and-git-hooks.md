# Coverage And Git Hooks

Coverage and Git hooks are required quality gates.

## Coverage

- Minimum acceptable coverage is 80%.
- Project target is 90%+ for statements, branches, functions, and lines.
- 100% is preferred when it is practical and meaningful.
- Do not lower thresholds to ship code.
- Do not exclude files from coverage just to improve numbers.
- New functionality should add or extend tests that cover the requirement.

## Hooks

- Pre-commit runs staged-file checks and coverage.
- Pre-push runs full validation: typecheck, lint, coverage tests, and production build.
- Do not bypass hooks with `--no-verify` unless the user explicitly approves an emergency.
- Do not edit hooks to skip coverage.

## Failure Policy

If coverage drops below the threshold, the fix is meaningful tests or less unnecessary code, not weaker gates.
