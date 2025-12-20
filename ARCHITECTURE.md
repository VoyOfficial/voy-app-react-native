# Project Architecture Guide

## Overview

This project follows **Clean Architecture** principles combined with **MVVM** pattern, ensuring separation of concerns, testability, and maintainability. The architecture is organized in layers, each with specific responsibilities and dependencies flowing inward.

## Architecture Layers

### 1. Domain Layer (`src/domain/`)

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

### 2. Data Layer (`src/data/`)

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
    return places;
  };
}
```

**Naming Convention**: Prefix implementations with `Remote` (e.g., `RemoteAddAccount`, `RemoteGetUser`)

---

### 3. Infrastructure Layer (`src/infra/`)

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
    return { statusCode: axiosResponse.status, body: axiosResponse.data };
  }
}
```

---

### 4. Presentation Layer (`src/presentation/`)

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
  return { favorite: () => {}, list: places, showMoreDetails };
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

### 5. Main Layer (`src/main/`)

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

## Dependency Flow

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

**Rule**: Dependencies point inward. Inner layers never know about outer layers.

---

## Clean Code Principles

### 1. **Single Responsibility Principle (SRP)**
- Each class/function has one reason to change
- Use cases do one thing only
- ViewModels handle one feature's presentation logic

### 2. **Dependency Inversion Principle (DIP)**
- Depend on abstractions (interfaces), not implementations
- Use constructor injection
- Protocols defined in inner layers

### 3. **Interface Segregation Principle (ISP)**
- Small, focused interfaces
- Clients don't depend on methods they don't use

### 4. **Open/Closed Principle (OCP)**
- Open for extension, closed for modification
- Use composition over inheritance

### 5. **Don't Repeat Yourself (DRY)**
- Extract common logic into reusable functions/classes
- Use helpers for shared operations

---

## Naming Conventions

### Files and Folders
- **camelCase** for files: `placeListFactory.tsx`, `usePlaceList.tsx`
- **camelCase** for folders: `placeList/`, `placeDetails/`
- **PascalCase** for components: `PlaceList`, `CardList`

### Classes and Interfaces
- **PascalCase**: `RemoteListPlaces`, `AnalyticsTracker`
- **Prefix**: Use case implementations start with `Remote`
- **Suffix**: Adapters end with `Adapter` (e.g., `AxiosAdapter`)

### Variables and Functions
- **camelCase**: `getPlaces`, `showMoreDetails`
- **Descriptive names**: `listFavoritePlaces` not `list`
- **Boolean**: Prefix with `is`, `has`, `should`

### Types and Interfaces
- **PascalCase**: `PlaceListViewModel`, `HttpRequest`
- **Suffix ViewModels**: `[Feature]ViewModel`

---

## Testing Strategy

### Test Structure
- Tests mirror `src/` structure in `tests/` folder
- Each module has corresponding test file with `.spec.ts(x)` suffix

### Test Naming
```typescript
describe('[Layer]: [Module]', () => {
  test('should [expected behavior]', async () => {
    // Arrange
    // Act
    // Assert
  });
});
```

### Testing by Layer

**Domain**: Test interfaces compliance (usually tested via implementations)

**Data Layer**:
```typescript
// Test RemoteListPlaces use case
test('should call HttpGetClient with correct URL', async () => {
  const httpGetClientSpy = jest.spyOn(httpGetClient, 'get');
  await sut.list({ lat: '0', long: '0' });
  expect(httpGetClientSpy).toHaveBeenCalledWith({
    url: expect.stringContaining('latitude=0'),
  });
});
```

**Presentation Layer**:
```typescript
// Test ViewModels
test('should navigate to details when showMoreDetails is called', () => {
  const navigateSpy = jest.fn();
  const { showMoreDetails } = usePlaceList({ places, navigate: navigateSpy });
  showMoreDetails(places[0]);
  expect(navigateSpy).toHaveBeenCalledWith(Routes.PLACE_DETAILS, {
    place: places[0],
  });
});
```

