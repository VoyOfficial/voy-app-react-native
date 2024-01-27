import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Origin } from '../../../src/presentation/placeList/usePlaceList';
import CardList from '../../../src/presentation/components/cardList';
import { Home } from '../../../src/presentation/home';
import { ListRecommendation } from '../../../src/presentation/recommendation/components';
import placeListFactory from '../helpers/placeListFactory';
import { recommendationModelFake } from './useHome.spec';

describe('Presentation: Home', () => {
  test('should show ListRecommendation component with correct props', () => {
    const {
      sut: { UNSAFE_getByType },
      onSeeAll,
      recommendations,
      showMoreDetails,
    } = makeSut();

    const listRecommendation = UNSAFE_getByType(ListRecommendation);

    expect(listRecommendation.props).toEqual({
      recommendations,
      onSeeAll,
      showMoreDetails,
      seeAllBy: Origin.Recommendations,
      handleSaveLocation: expect.anything(),
    });
  });

  test('should show CardList component with correct props', () => {
    const {
      sut: { UNSAFE_getByType },
      placeList,
      favorite,
      onSeeAll,
      showMoreDetails,
    } = makeSut();

    const cardList = UNSAFE_getByType(CardList);

    expect(cardList.props).toEqual({
      placeList,
      seeAll: onSeeAll,
      favorite,
      title: 'Descobrir',
      showMoreDetails,
      showSeeAllButton: true,
      seeAllBy: Origin.Places,
    });
  });

  test('should show search button with success', () => {
    const {
      sut: { getByTestId },
    } = makeSut();

    const searchButton = getByTestId('search_button_id');
    const search = getByTestId('search_id');

    expect(search).toBeTruthy();
    expect(searchButton).toBeTruthy();
  });

  test('should call search function when press search button', () => {
    const {
      sut: { getByTestId },
      search,
    } = makeSut();

    const searchButton = getByTestId('search_button_id');

    fireEvent.press(searchButton);

    expect(search).toHaveBeenCalledTimes(1);
  });
});

const makeSut = () => {
  const search = jest.fn();
  const onSeeAll = () => {};
  const favorite = () => {};
  const showMoreDetails = () => {};
  const placeList = placeListFactory(5);
  const recommendations = [recommendationModelFake()];
  const sut = render(
    <Home
      recommendations={recommendations}
      onSeeAll={onSeeAll}
      favorite={favorite}
      placeList={placeList}
      showMoreDetails={showMoreDetails}
      search={search}
    />,
  );

  return {
    sut,
    onSeeAll,
    favorite,
    showMoreDetails,
    search,
    placeList,
    recommendations,
  };
};
