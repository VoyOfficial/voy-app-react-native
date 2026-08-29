# Agent Instructions (Resumo)

## 1) Workflow Padrão (Obrigatório)

Use Harness Engineering para qualquer tarefa de código neste repositório.

Fluxo base:

1. Session startup
2. Feedforward (contexto)
3. Implementação (TDD)
4. Feedback (validação)
5. Commit + session save

Referência detalhada: `.cursor/rules/harness-engineering.mdc`

## 2) Session Startup (sempre no primeiro prompt)

1. Rodar `git branch --show-current` e identificar a Issue relacionada (ex.: `feature/12-nome-da-feature`).
2. Ler `CURRENT_WORK.md`.
3. Consultar `docs/obsidian/Sessions/ISSUE-<n>-*.md`.
4. Se houver Issue pai, consultar sessão relacionada.
5. Reportar em 1-2 linhas: task ativa + próximo passo.

Fonte da verdade de sessão: `docs/obsidian/Sessions/`

## 2.1) GitHub Project (tarefas e cards)

- **Board da org:** [Project #1](https://github.com/orgs/VoyOfficial/projects/1) (`VoyOfficial`, Projects v2)
- **Issues** = especificação da tarefa (critérios, discussão, links)
- **Project** = fila do time, status e visão de cards/colunas (backlog, em progresso, review, done)
- **Antes de iniciar trabalho:** consultar o board (Status, prioridade) e a Issue relacionada
- **Ao criar/atualizar Issue ou PR:** sincronizar no board (detalhes em `.cursor/skills/github/SKILL.md`)
- **Comandos úteis:** `gh project view 1 --owner VoyOfficial`, `gh project field-list 1 --owner VoyOfficial --format json`

## 3) Feedforward antes de codar

1. Carregar contexto da sessão atual.
2. Ler a Issue no GitHub (`gh issue view <n>`).
3. Validar critérios de aceite e contexto funcional.
4. Consultar rules relevantes em `.cursor/rules/`.
5. Confirmar padrões de Clean Architecture + MVVM (camadas `domain`/`data`/`presentation`).

### Diretriz de implementação

- Seguir YAGNI: implementar apenas o necessário para o requisito atual.
- Preferir soluções curtas e diretas, sem comprometer legibilidade e testabilidade.
- Respeitar a regra de dependência: `domain` nunca importa de `data`/`presentation`/React/React Native.

## 4) Qualidade e Gate de Conclusão

Ordem obrigatória de validação:

1. Unit tests
2. Integration tests
3. E2E (quando configurado no projeto — ainda não é gate hoje)

**Definition of Done (DoD) Harness:**

Antes de concluir qualquer task, executar validação dos gates ativos:

1. Gate 1: Código e Testes (unit + integration + TS + lint)
2. Gate 2: E2E (N/A por enquanto — reativar quando o projeto configurar um framework de E2E)
3. Gate 3: Code Review (via `/code-reviewer`)
4. Gate 4: Documentação Obsidian (YAML completo)
5. Gate 5: PR no GitHub

Referências:

- `.cursor/rules/definition-of-done.mdc` ⭐ DoD Harness
- `.cursor/rules/validation-pyramid.mdc`
- `.cursor/rules/tdd-workflow.mdc`
- `.cursor/rules/architecture.mdc`

## 5) Commits

Padrão obrigatório: **Conventional Commits em inglês**, com escopo `modulo/arquivo`:

```
<type>(<module>/<file>): <description>
```

Tipos permitidos: `feat`, `fix`, `refactor`, `test`, `docs`, `style`, `chore`, `perf`

Regras:

1. Escopo = pasta/módulo + arquivo principal alterado (ex.: `main/placelistfactory`).
2. Descrição em inglês, minúscula, modo imperativo (ex.: "add", "fix", "extract").
3. Commits atômicos (1-3 arquivos quando possível, ordenados por dependência: `domain` → `data` → `presentation` → testes).
4. Não usar corpo de commit; apenas `-m` em uma linha.
5. NUNCA usar `--no-verify` ou `HUSKY=0`. Se lint falhar, corrigir o código.
6. **NUNCA commitar**: arquivos de documentação de gestão local (`CURRENT_WORK.md`, `CONTEXT.md`). `docs/obsidian/` pode ser versionado se o time optar por isso.

Exemplos válidos:

- `feat(main/placelistfactory): pass listPlaces and navigate by param to usePlaceList`
- `fix(checkout/paymentusecase): handle null card token before charging`
- `test(shared/formatcurrency): add edge cases for negative values`

Exemplos inválidos:

- `feat: adiciona fallback` (sem escopo, e em português)
- `TASK-123: fix bug` (formato antigo baseado em Azure DevOps)

## 6) Session Save

Ao fim de trabalho significativo:

1. Atualizar/criar sessão em `docs/obsidian/Sessions/`.
2. Atualizar `CURRENT_WORK.md` (active/completed/blocked).
3. Incluir próximos passos objetivos.

**Consolidação de Sessões** (evitar granularidade excessiva):

- Uma sessão por **bloco de trabalho coeso** (4-8h), não por micro-fix
- Agrupar fixes relacionados
- Máximo ~5 sessões por Issue (exceto features muito grandes)
- Se criar sessão nova no mesmo dia, considerar atualizar a existente

Ao finalizar a task (normalmente abertura de PR):

1. Atualizar a Issue no GitHub para o status apropriado (ex.: label `ready-for-review`).
2. Atualizar todas as sessões da Issue para `status: closed`.
3. Garantir `parent_session` explícito em cada sessão (`[[...]]` ou `none`).

Referência detalhada: `.cursor/rules/memory-system.mdc`

## 7) Arquitetura

Clean Architecture + MVVM + princípios de DDD. Cada feature é um bounded context com camadas `domain` (regras de negócio puras), `data` (implementação de repositórios/datasources) e `presentation` (View + ViewModel). Ver `.cursor/rules/architecture.mdc` e `.cursor/rules/voy-app.mdc`.

## 8) Rules Válidas

Todas em `.cursor/rules/`:

- `code-conventions.mdc` (always)
- `architecture.mdc` (always) ⭐ Clean Architecture + MVVM + DDD
- `voy-app.mdc` (always) ⭐ playbook principal
- `solid-principles.mdc` (always)
- `definition-of-done.mdc`
- `documentation.mdc`
- `harness-engineering.mdc`
- `memory-system.mdc`
- `obsidian-integration.mdc`
- `pre-commit-hooks.mdc`
- `tdd-workflow.mdc`
- `validation-pyramid.mdc`

## 9) Skills e Subagentes

- Skills em `.cursor/skills/*/SKILL.md` (ex.: `github`, `figma`, `reactotron`, `session-management`, `spec-driven-eval`, `grill-with-docs`, `thermo-nuclear-code-quality-review`, `agents`). Veja `.cursor/skills/README.md` e `.cursor/skills/agents/SKILL.md` para o guia completo.
- Subagentes em `.cursor/agents/*.md`, invocáveis via `/nome`: `/code-reviewer`, `/github`, `/qa`, `/ui`, `/feature`.
- Comandos Spec Kit e outros workflows em `.cursor/commands/*.md`, invocáveis via `/nome` (ex.: `/speckit.specify`, `/speckit.plan`, `/feature-kickoff`).

<!-- SPECKIT START -->

Nenhuma feature em andamento via Spec Kit no momento. Ao rodar `/speckit.specify`, o contexto desta seção é atualizado automaticamente.

<!-- SPECKIT END -->
