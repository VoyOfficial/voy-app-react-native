import { useState } from 'react';
import { FilterParam } from '~/domain/params';
import { SearchPlaces } from '~/domain/useCases';
import { Place } from '../components/cardList';
import { SearchViewModel } from './search';

type Props = {
  searchPlaces: SearchPlaces;
  nextPageToken: string;
  filterParam: FilterParam;
};

const useSearch = ({
  searchPlaces,
  filterParam,
  nextPageToken,
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
    const { ordination, type } = filterParam;
    const result = await searchPlaces.search(
      value,
      { ordination, type },
      nextPageToken,
    );

    const auxPlaceList: Array<Place> = [];
    result.forEach((place) => {
      auxPlaceList.push({
        amountOfReviews: place.amountOfReviews,
        imageUrl: place.imageUrl,
        location: place.location,
        myDistanceOfLocal: place.myDistanceOfLocal,
        rating: place.rating,
        title: place.title,
      });
    });

    setPlaceList(auxPlaceList);
  };

  return {
    changeSearch,
    filter,
    placeList,
    searchTo,
    searchValue,
    showFilterOptions,
  };
};

export default useSearch;
