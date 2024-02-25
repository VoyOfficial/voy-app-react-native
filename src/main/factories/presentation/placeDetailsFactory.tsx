import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { faker } from '@faker-js/faker';
import { Routes } from '~/main/navigation';
import { GetPlaceDetails } from '~/domain/useCases';
import { PlaceDetailsModel } from '~/domain/models';
import {
  PlaceDetails,
  usePlaceDetails,
} from '../../../../src/presentation/placeDetails';
import { StackParams } from '../../navigation/navigation';

export class GetPlaceDetailsFake implements GetPlaceDetails {
  placeDetails: PlaceDetailsModel = {
    title: faker.company.name(),
    amountOfReviews: faker.datatype.number().toString(),
    businessHoursSummary: {
      sunday: {
        start: '08:00',
        end: '12:00',
      },
      monday: {
        start: '08:00',
        end: '12:00',
      },
      tuesday: {
        start: '08:00',
        end: '12:00',
      },
      wednesday: {
        start: '08:00',
        end: '12:00',
      },
      thursday: {
        start: '08:00',
        end: '12:00',
      },
      friday: {
        start: '08:00',
        end: '12:00',
      },
      saturday: {
        start: '08:00',
        end: '12:00',
      },
    },
    contact: faker.phone.number(),
    description: faker.lorem.paragraph(),
    distance: faker.datatype.number().toString(),
    fullLocation: faker.address.streetAddress(),
    location: faker.address.cityName(),
    photoOfReviewProfiles: [faker.image.imageUrl()],
    rating: faker.datatype.number({ min: 1, max: 5 }).toString(),
  };
  id = '';
  error: { status: boolean; message: string } = { message: '', status: false };
  get = async (id: string): Promise<PlaceDetailsModel> => {
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

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const PlaceDetailsFactory = ({}: Props) => {
  const viewModel = usePlaceDetails({
    gallerySummaryImages: [],
    id: '',
    getPlaceDetails: new GetPlaceDetailsFake(),
  });

  return <PlaceDetails {...viewModel} />;
};

export default PlaceDetailsFactory;
