import { ListPlaces, ListRecommendations } from '~/domain/useCases';
import { Origin } from '../../../../presentation/placeList/usePlaceList';
import { Place } from '../../../../presentation/components/cardList';
import { RecommendationProps } from '../../../../presentation/recommendation/components/listRecommendation';

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

const getPlacesByOrigin = async (
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

export default getPlacesByOrigin;