**Factories**:
```typescript
// Test composition
test('should factory the PlaceList with success', async () => {
  const getPlacesByOriginSpy = jest.spyOn(getPlacesByOrigin, 'default');
  render(<PlaceListFactory route={route} navigation={navigation} />);
  await waitFor(() => {
    expect(getPlacesByOriginSpy).toHaveBeenCalled();
  });
});
```

---

## Common Patterns

### 1. **Factory Pattern**
Used in `main/factories/` to compose dependencies and create configured instances.

### 2. **Adapter Pattern**
Used in `infra/` to wrap external libraries (`AxiosAdapter`, `FirebaseAnalyticsAdapter`).

### 3. **Repository Pattern**
Use cases act as repositories, abstracting data access.

### 4. **Dependency Injection**
Constructor injection for all dependencies.

### 5. **Custom Hooks (MVVM)**
ViewModels implemented as React hooks (`usePlaceList`).

---

## How to Add New Features

### Step 1: Define Domain
```typescript
// src/domain/models/newFeatureModel.ts
export interface NewFeatureModel {
  id: string;
  name: string;
}

// src/domain/useCases/newFeature.ts
export default interface NewFeature {
  execute(params: any): Promise<NewFeatureModel>;
}
```

### Step 2: Implement Data Layer
```typescript
// src/data/useCases/remoteNewFeature.ts
export default class RemoteNewFeature implements NewFeature {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpGetClient,
    private readonly analytics: AnalyticsTracker,
  ) {}

  execute = async (params: any): Promise<NewFeatureModel> => {
    const response = await this.httpClient.get({ url: this.url });
    // Transform and return
    return transformedData;
  };
}
```

### Step 3: Create Presentation (MVVM)
```typescript
// src/presentation/newFeature/useNewFeature.tsx
export type NewFeatureViewModel = {
  data: NewFeatureModel[];
  handleAction: () => void;
};

const useNewFeature = (props: Props): NewFeatureViewModel => {
  const handleAction = () => {
    // Presentation logic
  };
  return { data: props.data, handleAction };
};

// src/presentation/newFeature/index.tsx
const NewFeature = ({ data, handleAction }: NewFeatureViewModel) => {
  return <View>{/* Render UI */}</View>;
};
```

### Step 4: Create Factory
```typescript
// src/main/factories/presentation/newFeatureFactory.tsx
const NewFeatureFactory = () => {
  const [data, setData] = useState<NewFeatureModel[]>([]);

  const loadData = async () => {
    const useCase = new RemoteNewFeature(
      'http://localhost:3000/endpoint',
      new AxiosAdapter(),
      new FirebaseAnalyticsAdapter(),
    );
    const result = await useCase.execute({});
    setData(result);
  };

  return <NewFeature {...useNewFeature({ data, navigate })} />;
};
```

### Step 5: Write Tests
- Test use case implementation
- Test ViewModel logic
- Test Factory composition

---

## Best Practices

### ✅ DO
- Keep Views dumb (no logic)
- Use dependency injection
- Write tests for each layer
- Follow naming conventions
- Keep use cases small and focused
- Use interfaces for abstraction
- Handle errors at data layer
- Transform API data to domain models

### ❌ DON'T
- Put business logic in Views
- Create direct dependencies on frameworks
- Skip tests
- Mix concerns between layers
- Use concrete implementations in constructors
- Expose API response directly to presentation
- Hardcode URLs in use cases (pass via constructor)

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

## Summary

This architecture provides:
- ✅ **Separation of Concerns**: Each layer has clear responsibilities
- ✅ **Testability**: Easy to mock and test in isolation
- ✅ **Flexibility**: Easy to swap implementations (e.g., change from Axios to Fetch)
- ✅ **Maintainability**: Changes in one layer don't affect others
- ✅ **Scalability**: Easy to add new features following established patterns
- ✅ **Clean Code**: Follows SOLID principles and best practices

Follow this guide when developing new features or refactoring existing code to maintain consistency and quality across the project.
