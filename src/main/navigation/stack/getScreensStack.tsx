import React from 'react';
import HomeFactory from '../../factories/presentation/homeFactory';
import { Routes } from '../routes';
import { Stack } from './stackNavigation';

const getScreensStack = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} name={Routes.HOME}>
        {(props) => <HomeFactory {...props} />}
      </Stack.Screen>
    </>
  );
};

export default getScreensStack;
