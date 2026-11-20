import React from 'react';
import { Provider } from 'mobx-react';
import { ThemeProvider } from 'styled-components/native';
import { ReactTestInstance } from 'react-test-renderer';
import { fireEvent } from '@testing-library/react-native';
import Filter from '../../../src/presentation/search/model/Filter';
import placeListFactory from '../helpers/placeListFactory';
import { Place } from '../../../src/presentation/components/cardList';
import { Search } from '../../../src/presentation/search';
import { lightTheme } from '../../../src/presentation/theme/theme';
import voyIcons from '../../../src/presentation/assets/fonts/Voy/selection.json';
import { renderWithTheme } from '../helpers/renderWithTheme';

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

  test('should show card list correctly when searchValue is not empty', () => {
    const placeList = placeListFactory(5);
    const showFilterOptions = true;
    const {
      sut: { getByTestId },
    } = makeSut(
      showFilterOptions,
      () => {},
      'any_value',
      () => {},
      async () => {},
      placeList,
    );

    placeList.forEach((place, index) => {
      expect(getByTestId(`list_card_${index}_id`)).toBeTruthy();
    });
  });

  test('should not show card list if searchValue is empty', () => {
    const placeList = placeListFactory(5);
    const showFilterOptions = true;
    const {
      sut: { queryByTestId },
    } = makeSut(
      showFilterOptions,
      () => {},
      '',
      () => {},
      async () => {},
      placeList,
    );

    expect(queryByTestId('list_card_0_id')).toBeNull();
  });

  test('should render back, search input, then filter on the right, and call goBack', () => {
    const goBack = jest.fn();
    const {
      sut: { getByTestId },
    } = makeSut(
      false,
      () => {},
      '',
      () => {},
      async () => {},
      [],
      goBack,
    );

    const ids = testIdsInOrder(getByTestId('search_header_id'));
    const backIndex = ids.indexOf('back_button_id');
    const searchIndex = ids.indexOf('search_input_id');
    const filterIndex = ids.indexOf('filter_button_id');

    expect(backIndex).toBeGreaterThanOrEqual(0);
    expect(backIndex).toBeLessThan(searchIndex);
    expect(searchIndex).toBeLessThan(filterIndex);
    const arrowLeft = voyIcons.icons.find(
      (icon) => icon.properties.name === 'arrow_left',
    );

    const iconChildren = getByTestId('back_icon_id').props.children;

    expect(iconChildren[0]).toEqual(
      String.fromCharCode(arrowLeft?.properties.code ?? 0),
    );

    fireEvent.press(getByTestId('back_button_id'));

    expect(goBack).toHaveBeenCalledTimes(1);
  });

  test('should show the filter panel with the search field and card list still mounted', () => {
    const placeList = placeListFactory(2);
    const {
      sut: { getByTestId },
    } = makeSut(
      true,
      () => {},
      'cafe',
      () => {},
      async () => {},
      placeList,
    );

    const panelStyle = flatStyle(getByTestId('filter_panel_id').props.style);

    expect(panelStyle.position).toEqual('absolute');
    expect(panelStyle.top).toEqual(120);
    expect(panelStyle.left).toEqual(0);
    expect(panelStyle.right).toEqual(0);
    expect(getByTestId('search_input_id')).toBeTruthy();
    expect(getByTestId('filter_modal_id')).toBeTruthy();
    expect(getByTestId('list_card_0_id')).toBeTruthy();
    expect(getByTestId('list_card_1_id')).toBeTruthy();
  });

  test('should close both option lists when the filter panel closes and opens again', () => {
    const filter = new Filter();
    const placeList = placeListFactory(1);
    const tree = (showFilterOptions: boolean) => (
      <ThemeProvider theme={lightTheme}>
        <Provider {...{ filter }}>
          <Search
            searchValue="cafe"
            changeSearch={() => {}}
            searchTo={async () => {}}
            filter={() => {}}
            showFilterOptions={showFilterOptions}
            placeList={placeList}
            showMoreDetails={() => {}}
            goBack={() => {}}
          />
        </Provider>
      </ThemeProvider>
    );
    const { getByTestId, queryByTestId, rerender } = renderWithTheme(
      tree(true),
    );

    fireEvent.press(getByTestId('order_by_button_id'));

    expect(getByTestId('order_options_id')).toBeTruthy();

    rerender(tree(false));

    expect(queryByTestId('filter_modal_id')).toBeNull();
    expect(queryByTestId('order_options_id')).toBeNull();

    rerender(tree(true));

    expect(getByTestId('filter_modal_id')).toBeTruthy();
    expect(queryByTestId('order_options_id')).toBeNull();
    expect(queryByTestId('filter_options_id')).toBeNull();
  });

  test('should call showMoreDetails function correctly when press the show more details button', () => {
    const placeList = placeListFactory(5);
    const {
      sut: { getByTestId },
      showMoreDetailsSpy,
    } = makeSut(
      true,
      () => {},
      'any_value',
      () => {},
      async () => {},
      placeList,
    );

    fireEvent.press(getByTestId('list_card_1_id'));

    expect(showMoreDetailsSpy).toHaveBeenCalledTimes(1);
    expect(showMoreDetailsSpy).toHaveBeenCalledWith(placeList[1]);
  });
});

const makeSut = (
  showFilterOptions = false,
  filter = () => {},
  searchValue = '',
  changeSearch = () => {},
  searchTo = async () => {},
  placeList: Array<Place> = [],
  goBack = jest.fn(),
) => {
  const showMoreDetailsSpy = jest.fn();

  const sut = renderWithTheme(
    <Provider {...{ filter: new Filter() }}>
      <Search
        searchValue={searchValue}
        changeSearch={changeSearch}
        searchTo={searchTo}
        filter={filter}
        showFilterOptions={showFilterOptions}
        placeList={placeList}
        showMoreDetails={showMoreDetailsSpy}
        goBack={goBack}
      />
    </Provider>,
  );

  return { sut, showMoreDetailsSpy, goBack };
};

const flatStyle = (style: unknown): Record<string, unknown> => {
  if (Array.isArray(style)) {
    return Object.assign({}, ...style.map((item) => flatStyle(item)));
  }

  if (style && typeof style === 'object') {
    return style as Record<string, unknown>;
  }

  return {};
};

const testIdsInOrder = (node: ReactTestInstance): string[] => {
  const ids: string[] = [];

  if (typeof node.props?.testID === 'string') {
    ids.push(node.props.testID);
  }

  node.children.forEach((child) => {
    if (typeof child !== 'string') {
      ids.push(...testIdsInOrder(child));
    }
  });

  return ids;
};
