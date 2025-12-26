import React, { useLayoutEffect } from 'react';
import { RouteProp } from '@react-navigation/native';
import { Actions, Routes, navigator } from '~/main/navigation';
import { AxiosAdapter } from '~/infra/http';
import { RemoteListPlaces, RemoteListRecommendations } from '~/data/useCases';
import { FirebaseAnalyticsAdapter } from '~/infra/analytics';
import { GeolocationAdapter } from '~/infra/location';
import { StackParams } from '../../navigation/navigation';
import PlaceList from '../../../../src/presentation/placeList';
import usePlaceList, {
  Origin,
} from '../../../../src/presentation/placeList/usePlaceList';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const PlaceListFactory = ({ route: { params }, navigation }: Props) => {
  const origin =
    params && 'by' in params ? (params.by as Origin) : Origin.Places;

  useLayoutEffect(() => {
    if (origin === Origin.Places) {
      navigation.setOptions({ title: 'Descobrir' });
    }
    if (origin === Origin.Recommendations) {
      navigation.setOptions({ title: 'Todas as recomendações' });
    }
  }, [origin, navigation]);

  const viewModel = usePlaceList({
    navigate: new Actions(navigator).navigate,
    origin,
    listRecommendations: new RemoteListRecommendations(
      'http://localhost:8080/api/registration/v1/places/recommendations',
      new AxiosAdapter(),
      new FirebaseAnalyticsAdapter(),
    ),
    listPlaces: new RemoteListPlaces(
      'http://localhost:8080/api/registration/v1/places',
      new AxiosAdapter(),
      new FirebaseAnalyticsAdapter(),
    ),
    locationService: new GeolocationAdapter(),
  });
  return <PlaceList {...viewModel} />;
};

export default PlaceListFactory;
