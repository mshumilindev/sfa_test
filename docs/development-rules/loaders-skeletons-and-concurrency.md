# Loaders, Skeletons, And Concurrency

Loading UX must protect data integrity and prevent layout shift.

## Mutations

When a button triggers a server mutation:

- Put a loader on the activated button.
- Disable the activated button while pending.
- Disable other controls that could mutate, refresh, or invalidate the same data model while pending.
- Prevent duplicate submissions.
- Prevent concurrent mutations against the same model unless explicitly designed and tested.
- Restore controls only after success, handled failure, or cancellation.

## Read Requests

When fetching server data:

- Use skeletons for primary data surfaces.
- Skeletons must match final layout dimensions.
- Skeletons must reserve space for repeated rows, cards, tables, controls, and headings.
- Data resolution must not cause layout shift.
- Avoid replacing full content regions with tiny loading text.

## Ownership

- SWR owns server loading and mutation state.
- React Hook Form owns form submit state.
- Components derive disabled and loading UI from those owners.
- Zustand must not store server pending state.

## Accessibility

Pending controls must expose disabled or busy state. Skeletons should not be announced as meaningful content. Loading must not steal focus.
