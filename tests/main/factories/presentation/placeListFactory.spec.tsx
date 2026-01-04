import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { Routes } from '~/main/navigation';
import PlaceListFactory from '../../../../src/main/factories/presentation/placeListFactory';
import usePlaceList, {
  Origin,
} from '../../../../src/presentation/placeList/usePlaceList';

jest.mock('../../../../src/presentation/placeList', () => {
  return jest.fn(() => null);
});

jest.mock('../../../../src/presentation/placeList/usePlaceList', () => {
  const actual = jest.requireActual(
    '../../../../src/presentation/placeList/usePlaceList',
  );
  const mockFn = jest.fn(() => ({
    list: [],
    favorite: jest.fn(),
    showMoreDetails: jest.fn(),
  }));

  return {
    __esModule: true,
    ...actual,
    default: mockFn,
  };
});

describe('Main: PlaceListFactory', () => {
  test('should set title to "Descobrir" when origin is Places', async () => {
    const { mockSetOptions, unmount } = makeSut({ origin: Origin.Places });

    await waitFor(() => {
      expect(mockSetOptions).toHaveBeenCalledWith({ title: 'Descobrir' });
    });

    unmount();
  });

  test('should set title to "Todas as recomendações" when origin is Recommendations', async () => {
    const { mockSetOptions, unmount } = makeSut({
      origin: Origin.Recommendations,
    });

    await waitFor(() => {
      expect(mockSetOptions).toHaveBeenCalledWith({
        title: 'Todas as recomendações',
      });
    });

    unmount();
  });

  test('should default to Places origin when params do not contain by', async () => {
    const { mockSetOptions, unmount } = makeSut({ params: undefined });

    await waitFor(() => {
      expect(mockSetOptions).toHaveBeenCalledWith({ title: 'Descobrir' });
    });

    unmount();
  });

  test('should pass correct dependencies to usePlaceList', async () => {
    const { unmount } = makeSut({ origin: Origin.Places });

    await waitFor(() => {
      expect(usePlaceList).toHaveBeenCalledWith(
        expect.objectContaining({
          origin: Origin.Places,
          listPlaces: expect.any(Object),
          listRecommendations: expect.any(Object),
          locationService: expect.any(Object),
          navigate: expect.any(Function),
        }),
      );
    });

    unmount();
  });
});

type SutParams = {
  origin?: Origin;
  params?: any;
};

const makeSut = ({ origin, params }: SutParams = {}) => {
  const mockSetOptions = jest.fn();
  const navigation = {
    setOptions: mockSetOptions,
  };

  const route = {
    name: Routes.PLACE_LIST,
    key: '',
    params: params !== undefined ? params : { by: origin || Origin.Places },
  };

  const renderResult = render(
    <PlaceListFactory route={route} navigation={navigation} />,
  );

  return {
    ...renderResult,
    mockSetOptions,
    navigation,
    route,
  };
};
