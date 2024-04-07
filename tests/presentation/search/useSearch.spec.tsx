import { renderHook, waitFor } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { SearchPlaces } from '~/domain/useCases';
import { SearchPlaceModel } from '~/domain/models';
import { FilterParam } from '~/domain/params';
import { Filter, Ordination } from '~/domain/enums';
import { Place } from '../../../src/presentation/components/cardList';
import placeListFactory from '../helpers/placeListFactory';
import { useSearch } from '../../../src/presentation/search';

class SearchPlacesFake implements SearchPlaces {
  public place = '';
  public filterParam: FilterParam | undefined;
  public nextPageToken? = '';
  public list: SearchPlaceModel[] = [];
  async search(
    place: string,
    { types, ordination }: FilterParam,
    nextPageToken?: string | undefined,
  ): Promise<SearchPlaceModel[]> {
    this.place = place;
    this.nextPageToken = nextPageToken;
    this.filterParam = { ordination, types };

    this.list = placeListFactory(5).map((place) => {
      return { ...place, isSaved: true };
    });

    return this.list;
  }
}

describe('Presentation: useSearch', () => {
  test('should update showFilterOptions to true when call filter function', async () => {
    const { result } = renderHook(() =>
      useSearch({
        searchPlaces: new SearchPlacesFake(),
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

  test('should call search of SearchPlaces correctly when to call searchTo function', async () => {
    const searchPlaces = new SearchPlacesFake();
    const nextPageToken = faker.datatype.uuid();
    const filterParam: FilterParam = {
      ordination: Ordination.MostCommented,
      types: [Filter.Restaurants],
    };
    const { result } = renderHook(() =>
      useSearch({
        searchPlaces,
        nextPageToken,
        filterParam,
        navigate: () => {},
      }),
    );

    result.current.searchTo('Malbec');

    expect(searchPlaces.place).toEqual('Malbec');
    expect(searchPlaces.nextPageToken).toEqual(nextPageToken);
    expect(searchPlaces.filterParam).toEqual(filterParam);
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
        imageUrl: place.imageUrl,
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
        nextPageToken,
        filterParam,
        navigate: navigateSpy,
      }),
    );

    await waitFor(() => {
      expect(result.current.placeList).toEqual(searchPlaces.list);
    });

    result.current.showMoreDetails(searchPlaces.list[0]);

    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith('PlaceDetails', {
      place: searchPlaces.list[0],
    });
  });
});
