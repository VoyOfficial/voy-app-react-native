import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { GetByQuery } from '@testing-library/react-native/build/queries/makeQueries';
import {
  TextMatch,
  TextMatchOptions,
} from '@testing-library/react-native/build/matches';
import CardList from '../../../../src/presentation/components/cardList';
import placeListFactory from '../../../presentation/helpers/placeListFactory';
import { makeTitle } from '../../../presentation/helpers/testFactories';

describe('Components: CardList', () => {
  test('should show title of CardList with success', () => {
    const title = makeTitle();
    const {
      sut: { getByTestId },
    } = makeSut(title);

    expect(getByTestId('title_id').props.children).toEqual(title);
  });

  test('should show button "Ver todos" correctly', () => {
    const {
      sut: { getByTestId },
    } = makeSut();

    expect(getByTestId('see_all_id').props.children).toEqual('Ver todos');
  });

  test('should press button "Ver todos" with success', () => {
    const {
      sut: { getByTestId },
      seeAllSpy,
    } = makeSut();

    fireEvent.press(getByTestId('see_all_button_id'));

    expect(seeAllSpy).toHaveBeenCalledTimes(1);
  });

  test('should call favorite function when press the save button', () => {
    const {
      sut: { getByTestId },
      favoriteSpy,
    } = makeSut();

    fireEvent.press(getByTestId('save_button_1_id'));

    expect(favoriteSpy).toHaveBeenCalledTimes(1);
  });

  test('should show card list successfully', () => {
    const {
      sut: { getByTestId },
      placeList,
    } = makeSut();

    placeList.forEach((place, index) => {
      const {
        imageOfPlace,
        title,
        location,
        distanceOfLocal,
        amountOfReviews,
      } = getPlaceDetails(index, getByTestId);

      expect(imageOfPlace).toEqual({
        uri: place.imageUrl,
      });
      expect(title).toEqual(place.title);
      expect(location).toEqual(place.location);
      expect(distanceOfLocal).toEqual(place.myDistanceOfLocal);
      expect(amountOfReviews).toEqual(` (${place.amountOfReviews})`);
    });
  });

  test('should call showMoreDetails function when press the ListCard specific component', () => {
    const {
      sut: { getByTestId },
      showMoreDetailsSpy,
      placeList,
    } = makeSut();

    fireEvent.press(getByTestId('list_card_1_id'));

    expect(showMoreDetailsSpy).toHaveBeenCalledTimes(1);
    expect(showMoreDetailsSpy).toHaveBeenCalledWith(placeList[1]);
  });
});

const makeSut = (title = '') => {
  const placeList = placeListFactory(5);
  const seeAll = jest.fn();
  const favorite = jest.fn();
  const showMoreDetails = jest.fn();

  const sut = render(
    <CardList
      placeList={placeList}
      title={title}
      seeAll={seeAll}
      favorite={favorite}
      showMoreDetails={showMoreDetails}
    />,
  );

  return {
    sut,
    placeList,
    seeAllSpy: seeAll,
    favoriteSpy: favorite,
    showMoreDetailsSpy: showMoreDetails,
  };
};

export const getPlaceDetails = (
  index: number,
  getByTestId: GetByQuery<TextMatch, TextMatchOptions>,
) => {
  const imageOfPlace = getByTestId(`image_of_place_${index}_id`).props.source;
  const title = getByTestId(`title_${index}_id`).props.children;
  const location = getByTestId(`location_${index}_id`).props.children;
  const distanceOfLocal = getByTestId(`distance_of_local_${index}_id`).props
    .children;
  const amountOfReviews = getByTestId(`amount_of_reviews_${index}_id`).props
    .children;

  return {
    imageOfPlace,
    title,
    location,
    distanceOfLocal,
    amountOfReviews,
  };
};
