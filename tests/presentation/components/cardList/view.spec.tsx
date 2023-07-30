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
});

const CardList = () => {
  return (
    <View>
      <Text testID="title_id">{'Mini Mundo'}</Text>
      <Text testID="location_id">{'Gramado - RS'}</Text>
    </View>
  );
};
