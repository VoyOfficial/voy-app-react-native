# How to Add New Features

This guide walks you through adding a new feature following Clean Architecture and MVVM patterns.

## Overview

Adding a feature involves 5 steps across different layers:

1. **Domain** - Define interfaces and models
2. **Data** - Implement use cases
3. **Infrastructure** - Add adapters if needed
4. **Presentation** - Create View and ViewModel
5. **Main** - Wire everything with factories

---

## Step-by-Step Guide

### Step 1: Define Domain Layer

Start with the **innermost layer** - define what your feature does without worrying about how.

#### 1.1 Create Domain Model

**File**: `src/domain/models/[feature]Model.ts`

```typescript
// src/domain/models/favoriteModel.ts
export interface FavoriteModel {
  id: string;
  placeId: string;
  userId: string;
  createdAt: Date;
}
```

#### 1.2 Create Use Case Interface

**File**: `src/domain/useCases/[feature].ts`

```typescript
// src/domain/useCases/addFavorite.ts
import { FavoriteModel } from '../models';

export default interface AddFavorite {
  add(placeId: string): Promise<FavoriteModel>;
}
```

#### 1.3 Export from Index

**File**: `src/domain/models/index.ts`

```typescript
export { default as FavoriteModel } from './favoriteModel';
// ... other exports
```

**File**: `src/domain/useCases/index.ts`

```typescript
export { default as AddFavorite } from './addFavorite';
// ... other exports
```

---

### Step 2: Implement Data Layer

Create the **concrete implementation** of your use case.

#### 2.1 Create Use Case Implementation

**File**: `src/data/useCases/remote[Feature].ts`

```typescript
// src/data/useCases/remoteAddFavorite.ts
import { FavoriteModel } from '~/domain/models';
import { AddFavorite } from '~/domain/useCases';
import { AnalyticsTracker } from '~/domain/analytics';
import { UnexpectedError, UnauthorizedError } from '../errors';
import { HttpPostClient, HttpStatusCode } from '../http';

export default class RemoteAddFavorite implements AddFavorite {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient,
    private readonly analytics: AnalyticsTracker,
  ) {}

  add = async (placeId: string): Promise<FavoriteModel> => {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: { placeId },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
      case HttpStatusCode.created:
        await this.trackEvent('add_favorite', { placeId });
        return this.mapToModel(httpResponse.body);
      case HttpStatusCode.unauthorized:
        throw new UnauthorizedError();
      default:
        throw new UnexpectedError();
    }
  };

  private trackEvent = async (event: string, params: any): Promise<void> => {
    try {
      await this.analytics.trackEvent(event, params);
    } catch (error) {
      // Silent fail for analytics
    }
  };

  private mapToModel = (data: any): FavoriteModel => {
    return {
      id: data.id,
      placeId: data.placeId,
      userId: data.userId,
      createdAt: new Date(data.createdAt),
    };
  };
}
```

#### 2.2 Export from Index

**File**: `src/data/useCases/index.ts`

```typescript
export { default as RemoteAddFavorite } from './remoteAddFavorite';
// ... other exports
```

---

### Step 3: Create Infrastructure (If Needed)

If your feature requires new external service adapters, create them here.

**Example**: New storage adapter

```typescript
// src/infra/storage/asyncStorageAdapter.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageClient } from '~/data/storage';

export class AsyncStorageAdapter implements StorageClient {
  async get(key: string): Promise<string | null> {
    return await AsyncStorage.getItem(key);
  }

  async set(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
  }

  async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }
}
```

---

### Step 4: Create Presentation Layer (MVVM)

Create the **View** and **ViewModel** for your feature.

#### 4.1 Create ViewModel Hook

**File**: `src/presentation/[feature]/use[Feature].tsx`

```typescript
// src/presentation/favorites/useFavorites.tsx
import { useState, useCallback } from 'react';
import { Place } from '../components/cardList';

export type FavoritesViewModel = {
  favorites: Place[];
  isLoading: boolean;
  addFavorite: (placeId: string) => Promise<void>;
  removeFavorite: (placeId: string) => Promise<void>;
  showError: boolean;
  errorMessage: string;
};

type Props = {
  initialFavorites: Place[];
  onAdd: (placeId: string) => Promise<void>;
  onRemove: (placeId: string) => Promise<void>;
  navigate: (route: string, params?: any) => void;
};

const useFavorites = ({
  initialFavorites,
  onAdd,
  onRemove,
  navigate,
}: Props): FavoritesViewModel => {
  const [favorites, setFavorites] = useState<Place[]>(initialFavorites);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const addFavorite = useCallback(async (placeId: string) => {
    setIsLoading(true);
    setShowError(false);
    try {
      await onAdd(placeId);
      // Refresh favorites list or update state
    } catch (error) {
      setShowError(true);
      setErrorMessage('Failed to add favorite');
    } finally {
      setIsLoading(false);
    }
  }, [onAdd]);

  const removeFavorite = useCallback(async (placeId: string) => {
    setIsLoading(true);
    try {
      await onRemove(placeId);
      setFavorites(prev => prev.filter(f => f.id !== placeId));
    } catch (error) {
      setShowError(true);
      setErrorMessage('Failed to remove favorite');
    } finally {
      setIsLoading(false);
    }
  }, [onRemove]);

  return {
    favorites,
    isLoading,
    addFavorite,
    removeFavorite,
    showError,
    errorMessage,
  };
};

export default useFavorites;
```

