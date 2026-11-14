# Lean Checks — API Voy local/prod + integração remota (#95)

Derived from `specs/lean/plan.md`. Each block proves one plan criterion.

## C1 — Env local resolves localhost registration base
- Proof: `tests/core/config/env.spec.ts` (local package / default) + factories use `~/core` endpoints
- Layer: data
- Files: `src/core/config/env.ts`, `src/core/config/apiEndpoints.ts`, `.env.local`

## C2 — Env prod resolves Render registration base
- Proof: `tests/core/config/env.spec.ts` with stubbed `API_URL` / prod package value
- Layer: data
- Files: `src/core/config/env.ts`, `.env.prod`

## C3 — Presentation factories have no hardcoded API hosts
- Proof: `rg 'localhost:8080|localhost:3000|ms-registration.onrender.com' src/main/factories`
- Layer: presentation
- Files: `src/main/factories/presentation/{home,placeList,placeDetails,search}Factory.tsx`

## C4 — RemoteSearchPlaces posts Voy search contract and maps NearbyPlacesResponse
- Proof: `tests/data/useCases/remoteSearchPlaces.spec.ts`
- Layer: data
- Files: `src/data/useCases/remoteSearchPlaces.ts`, `src/domain/useCases/searchPlaces.ts`, `src/domain/models/searchPlaceModel.ts`

## C5 — Search obtains location before calling the use case
- Proof: `tests/presentation/search/useSearch.spec.tsx` (LocationService fake)
- Layer: presentation
- Files: `src/presentation/search/useSearch.tsx`, `src/main/factories/presentation/searchFactory.tsx`

## C6 — Default integration path stays local
- Proof: `package.json` script `test:integration` + specs default `API_URL` localhost
- Layer: data
- Files: `package.json`, `tests/data/useCases/*.integration.spec.ts`, `tests/data/helpers/registrationApiBaseUrl.ts`

## C7 — Remote integration warms up and covers happy-path remotes
- Proof: `yarn test:integration:remote` (warmup helper + places / recommendations / details / search)
- Layer: data
- Files: `tests/data/helpers/warmupRegistrationApi.ts`, `tests/data/useCases/*.integration.spec.ts`, `package.json`

## C8 — Versioned env packages and gitignored secrets override
- Proof: `.env.local`, `.env.prod`, `.env.example` in PR; `.gitignore` ignores `.env` and `.env.secrets`
- Layer: data
- Files: `.env.local`, `.env.prod`, `.env.example`, `.gitignore`, `scripts/env-switch.sh`

## C9 — Docs for env switch and local vs remote integration
- Proof: `docs/api-env.md` (+ pointer from `.github/README.md`)
- Layer: presentation
- Files: `docs/api-env.md`, `.github/README.md`

## C10 — ADRs 0001–0005 present and coherent
- Proof: files under `docs/adr/` match delivered `API_URL` + `yarn env:*` behavior
- Layer: data
- Files: `docs/adr/0001-react-native-config-build-envs.md` … `0005-generic-api-url-env-key.md`

---

## Coverage

| Criterion | Proof |
|-----------|--------|
| 1 local URL | C1 |
| 2 prod URL | C2 |
| 3 no hardcoded hosts in factories | C3 |
| 4 search remote contract | C4 |
| 5 search location | C5 |
| 6 integration local default | C6 |
| 7 integration remote | C7 |
| 8 env packages + gitignore | C8 |
| 9 docs | C9 |
| 10 ADRs | C10 |

All plan criteria have a proof. None added beyond the plan.

## Handoff

- **Base branch:** `main`
- **Surface:** `yarn env:local` \| `yarn env:prod`; `yarn android`/`ios`; `yarn test:integration`; `yarn test:integration:remote`
- **Files:** `src/core/**`, factories above, search domain/data/presentation, env packages, integration helpers/specs, `docs/api-env.md`
- **Next:** `/speckit.verify` in a context that did not write this code
