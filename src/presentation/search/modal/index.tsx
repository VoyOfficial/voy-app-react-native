import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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
    <View testID="filter_modal_id">
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

export default FilterModal;
