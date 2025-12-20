# Clean Code Principles

This document outlines the Clean Code and SOLID principles applied in this project.

## SOLID Principles

### 1. Single Responsibility Principle (SRP)

> "A class should have one, and only one, reason to change."

**Application**:
- Each use case handles **one specific operation**
- ViewModels manage **one feature's presentation logic**
- Components have **one clear purpose**

**Examples**:

✅ **Good - Single Responsibility**:
```typescript
// Each class has one job
class RemoteListPlaces implements ListPlaces {
  list(): Promise<PlaceModel[]> {
    // Only responsible for fetching places
  }
}

class PlaceValidator {
  validate(place: PlaceModel): boolean {
    // Only responsible for validation
  }
}
```

❌ **Bad - Multiple Responsibilities**:
```typescript
class PlaceService {
  list(): Promise<PlaceModel[]> { }
  validate(place: PlaceModel): boolean { }
  save(place: PlaceModel): Promise<void> { }
  sendAnalytics(event: string): void { }
  // Too many responsibilities!
}
```

---

### 2. Open/Closed Principle (OCP)

> "Software entities should be open for extension, but closed for modification."

**Application**:
- Use **interfaces** to define contracts
- Use **composition** over inheritance
- Extend behavior through **new implementations**, not modifying existing code

**Examples**:

✅ **Good - Open for Extension**:
```typescript
// Can add new analytics implementations without changing existing code
interface AnalyticsTracker {
  trackEvent(event: string, params?: any): Promise<boolean>;
}

class FirebaseAnalyticsAdapter implements AnalyticsTracker {
  trackEvent(event: string, params?: any): Promise<boolean> {
    // Firebase implementation
  }
}

class MixpanelAnalyticsAdapter implements AnalyticsTracker {
  trackEvent(event: string, params?: any): Promise<boolean> {
    // Mixpanel implementation - no need to modify Firebase code
  }
}
```

❌ **Bad - Closed for Extension**:
```typescript
class Analytics {
  trackEvent(event: string, provider: 'firebase' | 'mixpanel') {
    if (provider === 'firebase') {
      // Firebase code
    } else if (provider === 'mixpanel') {
      // Must modify this class to add new providers
    }
  }
}
```

---

### 3. Liskov Substitution Principle (LSP)

> "Objects should be replaceable with instances of their subtypes without altering program correctness."

**Application**:
- Any implementation of an interface should be **interchangeable**
- All implementations must honor the **interface contract**

**Examples**:

✅ **Good - Substitutable**:
```typescript
interface HttpGetClient {
  get(request: HttpRequest): Promise<HttpResponse>;
}

// Both can be used interchangeably
class AxiosAdapter implements HttpGetClient {
  get(request: HttpRequest): Promise<HttpResponse> {
    return axios.get(request.url);
  }
}

class FetchAdapter implements HttpGetClient {
  get(request: HttpRequest): Promise<HttpResponse> {
    return fetch(request.url).then(r => r.json());
  }
}

// Usage - can swap implementations without issues
const httpClient: HttpGetClient = new AxiosAdapter();
// or
const httpClient: HttpGetClient = new FetchAdapter();
```

---

### 4. Interface Segregation Principle (ISP)

> "Clients should not be forced to depend on interfaces they don't use."

**Application**:
- Keep interfaces **small and focused**
- Split large interfaces into **smaller, specific ones**
- Don't force implementations to implement unused methods

**Examples**:

✅ **Good - Segregated Interfaces**:
```typescript
interface HttpGetClient {
  get(request: HttpRequest): Promise<HttpResponse>;
}

interface HttpPostClient {
  post(request: HttpRequest): Promise<HttpResponse>;
}

// Use case only depends on what it needs
class RemoteListPlaces implements ListPlaces {
  constructor(private readonly httpGetClient: HttpGetClient) {}
  // Only needs GET, not forced to know about POST
}
```

