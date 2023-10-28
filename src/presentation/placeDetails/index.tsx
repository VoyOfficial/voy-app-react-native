import React from 'react';
import { Image, View } from 'react-native';
import Icon from '../assets/fonts/Voy';
import {
  AmountOfReviews,
  AmountOfReviewsContainer,
  BusinessHourIconWrapper,
  BusinessHours,
  BusinessHoursSummaryContainer,
  Container,
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
}: Props) => {
  return (
    <Container>
      <Image testID="background_image_id" source={{ uri: backgroundImage }} />
      <View>
        {gallerySummaryImages.map((image, id) => (
          <Image
            key={id}
            testID={`gallery_summary_image_${id}_id`}
            source={{ uri: image }}
          />
        ))}
      </View>
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
    </Container>
  );
};

export default PlaceDetails;
