# Responsive Markup

Responsive design is a structural requirement for this project, not a visual afterthought.

## Supported Widths

- 320px mobile.
- 768px tablet.
- 1200px desktop.

## Principles

- Start with mobile-first markup and CSS.
- Keep DOM order logical for reading, keyboard navigation, and screen readers.
- Use semantic containers and controls.
- Prefer natural reflow over breakpoint-heavy patching.
- Avoid layout tricks that only work at one viewport width.

## Forms

- Labels remain visible.
- Inputs are readable and easy to tap.
- Field groups collapse to one column on mobile.
- Error messages occupy normal document flow.
- Step navigation wraps without losing keyboard accessibility.

## Tables

- Use semantic table markup for candidate data.
- Put wide tables in a contained horizontal scroll wrapper.
- Avoid page-level horizontal overflow.
- Do not communicate status through color alone.

## Layout

- Use `grid` and `flex` for normal responsive layout.
- Use stable dimensions for repeated controls and rows.
- Skeleton loading states must reserve final content dimensions at 320px, 768px, and 1200px.
- Use `max-width` to preserve readable line lengths on desktop.
- Use CSS custom properties for spacing and sizing decisions.
- Do not use viewport-width typography.

## Verification

Responsive changes are not complete until the UI is checked at 320px, 768px, and 1200px. Verify no overlapping text, no clipped controls, no broken focus states, and no unintended page-level horizontal scrolling.
