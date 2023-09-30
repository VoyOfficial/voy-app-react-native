import React from 'react';
import { FlatList, View } from 'react-native';
import ListCard from '../listCard';
import {
  Container,
  HeaderWrapper,
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
};

const CardList = ({ title, seeAll, placeList }: Props) => {
  return (
    <Container>
      <HeaderWrapper>
        <Title testID="title_id">{title}</Title>
        <SeeAllButton testID="see_all_button_id" onPress={seeAll}>
          <SeeAll testID="see_all_id">{'Ver todos'}</SeeAll>
        </SeeAllButton>
      </HeaderWrapper>
      <FlatList
        data={placeList}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ListCard
            index={index}
            title={item.title}
            imageUrl={item.imageUrl}
            location={item.location}
            myDistanceOfLocal={item.myDistanceOfLocal}
            amountOfReviews={item.amountOfReviews}
            rating={item.rating}
            favorite={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        )}
      />
    </Container>
  );
};

export default CardList;
