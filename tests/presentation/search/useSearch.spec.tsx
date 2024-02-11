import { useState } from 'react';
import { renderHook, waitFor } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { SearchPlaces } from '~/domain/useCases';
import { SearchPlaceModel } from '~/domain/models';
import { FilterParam } from '~/domain/params';
import { Filter, Ordination } from '~/domain/enums';
import { Props as ViewModel } from '../../../src/presentation/search';

class SearchPlacesFake implements SearchPlaces {
  public place = '';
  public filterParam: FilterParam | undefined;
  public nextPageToken? = '';
  async search(
    place: string,
    { type, ordination }: FilterParam,
    nextPageToken?: string | undefined,
  ): Promise<SearchPlaceModel[]> {
    this.place = place;
    this.nextPageToken = nextPageToken;
    this.filterParam = { ordination, type };

    return [];
  }
}

describe('Presentation: useSearch', () => {
  test('should update showFilterOptions to true when call filter function', async () => {
    const { result } = renderHook(() =>
      useSearch({
        searchPlaces: new SearchPlacesFake(),
        filterParam: {
          ordination: Ordination.Closer,
          type: Filter.CoffeeMakers,
        },
        nextPageToken: '',
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
          type: Filter.CoffeeMakers,
        },
        nextPageToken: '',
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
      type: Filter.Restaurants,
    };
    const { result } = renderHook(() =>
      useSearch({ searchPlaces, nextPageToken, filterParam }),
    );

    result.current.searchTo('Malbec');

    expect(searchPlaces.place).toEqual('Malbec');
    expect(searchPlaces.nextPageToken).toEqual(nextPageToken);
    expect(searchPlaces.filterParam).toEqual(filterParam);
  });
});

type Props = {
  searchPlaces: SearchPlaces;
  nextPageToken: string;
  filterParam: FilterParam;
};

const useSearch = ({
  searchPlaces,
  filterParam,
  nextPageToken,
}: Props): ViewModel => {
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const filter = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  const changeSearch = (value: string) => {
    setSearchValue(value);
  };

  const searchTo = (value: string) => {
    const { ordination, type } = filterParam;
    searchPlaces.search(value, { ordination, type }, nextPageToken);
  };

  return {
    changeSearch,
    filter,
    placeList: [],
    searchTo,
    searchValue,
    showFilterOptions,
  };
};
