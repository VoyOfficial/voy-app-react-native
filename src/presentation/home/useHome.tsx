import { useEffect, useState } from 'react';
import { ListPlaces, ListRecommendations } from '~/domain/useCases';
import { RecommendationProps } from '../recommendation/components/listRecommendation';
import { Place } from '../components/cardList';

export type HomeViewModel = {
  onSeeAll: () => void;
  favorite: () => void;
  placeList: Array<Place>;
  recommendations: Array<RecommendationProps>;
};

type GenericObject = { [key: string]: any };

type Props = {
  navigate: (routeName: string, params?: GenericObject | undefined) => void;
  listRecommendations: ListRecommendations;
  listPlaces: ListPlaces;
};

const useHome = ({
  navigate,
  listRecommendations,
  listPlaces,
}: Props): HomeViewModel => {
  const [recommendations, setRecommendations] = useState<
    Array<RecommendationProps>
  >([]);
  const [placeList, setPlaceList] = useState<Array<Place>>([]);

  useEffect(() => {
    getRecommendations();
    getPlaces();
  }, []);

  const onSeeAll = () => {
    navigate('PlaceDetails');
  };

  const favorite = () => {
    navigate('');
  };

  const getRecommendations = async () => {
    const response = await listRecommendations.list();
    setRecommendations(response);
  };

  const getPlaces = async () => {
    const response = await listPlaces.list(
      { lat: '0', long: '0' },
      'nextPageToken',
    );
    setPlaceList(response);
  };

  return { onSeeAll, recommendations, favorite, placeList };
};

export default useHome;
