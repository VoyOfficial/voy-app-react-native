import React from 'react';
import { StatusBar } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { Provider } from 'mobx-react';
import { NavigationContainerRef } from '@react-navigation/native';
import { themes } from '../presentation/theme/theme';
import Navigation, { StackParams } from './navigation/navigation';
import { Routes, getScreensStack, setTopLevelNavigator } from './navigation';
import stores from './stores';
import '../infra/debug/reactotronConfig';

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
      <ThemeProvider theme={themes.light}>
        <Provider {...stores}>
          <Navigation
            setNavigationTop={(navigationRef: NavigationContainerRef<any>) =>
              setTopLevelNavigator(navigationRef)
            }
            initialRouteName={initialRouteName}
            screensStack={screensStack}
          />
        </Provider>
      </ThemeProvider>
    </WrapperScreen>
  );
};

const WrapperScreen = styled.View`
  flex: 1;
`;

export default Main;
