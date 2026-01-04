# Naming Conventions

This document defines the naming standards used throughout the project.

## Files and Folders

### Folders
- **camelCase** for all folder names
- Use descriptive, feature-based names

**Examples**:
```
✅ placeList/
✅ placeDetails/
✅ userProfile/
✅ searchResults/

❌ PlaceList/
❌ place-list/
❌ place_list/
```

### Files

**TypeScript/TSX Files**:
- **camelCase** for all files
- Match the main export name

**Examples**:
```
✅ placeListFactory.tsx
✅ usePlaceList.tsx
✅ remoteListPlaces.ts
✅ axiosAdapter.ts

❌ PlaceListFactory.tsx
❌ place-list-factory.tsx
❌ place_list_factory.tsx
```

**Test Files**:
- Same name as the file being tested + `.spec.ts(x)`

**Examples**:
```
✅ placeListFactory.spec.tsx
✅ remoteListPlaces.spec.ts
✅ usePlaceList.spec.tsx

❌ placeListFactory.test.tsx
❌ test_placeListFactory.tsx
```

**Index Files**:
- Always `index.ts` or `index.tsx`
- Used for barrel exports or main component exports

---

## Classes and Interfaces

### Classes
- **PascalCase**
- Descriptive names indicating purpose

**Examples**:
```typescript
✅ class RemoteListPlaces implements ListPlaces
✅ class AxiosAdapter implements HttpGetClient
✅ class FirebaseAnalyticsAdapter implements AnalyticsTracker

❌ class remoteListPlaces
❌ class remote_list_places
❌ class ListPlacesRemote
```

### Interfaces
- **PascalCase**
- Name should describe the contract/behavior

**Examples**:
```typescript
✅ interface ListPlaces
✅ interface HttpGetClient
✅ interface AnalyticsTracker
✅ interface PlaceModel

❌ interface IListPlaces
❌ interface listPlaces
❌ interface list_places
```

---

## Naming Patterns by Layer

### Domain Layer

**Use Cases (Interfaces)**:
- Action verb + noun (e.g., `ListPlaces`, `GetUser`, `AddAccount`)
- No prefixes or suffixes

```typescript
✅ export default interface ListPlaces
✅ export default interface GetPlaceDetails
✅ export default interface SearchPlaces

❌ export default interface IListPlaces
❌ export default interface ListPlacesUseCase
```

**Models**:
- Noun describing the entity
- Suffix with `Model`

```typescript
✅ export interface PlaceModel
✅ export interface UserModel
✅ export interface RecommendationModel

❌ export interface Place
❌ export interface PlaceDTO
```

### Data Layer

**Use Case Implementations**:
- Prefix with `Remote`
- Match the domain interface name

```typescript
✅ export default class RemoteListPlaces implements ListPlaces
✅ export default class RemoteGetUser implements GetUser
✅ export default class RemoteSearchPlaces implements SearchPlaces

❌ export default class ListPlacesImpl
❌ export default class ListPlacesRemote
❌ export default class HttpListPlaces
```

**HTTP Protocols**:
- `Http` prefix + action + `Client`

```typescript
✅ export default interface HttpGetClient
✅ export default interface HttpPostClient

❌ export default interface GetClient
❌ export default interface HttpClient
```

### Infrastructure Layer

**Adapters**:
- Library name + `Adapter`

```typescript
✅ export class AxiosAdapter
✅ export class FirebaseAnalyticsAdapter
✅ export class AsyncStorageAdapter

❌ export class AxiosClient
❌ export class Axios
❌ export class HttpAdapter
```

### Presentation Layer

**View Components**:
- **PascalCase**
- Feature name

```typescript
✅ const PlaceList = () => { }
✅ const SearchBar = () => { }
✅ const CardList = () => { }

❌ const placeList = () => { }
❌ const PlaceListComponent = () => { }
```

**ViewModel Hooks**:
- Prefix with `use`
- Feature name

```typescript
✅ const usePlaceList = () => { }
✅ const useSearch = () => { }
✅ const usePlaceDetails = () => { }

❌ const placeListViewModel = () => { }
❌ const PlaceListViewModel = () => { }
```

**ViewModel Types**:
- Feature name + `ViewModel`

```typescript
✅ export type PlaceListViewModel = { }
✅ export type SearchViewModel = { }

❌ export type PlaceListVm = { }
❌ export type PlaceListProps = { }
```

### Main Layer

**Factories**:
- Feature name + `Factory`

```typescript
✅ const PlaceListFactory = () => { }
✅ const SearchFactory = () => { }

❌ const makePlaceList = () => { }
❌ const createPlaceList = () => { }
```

---

## Variables and Functions

### Variables
- **camelCase**
- Descriptive names

```typescript
✅ const userProfile = getUser();
✅ const placeList = places.map(...);
✅ const isLoading = true;
✅ const hasError = false;

❌ const user_profile = getUser();
❌ const UserProfile = getUser();
❌ const a = getUser();
```

### Functions
- **camelCase**
- Verb-based names indicating action

```typescript
✅ const getPlaces = async () => { }
✅ const showMoreDetails = () => { }
✅ const handleSubmit = () => { }
✅ const fetchUserData = () => { }

❌ const GetPlaces = async () => { }
❌ const places = async () => { }  // Not descriptive
❌ const get_places = async () => { }
```

### Boolean Variables
- Prefix with `is`, `has`, `should`, `can`

