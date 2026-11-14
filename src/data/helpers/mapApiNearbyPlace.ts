import {
  PlaceModel,
  RecommendationModel,
  SearchPlaceModel,
} from '~/domain/models';
import { formatBase64Image } from './formatBase64Image';

export type ApiNearbyPlace = {
  googlePlaceId?: string;
  id?: string | number;
  name?: string;
  address?: string;
  photo?: string;
  photoReference?: string;
  rating?: number | string;
  userRatingsTotal?: number | string;
  distanceFromUserLocation?: string;
  isSaved?: boolean;
};

type MappedNearbyPlace = {
  id: string;
  title: string;
  location: string;
  image: string;
  myDistanceOfLocal: string;
  rating: string;
  amountOfReviews: string;
  isSaved: boolean;
};

export const mapApiNearbyPlace = (
  apiPlace: ApiNearbyPlace,
): MappedNearbyPlace => ({
  id: String(apiPlace.googlePlaceId || apiPlace.id || ''),
  title: apiPlace.name || '',
  location: apiPlace.address || '',
  image: formatBase64Image(apiPlace.photo || apiPlace.photoReference || ''),
  myDistanceOfLocal: apiPlace.distanceFromUserLocation || '0',
  rating: String(apiPlace.rating || 0),
  amountOfReviews: String(apiPlace.userRatingsTotal || 0),
  isSaved: Boolean(apiPlace.isSaved),
});

export const mapApiNearbyPlaceToPlaceModel = (
  apiPlace: ApiNearbyPlace,
): PlaceModel => {
  const mapped = mapApiNearbyPlace(apiPlace);
  return {
    id: mapped.id,
    imageUri: mapped.image,
    title: mapped.title,
    location: mapped.location,
    myDistanceOfLocal: mapped.myDistanceOfLocal,
    amountOfReviews: mapped.amountOfReviews,
    rating: mapped.rating,
  };
};

export const mapApiNearbyPlaceToRecommendationModel = (
  apiPlace: ApiNearbyPlace,
): RecommendationModel => {
  const mapped = mapApiNearbyPlace(apiPlace);
  return {
    id: mapped.id,
    imageUrl: mapped.image,
    title: mapped.title,
    location: mapped.location,
    myDistanceOfLocal: mapped.myDistanceOfLocal,
    rating: mapped.rating,
  };
};

export const mapApiNearbyPlaceToSearchPlaceModel = (
  apiPlace: ApiNearbyPlace,
): SearchPlaceModel => {
  const mapped = mapApiNearbyPlace(apiPlace);
  return {
    id: mapped.id,
    rating: mapped.rating,
    isSaved: mapped.isSaved,
    amountOfReviews: mapped.amountOfReviews,
    imageUri: mapped.image,
    location: mapped.location,
    title: mapped.title,
    myDistanceOfLocal: mapped.myDistanceOfLocal,
  };
};
