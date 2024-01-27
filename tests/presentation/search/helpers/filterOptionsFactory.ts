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

export default filterOptionsFactory;