❌ **Bad - Fat Interface**:
```typescript
interface HttpClient {
  get(request: HttpRequest): Promise<HttpResponse>;
  post(request: HttpRequest): Promise<HttpResponse>;
  put(request: HttpRequest): Promise<HttpResponse>;
  delete(request: HttpRequest): Promise<HttpResponse>;
  patch(request: HttpRequest): Promise<HttpResponse>;
}

// Forced to depend on all methods even if only using GET
class RemoteListPlaces {
  constructor(private readonly httpClient: HttpClient) {}
}
```

---

### 5. Dependency Inversion Principle (DIP)

> "Depend on abstractions, not concretions."

**Application**:
- High-level modules should not depend on low-level modules
- Both should depend on **abstractions (interfaces)**
- Use **dependency injection** via constructors

**Examples**:

✅ **Good - Depend on Abstraction**:
```typescript
// Use case depends on interface (abstraction)
class RemoteListPlaces implements ListPlaces {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,  // Interface
    private readonly analytics: AnalyticsTracker,    // Interface
  ) {}
}

// Factory provides concrete implementations
const listPlaces = new RemoteListPlaces(
  'https://api.example.com/places',
  new AxiosAdapter(),           // Concrete implementation
  new FirebaseAnalyticsAdapter(), // Concrete implementation
);
```

❌ **Bad - Depend on Concretion**:
```typescript
// Use case depends on concrete implementations
class RemoteListPlaces implements ListPlaces {
  private axios = new AxiosAdapter();           // Hardcoded dependency
  private analytics = new FirebaseAnalytics();  // Hardcoded dependency
  
  constructor(private readonly url: string) {}
  
  // Hard to test, hard to change implementations
}
```

---

## Additional Clean Code Principles

### Don't Repeat Yourself (DRY)

**Avoid code duplication**:

✅ **Good - Reusable Function**:
```typescript
// Helper function
const getPlacesByOrigin = async (
  origin: Origin,
  listRecommendations: ListRecommendations,
  listPlaces: ListPlaces,
  location: Location,
): Promise<Place[]> => {
  if (origin === Origin.Recommendations) {
    return await listRecommendations.list();
  }
  return await listPlaces.list(location);
};

// Used in multiple places
const placesA = await getPlacesByOrigin(origin, recUseCase, placeUseCase, loc);
const placesB = await getPlacesByOrigin(origin, recUseCase, placeUseCase, loc);
```

❌ **Bad - Duplicated Code**:
```typescript
// Duplicated logic
const getPlacesA = async () => {
  if (origin === Origin.Recommendations) {
    return await listRecommendations.list();
  }
  return await listPlaces.list(location);
};

const getPlacesB = async () => {
  if (origin === Origin.Recommendations) {
    return await listRecommendations.list();
  }
  return await listPlaces.list(location);
};
```

---

### Keep It Simple, Stupid (KISS)

**Favor simplicity over complexity**:

✅ **Good - Simple and Clear**:
```typescript
const showMoreDetails = (place: Place) => {
  navigate(Routes.PLACE_DETAILS, { place });
};
```

❌ **Bad - Over-Engineered**:
```typescript
const showMoreDetails = (place: Place) => {
  const navigationStrategy = NavigationStrategyFactory.create('PLACE_DETAILS');
  const navigationParams = new NavigationParamsBuilder()
    .withPlace(place)
    .build();
  const navigator = new NavigationManager();
  navigator.execute(navigationStrategy, navigationParams);
};
```

---

### You Aren't Gonna Need It (YAGNI)

**Don't add functionality until it's needed**:

✅ **Good - Only What's Needed**:
```typescript
interface ListPlaces {
  list(location: Location): Promise<PlaceModel[]>;
}
```

❌ **Bad - Unnecessary Features**:
```typescript
interface ListPlaces {
  list(location: Location): Promise<PlaceModel[]>;
  listWithCache(location: Location): Promise<PlaceModel[]>;  // Not needed yet
  listWithPagination(location: Location, page: number): Promise<PlaceModel[]>;  // Not needed yet
  listFiltered(location: Location, filters: Filter[]): Promise<PlaceModel[]>;  // Not needed yet
}
```

