import React from 'react';
import { View } from 'react-native';
import { ListRecommendation } from '../recommendation/components';
import { HomeViewModel } from './useHome';

const Home = ({ onSeeAll, recommendations }: HomeViewModel) => {
  return (
    <View>
      <ListRecommendation
        recommendations={recommendations}
        onSeeAll={onSeeAll}
      />
    </View>
  );
};

export default Home;
