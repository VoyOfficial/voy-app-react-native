import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

describe('Components: CardList', () => {
  test('should show title with success', () => {
    const title = 'Mini Mundo';
    const { getByTestId } = render(<CardList />);

    expect(getByTestId('title_id').props.children).toEqual(title);
  });
});

const CardList = () => {
  return <Text testID="title_id">{'Mini Mundo'}</Text>;
};
