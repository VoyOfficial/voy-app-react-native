import React from 'react';
import { CommonActions, RouteProp } from '@react-navigation/native';
import { ListPlaces, ListRecommendations } from '~/domain/useCases';
import { PlaceModel, RecommendationModel } from '~/domain/models';
import { Routes, navigator } from '../../../../src/main/navigation';
import { Home, useHome } from '../../../presentation/home';
import { StackParams } from '../../../../src/main/navigation/navigation';

const navigate = (routeName: string, params: any) => {
  navigator.dispatch(
    CommonActions.navigate({ name: routeName, params: params }),
  );
};

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

class ListPlacesDAO implements ListPlaces {
  constructor() {}
  async list(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    location: { long: string; lat: string },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    nextPageToken?: string | undefined,
  ): Promise<PlaceModel[]> {
    return [
      {
        amountOfReviews: '',
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
    navigate: navigate,
    listRecommendations: new ListRecommendationsDAO(),
    listPlaces: new ListPlacesDAO(),
  });
  return <Home {...viewModel} />;
};

export default HomeFactory;
