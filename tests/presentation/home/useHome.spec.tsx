import { renderHook, waitFor } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { ListPlaces, ListRecommendations } from '~/domain/useCases';
import { PlaceModel, RecommendationModel } from '~/domain/models';
import useHome from '../../../src/presentation/home/useHome';
import placeListFactory from '../helpers/placeListFactory';

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

class ListPlacesFake implements ListPlaces {
  constructor(readonly places: Array<PlaceModel> = placeListFactory(5)) {}
  async list(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    location: { long: string; lat: string },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    nextPageToken?: string | undefined,
  ): Promise<PlaceModel[]> {
    return this.places;
  }
}

describe('Presentation: useHome', () => {
  test('should call navigate function correctly when call onSeeAll function with Discover param', async () => {
    const {
      sut: { result },
      navigateSpy,
    } = makeSut();
    await waitFor(() => {
      expect(result.current.recommendations).not.toEqual([]);
      expect(result.current.placeList).not.toEqual([]);
    });

    result.current.onSeeAll('Discover');

    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith('PlaceList', { by: 'Discover' });
  });

  test('should get the recommendations through of ListRecommendations when initialize', async () => {
    const {
      sut: { result },
      recommendationsFake,
    } = makeSut();

    await waitFor(() => {
      expect(result.current.recommendations).toEqual(recommendationsFake);
    });
  });

  test('should get the placeList through of ListPlaces when initialize', async () => {
    const {
      sut: { result },
      places,
    } = makeSut();

    await waitFor(() => {
      expect(result.current.placeList).toEqual(places);
    });
  });

  test('should call navigate function correctly when call favorite function', async () => {
    const {
      sut: { result },
      navigateSpy,
    } = makeSut();

    await waitFor(() => {
      expect(result.current.recommendations).not.toEqual([]);
      expect(result.current.placeList).not.toEqual([]);
    });

    result.current.favorite();

    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith('');
  });

  test('should call navigate function correctly when call showMoreDetails function', async () => {
    const {
      sut: { result },
      listPlacesFake,
      navigateSpy,
    } = makeSut();

    await waitFor(() => {
      expect(result.current.recommendations).not.toEqual([]);
      expect(result.current.placeList).not.toEqual([]);
    });

    result.current.showMoreDetails(listPlacesFake.places[0]);

    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith('PlaceDetails', {
      place: listPlacesFake.places[0],
    });
  });
});

const makeSut = () => {
  const navigate = jest.fn();
  const places = placeListFactory(5);
  const listPlaces = new ListPlacesFake(places);
  const recommendationsFake = [recommendationModelFake()];
  const listRecommendations = new ListRecommendationsFake(recommendationsFake);
  const sut = renderHook(() =>
    useHome({
      navigate,
      listRecommendations,
      listPlaces,
    }),
  );

  return {
    navigateSpy: navigate,
    listPlacesFake: listPlaces,
    sut,
    places,
    listRecommendationsFake: listRecommendations,
    recommendationsFake: recommendationsFake,
  };
};
