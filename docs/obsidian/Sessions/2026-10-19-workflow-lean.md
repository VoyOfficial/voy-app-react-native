---
type: session
date: 2026-10-19
status: closed
parent_session: none
tags: [workflow, harness]
task: workflow-lean
---

# Workflow lean neste repositorio

## Contexto

Portar para este app as quatro frentes ja aplicadas num projeto irmao com o mesmo harness: contexto always-on menor, Spec Lean, gates deterministicos e review em camadas com Reuse-First.

## O que foi feito

- Contexto always-on medido neste repo: 45.912 → 20.211 caracteres (−56%), com `architecture.mdc` e `solid-principles.mdc` fora do always-on.
- `AGENTS.md` virou ponte. O workflow operacional ficou em `harness-engineering.mdc`.
- `tdd-workflow.mdc` foi substituido por `testing-workflow.mdc`: testes obrigatorios, sem ciclo red-green dentro do agente.
- Comandos `/speckit.lean-plan`, `/speckit.lean-checks` e `/speckit.verify`, com a regra `spec-lean.mdc`.
- Pre-push chama `scripts/duplication-check-range.sh` so no range do push. `yarn duplication:check:range` inspeciona o mesmo recorte.
- `scripts/validate-dod.sh` cobre os cinco gates do DoD. Gate 2 permanece suspenso. Gate 3 e Gate 5 sao orientados.
- `/code-reviewer` ganhou Reuse-First bloqueante, nos dois sentidos (nao duplicar `src/shared`, nao promover uso de um unico feature).

## Decisoes tecnicas

- [[Decisions/001-workflow-lean-contexto-e-validacao]]
- Duplicacao do repositorio inteiro nao bloqueia push. O hook olha apenas o range.
- Nao ha equivalente confiavel ao hook de Stop do outro projeto. A independencia fica em `/speckit.verify`.
- Subagentes nao foram convertidos em skills.

## Arquivos modificados

- `.cursor/rules/harness-engineering.mdc`
- `.cursor/rules/testing-workflow.mdc`
- `.cursor/rules/spec-lean.mdc`
- `.cursor/agents/code-reviewer.md`
- `.husky/pre-push`
- `scripts/validate-dod.sh`
- `scripts/duplication-check-range.sh`

## Proximos passos

- Nenhum neste bloco. O PR leva o workflow para review.
