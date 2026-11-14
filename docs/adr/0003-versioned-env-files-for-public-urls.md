# ADR 0003 — Versionar `.env` e `.env.production` (URLs públicas)

- **Status:** Accepted
- **Date:** 2026-11-13
- **Issue:** [#95](https://github.com/VoyOfficial/voy-app-react-native/issues/95)

## Context

Precisamos de envs de build via `react-native-config`. A Registration API Base URL de prod no Render é pública. Secrets reais ainda não existem neste escopo.

## Decision

- Versionar pacotes **`.env.local`** e **`.env.prod`** (URL do Render em prod). Ver ADR 0004 para a troca via `yarn env:*`.
- Overrides/secrets fora do git (nome a não colidir com o pacote `local`).
- Não depender só de `.env.example` + cópia manual para os valores públicos.

## Consequences

- Onboarding: clonar, `yarn env:local` / `yarn env:prod`, buildar sem colar URL na mão
- Se a URL de prod mudar, o PR atualiza `.env.prod`
- Disciplina: nunca colocar secrets nos pacotes versionados
