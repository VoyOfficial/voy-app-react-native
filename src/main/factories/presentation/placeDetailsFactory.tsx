import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GetPlaceDetails } from '~/domain/useCases';
import { PlaceDetailsModel, PlaceModel } from '~/domain/models';
import { AxiosAdapter } from '~/infra/http';
import {
  PlaceDetails,
  usePlaceDetails,
} from '../../../../src/presentation/placeDetails';

export class GetPlaceDetailsDAO implements GetPlaceDetails {
  get = async (id: number): Promise<PlaceDetailsModel> => {
    const axios = new AxiosAdapter();
    const response = await axios.get({
      url: `http://localhost:3000/placeDetails/${id}`,
    });
    return response.body;
  };
}

type RootStackParamList = {
  Home: { place: PlaceModel };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const PlaceDetailsFactory = ({ route }: Props) => {
  const id = route.params?.place.id;
  const viewModel = usePlaceDetails({
    gallerySummaryImages: [],
    id: id,
    getPlaceDetails: new GetPlaceDetailsDAO(),
  });

  return <PlaceDetails {...viewModel} />;
};

export default PlaceDetailsFactory;
