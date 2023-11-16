import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParams } from '../navigation';

export const Stack = createNativeStackNavigator<StackParams>();

type StackNavigationParams = {
  initialRouteName: keyof StackParams;
  screensStack: any;
};

const StackNavigation: React.FC<StackNavigationParams> = ({
  initialRouteName,
  screensStack,
}) => {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerTransparent: false,
        headerBackTitleVisible: false,
        headerTintColor: '#FFFFFF',
        title: '',
        headerShadowVisible: false,
      }}
    >
      {screensStack}
    </Stack.Navigator>
  );
};

export default StackNavigation;
