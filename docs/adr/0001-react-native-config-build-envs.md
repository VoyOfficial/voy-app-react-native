# ADR 0001 — Env de build via `react-native-config`

- **Status:** Accepted
- **Date:** 2026-11-13
- **Issue:** [#95](https://github.com/VoyOfficial/voy-app-react-native/issues/95)

## Context

O app (RN 0.69 bare) hardcoda a Registration API em `localhost:8080`. Precisamos de **Ambiente local** vs **Ambiente prod** com URLs diferentes, sem depender só de `__DEV__`.

## Decision

Adotar **`react-native-config`** como mecanismo de **Env de build** (variáveis `.env*` embutidas no binário / acessíveis no JS e nativo).

## Alternatives considered

| Opção | Por que não |
|-------|-------------|
| Só `__DEV__` | Não é env de build; não escala para mais variáveis nem para release apontando remoto de forma explícita |
| Flavors/schemes nativos sem lib JS | Possível, mas mais boilerplate e sem API JS padrão do ecossistema |
| Expo Constants / `expo-env` | App não é Expo |

## Consequences

- Native linking / gradle + Xcode setup para carregar o `.env` certo por build
- `.env*` sensíveis fora do git; URLs públicas (ex. Render) podem viver em `.env.production` versionado se o time preferir
- Factories deixam de hardcodar host; leem `Registration API Base URL` da config
