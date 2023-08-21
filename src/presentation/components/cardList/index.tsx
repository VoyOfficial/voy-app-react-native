import React from 'react';
import Icon from '../../assets/fonts/Voy';
import {
  Container,
  ContentWrapper,
  DistanceOfLocal,
  IconWrapper,
  ImagePlace,
  LineWrapper,
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
        <LineWrapper>
          <IconWrapper>
            <Icon testID="location_icon_id" name="location" />
          </IconWrapper>
          <Location testID="location_id">{location}</Location>
        </LineWrapper>
        <LineWrapper>
          <IconWrapper>
            <Icon testID="walking_icon_id" name="walking" />
          </IconWrapper>
          <DistanceOfLocal testID="distance_of_local_id">
            {myDistanceOfLocal}
          </DistanceOfLocal>
        </LineWrapper>
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
