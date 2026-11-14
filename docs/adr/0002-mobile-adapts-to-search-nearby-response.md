# ADR 0002 — Mobile adapta Search ao `NearbyPlacesResponse`

- **Status:** Accepted
- **Date:** 2026-11-13
- **Issue:** [#95](https://github.com/VoyOfficial/voy-app-react-native/issues/95)

## Context

`RemoteSearchPlaces` hoje assume array de `SearchPlaceModel` e URL no estilo mock (`…/search/{place}`). O `ms-registration` (`develop`) expõe `POST /v1/places/search` com query `place`, `latitude`, `longitude` e corpo opcional de filtros, respondendo `NearbyPlacesResponse` / `PlaceResponse` (decisão 009 no backend).

## Decision

Nesta issue, o **mobile** adapta `RemoteSearchPlaces` (e testes) ao contrato remoto. Não pedimos DTO legado no backend nem mantemos dois shapes por ambiente.

## Consequences

- Reuso do mapeamento já usado em listas (`PlaceResponse` → modelo de card/`SearchPlaceModel`)
- Search passa a exigir coordenadas (geolocalização), alinhado ao endpoint
- json-server deixa de ser a fonte de verdade do Search em local/prod
