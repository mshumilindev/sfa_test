# Operational Delivery Guardrails

Implementation must not quietly damage dependencies, config, generated files, or deliverability.

## Dependencies

- Add dependencies only when existing stack cannot meet the requirement cleanly.
- Do not add deployment config, CI deployment workflows, or hosting infrastructure for this frontend-only take-home.
- Do not add overlapping libraries.
- Do not replace mandatory libraries.
- Do not casually upgrade or downgrade packages.
- Dependency changes must update the lockfile through the package manager.
- Do not edit lockfiles manually.

## Config And Environment

- Do not hardcode environment-specific URLs, tokens, paths, or secrets.
- Do not introduce `.env` requirements unless explicitly asked.
- Do not add fake credentials, fake tokens, fake API keys, or placeholder secrets.
- Do not commit secrets or local machine paths.
- Runtime config should be typed or validated when it affects behavior.

## Generated Files

- Do not commit `.next`, coverage output, caches, logs, or generated build artifacts.
- Do not edit generated framework files manually.
- Keep `.gitignore` aligned with generated artifacts.

## Browser And Platform

- Use standards-supported browser APIs.
- Target modern evergreen browsers.
- Keep client-only behavior inside client components.
- Do not assume desktop-only interaction.
- Keyboard, touch, and supported responsive widths must keep working.

## Delivery

- Do not mix unrelated changes.
- Do not hide behavior changes inside cleanup.
- Do not overinvest in animations, decorative polish, or product-grade design-system work beyond a clean, professional, accessible UI.
- Keep README and feature docs aligned with implementation.
