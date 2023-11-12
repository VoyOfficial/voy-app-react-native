import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import placeListFactory from '../../../helpers/placeListFactory';
import { ListRecommendation } from '../../../../../src/presentation/recommendation/components';
placeListFactory;
describe('Components: ListRecommendation', () => {
  test('should render list of recommendations', () => {
    const { sut } = makeSut({});

    expect(sut.getByText(/Recomendações/i)).toBeTruthy();
    expect(sut.getAllByTestId('title_id')[0]).toBeTruthy();
  });

  test('should list the correct quantity of items', () => {
    const { sut, recommendations } = makeSut({});

    const lengthList = recommendations.length;

    const list = sut.getByTestId('recommendation-list');

    expect(list.props.data.length).toBe(lengthList);
  });

  test('should call see all recommendations function', async () => {
    const handleSeeAll = jest.fn();
    const { sut } = makeSut({
      onSeeAll: handleSeeAll,
    });

    const seeAllBtn = sut.getByTestId('onpress-see-all');

    waitFor(() => fireEvent.press(seeAllBtn));

    expect(handleSeeAll).toBeCalled();
  });

  const makeSut = ({ onSeeAll = jest.fn() }) => {
    const recommendations = placeListFactory(3);

    const sut = render(
      <ListRecommendation
        onSeeAll={onSeeAll}
        recommendations={recommendations}
      />,
    );

    return { sut, recommendations };
  };
});