#### 4.2 Create View Component

**File**: `src/presentation/[feature]/index.tsx`

```typescript
// src/presentation/favorites/index.tsx
import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import CardList from '../components/cardList';
import { FavoritesViewModel } from './useFavorites';

const Favorites = ({
  favorites,
  isLoading,
  addFavorite,
  removeFavorite,
  showError,
  errorMessage,
}: FavoritesViewModel) => {
  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" />
      </LoadingContainer>
    );
  }

  if (showError) {
    return (
      <ErrorContainer>
        <ErrorText>{errorMessage}</ErrorText>
      </ErrorContainer>
    );
  }

  return (
    <Container>
      <Title>My Favorites</Title>
      <CardList
        title="Favorite Places"
        showSeeAllButton={false}
        seeAll={() => {}}
        placeList={favorites}
        favorite={removeFavorite}
        showMoreDetails={() => {}}
        seeAllBy=""
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled.Text`
  color: red;
  font-size: 16px;
`;

export default Favorites;
```

---

### Step 5: Create Factory (Composition Root)

Wire everything together in the **Main layer**.

**File**: `src/main/factories/presentation/[feature]Factory.tsx`

```typescript
// src/main/factories/presentation/favoritesFactory.tsx
import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { Routes, navigator } from '~/main/navigation';
import { AxiosAdapter } from '~/infra/http';
import { RemoteListFavoritePlaces, RemoteAddFavorite } from '~/data/useCases';
import { FirebaseAnalyticsAdapter } from '~/infra/analytics';
import { Place } from '~/presentation/components/cardList';
import { StackParams } from '../../navigation/navigation';
import Favorites from '~/presentation/favorites';
import useFavorites from '~/presentation/favorites/useFavorites';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const FavoritesFactory = ({ route, navigation }: Props) => {
  const [favorites, setFavorites] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Compose dependencies
  const httpClient = new AxiosAdapter();
  const analytics = new FirebaseAnalyticsAdapter();

  const listFavoritesUseCase = new RemoteListFavoritePlaces(
    'http://localhost:3000/favorites',
    httpClient,
    analytics,
  );

  const addFavoriteUseCase = new RemoteAddFavorite(
    'http://localhost:3000/favorites',
    httpClient,
    analytics,
  );

  const loadFavorites = async () => {
    setIsLoading(true);
    try {
      const result = await listFavoritesUseCase.list();
      setFavorites(result);
    } catch (error) {
      console.error('Failed to load favorites', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFavorite = async (placeId: string) => {
    await addFavoriteUseCase.add(placeId);
    await loadFavorites(); // Refresh list
  };

  const handleRemoveFavorite = async (placeId: string) => {
    // Implementation for remove
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const navigate = (routeName: string, params?: any) => {
    navigation.navigate(routeName, params);
  };

  // Wire ViewModel and View
  return (
    <Favorites
      {...useFavorites({
        initialFavorites: favorites,
        onAdd: handleAddFavorite,
        onRemove: handleRemoveFavorite,
        navigate,
      })}
    />
  );
};

export default FavoritesFactory;
```

---

### Step 6: Add Navigation Route

**File**: `src/main/navigation/navigation.tsx`

```typescript
export enum Routes {
  // ... existing routes
  FAVORITES = 'Favorites',
}

// Add to navigation stack
<Stack.Screen
  name={Routes.FAVORITES}
  component={FavoritesFactory}
  options={{ title: 'My Favorites' }}
/>
```

---

## Step 7: Write Tests

### 7.1 Test Use Case

**File**: `tests/data/useCases/remoteAddFavorite.spec.ts`

