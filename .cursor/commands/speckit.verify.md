> Independently verify a lean implementation. The author of the code does not run this command.
>
> Structural review is delegated to `/code-reviewer`. Do not copy that checklist here.

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty). Optional: target branch (default `develop`).

## Independence

Refuse to verify if this same context implemented the change. Ask for a fresh agent. "Done" is not declared by the author.

## Inputs

1. `plan.md` and `checks.md` for the feature.
2. The diff `base..HEAD` (three-dot). Default base is `develop` when it exists, otherwise `main`.
3. Tests and commands named as proofs in `checks.md`.

## Steps

1. Resolve the base branch and list commits and files: `git diff --stat <base>...HEAD`.
2. For each check, record **claim**, **proof**, and **result** (`proven`, `missing`, or `contradicted`). Run the named test or command when it is local and deterministic. Do not invent a passing result.
3. **Scope drift:** any file in the diff that the plan Surface / Impact did not list is a finding. Classify it as required follow-through or out of scope.
4. **Hallucination:** behavior described as done with no matching code or test is `contradicted`.
5. Delegate structure, Clean Architecture, and reuse to `/code-reviewer` against the same base. Paste its verdict. Do not re-audit those items here.
6. Publish a short report:

```markdown
**Verify:** pass | fail
**Checks:** proven N / missing N / contradicted N
**Out of scope files:** N
**Code review:** approve | changes required
```

Fail the verify when any check is missing or contradicted, when out-of-scope files are unexplained, or when `/code-reviewer` returns changes required.

## Silence

If there is no `checks.md` and the conversation is planning, docs, or discussion, do not start a review. Say that verify is idle.
