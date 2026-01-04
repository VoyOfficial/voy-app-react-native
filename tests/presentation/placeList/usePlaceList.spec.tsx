import { renderHook, waitFor } from '@testing-library/react-native';
import usePlaceList, {
  Origin,
} from '../../../src/presentation/placeList/usePlaceList';
import placeListFactory from '../helpers/placeListFactory';
import { ListPlacesSpy } from '../helpers/listPlacesSpy';
import { ListRecommendationsSpy } from '../helpers/listRecommendationsSpy';
import { LocationServiceSpy } from '../helpers/locationServiceSpy';
import { recommendationModelFactory } from '../helpers/recommendationModelFactory';

describe('Presentation: usePlaceList', () => {
  test('should get the list through of ListPlaces when origin is Places', async () => {
    const places = placeListFactory(5);
    const listPlaces = new ListPlacesSpy(places);
    const {
      sut: { result },
    } = makeSut({ listPlaces, origin: Origin.Places });

    await waitFor(() => {
      expect(result.current.list).toEqual(places);
    });
  });

  test('should get the list through of ListRecommendations when origin is Recommendations', async () => {
    const recommendations = [recommendationModelFactory()];
    const listRecommendations = new ListRecommendationsSpy(recommendations);
    const {
      sut: { result },
    } = makeSut({ listRecommendations, origin: Origin.Recommendations });

    await waitFor(() => {
      expect(result.current.list).toHaveLength(1);
      expect(result.current.list[0].id).toEqual(recommendations[0].id);
      expect(result.current.list[0].imageUri).toEqual(
        recommendations[0].imageUrl,
      );
      expect(result.current.list[0].amountOfReviews).toEqual('0');
    });
  });

  test('should call locationService.getCurrentPosition when initialize', async () => {
    const locationService = new LocationServiceSpy();
    const { listPlacesSpy } = makeSut({ locationService });

    await waitFor(() => {
      expect(locationService.getCurrentPositionCalled).toBe(1);
      expect(listPlacesSpy.listCalled).toBe(1);
    });
  });

  test('should handle location error gracefully', async () => {
    const locationService = new LocationServiceSpy();
    locationService.throwError();
    const {
      sut: { result },
      listPlacesSpy,
    } = makeSut({ locationService });

    await waitFor(() => {
      expect(listPlacesSpy.listCalled).toBe(1);
      expect(result.current.list).toEqual(listPlacesSpy.places);
    });
  });

  test('should return empty array when ListPlaces throws error', async () => {
    const listPlaces = new ListPlacesSpy([]);
    listPlaces.list = jest.fn().mockRejectedValue(new Error('API error'));
    const {
      sut: { result },
    } = makeSut({ listPlaces });

    await waitFor(() => {
      expect(result.current.list).toEqual([]);
    });
  });

  test('should call navigate function correctly when call showMoreDetails function', async () => {
    const {
      sut: { result },
      navigateSpy,
      listPlacesSpy,
    } = makeSut({});

    await waitFor(() => {
      expect(result.current.list).toEqual(listPlacesSpy.places);
    });

    result.current.showMoreDetails(listPlacesSpy.places[0]);

    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith('PlaceDetails', {
      place: listPlacesSpy.places[0],
    });
  });
});

type MakeSutParams = {
  listPlaces?: ListPlacesSpy;
  listRecommendations?: ListRecommendationsSpy;
  locationService?: LocationServiceSpy;
  origin?: Origin;
};

const makeSut = ({
  listPlaces,
  listRecommendations,
  locationService,
  origin = Origin.Places,
}: MakeSutParams = {}) => {
  const navigateSpy = jest.fn();
  const listPlacesSpy = listPlaces || new ListPlacesSpy(placeListFactory(5));
  const listRecommendationsSpy =
    listRecommendations || new ListRecommendationsSpy();
  const locationServiceSpy = locationService || new LocationServiceSpy();

  const sut = renderHook(() =>
    usePlaceList({
      navigate: navigateSpy,
      origin,
      listPlaces: listPlacesSpy,
      listRecommendations: listRecommendationsSpy,
      locationService: locationServiceSpy,
    }),
  );

  return {
    sut,
    navigateSpy,
    listPlacesSpy,
    listRecommendationsSpy,
    locationServiceSpy,
  };
};
