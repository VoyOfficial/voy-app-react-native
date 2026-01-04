import { useCallback, useEffect, useState } from 'react';
import { ListPlaces, ListRecommendations } from '~/domain/useCases';
import { LocationService } from '~/domain/protocols';
import { RecommendationProps } from '../recommendation/components/listRecommendation';
import { Place } from '../components/cardList';

export type HomeViewModel = {
  onSeeAll: (by: string) => void;
  favorite: () => void;
  showMoreDetails: (place: Place | RecommendationProps) => void;
  search: () => void;
  placeList: Array<Place>;
  recommendations: Array<RecommendationProps>;
  error: boolean;
  tryGetListAgain: () => Promise<void>;
  finding: boolean;
};

type GenericObject = { [key: string]: any };

type Props = {
  navigate: (routeName: string, params?: GenericObject | undefined) => void;
  listRecommendations: ListRecommendations;
  listPlaces: ListPlaces;
  locationService: LocationService;
};

const useHome = ({
  navigate,
  listRecommendations,
  listPlaces,
  locationService,
}: Props): HomeViewModel => {
  const [recommendations, setRecommendations] = useState<
    Array<RecommendationProps>
  >([]);
  const [placeList, setPlaceList] = useState<Array<Place>>([]);
  const [finding, setFinding] = useState(true);
  const [locationError, setLocationError] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    lat: string;
    long: string;
  } | null>(null);

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      getLists();
    }
  }, [userLocation]);

  const getUserLocation = async () => {
    try {
      const coordinates = await locationService.getCurrentPosition();
      setUserLocation({
        lat: coordinates.latitude.toString(),
        long: coordinates.longitude.toString(),
      });
      setLocationError(false);
    } catch (error) {
      setLocationError(true);
      setUserLocation({
        lat: '',
        long: '',
      });
    }
  };

  const getLists = async () => {
    if (!userLocation) return;

    setFinding(true);
    await getRecommendations();
    await getPlaces();
    setFinding(false);
  };

  const onSeeAll = (by: string) => {
    navigate('PlaceList', { by });
  };

  const favorite = () => {
    navigate('');
  };

  const getRecommendations = async () => {
    if (!userLocation) return;

    try {
      const response = await listRecommendations.list(userLocation);
      setRecommendations(response);
    } catch (error) {
      setRecommendations([]);
    }
  };

  const getPlaces = async () => {
    if (!userLocation) return;

    try {
      const response = await listPlaces.list(userLocation);
      setPlaceList(response);
    } catch (error) {
      setPlaceList([]);
    }
  };

  const showMoreDetails = (place: Place | RecommendationProps) => {
    navigate('PlaceDetails', { place });
  };

  const search = () => {
    navigate('Search');
  };

  const getError = useCallback(() => {
    if (locationError) return true;
    if (finding) return false;

    return placeList.length === 0 && recommendations.length === 0;
  }, [locationError, finding, placeList, recommendations]);

  const tryGetListAgain = async () => {
    if (locationError) {
      await getUserLocation();
      return;
    }
    await getLists();
  };

  return {
    onSeeAll,
    recommendations,
    favorite,
    showMoreDetails,
    placeList,
    search,
    error: getError(),
    tryGetListAgain,
    finding,
  };
};

export default useHome;
