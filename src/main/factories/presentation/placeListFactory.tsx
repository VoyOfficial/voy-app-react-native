import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { Routes } from '~/main/navigation';
import { ListRecommendations } from '~/domain/useCases';
import { RecommendationModel } from '~/domain/models';
import { StackParams } from '../../navigation/navigation';
import PlaceList from '../../../../src/presentation/placeList';
import usePlaceList, {
  Origin,
} from '../../../../src/presentation/placeList/usePlaceList';

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

const PlaceListFactory = ({}: Props) => {
  const viewModel = usePlaceList({
    by: Origin.Recommendations,
    listRecommendations: new ListRecommendationsDAO(),
  });
  return <PlaceList {...viewModel} />;
};

export default PlaceListFactory;
