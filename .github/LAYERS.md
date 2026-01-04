# Architecture Layers

This document describes the five layers of our Clean Architecture implementation.

## Layer Overview

```
┌─────────────────┐
│     Domain      │ ◄─── No dependencies
└────────┬────────┘
         │
         │ implements
         ▼
┌─────────────────┐
│      Data       │ ◄─── Depends on Domain
└────────┬────────┘
         │
         │ implements
         ▼
┌─────────────────┐
│  Infrastructure │ ◄─── Depends on Data protocols
└─────────────────┘
         ▲
         │ uses
         │
┌─────────────────┐
│  Presentation   │ ◄─── Depends on Domain models
└────────┬────────┘
         │
         │ uses
         ▼
┌─────────────────┐
│      Main       │ ◄─── Depends on all layers (composition)
└─────────────────┘
```

**Golden Rule**: Dependencies point inward. Inner layers never know about outer layers.

---

## 1. Domain Layer (`src/domain/`)

**Purpose**: Contains business logic and enterprise rules. This layer is completely independent and has no dependencies on other layers or frameworks.

**Structure**:
- `models/`: Domain entities (e.g., `PlaceModel`, `UserModel`)
- `useCases/`: Business use case interfaces (e.g., `ListPlaces`, `GetUser`)
- `analytics/`: Analytics interfaces (e.g., `AnalyticsTracker`)
- `enums/`: Domain-specific enumerations
- `params/`: Parameter types for use cases

**Key Principles**:
- ✅ Pure TypeScript interfaces and types
- ✅ No external dependencies (React, Axios, etc.)
- ✅ Defines contracts that other layers must implement
- ✅ Business rules and domain logic only

**Example**:
```typescript
// src/domain/useCases/listPlaces.ts
import { PlaceModel } from '../models';

export default interface ListPlaces {
  list(
    location: { long: string; lat: string },
    nextPageToken?: string,
  ): Promise<PlaceModel[]>;
}
```

---

## 2. Data Layer (`src/data/`)

**Purpose**: Implements domain use cases and handles data operations. Contains concrete implementations of domain interfaces.

**Structure**:
- `useCases/`: Use case implementations prefixed with `Remote` (e.g., `RemoteListPlaces`)
- `http/`: HTTP protocol interfaces (`HttpGetClient`, `HttpPostClient`, `HttpStatusCode`)
- `errors/`: Data-layer specific errors (`UnexpectedError`, `NoPermissionError`)
- `dataStatus.ts`: Data status types

**Key Principles**:
- ✅ Implements domain interfaces
- ✅ Depends on domain layer only
- ✅ Uses dependency injection for external services
- ✅ Protocol-based HTTP clients (not implementation)
- ✅ Handles data transformation from API to domain models
- ✅ Error handling and status code management

**Example**:
```typescript
// src/data/useCases/remoteListPlaces.ts
export default class RemoteListPlaces implements ListPlaces {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
    private readonly analytics: AnalyticsTracker,
  ) {}

  list = async (location, nextPageToken?): Promise<PlaceModel[]> => {
    const httpResponse = await this.httpGetClient.get({ url });
    
    // Transform API response to domain model
    const places: PlaceModel[] = httpResponse.body.map((apiPlace) => ({
      id: apiPlace.id,
      imageUrl: apiPlace.photoReference || '',
      title: apiPlace.name || '',
      location: apiPlace.address || '',
      rating: String(apiPlace.rating || 0),
    }));
    
    return places;
  };
}
```

**Naming Convention**: Prefix implementations with `Remote` (e.g., `RemoteAddAccount`, `RemoteGetUser`)

---

## 3. Infrastructure Layer (`src/infra/`)

**Purpose**: Provides concrete implementations of external services and frameworks.

**Structure**:
- `http/`: HTTP client implementations (e.g., `AxiosAdapter`)
- `analytics/`: Analytics implementations (e.g., `FirebaseAnalyticsAdapter`)

**Key Principles**:
- ✅ Implements data layer protocols
- ✅ Framework-specific code (Axios, Firebase, etc.)
- ✅ Adapters pattern for external libraries
- ✅ No business logic

**Example**:
```typescript
// src/infra/http/axiosAdapter.ts
export class AxiosAdapter implements HttpPostClient, HttpGetClient {
  async get(data: HttpRequest): Promise<HttpResponse> {
    const axiosResponse = await axios.request({
      url: data.url,
      headers: data.headers,
      method: HttpMethods.get,
    });
    
    return { 
      statusCode: axiosResponse.status, 
      body: axiosResponse.data 
    };
  }
}
```

---

## 4. Presentation Layer (`src/presentation/`)

**Purpose**: UI components and view logic following MVVM pattern.

