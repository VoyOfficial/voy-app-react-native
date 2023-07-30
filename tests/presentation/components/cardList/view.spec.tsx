import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';

describe('Components: CardList', () => {
  test('should show title with success', () => {
    const title = 'Mini Mundo';
    const { getByTestId } = render(<CardList />);

    expect(getByTestId('title_id').props.children).toEqual(title);
  });

  test('should show location of local correctly', () => {
    const location = 'Gramado - RS';
    const { getByTestId } = render(<CardList />);

    expect(getByTestId('location_id').props.children).toEqual(location);
  });

  test('should show the my distance of local correctly', () => {
    const myDistanceOfLocal = 'a 237m';
    const { getByTestId } = render(<CardList />);

    expect(getByTestId('distance_of_local_id').props.children).toEqual(
      myDistanceOfLocal,
    );
  });
});

const CardList = () => {
  return (
    <View>
      <Text testID="title_id">{'Mini Mundo'}</Text>
      <Text testID="location_id">{'Gramado - RS'}</Text>
      <Text testID="distance_of_local_id">{'a 237m'}</Text>
    </View>
  );
};
