import React from 'react';
import { View } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import CardList, { Place } from '../../../src/presentation/components/cardList';
import { getPlaceDetails } from '../components/cardList/index.spec';
import placeListFactory from '../helpers/placeListFactory';

describe('Presentation: PlaceList', () => {
  test('should list places correctly', () => {
    const list = placeListFactory(5);
    const { getByTestId } = render(
      <PlaceList list={list} favorite={() => {}} showMoreDetails={() => {}} />,
    );

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
    const list = placeListFactory(5);
    const { getByTestId } = render(
      <PlaceList list={list} favorite={() => {}} showMoreDetails={() => {}} />,
    );

    expect(getByTestId('title_id').props.children).toEqual('');
  });

  test('should not show see all button', () => {
    const list = placeListFactory(5);
    const { queryByTestId } = render(
      <PlaceList list={list} favorite={() => {}} showMoreDetails={() => {}} />,
    );

    expect(queryByTestId('see_all_button_id')).not.toBeTruthy();
  });

  test('should call favorite function when press the save button', () => {
    const favoriteSpy = jest.fn();
    const list = placeListFactory(5);
    const { getByTestId } = render(
      <PlaceList
        list={list}
        favorite={favoriteSpy}
        showMoreDetails={() => {}}
      />,
    );

    fireEvent.press(getByTestId('save_button_1_id'));

    expect(favoriteSpy).toHaveBeenCalledTimes(1);
  });

  test('should call showMoreDetails function correctly when press the show more details button', () => {
    const showMoreDetails = jest.fn();
    const list = placeListFactory(5);
    const { getByTestId } = render(
      <PlaceList
        list={list}
        favorite={() => {}}
        showMoreDetails={showMoreDetails}
      />,
    );

    fireEvent.press(getByTestId('list_card_1_id'));

    expect(showMoreDetails).toHaveBeenCalledTimes(1);
    expect(showMoreDetails).toHaveBeenCalledWith(list[1]);
  });
});

type Props = {
  list: Array<Place>;
  favorite: () => void;
  showMoreDetails: (place: Place) => void;
};

const PlaceList = ({ list, favorite, showMoreDetails }: Props) => {
  return (
    <View>
      <CardList
        title={''}
        showSeeAllButton={false}
        seeAll={() => {}}
        placeList={list}
        favorite={favorite}
        showMoreDetails={showMoreDetails}
      />
    </View>
  );
};
