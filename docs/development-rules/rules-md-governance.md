# Rules Markdown Governance

Rules files define project governance and must not be changed casually.

## Protected Files

- `.cursor/rules/*.md`
- `docs/development-rules/*.md`
- Rule sections inside `README.md`

## Policy

- Do not modify rule files unless the user explicitly asks to change rules.
- Do not weaken rules to make code easier to write.
- Do not delete, rename, merge, or contradict rules without explicit approval.
- If implementation cannot satisfy a rule, fix implementation or ask the user.

## When Changing Rules

- Update Cursor-facing rules.
- Update human-readable docs.
- Update docs index links.
- Update final checklist when review behavior changes.
- Keep rules strict, specific, and enforceable.
