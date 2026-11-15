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

A suíte aponta sempre para o pacote `env:prod` (`.env.prod`). Não usa localhost e não altera o `.env` ativo do app.

```bash
yarn test:integration
yarn test:integration:remote   # o mesmo comando
```

O script lê `API_URL` de `.env.prod` e exporta essa variável só no processo do Jest. Os specs chamam `getRegistrationApiV1BaseUrl()`, que relê `.env.prod` e ignora um `API_URL` local. Timeout 180s por teste (cold start do Render).

Warmup usa `GET …/v1/places/recommendations` com timeout/retry generosos. Host free pode levar >30s no primeiro hit.

`recommendations` é o smoke remoto DB-backed. `places` / `search` / `details` dependem da Google Places API key no `ms-registration`. O probe falha a suite (não soft-passa) se o host responder `403 Request Denied Google Places` ou se o probe tiver erro de transporte.

## Referências

- Issue [#95](https://github.com/VoyOfficial/voy-app-react-native/issues/95)
- ADRs `docs/adr/0001`–`0005`