```typescript
✅ const isLoading = true;
✅ const hasPermission = false;
✅ const shouldUpdate = true;
✅ const canEdit = false;

❌ const loading = true;
❌ const permission = false;
```

---

## Constants

### Enum Values
- **PascalCase** for enum names
- **PascalCase** for values (or SCREAMING_SNAKE_CASE if preferred)

```typescript
✅ enum Origin {
  Recommendations = 'recommendations',
  Places = 'places',
}

✅ enum HttpStatusCode {
  Ok = 200,
  NotFound = 404,
}

❌ enum origin
❌ enum ORIGIN
```

### Global Constants
- **SCREAMING_SNAKE_CASE** for true constants
- **camelCase** for configuration objects

```typescript
✅ const API_BASE_URL = 'https://api.example.com';
✅ const MAX_RETRY_ATTEMPTS = 3;

✅ const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
};

❌ const ApiBaseUrl = 'https://api.example.com';
❌ const api_base_url = 'https://api.example.com';
```

---

## Types and Type Aliases

### Type Aliases
- **PascalCase**
- Descriptive of the data structure

```typescript
✅ export type PlaceListViewModel = { }
✅ export type HttpRequest = { }
✅ export type NavigationParams = { }

❌ export type placeListViewModel = { }
❌ export type PlaceListVm = { }
```

### Generic Types
- Single uppercase letter or descriptive name
- Common: `T`, `K`, `V`, `R` (Response)

```typescript
✅ interface HttpGetClient<R = any>
✅ class RemoteUseCase<TResponse, TParams>

❌ interface HttpGetClient<response>
❌ class RemoteUseCase<t, p>
```

---

## Props and Component Interfaces

### Props Types
- Component name + `Props`

```typescript
✅ type PlaceListProps = {
  places: Place[];
  onSelect: (place: Place) => void;
};

✅ interface SearchBarProps {
  onSearch: (query: string) => void;
}

❌ type PlaceListProperties = { }
❌ type Props = { }  // Too generic
```

---

## Route Names

- **SCREAMING_SNAKE_CASE**
- Descriptive of the destination

```typescript
✅ enum Routes {
  PLACE_LIST = 'PlaceList',
  PLACE_DETAILS = 'PlaceDetails',
  HOME = 'Home',
}

❌ enum Routes {
  placeList = 'PlaceList',
  PlaceDetails = 'PlaceDetails',
}
```

---

## Examples by Feature

### Example: Place List Feature

```
src/
├── domain/
│   ├── models/
│   │   └── placeModel.ts              # PlaceModel interface
│   └── useCases/
│       └── listPlaces.ts              # ListPlaces interface
├── data/
│   └── useCases/
│       └── remoteListPlaces.ts        # RemoteListPlaces class
├── infra/
│   └── http/
│       └── axiosAdapter.ts            # AxiosAdapter class
├── presentation/
│   └── placeList/
│       ├── index.tsx                  # PlaceList component
│       └── usePlaceList.tsx           # usePlaceList hook, PlaceListViewModel type
└── main/
    └── factories/
        └── presentation/
            └── placeListFactory.tsx   # PlaceListFactory component

tests/
├── data/
│   └── useCases/
│       └── remoteListPlaces.spec.ts   # RemoteListPlaces tests
├── presentation/
│   └── placeList/
│       └── usePlaceList.spec.tsx      # usePlaceList tests
└── main/
    └── factories/
        └── presentation/
            └── placeListFactory.spec.tsx
```

---

## Quick Reference

| Element | Convention | Example |
|---------|-----------|---------|
| Folders | camelCase | `placeList/` |
| Files | camelCase | `placeListFactory.tsx` |
| Test Files | name + `.spec.ts(x)` | `placeListFactory.spec.tsx` |
| Classes | PascalCase | `RemoteListPlaces` |
| Interfaces | PascalCase | `ListPlaces` |
| Components | PascalCase | `PlaceList` |
| Hooks | use + PascalCase | `usePlaceList` |
| Functions | camelCase | `getPlaces` |
| Variables | camelCase | `placeList` |
| Constants | SCREAMING_SNAKE_CASE | `API_BASE_URL` |
| Booleans | is/has/should + camelCase | `isLoading` |
| Enums | PascalCase | `Origin` |
| Types | PascalCase | `PlaceListViewModel` |
| Props | Name + Props | `PlaceListProps` |

---

## Anti-Patterns to Avoid

❌ **Hungarian Notation**:
```typescript
❌ const strName = 'John';
❌ const arrPlaces = [];
✅ const name = 'John';
✅ const places = [];
```

❌ **Interface Prefix**:
```typescript
❌ interface IListPlaces
❌ interface IPlaceModel
✅ interface ListPlaces
✅ interface PlaceModel
```

❌ **Abbreviations** (unless widely known):
```typescript
❌ const usrProf = getUserProfile();
❌ const plcLst = getPlaces();
✅ const userProfile = getUserProfile();
✅ const placeList = getPlaces();

✅ const url = 'https://...';  // OK - widely known
✅ const id = '123';           // OK - widely known
```

❌ **Redundant Naming**:
```typescript
❌ const placeModel: PlaceModel = { };
✅ const place: PlaceModel = { };

❌ const placeListArray: Place[] = [];
✅ const placeList: Place[] = [];
```

---

## When in Doubt

1. **Be consistent** with existing code
2. **Be descriptive** - code is read more than written
3. **Follow TypeScript conventions** over other languages
4. **Use full words** over abbreviations
5. **Match the domain language** - use business terms
