import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';

describe('Search: Modal', () => {
  test('should show order by selected correctly', () => {
    const filterOptions = {
      orderBy: {
        label: 'Ordenar por',
        selected: { id: 0, label: 'Mais avaliados' },
        list: [],
      },
      filterBy: {
        label: 'Filtrar por',
        list: [],
      },
    };
    const { getByTestId } = render(
      <FilterModal
        filterOptions={filterOptions}
        selectOrder={() => {}}
        selectFilter={() => {}}
      />,
    );

    const labelOrderBy = getByTestId('label_order_by_id');
    const orderBySelected = getByTestId('order_by_selected_id');
    expect(labelOrderBy.props.children).toEqual('Ordenar por: ');
    expect(orderBySelected.props.children).toEqual('Mais avaliados');
  });

  test('should show the filter label by correctly', () => {
    const filterOptions = {
      orderBy: {
        label: 'Ordenar por',
        selected: { id: 0, label: 'Mais avaliados' },
        list: [],
      },
      filterBy: {
        label: 'Filtrar por',
        list: [],
      },
    };
    const { getByTestId } = render(
      <FilterModal
        filterOptions={filterOptions}
        selectOrder={() => {}}
        selectFilter={() => {}}
      />,
    );

    const labelFilterBy = getByTestId('label_filter_by_id');
    expect(labelFilterBy.props.children).toEqual('Filtrar por: ');
  });

  test('should show order list correctly', () => {
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
        list: [],
      },
    };
    const { getByTestId } = render(
      <FilterModal
        filterOptions={filterOptions}
        selectOrder={() => {}}
        selectFilter={() => {}}
      />,
    );

    filterOptions.orderBy.list.forEach((order) => {
      expect(getByTestId(`order_${order.id}_id`).props.children).toEqual(
        order.label,
      );
    });
  });

  test('should show filter list correctly', () => {
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
          { id: 1, label: 'Cafeterias', selected: false },
          { id: 2, label: 'Entretenimento', selected: false },
          { id: 3, label: 'Hotéis', selected: false },
          { id: 4, label: 'Lazer', selected: false },
        ],
      },
    };
    const { getByTestId } = render(
      <FilterModal
        filterOptions={filterOptions}
        selectOrder={() => {}}
        selectFilter={() => {}}
      />,
    );

    filterOptions.filterBy.list.forEach((filter) => {
      expect(getByTestId(`filter_${filter.id}_id`).props.children).toEqual(
        filter.label,
      );
    });
  });

  test('should update order selected when press a new order', () => {
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
          { id: 1, label: 'Cafeterias', selected: false },
          { id: 2, label: 'Entretenimento', selected: false },
          { id: 3, label: 'Hotéis', selected: false },
          { id: 4, label: 'Lazer', selected: false },
        ],
      },
    };

    const selectOrder = (order: { id: number; label: string }) => {
      filterOptions.orderBy.selected = order;
    };
    const { getByTestId } = render(
      <FilterModal
        filterOptions={filterOptions}
        selectOrder={selectOrder}
        selectFilter={() => {}}
      />,
    );

    expect(getByTestId('order_by_selected_id').props.children).toEqual(
      filterOptions.orderBy.selected.label,
    );

    fireEvent.press(getByTestId('order_button_1_id'));

    expect(getByTestId('order_by_selected_id').props.children).not.toEqual(
      filterOptions.orderBy.selected.label,
    );
  });

  test('should update filters selected when press more of one filter', () => {
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
          { id: 1, label: 'Cafeterias', selected: false },
          { id: 2, label: 'Entretenimento', selected: false },
          { id: 3, label: 'Hotéis', selected: false },
          { id: 4, label: 'Lazer', selected: false },
        ],
      },
    };

    const selectFilter = (filterSelected: {
      id: number;
      label: string;
      selected: boolean;
    }) => {
      filterOptions.filterBy.list.forEach((filter) => {
        if (filter.id === filterSelected.id) {
          filter.selected = true;
        }
      });
    };
    const { getByTestId } = render(
      <FilterModal
        filterOptions={filterOptions}
        selectOrder={() => {}}
        selectFilter={selectFilter}
      />,
    );

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
      selected: { id: number; label: string };
      list: Array<{ id: number; label: string }>;
    };
    filterBy: {
      label: string;
      list: Array<{ id: number; label: string; selected: boolean }>;
    };
  };
  selectOrder: (order: { id: number; label: string }) => void;
  selectFilter: (filter: {
    id: number;
    label: string;
    selected: boolean;
  }) => void;
};

const FilterModal = ({ filterOptions, selectOrder, selectFilter }: Props) => {
  return (
    <View>
      <View>
        <Text testID="label_order_by_id">
          {filterOptions.orderBy.label + ': '}
        </Text>
        <Text testID="order_by_selected_id">
          {filterOptions.orderBy.selected.label}
        </Text>
      </View>
      <View>
        {filterOptions.orderBy.list.map((order) => (
          <TouchableOpacity
            key={order.id}
            testID={`order_button_${order.id}_id`}
            onPress={() => selectOrder(order)}
          >
            <Text testID={`order_${order.id}_id`}>{order.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        <Text testID="label_filter_by_id">
          {filterOptions.filterBy.label + ': '}
        </Text>
      </View>
      <View>
        {filterOptions.filterBy.list.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            testID={`filter_button_${filter.id}_id`}
            onPress={() => selectFilter(filter)}
          >
            <Text testID={`filter_${filter.id}_id`}>{filter.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
