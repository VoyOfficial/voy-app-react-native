import { Place } from 'src/presentation/components/cardList';
import { renderHook, waitFor } from '@testing-library/react-native';
import { RecommendationModel } from '~/domain/models';
import useHome from '../../../src/presentation/home/useHome';
import { LocationServiceSpy } from '../helpers/locationServiceSpy';
import { ListRecommendationsSpy } from '../helpers/listRecommendationsSpy';
import { ListPlacesSpy } from '../helpers/listPlacesSpy';
import { recommendationModelFactory } from '../helpers/recommendationModelFactory';
import placeListFactory from '../helpers/placeListFactory';

jest.useFakeTimers();

describe('Presentation: useHome', () => {
  test('should call navigate function correctly when call onSeeAll function with Discover param', async () => {
    const {
      sut: { result },
      navigateSpy,
    } = makeSut({});
    await waitFor(() => {
      expect(result.current.recommendations).not.toEqual([]);
      expect(result.current.placeList).not.toEqual([]);
    });

    result.current.onSeeAll('Discover');

    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith('PlaceList', { by: 'Discover' });
  });

  test('should get the recommendations through of ListRecommendations when initialize', async () => {
    const recommendations = [recommendationModelFactory()];
    const listRecommendations = new ListRecommendationsSpy(recommendations);
    const {
      sut: { result },
    } = makeSut({ listRecommendations });

    await waitFor(() => {
      expect(result.current.recommendations).toEqual(recommendations);
    });
  });

  test('should get the placeList through of ListPlaces when initialize', async () => {
    const places = placeListFactory(5);
    const listPlaces = new ListPlacesSpy(places);
    const {
      sut: { result },
    } = makeSut({ listPlaces });

    await waitFor(() => {
      expect(result.current.placeList).toEqual(places);
    });
  });

  test('should call navigate function correctly when call favorite function', async () => {
    const {
      sut: { result },
      navigateSpy,
    } = makeSut({});

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
      ListPlacesSpy,
      navigateSpy,
    } = makeSut({});

    await waitFor(() => {
      expect(result.current.recommendations).not.toEqual([]);
      expect(result.current.placeList).not.toEqual([]);
    });

    result.current.showMoreDetails(ListPlacesSpy.places[0]);

    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith('PlaceDetails', {
      place: ListPlacesSpy.places[0],
    });
  });

  test('should call navigate function correctly when call search function', async () => {
    const {
      sut: { result },
      navigateSpy,
    } = makeSut({});

    await waitFor(() => {
      expect(result.current.recommendations).not.toEqual([]);
      expect(result.current.placeList).not.toEqual([]);
    });

    result.current.search();

    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith('Search');
  });

  describe('error', () => {
    test('should the error returning true when recommendations and place list are empty and finding is false', async () => {
      const listPlaces = new ListPlacesSpy([]);
      const listRecommendations = new ListRecommendationsSpy([]);
      listPlaces.addTimeout(1000);
      listRecommendations.addTimeout(1000);
      const {
        sut: { result },
      } = makeSut({ listPlaces, listRecommendations });

      jest.advanceTimersByTime(2200);

      await waitFor(() => {
        expect(result.current.error).toEqual(true);
      });
    });

    test('should the error returning false when recommendations and place list are empty and finding is true', async () => {
      const listPlaces = new ListPlacesSpy(placeListFactory(5));
      const listRecommendations = new ListRecommendationsSpy([
        recommendationModelFactory(),
      ]);
      listPlaces.addTimeout(1000);
      listRecommendations.addTimeout(1000);
      const {
        sut: { result },
      } = makeSut({ listPlaces, listRecommendations });

      await waitFor(() => {
        expect(result.current.finding).toEqual(true);
        expect(result.current.error).toEqual(false);
      });

      await waitFor(() => {
        expect(result.current.finding).toEqual(false);
      });
    });

    test('should call the list of recommendations and places when calling the tryGetListAgain function', async () => {
      const {
        sut: { result },
        ListPlacesSpy,
        ListRecommendationsSpy,
      } = makeSut({ places: [], recommendations: [] });

      await waitFor(() => {
        expect(result.current.finding).toEqual(false);
      });

      await waitFor(() => {
        result.current.tryGetListAgain();
      });

      await waitFor(() => {
        expect(result.current.finding).toEqual(false);
      });

      expect(ListPlacesSpy.listCalled).toBeGreaterThanOrEqual(2);
      expect(ListRecommendationsSpy.listCalled).toBeGreaterThanOrEqual(2);
    });
  });

  describe('loading', () => {
    test('should the finding returning true correctly when it is finding the list recommendation and place', async () => {
      const listPlaces = new ListPlacesSpy(placeListFactory(5));
      const listRecommendations = new ListRecommendationsSpy([
        recommendationModelFactory(),
      ]);
      listPlaces.addTimeout(1000);
      listRecommendations.addTimeout(1000);
      const {
        sut: { result },
      } = makeSut({ listPlaces, listRecommendations });

      await waitFor(() => {
        expect(result.current.finding).toEqual(true);
      });

      jest.advanceTimersByTime(2200);

      await waitFor(() => {
        expect(result.current.finding).toEqual(false);
      });
    });

    test('should set finding to true and then back to false when calling tryGetListAgain', async () => {
      const listPlaces = new ListPlacesSpy(placeListFactory(5));
      const listRecommendations = new ListRecommendationsSpy([
        recommendationModelFactory(),
      ]);

      const {
        sut: { result },
      } = makeSut({ listPlaces, listRecommendations });

      await waitFor(() => {
        expect(result.current.finding).toBe(false);
      });

      await waitFor(() => {
        result.current.tryGetListAgain();
        expect(result.current.finding).toBe(true);
      });

      await waitFor(() => {
        expect(result.current.finding).toBe(false);
      });
    });
  });

  describe('locationService', () => {
    test('should call locationService.getCurrentPosition on mount', async () => {
      const locationService = new LocationServiceSpy();
      const {
        sut: { result },
      } = makeSut({ locationService });

      await waitFor(() => {
        expect(result.current.finding).toEqual(false);
      });

      expect(locationService.getCurrentPositionCalled).toBe(1);
    });

    test('should use location coordinates to fetch places and recommendations', async () => {
      const locationService = new LocationServiceSpy();
      locationService.setCoordinates(-23.5505, -46.6333);
      const listPlaces = new ListPlacesSpy();
      const listRecommendations = new ListRecommendationsSpy();

      const {
        sut: { result },
      } = makeSut({ locationService, listPlaces, listRecommendations });

      await waitFor(() => {
        expect(result.current.finding).toEqual(false);
      });

      expect(listPlaces.listCalled).toBe(1);
      expect(listRecommendations.listCalled).toBe(1);
    });

    test('should use default coordinates when location service fails', async () => {
      const locationService = new LocationServiceSpy();
      locationService.throwError();
      const listPlaces = new ListPlacesSpy();
      const listRecommendations = new ListRecommendationsSpy();

      const {
        sut: { result },
      } = makeSut({ locationService, listPlaces, listRecommendations });

      await waitFor(() => {
        expect(result.current.finding).toEqual(false);
      });

      expect(listPlaces.listCalled).toBe(1);
      expect(listRecommendations.listCalled).toBe(1);
      expect(result.current.placeList).toHaveLength(5);
    });

    test('should wait for location before fetching data', async () => {
      const locationService = new LocationServiceSpy();
      const listPlaces = new ListPlacesSpy();
      const listRecommendations = new ListRecommendationsSpy();

      makeSut({ locationService, listPlaces, listRecommendations });

      expect(locationService.getCurrentPositionCalled).toBe(1);

      await waitFor(() => {
        expect(listPlaces.listCalled).toBeGreaterThan(0);
        expect(listRecommendations.listCalled).toBeGreaterThan(0);
      });
    });

    test('should call location service again when tryGetListAgain is called', async () => {
      const locationService = new LocationServiceSpy();
      const {
        sut: { result },
      } = makeSut({ locationService });

      await waitFor(() => {
        expect(result.current.finding).toEqual(false);
      });

      const initialCalls = locationService.getCurrentPositionCalled;

      await waitFor(() => {
        result.current.tryGetListAgain();
      });

      await waitFor(() => {
        expect(result.current.finding).toEqual(false);
      });

      expect(locationService.getCurrentPositionCalled).toBe(initialCalls);
    });
  });
});

type SutProps = {
  places?: Array<Place>;
  recommendations?: Array<RecommendationModel>;
  listPlaces?: ListPlacesSpy;
  listRecommendations?: ListRecommendationsSpy;
  locationService?: LocationServiceSpy;
};

const makeSut = ({
  listPlaces = new ListPlacesSpy(placeListFactory(5)),
  listRecommendations = new ListRecommendationsSpy([
    recommendationModelFactory(),
  ]),
  locationService = new LocationServiceSpy(),
}: SutProps) => {
  const navigate = jest.fn();
  const sut = renderHook(() =>
    useHome({
      navigate,
      listRecommendations,
      listPlaces,
      locationService,
    }),
  );

  return {
    navigateSpy: navigate,
    ListPlacesSpy: listPlaces,
    sut,
    ListRecommendationsSpy: listRecommendations,
    LocationServiceSpy: locationService,
  };
};
