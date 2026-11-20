import { action, observable, runInAction } from 'mobx';
import { Ordination, Filter as PlaceFilter } from '~/domain/enums';
import { FilterParam } from '~/domain/params';

const ordinationValues = Object.values(Ordination) as Ordination[];
const filterValues = Object.values(PlaceFilter) as PlaceFilter[];

export const getOptions = () => {
  return {
    filterBy: {
      label: 'Filtrar por',
      list: filterValues.map((label, id) => ({
        id,
        label,
        selected: false,
      })),
    },
    orderBy: {
      label: 'Ordenar por',
      list: ordinationValues.map((label, id) => ({ id, label })),
      selected: { id: 0, label: Ordination.MostRated },
    },
  };
};

export type Options = {
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

export default class Filter {
  @observable options: Options = {
    orderBy: {
      label: '',
      selected: {
        id: 0,
        label: '',
      },
      list: [],
    },
    filterBy: {
      label: '',
      list: [],
    },
  };

  constructor(options: Options = getOptions()) {
    this.options = observable(Object.assign({}, options));
  }

  @action selectFilter = (
    filter: {
      id: number;
      label: string;
      selected: boolean;
    },
    options: Options,
  ) => {
    const auxOptions = { ...options };
    const optionFounded = auxOptions.filterBy.list.find(
      (option) => option.id === filter.id,
    );

    if (optionFounded) {
      optionFounded.selected = true;
    }

    this.options = auxOptions;
    return auxOptions;
  };

  @action deselectFilter = (
    filter: {
      id: number;
      label: string;
      selected: boolean;
    },
    options: Options,
  ) => {
    const auxOptions = { ...options };
    const optionFounded = auxOptions.filterBy.list.find(
      (option) => option.id === filter.id,
    );

    if (optionFounded) {
      optionFounded.selected = false;
    }

    this.options = auxOptions;
    return auxOptions;
  };

  @action selectOrder = (
    order: { id: number; label: string },
    options: Options,
  ) => {
    const auxOptions = { ...options };
    runInAction(() => {
      auxOptions.orderBy.selected = { id: order.id, label: order.label };
    });

    this.options = auxOptions;
    return auxOptions;
  };

  toFilterParam = (): FilterParam => {
    const ordination = this.options.orderBy.selected.label as Ordination;
    const types = this.options.filterBy.list
      .filter((option) => option.selected)
      .map((option) => option.label as PlaceFilter);

    return { ordination, types };
  };
}
