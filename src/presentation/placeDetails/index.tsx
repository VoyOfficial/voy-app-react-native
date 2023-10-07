import React from 'react';
import { Text, View } from 'react-native';

type Props = {
  title: string;
  description: string;
  location: string;
  myDistanceOfLocal: string;
  amountOfReviews: string;
  rating: string;
  businessHoursSummary: string;
  fullLocation: string;
  contact: string;
};

const PlaceDetails = ({
  title,
  description,
  location,
  myDistanceOfLocal,
  amountOfReviews,
  rating,
  businessHoursSummary,
  fullLocation,
  contact,
}: Props) => {
  return (
    <View>
      <Text testID="title_id">{title}</Text>
      <Text testID="description_id">{description}</Text>
      <Text testID="location_id">{location}</Text>
      <Text testID="distance_of_local_id">{myDistanceOfLocal}</Text>
      <Text testID="amount_of_reviews_id">{amountOfReviews}</Text>
      <Text testID="rating_id">{rating}</Text>
      <Text testID="business_hours_summary_id">{businessHoursSummary}</Text>
      <Text testID="full_location_id">{fullLocation}</Text>
      <Text testID="contact_id">{contact}</Text>
    </View>
  );
};

export default PlaceDetails;
