import { useState } from 'react';
import { LocationService } from '~/domain/protocols';
import { SearchPlaces } from '~/domain/useCases';
import { Routes } from '~/main/navigation';
import { GenericObject } from '../../main/types/genericObject';
import { Place } from '../components/cardList';
import FilterModel from './model/Filter';
import { SearchViewModel } from './search';

type Props = {
  searchPlaces: SearchPlaces;
  locationService: LocationService;
  nextPageToken: string;
  filterModel: FilterModel;
  goBack: () => void;
  navigate: (routeName: string, params?: GenericObject | undefined) => void;
};

const useSearch = ({
  searchPlaces,
  locationService,
  filterModel,
  goBack,
  nextPageToken,
  navigate,
}: Props): SearchViewModel => {
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [placeList, setPlaceList] = useState<Array<Place>>([]);

  const filter = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  const changeSearch = (value: string) => {
    setSearchValue(value);
  };

  const searchTo = async (value: string) => {
    const { ordination, types } = filterModel.toFilterParam();
    try {
      const coordinates = await locationService.getCurrentPosition();
      const result = await searchPlaces.search(
        value,
        { ordination, types },
        {
          lat: coordinates.latitude.toString(),
          long: coordinates.longitude.toString(),
        },
        nextPageToken,
      );

      const auxPlaceList: Array<Place> = [];
      result.forEach((place) => {
        auxPlaceList.push({
          amountOfReviews: place.amountOfReviews,
          imageUri: place.imageUri,
          location: place.location,
          myDistanceOfLocal: place.myDistanceOfLocal,
          rating: place.rating,
          title: place.title,
          id: place.id,
        });
      });

      setPlaceList(auxPlaceList);
    } catch {
      setPlaceList([]);
    }
  };

  const showMoreDetails = (place: Place) => {
    navigate(Routes.PLACE_DETAILS, { place });
  };

  const back = () => {
    goBack();
  };

  return {
    changeSearch,
    filter,
    goBack: back,
    placeList,
    searchTo,
    searchValue,
    showFilterOptions,
    showMoreDetails,
  };
};

export default useSearch;
