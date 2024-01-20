import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Search from '../../../src/presentation/search';

describe('Presentation: Search', () => {
  test('should show input of search with success', () => {
    const {
      sut: { getByTestId },
    } = makeSut(true);

    expect(getByTestId('search_input_id')).toBeTruthy();
  });

  test('should show input of search with correct placeholder', () => {
    const {
      sut: { getByTestId },
    } = makeSut(true);

    expect(getByTestId('search_input_id').props.placeholder).toEqual(
      'Pesquisar lugares...',
    );
  });

  test('should show the search input value successfully', () => {
    const searchValue = 'Cafeteria';
    const {
      sut: { getByTestId },
    } = makeSut(true, () => {}, searchValue);

    expect(getByTestId('search_input_id').props.value).toEqual('Cafeteria');
  });

  test('should change search input value with success', () => {
    const searchValue = 'Cafeteria';
    const changeSearch = jest.fn();
    const {
      sut: { getByTestId },
    } = makeSut(true, () => {}, searchValue, changeSearch);

    fireEvent.changeText(getByTestId('search_input_id'), 'Restaurante');

    expect(changeSearch).toHaveBeenCalledTimes(1);
    expect(changeSearch).toHaveBeenCalledWith('Restaurante');
  });

  test('should search with success', () => {
    const searchValue = 'Cafeteria';
    const changeSearch = jest.fn();
    const searchTo = jest.fn();
    const {
      sut: { getByTestId },
    } = makeSut(true, () => {}, searchValue, changeSearch, searchTo);

    fireEvent(getByTestId('search_input_id'), 'onSubmitEditing');

    expect(searchTo).toHaveBeenCalledTimes(1);
    expect(searchTo).toHaveBeenCalledWith('Cafeteria');
  });

  test('should show search button with success', () => {
    const {
      sut: { getByTestId },
    } = makeSut(true);

    const search = getByTestId('search_id');

    expect(search).toBeTruthy();
  });

  test('should show filter button with success', () => {
    const {
      sut: { getByTestId },
    } = makeSut(true);

    const filter = getByTestId('filter_id');
    const filterButton = getByTestId('filter_button_id');

    expect(filter).toBeTruthy();
    expect(filterButton).toBeTruthy();
  });

  test('should call filter function when press filter button', () => {
    const filter = jest.fn();
    const {
      sut: { getByTestId },
    } = makeSut(true, filter);

    fireEvent.press(getByTestId('filter_button_id'));

    expect(filter).toHaveBeenCalledTimes(1);
  });

  test('should show filter modal when showFilterOptions is true', () => {
    const showFilterOptions = true;
    const {
      sut: { getByTestId },
    } = makeSut(showFilterOptions);

    expect(getByTestId('filter_modal_id')).toBeTruthy();
  });
});

const makeSut = (
  showFilterOptions = false,
  filter = () => {},
  searchValue = '',
  changeSearch = () => {},
  searchTo = () => {},
) => {
  const sut = render(
    <Search
      searchValue={searchValue}
      changeSearch={changeSearch}
      searchTo={searchTo}
      filter={filter}
      showFilterOptions={showFilterOptions}
    />,
  );

  return { sut };
};
