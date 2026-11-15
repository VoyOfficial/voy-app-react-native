# Lean Plan — Tela de busca: voltar, dropdown e filtros (#98)

**Issue:** [#98](https://github.com/VoyOfficial/voy-app-react-native/issues/98)  
**Grill:** domínio já existente. Ordenação é uma escolha. Filtro são vários tipos. O botão da esquerda só abre o painel. Cada seção vira o próprio dropdown. O voltar fica à esquerda desse botão.

`specs/lean/checks.md` ainda é o da #95. Não usar até `/speckit.lean-checks`.

## 1. Problem

Quem pesquisa um lugar não tem como voltar pelo lado esquerdo do botão de opções. Ordenação e filtro só mostram ou escondem uma view no fluxo da tela. A escolha não entra na busca: `SearchFactory` fixa `Ordination.Closer` e `[Filter.Entertainment]`, e o modal guarda a seleção só no próprio estado.

O que muda: o voltar fica à esquerda do botão de opções; cada seção do painel é um dropdown; o próximo envio da busca manda a ordenação e os tipos que estão selecionados.

## 2. Flow

### Voltar

1. Trigger: toque no botão à esquerda do botão de opções.
2. `useSearch` chama o `goBack` injetado (`Actions.goBack`, o mesmo de Place List e Place Details).
3. Outcome: a stack volta para Home, que é quem abre `Search`.
4. O header nativo da rota continua sem botão de voltar, para não aparecer dois.

### Abrir o painel

1. Trigger: toque no botão de opções (filtro), que já existe.
2. O painel abre ou fecha (`showFilterOptions`).
3. Os dois dropdowns nascem fechados. Fechar o painel fecha os dois menus.

### Dropdown de ordenação (uma escolha)

1. Trigger: toque em "Ordenar por".
2. O menu abre por cima do conteúdo. Não empurra a lista de cards.
3. As opções são os valores de `Ordination`: "Mais avaliados", "Mais comentados", "Mais próximo".
4. Escolher uma atualiza o selecionado e fecha o menu.
5. Abrir este menu fecha o de filtro.

### Dropdown de filtro (várias escolhas)

1. Trigger: toque em "Filtrar por".
2. O menu abre por cima, com os valores de `Filter`.
3. Cada toque marca ou desmarca o tipo. O menu continua aberto.
4. Abrir este menu fecha o de ordenação.

### Buscar

1. Trigger: submit do campo "Pesquisar lugares..." (o mesmo de hoje).
2. O app lê a ordenação e os tipos selecionados naquele momento.
3. Coordenadas seguem como hoje (`LocationService`).
4. `searchPlaces.search` recebe esse `FilterParam`. `RemoteSearchPlaces` já coloca `{ types, ordination }` no body. A camada `data` não muda.
5. Sem interação prévia, a primeira busca envia `Ordination.MostRated` ("Mais avaliados", que é o selecionado visível) e `types: []` (nenhum tipo marcado). O body de filtro é opcional no contrato da #95.
6. Trocar ordenação ou filtro não dispara outra busca. O envio novo acontece no próximo submit.
7. Empty: HTTP 204 ou falha já zeram a lista. Sem tela nova de erro.

## 3. Impact

**Bounded context:** tela Search. Um módulo.

| Layer | Mudança |
|-------|---------|
| `domain` | Nenhuma. `FilterParam`, `Filter` e `Ordination` continuam o contrato. |
| `data` | Nenhuma. `RemoteSearchPlaces` já envia o body. |
| `presentation` | Botão voltar, dropdowns no painel, `useSearch` passa a ser a fonte do `FilterParam` enviado. |
| `main/factories` | `searchFactory` deixa de fixar o parâmetro da requisição e injeta `goBack`. |

**Arquivos**

- Change: `src/presentation/search/search.tsx`, `styles.ts`, `useSearch.tsx`, `modal/index.tsx`, `modal/styles.ts`, `model/Filter.ts`, `src/main/factories/presentation/searchFactory.tsx`
- Testes: `tests/presentation/search/index.spec.tsx`, `useSearch.spec.tsx`, `modal/index.spec.tsx`, `model/Filter.spec.ts`

**Fora:** `getScreensStack.tsx` (o voltar é da tela, não do header nativo), `remoteSearchPlaces.ts`, biblioteca nova de dropdown, `src/shared/`, migração para `src/features/`.

## 4. Relations

Reusar:

- `Icon` `arrow_left` e `Actions.goBack`
- `Filter` e `Ordination` (`src/domain/enums`) como texto visível e valor enviado
- `FilterParam` e `SearchPlaces`
- `useSearch`, `FilterModal` e o model `Filter`
- `LocationService` no caminho atual de busca

O model `Filter` monta as listas a partir dos enums, para o rótulo ser o valor do POST. Some com isso a divergência atual ("Distância" / "Cafeterias" / "Esportes" contra "Mais próximo" / "Cafeteiras" / "Esporte").

Não criar use case, hook compartilhado, componente em `src/shared/` nem dependência de dropdown. Só a Search consome isso.

## 5. Surface

- Botão de voltar à esquerda do botão de opções.
- O botão de opções continua abrindo o painel.
- Dentro do painel, "Ordenar por" é um dropdown de uma escolha e "Filtrar por" é um dropdown de várias.
- O submit da busca envia a seleção atual.

## 6. Landing

| Quê | Onde |
|-----|------|
| View, dropdown e ViewModel | `src/presentation/search/` |
| Composição (`goBack`, use case, location) | `src/main/factories/presentation/searchFactory.tsx` |
| Contrato já existente | `src/domain/params/filterParam.ts`, `src/domain/enums/` |
| POST já existente | `src/data/useCases/remoteSearchPlaces.ts` (sem edição) |

## 7. Criteria

1. O botão de voltar renderiza à esquerda do botão de opções e chama `goBack`. **Prova:** teste da tela Search.
2. "Ordenar por" abre um menu com os três valores de `Ordination`, a escolha fica selecionada e o menu fecha. **Prova:** teste do modal.
3. "Filtrar por" abre um menu com os valores de `Filter`; marcar e desmarcar vários não fecha o menu. **Prova:** teste do modal.
4. A primeira busca, sem mexer no painel, envia `ordination: Ordination.MostRated` e `types: []`. **Prova:** `useSearch.spec.tsx`.
5. Depois de mudar ordenação e tipos, o submit envia esse `FilterParam`, e não `Closer` + `[Entertainment]`. **Prova:** `useSearch.spec.tsx` com `SearchPlaces` fake.
6. Os rótulos das opções são os valores dos enums. **Prova:** `Filter.spec.ts`.
7. O body do POST continua `{ types, ordination }` quando o use case é chamado. **Prova:** `remoteSearchPlaces.spec.ts` existente, sem alteração de produção.
8. Check manual: na tela, o voltar fica à esquerda do filtro; cada dropdown abre por cima da lista; uma busca após trocar ordenação e tipos mostra esses valores no body.

---

**Stop.** Aguardando revisão humana. Próximo passo após aceite: `/speckit.lean-checks`.
