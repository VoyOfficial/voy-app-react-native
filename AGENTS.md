# Agent Instructions

Ponte para o workflow. A fonte unica operacional e `.cursor/rules/harness-engineering.mdc`.

## O que carregar

- Sempre: `harness-engineering.mdc`, `voy-app.mdc`, `code-conventions.mdc`
- Ao editar `src/**/*.{ts,tsx,js,jsx}`: `architecture.mdc`, `solid-principles.mdc`
- Sob demanda: `definition-of-done.mdc`, `testing-workflow.mdc`, `spec-lean.mdc`, `validation-pyramid.mdc`, `memory-system.mdc`, `pre-commit-hooks.mdc`

Skills em `.cursor/skills/`. Subagentes em `.cursor/agents/` (`/code-reviewer`, `/github`, `/qa`, `/ui`, `/feature`).
Comandos em `.cursor/commands/`. Fluxo default de spec: `/speckit.lean-plan`. Os comandos `speckit.specify`, `speckit.plan` e `speckit.tasks` ficam para feature grande ou multi-modulo.

Nao commitar `CURRENT_WORK.md` nem `CONTEXT.md`.

<!-- SPECKIT START -->

Nenhuma feature em andamento via Spec Kit no momento. Ao rodar `/speckit.specify`, o contexto desta secao e atualizado automaticamente.

<!-- SPECKIT END -->
