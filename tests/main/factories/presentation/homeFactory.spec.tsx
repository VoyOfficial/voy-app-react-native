import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { Routes } from '~/main/navigation';
import HomeFactory from '../../../../src/main/factories/presentation/homeFactory';
import { Home } from '../../../../src/presentation/home';

describe('Presentation: HomeFactory', () => {
  test('should factory the Home with success', async () => {
    const { UNSAFE_getByType } = render(
      <HomeFactory
        route={{ name: Routes.HOME, key: '', params: undefined }}
        navigation={undefined}
      />,
    );

    const home = UNSAFE_getByType(Home);

    await waitFor(() => {
      expect(home).toBeTruthy();
    });
  });
});
