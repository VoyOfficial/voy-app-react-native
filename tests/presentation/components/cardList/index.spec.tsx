import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { faker } from '@faker-js/faker';
import { fireEvent, render } from '@testing-library/react-native';
import { ListCard } from '~/presentation/components';

describe('Components: CardList', () => {
  test('should show title of CardList with success', () => {
    const title = faker.random.word();
    const { getByTestId } = render(
      <CardList placeList={makePlaceList(5)} title={title} seeAll={() => {}} />,
    );

    expect(getByTestId('title_id').props.children).toEqual(title);
  });

  test('should show button "Ver todos" correctly', () => {
    const title = faker.random.word();
    const { getByTestId } = render(
      <CardList placeList={makePlaceList(5)} title={title} seeAll={() => {}} />,
    );

    expect(getByTestId('see_all_id').props.children).toEqual('Ver todos');
  });

  test('should press button "Ver todos" with success', () => {
    const title = faker.random.word();
    const seeAll = jest.fn();
    const { getByTestId } = render(
      <CardList placeList={makePlaceList(5)} title={title} seeAll={seeAll} />,
    );

    fireEvent.press(getByTestId('see_all_button_id'));

    expect(seeAll).toHaveBeenCalledTimes(1);
  });

  test('should show card list successfully', () => {
    const title = faker.random.word();
    const seeAll = jest.fn();
    const placeList = makePlaceList(5);
    const { getByTestId } = render(
      <CardList placeList={placeList} title={title} seeAll={seeAll} />,
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

type Place = {
  imageUrl: string;
  title: string;
  location: string;
  myDistanceOfLocal: string;
  amountOfReviews: string;
  rating: string;
};

type Props = {
  title: string;
  seeAll: () => void;
  placeList: Array<Place>;
};

const CardList = ({ title, seeAll, placeList }: Props) => {
  return (
    <View>
      <Text testID="title_id">{title}</Text>
      <TouchableOpacity testID="see_all_button_id" onPress={seeAll}>
        <Text testID="see_all_id">{'Ver todos'}</Text>
      </TouchableOpacity>
      <FlatList
        data={placeList}
        renderItem={({ item, index }) => (
          <ListCard
            index={index}
            title={item.title}
            imageUrl={item.imageUrl}
            location={item.location}
            myDistanceOfLocal={item.myDistanceOfLocal}
            amountOfReviews={item.amountOfReviews}
            rating={item.rating}
            favorite={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        )}
      />
    </View>
  );
};

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
