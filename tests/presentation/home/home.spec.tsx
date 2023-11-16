import React from 'react';
import { render } from '@testing-library/react-native';
import { Home } from '../../../src/presentation/home';
import { ListRecommendation } from '../../../src/presentation/recommendation/components';
import { recommendationModelFake } from './useHome.spec';

describe('Presentation: Home', () => {
  test('should show ListRecommendation component with correct props', () => {
    const onSeeAll = () => {};
    const recommendations = [recommendationModelFake()];
    const { UNSAFE_getByType } = render(
      <Home recommendations={recommendations} onSeeAll={onSeeAll} />,
    );

    const listRecommendation = UNSAFE_getByType(ListRecommendation);

    expect(listRecommendation.props).toEqual({ recommendations, onSeeAll });
  });
});
