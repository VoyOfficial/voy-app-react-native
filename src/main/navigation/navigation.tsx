import React from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { StackNavigation } from './stack';
import { Routes } from './routes';

export type StackParams = {
  [Routes.HOME]: undefined;
  [Routes.PLACE_DETAILS]: undefined;
  [Routes.PLACE_LIST]: { by: string };
  [Routes.SEARCH]: undefined;
};

type Props = {
  setNavigationTop: (navigatorRef: NavigationContainerRef<any>) => void;
  initialRouteName: keyof StackParams;
  screensStack: any;
};

const Navigation: React.FC<Props> = ({
  setNavigationTop,
  initialRouteName,
  screensStack,
}) => {
  return (
    <NavigationContainer ref={setNavigationTop}>
      <StackNavigation
        initialRouteName={initialRouteName}
        screensStack={screensStack}
      />
    </NavigationContainer>
  );
};

export default Navigation;
