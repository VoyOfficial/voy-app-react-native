import React from 'react';
import { render } from '@testing-library/react-native';
import CardList from '../../../src/presentation/components/cardList';
import { Home } from '../../../src/presentation/home';
import { ListRecommendation } from '../../../src/presentation/recommendation/components';
import placeListFactory from '../helpers/placeListFactory';
import { recommendationModelFake } from './useHome.spec';

describe('Presentation: Home', () => {
  test('should show ListRecommendation component with correct props', () => {
    const onSeeAll = () => {};
    const showMoreDetails = () => {};
    const recommendations = [recommendationModelFake()];
    const { UNSAFE_getByType } = render(
      <Home
        recommendations={recommendations}
        onSeeAll={onSeeAll}
        favorite={function (): void {
          throw new Error('Function not implemented.');
        }}
        placeList={[]}
        showMoreDetails={showMoreDetails}
      />,
    );

    const listRecommendation = UNSAFE_getByType(ListRecommendation);

    expect(listRecommendation.props).toEqual({
      recommendations,
      onSeeAll,
      showMoreDetails,
    });
  });

  test('should show CardList component with correct props', () => {
    const onSeeAll = () => {};
    const favorite = () => {};
    const showMoreDetails = () => {};
    const placeList = placeListFactory(5);
    const { UNSAFE_getByType } = render(
      <Home
        recommendations={[]}
        onSeeAll={onSeeAll}
        favorite={favorite}
        placeList={placeList}
        showMoreDetails={showMoreDetails}
      />,
    );

    const cardList = UNSAFE_getByType(CardList);

    expect(cardList.props).toEqual({
      placeList,
      seeAll: onSeeAll,
      favorite,
      title: 'Descobrir',
      showMoreDetails,
    });
  });
});
