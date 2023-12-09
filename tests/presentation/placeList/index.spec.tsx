import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { getPlaceDetails } from '../components/cardList/index.spec';
import placeListFactory from '../helpers/placeListFactory';
import PlaceList from '../../../src/presentation/placeList';

describe('Presentation: PlaceList', () => {
  test('should list places correctly', () => {
    const {
      sut: { getByTestId },
      list,
    } = makeSut();

    list.forEach((place, index) => {
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

  test('should not show title', () => {
    const {
      sut: { getByTestId },
    } = makeSut();

    expect(getByTestId('title_id').props.children).toEqual('');
  });

  test('should not show see all button', () => {
    const {
      sut: { queryByTestId },
    } = makeSut();

    expect(queryByTestId('see_all_button_id')).not.toBeTruthy();
  });

  test('should call favorite function when press the save button', () => {
    const {
      sut: { getByTestId },
      favoriteSpy,
    } = makeSut();

    fireEvent.press(getByTestId('save_button_1_id'));

    expect(favoriteSpy).toHaveBeenCalledTimes(1);
  });

  test('should call showMoreDetails function correctly when press the show more details button', () => {
    const {
      sut: { getByTestId },
      showMoreDetailsSpy,
      list,
    } = makeSut();

    fireEvent.press(getByTestId('list_card_1_id'));

    expect(showMoreDetailsSpy).toHaveBeenCalledTimes(1);
    expect(showMoreDetailsSpy).toHaveBeenCalledWith(list[1]);
  });
});

const makeSut = () => {
  const showMoreDetailsSpy = jest.fn();
  const favoriteSpy = jest.fn();

  const list = placeListFactory(5);
  const sut = render(
    <PlaceList
      list={list}
      favorite={favoriteSpy}
      showMoreDetails={showMoreDetailsSpy}
    />,
  );

  return { sut, list, showMoreDetailsSpy, favoriteSpy };
};
