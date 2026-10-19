> Write one consolidated plan for a single-module feature and stop for human review.
>
> **Suggested next step:** after the plan is accepted, run `/speckit.lean-checks`.
>
> Traditional `/speckit.specify`, `/speckit.plan`, and `/speckit.tasks` stay available for a large or multi-module feature. See `.cursor/rules/spec-lean.mdc`.

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outcome

Create or update `plan.md` for the feature (under the active spec directory when one exists, otherwise `specs/lean/plan.md`). Do not implement code. Do not generate a component catalog, `research.md`, `data-model.md`, or `tasks.md`.

## Plan sections

Fill every section. If a section is unknown, write `NEEDS CLARIFICATION` and stop.

1. **Problem** — who is blocked, and what changes for them.
2. **Flow** — the path from trigger to outcome, including empty and error.
3. **Impact** — bounded context and layers (`domain` / `data` / `presentation`). List files to add or change.
4. **Relations** — existing UseCases, screens, and shared units this flow touches. Search before proposing a new component, hook, helper, or service.
5. **Surface** — what the user sees or what the caller invokes. No widget inventory.
6. **Landing** — where the code lives (feature vs `src/shared`). Shared only when a second feature already needs it.
7. **Criteria** — observable acceptance checks. Each one must be provable later by a test, a command, or a stated manual check.

## Before writing

1. Read the GitHub Issue when the input or branch names one (`gh issue view`).
2. Read `.cursor/rules/voy-app.mdc` and, if the change touches `src/`, `.cursor/rules/architecture.mdc`.
3. Search `src/shared/` and the target feature for something to reuse.

## Stop

Print the plan path and ask for review. Do not start implementation in this turn.
