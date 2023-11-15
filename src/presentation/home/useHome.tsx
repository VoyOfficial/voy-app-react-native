import { useEffect, useState } from 'react';
import { ListRecommendations } from '~/domain/useCases';
import { RecommendationProps } from '../recommendation/components/listRecommendation';

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

export default useHome;
