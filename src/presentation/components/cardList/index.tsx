import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import ListCard from '../listCard';

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
    <View>
      <Text testID="title_id">{title}</Text>
      <TouchableOpacity testID="see_all_button_id" onPress={seeAll}>
        <Text testID="see_all_id">{'Ver todos'}</Text>
      </TouchableOpacity>
      <FlatList
        data={placeList}
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
    </View>
  );
};

export default CardList;
