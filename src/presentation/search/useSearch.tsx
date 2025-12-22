import { useState } from 'react';
import { FilterParam } from '~/domain/params';
import { SearchPlaces } from '~/domain/useCases';
import { Routes } from '~/main/navigation';
import { GenericObject } from '../../main/types/genericObject';
import { Place } from '../components/cardList';
import { SearchViewModel } from './search';

type Props = {
  searchPlaces: SearchPlaces;
  nextPageToken: string;
  filterParam: FilterParam;
  navigate: (routeName: string, params?: GenericObject | undefined) => void;
};

const useSearch = ({
  searchPlaces,
  filterParam,
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
    const { ordination, types } = filterParam;
    const result = await searchPlaces.search(
      value,
      { ordination, types },
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
  };

  const showMoreDetails = (place: Place) => {
    navigate(Routes.PLACE_DETAILS, { place });
  };

  return {
    changeSearch,
    filter,
    placeList,
    searchTo,
    searchValue,
    showFilterOptions,
    showMoreDetails,
  };
};

export default useSearch;
