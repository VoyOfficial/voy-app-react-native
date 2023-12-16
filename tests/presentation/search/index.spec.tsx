import React from 'react';
import { TextInput, View } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';

describe('Presentation: Search', () => {
  test('should show input of search with success', () => {
    const { getByTestId } = render(
      <Search searchValue="" changeSearch={() => {}} searchTo={() => {}} />,
    );

    expect(getByTestId('search_input_id')).toBeTruthy();
  });

  test('should show input of search with correct placeholder', () => {
    const { getByTestId } = render(
      <Search searchValue="" changeSearch={() => {}} searchTo={() => {}} />,
    );

    expect(getByTestId('search_input_id').props.placeholder).toEqual(
      'Pesquisar lugares...',
    );
  });

  test('should show the search input value successfully', () => {
    const searchValue = 'Cafeteria';
    const { getByTestId } = render(
      <Search
        searchValue={searchValue}
        changeSearch={() => {}}
        searchTo={() => {}}
      />,
    );

    expect(getByTestId('search_input_id').props.value).toEqual('Cafeteria');
  });

  test('should change search input value with success', () => {
    const searchValue = 'Cafeteria';
    const changeSearch = jest.fn();
    const { getByTestId } = render(
      <Search
        searchValue={searchValue}
        changeSearch={changeSearch}
        searchTo={() => {}}
      />,
    );

    fireEvent.changeText(getByTestId('search_input_id'), 'Restaurante');

    expect(changeSearch).toHaveBeenCalledTimes(1);
    expect(changeSearch).toHaveBeenCalledWith('Restaurante');
  });

  test('should search with success', () => {
    const searchValue = 'Cafeteria';
    const changeSearch = jest.fn();
    const searchTo = jest.fn();
    const { getByTestId } = render(
      <Search
        searchValue={searchValue}
        changeSearch={changeSearch}
        searchTo={searchTo}
      />,
    );

    fireEvent(getByTestId('search_input_id'), 'onSubmitEditing');

    expect(searchTo).toHaveBeenCalledTimes(1);
    expect(searchTo).toHaveBeenCalledWith('Cafeteria');
  });
});

type Props = {
  searchValue: string;
  changeSearch: (value: string) => void;
  searchTo: (value: string) => void;
};

const Search = ({ searchValue, changeSearch, searchTo }: Props) => {
  return (
    <View>
      <TextInput
        testID="search_input_id"
        placeholder="Pesquisar lugares..."
        value={searchValue}
        onChangeText={changeSearch}
        onSubmitEditing={() => searchTo(searchValue)}
      />
    </View>
  );
};
