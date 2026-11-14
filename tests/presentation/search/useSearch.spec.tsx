import { renderHook, waitFor } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { SearchPlaces } from '~/domain/useCases';
import { SearchPlaceModel } from '~/domain/models';
import { FilterParam, Location } from '~/domain/params';
import { Filter, Ordination } from '~/domain/enums';
import { Coordinates, LocationService } from '~/domain/protocols';
import { Place } from '../../../src/presentation/components/cardList';
import placeListFactory from '../helpers/placeListFactory';
import { useSearch } from '../../../src/presentation/search';

class SearchPlacesFake implements SearchPlaces {
  public place = '';
  public filterParam: FilterParam | undefined;
  public location: Location | undefined;
  public nextPageToken? = '';
  public list: SearchPlaceModel[] = [];
  async search(
    place: string,
    { types, ordination }: FilterParam,
    location: Location,
    nextPageToken?: string | undefined,
  ): Promise<SearchPlaceModel[]> {
    this.place = place;
    this.nextPageToken = nextPageToken;
    this.filterParam = { ordination, types };
    this.location = location;

    this.list = placeListFactory(5).map((item) => {
      return { ...item, isSaved: true };
    });

    return this.list;
  }
}

class LocationServiceFake implements LocationService {
  public called = false;
  constructor(private readonly coordinates: Coordinates) {}
  requestPermission = async () => true;
  getCurrentPosition = async () => {
    this.called = true;
    return this.coordinates;
  };
}

const defaultCoords: Coordinates = {
  latitude: -29.385436,
  longitude: -50.877608,
};

describe('Presentation: useSearch', () => {
  test('should update showFilterOptions to true when call filter function', async () => {
    const { result } = renderHook(() =>
      useSearch({
        searchPlaces: new SearchPlacesFake(),
        locationService: new LocationServiceFake(defaultCoords),
        filterParam: {
          ordination: Ordination.Closer,
          types: [Filter.CoffeeMakers],
        },
        nextPageToken: '',
        navigate: () => {},
      }),
    );

    expect(result.current.showFilterOptions).toEqual(false);

    result.current.filter();

    await waitFor(() => {
      expect(result.current.showFilterOptions).toEqual(true);
    });
  });

  test('should update the searchValue correctly when call changeSearch function', async () => {
    const { result } = renderHook(() =>
      useSearch({
        searchPlaces: new SearchPlacesFake(),
        locationService: new LocationServiceFake(defaultCoords),
        filterParam: {
          ordination: Ordination.Closer,
          types: [Filter.CoffeeMakers],
        },
        nextPageToken: '',
        navigate: () => {},
      }),
    );

    expect(result.current.searchValue).toEqual('');

    result.current.changeSearch('Restaurante');

    await waitFor(() => {
      expect(result.current.searchValue).toEqual('Restaurante');
    });
  });

  test('should obtain location then call search of SearchPlaces when searchTo runs', async () => {
    const searchPlaces = new SearchPlacesFake();
    const locationService = new LocationServiceFake(defaultCoords);
    const nextPageToken = faker.datatype.uuid();
    const filterParam: FilterParam = {
      ordination: Ordination.MostCommented,
      types: [Filter.Restaurants],
    };
    const { result } = renderHook(() =>
      useSearch({
        searchPlaces,
        locationService,
        nextPageToken,
        filterParam,
        navigate: () => {},
      }),
    );

    await result.current.searchTo('Malbec');

    expect(locationService.called).toBe(true);
    expect(searchPlaces.place).toEqual('Malbec');
    expect(searchPlaces.nextPageToken).toEqual(nextPageToken);
    expect(searchPlaces.filterParam).toEqual(filterParam);
    expect(searchPlaces.location).toEqual({
      lat: String(defaultCoords.latitude),
      long: String(defaultCoords.longitude),
    });
  });

  test('should get the placeList through of SearchPlaces when call searchTo function', async () => {
    const searchPlaces = new SearchPlacesFake();
    const nextPageToken = faker.datatype.uuid();
    const filterParam: FilterParam = {
      ordination: Ordination.MostCommented,
      types: [Filter.Restaurants],
    };
    const { result } = renderHook(() =>
      useSearch({
        searchPlaces,
        locationService: new LocationServiceFake(defaultCoords),
        nextPageToken,
        filterParam,
        navigate: () => {},
      }),
    );

    await result.current.searchTo('Malbec');

    const list: Array<Place> = [];
    searchPlaces.list.forEach((place) => {
      list.push({
        amountOfReviews: place.amountOfReviews,
        imageUri: place.imageUri,
        location: place.location,
        myDistanceOfLocal: place.myDistanceOfLocal,
        rating: place.rating,
        title: place.title,
        id: place.id,
      });
    });

    await waitFor(() => {
      expect(result.current.placeList).toEqual(list);
    });
  });

  test('should clear placeList when locationService fails', async () => {
    class FailingLocation implements LocationService {
      requestPermission = async () => false;
      getCurrentPosition = async () => {
        throw new Error('denied');
      };
    }

    const searchPlaces = new SearchPlacesFake();
    const { result } = renderHook(() =>
      useSearch({
        searchPlaces,
        locationService: new FailingLocation(),
        nextPageToken: '',
        filterParam: {
          ordination: Ordination.Closer,
          types: [Filter.Entertainment],
        },
        navigate: () => {},
      }),
    );

    await result.current.searchTo('Malbec');

    expect(searchPlaces.place).toEqual('');
    expect(result.current.placeList).toEqual([]);
  });

  test('should call navigate function correctly when call showMoreDetails function', async () => {
    const navigateSpy = jest.fn();
    const searchPlaces = new SearchPlacesFake();
    const nextPageToken = faker.datatype.uuid();
    const filterParam: FilterParam = {
      ordination: Ordination.MostCommented,
      types: [Filter.Restaurants],
    };
    const { result } = renderHook(() =>
      useSearch({
        searchPlaces,
        locationService: new LocationServiceFake(defaultCoords),
        nextPageToken,
        filterParam,
        navigate: navigateSpy,
      }),
    );

    await result.current.searchTo('Malbec');

    await waitFor(() => {
      expect(result.current.placeList.length).toBeGreaterThan(0);
    });

    result.current.showMoreDetails(result.current.placeList[0]);

    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith('PlaceDetails', {
      place: result.current.placeList[0],
    });
  });
});
