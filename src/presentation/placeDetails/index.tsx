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

const Reviews = ({
  amountOfReviews,
  rating,
}: {
  amountOfReviews: string;
  rating: string;
}) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 22,
      borderBottomWidth: 1,
      paddingBottom: 22,
      borderColor: '#E6E6E6',
      borderTopWidth: 1,
      paddingTop: 22,
    }}
  >
    <View>
      <Text
        testID="amount_of_reviews_id"
        style={{
          fontFamily: 'LexendDeca-Regular',
          fontSize: 13,
          fontWeight: '400',
          lineHeight: 16,
          textDecorationLine: 'underline',
        }}
      >
        {amountOfReviews}
      </Text>
    </View>
    <View>
      <Text
        testID="rating_id"
        style={{
          fontFamily: 'LexendDeca-Regular',
          fontSize: 17,
          fontWeight: '400',
          lineHeight: 21,
        }}
      >
        {rating}
      </Text>
    </View>
  </View>
);

const MoreDetails = ({
  businessHoursSummary,
  fullLocation,
  contact,
}: {
  businessHoursSummary: string;
  fullLocation: string;
  contact: string;
}) => (
  <>
    <View style={{ marginTop: 18 }}>
      <Text
        testID="business_hours_summary_id"
        style={{
          fontFamily: 'LexendDeca-Regular',
          fontSize: 13,
          fontWeight: '400',
          lineHeight: 16.25,
        }}
      >
        {businessHoursSummary}
      </Text>
    </View>
    <View style={{ marginTop: 18 }}>
      <Text
        testID="full_location_id"
        style={{
          fontFamily: 'LexendDeca-Regular',
          fontSize: 13,
          fontWeight: '400',
          lineHeight: 16.25,
        }}
      >
        {fullLocation}
      </Text>
    </View>
    <View style={{ marginTop: 18 }}>
      <Text
        testID="contact_id"
        style={{
          fontFamily: 'LexendDeca-Regular',
          fontSize: 13,
          fontWeight: '400',
          lineHeight: 16.25,
        }}
      >
        {contact}
      </Text>
    </View>
  </>
);
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
    <View style={{ paddingHorizontal: 26 }}>
      <Text
        testID="title_id"
        style={{
          fontSize: 20,
          lineHeight: 25,
          fontWeight: '500',
          fontFamily: 'LexendDeca-Regular',
          marginBottom: 25,
        }}
      >
        {title}
      </Text>
      <Text
        testID="description_id"
        style={{
          fontFamily: 'LexendDeca-Regular',
          fontSize: 13,
          lineHeight: 20,
          fontWeight: '400',
          color: '#B3B3B3',
          marginBottom: 18,
        }}
      >
        {description}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          paddingBottom: 22,
        }}
      >
        <View
          style={{
            backgroundColor: '#F1F5F6',
            padding: 8,
            borderRadius: 10,
            marginRight: 11,
          }}
        >
          <Text
            testID="location_id"
            style={{
              fontFamily: 'LexendDeca-Regular',
              fontSize: 13,
              fontWeight: '400',
              lineHeight: 16,
              color: '#B3B3B3',
            }}
          >
            {location}
          </Text>
        </View>
        <View
          style={{ backgroundColor: '#F1F5F6', padding: 8, borderRadius: 10 }}
        >
          <Text
            testID="distance_of_local_id"
            style={{
              fontFamily: 'LexendDeca-Regular',
              fontSize: 13,
              fontWeight: '400',
              lineHeight: 16,
              color: '#B3B3B3',
            }}
          >
            {myDistanceOfLocal}
          </Text>
        </View>
      </View>
      <Reviews amountOfReviews={amountOfReviews} rating={rating} />
      <MoreDetails
        businessHoursSummary={businessHoursSummary}
        contact={contact}
        fullLocation={fullLocation}
      />
    </View>
  );
};

export default PlaceDetails;
