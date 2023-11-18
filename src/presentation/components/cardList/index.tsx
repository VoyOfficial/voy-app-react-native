import React from 'react';
import ListCard from '../listCard';
import {
  Container,
  HeaderWrapper,
  List,
  SeeAll,
  SeeAllButton,
  Title,
} from './styles';

export type Place = {
  imageUrl: string;
  title: string;
  location: string;
  myDistanceOfLocal: string;
  amountOfReviews: string;
  rating: string;
};

type Props = {
  title: string;
  seeAll: () => void;
  placeList: Array<Place>;
  favorite: () => void;
  showMoreDetails: (place: Place) => void;
};

const CardList = ({
  title,
  seeAll,
  placeList,
  favorite,
  showMoreDetails,
}: Props) => {
  return (
    <Container>
      <HeaderWrapper>
        <Title testID="title_id">{title}</Title>
        <SeeAllButton testID="see_all_button_id" onPress={seeAll}>
          <SeeAll testID="see_all_id">{'Ver todos'}</SeeAll>
        </SeeAllButton>
      </HeaderWrapper>
      <List
        data={placeList}
        renderItem={({ item, index }) =>
          factoryListCard(index, item, favorite, showMoreDetails)
        }
      />
    </Container>
  );
};

const factoryListCard = (
  index: number,
  place: Place,
  favorite: () => void,
  showMoreDetails: (place: Place) => void,
) => {
  return (
    <ListCard
      index={index}
      title={place.title}
      imageUrl={place.imageUrl}
      location={place.location}
      myDistanceOfLocal={place.myDistanceOfLocal}
      amountOfReviews={place.amountOfReviews}
      rating={place.rating}
      favorite={favorite}
      showMoreDetails={showMoreDetails}
    />
  );
};

export default CardList;
