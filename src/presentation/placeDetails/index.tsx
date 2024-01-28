import React from 'react';
import { GallerySummaryImages, MoreDetails, Reviews } from './components';
import {
  BackgroundImage,
  BlurOfGallerySummaryImages,
  ContentContainer,
  Description,
  DistanceDetailsContainer,
  DistanceOfLocal,
  DistanceOfLocalContainer,
  GallerySummaryImagesWrapper,
  ImagesWrapper,
  Location,
  LocationContainer,
  LocationIcon,
  ScrollContainer,
  Title,
  WalkingIcon,
} from './styles';

export type Props = {
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
  pressSummaryImageFromGallery: (image: string) => void;
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
  pressSummaryImageFromGallery,
}: Props) => {
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
          <GallerySummaryImages
            images={gallerySummaryImages}
            press={pressSummaryImageFromGallery}
          />
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
