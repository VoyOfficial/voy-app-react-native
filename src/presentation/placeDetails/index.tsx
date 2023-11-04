import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Icon from '../assets/fonts/Voy';
import {
  AmountOfReviews,
  AmountOfReviewsContainer,
  BusinessHourIconWrapper,
  BusinessHours,
  BusinessHoursSummaryContainer,
  Container,
  ContentContainer,
  Description,
  DistanceDetailsContainer,
  DistanceOfLocal,
  DistanceOfLocalContainer,
  FullLocation,
  FullLocationContainer,
  FullLocationIconWrapper,
  Location,
  LocationContainer,
  Phone,
  PhoneContainer,
  PhoneIconWrapper,
  ProfileImage,
  ProfileOfReviewProfilesWrapper,
  Rating,
  RatingContainer,
  ReviewContainer,
  Title,
} from './styles';

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
  backgroundImage: string;
  gallerySummaryImages: Array<string>;
  showAllImagesOfGallery: () => void;
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
  <ReviewContainer>
    <AmountOfReviewsContainer>
      <ProfileOfReviewProfilesWrapper>
        {photoOfReviewProfiles.map((photo, index) => (
          <ProfileImage
            key={index}
            testID={`photo_of_review_profiles_${index}_id`}
            source={{ uri: photo }}
            style={getStyleOfPhotoOfReviewProfile(index)}
          />
        ))}
      </ProfileOfReviewProfilesWrapper>
      <AmountOfReviews testID="amount_of_reviews_id">
        {amountOfReviews}
      </AmountOfReviews>
    </AmountOfReviewsContainer>
    <RatingContainer>
      <Icon color="#FFAB5E" testID="star_icon_id" name="star" size={12} />
      <Rating testID="rating_id">{rating}</Rating>
    </RatingContainer>
  </ReviewContainer>
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
    <BusinessHoursSummaryContainer>
      <BusinessHourIconWrapper>
        <Icon
          testID="clock_icon_id"
          name="clock_outline"
          size={16}
          color="#000000"
        />
      </BusinessHourIconWrapper>
      <BusinessHours testID="business_hours_summary_id">
        {businessHoursSummary}
      </BusinessHours>
    </BusinessHoursSummaryContainer>
    <FullLocationContainer>
      <FullLocationIconWrapper>
        <Icon
          testID="full_location_icon_id"
          name="location_outline"
          size={16}
          color="#000000"
        />
      </FullLocationIconWrapper>
      <FullLocation testID="full_location_id">{fullLocation}</FullLocation>
    </FullLocationContainer>
    <PhoneContainer>
      <PhoneIconWrapper>
        <Icon
          testID="phone_icon_id"
          name="phone_outline"
          size={16}
          color="#000000"
        />
      </PhoneIconWrapper>
      <Phone testID="contact_id">{contact}</Phone>
    </PhoneContainer>
  </>
);

const renderGallerySummaryImages = (images: Array<string>) => {
  const gallerySummaryImages = [];
  for (let index = 0; index < 4; index++) {
    gallerySummaryImages.push(
      <>
        {index === 3 && (
          <View
            testID={`gallery_summary_image_background_${index}_id`}
            style={{
              width: 56,
              height: 54,
              position: 'absolute',
              backgroundColor: 'black',
              right: 0,
              zIndex: 2,
              marginRight: 15,
              marginTop: 15,
              borderRadius: 10,
              opacity: 0.5,
            }}
          />
        )}
        <Image
          key={index}
          testID={`gallery_summary_image_${index}_id`}
          source={{ uri: images[index] }}
          style={{
            width: 56,
            height: 54,
            borderRadius: 10,
            marginHorizontal: 5,
            shadowOpacity: 0.5,
          }}
        />
      </>,
    );
  }

  return gallerySummaryImages;
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
  photoOfReviewProfiles,
  backgroundImage,
  gallerySummaryImages,
  showAllImagesOfGallery,
}: Props) => {
  const mostAvailableNumberOfImages = gallerySummaryImages.length - 4;

  return (
    <Container>
      <View style={{ height: '40%' }}>
        <Image
          testID="background_image_id"
          source={{ uri: backgroundImage }}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: 0,
            alignSelf: 'center',
            paddingVertical: 15,
            paddingHorizontal: 10,
            marginBottom: 15,
          }}
        >
          <BlurView
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              borderRadius: 20,
            }}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
          {renderGallerySummaryImages(gallerySummaryImages)}
          {mostAvailableNumberOfImages > 0 && (
            <TouchableOpacity
              testID="button_show_all_images_of_gallery_id"
              onPress={showAllImagesOfGallery}
              style={{
                justifyContent: 'center',
                position: 'absolute',
                right: 0,
                alignSelf: 'center',
                marginRight: 16,
                zIndex: 2,
                width: 56,
                height: 54,
                alignItems: 'center',
              }}
            >
              <Text
                testID="most_available_number_of_images_id"
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'LexendDeca-Regular',
                  fontWeight: '400',
                  lineHeight: 21.25,
                  fontSize: 17,
                }}
              >
                {`+${mostAvailableNumberOfImages + 1}`}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ContentContainer>
        <Title testID="title_id">{title}</Title>
        <Description testID="description_id">{description}</Description>
        <DistanceDetailsContainer>
          <LocationContainer>
            <Icon
              testID="location_icon_id"
              name="location"
              size={11}
              color="#212121"
            />
            <Location testID="location_id">{location}</Location>
          </LocationContainer>
          <DistanceOfLocalContainer>
            <Icon
              testID="walking_icon_id"
              name="walking"
              size={11}
              color="#212121"
            />
            <DistanceOfLocal testID="distance_of_local_id">
              {myDistanceOfLocal}
            </DistanceOfLocal>
          </DistanceOfLocalContainer>
        </DistanceDetailsContainer>
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
      </ContentContainer>
    </Container>
  );
};

export default PlaceDetails;
