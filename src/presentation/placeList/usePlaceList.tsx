import { useEffect, useState } from 'react';
import { Routes } from '~/main/navigation';
import { ListPlaces, ListRecommendations } from '~/domain/useCases';
import { LocationService } from '~/domain/protocols';
import { Place } from '../components/cardList';
import { GenericObject } from '../../main/types/genericObject';

export type PlaceListViewModel = {
  list: Array<Place>;
  favorite: () => void;
  showMoreDetails: (place: Place) => void;
};

type Props = {
  navigate: (routeName: string, params?: GenericObject | undefined) => void;
  origin: Origin;
  listRecommendations: ListRecommendations;
  listPlaces: ListPlaces;
  locationService: LocationService;
};

export enum Origin {
  Recommendations = 'recommendations',
  Places = 'places',
}

const usePlaceList = ({
  navigate,
  origin,
  listRecommendations,
  listPlaces,
  locationService,
}: Props): PlaceListViewModel => {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    getPlaces();
  }, []);

  const getPlaces = async () => {
    const userLocation = await getUserLocation();
    const response = await getPlacesByOrigin(origin, userLocation);
    setPlaces(response);
  };

  const getUserLocation = async () => {
    try {
      const coordinates = await locationService.getCurrentPosition();
      return {
        lat: coordinates.latitude.toString(),
        long: coordinates.longitude.toString(),
      };
    } catch (error) {
      return { lat: '', long: '' };
    }
  };

  const getPlacesByOrigin = async (
    by: Origin,
    location: { lat: string; long: string },
  ): Promise<Place[]> => {
    try {
      if (by === Origin.Recommendations) {
        const recommendations = await listRecommendations.list(location);
        return recommendations.map((rec) => ({
          id: rec.id,
          imageUri: rec.imageUrl,
          title: rec.title,
          location: rec.location,
          myDistanceOfLocal: rec.myDistanceOfLocal,
          amountOfReviews: '0',
          rating: rec.rating,
        }));
      }
      const placesData = await listPlaces.list(location);
      return placesData.map((place) => ({
        id: place.id,
        imageUri: place.imageUri,
        title: place.title,
        location: place.location,
        myDistanceOfLocal: place.myDistanceOfLocal,
        amountOfReviews: place.amountOfReviews,
        rating: place.rating,
      }));
    } catch (error) {
      return [];
    }
  };

  const showMoreDetails = (place: Place) => {
    navigate(Routes.PLACE_DETAILS, { place });
  };

  return { favorite: () => {}, list: places, showMoreDetails };
};

export default usePlaceList;
