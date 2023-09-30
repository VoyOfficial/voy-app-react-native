import React from 'react';
import { faker } from '@faker-js/faker';
import { fireEvent, render } from '@testing-library/react-native';
import CardList, {
  Place,
} from '../../../../src/presentation/components/cardList';

describe('Components: CardList', () => {
  test('should show title of CardList with success', () => {
    const title = faker.random.word();
    const { getByTestId } = render(
      <CardList
        placeList={makePlaceList(5)}
        title={title}
        seeAll={() => {}}
        favorite={() => {}}
      />,
    );

    expect(getByTestId('title_id').props.children).toEqual(title);
  });

  test('should show button "Ver todos" correctly', () => {
    const title = faker.random.word();
    const { getByTestId } = render(
      <CardList
        placeList={makePlaceList(5)}
        title={title}
        seeAll={() => {}}
        favorite={() => {}}
      />,
    );

    expect(getByTestId('see_all_id').props.children).toEqual('Ver todos');
  });

  test('should press button "Ver todos" with success', () => {
    const title = faker.random.word();
    const seeAll = jest.fn();
    const { getByTestId } = render(
      <CardList
        placeList={makePlaceList(5)}
        title={title}
        seeAll={seeAll}
        favorite={() => {}}
      />,
    );

    fireEvent.press(getByTestId('see_all_button_id'));

    expect(seeAll).toHaveBeenCalledTimes(1);
  });

  test('should call favorite function when press the save button', () => {
    const title = faker.random.word();
    const seeAll = jest.fn();

    const favorite = jest.fn();
    const { getByTestId } = render(
      <CardList
        placeList={makePlaceList(5)}
        title={title}
        seeAll={seeAll}
        favorite={favorite}
      />,
    );

    fireEvent.press(getByTestId('save_button_1_id'));

    expect(favorite).toHaveBeenCalledTimes(1);
  });

  test('should show card list successfully', () => {
    const title = faker.random.word();
    const seeAll = jest.fn();
    const placeList = makePlaceList(5);
    const { getByTestId } = render(
      <CardList
        placeList={placeList}
        title={title}
        seeAll={seeAll}
        favorite={() => {}}
      />,
    );

    placeList.forEach((place, index) => {
      expect(getByTestId(`image_of_place_${index}_id`).props.source).toEqual({
        uri: place.imageUrl,
      });
      expect(getByTestId(`title_${index}_id`).props.children).toEqual(
        place.title,
      );
      expect(getByTestId(`location_${index}_id`).props.children).toEqual(
        place.location,
      );
      expect(
        getByTestId(`distance_of_local_${index}_id`).props.children,
      ).toEqual(place.myDistanceOfLocal);
      expect(
        getByTestId(`amount_of_reviews_${index}_id`).props.children,
      ).toEqual(` (${place.amountOfReviews})`);
    });
  });
});

const makePlaceList = (quantity: number): Array<Place> => {
  const placeList = [];
  for (let index = 0; index < quantity; index++) {
    placeList.push({
      imageUrl: faker.image.imageUrl(),
      title: faker.random.words(),
      location: faker.random.word(),
      myDistanceOfLocal: faker.random.numeric(),
      amountOfReviews: faker.random.numeric(),
      rating: faker.random.numeric(),
    });
  }
  return placeList;
};
