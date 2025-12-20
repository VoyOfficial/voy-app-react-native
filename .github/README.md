# Project Architecture Documentation

Welcome to the project architecture documentation! This project follows **Clean Architecture** principles combined with **MVVM** pattern.

## 📚 Documentation Index

### Core Concepts
- **[Architecture Layers](LAYERS.md)** - Detailed explanation of the 5 layers (Domain, Data, Infrastructure, Presentation, Main)
- **[Clean Code Principles](CLEAN_CODE.md)** - SOLID principles and clean code practices applied to this project

### Development Guides
- **[Naming Conventions](NAMING_CONVENTIONS.md)** - File, folder, class, and variable naming standards
- **[Adding New Features](ADDING_FEATURES.md)** - Step-by-step guide to implement new features
- **[Testing Guide](TESTING.md)** - Testing strategies, patterns, and best practices

### Quick Reference
- **[Common Patterns](#common-patterns)** - Frequently used patterns in the codebase
- **[Best Practices](#best-practices)** - Do's and don'ts
- **[FAQ](#frequently-asked-questions)** - Common questions and answers

---

## 🏗️ Architecture Overview

```
┌─────────────────┐
│     Domain      │ ◄─── Pure business logic (interfaces, models)
└────────┬────────┘
         │ implements
         ▼
┌─────────────────┐
│      Data       │ ◄─── Use case implementations (RemoteXxx)
└────────┬────────┘
         │ implements
         ▼
┌─────────────────┐
│  Infrastructure │ ◄─── Framework adapters (Axios, Firebase)
└─────────────────┘
         ▲
         │ uses
┌─────────────────┐
│  Presentation   │ ◄─── MVVM (View + ViewModel hooks)
└────────┬────────┘
         │ composes
         ▼
┌─────────────────┐
│      Main       │ ◄─── Dependency injection (Factories)
└─────────────────┘
```

**Golden Rule**: Dependencies flow inward. Inner layers never depend on outer layers.

---

## 🚀 Quick Start

### Understanding the Project

1. Read [Architecture Layers](LAYERS.md) to understand the 5-layer structure
2. Review [Clean Code Principles](CLEAN_CODE.md) for SOLID principles
3. Check [Naming Conventions](NAMING_CONVENTIONS.md) before writing code

### Adding Your First Feature

Follow the [Adding New Features](ADDING_FEATURES.md) guide:
1. Define Domain (interface + model)
2. Implement Data layer (use case)
3. Create Presentation (View + ViewModel)
4. Wire in Main (factory)
5. Write tests

### Writing Tests

See the [Testing Guide](TESTING.md) for:
- Test structure and naming
- Testing patterns by layer
- Mocking strategies
- Coverage goals

---

## 📁 Project Structure

```
src/
├── domain/              # Business logic (interfaces only)
│   ├── models/          # Domain entities
│   ├── useCases/        # Use case interfaces
│   └── analytics/       # Analytics interfaces
├── data/                # Use case implementations
│   ├── useCases/        # RemoteXxx classes
│   ├── http/            # HTTP protocols
│   └── errors/          # Custom errors
├── infra/               # External service adapters
│   ├── http/            # AxiosAdapter
│   └── analytics/       # FirebaseAnalyticsAdapter
├── presentation/        # UI (MVVM)
│   ├── [feature]/       # Feature folders
│   │   ├── index.tsx    # View (dumb component)
│   │   └── use[Feature].tsx  # ViewModel (hook)
│   ├── components/      # Shared components
│   └── theme/           # Theme config
└── main/                # Composition root
    ├── factories/       # Dependency injection
    ├── navigation/      # Routes
    └── stores/          # Global state
```

---

## Common Patterns

### Factory Pattern
Used to compose dependencies:
```typescript
const PlaceListFactory = () => {
  const useCase = new RemoteListPlaces(
    'http://api.com/places',
    new AxiosAdapter(),
    new FirebaseAnalyticsAdapter(),
  );
  
  return <PlaceList {...usePlaceList({ data, navigate })} />;
};
```

### Adapter Pattern
Used to wrap external libraries:
```typescript
class AxiosAdapter implements HttpGetClient {
  async get(request: HttpRequest): Promise<HttpResponse> {
    const response = await axios.get(request.url);
    return { statusCode: response.status, body: response.data };
  }
}
```

### Dependency Injection
Constructor injection everywhere:
```typescript
class RemoteListPlaces implements ListPlaces {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpGetClient,  // Injected
    private readonly analytics: AnalyticsTracker, // Injected
  ) {}
}
```

### MVVM Pattern
Separation of View and ViewModel:
```typescript
// ViewModel (business logic)
const usePlaceList = ({ places, navigate }): PlaceListViewModel => {
  const showDetails = (place) => navigate(Routes.DETAILS, { place });
  return { list: places, showDetails };
};

// View (pure presentation)
const PlaceList = ({ list, showDetails }: PlaceListViewModel) => (
  <CardList items={list} onSelect={showDetails} />
);
```

---

## Best Practices

### ✅ DO
- Keep Views dumb (no logic)
- Use dependency injection via constructors
- Write tests for each layer
- Follow naming conventions strictly
- Keep use cases small and focused (SRP)
- Use interfaces for abstraction (DIP)
- Handle errors at the data layer
- Transform API data to domain models

### ❌ DON'T
- Put business logic in Views
- Create direct dependencies on frameworks
- Skip writing tests
- Mix concerns between layers
- Use concrete implementations in constructors
- Expose raw API responses to presentation
- Hardcode URLs (pass via constructor)
- Test implementation details

---

## Layer Communication Rules

| From Layer | ✅ Can Use | ❌ Cannot Use |
|------------|-----------|---------------|
| Domain | Nothing | All other layers |
| Data | Domain | Infrastructure, Presentation, Main |
| Infrastructure | Data, Domain | Presentation, Main |
| Presentation | Domain | Data, Infrastructure, Main |
| Main | All layers | Nothing (outermost) |

---

## Testing Strategy

### Test Structure
```
tests/              # Mirrors src/ structure
├── data/
│   └── useCases/
│       └── remoteListPlaces.spec.ts
├── presentation/
│   └── placeList/
│       └── usePlaceList.spec.tsx
└── main/
    └── factories/
        └── placeListFactory.spec.tsx
```

### Coverage Goals
- **≥80%** overall coverage
- **100%** for use cases (business logic)
- **≥70%** for presentation layer

### Run Tests
```bash
yarn test                    # Run all tests
yarn test --watch           # Watch mode
yarn test --coverage        # With coverage report
```

---

## Frequently Asked Questions

### Q: Where should I put API transformation logic?
**A:** In the Data layer use case implementation, using private `mapToModel()` methods.

### Q: Can a ViewModel call a use case directly?
**A:** No. Use cases are called in the Factory, then data is passed to the ViewModel.

### Q: Should I create a new interface for every use case?
**A:** Yes. Each use case should have its own interface in the Domain layer.

### Q: Where do I handle loading states?
**A:** In the ViewModel. Views receive `isLoading` as a prop.

### Q: Can I use Axios directly in a use case?
**A:** No. Depend on `HttpGetClient` interface, and inject `AxiosAdapter` via constructor.

### Q: How do I test components that use navigation?
**A:** Mock the `navigate` function and test that ViewModels call it with correct parameters.

### Q: Where should validation logic go?
**A:** Business validation in Data layer. UI validation (format) in Presentation layer.

### Q: Can Infrastructure depend on Domain?
**A:** Yes. Infrastructure implements protocols defined in Data, which may use Domain types.

---

## Code Review Checklist

Before submitting a PR:

- [ ] Follows layer architecture (dependencies point inward)
- [ ] Naming conventions followed
- [ ] Tests written and passing
- [ ] No business logic in Views
- [ ] Dependency injection used (no `new` in use cases/ViewModels)
- [ ] Interfaces defined in appropriate layer
- [ ] Error handling implemented
- [ ] Analytics tracking added (if applicable)
- [ ] No hardcoded URLs or values
- [ ] Documentation updated (if needed)

---

## Resources

### External Reading
- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [MVVM Pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel)

### Internal Guides
- [LAYERS.md](LAYERS.md) - Layer details
- [CLEAN_CODE.md](CLEAN_CODE.md) - SOLID principles
- [NAMING_CONVENTIONS.md](NAMING_CONVENTIONS.md) - Naming standards
- [ADDING_FEATURES.md](ADDING_FEATURES.md) - Feature implementation
- [TESTING.md](TESTING.md) - Testing guide

---

## Getting Help

If you have questions:
1. Check the [FAQ](#frequently-asked-questions)
2. Review relevant documentation file
3. Look at existing features as examples
4. Ask the team

---

## Summary

This architecture provides:
- ✅ **Separation of Concerns** - Clear layer responsibilities
- ✅ **Testability** - Easy mocking and isolation
- ✅ **Flexibility** - Easy to swap implementations
- ✅ **Maintainability** - Changes don't ripple across layers
- ✅ **Scalability** - Consistent pattern for new features
- ✅ **Clean Code** - SOLID principles throughout

**Remember**: When in doubt, follow existing patterns. Consistency is key!
