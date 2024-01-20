import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import FilterModal from '../../../../src/presentation/search/modal';

const filterOptionsFactory = () => {
  return {
    orderBy: {
      label: 'Ordenar por',
      selected: { id: 0, label: 'Mais avaliados' },
      list: [
        { id: 0, label: 'Mais avaliados' },
        { id: 1, label: 'Mais comentados' },
        { id: 2, label: 'Distância' },
      ],
    },
    filterBy: {
      label: 'Filtrar por',
      list: [
        { id: 0, label: 'Restaurantes', selected: false },
        { id: 1, label: 'Cafeterias', selected: false },
        { id: 2, label: 'Entretenimento', selected: false },
        { id: 3, label: 'Hotéis', selected: false },
        { id: 4, label: 'Lazer', selected: false },
      ],
    },
  };
};

describe('Search: Modal', () => {
  test('should show order by selected correctly', () => {
    const filterOptions = filterOptionsFactory();
    const {
      sut: { getByTestId },
    } = makeSut({
      filterOptions,
      selectFilter: () => {},
      selectOrder: () => {},
      showFilterList: true,
      showOrderList: false,
      changeShowOfFilterList: () => {},
      changeShowOfOrderList: () => {},
    });

    const labelOrderBy = getByTestId('label_order_by_id');
    const orderBySelected = getByTestId('order_by_selected_id');
    expect(labelOrderBy.props.children).toEqual('Ordenar por: ');
    expect(orderBySelected.props.children).toEqual('Mais avaliados');
  });

  test('should call changeShowOfOrderList function when press "order by" button', () => {
    const changeShowOfOrderList = jest.fn();
    const filterOptions = filterOptionsFactory();
    const {
      sut: { getByTestId },
    } = makeSut({
      filterOptions,
      selectFilter: () => {},
      selectOrder: () => {},
      showFilterList: true,
      showOrderList: false,
      changeShowOfFilterList: () => {},
      changeShowOfOrderList,
    });

    fireEvent.press(getByTestId('order_by_button_id'));

    expect(changeShowOfOrderList).toHaveBeenCalledTimes(1);
    expect(changeShowOfOrderList).toHaveBeenCalledWith();
  });

  test('should show down arrow icon to show order options', () => {
    const filterOptions = filterOptionsFactory();
    const {
      sut: { getByTestId },
    } = makeSut({
      filterOptions,
      selectFilter: () => {},
      selectOrder: () => {},
      showFilterList: true,
      showOrderList: false,
      changeShowOfFilterList: () => {},
      changeShowOfOrderList: () => {},
    });

    expect(getByTestId('order_down_arrow_icon_id')).toBeTruthy();
  });

  test('should not show down arrow icon if showOrderList is true', () => {
    const filterOptions = filterOptionsFactory();
    const {
      sut: { queryByTestId },
    } = makeSut({
      filterOptions,
      selectFilter: () => {},
      selectOrder: () => {},
      showFilterList: false,
      showOrderList: true,
      changeShowOfFilterList: () => {},
      changeShowOfOrderList: () => {},
    });

    expect(queryByTestId('order_down_arrow_icon_id')).not.toBeTruthy();
  });

  test('should show up arrow icon to hide order options', () => {
    const filterOptions = filterOptionsFactory();
    const {
      sut: { getByTestId },
    } = makeSut({
      filterOptions,
      selectFilter: () => {},
      selectOrder: () => {},
      showFilterList: false,
      showOrderList: true,
      changeShowOfFilterList: () => {},
      changeShowOfOrderList: () => {},
    });

    expect(getByTestId('order_up_arrow_icon_id')).toBeTruthy();
  });

  test('should show up arrow icon to hide filter options', () => {
    const filterOptions = filterOptionsFactory();
    const {
      sut: { getByTestId },
    } = makeSut({
      filterOptions,
      selectFilter: () => {},
      selectOrder: () => {},
      showFilterList: true,
      showOrderList: false,
      changeShowOfFilterList: () => {},
      changeShowOfOrderList: () => {},
    });

    expect(getByTestId('filter_up_arrow_icon_id')).toBeTruthy();
  });

  test('should not show up arrow icon if showFilterList is false', () => {
    const filterOptions = filterOptionsFactory();
    const {
      sut: { queryByTestId },
    } = makeSut({
      filterOptions,
      selectFilter: () => {},
      selectOrder: () => {},
      showFilterList: false,
      showOrderList: false,
      changeShowOfFilterList: () => {},
      changeShowOfOrderList: () => {},
    });

    expect(queryByTestId('filter_up_arrow_icon_id')).not.toBeTruthy();
  });

  test('should show down arrow icon to show filter options', () => {
    const filterOptions = filterOptionsFactory();
    const {
      sut: { getByTestId },
    } = makeSut({
      filterOptions,
      selectFilter: () => {},
      selectOrder: () => {},
      showFilterList: false,
      showOrderList: false,
      changeShowOfFilterList: () => {},
      changeShowOfOrderList: () => {},
    });

    expect(getByTestId('filter_down_arrow_icon_id')).toBeTruthy();
  });

  test('should not show down arrow icon if showFilterList is true', () => {
    const filterOptions = filterOptionsFactory();
    const {
      sut: { queryByTestId },
    } = makeSut({
      filterOptions,
      selectFilter: () => {},
      selectOrder: () => {},
      showFilterList: true,
      showOrderList: false,
      changeShowOfFilterList: () => {},
      changeShowOfOrderList: () => {},
    });

    expect(queryByTestId('filter_down_arrow_icon_id')).not.toBeTruthy();
  });

  test('should not show up arrow icon if showOrderList is false', () => {
    const filterOptions = filterOptionsFactory();
    const {
      sut: { queryByTestId },
    } = makeSut({
      filterOptions,
      selectFilter: () => {},
      selectOrder: () => {},
      showFilterList: true,
      showOrderList: false,
      changeShowOfFilterList: () => {},
      changeShowOfOrderList: () => {},
    });

    expect(queryByTestId('order_up_arrow_icon_id')).not.toBeTruthy();
  });

  test('should show the filter label by correctly', () => {
    const filterOptions = filterOptionsFactory();
    const {
      sut: { getByTestId },
    } = makeSut({
      filterOptions,
      selectFilter: () => {},
      selectOrder: () => {},
      showFilterList: true,
      showOrderList: false,
      changeShowOfFilterList: () => {},
      changeShowOfOrderList: () => {},
    });

    const labelFilterBy = getByTestId('label_filter_by_id');
    expect(labelFilterBy.props.children).toEqual('Filtrar por: ');
  });

  test('should call changeShowOfFilterList function when press "filter by" button', () => {
    const changeShowOfFilterList = jest.fn();
    const filterOptions = filterOptionsFactory();
    const {
      sut: { getByTestId },
    } = makeSut({
      filterOptions,
      selectFilter: () => {},
      selectOrder: () => {},
      showFilterList: true,
      showOrderList: false,
      changeShowOfFilterList,
      changeShowOfOrderList: () => {},
    });

    fireEvent.press(getByTestId('filter_by_button_id'));

    expect(changeShowOfFilterList).toHaveBeenCalledTimes(1);
    expect(changeShowOfFilterList).toHaveBeenCalledWith();
  });

  test('should show order list correctly', () => {
    const filterOptions = filterOptionsFactory();
    const {
      sut: { getByTestId },
    } = makeSut({
      filterOptions,
      selectFilter: () => {},
      selectOrder: () => {},
      showFilterList: false,
      showOrderList: true,
      changeShowOfFilterList: () => {},
      changeShowOfOrderList: () => {},
    });

    filterOptions.orderBy.list.forEach((order) => {
      expect(getByTestId(`order_${order.id}_id`).props.children).toEqual(
        order.label,
      );
    });
  });

  test('should show the order option selection icon', () => {
    const filterOptions = filterOptionsFactory();
    const {
      sut: { getByTestId },
    } = makeSut({
      filterOptions,
      selectFilter: () => {},
      selectOrder: () => {},
      showFilterList: false,
      showOrderList: true,
      changeShowOfFilterList: () => {},
      changeShowOfOrderList: () => {},
    });

    filterOptions.orderBy.list.forEach((order) => {
      expect(getByTestId(`order_selection_icon_${order.id}_id`)).toBeTruthy();
    });
  });

  test('should update style of order option selection icon', () => {
    const filterOptions = {
      orderBy: {
        label: 'Ordenar por',
        selected: { id: 1, label: 'Mais comentados' },
        list: [
          { id: 0, label: 'Mais avaliados' },
          { id: 1, label: 'Mais comentados' },
          { id: 2, label: 'Distância' },
        ],
      },
      filterBy: {
        label: 'Filtrar por',
        list: [],
      },
    };

    const {
      sut: { getByTestId },
    } = makeSut({
      filterOptions,
      selectFilter: () => {},
      selectOrder: () => {},
      showFilterList: false,
      showOrderList: true,
      changeShowOfFilterList: () => {},
      changeShowOfOrderList: () => {},
    });

    expect(
      getByTestId(`order_selection_icon_${0}_id`).props.style.borderColor,
    ).toEqual('#C5CACC');
    expect(
      getByTestId(`order_selection_icon_${0}_id`).props.style.backgroundColor,
    ).toEqual('#FFFFFF');

    expect(
      getByTestId(`order_selection_icon_${1}_id`).props.style.borderColor,
    ).toEqual('#5742E0');
    expect(
      getByTestId(`order_selection_icon_${1}_id`).props.style.backgroundColor,
    ).toEqual('#5742E0');
  });

  test('should show the filter option selection icon', () => {
    const filterOptions = filterOptionsFactory();
    const {
      sut: { getByTestId },
    } = makeSut({
      filterOptions,
      selectFilter: () => {},
      selectOrder: () => {},
      showFilterList: true,
      showOrderList: false,
      changeShowOfFilterList: () => {},
      changeShowOfOrderList: () => {},
    });

    filterOptions.filterBy.list.forEach((filter) => {
      expect(getByTestId(`filter_selection_icon_${filter.id}_id`)).toBeTruthy();
    });
  });

  test('should update style of filter option selection icon', () => {
    const filterOptions = {
      orderBy: {
        label: 'Ordenar por',
        selected: { id: 0, label: 'Mais avaliados' },
        list: [
          { id: 0, label: 'Mais avaliados' },
          { id: 1, label: 'Mais comentados' },
          { id: 2, label: 'Distância' },
        ],
      },
      filterBy: {
        label: 'Filtrar por',
        list: [
          { id: 0, label: 'Restaurantes', selected: false },
          { id: 1, label: 'Cafeterias', selected: true },
          { id: 2, label: 'Entretenimento', selected: true },
          { id: 3, label: 'Hotéis', selected: false },
          { id: 4, label: 'Lazer', selected: false },
        ],
      },
    };

    const {
      sut: { getByTestId },
    } = makeSut({
      filterOptions,
      selectFilter: () => {},
      selectOrder: () => {},
      showFilterList: true,
      showOrderList: false,
      changeShowOfFilterList: () => {},
      changeShowOfOrderList: () => {},
    });

    expect(
      getByTestId(`filter_selection_icon_${0}_id`).props.style.borderColor,
    ).toEqual('#C5CACC');
    expect(
      getByTestId(`filter_selection_icon_${0}_id`).props.style.backgroundColor,
    ).toEqual('#FFFFFF');

    expect(
      getByTestId(`filter_selection_icon_${1}_id`).props.style.borderColor,
    ).toEqual('#5742E0');
    expect(
      getByTestId(`filter_selection_icon_${1}_id`).props.style.backgroundColor,
    ).toEqual('#5742E0');
    expect(
      getByTestId(`filter_selection_icon_${2}_id`).props.style.borderColor,
    ).toEqual('#5742E0');
    expect(
      getByTestId(`filter_selection_icon_${2}_id`).props.style.backgroundColor,
    ).toEqual('#5742E0');
  });

  test('should not show order list if showOrderList is false', () => {
    const filterOptions = filterOptionsFactory();
    const {
      sut: { queryByTestId },
    } = makeSut({
      filterOptions,
      selectFilter: () => {},
      selectOrder: () => {},
      showFilterList: false,
      showOrderList: false,
      changeShowOfFilterList: () => {},
      changeShowOfOrderList: () => {},
    });

    expect(queryByTestId('order_options_id')).not.toBeTruthy();
  });

  test('should not show filter list if showFilterList is false', () => {
    const filterOptions = filterOptionsFactory();
    const {
      sut: { queryByTestId },
    } = makeSut({
      filterOptions,
      selectFilter: () => {},
      selectOrder: () => {},
      showFilterList: false,
      showOrderList: false,
      changeShowOfFilterList: () => {},
      changeShowOfOrderList: () => {},
    });

    expect(queryByTestId('filter_options_id')).not.toBeTruthy();
  });

  test('should show filter list correctly', () => {
    const filterOptions = filterOptionsFactory();
    const {
      sut: { getByTestId },
    } = makeSut({
      filterOptions,
      selectFilter: () => {},
      selectOrder: () => {},
      showFilterList: true,
      showOrderList: true,
      changeShowOfFilterList: () => {},
      changeShowOfOrderList: () => {},
    });

    filterOptions.filterBy.list.forEach((filter) => {
      expect(getByTestId(`filter_${filter.id}_id`).props.children).toEqual(
        filter.label,
      );
    });
  });

  test('should update order selected when press a new order', () => {
    const filterOptions = filterOptionsFactory();
    const selectOrder = (order: { id: number; label: string }) => {
      filterOptions.orderBy.selected = order;
    };

    const {
      sut: { getByTestId },
    } = makeSut({
      filterOptions,
      selectFilter: () => {},
      selectOrder,
      showFilterList: false,
      showOrderList: true,
      changeShowOfFilterList: () => {},
      changeShowOfOrderList: () => {},
    });

    expect(getByTestId('order_by_selected_id').props.children).toEqual(
      filterOptions.orderBy.selected.label,
    );

    fireEvent.press(getByTestId('order_button_1_id'));

    expect(getByTestId('order_by_selected_id').props.children).not.toEqual(
      filterOptions.orderBy.selected.label,
    );
  });

  test('should update filters selected when press more of one filter', () => {
    const filterOptions = filterOptionsFactory();
    const selectFilter = (filterSelected: {
      id: number;
      label: string;
      selected?: boolean;
    }) => {
      filterOptions.filterBy.list.forEach((filter) => {
        if (filter.id === filterSelected.id) {
          filter.selected = true;
        }
      });
    };

    const {
      sut: { getByTestId },
    } = makeSut({
      filterOptions,
      selectFilter,
      selectOrder: () => {},
      showFilterList: true,
      showOrderList: true,
      changeShowOfFilterList: () => {},
      changeShowOfOrderList: () => {},
    });

    fireEvent.press(getByTestId('filter_button_1_id'));
    fireEvent.press(getByTestId('filter_button_2_id'));
    fireEvent.press(getByTestId('filter_button_4_id'));

    expect(filterOptions.filterBy.list[1].selected).toEqual(true);
    expect(filterOptions.filterBy.list[2].selected).toEqual(true);
    expect(filterOptions.filterBy.list[4].selected).toEqual(true);
  });
});

type Props = {
  filterOptions: {
    orderBy: {
      label: string;
      selected: {
        id: number;
        label: string;
      };
      list: {
        id: number;
        label: string;
      }[];
    };
    filterBy: {
      label: string;
      list: {
        id: number;
        label: string;
        selected: boolean;
      }[];
    };
  };
  selectFilter: (filter: {
    id: number;
    label: string;
    selected?: boolean;
  }) => void;
  selectOrder: (order: { id: number; label: string }) => void;
  showFilterList: boolean;
  showOrderList: boolean;
  changeShowOfOrderList: () => void;
  changeShowOfFilterList: () => void;
};

const makeSut = ({
  filterOptions,
  selectFilter,
  selectOrder,
  showFilterList,
  showOrderList,
  changeShowOfFilterList,
  changeShowOfOrderList,
}: Props) => {
  const sut = render(
    <FilterModal
      filterOptions={filterOptions}
      selectOrder={selectOrder}
      selectFilter={selectFilter}
      showOrderList={showOrderList}
      showFilterList={showFilterList}
      changeShowOfOrderList={changeShowOfOrderList}
      changeShowOfFilterList={changeShowOfFilterList}
    />,
  );

  return { sut };
};
