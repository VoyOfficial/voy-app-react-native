import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { Routes } from '~/main/navigation';
import PlaceDetails from '../../../presentation/placeDetails';
import { StackParams } from '../../navigation/navigation';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const PlaceDetailsFactory = ({}: Props) => {
  return (
    <PlaceDetails
      title={''}
      description={''}
      location={''}
      myDistanceOfLocal={''}
      amountOfReviews={''}
      rating={''}
      businessHoursSummary={''}
      fullLocation={''}
      contact={''}
      photoOfReviewProfiles={[]}
      backgroundImage={''}
      gallerySummaryImages={[]}
      pressSummaryImageFromGallery={function (): void {
        throw new Error('Function not implemented.');
      }}
    />
  );
};

export default PlaceDetailsFactory;
