import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { ListRecommendations } from '~/domain/useCases';
import { RecommendationModel } from '~/domain/models';
import { Routes } from '../../../../src/main/navigation';
import { Home, useHome } from '../../../presentation/home';
import { StackParams } from '../../../../src/main/navigation/navigation';

class ListRecommendationsDAO implements ListRecommendations {
  async list(): Promise<RecommendationModel[]> {
    return [
      {
        imageUrl: '',
        location: '',
        myDistanceOfLocal: '',
        rating: '',
        title: '',
      },
    ];
  }
}

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const HomeFactory = ({}: Props) => {
  const viewModel = useHome({
    navigate: () => {},
    listRecommendations: new ListRecommendationsDAO(),
  });
  return <Home {...viewModel} />;
};

export default HomeFactory;
