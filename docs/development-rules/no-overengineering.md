# No Overengineering

Senior-quality code is not the same as maximum abstraction.

## Rules

- Do not add abstractions for hypothetical future needs.
- Do not add providers, contexts, factories, registries, or generic engines for one use case.
- Do not create app-wide layers for local concerns.
- Do not create shared folders before multiple feature areas need them.
- Do not add wrappers around libraries unless they add project-specific value.
- Do not add design-system scaffolding beyond the components actually needed.
- Do not add infrastructure for scale that does not exist.

## When To Abstract

Abstract when it removes real duplication, protects a real invariant, improves testability, clarifies a boundary, or follows an established local pattern.

## Rule Of Thumb

If deleting the abstraction makes the code easier to understand without breaking a requirement, delete it.
