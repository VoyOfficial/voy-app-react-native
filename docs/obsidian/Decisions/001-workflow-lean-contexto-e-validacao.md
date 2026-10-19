---
type: decision
id: "001"
date: 2026-10-19
status: accepted
tags: [workflow, harness, testing]
task: workflow-lean
---

# 001 — Workflow lean, contexto sob demanda e TDD fora do loop

Decisoes portadas do historico de um app irmao com o mesmo harness, adaptadas a este repositorio (Cursor, sem Kiro, E2E ainda nao configurado).

## Contexto enxuto

`architecture.mdc` e `solid-principles.mdc` saem do always-on e carregam quando ha codigo em `src/**/*.{ts,tsx,js,jsx}`. `AGENTS.md` vira ponte. `harness-engineering.mdc` e a fonte unica do workflow e fica always-on.

## Testes sem RED → GREEN → REFACTOR

Testes continuam obrigatorios por camada. O ciclo red-green-refactor dentro do loop do agente sai do fluxo: custa varios turnos, varia entre modelos e nao transfere o beneficio humano do TDD. O feedforward desenha a solucao inteira antes da primeira edicao. Regra: `testing-workflow.mdc`.

## Spec Lean como default

`/speckit.lean-plan`, `/speckit.lean-checks` e `/speckit.verify` cobrem feature de um modulo. Os comandos `speckit.*` tradicionais permanecem para feature grande ou multi-modulo. A implementacao lean comeca numa janela zerada, com `plan.md` e `checks.md` como unica entrada.

## Validacao independente e deterministica

Quem implementa nao declara done. `/speckit.verify` roda num contexto novo e delega a estrutura ao `/code-reviewer`, que e a unica copia do checklist de review. Nao ha hook de Stop neste repo; a porta e o comando, nao um trigger automatico.

O pre-push bloqueia so a duplicacao que o range introduz (`scripts/duplication-check-range.sh`). O agregado de `src/` nao entra no hook. `./scripts/validate-dod.sh` executa os gates que o DoD ja descrevia.

Playwright fica de fora: e web-only. O gate visual segue suspenso ate existir Detox ou Maestro.

## O que nao mudou

Subagentes continuam em `.cursor/agents/` e skills em `.cursor/skills/`, ambos sob demanda. Converte-los uns nos outros nao reduz contexto.
