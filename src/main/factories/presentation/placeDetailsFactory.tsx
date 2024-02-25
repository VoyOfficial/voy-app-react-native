import React from 'react';
import { GetPlaceDetailsFake } from 'tests/presentation/placeDetails/usePlaceDetails.spec';
import { RouteProp } from '@react-navigation/native';
import { Routes } from '~/main/navigation';
import {
  PlaceDetails,
  usePlaceDetails,
} from '../../../../src/presentation/placeDetails';
import { StackParams } from '../../navigation/navigation';

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
