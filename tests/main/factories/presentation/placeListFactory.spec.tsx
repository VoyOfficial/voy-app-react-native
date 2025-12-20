import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { Routes } from '~/main/navigation';
import PlaceListFactory from '../../../../src/main/factories/presentation/placeListFactory';
import * as getPlacesByOrigin from '../../../../src/main/factories/presentation/helpers/getPlacesByOrigin';
import placeListFactory from '../../../presentation/helpers/placeListFactory';
import { Origin } from '../../../../src/presentation/placeList/usePlaceList';

jest.mock('../../../../src/presentation/placeList', () => {
  return jest.fn(() => null);
});

jest.mock('../../../../src/presentation/placeList/usePlaceList', () => {
  const actual = jest.requireActual(
    '../../../../src/presentation/placeList/usePlaceList',
  );
  const mockUsePlaceList = jest.fn(() => ({
    list: [],
    favorite: jest.fn(),
    showMoreDetails: jest.fn(),
  }));

  return {
    __esModule: true,
    ...actual,
    default: mockUsePlaceList,
  };
});

describe('Main: PlaceListFactory', () => {
  test('should factory the PlaceList with success', async () => {
    const places = placeListFactory(5);
    const getPlacesByOriginSpy = jest
      .spyOn(getPlacesByOrigin, 'default')
      .mockResolvedValue(places);

    const mockSetOptions = jest.fn();
    const navigation = {
      setOptions: mockSetOptions,
    };

    const { unmount } = render(
      <PlaceListFactory
        route={{
          name: Routes.PLACE_LIST,
          key: '',
          params: { by: Origin.Places },
        }}
        navigation={navigation}
      />,
    );

    await waitFor(() => {
      expect(getPlacesByOriginSpy).toHaveBeenCalled();
      expect(mockSetOptions).toHaveBeenCalledWith({ title: 'Descobrir' });
    });

    unmount();
  });
});
