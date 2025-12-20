# GitHub Copilot Instructions

This project follows **Clean Architecture** with **MVVM** pattern. Follow these guidelines strictly when generating code.

## 📋 Quick Reference

- **Documentation**: See [README.md](.github/README.md) for complete architecture guide
- **Layers**: [LAYERS.md](.github/LAYERS.md)
- **Clean Code**: [CLEAN_CODE.md](.github/CLEAN_CODE.md)
- **Naming**: [NAMING_CONVENTIONS.md](.github/NAMING_CONVENTIONS.md)
- **Features**: [ADDING_FEATURES.md](.github/ADDING_FEATURES.md)
- **Testing**: [TESTING.md](.github/TESTING.md)

## 🏗️ Architecture Layers

```
Domain → Data → Infrastructure
  ↑
Presentation → Main
```

**Dependencies flow INWARD only.**

### 1. Domain (`src/domain/`)
- Pure interfaces and types
- No external dependencies
- Examples: `ListPlaces`, `PlaceModel`

### 2. Data (`src/data/`)
- Implements domain interfaces
- Prefix with `Remote`: `RemoteListPlaces`
- Uses dependency injection
- Transforms API to domain models

### 3. Infrastructure (`src/infra/`)
- Framework adapters
- Suffix with `Adapter`: `AxiosAdapter`, `FirebaseAnalyticsAdapter`

### 4. Presentation (`src/presentation/`)
- **MVVM Pattern**
- `index.tsx`: View (dumb, no logic)
- `use[Feature].tsx`: ViewModel (hook with logic)
- `[Feature]ViewModel`: Type for ViewModel return

### 5. Main (`src/main/`)
- Dependency injection in factories
- `[Feature]Factory.tsx`: Composes dependencies

## 🎯 Code Generation Rules

### Naming Conventions
- **Files/Folders**: camelCase (`placeList/`, `usePlaceList.tsx`)
- **Components**: PascalCase (`PlaceList`)
- **Classes**: PascalCase (`RemoteListPlaces`)
- **Interfaces**: PascalCase, no `I` prefix (`ListPlaces`)
- **Functions**: camelCase (`getPlaces`)
- **Booleans**: `is`, `has`, `should` prefix (`isLoading`)
- **Constants**: SCREAMING_SNAKE_CASE (`API_BASE_URL`)
- **Tests**: `[name].spec.ts(x)`

### Use Case Implementation Pattern
```typescript
// src/data/useCases/remoteListPlaces.ts
export default class RemoteListPlaces implements ListPlaces {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
    private readonly analytics: AnalyticsTracker,
  ) {}

  list = async (params): Promise<PlaceModel[]> => {
    const response = await this.httpGetClient.get({ url: this.url });
    
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return this.mapToModel(response.body);
      default:
        throw new UnexpectedError();
    }
  };

  private mapToModel(data: any): PlaceModel[] {
    // Transform API to domain model
  }
}
```

### MVVM Pattern
```typescript
// ViewModel (use[Feature].tsx)
export type FeatureViewModel = {
  data: Model[];
  handleAction: () => void;
};

const useFeature = ({ props }): FeatureViewModel => {
  // Presentation logic only
  return { data, handleAction };
};

// View (index.tsx)
const Feature = ({ data, handleAction }: FeatureViewModel) => (
  <View>{/* Pure presentation */}</View>
);
```

### Factory Pattern
```typescript
// [feature]Factory.tsx
const FeatureFactory = ({ route, navigation }) => {
  const useCase = new RemoteFeature(
    'http://localhost:3000/endpoint',
    new AxiosAdapter(),
    new FirebaseAnalyticsAdapter(),
  );
  
  return <Feature {...useFeature({ data, navigate })} />;
};
```

## 🚫 NEVER Do This

❌ Business logic in Views
❌ Direct axios/fetch calls in use cases (use HttpGetClient)
❌ Hardcoded URLs in use cases
❌ `I` prefix on interfaces (`IListPlaces`)
❌ Concrete implementations in constructors
❌ Skip dependency injection
❌ Mix layer concerns
❌ Use `Remote` prefix outside Data layer

## ✅ ALWAYS Do This

✅ Use dependency injection via constructors
✅ Depend on interfaces, not implementations
✅ Keep Views dumb (no logic)
✅ Transform API responses in Data layer
✅ Handle errors in Data layer
✅ Track analytics in use cases
✅ Write tests for each layer
✅ Follow naming conventions exactly

## 📝 Test Pattern

```typescript
describe('[Layer]: [Module]', () => {
  let sut: RemoteFeature;
  let mockDependency: jest.Mocked<Dependency>;

  beforeEach(() => {
    mockDependency = { method: jest.fn() };
    sut = new RemoteFeature(url, mockDependency, analytics);
  });

  test('should [expected behavior]', async () => {
    // Arrange
    mockDependency.method.mockResolvedValue(data);
    
    // Act
    const result = await sut.execute();
    
    // Assert
    expect(result).toEqual(expected);
    expect(mockDependency.method).toHaveBeenCalledWith(params);
  });
});
```

## 🎨 File Structure Template

When creating a new feature:

```
src/
├── domain/
│   ├── models/[feature]Model.ts
│   └── useCases/[feature].ts
├── data/
│   └── useCases/remote[Feature].ts
├── presentation/
│   └── [feature]/
│       ├── index.tsx              # View
│       └── use[Feature].tsx       # ViewModel
└── main/
    └── factories/presentation/
        └── [feature]Factory.tsx

tests/
├── data/useCases/remote[Feature].spec.ts
├── presentation/[feature]/use[Feature].spec.tsx
└── main/factories/[feature]Factory.spec.tsx
```

## 🔄 Adding a Feature Checklist

1. ✅ Create domain interface (`src/domain/useCases/[feature].ts`)
2. ✅ Create domain model (`src/domain/models/[feature]Model.ts`)
3. ✅ Implement use case (`src/data/useCases/remote[Feature].ts`)
4. ✅ Create ViewModel (`src/presentation/[feature]/use[Feature].tsx`)
5. ✅ Create View (`src/presentation/[feature]/index.tsx`)
6. ✅ Create Factory (`src/main/factories/presentation/[feature]Factory.tsx`)
7. ✅ Write tests for use case, ViewModel, and factory
8. ✅ Export from index files
9. ✅ Add navigation route if needed

## 💡 Examples from Codebase

### Good Examples to Follow
- `src/data/useCases/remoteListPlaces.ts` - Use case implementation
- `src/presentation/placeList/usePlaceList.tsx` - ViewModel pattern
- `src/main/factories/presentation/placeListFactory.tsx` - Factory pattern
- `tests/main/factories/presentation/placeListFactory.spec.tsx` - Testing pattern

### Key Interfaces
- `HttpGetClient`, `HttpPostClient` - HTTP protocols
- `AnalyticsTracker` - Analytics interface
- `ListPlaces`, `GetUser` - Domain use cases

## 🎓 SOLID Principles in Practice

- **SRP**: One class = one responsibility
- **OCP**: Extend via new implementations, don't modify existing
- **LSP**: Any implementation can replace interface
- **ISP**: Small, focused interfaces
- **DIP**: Depend on abstractions (interfaces), inject implementations

## 📚 When Generating Code

1. Ask which layer the code belongs to
2. Follow the appropriate pattern for that layer
3. Use dependency injection
4. Follow naming conventions
5. Include error handling
6. Add analytics tracking
7. Generate corresponding tests
8. Keep concerns separated

---

**Remember**: Consistency with existing patterns is more important than personal preferences. Always check similar features in the codebase before generating new code.
