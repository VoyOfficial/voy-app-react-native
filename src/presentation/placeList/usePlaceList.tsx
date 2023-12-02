import { useEffect, useState } from 'react';
import { ListRecommendations } from '~/domain/useCases';
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
  by: string;
  listRecommendations: ListRecommendations;
};

const usePlaceList = ({
  by,
  listRecommendations,
}: Props): PlaceListViewModel => {
  const [list, setList] = useState<Array<Place>>([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    if (by === 'Recommendations') {
      const response = await listRecommendations.list();
      const places = new RecommendationsMapper(response).toPlaces();
      setList(places);
    }
  };

  return { favorite: () => {}, list, showMoreDetails: () => {} };
};

export default usePlaceList;
