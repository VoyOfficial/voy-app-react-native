# Lean Plan — API Voy local/prod + integração remota (#95)

**Issue:** [#95](https://github.com/VoyOfficial/voy-app-react-native/issues/95)  
**Glossário:** `CONTEXT.md` (grill) · ADRs `docs/adr/0001`–`0005`  
**Host prod:** `https://ms-registration.onrender.com/api/registration`

## 1. Problem

Quem desenvolve e valida o app mobile só consegue falar com a **API Voy** via URLs hardcoded (`localhost:8080` para places; `localhost:3000` para search). Não há env de build, não dá para apontar o mesmo fluxo ao Render (`ms-registration.onrender.com`), e os testes de integração não têm um caminho remoto confiável (cold-start incluso).

O que muda: o app passa a escolher a **API Base URL** por **Ambiente** (`yarn env:local` / `yarn env:prod` + `react-native-config` / `API_URL`), Search migra para a API Voy (mesmo contrato de lista), e `yarn test:integration:remote` prova o happy-path no host publicado.

## 2. Flow

### Dev — trocar ambiente e rodar o app

1. Trigger: `yarn env:local` ou `yarn env:prod` (ativa o pacote `.env.*`).
2. Build/start (debug ou release) lê `API_URL` via `react-native-config` → `src/core` expõe a base.
3. Factories montam use cases com `${API_URL}/v1/places…` (sem host literal).
4. Outcome: Home / PlaceList / PlaceDetails / Search chamam a API Voy do ambiente ativo.

### Runtime — listas e detalhes (inalterado para o usuário)

1. Trigger: abertura da Home/lista/detalhe (já existente).
2. Geolocalização (quando a tela já usa) → `RemoteListPlaces` / `RemoteListRecommendations` / `RemoteGetPlaceDetails`.
3. Empty: HTTP 204 → lista vazia (comportamento atual).
4. Error: 403 → erros de domínio existentes; demais → `UnexpectedError` (inalterado).

### Runtime — Search (novo contrato)

1. Trigger: usuário busca um termo na Search.
2. App obtém coordenadas (`LocationService` / `GeolocationAdapter`, reuso do padrão Home/PlaceList).
3. `RemoteSearchPlaces` → `POST ${API_URL}/v1/places/search?place&latitude&longitude` (+ body `types`/`ordination`, `nextPageToken` se houver).
4. Unwrap `NearbyPlacesResponse.places` → map para `SearchPlaceModel` (mesmo espírito de `RemoteListPlaces` + `formatBase64Image`).
5. Empty: 204 → lista vazia na UI.
6. Error: 403 → `NoAccessError`; falha de rede/5xx → `UnexpectedError`; falha de GPS → superfície de erro/empty já alinhada ao restante do app (sem inventar tela nova).

### Testes

1. `yarn test:integration` — specs contra **local** (`API_URL` localhost); sem warmup especial.
2. `yarn test:integration:remote` — fixa base prod; **warmup** (health) + retry/timeout generosos; happy-path places / recommendations / details / search deve passar.

## 3. Impact

**Bounded context:** cliente HTTP da API Voy (config de ambiente + data remotes de places/search). Não é feature de UI nova; é infra de env + alinhamento de contrato.

**Layers**

| Layer | Mudança |
|-------|---------|
| `src/core/` | **Novo** — leitura de `API_URL` / helpers de endpoint (`…/v1/places`, search, recommendations). |
| `domain` | Ajustar `SearchPlaces` para receber `Location` (API exige lat/long). Ajuste de `SearchPlaceModel.id` se necessário (API usa `googlePlaceId` string; hoje o model tipa `number`). |
| `data` | Adaptar `RemoteSearchPlaces` (URL query + unwrap `places`). Reusar mapper/`formatBase64Image`. Specs unitários do search. |
| `presentation` | `useSearch` passa location; `searchFactory` injeta `GeolocationAdapter` + URL da core. Sem redesign visual. |
| `main/factories` | `homeFactory`, `placeListFactory`, `placeDetailsFactory`, `searchFactory` — tirar literals; usar core. |
| Tooling | `react-native-config` (deps + Android/iOS); `.env.local`, `.env.prod`, `.env.example`; scripts `env:local`, `env:prod`, `test:integration:remote`; `.gitignore` para secrets/env ativo se aplicável; doc curta (README ou nota em AGENTS/scripts). |
| Testes | Parametrizar base nos `*.integration.spec.ts`; novo integration de search; helper de warmup só no remote. |

**Arquivos principais (add/change)**

- Add: `src/core/` (env/api config), `.env.local`, `.env.prod`, `.env.example`, script(s) `env:*`, possivelmente `tests/data/helpers/*` warmup, `tests/data/useCases/remoteSearchPlaces.integration.spec.ts`
- Change: factories acima; `remoteSearchPlaces.ts` (+ spec); `searchPlaces.ts` / `searchPlaceModel.ts`; `useSearch.tsx` / `searchFactory.tsx`; integration specs existentes; `package.json`; native wiring `react-native-config`; ADRs já em `docs/adr/`

**Fora:** users/social login; E2E; mudanças no backend; flavors nativos; `.env.qa`/`.env.dev` (só slot futuro).

## 4. Relations

Reusar (não recriar):

- `RemoteListPlaces` / `RemoteListRecommendations` / `RemoteGetPlaceDetails` — padrão de URL + map `PlaceResponse`
- `formatBase64Image` (`src/data/helpers`)
- `AxiosAdapter`, `FirebaseAnalyticsAdapter`
- `GeolocationAdapter` / `LocationService` / `Location` param — Home e PlaceList já obtêm user location
- `Search`, `useSearch`, `RemoteSearchPlaces` — adaptar, não substituir por outro use case
- Integration specs atuais — generalizar base URL
- ADRs 0001–0005 — decisões de env/contrato já fechadas no grill

Não criar: novo catálogo de componentes, hook genérico de “env banner” (`APP_ENV` descartado), client HTTP paralelo, feature folder migration completa.

## 5. Surface

- **Dev/caller:** `yarn env:local` \| `yarn env:prod`; `yarn android`/`ios`; `yarn test:integration`; `yarn test:integration:remote`.
- **App user:** mesmas telas; Search passa a depender da API Voy (e de GPS como as listas). Sem tela/settings de ambiente.
- **Config:** `API_URL` nos pacotes versionados; leitura só via `src/core`.

## 6. Landing

| Quê | Onde |
|-----|------|
| Env / API base | **`src/core/`** (novo; rules já reservam DI/env aqui) — não `src/shared/` (ainda sem segundo consumidor além do composition root) |
| Remotes / mappers | Continuam em **`src/data/useCases`** (+ helpers) — layout flat atual; não migrar para `src/features/*` nesta issue |
| Factories | **`src/main/factories/presentation/`** |
| ViewModel Search | **`src/presentation/search/`** |
| Docs de decisão | **`docs/adr/`** |
| Plano lean | **`specs/lean/`** |

`src/shared/` só se extrair mapper compartilhado **e** já houver 2+ call sites claros no mesmo PR (list + search); preferir helper em `data` reutilizado por imports diretos se isso evitar abstração prematura.

## 7. Criteria

Cada item deve ser comprovável depois em `/speckit.lean-checks` / testes / comando / check manual.

1. Com `yarn env:local` ativo, factories/resolução de URL usam `http://localhost:8080/api/registration` (sem host literal nas factories). **Prova:** unit/smoke da core + grep factories; check manual opcional no app.
2. Com `yarn env:prod` ativo, `API_URL` resolve `https://ms-registration.onrender.com/api/registration`. **Prova:** assert da core com pacote prod / teste que stubba config.
3. Nenhuma factory de presentation contém `localhost:8080`, `localhost:3000` ou host Render hardcoded. **Prova:** `rg` / lint de CI no PR.
4. `RemoteSearchPlaces` chama `POST …/v1/places/search` com `place`, `latitude`, `longitude` e mapeia `NearbyPlacesResponse` → `SearchPlaceModel[]` (204 → `[]`). **Prova:** `remoteSearchPlaces.spec.ts` atualizado.
5. Search no app obtém location antes do search (reuso `LocationService`). **Prova:** teste de `useSearch` (use case mockado) ou factory wiring revisado + unit do use case.
6. `yarn test:integration` (local) permanece o path default e não depende do Render. **Prova:** script + specs com base local.
7. `yarn test:integration:remote` faz warmup/retry e passa happy-path de list places, recommendations, place details e search contra o host prod. **Prova:** execução do script (aceite #95); documentar comando.
8. Pacotes `.env.local` e `.env.prod` versionados com `API_URL`; secrets overrides no gitignore sem colidir com o nome do pacote local. **Prova:** arquivos no PR + `.gitignore`.
9. Doc mínima: como `yarn env:*` e como rodar integração local vs remota. **Prova:** seção no README (ou doc apontada no PR).
10. ADRs 0001–0005 presentes e coerentes com o comportamento entregue. **Prova:** arquivos em `docs/adr/` no PR.

---

**Stop.** Aguardando revisão humana. Próximo passo após aceite: `/speckit.lean-checks`.
