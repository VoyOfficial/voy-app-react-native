/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { Routes } from '~/main/navigation';
import { Filter, Ordination } from '~/domain/enums';
import { SearchPlaces } from '~/domain/useCases';
import { SearchPlaceModel } from '~/domain/models';
import { FilterParam } from '~/domain/params';
import { StackParams } from '../../../../src/main/navigation/navigation';
import { Search, useSearch } from '../../../../src/presentation/search';

class SearchPlacesFake implements SearchPlaces {
  async search(
    place: string,
    { types, ordination }: FilterParam,
    nextPageToken?: string | undefined,
  ): Promise<SearchPlaceModel[]> {
    return [];
  }
}

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const SearchFactory = ({}: Props) => {
  const viewModel = useSearch({
    filterParam: {
      ordination: Ordination.Closer,
      types: [Filter.Entertainment],
    },
    nextPageToken: '',
    searchPlaces: new SearchPlacesFake(),
  });
  return <Search {...viewModel} />;
};

export default SearchFactory;
