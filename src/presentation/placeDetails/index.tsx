import React from 'react';
import {
  AmountOfReviews,
  AmountOfReviewsContainer,
  BackgroundImage,
  BlurOfGallerySummaryImages,
  BusinessHourIconWrapper,
  BusinessHours,
  BusinessHoursSummaryContainer,
  ButtonShowAllImagesOfGallery,
  ClockOutlineIcon,
  ContentContainer,
  Description,
  DistanceDetailsContainer,
  DistanceOfLocal,
  DistanceOfLocalContainer,
  FullLocation,
  FullLocationContainer,
  FullLocationIconWrapper,
  GallerySummaryImage,
  GallerySummaryImageBackground,
  GallerySummaryImagesWrapper,
  ImagesWrapper,
  Location,
  LocationContainer,
  LocationIcon,
  LocationOutlineIcon,
  MostAvailableNumberOfImages,
  Phone,
  PhoneContainer,
  PhoneIconWrapper,
  PhoneOutlineIcon,
  ProfileImage,
  ProfileOfReviewProfilesWrapper,
  Rating,
  RatingContainer,
  ReviewContainer,
  ScrollContainer,
  StarIcon,
  Title,
  WalkingIcon,
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
      <StarIcon testID="star_icon_id" />
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
        <ClockOutlineIcon testID="clock_icon_id" />
      </BusinessHourIconWrapper>
      <BusinessHours testID="business_hours_summary_id">
        {businessHoursSummary}
      </BusinessHours>
    </BusinessHoursSummaryContainer>
    <FullLocationContainer>
      <FullLocationIconWrapper>
        <LocationOutlineIcon testID="full_location_icon_id" />
      </FullLocationIconWrapper>
      <FullLocation testID="full_location_id">{fullLocation}</FullLocation>
    </FullLocationContainer>
    <PhoneContainer>
      <PhoneIconWrapper>
        <PhoneOutlineIcon testID="phone_icon_id" />
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
          <GallerySummaryImageBackground
            testID={`gallery_summary_image_background_${index}_id`}
          />
        )}
        <GallerySummaryImage
          key={index}
          testID={`gallery_summary_image_${index}_id`}
          source={{ uri: images[index] }}
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
    <ScrollContainer>
      <ImagesWrapper>
        <BackgroundImage
          testID="background_image_id"
          source={{ uri: backgroundImage }}
          resizeMode="cover"
        />
        <GallerySummaryImagesWrapper>
          <BlurOfGallerySummaryImages style={{ borderRadius: 20 }} />
          {renderGallerySummaryImages(gallerySummaryImages)}
          {mostAvailableNumberOfImages > 0 && (
            <ButtonShowAllImagesOfGallery
              testID="button_show_all_images_of_gallery_id"
              onPress={showAllImagesOfGallery}
            >
              <MostAvailableNumberOfImages testID="most_available_number_of_images_id">
                {`+${mostAvailableNumberOfImages + 1}`}
              </MostAvailableNumberOfImages>
            </ButtonShowAllImagesOfGallery>
          )}
        </GallerySummaryImagesWrapper>
      </ImagesWrapper>
      <ContentContainer>
        <Title testID="title_id">{title}</Title>
        <Description testID="description_id">{description}</Description>
        <DistanceDetailsContainer>
          <LocationContainer>
            <LocationIcon testID="location_icon_id" />
            <Location testID="location_id">{location}</Location>
          </LocationContainer>
          <DistanceOfLocalContainer>
            <WalkingIcon testID="walking_icon_id" />
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
    </ScrollContainer>
  );
};

export default PlaceDetails;
