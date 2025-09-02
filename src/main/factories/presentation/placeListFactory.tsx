import React, { useEffect, useLayoutEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { Actions, Routes, navigator } from '~/main/navigation';
import { AxiosAdapter } from '~/infra/http';
import { RemoteListPlaces, RemoteListRecommendations } from '~/data/useCases';
import { FirebaseAnalyticsAdapter } from '~/infra/analytics';
import { Place } from '../../../presentation/components/cardList';
import { StackParams } from '../../navigation/navigation';
import PlaceList from '../../../../src/presentation/placeList';
import usePlaceList, {
  Origin,
} from '../../../../src/presentation/placeList/usePlaceList';
import getPlacesByOrigin from './helpers/getPlacesByOrigin';

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
      new RemoteListRecommendations(
        'http://localhost:3000/recommendations',
        new AxiosAdapter(),
        new FirebaseAnalyticsAdapter(),
      ),
      new RemoteListPlaces(
        'http://localhost:3000/places',
        new AxiosAdapter(),
        new FirebaseAnalyticsAdapter(),
      ),
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
