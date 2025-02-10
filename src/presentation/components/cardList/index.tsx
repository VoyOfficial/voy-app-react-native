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
  id: number;
  imageUrl: string;
  title: string;
  location: string;
  myDistanceOfLocal: string;
  amountOfReviews: string;
  rating: string;
};

type Props = {
  title: string;
  seeAllBy: string;
  seeAll: (by: string) => void;
  placeList: Array<Place>;
  favorite: () => void;
  showSeeAllButton: boolean;
  showMoreDetails: (place: Place) => void;
};

const CardList = ({
  title,
  seeAllBy,
  seeAll,
  placeList,
  favorite,
  showSeeAllButton,
  showMoreDetails,
}: Props) => {
  return (
    <Container>
      <HeaderWrapper>
        <Title testID="title_id">{title}</Title>
        {showSeeAllButton && (
          <SeeAllButton
            testID="see_all_button_id"
            onPress={() => seeAll(seeAllBy)}
          >
            <SeeAll testID="see_all_id">{'Ver todos'}</SeeAll>
          </SeeAllButton>
        )}
      </HeaderWrapper>
      <List
        testID="place_list_id"
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
      id={place.id}
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
