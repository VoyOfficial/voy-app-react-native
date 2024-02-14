import React from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { Provider } from 'mobx-react';
import { NavigationContainerRef } from '@react-navigation/native';
import Navigation, { StackParams } from './navigation/navigation';
import { Routes, getScreensStack, setTopLevelNavigator } from './navigation';
import stores from './stores';

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
      <Provider {...stores}>
        <Navigation
          setNavigationTop={(navigationRef: NavigationContainerRef<any>) =>
            setTopLevelNavigator(navigationRef)
          }
          initialRouteName={initialRouteName}
          screensStack={screensStack}
        />
      </Provider>
    </WrapperScreen>
  );
};

const WrapperScreen = styled.View`
  flex: 1;
`;

export default Main;
