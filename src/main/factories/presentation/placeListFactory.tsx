import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { Routes } from '~/main/navigation';
import { StackParams } from '../../navigation/navigation';
import { Place } from '../../../../src/presentation/components/cardList';
import PlaceList from '../../../../src/presentation/placeList';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const PlaceListFactory = ({}: Props) => {
  const viewModel = usePlaceList();
  return <PlaceList {...viewModel} />;
};

type PlaceListViewModel = {
  list: Array<Place>;
  favorite: () => void;
  showMoreDetails: (place: Place) => void;
};

const usePlaceList = (): PlaceListViewModel => {
  return { favorite: () => {}, list: [], showMoreDetails: () => {} };
};

export default PlaceListFactory;
