import React from 'react';
import { View } from 'react-native';
import CardList, { Place } from '../components/cardList';

type Props = {
  list: Array<Place>;
  favorite: () => void;
  showMoreDetails: (place: Place) => void;
};

const PlaceList = ({ list, favorite, showMoreDetails }: Props) => {
  return (
    <View>
      <CardList
        title={''}
        showSeeAllButton={false}
        seeAll={() => {}}
        placeList={list}
        favorite={favorite}
        showMoreDetails={showMoreDetails}
      />
    </View>
  );
};

export default PlaceList;
