import { Routes } from '~/main/navigation';
import { Place } from '../components/cardList';
import { GenericObject } from '../../main/types/genericObject';

export type PlaceListViewModel = {
  list: Array<Place>;
  favorite: () => void;
  showMoreDetails: (place: Place) => void;
};

type Props = {
  places: Place[];
  navigate: (routeName: string, params?: GenericObject | undefined) => void;
};

export enum Origin {
  Recommendations = 'recommendations',
  Places = 'places',
}

const usePlaceList = ({ places, navigate }: Props): PlaceListViewModel => {
  const showMoreDetails = (place: Place) => {
    navigate(Routes.PLACE_DETAILS, { place });
  };

  return { favorite: () => {}, list: places, showMoreDetails };
};

export default usePlaceList;
