import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import Filter, { Options as FilterOptions } from '../model/Filter';
import {
  ArrowIcon,
  Container,
  FilterByButton,
  FilterByLabel,
  FilterOptionsWrapper,
  OptionButton,
  OptionLabel,
  OptionSelectionIcon,
  OrderByButton,
  OrderByLabel,
  OrderByLabelWrapper,
  OrderBySelected,
  OrderOptionsWrapper,
} from './styles';

const toListWithSelected = (orderBy: {
  label: string;
  selected: { id: number; label: string };
  list: Array<{ id: number; label: string }>;
}) => {
  const listWithSelected: Array<{
    id: number;
    label: string;
    selected?: boolean;
  }> = [];
  orderBy.list.forEach((order) => {
    listWithSelected.push({
      id: order.id,
      label: order.label,
      selected:
        orderBy.selected.id === order.id &&
        orderBy.selected.label === order.label
          ? true
          : false,
    });
  });

  return listWithSelected;
};

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
  changeShowOfOrderList: () => void;
  changeShowOfFilterList: () => void;
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
    <OptionButton
      key={option.id}
      testID={`${type}_button_${option.id}_id`}
      onPress={() => select(option)}
    >
      <OptionLabel testID={`${type}_${option.id}_id`}>
        {option.label}
      </OptionLabel>
      <OptionSelectionIcon
        testID={`${type}_selection_icon_${option.id}_id`}
        selected={option.selected}
      />
    </OptionButton>
  ));

export const FilterModal = ({
  filterOptions,
  selectOrder,
  selectFilter,
  changeShowOfOrderList,
  changeShowOfFilterList,
  showOrderList,
  showFilterList,
}: Props) => {
  return (
    <Container testID="filter_modal_id">
      <OrderByButton
        testID="order_by_button_id"
        onPress={changeShowOfOrderList}
      >
        <OrderByLabelWrapper>
          <OrderByLabel testID="label_order_by_id">
            {filterOptions.orderBy.label + ': '}
          </OrderByLabel>
          <OrderBySelected testID="order_by_selected_id">
            {filterOptions.orderBy.selected.label}
          </OrderBySelected>
        </OrderByLabelWrapper>
        {!showOrderList && (
          <ArrowIcon testID="order_down_arrow_icon_id" name="arrow_down" />
        )}
        {showOrderList && (
          <ArrowIcon testID="order_up_arrow_icon_id" name="arrow_up" />
        )}
      </OrderByButton>
      {showOrderList && (
        <OrderOptionsWrapper testID="order_options_id">
          <Options
            list={toListWithSelected(filterOptions.orderBy)}
            select={selectOrder}
            type="order"
          />
        </OrderOptionsWrapper>
      )}
      <FilterByButton
        testID="filter_by_button_id"
        onPress={changeShowOfFilterList}
      >
        <FilterByLabel testID="label_filter_by_id">
          {filterOptions.filterBy.label + ': '}
        </FilterByLabel>
        {showFilterList && (
          <ArrowIcon testID="filter_up_arrow_icon_id" name="arrow_up" />
        )}
        {!showFilterList && (
          <ArrowIcon testID="filter_down_arrow_icon_id" name="arrow_down" />
        )}
      </FilterByButton>
      {showFilterList && (
        <FilterOptionsWrapper testID="filter_options_id">
          <Options
            list={filterOptions.filterBy.list}
            select={selectFilter}
            type="filter"
          />
        </FilterOptionsWrapper>
      )}
    </Container>
  );
};

export const useFilterModalFactory = ({ filter }: { filter: Filter }) => {
  const [showOrderList, setShowOrderList] = useState(false);
  const [showFilterList, setShowFilterList] = useState(false);
  const [options, setOptions] = useState<FilterOptions>(filter.options);

  const changeShowOfOrderList = () => {
    setShowOrderList(!showOrderList);
  };

  const changeShowOfFilterList = () => {
    setShowFilterList(!showFilterList);
  };

  const selectFilter = (option: {
    id: number;
    label: string;
    selected?: boolean;
  }) => {
    let auxOption: { id: number; label: string; selected: boolean } = {
      id: 0,
      label: '',
      selected: false,
    };

    if (option.selected) {
      auxOption = {
        id: option.id,
        label: option.label,
        selected: option.selected,
      };
    } else {
      auxOption = {
        id: option.id,
        label: option.label,
        selected: false,
      };
    }

    const optionsUpdated = filter.selectFilter(auxOption, options);

    setOptions(optionsUpdated);
  };

  const selectOrder = (order: { id: number; label: string }) => {
    const optionsUpdated = filter.selectOrder(order, options);
    setOptions(optionsUpdated);
  };

  return {
    showOrderList,
    showFilterList,
    options,
    changeShowOfOrderList,
    changeShowOfFilterList,
    selectFilter,
    selectOrder,
  };
};

const FilterModalFactory = ({ filter }: { filter?: Filter }) => {
  const {
    changeShowOfFilterList,
    changeShowOfOrderList,
    selectFilter,
    selectOrder,
    showFilterList,
    showOrderList,
    options,
  } = useFilterModalFactory({ filter: filter! });

  return (
    <FilterModal
      filterOptions={options}
      selectFilter={selectFilter}
      selectOrder={selectOrder}
      showOrderList={showOrderList}
      showFilterList={showFilterList}
      changeShowOfOrderList={changeShowOfOrderList}
      changeShowOfFilterList={changeShowOfFilterList}
    />
  );
};

export default inject('filter')(observer(FilterModalFactory));
