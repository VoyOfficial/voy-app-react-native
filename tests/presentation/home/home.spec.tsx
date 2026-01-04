import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { RecommendationModel } from '~/domain/models';
import { Origin } from '../../../src/presentation/placeList/usePlaceList';
import CardList from '../../../src/presentation/components/cardList';
import { Home } from '../../../src/presentation/home';
import { ListRecommendation } from '../../../src/presentation/recommendation/components';
import placeListFactory from '../helpers/placeListFactory';
import { renderWithTheme } from '../helpers/renderWithTheme';

describe('Presentation: Home', () => {
  test('should show ListRecommendation component with correct props', () => {
    const {
      sut: { UNSAFE_getByType },
      onSeeAll,
      recommendations,
      showMoreDetails,
    } = makeSut({});

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
    } = makeSut({});

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
    } = makeSut({});

    const searchButton = getByTestId('search_button_id');
    const search = getByTestId('search_id');

    expect(search).toBeTruthy();
    expect(searchButton).toBeTruthy();
  });

  test('should call search function when press search button', () => {
    const {
      sut: { getByTestId },
      search,
    } = makeSut({});

    const searchButton = getByTestId('search_button_id');

    fireEvent.press(searchButton);

    expect(search).toHaveBeenCalledTimes(1);
  });

  describe('error', () => {
    test('should only show message error when error is true', () => {
      const {
        sut: { getByText, queryByTestId },
      } = makeSut({ error: true });

      const title = getByText('Aaaah não');
      const description = getByText('Parece que tivemos um imprevito.');

      expect(title).toBeTruthy();
      expect(description).toBeTruthy();

      expect(queryByTestId('recommendation-list')).not.toBeTruthy();
      expect(queryByTestId('place_list_id')).not.toBeTruthy();
    });

    test('should not show message error when error is false', () => {
      const {
        sut: { queryByText, queryByTestId },
      } = makeSut({ error: false });

      const title = queryByText('Aaaah não');
      const description = queryByText('Parece que tivemos um imprevito.');

      expect(title).not.toBeTruthy();
      expect(description).not.toBeTruthy();

      expect(queryByTestId('recommendation-list')).toBeTruthy();
      expect(queryByTestId('place_list_id')).toBeTruthy();
    });

    test('should call the tryAgain function when pressing the "Tente novamente"', () => {
      const tryGetListAgain = jest.fn();
      const {
        sut: { getByTestId },
      } = makeSut({ error: true, tryGetListAgain });

      fireEvent.press(getByTestId('button_try_again_id'));

      expect(tryGetListAgain).toHaveBeenCalledTimes(1);
    });
  });

  describe('loading', () => {
    test('should only show the loading animation when finding is true', () => {
      const {
        sut: { getByTestId, queryByTestId },
      } = makeSut({ finding: true });

      expect(getByTestId('loading_animation_id')).toBeTruthy();

      expect(queryByTestId('recommendation-list')).not.toBeTruthy();
      expect(queryByTestId('place_list_id')).not.toBeTruthy();
    });

    test('should not show the loading animation when finding is false', () => {
      const {
        sut: { queryByTestId, getByTestId },
      } = makeSut({ finding: false });

      expect(queryByTestId('loading_animation_id')).not.toBeTruthy();

      expect(getByTestId('recommendation-list')).toBeTruthy();
      expect(getByTestId('place_list_id')).toBeTruthy();
    });
  });
});

type SutProps = {
  error?: boolean;
  finding?: boolean;
  tryGetListAgain?: () => Promise<void>;
};

const makeSut = ({
  error = false,
  finding = false,
  tryGetListAgain = async () => {},
}: SutProps) => {
  const search = jest.fn();
  const onSeeAll = () => {};
  const favorite = () => {};
  const showMoreDetails = () => {};
  const placeList = placeListFactory(5);
  const recommendations = [recommendationModelFake()];
  const sut = renderWithTheme(
    <Home
      recommendations={recommendations}
      onSeeAll={onSeeAll}
      favorite={favorite}
      placeList={placeList}
      showMoreDetails={showMoreDetails}
      search={search}
      error={error}
      tryGetListAgain={tryGetListAgain}
      finding={finding}
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

const recommendationModelFake = (): RecommendationModel => {
  return {
    location: faker.address.secondaryAddress(),
    imageUrl: faker.image.city(),
    title: faker.name.jobTitle(),
    rating: faker.datatype
      .number({ min: 1, max: 10, precision: 0.1 })
      .toString(),
    myDistanceOfLocal: faker.datatype.number().toString(),
    id: faker.datatype.number(),
  };
};
