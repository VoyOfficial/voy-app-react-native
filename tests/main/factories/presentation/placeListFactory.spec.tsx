import React from 'react';
import { render } from '@testing-library/react-native';
import { Routes } from '~/main/navigation';
import PlaceList from '../../../../src/presentation/placeList';
import PlaceListFactory from '../../../../src/main/factories/presentation/placeListFactory';

describe('Main: PlaceListFactory', () => {
  test('should factory the PlaceList with success', () => {
    const { UNSAFE_getByType } = render(
      <PlaceListFactory
        route={{ name: Routes.HOME, key: '', params: undefined }}
        navigation={undefined}
      />,
    );
    expect(UNSAFE_getByType(PlaceList));
  });
});
