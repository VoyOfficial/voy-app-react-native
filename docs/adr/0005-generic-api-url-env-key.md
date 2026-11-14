# ADR 0005 — Chave de env genérica `API_URL` (sem `APP_ENV`)

- **Status:** Accepted
- **Date:** 2026-11-13
- **Issue:** [#95](https://github.com/VoyOfficial/voy-app-react-native/issues/95)

## Context

O serviço `ms-registration` expõe places, search, recommendations, users, etc. Prefixar a env com `REGISTRATION_` comunica o domínio errado no mobile. Um `APP_ENV` separado foi considerado para banner de ambiente.

## Decision

- Vocabulário de produto: **API Voy** (repo/deploy podem continuar `ms-registration`).
- Usar **`API_URL`** nos pacotes `.env.local` / `.env.prod` como **API Base URL**.
- **Não** introduzir `APP_ENV` nesta issue.
- Qual env está ativo fica implícito no pacote escolhido por `yarn env:*` (ADR 0004).

## Consequences

- Naming alinhado ao papel do backend no app (não só “registration”)
- Sem banner automático “você está em prod” via `APP_ENV` — se precisar depois, outra decisão
- Paths `/v1/...` continuam no client; `API_URL` termina em `/api/registration`
