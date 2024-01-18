import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from '../../assets/fonts/Voy';

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
    selected?: boolean;
  }) => void;
  showOrderList: boolean;
  showFilterList: boolean;
};

const Options = ({
  list,
  select,
  type,
}: {
  list: Array<{ id: number; label: string; selected?: boolean }>;
  select: (option: { id: number; label: string; selected?: boolean }) => void;
  type: string;
}) =>
  list.map((option) => (
    <TouchableOpacity
      key={option.id}
      testID={`${type}_button_${option.id}_id`}
      onPress={() => select(option)}
      style={{
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: '#E6E6E6',
        paddingLeft: 42,
      }}
    >
      <Text
        testID={`${type}_${option.id}_id`}
        style={{
          fontFamily: 'LexendDeca-Regular',
          color: '#AEAEAE',
          fontSize: 15,
        }}
      >
        {option.label}
      </Text>
    </TouchableOpacity>
  ));

const FilterModal = ({
  filterOptions,
  selectOrder,
  selectFilter,
  showOrderList,
  showFilterList,
}: Props) => {
  return (
    <View
      style={{ backgroundColor: '#FFFFFF', borderRadius: 10 }}
      testID="filter_modal_id"
    >
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 19,
          borderBottomWidth: 1,
          borderColor: '#E6E6E6',
          paddingLeft: 22,
          paddingRight: 16,
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Text
            testID="label_order_by_id"
            style={{
              color: '#212121',
              fontSize: 15,
              fontFamily: 'LexendDeca-Regular',
            }}
          >
            {filterOptions.orderBy.label + ': '}
          </Text>
          <Text
            testID="order_by_selected_id"
            style={{
              color: '#5452F6',
              fontSize: 15,
              fontFamily: 'LexendDeca-Regular',
            }}
          >
            {filterOptions.orderBy.selected.label}
          </Text>
        </View>
        {!showOrderList && (
          <Icon testID="order_down_arrow_icon_id" name="arrow_down" size={24} />
        )}
        {showOrderList && (
          <Icon testID="order_up_arrow_icon_id" name="arrow_up" size={24} />
        )}
      </View>
      {showOrderList && (
        <View testID="order_options_id">
          <Options
            list={filterOptions.orderBy.list}
            select={selectOrder}
            type="order"
          />
        </View>
      )}

      <View
        style={{
          paddingVertical: 19,
          borderBottomWidth: 1,
          borderColor: '#E6E6E6',
          paddingLeft: 22,
        }}
      >
        <Text
          testID="label_filter_by_id"
          style={{
            fontFamily: 'LexendDeca-Regular',
            color: '#212121',
            fontSize: 15,
          }}
        >
          {filterOptions.filterBy.label + ': '}
        </Text>
        {showFilterList && (
          <Icon testID="filter_up_arrow_icon_id" name="arrow_up" size={24} />
        )}
        {!showFilterList && (
          <Icon
            testID="filter_down_arrow_icon_id"
            name="arrow_down"
            size={24}
          />
        )}
      </View>
      <View>
        <Options
          list={filterOptions.filterBy.list}
          select={selectFilter}
          type="filter"
        />
      </View>
    </View>
  );
};

export default FilterModal;
