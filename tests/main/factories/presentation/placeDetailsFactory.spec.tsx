import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { Routes } from '~/main/navigation';
import PlaceDetailsFactory from '../../../../src/main/factories/presentation/placeDetailsFactory';
import PlaceDetails from '../../../../src/presentation/placeDetails';

describe('Presentation: PlaceDetailsFactory', () => {
  test('should factory the PlaceDetails with success', async () => {
    const { UNSAFE_getByType } = render(
      <PlaceDetailsFactory
        route={{ name: Routes.HOME, key: '', params: undefined }}
        navigation={undefined}
      />,
    );

    const placeDetails = UNSAFE_getByType(PlaceDetails);

    await waitFor(() => {
      expect(placeDetails).toBeTruthy();
    });
  });
});
