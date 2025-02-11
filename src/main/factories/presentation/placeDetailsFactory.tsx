import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { GetPlaceDetails } from '~/domain/useCases';
import { PlaceDetailsModel, PlaceModel } from '~/domain/models';
import { AxiosAdapter } from '~/infra/http';
import { Routes } from '~/main/navigation';
import {
  PlaceDetails,
  usePlaceDetails,
} from '../../../../src/presentation/placeDetails';
import { StackParams } from '../../../../src/main/navigation/navigation';

export class GetPlaceDetailsDAO implements GetPlaceDetails {
  get = async (id: number): Promise<PlaceDetailsModel> => {
    const axios = new AxiosAdapter();
    const response = await axios.get({
      url: `http://localhost:3000/placeDetails/${id}`,
    });
    return response.body;
  };
}

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
    getPlaceDetails: new GetPlaceDetailsDAO(),
  });

  return <PlaceDetails {...viewModel} />;
};

export default PlaceDetailsFactory;
