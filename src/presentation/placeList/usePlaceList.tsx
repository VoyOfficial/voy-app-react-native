import { useEffect, useState } from 'react';
import { ListPlaces, ListRecommendations } from '~/domain/useCases';
import { Routes } from '~/main/navigation';
import { Place } from '../components/cardList';
import { RecommendationProps } from '../recommendation/components/listRecommendation';
import { GenericObject } from '../../main/types/genericObject';

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

export type PlaceListViewModel = {
  list: Array<Place>;
  favorite: () => void;
  showMoreDetails: (place: Place) => void;
};

type Props = {
  by: Origin;
  listRecommendations: ListRecommendations;
  listPlaces: ListPlaces;
  location?: { lat: string; long: string };
  navigate: (routeName: string, params?: GenericObject | undefined) => void;
};

export enum Origin {
  Recommendations = 'recommendations',
  Places = 'places',
}

const usePlaceList = ({
  by,
  listRecommendations,
  listPlaces,
  location,
  navigate,
}: Props): PlaceListViewModel => {
  const [list, setList] = useState<Array<Place>>([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    if (by === Origin.Recommendations) {
      const response = await listRecommendations.list();
      const places = new RecommendationsMapper(response).toPlaces();
      setList(places);
    }

    if (by === Origin.Places) {
      if (location) {
        const response = await listPlaces.list(location);
        setList(response);
      }
    }
  };

  const showMoreDetails = (place: Place) => {
    navigate(Routes.PLACE_DETAILS, { place });
  };

  return { favorite: () => {}, list, showMoreDetails };
};

export default usePlaceList;
