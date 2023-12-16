import React from 'react';
import { TextInput, View } from 'react-native';
import { render } from '@testing-library/react-native';

describe('Presentation: Search', () => {
  test('should show input of search with success', () => {
    const { getByTestId } = render(<Search search="" />);

    expect(getByTestId('search_input_id')).toBeTruthy();
  });

  test('should show the search input value successfully', () => {
    const search = 'Cafeteria';
    const { getByTestId } = render(<Search search={search} />);

    expect(getByTestId('search_input_id').props.value).toEqual('Cafeteria');
  });
});

type Props = {
  search: string;
};

const Search = ({ search }: Props) => {
  return (
    <View>
      <TextInput testID="search_input_id" value={search} />
    </View>
  );
};
