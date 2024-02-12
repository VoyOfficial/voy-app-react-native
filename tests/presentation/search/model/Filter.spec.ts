const options = {
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

describe('Model: Filter', () => {
  test('should start options correctly when initialize the Filter', () => {
    const sut = new Filter(options);

    expect(sut.options).toEqual(options);
  });
});

type Options = {
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

import { observable } from 'mobx';

class Filter {
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

  constructor(options: Options) {
    this.options = options;
  }
}
