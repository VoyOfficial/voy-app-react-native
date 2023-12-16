import React from 'react';
import { TextInput, View } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';

describe('Presentation: Search', () => {
  test('should show input of search with success', () => {
    const { getByTestId } = render(
      <Search search="" changeSearch={() => {}} />,
    );

    expect(getByTestId('search_input_id')).toBeTruthy();
  });

  test('should show the search input value successfully', () => {
    const search = 'Cafeteria';
    const { getByTestId } = render(
      <Search search={search} changeSearch={() => {}} />,
    );

    expect(getByTestId('search_input_id').props.value).toEqual('Cafeteria');
  });

  test('should change search input value with success', () => {
    const search = 'Cafeteria';
    const changeSearch = jest.fn();
    const { getByTestId } = render(
      <Search search={search} changeSearch={changeSearch} />,
    );

    fireEvent.changeText(getByTestId('search_input_id'), 'Restaurante');

    expect(changeSearch).toHaveBeenCalledTimes(1);
    expect(changeSearch).toHaveBeenCalledWith('Restaurante');
  });
});

type Props = {
  search: string;
  changeSearch: (text: string) => void;
};

const Search = ({ search, changeSearch }: Props) => {
  return (
    <View>
      <TextInput
        testID="search_input_id"
        value={search}
        onChangeText={changeSearch}
      />
    </View>
  );
};
