# Testing Guide

This document outlines testing strategies, conventions, and best practices for the project.

## Test Structure

### Directory Organization

Tests mirror the `src/` structure in the `tests/` folder:

```
src/                          tests/
├── domain/                   ├── domain/
├── data/                     ├── data/
│   └── useCases/            │   └── useCases/
│       └── remoteListPlaces.ts  │       └── remoteListPlaces.spec.ts
├── presentation/             ├── presentation/
│   └── placeList/           │   └── placeList/
│       └── usePlaceList.tsx │       └── usePlaceList.spec.tsx
└── main/                     └── main/
    └── factories/                └── factories/
```

### File Naming

- Test files use `.spec.ts` or `.spec.tsx` suffix
- Match the name of the file being tested

**Examples**:
```
remoteListPlaces.ts → remoteListPlaces.spec.ts
usePlaceList.tsx → usePlaceList.spec.tsx
placeListFactory.tsx → placeListFactory.spec.tsx
```

---

## Test Naming Convention

### Describe Blocks

Format: `[Layer]: [Module]`

```typescript
describe('Data: RemoteListPlaces', () => {
  // tests
});

describe('Presentation: usePlaceList', () => {
  // tests
});

describe('Main: PlaceListFactory', () => {
  // tests
});
```

### Test Cases

Format: `should [expected behavior] when/if [condition]`

```typescript
test('should call HttpGetClient with correct URL', async () => {
  // test
});

test('should return PlaceModel array on success', async () => {
  // test
});

test('should throw UnexpectedError if HttpGetClient fails', async () => {
  // test
});
```

---

## Testing by Layer

### 1. Domain Layer

Domain layer typically consists of **interfaces** and **types**, which don't require direct testing. They are tested through their implementations in the Data layer.

---

### 2. Data Layer Testing

Test **use case implementations** to ensure they:
- Call dependencies with correct parameters
- Transform API responses correctly
- Handle errors appropriately
- Return expected domain models

**Example**:

```typescript
// tests/data/useCases/remoteListPlaces.spec.ts
import { RemoteListPlaces } from '~/data/useCases';
import { HttpGetClient, HttpStatusCode } from '~/data/http';
import { AnalyticsTracker } from '~/domain/analytics';
import { UnexpectedError } from '~/data/errors';

describe('Data: RemoteListPlaces', () => {
  let sut: RemoteListPlaces;
  let httpGetClient: jest.Mocked<HttpGetClient>;
  let analytics: jest.Mocked<AnalyticsTracker>;
  
  beforeEach(() => {
    httpGetClient = {
      get: jest.fn(),
    };
    
    analytics = {
      trackEvent: jest.fn().mockResolvedValue(true),
    };
    
    sut = new RemoteListPlaces(
      'http://localhost:3000/places',
      httpGetClient,
      analytics,
    );
  });
  
  test('should call HttpGetClient with correct URL', async () => {
    httpGetClient.get.mockResolvedValue({
      statusCode: HttpStatusCode.ok,
      body: { places: [] },
    });
    
    await sut.list({ lat: '10', long: '20' });
    
    expect(httpGetClient.get).toHaveBeenCalledWith({
      url: expect.stringContaining('latitude=10'),
    });
    expect(httpGetClient.get).toHaveBeenCalledWith({
      url: expect.stringContaining('longitude=20'),
    });
  });
  
  test('should return PlaceModel array on success', async () => {
    const apiResponse = {
      places: [
        {
          id: 1,
          name: 'Place 1',
          photoReference: 'photo1',
          address: 'Address 1',
          rating: 4.5,
          userRatingsTotal: 100,
        },
      ],
    };
    
    httpGetClient.get.mockResolvedValue({
      statusCode: HttpStatusCode.ok,
      body: apiResponse,
    });
    
    const result = await sut.list({ lat: '0', long: '0' });
    
    expect(result).toEqual([
      {
        id: 0,
        imageUrl: 'photo1',
        title: 'Place 1',
        location: 'Address 1',
        rating: '4.5',
        amountOfReviews: '100',
        myDistanceOfLocal: '0',
      },
    ]);
  });
  
  test('should throw UnexpectedError on non-200 status', async () => {
    httpGetClient.get.mockResolvedValue({
      statusCode: HttpStatusCode.serverError,
      body: null,
    });
    
    const promise = sut.list({ lat: '0', long: '0' });
    
    await expect(promise).rejects.toThrow(UnexpectedError);
  });
  
  test('should track analytics event on success', async () => {
    httpGetClient.get.mockResolvedValue({
      statusCode: HttpStatusCode.ok,
      body: { places: [{ name: 'Test' }] },
    });
    
    await sut.list({ lat: '10', long: '20' });
    
    expect(analytics.trackEvent).toHaveBeenCalledWith('list_places', {
      long: '20',
      lat: '10',
    });
  });
});
```

