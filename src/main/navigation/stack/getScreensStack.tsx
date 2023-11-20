import React from 'react';
import { TouchableOpacity } from 'react-native';
import HomeFactory from '../../factories/presentation/homeFactory';
import { Routes } from '../routes';
import PlaceDetailsFactory from '../../factories/presentation/placeDetailsFactory';
import Icon from '../../../presentation/assets/fonts/Voy';
import Actions from '../Actions';
import { navigator } from '../index';
import { Stack } from './stackNavigation';

const getScreensStack = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} name={Routes.HOME}>
        {(props) => <HomeFactory {...props} />}
      </Stack.Screen>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={new Actions(navigator).goBack}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 8,
                marginLeft: -16,
                paddingLeft: 8,
                backgroundColor: '#FFFFFF',
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                paddingVertical: 6,
                paddingRight: 6,
              }}
            >
              <Icon name="arrow_left" size={32} />
            </TouchableOpacity>
          ),
          headerTransparent: true,
          headerBackTitleVisible: false,
          title: '',
          headerShadowVisible: false,
        }}
        name={Routes.PLACE_DETAILS}
      >
        {(props) => <PlaceDetailsFactory {...props} />}
      </Stack.Screen>
    </>
  );
};

export default getScreensStack;
