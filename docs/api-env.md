# API Voy — ambientes e testes de integração

## Trocar ambiente (build)

Pacotes versionados:

| Arquivo | `API_URL` |
|---------|-----------|
| `.env.local` | `http://localhost:8080/api/registration` |
| `.env.prod` | `https://ms-registration.onrender.com/api/registration` |

Ativar antes do build/start:

```bash
yarn env:local   # copia .env.local → .env
yarn env:prod    # copia .env.prod → .env
yarn android     # ou yarn ios / yarn start
```

`react-native-config` lê o `.env` ativo. Overrides privados: use `.env.secrets` (gitignored); não coloque secrets em `.env.local` / `.env.prod`.

- **Android:** `android/app/build.gradle` aplica `dotenv.gradle`.
- **iOS:** o pod `react-native-config` (autolink + `pod install`) gera `GeneratedDotEnv.m` no build; o `Podfile` aponta `ENVFILE` para o `.env` da raiz. Após clonar ou mudar pods: `cd ios && pod install`.

Factories leem a base só via `src/core` (`getApiUrl` / `apiEndpoints`).

## Testes de integração

```bash
# Default: localhost (sem warmup especial)
yarn test:integration

# Remoto (Render): seta API_URL de prod + warmup/retry (cold-start free tier)
yarn test:integration:remote
```

Equivalente manual:

```bash
API_URL=https://ms-registration.onrender.com/api/registration yarn test:integration
```

Warmup usa `GET …/v1/places/recommendations` com timeout/retry generosos. Host free pode levar >30s no primeiro hit.

`recommendations` é o smoke remoto DB-backed. `places` / `search` / `details` dependem da Google Places API key no `ms-registration`; se o host remoto responder `403 Request Denied Google Places`, esses casos são pulados com warning no log até a key ser corrigida no backend.

## Referências

- Issue [#95](https://github.com/VoyOfficial/voy-app-react-native/issues/95)
- ADRs `docs/adr/0001`–`0005`
