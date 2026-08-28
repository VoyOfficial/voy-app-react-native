---
name: reactotron
description: Local debugging for React Native with Reactotron MCP integration for state inspection, action tracking, and timeline analysis.
metadata:
  version: '1.0.0'
  status: active
  owner: squad-app
  tags: [reactotron, debugging, development, state]
---

# Skill: Reactotron Debugging

## When to use

- Teste falhando sem causa clara
- Fluxo quebrado (navegação, busca, autenticação)
- Divergencia entre action/evento e state
- Investigar sequencia de eventos durante desenvolvimento

## When not to use

- Producao ou historico de erros (usar ferramenta de monitoramento quando adotada)
- Analise estatica de codigo (use lint/tsc/review)
- Performance profiling (use React DevTools/Flipper)

## Inputs

- Test scenario or flow to debug
- Expected vs observed behavior
- Component/ViewModel under investigation

## Outputs

- Timeline of events with action/state correlation
- Root cause identification
- State divergence analysis
- Evidence for test fixes or code changes

## Allowed tools

- Reactotron MCP tools: `get_connection_status`, `clear_messages`, `get_logs`, `get_timeline`, `get_state`, `get_state_actions`, `get_state_changes`, `dispatch_action`, `run_custom_command`
- Terminal tools for test execution
- File reading/editing for implementation fixes

## Constraints and guardrails

- Always confirm connection status before debugging
- Clear message buffer before reproducing issue
- Correlate timeline with state actions for full picture
- Document evidence in test files or session notes

## Operational patterns

### Standard workflow (4 steps)

1. **Confirmar conexao e limpar buffer**

   - Use `get_connection_status` to verify Reactotron is connected
   - Use `clear_messages` to start with clean slate

2. **Reproduzir bug**

   - Execute test or manually trigger flow
   - Ensure Reactotron captures all events

3. **Coletar logs/timeline/actions**

   - Use `get_logs` for errors/warnings
   - Use `get_timeline` for event sequence
   - Use `get_state_actions` to confirm dispatched actions/state changes

4. **Confirmar state final e registrar causa raiz**
   - Use `get_state` to validate final state
   - Use `get_state_changes` to track state mutations
   - Document findings and fix approach

### Essential MCP commands

1. `get_connection_status` - Verify Reactotron connection
2. `clear_messages` - Clear buffer before test reproduction
3. `get_logs` - Extract error/warning evidence
4. `get_timeline` - View event sequence chronologically
5. `get_state` - Inspect current state tree (ViewModel state, context, etc.)
6. `get_state_actions` - List all dispatched actions/events
7. `get_state_changes` - Track state mutations over time

### Investigation patterns

**For failing tests:**

```
1. Clear buffer
2. Run specific test
3. Get logs → identify error
4. Get timeline → find divergence point
5. Get state → confirm unexpected value
```

**For broken flows:**

```
1. Clear buffer
2. Execute flow manually
3. Get timeline → verify action sequence
4. Get state actions → confirm all actions fired
5. Get state → validate final state vs expected
```

**For ViewModel debugging:**

```
1. Get state → inspect ViewModel returned state
2. Get state actions → confirm which usecases/actions ran
3. Get state changes → track how ViewModel updated
4. Correlate with timeline for full context
```

### Delivery expectations

Every Reactotron analysis must answer:

1. O que iniciou o problema?
2. Onde o fluxo divergiu do esperado?
3. Qual state esperado vs observado?
4. Qual evidencia (logs/timeline/actions) valida a correcao?

## Usage examples

```markdown
/qa investigar falha no teste usePlaceList.test.ts com logs e timeline do Reactotron
analisar por que o ViewModel nao atualiza o state apos o UseCase resolver
revisar fluxo ViewModel -> UseCase -> Repository na tela de busca
/qa confirmar que o usecase GetPlaceListUseCase foi executado durante o teste
```

## Integration with test workflow

Reactotron is especially valuable during TDD cycles:

1. **Red phase**: Use Reactotron to understand why test fails
2. **Green phase**: Verify action/state correlation matches expectations
3. **Refactor phase**: Confirm no regressions in action sequence
