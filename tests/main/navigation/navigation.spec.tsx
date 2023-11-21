import React from 'react';
import { View } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from '~/main';
import { StackParams } from '../../../src/main/navigation/navigation';
import * as Navigator from '../../../src/main/navigation';

const Stack = createNativeStackNavigator<StackParams>();

describe('Main: Navigation', () => {
  test('should pass initialRouteName via props correctly for Navigation', () => {
    const { Routes } = Navigator;
    const homeRoutes = Routes.HOME;
    const { sut } = makeSut(homeRoutes);

    const navigation = sut.UNSAFE_getByType(Navigator.Navigation);
    expect(navigation.props.initialRouteName).toEqual(homeRoutes);
  });
});

const makeSut = (initialRouteName = Navigator.Routes.HOME) => {
  const setTopLevelNavigatorSpy = jest.spyOn(Navigator, 'setTopLevelNavigator');
  const navigateSpy = jest.spyOn(CommonActions, 'navigate');
  const sut = render(
    <Main
      initialRouteName={initialRouteName}
      screensStack={
        <>
          <Stack.Screen name={Navigator.Routes.HOME}>
            {() => <View></View>}
          </Stack.Screen>
        </>
      }
    />,
  );

  return { setTopLevelNavigatorSpy, navigateSpy, sut };
};
