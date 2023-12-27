import React, { useEffect, useLayoutEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { Actions, Routes, navigator } from '~/main/navigation';
import { ListPlaces, ListRecommendations } from '~/domain/useCases';
import { PlaceModel, RecommendationModel } from '~/domain/models';
import { Place } from '../../../presentation/components/cardList';
import { StackParams } from '../../navigation/navigation';
import PlaceList from '../../../../src/presentation/placeList';
import usePlaceList, {
  Origin,
} from '../../../../src/presentation/placeList/usePlaceList';
import getPlacesByOrigin from './helpers/getPlacesByOrigin';

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

const PlaceListFactory = ({ route: { params }, navigation }: Props) => {
  const [places, setPlaces] = useState<Place[]>([]);

  const setTitle = () => {
    const origin = params?.by as Origin;
    if (origin === Origin.Places) {
      navigation.setOptions({ title: 'Descobrir' });
    }

    if (origin === Origin.Recommendations) {
      navigation.setOptions({ title: 'Todas as recomendações' });
    }
  };

  const getPlaces = async () => {
    const response = await getPlacesByOrigin(
      params?.by as Origin,
      new ListRecommendationsDAO(),
      new ListPlacesDAO(),
      { lat: '', long: '' },
    );

    setPlaces(response);
  };

  useLayoutEffect(() => {
    setTitle();
  }, []);

  useEffect(() => {
    getPlaces();
  }, []);

  const viewModel = usePlaceList({
    navigate: new Actions(navigator).navigate,
    places,
  });
  return <PlaceList {...viewModel} />;
};

export default PlaceListFactory;