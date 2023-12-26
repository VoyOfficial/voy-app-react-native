import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';

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
      <FilterModal filterOptions={filterOptions} />,
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
      <FilterModal filterOptions={filterOptions} />,
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
      <FilterModal filterOptions={filterOptions} />,
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
          { id: 0, label: 'Restaurantes' },
          { id: 1, label: 'Cafeterias' },
          { id: 2, label: 'Entretenimento' },
          { id: 3, label: 'Hotéis' },
          { id: 4, label: 'Lazer' },
        ],
      },
    };
    const { getByTestId } = render(
      <FilterModal filterOptions={filterOptions} />,
    );

    filterOptions.filterBy.list.forEach((filter) => {
      expect(getByTestId(`filter_${filter.id}_id`).props.children).toEqual(
        filter.label,
      );
    });
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
      list: Array<{ id: number; label: string }>;
    };
  };
};

const FilterModal = ({ filterOptions }: Props) => {
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
          <Text key={order.id} testID={`order_${order.id}_id`}>
            {order.label}
          </Text>
        ))}
      </View>
      <View>
        <Text testID="label_filter_by_id">
          {filterOptions.filterBy.label + ': '}
        </Text>
      </View>
      <View>
        {filterOptions.filterBy.list.map((filter) => (
          <Text key={filter.id} testID={`filter_${filter.id}_id`}>
            {filter.label}
          </Text>
        ))}
      </View>
    </View>
  );
};
