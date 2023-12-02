import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { Routes } from '~/main/navigation';
import PlaceList from '../../../../src/presentation/placeList';
import PlaceListFactory from '../../../../src/main/factories/presentation/placeListFactory';

describe('Main: PlaceListFactory', () => {
  test('should factory the PlaceList with success', async () => {
    const { UNSAFE_getByType } = render(
      <PlaceListFactory
        route={{ name: Routes.HOME, key: '', params: undefined }}
        navigation={undefined}
      />,
    );

    await waitFor(() => {
      expect(UNSAFE_getByType(PlaceList));
    });
  });
});
