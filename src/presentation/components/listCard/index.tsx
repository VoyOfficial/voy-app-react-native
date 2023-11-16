import React from 'react';
import Icon from '../../assets/fonts/Voy';
import {
  AmountOfReviews,
  Container,
  ContentWrapper,
  DistanceOfLocal,
  FavoriteButton,
  FavoriteWrapper,
  IconWrapper,
  ImagePlace,
  LineWrapper,
  Location,
  PlaceButtonWithContent,
  Rating,
  Title,
} from './styles';

type Props = {
  index: number;
  imageUrl: string;
  title: string;
  location: string;
  myDistanceOfLocal: string;
  amountOfReviews: string;
  rating: string;
  favorite: () => void;
  showMoreDetails: () => void;
};

const ListCard = ({
  index,
  imageUrl,
  title,
  location,
  myDistanceOfLocal,
  amountOfReviews,
  rating,
  favorite,
  showMoreDetails,
}: Props) => {
  return (
    <Container>
      <PlaceButtonWithContent
        testID={`list_card_${index}_id`}
        onPress={showMoreDetails}
      >
        <ImagePlace
          testID={`image_of_place_${index}_id`}
          source={{ uri: imageUrl }}
        />
        <ContentWrapper>
          <Title testID={`title_${index}_id`}>{title}</Title>
          <LineWrapper>
            <IconWrapper>
              <Icon testID="location_icon_id" name="location" />
            </IconWrapper>
            <Location testID={`location_${index}_id`}>{location}</Location>
          </LineWrapper>
          <LineWrapper>
            <IconWrapper>
              <Icon testID="walking_icon_id" name="walking" />
            </IconWrapper>
            <DistanceOfLocal testID={`distance_of_local_${index}_id`}>
              {myDistanceOfLocal}
            </DistanceOfLocal>
          </LineWrapper>
          <LineWrapper>
            <IconWrapper>
              <Icon color="#FFAB5E" testID="star_icon_id" name="star" />
            </IconWrapper>
            <Rating testID={`rating_${index}_id`}>{rating}</Rating>
            <AmountOfReviews testID={`amount_of_reviews_${index}_id`}>
              {` (${amountOfReviews})`}
            </AmountOfReviews>
          </LineWrapper>
        </ContentWrapper>
      </PlaceButtonWithContent>
      <FavoriteWrapper>
        <FavoriteButton testID={`save_button_${index}_id`} onPress={favorite}>
          <Icon name="save" testID="save_icon_id" size={19} color="#C5CACC" />
        </FavoriteButton>
      </FavoriteWrapper>
    </Container>
  );
};

export default ListCard;
