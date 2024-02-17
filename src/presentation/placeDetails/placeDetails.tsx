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
import ImagesGallery from './components/imagesGallery';

export const gallerySummaryImagesToImagesGallery = (
  images: Array<string>,
): Array<{ id: number; url: string }> => {
  return images.map((image, index) => ({ id: index, url: image }));
};

export type PlaceDetailsViewModel = {
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
  isOpenImagesGallery: boolean;
  pressSummaryImageFromGallery: (image: string, showInGallery: boolean) => void;
  closeImagesGallery: () => void;
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
  isOpenImagesGallery,
  pressSummaryImageFromGallery,
  closeImagesGallery,
}: PlaceDetailsViewModel) => {
  return (
    <ScrollContainer>
      <ImagesGallery
        images={gallerySummaryImagesToImagesGallery(gallerySummaryImages)}
        isOpen={isOpenImagesGallery}
        close={closeImagesGallery}
      />
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
