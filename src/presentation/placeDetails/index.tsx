import React from 'react';
import { Image, Text, View } from 'react-native';
import Icon from '../assets/fonts/Voy';

export const getStyleOfPhotoOfReviewProfile = (index: number) => {
  switch (index) {
    case 0:
      return { zIndex: 1, left: 0 };
    case 1:
      return { zIndex: 2, left: -10 };
    case 2:
      return { zIndex: 3, left: -20 };
    default:
      break;
  }
};

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
  photoOfReviewProfiles: Array<string>;
};

const Reviews = ({
  amountOfReviews,
  rating,
  photoOfReviewProfiles,
}: {
  amountOfReviews: string;
  rating: string;
  photoOfReviewProfiles: Array<string>;
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
      alignItems: 'center',
    }}
  >
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', marginRight: -11 }}>
        {photoOfReviewProfiles.map((photo, index) => (
          <Image
            key={index}
            testID={`photo_of_review_profiles_${index}_id`}
            source={{ uri: photo }}
            style={[
              {
                width: 31,
                height: 31,
                borderRadius: 15,
                borderWidth: 3,
                borderColor: '#FFFFFF',
              },
              getStyleOfPhotoOfReviewProfile(index),
            ]}
          />
        ))}
      </View>
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
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Icon color="#FFAB5E" testID="star_icon_id" name="star" size={12} />
      <Text
        testID="rating_id"
        style={{
          fontFamily: 'LexendDeca-Regular',
          fontSize: 17,
          fontWeight: '400',
          lineHeight: 21,
          marginLeft: 7,
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
  photoOfReviewProfiles,
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
      <Reviews
        amountOfReviews={amountOfReviews}
        rating={rating}
        photoOfReviewProfiles={photoOfReviewProfiles}
      />
      <MoreDetails
        businessHoursSummary={businessHoursSummary}
        contact={contact}
        fullLocation={fullLocation}
      />
    </View>
  );
};

export default PlaceDetails;
