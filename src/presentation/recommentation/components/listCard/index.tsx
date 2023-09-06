import React from 'react';
import Icon from '../../../assets/fonts/Voy';
import {
  Container,
  DistanceOfLocal,
  IconStartWrapper,
  IconWrapper,
  ImageContent,
  Location,
  Rating,
  Save,
  SaveBtn,
  Title,
  Wrapper,
  WrapperLine,
  WrapperTitle,
} from './styles';

type Props = {
  imageUrl: string;
  title: string;
  location: string;
  myDistanceOfLocal: string;
  rating: string;
  onSaveLocation: () => void;
};

const ListCard = ({
  title,
  location,
  myDistanceOfLocal,
  rating,
  imageUrl,
  onSaveLocation,
}: Props) => {
  return (
    <Container>
      <ImageContent
        testID="image_of_place_id"
        accessibilityLabel={title}
        source={{
          uri: imageUrl,
        }}
      />
      <Wrapper>
        <WrapperTitle>
          <Title testID="title_id">{title}</Title>
          <SaveBtn testID="save_location_id" onPress={onSaveLocation}>
            <Save name="save" testID="save_icon_id" />
          </SaveBtn>
        </WrapperTitle>
        <WrapperLine>
          <IconWrapper>
            <Icon testID="location_icon_id" name="location" />
          </IconWrapper>
          <Location testID="location_id">{location}</Location>
        </WrapperLine>
        <WrapperLine>
          <IconWrapper>
            <Icon testID="walking_icon_id" name="walking" />
          </IconWrapper>
          <DistanceOfLocal testID="distance_of_local_id">
            {myDistanceOfLocal}
          </DistanceOfLocal>
          <IconStartWrapper>
            <Icon color="#FFAB5E" testID="star_icon_id" name="star" />
          </IconStartWrapper>
          <Rating testID="rating_id">{rating}</Rating>
        </WrapperLine>
      </Wrapper>
    </Container>
  );
};

export default ListCard;
