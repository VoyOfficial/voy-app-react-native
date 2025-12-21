import React from 'react';
import { RouteProp } from '@react-navigation/native';
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
      'http://localhost:8080/api/registration/v1/places/recommendations',
      new AxiosAdapter(),
      new FirebaseAnalyticsAdapter(),
    ),
    listPlaces: new RemoteListPlaces(
      'http://localhost:8080/api/registration/v1/places',
      new AxiosAdapter(),
      new FirebaseAnalyticsAdapter(),
    ),
    locationService: new GeolocationAdapter(),
  });
  return <Home {...viewModel} />;
};

export default HomeFactory;
