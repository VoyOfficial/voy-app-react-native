import React from 'react';
import { View } from 'react-native';
import { ListRecommendation } from '../recommendation/components';
import CardList from '../components/cardList';
import { Origin } from '../placeList/usePlaceList';
import { HomeViewModel } from './useHome';

const Home = ({
  onSeeAll,
  recommendations,
  favorite,
  placeList,
  showMoreDetails,
}: HomeViewModel) => {
  return (
    <View>
      <ListRecommendation
        showMoreDetails={showMoreDetails}
        recommendations={recommendations}
        onSeeAll={onSeeAll}
        seeAllBy={Origin.Recommendations}
      />
      <CardList
        showSeeAllButton
        favorite={favorite}
        placeList={placeList}
        seeAll={onSeeAll}
        title="Descobrir"
        showMoreDetails={showMoreDetails}
        seeAllBy={Origin.Places}
      />
    </View>
  );
};

export default Home;
