# Lean Checks — Tela de busca: voltar, dropdown e filtros (#98)

Derived from `specs/lean/plan.md`. Each block proves one plan criterion.

## C1 — O botão de voltar renderiza à esquerda do botão de opções e chama `goBack`
- Proof: `tests/presentation/search/index.spec.tsx` (ordem no header e `onPress`) e `tests/presentation/search/useSearch.spec.tsx` (`goBack` injetado)
- Layer: presentation
- Files: `src/presentation/search/search.tsx`, `src/presentation/search/styles.ts`, `src/presentation/search/useSearch.tsx`, `src/main/factories/presentation/searchFactory.tsx`

## C2 — "Ordenar por" e "Filtrar por" ficam num painel flutuante sobre a `CardList`, com o campo de busca visível e a lista montada por baixo
- Proof: `tests/presentation/search/index.spec.tsx` (painel com `position: absolute` cobrindo a área da lista; `search_input_id` e os cards continuam montados)
- Layer: presentation
- Files: `src/presentation/search/search.tsx`, `src/presentation/search/styles.ts`

## C3 — "Ordenar por" abre as três opções de `Ordination`, a escolha fica selecionada e o menu fecha. "Filtrar por" marca e desmarca vários tipos com o menu aberto. Abrir um menu fecha o outro
- Proof: `tests/presentation/search/modal/index.spec.tsx`
- Layer: presentation
- Files: `src/presentation/search/modal/index.tsx`, `src/presentation/search/modal/styles.ts`

## C4 — A primeira busca, sem mexer no painel, envia `ordination: Ordination.MostRated` e `types: []`
- Proof: `tests/presentation/search/useSearch.spec.tsx`
- Layer: presentation
- Files: `src/presentation/search/useSearch.tsx`, `src/presentation/search/model/Filter.ts`, `src/main/factories/presentation/searchFactory.tsx`

## C5 — Depois de mudar ordenação e tipos, o submit envia esse `FilterParam`, e não `Closer` + `[Entertainment]`
- Proof: `tests/presentation/search/useSearch.spec.tsx` com `SearchPlaces` fake
- Layer: presentation
- Files: `src/presentation/search/useSearch.tsx`, `src/presentation/search/model/Filter.ts`

## C6 — Os rótulos das opções são os valores dos enums
- Proof: `tests/presentation/search/model/Filter.spec.ts`
- Layer: presentation
- Files: `src/presentation/search/model/Filter.ts`

## C7 — O body do POST continua `{ types, ordination }` quando o use case é chamado
- Proof: `tests/data/useCases/remoteSearchPlaces.spec.ts` existente, sem alteração de produção
- Layer: data
- Files: `src/data/useCases/remoteSearchPlaces.ts`

## C8 — Com texto no campo e `placeList` preenchida, a `CardList` mostra os lugares. Campo vazio não mostra a lista
- Proof: `tests/presentation/search/index.spec.tsx`
- Layer: presentation
- Files: `src/presentation/search/search.tsx`

## C9 — Digitar 1, 2 ou 3 caracteres não chama `searchPlaces.search`. Só o submit do teclado chama
- Proof: `tests/presentation/search/useSearch.spec.tsx` (`changeSearch` não dispara busca) e `tests/presentation/search/index.spec.tsx` (`onSubmitEditing`)
- Layer: presentation
- Files: `src/presentation/search/useSearch.tsx`, `src/presentation/search/search.tsx`

## C10 — Check manual do voltar, do painel flutuante e do body da busca
- Proof: check manual — o voltar fica à esquerda do botão de opções; o painel de ordenação e filtro flutua sobre a lista, com o campo de busca visível; uma busca após trocar ordenação e tipos mostra esses valores no body e os cards na lista
- Layer: presentation
- Files: `src/presentation/search/search.tsx`, `src/presentation/search/modal/index.tsx`, `src/main/factories/presentation/searchFactory.tsx`

---

## Coverage

| Criterion | Proof |
|-----------|--------|
| 1 voltar à esquerda chama `goBack` | C1 |
| 2 painel flutuante sobre a lista, busca visível | C2 |
| 3 dropdown de ordenação (uma) e filtro (várias) | C3 |
| 4 primeira busca `MostRated` e `types: []` | C4 |
| 5 submit envia a seleção atual | C5 |
| 6 rótulos são os valores dos enums | C6 |
| 7 body `{ types, ordination }` | C7 |
| 8 lista com texto e lista vazia sem texto | C8 |
| 9 digitar não busca; submit busca | C9 |
| 10 check manual | C10 |

All plan criteria have a proof. C10 is manual. None added beyond the plan.

## Handoff

- **Base branch:** `develop` (esta implementação empilha em `cursor/search-screen-lean-plan-aae7`)
- **Surface:** botão de voltar à esquerda do botão de opções; painel flutuante sobre a lista com o campo de busca visível; "Ordenar por" e "Filtrar por" como dropdowns; submit envia a seleção atual
- **Files:** `src/presentation/search/search.tsx`, `styles.ts`, `useSearch.tsx`, `modal/index.tsx`, `modal/styles.ts`, `model/Filter.ts`, `src/main/factories/presentation/searchFactory.tsx`, testes em `tests/presentation/search/`
- **Next:** `/speckit.verify` in a context that did not write this code