---

### Separation of Concerns

**Each module should address a separate concern**:

✅ **Good - Separated Concerns**:
```typescript
// View - Only presentation
const PlaceList = ({ list, showMoreDetails }: PlaceListViewModel) => (
  <CardList placeList={list} onSelect={showMoreDetails} />
);

// ViewModel - Only presentation logic
const usePlaceList = ({ places, navigate }): PlaceListViewModel => {
  const showMoreDetails = (place) => navigate(Routes.PLACE_DETAILS, { place });
  return { list: places, showMoreDetails };
};

// Factory - Only composition
const PlaceListFactory = ({ route, navigation }) => {
  const places = await fetchPlaces();
  return <PlaceList {...usePlaceList({ places, navigate })} />;
};
```

❌ **Bad - Mixed Concerns**:
```typescript
const PlaceList = ({ route, navigation }) => {
  // Mixing data fetching, business logic, and presentation
  const [places, setPlaces] = useState([]);
  
  useEffect(() => {
    axios.get('http://api.com/places').then(response => {
      const transformed = response.data.map(p => ({ ...p }));
      setPlaces(transformed);
    });
  }, []);
  
  const navigate = () => navigation.navigate('Details');
  
  return <View>{/* render */}</View>;
};
```

---

## Code Organization Principles

### 1. Small Functions

Functions should be **short** and do **one thing well**:

✅ **Good**:
```typescript
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

const validateForm = (email: string, password: string): boolean => {
  return validateEmail(email) && validatePassword(password);
};
```

❌ **Bad**:
```typescript
const validateForm = (email: string, password: string): boolean => {
  // Too much in one function
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;
  
  if (password.length < 8) return false;
  
  const hasUppercase = /[A-Z]/.test(password);
  if (!hasUppercase) return false;
  
  const hasNumber = /[0-9]/.test(password);
  if (!hasNumber) return false;
  
  // ... more validation
  return true;
};
```

---

### 2. Descriptive Names

Use **meaningful names** that reveal intent:

✅ **Good**:
```typescript
const getUserProfile = async (userId: string): Promise<UserModel> => {
  return await httpClient.get({ url: `/users/${userId}` });
};

const isEmailValid = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
```

❌ **Bad**:
```typescript
const get = async (id: string) => {
  return await httpClient.get({ url: `/users/${id}` });
};

const check = (e: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
};
```

---

### 3. Minimize Function Parameters

Aim for **3 or fewer parameters**. Use objects for more:

✅ **Good**:
```typescript
type CreateUserParams = {
  name: string;
  email: string;
  password: string;
  age: number;
  country: string;
};

const createUser = (params: CreateUserParams): Promise<UserModel> => {
  // ...
};

createUser({
  name: 'John',
  email: 'john@example.com',
  password: 'pass123',
  age: 30,
  country: 'US',
});
```

❌ **Bad**:
```typescript
const createUser = (
  name: string,
  email: string,
  password: string,
  age: number,
  country: string,
): Promise<UserModel> => {
  // Hard to remember parameter order
};

createUser('John', 'john@example.com', 'pass123', 30, 'US');
```

---

### 4. Error Handling

Handle errors at the **appropriate layer**:

✅ **Good - Handle in Data Layer**:
```typescript
class RemoteListPlaces implements ListPlaces {
  async list(location: Location): Promise<PlaceModel[]> {
    try {
      const response = await this.httpGetClient.get({ url });
      
      switch (response.statusCode) {
        case HttpStatusCode.ok:
          return this.transformResponse(response.body);
        case HttpStatusCode.unauthorized:
          throw new UnauthorizedError();
        case HttpStatusCode.notFound:
          throw new NotFoundError();
        default:
          throw new UnexpectedError();
      }
    } catch (error) {
      await this.analytics.trackEvent('list_places_error', { error });
      throw error;
    }
  }
}
```

