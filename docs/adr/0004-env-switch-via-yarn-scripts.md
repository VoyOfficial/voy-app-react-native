# ADR 0004 — Troca de ambiente via `yarn env:*` (não via debug/release)

- **Status:** Accepted
- **Date:** 2026-11-13
- **Issue:** [#95](https://github.com/VoyOfficial/voy-app-react-native/issues/95)
- **Supersedes mapping:** debug→local / release→prod (descartado)

## Context

Amarra debug→localhost impede testar a Registration API remota no emulador sem release. O time prevê **dev / qa / prod** no futuro e já usa o padrão `yarn env:qa` em outros projetos.

## Decision

- Pacotes versionados: `.env.local`, `.env.prod` (agora); `.env.qa` / `.env.dev` só quando existirem.
- Scripts `yarn env:local`, `yarn env:prod` (e depois `env:qa`, …) selecionam o **Env ativo** para o `react-native-config`.
- **Não** criar product flavors só por causa da URL nesta issue.
- CI/release: ativar `prod` antes do build.

## Consequences

- Debug pode apontar para Render após `yarn env:prod`
- Risco: esquecer de trocar o env ativo — mitigar com log/banner de `APP_ENV` em `__DEV__` na implementação
- Naming de secrets (`.env*.local`) não deve colidir com o pacote `.env.local` — definir na implementação (ex. `.env.secrets` / gitignore explícito)

## Related

- ADR 0001 (`react-native-config`)
- ADR 0003 (versionar URLs públicas; nomes de arquivo atualizados para `.env.local` / `.env.prod`)
