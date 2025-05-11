import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { ListPlaces, ListRecommendations } from '~/domain/useCases';
import { PlaceModel, RecommendationModel } from '~/domain/models';
import { AxiosAdapter } from '~/infra/http';
import { Actions, Routes, navigator } from '../../../../src/main/navigation';
import { Home, useHome } from '../../../presentation/home';
import { StackParams } from '../../../../src/main/navigation/navigation';

class ListRecommendationsDAO implements ListRecommendations {
  async list(): Promise<RecommendationModel[]> {
    const axios = new AxiosAdapter();
    const response = await axios.get({
      url: 'http://localhost:3000/recommendations', //10.0.2.2:3000
    });
    return response.body;
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
    const axios = new AxiosAdapter();
    const response = await axios.get({
      url: 'http://localhost:3000/places', // 10.0.2.2:3000
    });
    return response.body;
  }
}

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const HomeFactory = ({}: Props) => {
  const viewModel = useHome({
    navigate: new Actions(navigator).navigate,
    listRecommendations: new ListRecommendationsDAO(),
    listPlaces: new ListPlacesDAO(),
  });
  return <Home {...viewModel} />;
};

export default HomeFactory;