---

### 3. Infrastructure Layer Testing

Test **adapters** to ensure they:
- Correctly implement protocol interfaces
- Handle framework-specific logic
- Transform framework responses to protocol types

**Example**:

```typescript
// tests/infra/http/axiosAdapter.spec.ts
import axios from 'axios';
import { AxiosAdapter } from '~/infra/http';
import { HttpStatusCode } from '~/data/http';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Infra: AxiosAdapter', () => {
  let sut: AxiosAdapter;
  
  beforeEach(() => {
    sut = new AxiosAdapter();
  });
  
  test('should call axios with correct parameters', async () => {
    mockedAxios.request.mockResolvedValue({
      status: 200,
      data: { result: 'success' },
    });
    
    await sut.get({
      url: 'http://api.com/test',
      headers: { Authorization: 'Bearer token' },
    });
    
    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: 'http://api.com/test',
      headers: { Authorization: 'Bearer token' },
      data: undefined,
      method: 'GET',
    });
  });
  
  test('should return HttpResponse on success', async () => {
    mockedAxios.request.mockResolvedValue({
      status: 200,
      data: { result: 'success' },
    });
    
    const response = await sut.get({ url: 'http://api.com/test' });
    
    expect(response).toEqual({
      statusCode: 200,
      body: { result: 'success' },
    });
  });
  
  test('should return error status code on failure', async () => {
    mockedAxios.request.mockRejectedValue({
      response: {
        status: 404,
        data: null,
      },
    });
    
    const response = await sut.get({ url: 'http://api.com/test' });
    
    expect(response.statusCode).toBe(404);
  });
});
```

---

### 4. Presentation Layer Testing

Test **ViewModels** to ensure they:
- Expose correct interface
- Handle user actions properly
- Format data for presentation
- Call navigation correctly

**Example**:

```typescript
// tests/presentation/placeList/usePlaceList.spec.tsx
import { renderHook } from '@testing-library/react-hooks';
import usePlaceList, { Origin } from '~/presentation/placeList/usePlaceList';
import { Routes } from '~/main/navigation';
import { Place } from '~/presentation/components/cardList';

describe('Presentation: usePlaceList', () => {
  const mockPlaces: Place[] = [
    {
      id: 1,
      imageUrl: 'image1.jpg',
      title: 'Place 1',
      location: 'Location 1',
      rating: '4.5',
      amountOfReviews: '100',
      myDistanceOfLocal: '1.2km',
    },
  ];
  
  test('should return places list', () => {
    const navigate = jest.fn();
    const { result } = renderHook(() =>
      usePlaceList({ places: mockPlaces, navigate }),
    );
    
    expect(result.current.list).toEqual(mockPlaces);
  });
  
  test('should navigate to details when showMoreDetails is called', () => {
    const navigate = jest.fn();
    const { result } = renderHook(() =>
      usePlaceList({ places: mockPlaces, navigate }),
    );
    
    result.current.showMoreDetails(mockPlaces[0]);
    
    expect(navigate).toHaveBeenCalledWith(Routes.PLACE_DETAILS, {
      place: mockPlaces[0],
    });
  });
  
  test('should return favorite function', () => {
    const navigate = jest.fn();
    const { result } = renderHook(() =>
      usePlaceList({ places: mockPlaces, navigate }),
    );
    
    expect(result.current.favorite).toBeDefined();
    expect(typeof result.current.favorite).toBe('function');
  });
});
```

**View Component Testing**:

