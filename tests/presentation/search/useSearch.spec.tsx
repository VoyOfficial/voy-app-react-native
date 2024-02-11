import { useState } from 'react';
import { renderHook, waitFor } from '@testing-library/react-native';
import { Props } from '../../../src/presentation/search';
describe('Presentation: useSearch', () => {
  test('should update showFilterOptions to true when call filter function', async () => {
    const { result } = renderHook(() => useSearch());

    expect(result.current.showFilterOptions).toEqual(false);

    result.current.filter();

    await waitFor(() => {
      expect(result.current.showFilterOptions).toEqual(true);
    });
  });

  test('should update the searchValue correctly when call changeSearch function', async () => {
    const { result } = renderHook(() => useSearch());

    expect(result.current.searchValue).toEqual('');

    result.current.changeSearch('Restaurante');

    await waitFor(() => {
      expect(result.current.searchValue).toEqual('Restaurante');
    });
  });
});

const useSearch = (): Props => {
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const filter = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  const changeSearch = (value: string) => {
    setSearchValue(value);
  };

  return {
    changeSearch,
    filter,
    placeList: [],
    searchTo: () => {},
    searchValue,
    showFilterOptions,
  };
};
