import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { Actions, Routes, navigator } from '~/main/navigation';
import { ListPlaces, ListRecommendations } from '~/domain/useCases';
import { PlaceModel, RecommendationModel } from '~/domain/models';
import { Place } from '../../../presentation/components/cardList';
import { RecommendationProps } from '../../../presentation/recommendation/components/listRecommendation';
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
  const [places, setPlaces] = useState<Place[]>([]);

  const getPlaces = async () => {
    const response = await getListByOrigin(
      Origin.Places,
      new ListRecommendationsDAO(),
      new ListPlacesDAO(),
      { lat: '', long: '' },
    );

    setPlaces(response);
  };

  useEffect(() => {
    getPlaces();
  }, []);

  const viewModel = usePlaceList({
    navigate: new Actions(navigator).navigate,
    places,
  });
  return <PlaceList {...viewModel} />;
};

export class RecommendationsMapper {
  constructor(private readonly recommendations: RecommendationProps[]) {}

  toPlaces = (): Place[] => {
    return this.recommendations.map((recommendation) => {
      return {
        amountOfReviews: '',
        imageUrl: recommendation.imageUrl,
        location: recommendation.location,
        myDistanceOfLocal: recommendation.myDistanceOfLocal,
        rating: recommendation.rating,
        title: recommendation.title,
      };
    }) as Place[];
  };
}

export const getListByOrigin = async (
  by: Origin,
  listRecommendations: ListRecommendations,
  listPlaces: ListPlaces,
  location: { lat: string; long: string },
): Promise<Place[]> => {
  if (by === Origin.Recommendations) {
    const response = await listRecommendations.list();
    return new RecommendationsMapper(response).toPlaces();
  }

  if (by === Origin.Places) {
    if (location) {
      return await listPlaces.list(location);
    }
  }

  return [];
};

export default PlaceListFactory;
