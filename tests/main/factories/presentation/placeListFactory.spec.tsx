import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { Routes } from '~/main/navigation';
import PlaceList from '../../../../src/presentation/placeList';
import PlaceListFactory from '../../../../src/main/factories/presentation/placeListFactory';
import * as getPlacesByOrigin from '../../../../src/main/factories/presentation/helpers/getPlacesByOrigin';
import placeListFactory from '../../../presentation/helpers/placeListFactory';

describe('Main: PlaceListFactory', () => {
  test('should factory the PlaceList with success', async () => {
    const places = placeListFactory(5);
    jest
      .spyOn(getPlacesByOrigin, 'default')
      .mockReturnValue(Promise.resolve(places));
    const { UNSAFE_getByType } = render(
      <PlaceListFactory
        route={{ name: Routes.HOME, key: '', params: undefined }}
        navigation={undefined}
      />,
    );

    const view = UNSAFE_getByType(PlaceList);

    await waitFor(() => {
      expect(view).toBeTruthy();
      expect(view.props.list).toEqual(places);
    });
  });
});
