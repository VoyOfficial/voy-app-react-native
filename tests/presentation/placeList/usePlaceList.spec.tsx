import { renderHook, waitFor } from '@testing-library/react-native';
import usePlaceList from '../../../src/presentation/placeList/usePlaceList';
import placeListFactory from '../helpers/placeListFactory';

describe('Presentation: usePlaceList', () => {
  test('should get the list through of ListPlaces when initialize', async () => {
    const {
      sut: { result },
      places,
    } = makeSut();

    await waitFor(() => {
      expect(result.current.list).toEqual(places);
    });
  });

  test('should call navigate function correctly when call showMoreDetails function', async () => {
    const {
      sut: { result },
      places,
      navigateSpy,
    } = makeSut();

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

const makeSut = () => {
  const navigateSpy = jest.fn();
  const places = placeListFactory(5);
  const sut = renderHook(() =>
    usePlaceList({
      navigate: navigateSpy,
      places,
    }),
  );

  return { sut, places, navigateSpy };
};
