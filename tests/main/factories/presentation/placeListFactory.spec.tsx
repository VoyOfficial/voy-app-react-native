import React from 'react';
import { Place } from 'src/presentation/components/cardList';
import { render } from '@testing-library/react-native';
import PlaceList from '../../../../src/presentation/placeList';

describe('Main: PlaceListFactory', () => {
  test('should factory the PlaceList with success', () => {
    const { UNSAFE_getByType } = render(<PlaceListFactory />);
    expect(UNSAFE_getByType(PlaceList));
  });
});

const PlaceListFactory = () => {
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
