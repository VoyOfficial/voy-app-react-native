import React from 'react';
import Icon from '../../../assets/fonts/Voy';
import { RecommendationProps } from '../listRecommendation';
import {
  Container,
  ContentWrapper,
  DistanceOfLocal,
  IconStartWrapper,
  IconWrapper,
  ImageButton,
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
  index: number;
  imageUrl: string;
  title: string;
  location: string;
  myDistanceOfLocal: string;
  rating: string;
  onSaveLocation: () => void;
  showMoreDetails: (place: RecommendationProps) => void;
};

const ListCard = ({
  index,
  title,
  location,
  myDistanceOfLocal,
  rating,
  imageUrl,
  onSaveLocation,
  showMoreDetails,
}: Props) => {
  return (
    <Container>
      <ImageButton
        testID={`list_card_${index}_id`}
        onPress={() =>
          showMoreDetails({
            imageUrl,
            location,
            myDistanceOfLocal,
            rating,
            title,
          })
        }
      >
        <ImageContent
          testID="image_of_place_id"
          accessibilityLabel={title}
          source={{
            uri: imageUrl,
          }}
        />
      </ImageButton>
      <Wrapper>
        <ContentWrapper>
          <WrapperTitle>
            <Title testID="title_id">{title}</Title>
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
        </ContentWrapper>
        <SaveBtn testID="save_location_id" onPress={onSaveLocation}>
          <Save name="save" testID="save_icon_id" />
        </SaveBtn>
      </Wrapper>
    </Container>
  );
};

export default ListCard;
