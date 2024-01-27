import React from 'react';
import styled from 'styled-components/native';
import HomeFactory from '../../factories/presentation/homeFactory';
import { Routes } from '../routes';
import PlaceDetailsFactory from '../../factories/presentation/placeDetailsFactory';
import Icon from '../../../presentation/assets/fonts/Voy';
import Actions from '../Actions';
import { navigator } from '../index';
import PlaceListFactory from '../../factories/presentation/placeListFactory';
import SearchFactory from '../../../../src/main/factories/presentation/searchFactory';
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
            <HeaderLeftButtonWithBackgroundWhite
              onPress={new Actions(navigator).goBack}
            >
              <Icon name="arrow_left" size={32} />
            </HeaderLeftButtonWithBackgroundWhite>
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
      <Stack.Screen
        options={{
          headerLeft: () => (
            <HeaderLeftButtonBack onPress={new Actions(navigator).goBack}>
              <Icon name="arrow_left" size={32} />
            </HeaderLeftButtonBack>
          ),
          headerTransparent: true,
          headerBackTitleVisible: false,
          title: '',
          headerShadowVisible: false,
        }}
        name={Routes.PLACE_LIST}
      >
        {(props) => <PlaceListFactory {...props} />}
      </Stack.Screen>
      <Stack.Screen
        options={{
          headerBackVisible: false,
          headerTransparent: true,
          headerBackTitleVisible: false,
          title: '',
          headerShadowVisible: false,
        }}
        name={Routes.SEARCH}
      >
        {(props) => <SearchFactory {...props} />}
      </Stack.Screen>
    </>
  );
};

const HeaderLeftButtonBack = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  margin-left: -16px;
  padding-left: 8px;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-right: 6px;
`;

const HeaderLeftButtonWithBackgroundWhite = styled(HeaderLeftButtonBack)`
  background-color: #ffffff;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export default getScreensStack;
