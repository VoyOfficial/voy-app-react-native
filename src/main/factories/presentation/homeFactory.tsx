import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { apiEndpoints } from '~/core';
import { AxiosAdapter } from '~/infra/http';
import { GeolocationAdapter } from '~/infra/location';
import { RemoteListPlaces, RemoteListRecommendations } from '~/data/useCases';
import { FirebaseAnalyticsAdapter } from '~/infra/analytics';
import { Actions, Routes, navigator } from '../../../../src/main/navigation';
import { Home, useHome } from '../../../presentation/home';
import { StackParams } from '../../../../src/main/navigation/navigation';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const HomeFactory = ({}: Props) => {
  const viewModel = useHome({
    navigate: new Actions(navigator).navigate,
    listRecommendations: new RemoteListRecommendations(
      apiEndpoints.recommendations(),
      new AxiosAdapter(),
      new FirebaseAnalyticsAdapter(),
    ),
    listPlaces: new RemoteListPlaces(
      apiEndpoints.places(),
      new AxiosAdapter(),
      new FirebaseAnalyticsAdapter(),
    ),
    locationService: new GeolocationAdapter(),
  });
  return <Home {...viewModel} />;
};

export default HomeFactory;
