import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import CardList, { Place } from '../../../src/presentation/components/cardList';
import { getPlaceDetails } from '../components/cardList/index.spec';
import placeListFactory from '../helpers/placeListFactory';

describe('Presentation: PlaceList', () => {
  test('should list places correctly', () => {
    const list = placeListFactory(5);
    const { getByTestId } = render(<PlaceList list={list} />);

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
});

type Props = {
  list: Array<Place>;
};

const PlaceList = ({ list }: Props) => {
  return (
    <View>
      <CardList
        title={''}
        seeAll={function (): void {
          throw new Error('Function not implemented.');
        }}
        placeList={list}
        favorite={function (): void {
          throw new Error('Function not implemented.');
        }}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        showMoreDetails={function (place: Place): void {
          throw new Error('Function not implemented.');
        }}
      />
    </View>
  );
};
