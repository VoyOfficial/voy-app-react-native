import { useEffect, useState } from 'react';
import { ListPlaces, ListRecommendations } from '~/domain/useCases';
import { Place } from '../components/cardList';
import { RecommendationProps } from '../recommendation/components/listRecommendation';

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

  return { favorite: () => {}, list, showMoreDetails: () => {} };
};

export default usePlaceList;
