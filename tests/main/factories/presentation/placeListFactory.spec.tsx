import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { Routes } from '~/main/navigation';
import { RecommendationModel } from '~/domain/models';
import { ListRecommendations } from '~/domain/useCases';
import PlaceList from '../../../../src/presentation/placeList';
import PlaceListFactory, {
  getListByOrigin,
} from '../../../../src/main/factories/presentation/placeListFactory';
import { Origin } from '../../../../src/presentation/placeList/usePlaceList';
import { ListPlacesFake } from '../../../presentation/home/useHome.spec';
import placeListFactory from '../../../presentation/helpers/placeListFactory';

export const recommendationModelFake = (): RecommendationModel => {
  return {
    location: faker.address.secondaryAddress(),
    imageUrl: faker.image.city(),
    title: faker.name.jobTitle(),
    rating: faker.datatype
      .number({ min: 1, max: 10, precision: 0.1 })
      .toString(),
    myDistanceOfLocal: faker.datatype.number().toString(),
  };
};

class ListRecommendationsFake implements ListRecommendations {
  constructor(
    readonly recommendations: Array<RecommendationModel> = [
      recommendationModelFake(),
    ],
  ) {}
  async list(): Promise<RecommendationModel[]> {
    return this.recommendations;
  }
}

describe('Main: PlaceListFactory', () => {
  test('should factory the PlaceList with success', async () => {
    const { UNSAFE_getByType } = render(
      <PlaceListFactory
        route={{ name: Routes.HOME, key: '', params: undefined }}
        navigation={undefined}
      />,
    );

    await waitFor(() => {
      expect(UNSAFE_getByType(PlaceList));
    });
  });

  describe('getListByOrigin', () => {
    test('should get the list through of ListRecommendations when origin to equal Recommendations', async () => {
      const recommendations = [recommendationModelFake()];
      const places = await getListByOrigin(
        Origin.Recommendations,
        new ListRecommendationsFake(recommendations),
        new ListPlacesFake(),
        { lat: '', long: '' },
      );
      expect(places).toEqual(
        recommendations.map((recommendation) => {
          return { ...recommendation, amountOfReviews: '' };
        }),
      );
    });

    test('should get the list through of ListPlaces when origin to equal Places', async () => {
      const recommendations = [recommendationModelFake()];
      const places = placeListFactory(5);
      const placesByOrigin = await getListByOrigin(
        Origin.Places,
        new ListRecommendationsFake(recommendations),
        new ListPlacesFake(places),
        { lat: '', long: '' },
      );
      expect(placesByOrigin).toEqual(places);
    });

    test('should get the list empty if origin is undefined', async () => {
      const recommendations = [recommendationModelFake()];
      const places = placeListFactory(5);
      const placesByOrigin = await getListByOrigin(
        undefined as unknown as Origin,
        new ListRecommendationsFake(recommendations),
        new ListPlacesFake(places),
        { lat: '', long: '' },
      );

      expect(placesByOrigin).toEqual([]);
    });
  });
});