```typescript
import { RemoteAddFavorite } from '~/data/useCases';
import { HttpPostClient, HttpStatusCode } from '~/data/http';
import { AnalyticsTracker } from '~/domain/analytics';
import { UnexpectedError } from '~/data/errors';

describe('Data: RemoteAddFavorite', () => {
  let sut: RemoteAddFavorite;
  let httpPostClient: jest.Mocked<HttpPostClient>;
  let analytics: jest.Mocked<AnalyticsTracker>;

  beforeEach(() => {
    httpPostClient = { post: jest.fn() };
    analytics = { trackEvent: jest.fn().mockResolvedValue(true) };
    sut = new RemoteAddFavorite(
      'http://localhost:3000/favorites',
      httpPostClient,
      analytics,
    );
  });

  test('should call HttpPostClient with correct parameters', async () => {
    httpPostClient.post.mockResolvedValue({
      statusCode: HttpStatusCode.created,
      body: { id: '1', placeId: 'place-1', userId: 'user-1' },
    });

    await sut.add('place-1');

    expect(httpPostClient.post).toHaveBeenCalledWith({
      url: 'http://localhost:3000/favorites',
      body: { placeId: 'place-1' },
    });
  });

  test('should return FavoriteModel on success', async () => {
    const apiResponse = {
      id: '1',
      placeId: 'place-1',
      userId: 'user-1',
      createdAt: '2025-01-01T00:00:00Z',
    };

    httpPostClient.post.mockResolvedValue({
      statusCode: HttpStatusCode.created,
      body: apiResponse,
    });

    const result = await sut.add('place-1');

    expect(result).toMatchObject({
      id: '1',
      placeId: 'place-1',
      userId: 'user-1',
    });
  });

  test('should throw UnexpectedError on failure', async () => {
    httpPostClient.post.mockResolvedValue({
      statusCode: HttpStatusCode.serverError,
      body: null,
    });

    await expect(sut.add('place-1')).rejects.toThrow(UnexpectedError);
  });
});
```

### 7.2 Test ViewModel

**File**: `tests/presentation/favorites/useFavorites.spec.tsx`

```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import useFavorites from '~/presentation/favorites/useFavorites';

describe('Presentation: useFavorites', () => {
  const mockFavorites = [
    { id: 1, title: 'Place 1', location: 'Location 1' },
  ];

  test('should initialize with provided favorites', () => {
    const { result } = renderHook(() =>
      useFavorites({
        initialFavorites: mockFavorites,
        onAdd: jest.fn(),
        onRemove: jest.fn(),
        navigate: jest.fn(),
      }),
    );

    expect(result.current.favorites).toEqual(mockFavorites);
  });

  test('should call onAdd when addFavorite is called', async () => {
    const onAdd = jest.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() =>
      useFavorites({
        initialFavorites: [],
        onAdd,
        onRemove: jest.fn(),
        navigate: jest.fn(),
      }),
    );

    await act(async () => {
      await result.current.addFavorite('place-1');
    });

    expect(onAdd).toHaveBeenCalledWith('place-1');
  });
});
```

### 7.3 Test Factory

**File**: `tests/main/factories/presentation/favoritesFactory.spec.tsx`

```typescript
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import FavoritesFactory from '~/main/factories/presentation/favoritesFactory';

jest.mock('~/presentation/favorites', () => jest.fn(() => null));

describe('Main: FavoritesFactory', () => {
  test('should render FavoritesFactory', async () => {
    const navigation = { navigate: jest.fn() };
    const route = { params: {} };

    const { container } = render(
      <FavoritesFactory route={route} navigation={navigation} />,
    );

    await waitFor(() => {
      expect(container).toBeTruthy();
    });
  });
});
```

---

## Checklist

When adding a new feature, ensure:

- [ ] Domain interface and model created
- [ ] Use case implementation with `Remote` prefix
- [ ] Data transformation from API to domain model
- [ ] Error handling in use case
- [ ] Analytics tracking added
- [ ] ViewModel hook created with clear interface
- [ ] View component is pure (no logic)
- [ ] Factory wires dependencies via constructor injection
- [ ] All layers use dependency injection
- [ ] Tests written for use case
- [ ] Tests written for ViewModel
- [ ] Tests written for factory
- [ ] Navigation route added
- [ ] Exports added to index files
- [ ] Code follows naming conventions
- [ ] Dependencies point inward

---

## Common Patterns

### Loading States

```typescript
const [isLoading, setIsLoading] = useState(false);

const loadData = async () => {
  setIsLoading(true);
  try {
    const result = await useCase.execute();
    setData(result);
  } finally {
    setIsLoading(false);
  }
};
```

### Error Handling

```typescript
const [error, setError] = useState<string | null>(null);

try {
  await useCase.execute();
  setError(null);
} catch (err) {
  setError(err.message);
  await analytics.trackEvent('error', { error: err.message });
}
```

### Pagination

```typescript
const [nextPageToken, setNextPageToken] = useState<string | undefined>();

const loadMore = async () => {
  const result = await useCase.list(location, nextPageToken);
  setNextPageToken(result.nextPageToken);
  setItems(prev => [...prev, ...result.items]);
};
```

---

## Summary

Follow this guide to maintain consistency across features. Each step builds on the previous one, following the **dependency rule** and ensuring **separation of concerns**.

Key principles:
- Start from Domain (innermost)
- Work outward to Presentation
- Compose in Main layer
- Test each layer independently
- Keep Views dumb, ViewModels smart
- Use dependency injection everywhere
