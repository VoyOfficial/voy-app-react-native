/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { apiEndpoints } from '~/core';
import { Actions, Routes, navigator } from '~/main/navigation';
import { AxiosAdapter } from '~/infra/http';
import { GeolocationAdapter } from '~/infra/location';
import { RemoteSearchPlaces } from '~/data/useCases';
import { FirebaseAnalyticsAdapter } from '~/infra/analytics';
import { StackParams } from '../../../../src/main/navigation/navigation';
import stores from '../../stores';
import { Search, useSearch } from '../../../../src/presentation/search';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const SearchFactory = ({}: Props) => {
  const actions = new Actions(navigator);
  const viewModel = useSearch({
    filterModel: stores.filter,
    nextPageToken: '',
    searchPlaces: new RemoteSearchPlaces(
      apiEndpoints.search(),
      new AxiosAdapter(),
      new FirebaseAnalyticsAdapter(),
    ),
    locationService: new GeolocationAdapter(),
    navigate: actions.navigate,
    goBack: actions.goBack,
  });
  return <Search {...viewModel} />;
};

export default SearchFactory;
