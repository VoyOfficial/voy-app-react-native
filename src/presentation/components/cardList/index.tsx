import React from 'react';
import {
  Container,
  ContentWrapper,
  DistanceOfLocal,
  ImagePlace,
  Location,
  RatingComments,
  ReviewWrapper,
  Reviews,
  Title,
} from './styles';

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
    <Container>
      <ImagePlace
        style={{
          borderTopLeftRadius: 15,
          borderBottomLeftRadius: 15,
        }}
        testID="image_of_place_id"
        source={{ uri: imageUrl }}
      />
      <ContentWrapper>
        <Title testID="title_id">{title}</Title>
        <Location testID="location_id">{location}</Location>
        <DistanceOfLocal testID="distance_of_local_id">
          {myDistanceOfLocal}
        </DistanceOfLocal>
        <ReviewWrapper>
          <Reviews testID="reviews_id">{reviews}</Reviews>
          <RatingComments testID="rating_comments_id">
            {` (${ratingComments})`}
          </RatingComments>
        </ReviewWrapper>
      </ContentWrapper>
    </Container>
  );
};

export default CardList;
