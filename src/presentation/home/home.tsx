import React from 'react';
import { View } from 'react-native';
import { ListRecommendation } from '../recommendation/components';
import CardList from '../components/cardList';
import { HomeViewModel } from './useHome';

const Home = ({
  onSeeAll,
  recommendations,
  favorite,
  placeList,
}: HomeViewModel) => {
  return (
    <View>
      <ListRecommendation
        recommendations={recommendations}
        onSeeAll={onSeeAll}
      />
      <CardList
        favorite={favorite}
        placeList={placeList}
        seeAll={onSeeAll}
        title="Descobrir"
      />
    </View>
  );
};

export default Home;
