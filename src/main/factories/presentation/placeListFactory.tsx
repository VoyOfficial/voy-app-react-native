import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { Actions, Routes, navigator } from '~/main/navigation';
import { ListPlaces, ListRecommendations } from '~/domain/useCases';
import { PlaceModel, RecommendationModel } from '~/domain/models';
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

const PlaceListFactory = ({}: Props) => {
  const viewModel = usePlaceList({
    by: Origin.Recommendations,
    listRecommendations: new ListRecommendationsDAO(),
    listPlaces: new ListPlacesDAO(),
    navigate: new Actions(navigator).navigate,
  });
  return <PlaceList {...viewModel} />;
};

export default PlaceListFactory;
