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
    <View
      style={{
        backgroundColor: '#FFF',
        flexDirection: 'row',
        borderRadius: 15,
        height: 115,
      }}
    >
      <Image
        style={{
          width: 115,
          height: 115,
          borderTopLeftRadius: 15,
          borderBottomLeftRadius: 15,
        }}
        testID="image_of_place_id"
        source={{ uri: imageUrl }}
      />
      <View style={{ margin: 12, justifyContent: 'space-around' }}>
        <Text
          style={{
            color: '#212121',
            fontSize: 17,
            fontWeight: '400',
            lineHeight: 21.25,
          }}
          testID="title_id"
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontWeight: '400',
            lineHeight: 16.25,
            color: '#AEAEAE',
          }}
          testID="location_id"
        >
          {location}
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontWeight: '400',
            lineHeight: 16.25,
            color: '#AEAEAE',
          }}
          testID="distance_of_local_id"
        >
          {myDistanceOfLocal}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              color: '#212121',
              fontSize: 13,
              fontWeight: '400',
              lineHeight: 16.25,
            }}
            testID="reviews_id"
          >
            {reviews}
          </Text>
          <Text
            style={{
              color: '#AEAEAE',
              fontSize: 13,
              fontWeight: '400',
              lineHeight: 16.25,
            }}
            testID="rating_comments_id"
          >
            {`(${ratingComments})`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CardList;
