import React from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { NavigationContainerRef } from '@react-navigation/native';
import Navigation, { StackParams } from './navigation/navigation';
import { Routes, getScreensStack, setTopLevelNavigator } from './navigation';

type Props = {
  initialRouteName?: keyof StackParams;
  screensStack?: any;
};

const Main: React.FC<Props> = ({
  initialRouteName = Routes.HOME,
  screensStack = getScreensStack(),
}) => {
  return (
    <WrapperScreen>
      <StatusBar barStyle={'dark-content'} />
      <Navigation
        setNavigationTop={(navigationRef: NavigationContainerRef<any>) =>
          setTopLevelNavigator(navigationRef)
        }
        initialRouteName={initialRouteName}
        screensStack={screensStack}
      />
    </WrapperScreen>
  );
};

const WrapperScreen = styled.View`
  flex: 1;
`;

export default Main;
