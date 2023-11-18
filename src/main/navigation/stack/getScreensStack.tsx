import React from 'react';
import HomeFactory from '../../factories/presentation/homeFactory';
import { Routes } from '../routes';
import PlaceDetailsFactory from '../../factories/presentation/placeDetailsFactory';
import { Stack } from './stackNavigation';

const getScreensStack = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} name={Routes.HOME}>
        {(props) => <HomeFactory {...props} />}
      </Stack.Screen>
      <Stack.Screen
        options={{ headerShown: false }}
        name={Routes.PLACE_DETAILS}
      >
        {(props) => <PlaceDetailsFactory {...props} />}
      </Stack.Screen>
    </>
  );
};

export default getScreensStack;
