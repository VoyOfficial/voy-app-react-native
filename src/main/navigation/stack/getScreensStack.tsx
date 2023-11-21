import React from 'react';
import styled from 'styled-components/native';
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
            <HeaderLeftButton onPress={new Actions(navigator).goBack}>
              <Icon name="arrow_left" size={32} />
            </HeaderLeftButton>
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

const HeaderLeftButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  margin-left: -16px;
  padding-left: 8px;
  background-color: #ffffff;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-right: 6px;
`;

export default getScreensStack;
