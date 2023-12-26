import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ListRecommendation } from '../recommendation/components';
import CardList from '../components/cardList';
import { Origin } from '../placeList/usePlaceList';
import Icon from '../assets/fonts/Voy';
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
      <View>
        <TouchableOpacity testID="search_button_id">
          <Icon testID="search_id" name="search" size={22.5} />
        </TouchableOpacity>
      </View>
      <ListRecommendation
        showMoreDetails={showMoreDetails}
        recommendations={recommendations}
        onSeeAll={onSeeAll}
        seeAllBy={Origin.Recommendations}
        handleSaveLocation={() => {}}
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