```typescript
// tests/presentation/placeList/index.spec.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import PlaceList from '~/presentation/placeList';
import { PlaceListViewModel } from '~/presentation/placeList/usePlaceList';

jest.mock('~/presentation/components/cardList', () => {
  return jest.fn(() => null);
});

describe('Presentation: PlaceList', () => {
  test('should render PlaceList component', () => {
    const viewModel: PlaceListViewModel = {
      list: [],
      favorite: jest.fn(),
      showMoreDetails: jest.fn(),
    };
    
    const { container } = render(<PlaceList {...viewModel} />);
    
    expect(container).toBeTruthy();
  });
});
```

---

### 5. Main Layer Testing (Factories)

Test **factories** to ensure they:
- Compose dependencies correctly
- Wire ViewModels and Views properly
- Handle route parameters

**Example**:

```typescript
// tests/main/factories/presentation/placeListFactory.spec.tsx
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import PlaceListFactory from '~/main/factories/presentation/placeListFactory';
import * as getPlacesByOrigin from '~/main/factories/presentation/helpers/getPlacesByOrigin';
import { Origin } from '~/presentation/placeList/usePlaceList';
import { Routes } from '~/main/navigation';

jest.mock('~/presentation/placeList', () => {
  return jest.fn(() => null);
});

jest.mock('~/presentation/placeList/usePlaceList', () => {
  const actual = jest.requireActual('~/presentation/placeList/usePlaceList');
  return {
    __esModule: true,
    ...actual,
    default: jest.fn(() => ({
      list: [],
      favorite: jest.fn(),
      showMoreDetails: jest.fn(),
    })),
  };
});

describe('Main: PlaceListFactory', () => {
  test('should factory the PlaceList with success', async () => {
    const mockPlaces = [
      { id: 1, title: 'Place 1', location: 'Location 1' },
    ];
    
    const getPlacesByOriginSpy = jest
      .spyOn(getPlacesByOrigin, 'default')
      .mockResolvedValue(mockPlaces);
    
    const mockSetOptions = jest.fn();
    const navigation = { setOptions: mockSetOptions };
    const route = {
      params: { by: Origin.Places },
    };
    
    render(<PlaceListFactory route={route} navigation={navigation} />);
    
    await waitFor(() => {
      expect(getPlacesByOriginSpy).toHaveBeenCalled();
    });
  });
  
  test('should set correct title for Places origin', async () => {
    jest.spyOn(getPlacesByOrigin, 'default').mockResolvedValue([]);
    
    const mockSetOptions = jest.fn();
    const navigation = { setOptions: mockSetOptions };
    const route = { params: { by: Origin.Places } };
    
    render(<PlaceListFactory route={route} navigation={navigation} />);
    
    await waitFor(() => {
      expect(mockSetOptions).toHaveBeenCalledWith({ title: 'Descobrir' });
    });
  });
});
```

---

## Test Patterns

### Arrange-Act-Assert (AAA)

Structure tests in three clear sections:

```typescript
test('should do something', async () => {
  // Arrange - Set up test data and dependencies
  const httpClient = mockHttpClient();
  const sut = new RemoteListPlaces('http://api.com', httpClient, analytics);
  const location = { lat: '0', long: '0' };
  
  // Act - Execute the code being tested
  const result = await sut.list(location);
  
  // Assert - Verify the outcome
  expect(result).toEqual(expectedPlaces);
  expect(httpClient.get).toHaveBeenCalledWith({ url: expect.any(String) });
});
```

---

### System Under Test (SUT)

Use `sut` variable name for the primary object being tested:

```typescript
describe('Data: RemoteListPlaces', () => {
  let sut: RemoteListPlaces;  // System Under Test
  let httpClient: jest.Mocked<HttpGetClient>;
  
  beforeEach(() => {
    httpClient = createMockHttpClient();
    sut = new RemoteListPlaces('http://api.com', httpClient, analytics);
  });
  
  test('should ...', () => {
    // test sut
  });
});
```

---

### Mocking Dependencies

#### Mock Interfaces

```typescript
const mockHttpClient: jest.Mocked<HttpGetClient> = {
  get: jest.fn(),
};

const mockAnalytics: jest.Mocked<AnalyticsTracker> = {
  trackEvent: jest.fn().mockResolvedValue(true),
};
```

#### Mock Modules

