import React from 'react';
import { faker } from '@faker-js/faker';
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

export class GetPlaceDetailsFake implements GetPlaceDetails {
  placeDetails: PlaceDetailsModel = {
    title: faker.company.name(),
    amountOfReviews: faker.datatype.number().toString(),
    businessHoursSummary: {
      sunday: {
        start: '',
        end: '',
      },
      monday: {
        start: '',
        end: '',
      },
      tuesday: {
        start: '',
        end: '',
      },
      wednesday: {
        start: '',
        end: '',
      },
      thursday: {
        start: '',
        end: '',
      },
      friday: {
        start: '',
        end: '',
      },
      saturday: {
        start: '',
        end: '',
      },
    },
    contact: '',
    description: '',
    distance: '',
    fullLocation: '',
    location: '',
    photoOfReviewProfiles: [],
    rating: '',
  };
  id = 0;
  error: { status: boolean; message: string } = { message: '', status: false };
  get = async (id: number): Promise<PlaceDetailsModel> => {
    this.id = id;

    if (this.error.status) {
      throw new Error(this.error.message);
    }
    return this.placeDetails;
  };

  completeGetWithError = (message: string) => {
    this.error = { status: true, message };
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
