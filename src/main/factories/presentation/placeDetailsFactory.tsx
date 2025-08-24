import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { PlaceModel } from '~/domain/models';
import { AxiosAdapter } from '~/infra/http';
import { Routes } from '~/main/navigation';
import { RemoteGetPlaceDetails } from '~/data/useCases';
import { FirebaseAnalyticsAdapter } from '~/infra/analytics';
import {
  PlaceDetails,
  usePlaceDetails,
} from '../../../../src/presentation/placeDetails';
import { StackParams } from '../../../../src/main/navigation/navigation';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const hasPlace = (
  params: { place?: PlaceModel } | { by: string },
): params is { place: PlaceModel } => {
  return (params as { place: PlaceModel }).place !== undefined;
};

const getId = (route: RouteProp<StackParams, Routes>): number => {
  if (route.params && hasPlace(route.params)) {
    return route.params.place.id;
  }

  return 0;
};

const PlaceDetailsFactory = ({ route }: Props) => {
  const viewModel = usePlaceDetails({
    gallerySummaryImages: [],
    id: getId(route),
    getPlaceDetails: new RemoteGetPlaceDetails(
      `http://localhost:3000/placeDetails/${getId(route)}`,
      new AxiosAdapter(),
      new FirebaseAnalyticsAdapter(),
    ),
  });

  return <PlaceDetails {...viewModel} />;
};

export default PlaceDetailsFactory;
