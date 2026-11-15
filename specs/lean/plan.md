# Lean Plan — Tela de busca: voltar, dropdown e filtros (#98)

**Issue:** [#98](https://github.com/VoyOfficial/voy-app-react-native/issues/98)  
**Grill:** domínio já existente. Ordenação é uma escolha. Filtro são vários tipos. O botão da esquerda só abre o painel. Cada seção vira o próprio dropdown. O voltar fica à esquerda desse botão.

`specs/lean/checks.md` prova os critérios deste plano.

## 1. Problem

Quem pesquisa um lugar não tem como voltar pelo lado esquerdo do botão de opções. A escolha de ordenação e de filtro não entra na busca: `SearchFactory` fixa `Ordination.Closer` e `[Filter.Entertainment]`, e o modal guarda a seleção só no próprio estado.

Hoje ordenação e filtro não ficam dentro de um dropdown nem de um modal flutuando sobre a lista de lugares. `OrderOptionsWrapper` e `FilterOptionsWrapper` são `View`: o toque só monta ou desmonta essa view dentro do painel (`showOrderList` / `showFilterList`). `FilterModalWrapper` está com `position: absolute`, mas isso não é um `Modal` nem um menu suspenso. As opções crescem no próprio painel.

O que muda: o voltar fica à esquerda do botão de opções; o botão de opções abre um painel flutuante sobre a lista de lugares, com o campo de busca ainda visível; dentro do painel, a ordenação e o filtro são dropdowns; o próximo envio da busca manda a ordenação e os tipos selecionados. A listagem de lugares que já existe permanece.

## 2. Flow

### Voltar

1. Trigger: toque no botão à esquerda do botão de opções.
2. `useSearch` chama o `goBack` injetado (`Actions.goBack`, o mesmo de Place List e Place Details).
3. Outcome: a stack volta para Home, que é quem abre `Search`.
4. O header nativo da rota continua sem botão de voltar, para não aparecer dois.

### Abrir o painel flutuante

1. Trigger: toque no botão de opções, que já existe.
2. Abre um painel flutuante sobre a lista de lugares. O campo de busca continua visível. A ordenação e o filtro ficam dentro do painel.
3. Os dois menus nascem fechados. Fechar o flutuante fecha os dois.
4. A lista de cards continua no lugar, por baixo. O flutuante não entra no fluxo da `CardList`.

### Dropdown de ordenação (uma escolha)

1. Trigger: toque em "Ordenar por", dentro do flutuante.
2. O menu de opções também flutua sobre a lista. Ele deixa de ser a `View` que só aparece e some no fluxo do painel.
3. As opções são os valores de `Ordination`: "Mais avaliados", "Mais comentados", "Mais próximo".
4. Escolher uma atualiza o selecionado e fecha o menu.
5. Abrir este menu fecha o de filtro.

### Dropdown de filtro (várias escolhas)

1. Trigger: toque em "Filtrar por", dentro do flutuante.
2. O menu flutua sobre a lista, com os valores de `Filter`.
3. Cada toque marca ou desmarca o tipo. O menu continua aberto.
4. Abrir este menu fecha o de ordenação.

### Buscar e listar

Hoje a listagem já existe e este plano a mantém:

1. `searchValue !== ''` mostra `CardList` com `placeList` (`search.tsx`).
2. `placeList` só recebe lugares quando `searchTo` termina. O retorno vira cards (`título`, imagem, local, distância, avaliações, nota) via `ListCard`.
3. Campo vazio esconde a lista. HTTP 204 ou falha zeram `placeList`. Sem tela nova de erro.

O disparo de hoje também permanece. Não há busca por letra:

1. `onChangeText` só grava o texto (`changeSearch`). Não chama o serviço.
2. `searchTo` roda no submit do teclado (`onSubmitEditing`).
3. O ícone de lupa não tem `onPress`.
4. Não há debounce, não há mínimo de 3 caracteres e não há busca enquanto a pessoa digita.

Neste fluxo, o submit lê a ordenação e os tipos selecionados naquele momento, busca a coordenada (`LocationService`) e chama `searchPlaces.search`. `RemoteSearchPlaces` já coloca `{ types, ordination }` no body. A camada `data` não muda.

Sem interação no painel, a primeira busca envia `Ordination.MostRated` ("Mais avaliados") e `types: []`. O body de filtro é opcional no contrato da #95. Trocar ordenação ou filtro não dispara outra busca. O envio novo acontece no próximo submit.

## 3. Impact

**Bounded context:** tela Search. Um módulo.

| Layer | Mudança |
|-------|---------|
| `domain` | Nenhuma. `FilterParam`, `Filter` e `Ordination` continuam o contrato. |
| `data` | Nenhuma. `RemoteSearchPlaces` já envia o body. |
| `presentation` | Botão voltar, ordenação e filtro dentro de um flutuante sobre a lista, `useSearch` como fonte do `FilterParam` enviado. A `CardList` da busca permanece. |
| `main/factories` | `searchFactory` deixa de fixar o parâmetro da requisição e injeta `goBack`. |

**Arquivos**

- Change: `src/presentation/search/search.tsx`, `styles.ts`, `useSearch.tsx`, `modal/index.tsx`, `modal/styles.ts`, `model/Filter.ts`, `src/main/factories/presentation/searchFactory.tsx`
- Testes: `tests/presentation/search/index.spec.tsx`, `useSearch.spec.tsx`, `modal/index.spec.tsx`, `model/Filter.spec.ts`

**Fora:** `getScreensStack.tsx` (o voltar é da tela, não do header nativo), `remoteSearchPlaces.ts`, biblioteca nova de dropdown, `src/shared/`, migração para `src/features/`, busca enquanto digita (debounce, mínimo de 3 caracteres, disparo sem submit).

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
- O botão de opções abre um painel flutuante sobre a lista, com o campo de busca visível. Ordenação e filtro ficam dentro dele, cada um no próprio dropdown.
- "Ordenar por" é um dropdown de uma escolha. "Filtrar por" é um dropdown de várias. Os menus flutuam sobre os cards.
- A lista de lugares continua aparecendo depois que a busca retorna.
- O submit do teclado envia a seleção atual. Digitar sozinho não busca.

## 6. Landing

| Quê | Onde |
|-----|------|
| View, dropdown e ViewModel | `src/presentation/search/` |
| Composição (`goBack`, use case, location) | `src/main/factories/presentation/searchFactory.tsx` |
| Contrato já existente | `src/domain/params/filterParam.ts`, `src/domain/enums/` |
| POST já existente | `src/data/useCases/remoteSearchPlaces.ts` (sem edição) |

## 7. Criteria

1. O botão de voltar renderiza à esquerda do botão de opções e chama `goBack`. **Prova:** teste da tela Search.
2. "Ordenar por" e "Filtrar por" ficam dentro de um painel flutuante sobre a `CardList`, com o campo de busca visível. O menu deixa de ser só uma `View` montada no fluxo do painel. **Prova:** teste da tela Search (o painel cobre a área da lista; a lista segue montada por baixo).
3. "Ordenar por" abre as três opções de `Ordination`, a escolha fica selecionada e o menu fecha. "Filtrar por" marca e desmarca vários tipos com o menu aberto. **Prova:** teste do modal.
4. A primeira busca, sem mexer no painel, envia `ordination: Ordination.MostRated` e `types: []`. **Prova:** `useSearch.spec.tsx`.
5. Depois de mudar ordenação e tipos, o submit envia esse `FilterParam`, e não `Closer` + `[Entertainment]`. **Prova:** `useSearch.spec.tsx` com `SearchPlaces` fake.
6. Os rótulos das opções são os valores dos enums. **Prova:** `Filter.spec.ts`.
7. O body do POST continua `{ types, ordination }` quando o use case é chamado. **Prova:** `remoteSearchPlaces.spec.ts` existente, sem alteração de produção.
8. Com texto no campo e `searchTo` resolvido, a `CardList` mostra os lugares retornados. Campo vazio não mostra a lista. **Prova:** teste da tela Search com `placeList` preenchida e vazia.
9. Digitar 1, 2 ou 3 caracteres não chama `searchPlaces.search`. Só o submit do teclado chama. **Prova:** `useSearch.spec.tsx` (`changeSearch` não dispara busca).
10. Check manual: o voltar fica à esquerda do botão de opções; o painel de ordenação e filtro flutua sobre a lista de lugares, com o campo de busca visível; uma busca após trocar ordenação e tipos mostra esses valores no body e os cards na lista.

---

**Stop.** Aguardando revisão humana. Próximo passo após aceite: `/speckit.lean-checks`.
