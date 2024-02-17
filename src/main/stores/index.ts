import Filter from '../../presentation/search/model/Filter';

class RootStore {
  filter: Filter;

  constructor() {
    this.filter = new Filter();
  }
}

const store = new RootStore();

export default store;
