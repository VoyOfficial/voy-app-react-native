/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { Actions, Routes, navigator } from '~/main/navigation';
import { Filter, Ordination } from '~/domain/enums';
import { AxiosAdapter } from '~/infra/http';
import { RemoteSearchPlaces } from '~/data/useCases';
import { FirebaseAnalyticsAdapter } from '~/infra/analytics';
import { StackParams } from '../../../../src/main/navigation/navigation';
import { Search, useSearch } from '../../../../src/presentation/search';

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
    searchPlaces: new RemoteSearchPlaces(
      'http://localhost:3000/search',
      new AxiosAdapter(),
      new FirebaseAnalyticsAdapter(),
    ),
    navigate: new Actions(navigator).navigate,
  });
  return <Search {...viewModel} />;
};

export default SearchFactory;
