> Turn an accepted lean plan into proofs, then implement the whole block.
>
> **Suggested next step:** in a fresh context, run `/speckit.verify`.
>
> Requires an accepted `plan.md`. See `.cursor/rules/spec-lean.mdc`.

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Phase isolation

Start from the plan, not from the planning chat. If this context already designed the plan, say so and ask for a fresh window before implementing. Writing `checks.md` in the planning window is fine. Implementation belongs to a window whose only inputs are `plan.md` and `checks.md`.

## checks.md

Derive `checks.md` next to `plan.md`. One block per criterion:

```markdown
## C1 — <observable claim>
- Proof: <test name, command, or manual check>
- Layer: domain | data | presentation
- Files: <paths>
```

End with:

- **Coverage** — which plan criteria have a proof, and which do not.
- **Handoff** — base branch, files in Surface, and the command `/speckit.verify`.

Do not add criteria that the plan did not ask for.

## Implement

After `checks.md` exists, implement the whole block:

- Follow the file list in the plan.
- Tests are mandatory and prove the claims (`testing-workflow.mdc`). Do not run a red-green-refactor loop inside this turn.
- Keep `domain` free of React, React Native, and `data` / `presentation` imports.
- Reuse a shared unit when one already matches. Do not put a single-feature unit in `src/shared/`.

## Stop

Do not declare the work done. Point to `/speckit.verify` in a context that did not write this code.
