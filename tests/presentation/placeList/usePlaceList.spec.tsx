import { renderHook, waitFor } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { ListRecommendations } from '~/domain/useCases';
import { RecommendationModel } from '~/domain/models';
import usePlaceList, {
  Origin,
  RecommendationsMapper,
} from '../../../src/presentation/placeList/usePlaceList';
import placeListFactory from '../helpers/placeListFactory';
import { ListPlacesFake } from '../home/useHome.spec';

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
    const by = Origin.Recommendations;
    const { result } = renderHook(() =>
      usePlaceList({
        by,
        listRecommendations: new ListRecommendationsFake(recommendations),
        listPlaces: new ListPlacesFake(),
        navigate: () => {},
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

  test('should get the list through of ListPlaces when initialize', async () => {
    const places = placeListFactory(5);
    const by = Origin.Places;
    const { result } = renderHook(() =>
      usePlaceList({
        by,
        listRecommendations: new ListRecommendationsFake(),
        listPlaces: new ListPlacesFake(places),
        location: { lat: 'any_lat', long: 'any_long' },
        navigate: () => {},
      }),
    );

    await waitFor(() => {
      expect(result.current.list).toEqual(places);
    });
  });

  test('should call navigate function correctly when call showMoreDetails function', async () => {
    const navigateSpy = jest.fn();
    const places = placeListFactory(5);
    const by = Origin.Places;
    const { result } = renderHook(() =>
      usePlaceList({
        by,
        listRecommendations: new ListRecommendationsFake(),
        listPlaces: new ListPlacesFake(places),
        location: { lat: 'any_lat', long: 'any_long' },
        navigate: navigateSpy,
      }),
    );

    await waitFor(() => {
      expect(result.current.list).toEqual(places);
    });

    result.current.showMoreDetails(places[0]);

    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith('PlaceDetails', {
      place: places[0],
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
