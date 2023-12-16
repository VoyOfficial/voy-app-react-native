import React from 'react';
import { TextInput, View } from 'react-native';
import { render } from '@testing-library/react-native';

describe('Presentation: Search', () => {
  test('should show input of search with success', () => {
    const { getByTestId } = render(<Search />);

    expect(getByTestId('search_input_id')).toBeTruthy();
  });
});

const Search = () => {
  return (
    <View>
      <TextInput testID="search_input_id" />
    </View>
  );
};
