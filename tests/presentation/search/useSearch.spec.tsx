import { renderHook, waitFor } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { SearchPlaces } from '~/domain/useCases';
import { SearchPlaceModel } from '~/domain/models';
import { FilterParam, Location } from '~/domain/params';
import { Filter, Ordination } from '~/domain/enums';
import { Coordinates, LocationService } from '~/domain/protocols';
import { Place } from '../../../src/presentation/components/cardList';
import placeListFactory from '../helpers/placeListFactory';
import FilterModel from '../../../src/presentation/search/model/Filter';
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

const makeProps = (
  overrides: Partial<{
    searchPlaces: SearchPlaces;
    locationService: LocationService;
    nextPageToken: string;
    filterModel: FilterModel;
    goBack: () => void;
    navigate: (routeName: string, params?: unknown) => void;
  }> = {},
) => ({
  searchPlaces: new SearchPlacesFake(),
  locationService: new LocationServiceFake(defaultCoords),
  nextPageToken: '',
  filterModel: new FilterModel(),
  goBack: () => {},
  navigate: () => {},
  ...overrides,
});

const filterFrom = (filterParam: FilterParam) => {
  const filterModel = new FilterModel();
  const selectedOrder = filterModel.options.orderBy.list.find(
    (item) => item.label === filterParam.ordination,
  );

  if (selectedOrder) {
    filterModel.selectOrder(selectedOrder, filterModel.options);
  }

  filterParam.types.forEach((type) => {
    const option = filterModel.options.filterBy.list.find(
      (item) => item.label === type,
    );

    if (option) {
      filterModel.selectFilter(option, filterModel.options);
    }
  });

  return filterModel;
};

describe('Presentation: useSearch', () => {
  test('should update showFilterOptions to true when call filter function', async () => {
    const { result } = renderHook(() => useSearch(makeProps()));

    expect(result.current.showFilterOptions).toEqual(false);

    result.current.filter();

    await waitFor(() => {
      expect(result.current.showFilterOptions).toEqual(true);
    });
  });

  test('should update the searchValue correctly when call changeSearch function', async () => {
    const { result } = renderHook(() => useSearch(makeProps()));

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
      useSearch(
        makeProps({
          searchPlaces,
          locationService,
          nextPageToken,
          filterModel: filterFrom(filterParam),
        }),
      ),
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
      useSearch(
        makeProps({
          searchPlaces,
          nextPageToken,
          filterModel: filterFrom(filterParam),
        }),
      ),
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
      useSearch(
        makeProps({
          searchPlaces,
          locationService: new FailingLocation(),
        }),
      ),
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
      useSearch(
        makeProps({
          searchPlaces,
          nextPageToken,
          filterModel: filterFrom(filterParam),
          navigate: navigateSpy,
        }),
      ),
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

  test('should call the injected goBack function', () => {
    const goBack = jest.fn();
    const { result } = renderHook(() => useSearch(makeProps({ goBack })));

    result.current.goBack();

    expect(goBack).toHaveBeenCalledTimes(1);
  });

  test('should send MostRated and an empty types list on the first search', async () => {
    const searchPlaces = new SearchPlacesFake();
    const { result } = renderHook(() =>
      useSearch(makeProps({ searchPlaces, filterModel: new FilterModel() })),
    );

    await result.current.searchTo('Malbec');

    expect(searchPlaces.filterParam).toEqual({
      ordination: Ordination.MostRated,
      types: [],
    });
  });

  test('should send the selected ordination and types on the next submit', async () => {
    const searchPlaces = new SearchPlacesFake();
    const filterModel = new FilterModel();
    const { result } = renderHook(() =>
      useSearch(makeProps({ searchPlaces, filterModel })),
    );

    const optionByLabel = <T extends { label: string }>(
      list: T[],
      label: string,
    ) => {
      const option = list.find((item) => item.label === label);

      if (!option) {
        throw new Error(`missing option ${label}`);
      }

      return option;
    };

    filterModel.selectOrder(
      optionByLabel(filterModel.options.orderBy.list, Ordination.MostCommented),
      filterModel.options,
    );
    filterModel.selectFilter(
      optionByLabel(filterModel.options.filterBy.list, Filter.Hotels),
      filterModel.options,
    );
    filterModel.selectFilter(
      optionByLabel(filterModel.options.filterBy.list, Filter.NightLife),
      filterModel.options,
    );

    expect(searchPlaces.filterParam).toBeUndefined();

    await result.current.searchTo('Malbec');

    expect(searchPlaces.filterParam).toEqual({
      ordination: Ordination.MostCommented,
      types: [Filter.Hotels, Filter.NightLife],
    });
  });

  test('should not call searchPlaces.search when changeSearch receives 1, 2 or 3 characters', async () => {
    const searchPlaces = new SearchPlacesFake();
    const { result } = renderHook(() => useSearch(makeProps({ searchPlaces })));

    result.current.changeSearch('a');
    result.current.changeSearch('ab');
    result.current.changeSearch('abc');

    await waitFor(() => {
      expect(result.current.searchValue).toEqual('abc');
    });

    expect(searchPlaces.place).toEqual('');
    expect(searchPlaces.filterParam).toBeUndefined();
  });
});
