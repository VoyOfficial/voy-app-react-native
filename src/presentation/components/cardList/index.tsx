import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from '../../assets/fonts/Voy';
import {
  AmountOfReviews,
  Container,
  ContentWrapper,
  DistanceOfLocal,
  IconWrapper,
  ImagePlace,
  LineWrapper,
  Location,
  Rating,
  Title,
} from './styles';

type Props = {
  imageUrl: string;
  title: string;
  location: string;
  myDistanceOfLocal: string;
  amountOfReviews: string;
  rating: string;
  favorite: () => void;
};

const CardList = ({
  imageUrl,
  title,
  location,
  myDistanceOfLocal,
  amountOfReviews,
  rating,
  favorite,
}: Props) => {
  return (
    <Container>
      <ImagePlace testID="image_of_place_id" source={{ uri: imageUrl }} />
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
        <LineWrapper>
          <IconWrapper>
            <Icon color="#FFAB5E" testID="star_icon_id" name="star" />
          </IconWrapper>
          <Rating testID="rating_id">{rating}</Rating>
          <AmountOfReviews testID="amount_of_reviews_id">
            {` (${amountOfReviews})`}
          </AmountOfReviews>
        </LineWrapper>
      </ContentWrapper>
      <View style={{ margin: 12 }}>
        <TouchableOpacity
          style={{ backgroundColor: '#F1F5F6', padding: 7, borderRadius: 11 }}
          testID="save_button_id"
          onPress={favorite}
        >
          <Icon name="save" testID="save_icon_id" size={19} color="#C5CACC" />
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default CardList;
