import React from 'react';
import { Image, Text, View } from 'react-native';

type Props = {
  imageUrl: string;
  title: string;
  location: string;
  myDistanceOfLocal: string;
  ratingComments: string;
  reviews: string;
};

const CardList = ({
  imageUrl,
  title,
  location,
  myDistanceOfLocal,
  ratingComments,
  reviews,
}: Props) => {
  return (
    <View>
      <Image testID="image_of_place_id" source={{ uri: imageUrl }} />
      <Text testID="title_id">{title}</Text>
      <Text testID="location_id">{location}</Text>
      <Text testID="distance_of_local_id">{myDistanceOfLocal}</Text>
      <Text testID="rating_comments_id">{ratingComments}</Text>
      <Text testID="reviews_id">{reviews}</Text>
    </View>
  );
};

export default CardList;
