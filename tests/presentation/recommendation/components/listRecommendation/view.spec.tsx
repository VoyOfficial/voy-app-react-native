import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import placeListFactory from '../../../helpers/placeListFactory';
import { ListRecommendation } from '../../../../../src/presentation/recommendation/components';

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

  test('should call showMoreDetails function when press the ListCard specific component', async () => {
    const { sut, showMoreDetailsSpy } = makeSut({
      onSeeAll: () => {},
    });

    const component = sut.getByTestId('list_card_1_id');

    fireEvent.press(component);

    expect(showMoreDetailsSpy).toHaveBeenCalledTimes(1);
  });

  const makeSut = ({ onSeeAll = () => {} }) => {
    const recommendations = placeListFactory(3);
    const showMoreDetails = jest.fn();

    const sut = render(
      <ListRecommendation
        onSeeAll={onSeeAll}
        recommendations={recommendations}
        showMoreDetails={showMoreDetails}
      />,
    );

    return { sut, recommendations, showMoreDetailsSpy: showMoreDetails };
  };
});
