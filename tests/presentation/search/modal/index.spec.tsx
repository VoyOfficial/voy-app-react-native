import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';

describe('Search: Modal', () => {
  test('should show order by selected correctly', () => {
    const filterOptions = {
      orderBy: {
        label: 'Ordenar por',
        selected: { id: 0, label: 'Mais avaliados' },
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
});

type Props = {
  filterOptions: {
    orderBy: {
      label: string;
      selected: { id: number; label: string };
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
    </View>
  );
};
