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
  showMoreDetails,
  seeAllBy,
}: HomeViewModel) => {
  return (
    <View>
      <ListRecommendation
        showMoreDetails={showMoreDetails}
        recommendations={recommendations}
        onSeeAll={onSeeAll}
        seeAllBy={seeAllBy}
      />
      <CardList
        showSeeAllButton
        favorite={favorite}
        placeList={placeList}
        seeAll={onSeeAll}
        title="Descobrir"
        showMoreDetails={showMoreDetails}
        seeAllBy={seeAllBy}
      />
    </View>
  );
};

export default Home;
