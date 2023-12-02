import { renderHook, waitFor } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { ListRecommendations } from '~/domain/useCases';
import { RecommendationModel } from '~/domain/models';
import usePlaceList, {
  RecommendationsMapper,
} from '../../../src/presentation/placeList/usePlaceList';

export const recommendationModelFake = (): RecommendationModel => {
  return {
    location: faker.address.secondaryAddress(),
    imageUrl: faker.image.city(),
    title: faker.name.jobTitle(),
    rating: faker.datatype
      .number({ min: 1, max: 10, precision: 0.1 })
      .toString(),
    myDistanceOfLocal: faker.datatype.number().toString(),
  };
};

class ListRecommendationsFake implements ListRecommendations {
  constructor(
    readonly recommendations: Array<RecommendationModel> = [
      recommendationModelFake(),
    ],
  ) {}
  async list(): Promise<RecommendationModel[]> {
    return this.recommendations;
  }
}

describe('Presentation: usePlaceList', () => {
  test('should get the list through of ListRecommendations when initialize', async () => {
    const recommendations = [recommendationModelFake()];
    const by = 'Recommendations';
    const { result } = renderHook(() =>
      usePlaceList({
        by,
        listRecommendations: new ListRecommendationsFake(recommendations),
      }),
    );

    await waitFor(() => {
      expect(result.current.list).toEqual(
        recommendations.map((recommendation) => {
          return { ...recommendation, amountOfReviews: '' };
        }),
      );
    });
  });

  describe('RecommendationMapper', () => {
    test('should map recommendation list to place list', () => {
      const recommendations = [recommendationModelFake()];
      expect(new RecommendationsMapper(recommendations).toPlaces()).toEqual(
        recommendations.map((recommendation) => {
          return { ...recommendation, amountOfReviews: '' };
        }),
      );
    });
  });
});