**Structure**:
- Feature folders (e.g., `placeList/`, `search/`, `home/`)
- `components/`: Shared UI components
- `assets/`: Images, fonts, icons
- `theme/`: Theme configuration

**Each feature folder contains**:
- `index.tsx`: View component (pure presentation)
- `use[Feature].tsx`: ViewModel hook with business logic
- `model/`: View-specific models (if needed)

**Key Principles**:
- ✅ View components are **pure and dumb** (only rendering)
- ✅ ViewModels contain presentation logic
- ✅ ViewModels expose simple interfaces for Views
- ✅ Use React hooks for ViewModels
- ✅ No direct use case calls from Views

**MVVM Structure**:

```typescript
// ViewModel (usePlaceList.tsx)
export type PlaceListViewModel = {
  list: Array<Place>;
  favorite: () => void;
  showMoreDetails: (place: Place) => void;
};

const usePlaceList = ({ places, navigate }: Props): PlaceListViewModel => {
  const showMoreDetails = (place: Place) => {
    navigate(Routes.PLACE_DETAILS, { place });
  };
  
  return { 
    favorite: () => {}, 
    list: places, 
    showMoreDetails 
  };
};

// View (index.tsx)
const PlaceList = ({ list, favorite, showMoreDetails }: PlaceListViewModel) => {
  return (
    <Wrapper>
      <CardList
        placeList={list}
        favorite={favorite}
        showMoreDetails={showMoreDetails}
      />
    </Wrapper>
  );
};
```

---

## 5. Main Layer (`src/main/`)

**Purpose**: Composition root - assembles and wires up all dependencies.

**Structure**:
- `factories/`: Factory functions that create fully configured components
- `navigation/`: Navigation configuration
- `stores/`: Global state management
- `types/`: Shared TypeScript types

**Key Principles**:
- ✅ Dependency injection composition
- ✅ Creates instances with all dependencies
- ✅ Connects layers together
- ✅ No business logic

**Factory Pattern**:
```typescript
// src/main/factories/presentation/placeListFactory.tsx
const PlaceListFactory = ({ route, navigation }: Props) => {
  const [places, setPlaces] = useState<Place[]>([]);

  const getPlaces = async () => {
    // Compose dependencies
    const listRecommendations = new RemoteListRecommendations(
      'http://localhost:3000/recommendations',
      new AxiosAdapter(),
      new FirebaseAnalyticsAdapter(),
    );

    const listPlaces = new RemoteListPlaces(
      'http://localhost:3000/places',
      new AxiosAdapter(),
      new FirebaseAnalyticsAdapter(),
    );

    const response = await getPlacesByOrigin(
      params?.by,
      listRecommendations,
      listPlaces,
      { lat: '', long: '' },
    );

    setPlaces(response);
  };

  // Wire up ViewModel and View
  return <PlaceList {...usePlaceList({ places, navigate })} />;
};
```

---

## File Organization Example

```
src/
├── domain/
│   ├── models/
│   │   ├── placeModel.ts          # Domain entity
│   │   └── index.ts               # Barrel export
│   └── useCases/
│       ├── listPlaces.ts          # Interface
│       └── index.ts
├── data/
│   ├── useCases/
│   │   ├── remoteListPlaces.ts    # Implementation
│   │   └── index.ts
│   ├── http/
│   │   ├── httpGetClient.ts       # Protocol
│   │   └── index.ts
│   └── errors/
│       └── unexpectedError.ts
├── infra/
│   ├── http/
│   │   ├── axiosAdapter.ts        # Concrete implementation
│   │   └── index.ts
│   └── analytics/
│       └── firebaseAnalyticsAdapter.ts
├── presentation/
│   ├── placeList/
│   │   ├── index.tsx              # View
│   │   └── usePlaceList.tsx       # ViewModel
│   └── components/
│       └── cardList.tsx
└── main/
    ├── factories/
    │   └── presentation/
    │       ├── placeListFactory.tsx
    │       └── helpers/
    │           └── getPlacesByOrigin.ts
    ├── navigation/
    │   └── navigation.tsx
    └── stores/
        └── index.ts
```

---

## Layer Communication Rules

| From Layer | Can Use | Cannot Use |
|------------|---------|------------|
| Domain | Nothing | All other layers |
| Data | Domain | Infrastructure, Presentation, Main |
| Infrastructure | Data, Domain | Presentation, Main |
| Presentation | Domain | Data, Infrastructure, Main |
| Main | All layers | Nothing (it's the outermost) |

---

## Benefits of This Architecture

- ✅ **Separation of Concerns**: Each layer has clear responsibilities
- ✅ **Testability**: Easy to mock and test in isolation
- ✅ **Flexibility**: Easy to swap implementations (e.g., change from Axios to Fetch)
- ✅ **Maintainability**: Changes in one layer don't affect others
- ✅ **Scalability**: Easy to add new features following established patterns
