import { useEffect, useState } from 'react';
import { renderHook, waitFor } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { ListRecommendations } from '~/domain/useCases';
import { RecommendationModel } from '~/domain/models';
import { RecommendationProps } from '../../../src/presentation/recommendation/components/listRecommendation';

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

describe('Presentation: useHome', () => {
  test('should call navigate function correctly when call onSeeAll function', async () => {
    const navigate = jest.fn();
    const { result } = renderHook(() =>
      useHome({ navigate, listRecommendations: new ListRecommendationsFake() }),
    );

    await waitFor(() => {
      expect(result.current.recommendations).not.toEqual([]);
    });

    result.current.onSeeAll();

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('PlaceDetails');
  });

  test('should get the recommendations through of ListRecommendations when initialize', async () => {
    const navigate = jest.fn();
    const recommendationsFake = [recommendationModelFake()];
    const listRecommendations = new ListRecommendationsFake(
      recommendationsFake,
    );
    const { result } = renderHook(() =>
      useHome({ navigate, listRecommendations }),
    );

    await waitFor(() => {
      expect(result.current.recommendations).toEqual(recommendationsFake);
    });
  });
});

type HomeViewModel = {
  onSeeAll: () => void;
  recommendations: Array<RecommendationProps>;
};

type GenericObject = { [key: string]: any };

type Props = {
  navigate: (routeName: string, params?: GenericObject | undefined) => void;
  listRecommendations: ListRecommendations;
};

const useHome = ({ navigate, listRecommendations }: Props): HomeViewModel => {
  const [recommendations, setRecommendations] = useState<
    Array<RecommendationProps>
  >([]);

  useEffect(() => {
    getRecommendations();
  }, []);

  const onSeeAll = () => {
    navigate('PlaceDetails');
  };

  const getRecommendations = async () => {
    const response = await listRecommendations.list();
    setRecommendations(response);
  };
  return { onSeeAll, recommendations };
};
