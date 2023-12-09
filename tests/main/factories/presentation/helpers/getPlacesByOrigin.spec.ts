import { faker } from '@faker-js/faker';
import { RecommendationModel } from '~/domain/models';
import { ListRecommendations } from '~/domain/useCases';
import getPlacesByOrigin, {
  RecommendationsMapper,
} from '../../../../../src/main/factories/presentation/helpers/getPlacesByOrigin';
import placeListFactory from '../../../../presentation/helpers/placeListFactory';
import { ListPlacesFake } from '../../../../presentation/home/useHome.spec';
import { Origin } from '../../../../../src/presentation/placeList/usePlaceList';

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

describe('getListByOrigin', () => {
  test('should get the list through of ListRecommendations when origin to equal Recommendations', async () => {
    const recommendations = [recommendationModelFake()];
    const places = await getPlacesByOrigin(
      Origin.Recommendations,
      new ListRecommendationsFake(recommendations),
      new ListPlacesFake(),
      { lat: '', long: '' },
    );
    expect(places).toEqual(
      recommendations.map((recommendation) => {
        return { ...recommendation, amountOfReviews: '' };
      }),
    );
  });

  test('should get the list through of ListPlaces when origin to equal Places', async () => {
    const recommendations = [recommendationModelFake()];
    const places = placeListFactory(5);
    const placesByOrigin = await getPlacesByOrigin(
      Origin.Places,
      new ListRecommendationsFake(recommendations),
      new ListPlacesFake(places),
      { lat: '', long: '' },
    );
    expect(placesByOrigin).toEqual(places);
  });

  test('should get the list empty if origin is undefined', async () => {
    const recommendations = [recommendationModelFake()];
    const places = placeListFactory(5);
    const placesByOrigin = await getPlacesByOrigin(
      undefined as unknown as Origin,
      new ListRecommendationsFake(recommendations),
      new ListPlacesFake(places),
      { lat: '', long: '' },
    );

    expect(placesByOrigin).toEqual([]);
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