---

### 5. Comments

Code should be **self-explanatory**. Use comments for **why**, not **what**:

✅ **Good**:
```typescript
// Retry on network failure due to poor mobile connectivity in subway
const maxRetries = 3;

const fetchPlaces = async (): Promise<PlaceModel[]> => {
  // Implementation is clear without comments
  const response = await httpClient.get({ url: placesUrl });
  return response.body.map(transformToPlaceModel);
};
```

❌ **Bad**:
```typescript
// Set max retries to 3
const maxRetries = 3;

// Function to fetch places
const fetchPlaces = async (): Promise<PlaceModel[]> => {
  // Get places from API
  const response = await httpClient.get({ url: placesUrl });
  // Map response to place models
  return response.body.map(transformToPlaceModel);
};
```

---

## Architecture-Specific Principles

### 1. Dependency Direction

Dependencies must point **inward** toward the domain:

```
Domain ← Data ← Infrastructure
  ↑
  └── Presentation ← Main
```

✅ Data implements Domain interfaces  
✅ Infrastructure implements Data protocols  
✅ Main composes everything  
❌ Domain never imports from outer layers  

---

### 2. Use Case Purity

Use cases should be **pure business logic**:

✅ **Good - Pure Use Case**:
```typescript
class RemoteListPlaces implements ListPlaces {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
  ) {}
  
  async list(location: Location): Promise<PlaceModel[]> {
    const response = await this.httpGetClient.get({ url: this.url });
    return this.mapToModel(response.body);
  }
  
  private mapToModel(data: any[]): PlaceModel[] {
    return data.map(item => ({
      id: item.id,
      name: item.name,
      // Pure transformation
    }));
  }
}
```

❌ **Bad - Impure Use Case**:
```typescript
class RemoteListPlaces {
  async list(location: Location): Promise<PlaceModel[]> {
    const response = await axios.get('http://hardcoded.com/places');
    
    // UI logic doesn't belong here
    Toast.show('Loading places...');
    
    // Direct framework usage
    await AsyncStorage.setItem('places', JSON.stringify(response.data));
    
    return response.data;
  }
}
```

---

### 3. View Model Responsibility

ViewModels handle **presentation logic**, not business logic:

✅ **Good**:
```typescript
const usePlaceList = ({ places, navigate }): PlaceListViewModel => {
  const showMoreDetails = (place: Place) => {
    navigate(Routes.PLACE_DETAILS, { place });
  };
  
  const formattedPlaces = places.map(place => ({
    ...place,
    rating: `⭐ ${place.rating}`,  // Presentation formatting
  }));
  
  return { list: formattedPlaces, showMoreDetails };
};
```

❌ **Bad**:
```typescript
const usePlaceList = ({ navigate }): PlaceListViewModel => {
  const [places, setPlaces] = useState([]);
  
  useEffect(() => {
    // Business logic doesn't belong in ViewModel
    axios.get('http://api.com/places').then(response => {
      const transformed = response.data.map(apiToModel);
      setPlaces(transformed);
    });
  }, []);
  
  return { list: places };
};
```

---

## Summary Checklist

When writing code, ask yourself:

- [ ] Does this class/function have a **single responsibility**?
- [ ] Can I **extend** this without modifying existing code?
- [ ] Are my dependencies **abstractions** (interfaces)?
- [ ] Are my interfaces **small and focused**?
- [ ] Can I **swap implementations** without breaking code?
- [ ] Is my code **DRY** (no duplication)?
- [ ] Is it **KISS** (as simple as possible)?
- [ ] Did I avoid **YAGNI** (no unused features)?
- [ ] Are concerns properly **separated** by layer?
- [ ] Are function names **descriptive**?
- [ ] Are functions **small** (one thing)?
- [ ] Is error handling at the **right layer**?
- [ ] Does my code follow the **dependency rule** (inward)?

---

Follow these principles to maintain **clean, maintainable, and testable** code throughout the project.
