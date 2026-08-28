# 💬 Comentários em Code Review

## 📝 Princípios

1. **Comentar na linha exata** do código (`gh pr review` / `gh api` para inline comments)
2. **Usar português** nos comentários
3. **Ser objetivo** - sem JSDoc excessivo
4. **Perguntar antes de criticar** - entender motivação

---

## 🏷️ Tipos de Comentários

### 1. Memory/Performance

```markdown
**Sugestão - Gerenciamento de memória**

Se este componente desmontar sem fazer o cleanup corretamente,
o listener/subscription pode continuar ativo.

Seria interessante considerar adicionar um cleanup no `useEffect`
para evitar memory leaks.
```

**Quando usar:**

- Vazamento de memória (cleanup, unsubscribe)
- Acúmulo de referências em collections
- Sugerir mecanismos de cleanup

### 2. Clarificação de Código

```markdown
**Dúvida - Função `remeasure`**

Não ficou claro onde e como essa função está sendo utilizada
e qual é o propósito do retorno booleano.

Poderia explicar o fluxo de uso?
```

**Quando usar:**

- Funções/variáveis com propósito não claro
- Retornos booleanos sem contexto
- Fluxos complexos

### 3. Violação de Arquitetura (Clean Architecture)

```markdown
**Bloqueante - Domain importando de data**

Este arquivo está em `domain/usecases/` mas importa
`AsyncStorage` diretamente (linha X).

`domain` deve ficar puro - mover o acesso a storage para uma
`DataSource` em `data/` e injetar via `Repository` (interface).
```

**Quando usar:**

- `domain` importando React/React Native/libs externas
- ViewModel chamando `DataSource`/`RepositoryImpl` diretamente
- UseCase com mais de uma responsabilidade de negócio

### 4. Remoções Intencionais

```markdown
**Dúvida - Remoção do `onLoad`**

Foi removido o callback `onLoadPlaceList` que antes
disparava o carregamento inicial.

Essa remoção foi intencional devido à refatoração do
ViewModel? Ou seja, agora o carregamento acontece
automaticamente no `useEffect`?

Se sim, faz sentido! Mas vale confirmar que não perdemos
nenhum comportamento importante.
```

**Quando usar:**

- Perguntar se remoção foi intencional
- Confirmar funcionalidade não perdida

### 5. Sugestões de Refatoração

````markdown
**Sugestão de refatoração - Mock compartilhado**

Esse mock é bem detalhado (~30 linhas) e provavelmente
será necessário em outros arquivos de teste.

Sugestão: mover para `__mocks__/`.

Isso evitaria duplicação e facilitaria manutenção.

```typescript
// __mocks__/somePackage.ts
// ... código do mock
```
````

**Quando usar:**

- Mocks duplicados → mover para `__mocks__/`
- Código repetido → extrair para helper
- **SEMPRE incluir exemplo de código**

---

## 📋 Template Geral

```markdown
**[Tipo] - Título curto**

Descrição objetiva do ponto.

[Se for pergunta:]
**Qual foi a motivação para essa mudança?**

[Se for sugestão:]
```código
// Código sugerido
```
```

---

## ✅ Checklist de Review

Antes de finalizar review:

- [ ] Verificar gerenciamento de memória em hooks
- [ ] Validar regra de dependência da Clean Architecture (domain puro)
- [ ] Questionar remoções de código
- [ ] Sugerir centralização de mocks
- [ ] Confirmar breaking changes com stakeholders relevantes

---

## 📊 Exemplo Real

**Contexto**: Linha 40-58 em `usePlaceList.ts`

```markdown
**Problema - Código duplicado em catch blocks**

(linha X-Y no arquivo usePlaceList.ts):

```typescript
catch (error) {
  setIsLoading(false);  // ← repetido 3x
  setError(error);
}
```

**Problema Identificado**:
`setIsLoading(false)` está duplicado em 3 catch blocks diferentes.

**Sugestão**:

```typescript
try {
	setIsLoading(true)
	// ...
} catch (error) {
	setError(error)
} finally {
	setIsLoading(false) // ← apenas 1x no finally
}
```

**Motivo**:
Princípio DRY - código duplicado aumenta risco de bugs
quando apenas um dos blocos é atualizado.
```

## 🔧 Comandos úteis (`gh`)

```bash
# Ver PR e arquivos alterados
gh pr view <n> --json files,title,body

# Comentar de forma geral
gh pr comment <n> --body "..."

# Aprovar / solicitar mudanças
gh pr review <n> --approve --body "..."
gh pr review <n> --request-changes --body "..."
```
