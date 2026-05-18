# SOLID And Boundaries

Use SOLID principles pragmatically to keep frontend code maintainable.

## Rules

- One component, hook, utility, service, or store should have one primary reason to change.
- Extend domain mappings through typed config, schemas, maps, or focused components.
- Reusable components must behave consistently for all valid props.
- Keep props and hook return values narrow.
- UI components depend on typed hooks/services, not raw HTTP calls.
- Domain logic should be testable without rendering full pages.

## Avoid

- God components.
- God hooks.
- Broad config objects.
- Utility dumping grounds.
- Many boolean props that make one component act like several components.
- Editing many unrelated branches to add one domain option.
