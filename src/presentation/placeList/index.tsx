import React from 'react';
import { View } from 'react-native';
import CardList from '../components/cardList';
import { PlaceListViewModel } from './usePlaceList';

const PlaceList = ({ list, favorite, showMoreDetails }: PlaceListViewModel) => {
  return (
    <View>
      <CardList
        title={''}
        showSeeAllButton={false}
        seeAll={() => {}}
        placeList={list}
        favorite={favorite}
        showMoreDetails={showMoreDetails}
        seeAllBy=""
      />
    </View>
  );
};

export default PlaceList;
