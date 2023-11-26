import React from 'react';
import { render } from '@testing-library/react-native';
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
      seeAllBy,
    } = makeSut();

    const listRecommendation = UNSAFE_getByType(ListRecommendation);

    expect(listRecommendation.props).toEqual({
      recommendations,
      onSeeAll,
      showMoreDetails,
      seeAllBy,
    });
  });

  test('should show CardList component with correct props', () => {
    const {
      sut: { UNSAFE_getByType },
      placeList,
      favorite,
      onSeeAll,
      showMoreDetails,
      seeAllBy,
    } = makeSut();

    const cardList = UNSAFE_getByType(CardList);

    expect(cardList.props).toEqual({
      placeList,
      seeAll: onSeeAll,
      favorite,
      title: 'Descobrir',
      showMoreDetails,
      showSeeAllButton: true,
      seeAllBy,
    });
  });
});

const makeSut = () => {
  const onSeeAll = () => {};
  const favorite = () => {};
  const showMoreDetails = () => {};
  const seeAllBy = 'Discover';
  const placeList = placeListFactory(5);
  const recommendations = [recommendationModelFake()];
  const sut = render(
    <Home
      recommendations={recommendations}
      onSeeAll={onSeeAll}
      favorite={favorite}
      placeList={placeList}
      showMoreDetails={showMoreDetails}
      seeAllBy={seeAllBy}
    />,
  );

  return {
    sut,
    onSeeAll,
    favorite,
    showMoreDetails,
    placeList,
    recommendations,
    seeAllBy,
  };
};
