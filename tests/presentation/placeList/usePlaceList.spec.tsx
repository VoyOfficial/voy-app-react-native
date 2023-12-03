import { renderHook, waitFor } from '@testing-library/react-native';
import usePlaceList from '../../../src/presentation/placeList/usePlaceList';
import placeListFactory from '../helpers/placeListFactory';
import { recommendationModelFake } from '../home/useHome.spec';
import { RecommendationsMapper } from '../../../src/main/factories/presentation/placeListFactory';

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

  describe('RecommendationMapper', () => {
    test('should map recommendation list to place list', () => {
      const recommendations = [recommendationModelFake()];
      expect(new RecommendationsMapper(recommendations).toPlaces()).toEqual(
        recommendations.map((recommendation) => {
          return { ...recommendation, amountOfReviews: '' };
        }),
      );
    });
  });
});
