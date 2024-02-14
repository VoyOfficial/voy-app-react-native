import { action, observable, runInAction } from 'mobx';

export const getOptions = () => {
  return {
    filterBy: {
      label: 'Filtrar por',
      list: [
        { id: 1, label: 'Restaurantes', selected: false },
        { id: 2, label: 'Cafeterias', selected: false },
        { id: 3, label: 'Entretenimento', selected: false },
        { id: 4, label: 'Hotéis', selected: false },
        { id: 5, label: 'Lazer', selected: false },
        { id: 6, label: 'Esportes', selected: false },
        { id: 7, label: 'Vida noturna', selected: false },
      ],
    },
    orderBy: {
      label: 'Ordernar por',
      list: [
        { id: 1, label: 'Mais avaliados' },
        { id: 2, label: 'Mais comentados' },
        { id: 3, label: 'Distância' },
      ],
      selected: { id: 1, label: 'Mais avaliados' },
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
}
