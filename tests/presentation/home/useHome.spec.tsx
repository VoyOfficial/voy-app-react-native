import { renderHook, waitFor } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { ListRecommendations } from '~/domain/useCases';
import { RecommendationModel } from '~/domain/models';
import useHome from '../../../src/presentation/home/useHome';

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

describe('Presentation: useHome', () => {
  test('should call navigate function correctly when call onSeeAll function', async () => {
    const navigate = jest.fn();
    const { result } = renderHook(() =>
      useHome({ navigate, listRecommendations: new ListRecommendationsFake() }),
    );

    await waitFor(() => {
      expect(result.current.recommendations).not.toEqual([]);
    });

    result.current.onSeeAll();

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('PlaceDetails');
  });

  test('should get the recommendations through of ListRecommendations when initialize', async () => {
    const navigate = jest.fn();
    const recommendationsFake = [recommendationModelFake()];
    const listRecommendations = new ListRecommendationsFake(
      recommendationsFake,
    );
    const { result } = renderHook(() =>
      useHome({ navigate, listRecommendations }),
    );

    await waitFor(() => {
      expect(result.current.recommendations).toEqual(recommendationsFake);
    });
  });
});