```typescript
jest.mock('~/infra/http/axiosAdapter', () => ({
  AxiosAdapter: jest.fn().mockImplementation(() => ({
    get: jest.fn().mockResolvedValue({ statusCode: 200, body: {} }),
  })),
}));
```

#### Spy on Functions

```typescript
const getPlacesSpy = jest.spyOn(getPlacesByOrigin, 'default');
getPlacesSpy.mockResolvedValue(mockPlaces);

expect(getPlacesSpy).toHaveBeenCalledWith(
  Origin.Places,
  expect.any(Object),
  expect.any(Object),
  location,
);
```

---

### Test Helpers

Create reusable test factories:

```typescript
// tests/presentation/helpers/placeListFactory.ts
export const placeListFactory = (count: number): Place[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    imageUrl: `image${i}.jpg`,
    title: `Place ${i}`,
    location: `Location ${i}`,
    rating: '4.5',
    amountOfReviews: '100',
    myDistanceOfLocal: '1km',
  }));
};

// Usage in tests
const mockPlaces = placeListFactory(5);
```

---

## Testing Best Practices

### ✅ DO

1. **Test behavior, not implementation**
```typescript
// Good - Test what it does
test('should return places when API call succeeds', async () => {
  const result = await sut.list(location);
  expect(result).toHaveLength(5);
  expect(result[0]).toMatchObject({ id: expect.any(Number) });
});

// Bad - Test how it does it
test('should call mapToPlaceModel method', async () => {
  const spy = jest.spyOn(sut as any, 'mapToPlaceModel');
  await sut.list(location);
  expect(spy).toHaveBeenCalled();
});
```

2. **Keep tests independent**
```typescript
// Each test can run in isolation
describe('RemoteListPlaces', () => {
  beforeEach(() => {
    // Fresh setup for each test
    sut = new RemoteListPlaces(url, httpClient, analytics);
  });
});
```

3. **Use descriptive test names**
```typescript
✅ test('should throw UnexpectedError when status code is 500')
❌ test('test error handling')
```

4. **Test edge cases**
```typescript
test('should return empty array when API returns no places');
test('should handle null values in API response');
test('should work with empty location strings');
```

5. **Mock external dependencies**
```typescript
// Don't make real HTTP calls in tests
const mockHttpClient = { get: jest.fn() };
```

---

### ❌ DON'T

1. **Don't test third-party libraries**
```typescript
❌ test('should verify axios makes HTTP request') // Test your code, not axios
✅ test('should call HttpGetClient with correct parameters')
```

2. **Don't test implementation details**
```typescript
❌ test('should set state variable to loading=true')
✅ test('should show loading indicator when fetching data')
```

3. **Don't create test interdependencies**
```typescript
❌ // Test 2 depends on test 1 completing first
let sharedData;
test('test 1', () => { sharedData = ... });
test('test 2', () => { expect(sharedData)... });
```

4. **Don't skip error cases**
```typescript
❌ // Only testing happy path
test('should return places on success');

✅ // Test both success and failure
test('should return places on success');
test('should throw error on failure');
```

---

## Coverage Goals

Aim for:
- **≥80% overall coverage**
- **100% coverage** for critical business logic (use cases)
- **≥70% coverage** for presentation layer
- **100% coverage** for utility functions

Run coverage report:
```bash
yarn test --coverage
```

View detailed report:
```bash
open coverage/lcov-report/index.html
```

---

## Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test --watch

# Run specific test file
yarn test placeListFactory.spec.tsx

# Run tests with coverage
yarn test --coverage

# Run tests for specific pattern
yarn test --testPathPattern=presentation
```

---

## Test Checklist

Before committing, ensure:

- [ ] All tests pass
- [ ] New features have corresponding tests
- [ ] Edge cases are covered
- [ ] Error scenarios are tested
- [ ] Mocks are properly configured
- [ ] Tests are independent
- [ ] Test names are descriptive
- [ ] No implementation details are tested
- [ ] Coverage meets project standards

---

## Summary

Testing ensures:
- ✅ Code works as expected
- ✅ Refactoring doesn't break functionality
- ✅ Documentation through examples
- ✅ Confidence in deployments
- ✅ Faster debugging
- ✅ Better code design

Follow this guide to maintain a robust and reliable test suite.
