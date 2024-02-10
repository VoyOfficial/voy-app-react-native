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
});

const useSearch = (): Props => {
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const filter = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  return {
    changeSearch: () => {},
    filter,
    placeList: [],
    searchTo: () => {},
    searchValue: '',
    showFilterOptions,
  };
};
