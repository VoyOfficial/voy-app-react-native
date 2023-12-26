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
  search,
}: HomeViewModel) => {
  return (
    <View>
      <View
        style={{
          height: 100,
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          testID="search_button_id"
          style={{
            backgroundColor: '#FFFFFF',
            paddingVertical: 8,
            paddingHorizontal: 17,
            borderRadius: 10,
          }}
          onPress={search}
        >
          <Icon testID="search_id" name="search" size={22.5} color="#B3B3B3" />
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
