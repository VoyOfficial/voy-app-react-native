import { renderHook, waitFor } from '@testing-library/react-native';
import usePlaceList from '../../../src/presentation/placeList/usePlaceList';
import placeListFactory from '../helpers/placeListFactory';

describe('Presentation: usePlaceList', () => {
  test('should get the list through of ListPlaces when initialize', async () => {
    const places = placeListFactory(5);
    const { result } = renderHook(() =>
      usePlaceList({
        navigate: () => {},
        places,
      }),
    );

    await waitFor(() => {
      expect(result.current.list).toEqual(places);
    });
  });

  test('should call navigate function correctly when call showMoreDetails function', async () => {
    const navigateSpy = jest.fn();
    const places = placeListFactory(5);
    const { result } = renderHook(() =>
      usePlaceList({
        navigate: navigateSpy,
        places,
      }),
    );

    await waitFor(() => {
      expect(result.current.list).toEqual(places);
    });

    result.current.showMoreDetails(places[0]);

    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith('PlaceDetails', {
      place: places[0],
    });
  });
});
